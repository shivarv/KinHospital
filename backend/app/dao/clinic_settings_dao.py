from app.dao.base_dao import BaseDAO
from app.models.clinic_settings import ClinicSettings

SETTINGS_ROW_ID = 1


class ClinicSettingsDAO(BaseDAO[ClinicSettings]):
    model = ClinicSettings

    def get_current(self) -> ClinicSettings | None:
        return self.get(SETTINGS_ROW_ID)
