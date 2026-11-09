# Import every model here so Alembic's autogenerate sees them via Base.metadata.
from app.models.appointment import Appointment
from app.models.availability import Holiday, WeeklyAvailability
from app.models.base import Base
from app.models.clinic_settings import ClinicSettings
from app.models.diet import DietCondition, DietMeal
from app.models.product import Product

__all__ = [
    "Appointment",
    "Base",
    "ClinicSettings",
    "DietCondition",
    "DietMeal",
    "Holiday",
    "Product",
    "WeeklyAvailability",
]
