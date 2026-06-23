---
name: test-node-vue
description: >
  Creates and runs Vitest tests for Fastify features with AC traceability via describe blocks.
  Uses real database — never mocks the DB layer. Invoked by core:test and core:sprint.
  Use when the user says "test node", "vitest", "write backend tests", or "run tests".
argument-hint: "FEAT-001"
---

# Test — Fastify + Vitest

## Instructions

Create Vitest tests for the feature in `$ARGUMENTS`. One test per AC.
Tests use real database — no mocking. Feature traceability via `describe("FEAT-XXX: Title > AC1: ...")`.

## Monorepo layout

Tests live in `backend/src/__tests__/` or `backend/tests/`:
```
backend/
└── tests/
    ├── setup.ts             # DB setup + teardown
    └── FEAT_NAME.test.ts    # one file per feature
```

## DO NOT

- Mock the database layer
- Use `describe.skip` or `it.skip` (remove failing tests, don't skip)
- Mix features in one test file

## vitest.config.ts pattern (create in backend/ if absent)

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globalSetup: './tests/setup.ts',
    environment: 'node',
  },
})
```

## setup.ts pattern

```typescript
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../src/db/schema'

export async function setup() {
  // Migrations run before tests (drizzle-kit migrate or SQL)
}

export async function teardown() {
  // Drop test data
}
```

## Workflow

1. Read `docs/features/FEAT-XXX-*.md` for the feature spec and ACs
2. Check `backend/tests/setup.ts` — create if absent
3. Check `backend/vitest.config.ts` — create if absent
4. Create `backend/tests/FEAT_NAME.test.ts` with one test per AC
5. Run: `cd backend && npx vitest run tests/FEAT_NAME.test.ts`
6. Report results with AC traceability
