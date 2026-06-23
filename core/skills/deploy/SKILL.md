---
name: deploy
description: >
  Dispatcher: reads docs/architecture.md and delegates to the correct stack docker skill
  to scaffold Dockerfiles and docker-compose.yml. Use when the user says "set up docker",
  "create docker compose", "scaffold deployment", or "deploy".
---

# Deploy

## Instructions

Dispatch to the correct stack Docker skill based on `docs/architecture.md`.

## Workflow

1. Read `docs/architecture.md` → extract `**Stack:**` value
2. Dispatch:
   - `fastapi-vue` → invoke `fastapi-vue:docker`
   - `node-vue` → invoke `node-vue:docker`
3. After scaffolding: remind user to run `/init-secrets` to generate `.env` from `.env.example`
