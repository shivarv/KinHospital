"""Test setup: a separate Postgres database, with each test in a rolled-back transaction.

Uses TEST_DATABASE_URL, defaulting to a `kinhospital_test` database on the
same server as DATABASE_URL. The database is created if it doesn't exist.
"""

import os
from collections.abc import Iterator
from datetime import time
from decimal import Decimal

os.environ.setdefault("ADMIN_USERNAME", "admin")
os.environ.setdefault("ADMIN_PASSWORD", "test-password")
os.environ.setdefault("JWT_SECRET", "test-secret-that-is-long-enough-for-hs256-signing")

import psycopg
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.database import get_db
from app.main import app
from app.models import Base, ClinicSettings, WeeklyAvailability
from app.seed import seed_diet_plans


def _test_database_url() -> str:
    explicit = os.environ.get("TEST_DATABASE_URL")
    if explicit:
        return explicit
    return make_url(get_settings().database_url).set(database="kinhospital_test").render_as_string(hide_password=False)


def _ensure_database(url: str) -> None:
    parsed = make_url(url)
    admin_dsn = parsed.set(drivername="postgresql", database="postgres").render_as_string(hide_password=False)
    with psycopg.connect(admin_dsn, autocommit=True) as conn:
        exists = conn.execute("SELECT 1 FROM pg_database WHERE datname = %s", (parsed.database,)).fetchone()
        if not exists:
            conn.execute(f'CREATE DATABASE "{parsed.database}"')


TEST_URL = _test_database_url()
_ensure_database(TEST_URL)
engine = create_engine(TEST_URL)


@pytest.fixture(scope="session", autouse=True)
def _schema() -> Iterator[None]:
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    yield
    Base.metadata.drop_all(engine)


@pytest.fixture
def db() -> Iterator[Session]:
    connection = engine.connect()
    outer = connection.begin()
    # Service-level commit() calls only release a savepoint; everything is rolled back after the test.
    session = Session(bind=connection, join_transaction_mode="create_savepoint", expire_on_commit=False)

    session.add(
        ClinicSettings(
            id=1,
            clinic_name="KIN Wellness",
            timezone="Asia/Kolkata",
            slot_minutes=30,
            booking_window_days=30,
            min_notice_minutes=60,
            consultation_fee=Decimal("30.00"),
            currency="USD",
            consultation_duration_label="30-40 minutes",
        )
    )
    for day in range(7):
        session.add(WeeklyAvailability(day_of_week=day, is_available=True, start_time=time(9), end_time=time(21)))
    seed_diet_plans(session)
    session.commit()

    yield session

    session.close()
    outer.rollback()
    connection.close()


@pytest.fixture
def client(db: Session) -> Iterator[TestClient]:
    app.dependency_overrides[get_db] = lambda: db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture
def admin_headers(client: TestClient) -> dict[str, str]:
    s = get_settings()
    res = client.post("/api/v1/admin/auth/login", json={"username": s.admin_username, "password": s.admin_password})
    assert res.status_code == 200, res.text
    return {"Authorization": f"Bearer {res.json()['access_token']}"}
