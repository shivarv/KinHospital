"""Fixed vocabularies shared by schemas and services."""

from typing import Literal

# The 8 focus areas a patient can tick when booking. They only tell the
# doctor what the patient wants to discuss. Keep in sync with
# frontend/src/features/care-areas/data.ts.
CareArea = Literal[
    "weight-metabolism",
    "womens-health",
    "digestive-wellness",
    "stress-sleep",
    "pain-mobility",
    "skin-hair",
    "preventive-wellness",
    "healthy-ageing",
    "other",
]

AppointmentStatus = Literal["pending", "confirmed", "completed", "cancelled"]

Gender = Literal["female", "male", "other", "prefer_not_to_say"]

DietType = Literal["veg", "nonveg"]

ProductCategory = Literal["homeopathy", "hair_supplement", "supplement"]
