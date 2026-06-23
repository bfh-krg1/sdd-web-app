---
name: migration
description: >
  Creates and applies Alembic database migrations from SQLAlchemy models in the monorepo
  backend/ directory. Use when the user says "run migration", "create migration",
  "alembic migration", "update the database schema", or after implementing new models.
---

# Migration (FastAPI / Alembic)

## Instructions

Generate and apply Alembic migrations from SQLAlchemy `Mapped[]` models in `backend/`.
The monorepo has `backend/` for the API and `frontend/` for the Vue app — all Alembic
operations run from the `backend/` directory.

## DO NOT

- Hand-write migration SQL when autogenerate can do it
- Skip adding the pgvector extension for vector columns
- Run `alembic upgrade head` without reviewing the generated migration first
- Run from project root — always `cd backend` first

## Workflow

1. `cd backend`
2. Check if Alembic is initialized:
   - If `alembic.ini` absent: run `alembic init alembic`
   - Copy `skills/migration/templates/migration_env.py` to `alembic/env.py`
3. Ensure all model files are imported in `alembic/env.py` via `from app.models import *` or equivalent
4. Check `docs/data_model.md` for vector columns — if present:
   - Add to migration manually: `op.execute("CREATE EXTENSION IF NOT EXISTS vector")`
5. Run: `alembic revision --autogenerate -m "add_<feature_name>"`
6. Open the generated migration file — review for correctness
7. If pgvector columns present, add the extension creation before table creation
8. Run: `alembic upgrade head`
9. Confirm: "Migration applied. Run `alembic history` to verify."
