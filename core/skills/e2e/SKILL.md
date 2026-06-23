---
name: e2e
description: >
  Dispatcher: reads docs/architecture.md and delegates to the correct Playwright E2E skill.
  No-arg = all features. With args = specific FEAT IDs. Requires the app to be running.
  Use when the user says "run e2e", "playwright tests", "end to end tests", or "browser tests".
argument-hint: "[FEAT-001 ...]"
---

# E2E

## Instructions

Dispatch to the correct stack E2E skill based on `docs/architecture.md`.
Remind the user that the app must be running before E2E tests can execute.

## DO NOT

- Run E2E without warning that the app must be running
- Use implementation-specific locators (CSS classes, IDs) — accessibility locators only

## Workflow

1. Remind user: "Make sure the app is running (`docker compose up` or dev servers)"
2. Read `docs/architecture.md` → extract `**Stack:**` value
3. Collect features to test (all, or specified FEAT IDs)
4. Dispatch:
   - `fastapi-vue` → invoke `fastapi-vue:e2e-fastapi-vue`
   - `node-vue` → invoke `node-vue:e2e-node-vue`
5. Report E2E results per feature
