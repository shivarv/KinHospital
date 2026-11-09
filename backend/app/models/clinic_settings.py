from decimal import Decimal

from sqlalchemy import Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin


class ClinicSettings(TimestampMixin, Base):
    """Single-row table (id=1) holding clinic-wide booking configuration."""

    __tablename__ = "clinic_settings"

    id: Mapped[int] = mapped_column(primary_key=True)
    clinic_name: Mapped[str] = mapped_column(String(120))
    # IANA time zone the doctor's working hours are defined in.
    timezone: Mapped[str] = mapped_column(String(64))
    slot_minutes: Mapped[int]
    booking_window_days: Mapped[int]
    min_notice_minutes: Mapped[int]
    consultation_fee: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    currency: Mapped[str] = mapped_column(String(3))
    consultation_duration_label: Mapped[str] = mapped_column(String(80))
