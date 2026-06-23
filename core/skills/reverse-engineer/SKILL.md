---
name: reverse-engineer
description: >
  Reads existing code and produces docs/features/*.md (feature specs) and docs/data_model.md
  from what is already implemented. No PlantUML. Use when the user says "reverse engineer this",
  "document what we have", "recover the specs", "generate docs from code", or when working
  with an existing codebase that has no docs/ directory.
---

# Reverse Engineer

## Instructions

Read the existing codebase and produce:
1. `docs/data_model.md` — inferred from ORM models or DB schema
2. `docs/features/*.md` — one file per logical feature, ACs derived from actual code behavior

All generated feature specs are marked `Status: Done` (they are already implemented).
No PlantUML. Use [references/stack-signals.md](references/stack-signals.md) to identify the stack.

## DO NOT

- Generate PlantUML diagrams
- Mark features as anything other than `Done` (they exist in code)
- Invent behavior not found in the code

## Workflow

1. Read [references/stack-signals.md](references/stack-signals.md) to identify the stack
2. Find ORM models / DB schema:
   - fastapi-vue: `backend/app/models/` SQLAlchemy `Mapped[]` classes
   - node-vue: `backend/src/db/schema/` Drizzle table definitions
3. Write `docs/data_model.md` from discovered models
4. Find routes/endpoints:
   - fastapi-vue: `backend/app/routers/` FastAPI `@router.*` decorators
   - node-vue: `backend/src/routes/` Fastify plugin handlers
5. Group routes into logical features; for each:
   - Create `FEAT-XXX-<slug>.md` with ACs derived from endpoint behavior
   - AC format: "Given <state>, when <HTTP method + path>, then <expected response>"
   - Status: Done
6. Write all feature spec files
7. Report what was written; suggest `/requirements` to complement with FR/NFR/C tables
