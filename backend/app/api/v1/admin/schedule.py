"""Admin: clinic settings, weekly hours and holidays."""

from fastapi import APIRouter, status

from app.api.deps import AdminUser, AvailabilityServiceDep, SettingsServiceDep
from app.schemas.availability import HolidayCreate, HolidayRead, WeeklyAvailabilityRead, WeeklyAvailabilityUpdate
from app.schemas.clinic_settings import ClinicSettingsRead, ClinicSettingsUpdate

router = APIRouter(tags=["admin: schedule"])


@router.get("/settings", response_model=ClinicSettingsRead)
def get_settings(_: AdminUser, service: SettingsServiceDep):
    return service.get()


@router.patch("/settings", response_model=ClinicSettingsRead)
def update_settings(_: AdminUser, data: ClinicSettingsUpdate, service: SettingsServiceDep):
    return service.update(data)


@router.get("/availability", response_model=list[WeeklyAvailabilityRead])
def get_weekly_hours(_: AdminUser, service: AvailabilityServiceDep):
    return service.list_week()


@router.put("/availability", response_model=list[WeeklyAvailabilityRead])
def update_weekly_hours(_: AdminUser, days: list[WeeklyAvailabilityUpdate], service: AvailabilityServiceDep):
    return service.update_week(days)


@router.get("/holidays", response_model=list[HolidayRead])
def list_holidays(_: AdminUser, service: AvailabilityServiceDep):
    return service.list_upcoming_holidays()


@router.post("/holidays", response_model=HolidayRead, status_code=status.HTTP_201_CREATED)
def add_holiday(_: AdminUser, data: HolidayCreate, service: AvailabilityServiceDep):
    return service.add_holiday(data)


@router.delete("/holidays/{holiday_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_holiday(_: AdminUser, holiday_id: int, service: AvailabilityServiceDep) -> None:
    service.remove_holiday(holiday_id)
