from datetime import date, datetime, time

from pydantic import BaseModel, ConfigDict, Field, model_validator


class WeeklyAvailabilityRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    day_of_week: int
    is_available: bool
    start_time: time
    end_time: time


class WeeklyAvailabilityUpdate(BaseModel):
    day_of_week: int = Field(ge=0, le=6)
    is_available: bool
    start_time: time
    end_time: time

    @model_validator(mode="after")
    def _end_after_start(self) -> "WeeklyAvailabilityUpdate":
        if self.end_time <= self.start_time:
            raise ValueError("End time must be later than start time")
        return self


class HolidayRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    date: date
    reason: str | None


class HolidayCreate(BaseModel):
    date: date
    reason: str | None = Field(default=None, max_length=200)


class Slot(BaseModel):
    start: datetime  # UTC
    end: datetime  # UTC
    label: str  # e.g. "9:30 AM" in the patient's time zone
