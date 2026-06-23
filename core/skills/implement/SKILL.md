---
name: implement
description: >
  Dispatcher: reads docs/architecture.md and delegates to the correct stack implement skill.
  No-arg = all open (non-Done) features. With args = specific FEAT IDs.
  Creates a feat/FEAT-XXX-slug branch per feature. Does NOT write tests.
  Use when the user says "implement", "build the features", or "write the code".
argument-hint: "[FEAT-001 ...]"
---

# Implement

## Instructions

Dispatch to the correct stack plugin based on `docs/architecture.md`. If the architecture
file is absent, run `/architecture` first (it will write the default and return the stack name).

## DO NOT

- Write tests (use `/test` or `/sprint`)
- Run migrations (use `/migration`)
- Push to origin
- Implement multiple features in one commit

## Workflow

1. Read `docs/architecture.md` → extract `**Stack:**` value
   - If file absent: invoke `/architecture` → it writes the default and returns the stack name
2. Collect features to implement:
   - No args: all `docs/features/*.md` where Status ≠ Done
   - With args: only specified FEAT IDs
3. For each feature:
   a. Create/switch to `feat/FEAT-XXX-<slug>` branch (see core:ship/references/git-workflow.md)
   b. Dispatch:
      - `fastapi-vue` → invoke `fastapi-vue:implement-fastapi-vue` for this feature
      - `node-vue` → invoke `node-vue:implement-node-vue` for this feature
   c. Run linter after implementation:
      - fastapi-vue: `cd backend && ruff check --fix .`
      - node-vue: `cd backend && npx eslint --fix src/ && npx prettier --write src/`
4. Report which features were implemented and which branches were created
5. Suggest next: `/migration` then `/test`

## Stack routing table

| Stack value in architecture.md | Skill to invoke |
|---|---|
| `fastapi-vue` | `fastapi-vue:implement-fastapi-vue` |
| `node-vue` | `node-vue:implement-node-vue` |
