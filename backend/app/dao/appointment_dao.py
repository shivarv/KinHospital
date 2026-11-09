from collections.abc import Sequence
from datetime import UTC, datetime

from sqlalchemy import select

from app.dao.base_dao import BaseDAO
from app.models.appointment import Appointment


class AppointmentDAO(BaseDAO[Appointment]):
    model = Appointment

    def get_by_reference(self, reference: str) -> Appointment | None:
        return self.session.scalar(select(Appointment).where(Appointment.reference == reference))

    def list_filtered(
        self,
        *,
        status: str | None = None,
        start_from: datetime | None = None,
        start_to: datetime | None = None,
        limit: int = 200,
    ) -> Sequence[Appointment]:
        stmt = select(Appointment)
        if status:
            stmt = stmt.where(Appointment.status == status)
        if start_from:
            stmt = stmt.where(Appointment.start_at >= start_from)
        if start_to:
            stmt = stmt.where(Appointment.start_at < start_to)
        return self.session.scalars(stmt.order_by(Appointment.start_at).limit(limit)).all()

    def booked_starts_between(self, start: datetime, end: datetime) -> set[datetime]:
        """Start times (UTC) of non-cancelled appointments in [start, end)."""
        stmt = select(Appointment.start_at).where(
            Appointment.start_at >= start,
            Appointment.start_at < end,
            Appointment.status != "cancelled",
        )
        return {s.astimezone(UTC) for s in self.session.scalars(stmt).all()}
