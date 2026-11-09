from datetime import datetime

from fastapi import APIRouter

from app.api.deps import AdminUser, AppointmentServiceDep
from app.core.constants import AppointmentStatus
from app.schemas.appointment import AppointmentAdminUpdate, AppointmentRead

router = APIRouter(prefix="/appointments", tags=["admin: appointments"])


@router.get("/", response_model=list[AppointmentRead])
def list_appointments(
    _: AdminUser,
    service: AppointmentServiceDep,
    status: AppointmentStatus | None = None,
    start_from: datetime | None = None,
    start_to: datetime | None = None,
):
    return service.list_for_admin(status=status, start_from=start_from, start_to=start_to)


@router.patch("/{appointment_id}", response_model=AppointmentRead)
def update_appointment(_: AdminUser, appointment_id: int, data: AppointmentAdminUpdate, service: AppointmentServiceDep):
    return service.update_by_admin(appointment_id, data)
