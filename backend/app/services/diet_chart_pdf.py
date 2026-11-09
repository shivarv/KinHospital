"""Renders a diet chart as a PDF (fpdf2, built-in fonts, no files on disk)."""

from collections.abc import Sequence
from datetime import date

from fpdf import FPDF
from fpdf.fonts import FontFace

from app.models.diet import DietCondition, DietMeal

FOREST = (30, 77, 59)
SAGE = (236, 241, 234)
INK = (33, 41, 38)
MUTED = (104, 114, 108)

# Built-in PDF fonts only cover Latin-1, so map common typographic characters.
_REPLACEMENTS = {
    "—": "-",
    "–": "-",
    "‘": "'",
    "’": "'",
    "“": '"',
    "”": '"',
    "•": "-",
    "…": "...",
    " ": " ",
}


def _t(text: str) -> str:
    for src, dst in _REPLACEMENTS.items():
        text = text.replace(src, dst)
    return text.encode("latin-1", "replace").decode("latin-1")


class _ChartPDF(FPDF):
    def footer(self) -> None:
        self.set_y(-12)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 8, f"KIN Wellness  |  Root. Revive. Thrive.  |  Page {self.page_no()} of {{nb}}", align="C")


def _section_title(pdf: FPDF, title: str) -> None:
    pdf.ln(2.5)
    pdf.set_font("Times", "B", 14)
    pdf.set_text_color(*FOREST)
    pdf.cell(0, 8, _t(title), new_x="LMARGIN", new_y="NEXT")
    pdf.set_draw_color(*FOREST)
    pdf.set_line_width(0.3)
    pdf.line(pdf.l_margin, pdf.get_y(), pdf.l_margin + 24, pdf.get_y())
    pdf.ln(3)


def _bullets(pdf: FPDF, items: Sequence[str]) -> None:
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*INK)
    for item in items:
        pdf.multi_cell(0, 5.2, _t(f"-  {item}"), new_x="LMARGIN", new_y="NEXT")


def render_diet_chart(
    *,
    condition: DietCondition,
    meals: Sequence[DietMeal],
    diet_type: str,
    patient_name: str | None,
    generated_on: date,
) -> bytes:
    pdf = _ChartPDF(format="A4")
    pdf.set_margins(18, 18, 18)
    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.add_page()

    # Header band
    pdf.set_fill_color(*FOREST)
    pdf.rect(0, 0, pdf.w, 26, style="F")
    pdf.set_text_color(255, 255, 255)
    pdf.set_xy(18, 6)
    pdf.set_font("Times", "B", 22)
    pdf.cell(0, 9, "KIN Wellness")
    pdf.set_xy(18, 15)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(0, 6, "Personalised diet chart")
    pdf.set_y(34)

    # Title and details
    pdf.set_font("Times", "B", 20)
    pdf.set_text_color(*FOREST)
    pdf.multi_cell(0, 9, _t(f"{condition.name} diet chart"), new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)

    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*MUTED)
    details = [
        f"Diet: {'Vegetarian' if diet_type == 'veg' else 'Non-vegetarian'}",
        f"Prepared on: {generated_on.strftime('%d %B %Y')}",
    ]
    if patient_name:
        details.insert(0, f"Prepared for: {patient_name}")
    pdf.cell(0, 6, _t("   |   ".join(details)), new_x="LMARGIN", new_y="NEXT")
    pdf.ln(3)

    pdf.set_font("Helvetica", "", 10.5)
    pdf.set_text_color(*INK)
    pdf.multi_cell(0, 5.8, _t(condition.description), new_x="LMARGIN", new_y="NEXT")

    # Meal plan
    _section_title(pdf, "Your daily meal plan")
    pdf.set_draw_color(220, 226, 218)
    # Unfilled table rows use the current fill colour, so reset it from the header band.
    pdf.set_fill_color(255, 255, 255)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*INK)
    with pdf.table(
        col_widths=(42, 132),
        text_align="LEFT",
        line_height=5.4,
        padding=1.8,
        borders_layout="HORIZONTAL_LINES",
        headings_style=FontFace(emphasis="BOLD", color=(255, 255, 255), fill_color=FOREST),
        cell_fill_color=SAGE,
        cell_fill_mode="ROWS",
    ) as table:
        heading = table.row()
        heading.cell("When")
        heading.cell("What to eat")
        for meal in meals:
            row = table.row()
            row.cell(_t(meal.meal_time))
            row.cell(_t(meal.items))

    _section_title(pdf, "Foods to include")
    _bullets(pdf, condition.foods_to_include)

    _section_title(pdf, "Foods to limit or avoid")
    _bullets(pdf, condition.foods_to_avoid)

    if condition.tips:
        _section_title(pdf, "Lifestyle tips")
        _bullets(pdf, condition.tips)

    # Disclaimer
    pdf.ln(4)
    pdf.set_fill_color(*SAGE)
    pdf.set_font("Helvetica", "I", 8.5)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        4.8,
        _t(
            "This chart is general guidance, not a medical prescription. Portion sizes vary with age, weight "
            "and activity. If you have allergies, take regular medication, are pregnant or breastfeeding, or "
            "have a diagnosed condition, book a consultation with a KIN practitioner for a plan made for you."
        ),
        fill=True,
        padding=3,
        new_x="LMARGIN",
        new_y="NEXT",
    )

    return bytes(pdf.output())
