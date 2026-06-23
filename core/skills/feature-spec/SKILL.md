---
name: feature-spec
description: >
  Creates lightweight feature specification files in docs/features/ using story + Given/When/Then
  acceptance criteria. No UML, no ceremony. Use when the user asks to "write feature specs",
  "create features", "spec out the features", "write acceptance criteria", or "define FEAT IDs".
  No-arg = all FRs from requirements.md. With args = specific FR IDs (e.g. FR-001 FR-003).
argument-hint: "[FR-001 ...]"
---

# Feature Spec

## Instructions

Create `docs/features/FEAT-XXX-<slug>.md` for each functional requirement specified in `$ARGUMENTS`,
or all Open FRs if no arguments given. Map FR IDs to FEAT IDs sequentially (FR-001 → FEAT-001).
Use [templates/feature.md](templates/feature.md) as the document structure.

## DO NOT

- Create PlantUML or UML diagrams
- Write vague ACs without a clear Given/When/Then structure
- Leave Status as anything other than `Draft` for new specs
- Write more than one feature per file
- Duplicate FEAT IDs

## Workflow

1. Read `docs/requirements.md` — collect all FR rows (or just those matching $ARGUMENTS)
2. Read `docs/data_model.md` for entity context
3. For each FR:
   a. Derive FEAT-XXX ID from FR-XXX (same number, FEAT prefix)
   b. Derive slug from FR title: lowercase, spaces→hyphens, max 40 chars
   c. Fill the template: title, user story from FR, ACs from FR description + data model
   d. Write `docs/features/FEAT-XXX-<slug>.md`
4. Report which files were created
5. Suggest next step: `/sprint` or `/implement`
