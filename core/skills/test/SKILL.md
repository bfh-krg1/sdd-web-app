---
name: test
description: >
  Dispatcher: reads docs/architecture.md and delegates to the correct stack test skill.
  No-arg = all features. With args = specific FEAT IDs. Use when the user says "run tests",
  "test the features", "write tests", or "check the tests".
argument-hint: "[FEAT-001 ...]"
---

# Test

## Instructions

Dispatch to the correct stack test skill based on `docs/architecture.md`.

## Workflow

1. Read `docs/architecture.md` → extract `**Stack:**` value
2. Collect features to test (all non-Done, or specified FEAT IDs)
3. Dispatch:
   - `fastapi-vue` → invoke `fastapi-vue:test-fastapi-vue`
   - `node-vue` → invoke `node-vue:test-node-vue`
4. Report test results per feature with AC traceability
