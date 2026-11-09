"""Shared FastAPI dependencies. Routers get services from here, never DAOs."""

from typing import Annotated

from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.exceptions import AuthError
from app.core.security import decode_access_token
from app.services.appointment_service import AppointmentService
from app.services.availability_service import AvailabilityService
from app.services.clinic_settings_service import ClinicSettingsService
from app.services.diet_service import DietService
from app.services.product_service import ProductService

DbSession = Annotated[Session, Depends(get_db)]

_bearer = HTTPBearer(auto_error=False)


def require_admin(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
) -> str:
    if credentials is None:
        raise AuthError("Sign in as an admin to do this.")
    return decode_access_token(credentials.credentials)


AdminUser = Annotated[str, Depends(require_admin)]


def _settings_service(db: DbSession) -> ClinicSettingsService:
    return ClinicSettingsService(db)


def _availability_service(db: DbSession) -> AvailabilityService:
    return AvailabilityService(db)


def _appointment_service(db: DbSession) -> AppointmentService:
    return AppointmentService(db)


def _product_service(db: DbSession) -> ProductService:
    return ProductService(db)


def _diet_service(db: DbSession) -> DietService:
    return DietService(db)


SettingsServiceDep = Annotated[ClinicSettingsService, Depends(_settings_service)]
AvailabilityServiceDep = Annotated[AvailabilityService, Depends(_availability_service)]
AppointmentServiceDep = Annotated[AppointmentService, Depends(_appointment_service)]
ProductServiceDep = Annotated[ProductService, Depends(_product_service)]
DietServiceDep = Annotated[DietService, Depends(_diet_service)]
