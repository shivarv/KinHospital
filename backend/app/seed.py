"""Load default data. Safe to run repeatedly: each table is only seeded when empty.

Usage (from backend/):  uv run python -m app.seed
"""

from datetime import time
from decimal import Decimal

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.dao.clinic_settings_dao import SETTINGS_ROW_ID
from app.models import ClinicSettings, DietCondition, DietMeal, Product, WeeklyAvailability
from app.seed_data.diet_plans import DIET_CONDITIONS, meals_for
from app.seed_data.products import PRODUCTS


def _is_empty(session: Session, model: type) -> bool:
    return session.scalar(select(func.count()).select_from(model)) == 0


def seed_clinic_settings(session: Session) -> None:
    if not _is_empty(session, ClinicSettings):
        return
    session.add(
        ClinicSettings(
            id=SETTINGS_ROW_ID,
            clinic_name="KIN Wellness",
            timezone="Asia/Kolkata",
            slot_minutes=30,
            booking_window_days=30,
            min_notice_minutes=60,
            consultation_fee=Decimal("30.00"),
            currency="USD",
            consultation_duration_label="30-40 minutes, video consultation",
        )
    )
    print("Seeded clinic settings")


def seed_weekly_availability(session: Session) -> None:
    """Doctor available every day, 9 am to 9 pm clinic time."""
    if not _is_empty(session, WeeklyAvailability):
        return
    for day in range(7):
        session.add(WeeklyAvailability(day_of_week=day, is_available=True, start_time=time(9, 0), end_time=time(21, 0)))
    print("Seeded weekly availability (every day, 9:00-21:00)")


def seed_products(session: Session) -> None:
    if not _is_empty(session, Product):
        return
    for order, product in enumerate(PRODUCTS):
        session.add(Product(**product, currency="USD", sort_order=order))
    print(f"Seeded {len(PRODUCTS)} products")


def seed_diet_plans(session: Session) -> None:
    if not _is_empty(session, DietCondition):
        return
    for order, data in enumerate(DIET_CONDITIONS):
        condition = DietCondition(
            slug=data["slug"],
            name=data["name"],
            summary=data["summary"],
            description=data["description"],
            foods_to_include=data["foods_to_include"],
            foods_to_avoid=data["foods_to_avoid"],
            tips=data["tips"],
            sort_order=order,
        )
        for diet_type in ("veg", "nonveg"):
            for meal_order, (meal_time, items) in enumerate(meals_for(data, diet_type)):
                condition.meals.append(
                    DietMeal(diet_type=diet_type, meal_time=meal_time, items=items, sort_order=meal_order)
                )
        session.add(condition)
    print(f"Seeded {len(DIET_CONDITIONS)} diet conditions")


def main() -> None:
    with SessionLocal() as session:
        seed_clinic_settings(session)
        seed_weekly_availability(session)
        seed_products(session)
        seed_diet_plans(session)
        session.commit()
    print("Seed complete")


if __name__ == "__main__":
    main()
