---
name: docker
description: >
  Scaffolds Docker + docker-compose for the Fastify + Vue3 monorepo.
  Creates Dockerfile.api in backend/, Dockerfile.web in frontend/, docker-compose.yml
  and .env.example at the monorepo root. Invoked by core:deploy.
  Use when the user says "set up docker", "create docker compose", or "scaffold deployment".
---

# Docker — Fastify + Vue3 Monorepo

## Instructions

Scaffold the complete Docker setup for the monorepo. The `docker-compose.yml` sits at the
monorepo root and references the `backend/` and `frontend/` directories.

## DO NOT

- Use `latest` tag for PostgreSQL — always `pgvector/pgvector:pg16`
- Skip health checks on the API and DB services
- Commit `.env` — add it to `.gitignore` if not present
- Generate `.env` directly — that is `/init-secrets`'s job

## Files to create

| File | Location |
|---|---|
| `Dockerfile.api` | `backend/` |
| `Dockerfile.web` | `frontend/` |
| `nginx.conf` | `frontend/` |
| `docker-compose.yml` | monorepo root |
| `.env.example` | monorepo root |

## Workflow

1. Create `backend/Dockerfile.api` from template
2. Create `frontend/Dockerfile.web` + `frontend/nginx.conf` from templates
3. Create `docker-compose.yml` at monorepo root from template
4. Create `.env.example` at monorepo root from template (if absent)
5. Ensure `.env` is in `.gitignore`
6. Remind user: run `/init-secrets` to generate `.env`
7. Verify `docker-compose.yml` with: `docker compose config`
