from pydantic import BaseModel, ConfigDict


class DietConditionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    slug: str
    name: str
    summary: str
