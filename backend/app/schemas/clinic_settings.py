from decimal import Decimal
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.common import TimeZoneName


class PublicClinicSettings(BaseModel):
    """What patients see on the booking page."""

    model_config = ConfigDict(from_attributes=True)

    clinic_name: str
    timezone: str
    slot_minutes: int
    booking_window_days: int
    consultation_fee: Decimal
    currency: str
    consultation_duration_label: str


class ClinicSettingsRead(PublicClinicSettings):
    min_notice_minutes: int


class ClinicSettingsUpdate(BaseModel):
    clinic_name: str | None = Field(default=None, min_length=1, max_length=120)
    timezone: Annotated[str, TimeZoneName] | None = None
    slot_minutes: int | None = Field(default=None, ge=10, le=180)
    booking_window_days: int | None = Field(default=None, ge=1, le=365)
    min_notice_minutes: int | None = Field(default=None, ge=0, le=7 * 24 * 60)
    consultation_fee: Decimal | None = Field(default=None, ge=0, max_digits=10, decimal_places=2)
    currency: str | None = Field(default=None, min_length=3, max_length=3)
    consultation_duration_label: str | None = Field(default=None, min_length=1, max_length=80)
