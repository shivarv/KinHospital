from datetime import datetime

from sqlalchemy import JSON, DateTime, Index, SmallInteger, String, Text, text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin


class Appointment(TimestampMixin, Base):
    __tablename__ = "appointments"
    __table_args__ = (
        # One active booking per slot; cancelled bookings free the slot.
        Index(
            "uq_appointments_active_start_at",
            "start_at",
            unique=True,
            postgresql_where=text("status <> 'cancelled'"),
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    reference: Mapped[str] = mapped_column(String(16), unique=True)

    full_name: Mapped[str] = mapped_column(String(150))
    age: Mapped[int] = mapped_column(SmallInteger)
    gender: Mapped[str] = mapped_column(String(20))
    country: Mapped[str] = mapped_column(String(80))
    phone: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(255), index=True)
    preferred_language: Mapped[str | None] = mapped_column(String(40))
    # Patient's own time zone, used to show them times they recognise.
    patient_timezone: Mapped[str] = mapped_column(String(64))

    start_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    end_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

    # Focus areas ticked by the patient (see core.constants.CareArea).
    concerns: Mapped[list[str]] = mapped_column(JSON, default=list)
    message: Mapped[str] = mapped_column(Text)

    status: Mapped[str] = mapped_column(String(20), default="pending", index=True)
    admin_notes: Mapped[str | None] = mapped_column(Text)
