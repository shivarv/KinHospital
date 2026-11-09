from collections.abc import Sequence
from datetime import date

from sqlalchemy import select

from app.dao.base_dao import BaseDAO
from app.models.availability import Holiday, WeeklyAvailability


class WeeklyAvailabilityDAO(BaseDAO[WeeklyAvailability]):
    model = WeeklyAvailability

    def list_week(self) -> Sequence[WeeklyAvailability]:
        return self.session.scalars(select(WeeklyAvailability).order_by(WeeklyAvailability.day_of_week)).all()

    def get_by_day(self, day_of_week: int) -> WeeklyAvailability | None:
        return self.session.scalar(select(WeeklyAvailability).where(WeeklyAvailability.day_of_week == day_of_week))


class HolidayDAO(BaseDAO[Holiday]):
    model = Holiday

    def list_from(self, start: date) -> Sequence[Holiday]:
        return self.session.scalars(select(Holiday).where(Holiday.date >= start).order_by(Holiday.date)).all()

    def get_by_date(self, day: date) -> Holiday | None:
        return self.session.scalar(select(Holiday).where(Holiday.date == day))

    def dates_between(self, start: date, end: date) -> set[date]:
        stmt = select(Holiday.date).where(Holiday.date.between(start, end))
        return set(self.session.scalars(stmt).all())
