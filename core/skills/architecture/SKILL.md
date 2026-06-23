---
name: architecture
description: >
  Reads or creates docs/architecture.md, which declares the tech stack for the project.
  All dispatcher skills (implement, test, e2e, deploy) read this file to know which
  stack plugin to invoke. Use when the user asks "what stack are we using",
  "set up architecture", "choose the stack", or when docs/architecture.md is absent.
---

# Architecture

## Instructions

Read `docs/architecture.md` to determine the active stack. If the file is absent, write
the default FastAPI+Vue3 stack and report what was written.

This skill is also invoked by other skills (implement, test, e2e, deploy) to resolve the stack.
When called by a dispatcher, just return the stack name — no need to re-explain.

## DO NOT

- Change the stack without the user asking
- Invent a stack not listed below
- Run implementation — this skill only reads/writes architecture declaration

## Supported Stacks

| Stack name | Description |
|---|---|
| `fastapi-vue` | Python 3.14 / FastAPI / SQLAlchemy 2.0 / Alembic / pgvector + Vue3 / Vite / Pinia / TailwindCSS |
| `node-vue` | TypeScript / Node 22 / Fastify 5 / Drizzle ORM / pgvector + Vue3 / Vite / Pinia / TailwindCSS |

## Default architecture.md (fastapi-vue)

```markdown
# Architecture

**Stack:** fastapi-vue

## Backend
- Language: Python 3.14
- Framework: FastAPI (async, OpenAPI auto-generated)
- ORM: SQLAlchemy 2.0 with `Mapped[]` type annotations
- Migrations: Alembic (autogenerate from models)
- Vector store: pgvector extension on PostgreSQL
- LLM: Ollama (local) + OpenAI / Gemini via .env

## Frontend
- Framework: Vue 3 (Composition API)
- Build tool: Vite
- State: Pinia
- Styling: TailwindCSS

## Infrastructure
- DB: PostgreSQL 16 + pgvector
- Deploy: Docker + docker-compose (api, web/nginx, db, ollama)

## Monorepo layout
- `backend/` — FastAPI app, models, services, routers
- `frontend/` — Vue3 SPA
- `docker-compose.yml` at root
```

## node-vue variant

Replace the default with:

```markdown
# Architecture

**Stack:** node-vue

## Backend
- Language: TypeScript on Node 22 LTS
- Framework: Fastify 5
- ORM: Drizzle ORM v1 (SQL-first, TypeScript-native)
- Migrations: Drizzle Kit
- Vector store: pgvector extension on PostgreSQL
- LLM: Ollama (local) + OpenAI / Gemini via .env

## Frontend
- Framework: Vue 3 (Composition API)
- Build tool: Vite
- State: Pinia
- Styling: TailwindCSS

## Infrastructure
- DB: PostgreSQL 16 + pgvector
- Deploy: Docker + docker-compose (api, web/nginx, db, ollama)

## Monorepo layout
- `backend/` — Fastify app, schemas, services, routes
- `frontend/` — Vue3 SPA
- `docker-compose.yml` at root
```

## Workflow

1. Check if `docs/architecture.md` exists
2. If absent: write the default (fastapi-vue) and inform the user; suggest editing if they want node-vue
3. If present: read the `**Stack:**` line and output the stack name
4. Suggest next step: `/data-model` or `/requirements` if not yet done
