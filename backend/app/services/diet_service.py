import re
from collections.abc import Sequence
from datetime import date

from sqlalchemy.orm import Session

from app.core.constants import DietType
from app.core.exceptions import NotFoundError
from app.dao.diet_dao import DietConditionDAO
from app.models.diet import DietCondition
from app.services.diet_chart_pdf import render_diet_chart


class DietService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.dao = DietConditionDAO(session)

    def list_conditions(self) -> Sequence[DietCondition]:
        return self.dao.list_active()

    def build_chart(self, slug: str, diet_type: DietType, patient_name: str | None) -> tuple[str, bytes]:
        """Return (filename, pdf_bytes) for the requested diet chart."""
        condition = self.dao.get_by_slug_with_meals(slug)
        if condition is None:
            raise NotFoundError("We don't have a diet chart for that condition yet.")

        meals = [m for m in condition.meals if m.diet_type == diet_type]
        pdf = render_diet_chart(
            condition=condition,
            meals=meals,
            diet_type=diet_type,
            patient_name=patient_name.strip() if patient_name else None,
            generated_on=date.today(),
        )
        label = "veg" if diet_type == "veg" else "non-veg"
        filename = f"kin-diet-chart-{re.sub(r'[^a-z0-9-]', '', slug)}-{label}.pdf"
        return filename, pdf
