from datetime import date, time

from sqlalchemy import Date, SmallInteger, String, Time
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin


class WeeklyAvailability(TimestampMixin, Base):
    """Doctor's working hours for one weekday, in the clinic's time zone."""

    __tablename__ = "weekly_availability"

    id: Mapped[int] = mapped_column(primary_key=True)
    # 0 = Monday ... 6 = Sunday (Python's date.weekday()).
    day_of_week: Mapped[int] = mapped_column(SmallInteger, unique=True)
    is_available: Mapped[bool] = mapped_column(default=True)
    start_time: Mapped[time] = mapped_column(Time)
    end_time: Mapped[time] = mapped_column(Time)


class Holiday(TimestampMixin, Base):
    """A clinic date with no consultations."""

    __tablename__ = "holidays"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[date] = mapped_column(Date, unique=True)
    reason: Mapped[str | None] = mapped_column(String(200))
