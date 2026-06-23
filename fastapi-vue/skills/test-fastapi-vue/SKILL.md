---
name: test-fastapi-vue
description: >
  Creates and runs pytest tests for FastAPI features with AC traceability markers.
  Uses real async DB session — never mocks the database layer. Invoked by core:test
  and core:sprint. Use when the user says "test fastapi", "write pytest tests",
  or "run backend tests".
argument-hint: "FEAT-001"
---

# Test — FastAPI + pytest

## Instructions

Create pytest tests for the feature in `$ARGUMENTS`. One test function per AC.
Tests run against a real async database (Alembic creates the test schema).
Use `@pytest.mark.feature` and `@pytest.mark.ac` for traceability.

## Monorepo layout

Tests live in `backend/tests/` matching the feature structure:
```
backend/
└── tests/
    ├── conftest.py        # async DB session + httpx AsyncClient fixtures
    └── test_FEAT_NAME.py  # one file per feature
```

## DO NOT

- Mock the database layer (use real async test DB)
- Skip AC markers
- Write tests without assertions
- Mix features in one test file

## conftest.py pattern (create if absent)

```python
import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from app.main import app
from app.database import Base, get_session
import os

TEST_DB_URL = os.getenv("TEST_DATABASE_URL", "postgresql+asyncpg://appuser:apppassword@localhost:5432/testdb")

@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"

@pytest.fixture(scope="session")
async def engine():
    engine = create_async_engine(TEST_DB_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield engine
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    await engine.dispose()

@pytest.fixture
async def session(engine):
    async_session = async_sessionmaker(engine, expire_on_commit=False)
    async with async_session() as s:
        yield s

@pytest.fixture
async def client(session):
    app.dependency_overrides[get_session] = lambda: session
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c
    app.dependency_overrides.clear()
```

## Workflow

1. Read `docs/features/FEAT-XXX-*.md` for the feature spec and ACs
2. Check `backend/tests/conftest.py` — create if absent (use pattern above)
3. Create `backend/tests/test_FEAT_NAME.py` with one test per AC
4. Run: `cd backend && pytest tests/test_FEAT_NAME.py -v`
5. Report results with AC traceability
