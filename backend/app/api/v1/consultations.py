"""Public booking endpoints: clinic info, free slots, and booking."""

from datetime import date
from typing import Annotated

from fastapi import APIRouter, Query, status

from app.api.deps import AppointmentServiceDep, AvailabilityServiceDep, SettingsServiceDep
from app.schemas.appointment import AppointmentConfirmation, AppointmentCreate
from app.schemas.availability import Slot
from app.schemas.clinic_settings import PublicClinicSettings
from app.schemas.common import TimeZoneName

router = APIRouter(prefix="/consultations", tags=["consultations"])


@router.get("/info", response_model=PublicClinicSettings)
def consultation_info(service: SettingsServiceDep):
    return service.get()


@router.get("/slots", response_model=list[Slot])
def available_slots(
    service: AvailabilityServiceDep,
    day: Annotated[date, Query(alias="date", description="Day in the patient's time zone")],
    tz: Annotated[str, TimeZoneName, Query(description="Patient's IANA time zone")],
):
    return service.get_slots(day, tz)


@router.post("/bookings", response_model=AppointmentConfirmation, status_code=status.HTTP_201_CREATED)
def book_consultation(data: AppointmentCreate, service: AppointmentServiceDep):
    return service.book(data)
