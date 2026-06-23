---
name: e2e-fastapi-vue
description: >
  Creates and runs Playwright E2E tests against the running FastAPI + Vue3 app.
  Tests are black-box: getByRole/getByLabel locators only, no waitForTimeout.
  Invoked by core:e2e. Requires the app to be running.
argument-hint: "FEAT-001"
---

# E2E — FastAPI + Vue3 + Playwright

## Instructions

Create Playwright E2E tests for the feature in `$ARGUMENTS`. The app must be running.
Default URLs: frontend `http://localhost:5173` (Vite dev) and API `http://localhost:8000`.

## DO NOT

- Use CSS class selectors, data-testid, or raw XPath — use `getByRole`, `getByLabel`, `getByText`
- Use `waitForTimeout` — use `waitFor` with a condition instead
- Read implementation files — tests are black-box
- Run tests before checking the app is running

## Workflow

1. Warn user: "Make sure the app is running (`docker compose up` or `npm run dev` + `uvicorn`)"
2. Read `docs/features/FEAT-XXX-*.md` for ACs
3. Check if `playwright.config.ts` exists at monorepo root — create if absent
4. Create `e2e/FEAT-XXX-<slug>.spec.ts` with one `test()` per AC
5. Run: `npx playwright test e2e/FEAT-XXX-*.spec.ts`
6. Report results with AC traceability

## playwright.config.ts pattern (create at monorepo root if absent)

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
  },
})
```
