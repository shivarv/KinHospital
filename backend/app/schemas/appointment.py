from datetime import datetime
from typing import Annotated

from pydantic import AwareDatetime, BaseModel, ConfigDict, EmailStr, Field

from app.core.constants import AppointmentStatus, CareArea, Gender
from app.schemas.common import TimeZoneName


class AppointmentCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    age: int = Field(ge=0, le=120)
    gender: Gender
    country: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=5, max_length=30)
    email: EmailStr
    preferred_language: str | None = Field(default=None, max_length=40)
    patient_timezone: Annotated[str, TimeZoneName]
    start_at: AwareDatetime
    concerns: list[CareArea] = Field(min_length=1)
    message: str = Field(min_length=3, max_length=2000)


class AppointmentConfirmation(BaseModel):
    """Returned to the patient after booking."""

    model_config = ConfigDict(from_attributes=True)

    reference: str
    full_name: str
    email: str
    start_at: datetime
    end_at: datetime
    patient_timezone: str
    status: str


class AppointmentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    reference: str
    full_name: str
    age: int
    gender: str
    country: str
    phone: str
    email: str
    preferred_language: str | None
    patient_timezone: str
    start_at: datetime
    end_at: datetime
    concerns: list[str]
    message: str
    status: str
    admin_notes: str | None
    created_at: datetime


class AppointmentAdminUpdate(BaseModel):
    status: AppointmentStatus | None = None
    admin_notes: str | None = Field(default=None, max_length=2000)
