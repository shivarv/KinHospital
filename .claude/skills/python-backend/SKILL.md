---
name: python-backend
description: KinHospital backend conventions for Python + FastAPI + SQLAlchemy 2 + Postgres, with a layered api → services → dao → models design. Use when creating or editing anything under backend/.
---

# Python backend (KinHospital)

Stack: Python 3.13, FastAPI, SQLAlchemy 2.0 (typed `Mapped[...]` models), psycopg 3, Alembic, pydantic-settings. Managed with `uv` (`uv add <pkg>`, `uv run <cmd>`). Lint/format with `ruff`, test with `pytest`.

## Folder structure

```
backend/
  pyproject.toml
  app/
    main.py       # creates the FastAPI app and mounts routers
    core/         # settings, database engine/session, shared exceptions
    api/
      v1/         # routers: one module per resource
    services/     # business logic; owns transactions
    dao/          # data access objects; the only layer that queries the DB
    models/       # SQLAlchemy ORM models (tables)
    schemas/      # Pydantic request/response models
  tests/
```

## Layering rules (dependencies point downward only)

```
api  →  services  →  dao  →  models
 └──── schemas (shared request/response contracts) ────┘
```

- **api/**: HTTP only — parse input, call a service, return a schema. No queries, no business rules. Get services via FastAPI `Depends`.
- **services/**: business rules and validation. Call `commit()` / `rollback()` here. Raise domain exceptions (from `core/`), not `HTTPException`.
- **dao/**: one DAO class per model. CRUD + queries only. Use `flush()`, never `commit()`.
- **models/**: table definitions only. Register every model in `models/__init__.py` so Alembic sees it.
- **schemas/**: separate `XCreate`, `XUpdate` (all optional), `XRead` (`from_attributes=True`). Never return ORM objects without a response schema.

## Conventions

- File names: `snake_case`, singular per resource (`patient.py`, `patient_dao.py`, `patient_service.py`).
- Full type hints everywhere; use `X | None`, not `Optional[X]`.
- Config comes from environment variables via pydantic-settings — never hardcode secrets.
- Schema changes go through Alembic migrations, never `create_all()` in app code.
