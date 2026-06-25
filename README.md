# sdd-web-app

Claude Code plugin marketplace for AI-assisted web app development. Lighter and more batch-friendly than the original AIUP: no UML, no ceremony, generates monorepos.

## Quick start

### Option A — start from scratch (guided wizard)

```bash
# 1. Install the marketplace
/plugin marketplace add ./sdd-web-app
/reload-plugins

# 2. In your project directory — start with the vision interview
/vision

# 3. Define requirements and architecture
/requirements
/architecture      # writes FastAPI+Vue3 default if docs/architecture.md is absent

# 4. Design the data model and feature specs
/data-model
/feature-spec      # generates all features from requirements at once

# 5. Implement + test everything in one go
/sprint

# 6. Ship
/ship
```

### Option B — bootstrap from an existing PRD

Already pitched your idea to another AI agent and got a PRD back?
Drop it at `docs/prd.md` and let `/prd` do the rest:

```bash
/plugin marketplace add ./sdd-web-app
/reload-plugins

# Place your PRD (any format) at docs/prd.md, then:
/prd       # reads the PRD and writes vision.md, requirements.md, architecture.md,
           # data_model.md, and all feature specs in one pass.
           # Defaults to fastapi-vue if the PRD doesn't specify a stack.

# Review docs/features/ — all features start as Approved (PRD is already validated)
/sprint
/ship
```

## Workflow reference

| Command | Output | Notes |
|---|---|---|
| `/prd` | all docs at once | Alternative to the wizard; reads `docs/prd.md` |
| `/vision` | `docs/vision.md` | Socratic interview, one-time |
| `/requirements` | `docs/requirements.md` | FR/NFR/Constraints tables |
| `/architecture` | `docs/architecture.md` | Writes default if absent |
| `/data-model` | `docs/data_model.md` | Mermaid ER + attribute tables |
| `/feature-spec [FR-001 ...]` | `docs/features/*.md` | All FRs by default |
| `/implement [FEAT-001 ...]` | code | All open features by default |
| `/migration` | DB migration files | Alembic or Drizzle Kit |
| `/test [FEAT-001 ...]` | test results | All features by default |
| `/e2e [FEAT-001 ...]` | Playwright results | App must be running |
| `/sprint [FEAT-001 ...]` | branches + commits | Full cycle: implement→test→commit |
| `/ship [FEAT-001]` | push + PR | Always asks before pushing |
| `/deploy` | docker-compose files | Docker only |
| `/init-secrets` | `.env` | Generates from `.env.example` |
| `/code-review` | findings | FEAT-aware wrapper |
| `/refactor` | refactored code | Preserves ACs, re-runs tests |
| `/reverse-engineer` | feature specs + data model | Reads existing code |

## Monorepo layout (generated in your project)

```
your-project/
├── backend/          # API + data layer
├── frontend/         # Vue3 + Vite SPA
├── docker-compose.yml
├── .env.example
└── docs/
    ├── vision.md
    ├── requirements.md
    ├── architecture.md
    ├── data_model.md
    └── features/
```

## Stacks

### fastapi-vue (default)
Python 3.14 · FastAPI · SQLAlchemy 2.0 `Mapped[]` · Alembic · pgvector · Vue3 · Vite · Pinia · TailwindCSS · Docker

### node-vue
TypeScript · Node 22 · Fastify 5 · Drizzle ORM v1 · pgvector · Vue3 · Vite · Pinia · TailwindCSS · Docker

## Recommended companion installs

```bash
/plugin install pyright-lsp@claude-plugins-official      # Python type-checking
/plugin install typescript-lsp@claude-plugins-official   # TypeScript type-checking
/plugin install commit-commands@claude-plugins-official  # git commit helpers
/plugin install security-guidance@claude-plugins-official
/plugin install pr-review-toolkit@claude-plugins-official
```

Also install `gh` (GitHub) or `glab` (GitLab) CLI and authenticate it — required for `/ship` PR creation.

## Out of scope (v1)

- Remote SSH deployment
- Vue/Volar LSP (no official plugin; `typescript-lsp` covers `.ts` files)
- Publishing to Anthropic marketplace
- Additional stacks (the dispatcher design allows future additions)
