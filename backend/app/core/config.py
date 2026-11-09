from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings, read from environment variables or a .env file.

    `.env` is looked up in the repo root (when run from backend/) and in the
    current directory.
    """

    model_config = SettingsConfigDict(env_file=("../.env", ".env"), extra="ignore")

    app_name: str = "KIN Wellness API"
    debug: bool = False
    api_v1_prefix: str = "/api/v1"

    database_url: str = "postgresql+psycopg://kinhospital:kinhospital@localhost:5432/kinhospital"
    cors_origins: str = "http://localhost:5173"

    # Admin login. Required: there are deliberately no defaults.
    admin_username: str
    admin_password: str
    jwt_secret: str
    jwt_expire_minutes: int = 12 * 60

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]
