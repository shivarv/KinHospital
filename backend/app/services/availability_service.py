"""Doctor availability: weekly hours, holidays, and bookable slot calculation.

Working hours are stored in the clinic's time zone. Slots are computed in
UTC and labelled in whatever time zone the patient picks, so patients
anywhere in the world see times they recognise.
"""

from collections.abc import Sequence
from datetime import UTC, date, datetime, time, timedelta
from zoneinfo import ZoneInfo

from sqlalchemy.orm import Session

from app.core.exceptions import BadRequestError, ConflictError, NotFoundError
from app.dao.appointment_dao import AppointmentDAO
from app.dao.availability_dao import HolidayDAO, WeeklyAvailabilityDAO
from app.models.availability import Holiday, WeeklyAvailability
from app.models.clinic_settings import ClinicSettings
from app.schemas.availability import HolidayCreate, Slot, WeeklyAvailabilityUpdate
from app.services.clinic_settings_service import ClinicSettingsService


def format_clock(dt: datetime) -> str:
    """'9:30 AM' style label, without platform-specific strftime flags."""
    hour12 = dt.hour % 12 or 12
    return f"{hour12}:{dt.minute:02d} {'AM' if dt.hour < 12 else 'PM'}"


class AvailabilityService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.weekly_dao = WeeklyAvailabilityDAO(session)
        self.holiday_dao = HolidayDAO(session)
        self.appointment_dao = AppointmentDAO(session)
        self.settings_service = ClinicSettingsService(session)

    # ---- Weekly hours -----------------------------------------------------

    def list_week(self) -> Sequence[WeeklyAvailability]:
        return self.weekly_dao.list_week()

    def update_week(self, days: list[WeeklyAvailabilityUpdate]) -> Sequence[WeeklyAvailability]:
        for day in days:
            values = day.model_dump()
            rule = self.weekly_dao.get_by_day(day.day_of_week)
            if rule is None:
                self.weekly_dao.create(values)
            else:
                self.weekly_dao.update(rule, values)
        self.session.commit()
        return self.weekly_dao.list_week()

    # ---- Holidays ---------------------------------------------------------

    def list_upcoming_holidays(self) -> Sequence[Holiday]:
        settings = self.settings_service.get()
        today = datetime.now(ZoneInfo(settings.timezone)).date()
        return self.holiday_dao.list_from(today)

    def add_holiday(self, data: HolidayCreate) -> Holiday:
        if self.holiday_dao.get_by_date(data.date):
            raise ConflictError(f"{data.date.isoformat()} is already marked as a holiday")
        holiday = self.holiday_dao.create(data.model_dump())
        self.session.commit()
        return holiday

    def remove_holiday(self, holiday_id: int) -> None:
        holiday = self.holiday_dao.get(holiday_id)
        if holiday is None:
            raise NotFoundError("Holiday not found")
        self.holiday_dao.delete(holiday)
        self.session.commit()

    # ---- Slots ------------------------------------------------------------

    def get_slots(self, day: date, patient_timezone: str) -> list[Slot]:
        """Free slots that fall on `day` as seen in the patient's time zone."""
        settings = self.settings_service.get()
        patient_tz = ZoneInfo(patient_timezone)
        clinic_tz = ZoneInfo(settings.timezone)

        range_start = datetime.combine(day, time.min, tzinfo=patient_tz).astimezone(UTC)
        range_end = datetime.combine(day + timedelta(days=1), time.min, tzinfo=patient_tz).astimezone(UTC)

        candidates = self._clinic_slot_starts(
            settings, range_start.astimezone(clinic_tz).date(), range_end.astimezone(clinic_tz).date()
        )
        earliest, latest = self._bookable_window(settings)
        booked = self.appointment_dao.booked_starts_between(range_start, range_end)
        step = timedelta(minutes=settings.slot_minutes)

        return [
            Slot(start=s, end=s + step, label=format_clock(s.astimezone(patient_tz)))
            for s in candidates
            if range_start <= s < range_end and earliest <= s <= latest and s not in booked
        ]

    def ensure_bookable(self, start: datetime) -> tuple[datetime, datetime]:
        """Validate a requested start time; return the normalised (start, end) in UTC."""
        settings = self.settings_service.get()
        start = start.astimezone(UTC).replace(microsecond=0)
        clinic_day = start.astimezone(ZoneInfo(settings.timezone)).date()

        if start not in self._clinic_slot_starts(settings, clinic_day, clinic_day):
            raise BadRequestError("That time isn't one of the doctor's consultation slots. Pick a listed slot.")

        earliest, latest = self._bookable_window(settings)
        if start < earliest:
            raise BadRequestError("That slot is too soon to book. Pick a later time.")
        if start > latest:
            raise BadRequestError(
                f"Bookings are open up to {settings.booking_window_days} days ahead. Pick an earlier date."
            )
        if start in self.appointment_dao.booked_starts_between(start, start + timedelta(seconds=1)):
            raise ConflictError("Someone has just booked that slot. Pick another time.")

        return start, start + timedelta(minutes=settings.slot_minutes)

    def _bookable_window(self, settings: ClinicSettings) -> tuple[datetime, datetime]:
        now = datetime.now(UTC)
        return (
            now + timedelta(minutes=settings.min_notice_minutes),
            now + timedelta(days=settings.booking_window_days),
        )

    def _clinic_slot_starts(self, settings: ClinicSettings, first_day: date, last_day: date) -> list[datetime]:
        """Slot starts (UTC) for clinic-local dates first_day..last_day, skipping holidays."""
        clinic_tz = ZoneInfo(settings.timezone)
        week = {rule.day_of_week: rule for rule in self.weekly_dao.list_week()}
        holidays = self.holiday_dao.dates_between(first_day, last_day)
        step = timedelta(minutes=settings.slot_minutes)

        starts: list[datetime] = []
        day = first_day
        while day <= last_day:
            rule = week.get(day.weekday())
            if rule and rule.is_available and day not in holidays:
                current = datetime.combine(day, rule.start_time, tzinfo=clinic_tz)
                closing = datetime.combine(day, rule.end_time, tzinfo=clinic_tz)
                while current + step <= closing:
                    starts.append(current.astimezone(UTC))
                    current += step
            day += timedelta(days=1)
        return starts
