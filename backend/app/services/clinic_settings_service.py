from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.dao.clinic_settings_dao import ClinicSettingsDAO
from app.models.clinic_settings import ClinicSettings
from app.schemas.clinic_settings import ClinicSettingsUpdate


class ClinicSettingsService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.dao = ClinicSettingsDAO(session)

    def get(self) -> ClinicSettings:
        settings = self.dao.get_current()
        if settings is None:
            raise NotFoundError("Clinic settings are missing. Run `python -m app.seed` to create them.")
        return settings

    def update(self, data: ClinicSettingsUpdate) -> ClinicSettings:
        settings = self.get()
        changes = data.model_dump(exclude_unset=True, exclude_none=True)
        if "currency" in changes:
            changes["currency"] = changes["currency"].upper()
        self.dao.update(settings, changes)
        self.session.commit()
        return settings
