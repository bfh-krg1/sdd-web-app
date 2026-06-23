---
name: e2e-node-vue
description: >
  Creates and runs Playwright E2E tests against the running Fastify + Vue3 app.
  Tests are black-box: getByRole/getByLabel locators only, no waitForTimeout.
  Invoked by core:e2e. Requires the app to be running.
argument-hint: "FEAT-001"
---

# E2E — Fastify + Vue3 + Playwright

## Instructions

Create Playwright E2E tests for the feature in `$ARGUMENTS`. The app must be running.
Default URLs: frontend `http://localhost:5173` (Vite dev) and API `http://localhost:3000`.

## DO NOT

- Use CSS class selectors, data-testid, or raw XPath — use `getByRole`, `getByLabel`, `getByText`
- Use `waitForTimeout` — use `waitFor` with a condition instead
- Read implementation files — tests are black-box
- Run tests before checking the app is running

## Workflow

1. Warn user: "Make sure the app is running (`docker compose up` or `npm run dev` in both backend/ and frontend/)"
2. Read `docs/features/FEAT-XXX-*.md` for ACs
3. Check if `playwright.config.ts` exists at monorepo root — create if absent (same as fastapi-vue)
4. Create `e2e/FEAT-XXX-<slug>.spec.ts` with one `test()` per AC
5. Run: `npx playwright test e2e/FEAT-XXX-*.spec.ts`
6. Report results with AC traceability
