---
name: refactor
description: >
  AIUP-aware refactor: proposes a plan, applies it, re-runs linter and tests, only finishes
  if tests still pass. Use when the user says "refactor this", "clean up the code",
  "restructure", or "simplify without changing behavior".
---

# Refactor

## Instructions

Refactor the codebase or a specific area without changing externally observable behavior.
Acceptance criteria in feature specs are the definition of "behavior" — all ACs must still
pass after the refactor.

## DO NOT

- Change behavior observable through tests
- Skip re-running tests after the refactor
- Apply the refactor without a confirmed plan first
- Mark features as Done/changed — only the code structure changes

## Workflow

1. Read all relevant `docs/features/*.md` to understand the ACs that define expected behavior
2. Analyse the code to refactor
3. Write a refactor plan (bullet points: what changes, why, what stays the same)
4. Present the plan and ask the user to confirm before applying
5. Apply the refactor
6. Run linter:
   - fastapi-vue: `cd backend && ruff check --fix .`
   - node-vue: `cd backend && npx eslint --fix src/ && npx prettier --write src/`
7. Run tests: invoke `/test` for affected features
8. If tests pass: report success
9. If tests fail: revert the change (`git checkout .`), report which test failed and why
