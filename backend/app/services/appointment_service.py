import secrets
from collections.abc import Sequence
from datetime import datetime

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.exceptions import ConflictError, NotFoundError
from app.dao.appointment_dao import AppointmentDAO
from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentAdminUpdate, AppointmentCreate
from app.services.availability_service import AvailabilityService

# No 0/O or 1/I so references are easy to read out over the phone.
_REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"


class AppointmentService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.dao = AppointmentDAO(session)
        self.availability = AvailabilityService(session)

    def book(self, data: AppointmentCreate) -> Appointment:
        start_at, end_at = self.availability.ensure_bookable(data.start_at)
        values = data.model_dump(exclude={"start_at"})
        values["concerns"] = list(dict.fromkeys(data.concerns))  # de-duplicate, keep order
        values.update(start_at=start_at, end_at=end_at, reference=self._new_reference(), status="pending")

        try:
            appointment = self.dao.create(values)
            self.session.commit()
        except IntegrityError as exc:
            # Lost a race with another booking for the same slot.
            self.session.rollback()
            raise ConflictError("Someone has just booked that slot. Pick another time.") from exc
        return appointment

    def list_for_admin(
        self, *, status: str | None, start_from: datetime | None, start_to: datetime | None
    ) -> Sequence[Appointment]:
        return self.dao.list_filtered(status=status, start_from=start_from, start_to=start_to)

    def update_by_admin(self, appointment_id: int, data: AppointmentAdminUpdate) -> Appointment:
        appointment = self.dao.get(appointment_id)
        if appointment is None:
            raise NotFoundError("Appointment not found")
        try:
            self.dao.update(appointment, data.model_dump(exclude_unset=True))
            self.session.commit()
        except IntegrityError as exc:
            # Re-activating a cancelled booking whose slot was taken since.
            self.session.rollback()
            raise ConflictError("That slot now has another booking, so this one can't be reactivated.") from exc
        return appointment

    def _new_reference(self) -> str:
        while True:
            ref = "KIN-" + "".join(secrets.choice(_REFERENCE_ALPHABET) for _ in range(6))
            if self.dao.get_by_reference(ref) is None:
                return ref
