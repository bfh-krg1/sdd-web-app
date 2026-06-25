# sdd-web-app — Claude Code Plugin Marketplace

Stack-agnostic AI-dev process plugins for Claude Code. Lighter than RUP/AIUP: no UML, no ceremony, batch-friendly. Generates monorepos with `backend/` and `frontend/` in one repository.

## Plugins

- **core** — vision, requirements, data model, feature specs, sprint, ship, deploy (stack-agnostic dispatchers)
- **fastapi-vue** — Python 3.14 / FastAPI / SQLAlchemy 2.0 / Alembic / pgvector + Vue3 / Vite / Pinia / TailwindCSS
- **node-vue** — TypeScript / Node 22 / Fastify 5 / Drizzle ORM / pgvector + Vue3 / Vite / Pinia / TailwindCSS

## Install

```bash
/plugin marketplace add ./sdd-web-app
/reload-plugins
```

## Workflow

**Option A — stepwise wizard (start from scratch):**
```
/vision         →  docs/vision.md          (Socratic interview, one-time)
/requirements   →  docs/requirements.md    (FR/NFR/Constraints tables)
/architecture   →  docs/architecture.md    (stack declaration; writes FastAPI default if absent)
/data-model     →  docs/data_model.md      (attribute tables + optional Mermaid ER)
/feature-spec   →  docs/features/*.md      (all FRs at once, or /feature-spec FR-001)
```

**Option B — PRD bootstrap (you already have a product doc):**
```
# Place your PRD at docs/prd.md, then:
/prd            →  writes all of the above in one pass (vision, requirements, architecture,
                   data model, feature specs) extracted from the PRD.
                   Defaults to fastapi-vue if the PRD doesn't specify a stack.
```

**Construction + delivery (same for both options):**
```
/sprint         →  branch + implement + test all Approved features; auto-commit per feature
/ship           →  push feature branch (confirm first) + offer PR via gh/glab
/deploy         →  docker-compose scaffold
```

Each skill can also be run individually:
- `/implement [FEAT-001 ...]` — implement features (no-arg = all open)
- `/migration` — run Alembic or Drizzle Kit migrations
- `/test [FEAT-001 ...]` — run tests (no-arg = all)
- `/e2e [FEAT-001 ...]` — run Playwright E2E (app must be running)
- `/code-review` — FEAT-aware wrapper around bundled /code-review
- `/refactor` — AIUP-aware refactor + re-test
- `/init-secrets` — generate .env from .env.example

## Monorepo structure

All stack plugins scaffold this layout in the user's project:

```
your-project/
├── backend/          # API + DB layer
│   ├── app/          # (fastapi-vue) or src/ (node-vue)
│   └── Dockerfile.api
├── frontend/         # Vue3 + Vite SPA
│   ├── src/
│   └── Dockerfile.web
├── docker-compose.yml
├── .env.example
├── .env              # gitignored
└── docs/
    ├── vision.md
    ├── requirements.md
    ├── architecture.md
    ├── data_model.md
    └── features/
        ├── FEAT-001-*.md
        └── FEAT-002-*.md
```

## Companion installs

```bash
/plugin install pyright-lsp@claude-plugins-official
/plugin install typescript-lsp@claude-plugins-official
/plugin install commit-commands@claude-plugins-official
/plugin install security-guidance@claude-plugins-official
/plugin install pr-review-toolkit@claude-plugins-official
```

Requires `gh` (GitHub) or `glab` (GitLab) CLI for `/ship` PR creation.
