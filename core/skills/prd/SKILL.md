---
name: prd
description: >
  Bootstraps all project docs from an existing docs/prd.md produced by another AI agent
  or planning tool. Extracts vision, requirements, architecture, data model, and feature specs
  directly from the PRD instead of running the stepwise wizard (/vision, /requirements, etc.).
  Use when the user says "I have a PRD", "read my PRD", "bootstrap from PRD", "I already have
  a product requirements document", or when docs/prd.md exists but docs/vision.md does not.
  Produces the same outputs as the full wizard flow; downstream skills (/sprint, /implement, etc.)
  work identically after this skill runs.
---

# PRD Bootstrap

## Instructions

Read `docs/prd.md` — a product requirements document written outside this workflow (e.g., by
another AI agent or a product manager). Extract every piece of information that maps to the
standard downstream artifacts. For anything the PRD does not specify, apply the defaults
documented below. Write all outputs; do not ask the user to fill gaps interactively.

## DO NOT

- Require the PRD to follow any particular format or template
- Skip writing a downstream file just because the PRD already contains that content inline —
  the standard files must exist so other skills can read them
- Ask the user six interview questions — the PRD replaces the /vision interview
- Invent features or requirements not present or clearly implied in the PRD
- Overwrite a downstream file that already exists without noting the overwrite

## Extraction map

Read the PRD and identify these elements. They may appear under any heading or phrasing:

| What to find | Maps to |
|---|---|
| App description, mission, problem statement | `docs/vision.md` — Mission section |
| Target users, personas, roles | `docs/vision.md` — Target Users + `docs/requirements.md` FR role column |
| Goals, success metrics, KPIs | `docs/vision.md` — Goals + `docs/requirements.md` NFR table |
| Scope in / scope out / exclusions / MVP boundaries | `docs/vision.md` — Scope sections |
| Features, user stories, epics, use cases, scenarios | `docs/requirements.md` FR table + `docs/features/*.md` |
| Non-functional requirements, performance, security, availability | `docs/requirements.md` NFR table |
| Constraints, tech decisions, stack choices, platform requirements | `docs/requirements.md` C table + `docs/architecture.md` |
| Data entities, schema, tables, models, ER descriptions | `docs/data_model.md` |
| Acceptance criteria, given/when/then, definition of done | `docs/features/FEAT-XXX-*.md` AC sections |
| Architecture, backend framework, frontend framework, DB | `docs/architecture.md` |

## Architecture inference rules

Apply in order — use the first rule that matches:

1. PRD explicitly names a framework/stack (e.g., "FastAPI", "Fastify", "Django", "Rails") →
   use that. If it matches `fastapi-vue` or `node-vue`, set accordingly. If it names an
   unsupported stack, set `docs/architecture.md` **Stack: fastapi-vue** and add a comment:
   `> Note: PRD mentioned <X>; defaulting to fastapi-vue as the closest supported stack.`

2. PRD mentions Python, async Python, or a Python library → **fastapi-vue**

3. PRD mentions TypeScript, Node.js, Bun, Deno, or a Node ecosystem library → **node-vue**

4. PRD says nothing about technology → **fastapi-vue** (project default)

## Outputs to write

Write all files even if the PRD already contains that content — downstream skills read
standard file paths, not the PRD.

### 1. `docs/vision.md`
Use the same format as the `/vision` skill output. If the PRD has no explicit scope-out
section, derive reasonable exclusions from the MVP framing or mark them as "not specified".

### 2. `docs/requirements.md`
- FR table: one row per user story derived from features/use cases in the PRD.
  If the PRD lists features without user story format, rewrite them as
  "As a [role], I want [goal] so that [benefit]."
- NFR table: derive from any quality goals, SLAs, security, or performance statements.
  If PRD is silent, omit NFRs rather than inventing them.
- C table: derive from tech constraints, platform requirements, or compliance statements.
  Always add a row for the resolved stack (e.g., "Backend must use Python / FastAPI").

### 3. `docs/architecture.md`
Use the same format as the `/architecture` skill. Apply the inference rules above.
If the PRD specifies a DB, LLM provider, or deploy target beyond the defaults, include them.

### 4. `docs/data_model.md`
- If the PRD contains an ER diagram, schema description, entity list, or data dictionary:
  extract entities and attributes into the standard attribute table format.
- If the PRD describes features that clearly imply entities (e.g., "users can create posts"):
  infer minimal entities with standard attributes (id, created_at, foreign keys).
- Mermaid ER diagram: generate if 2+ entities are identified.
- pgvector columns: add if PRD mentions search, recommendations, embeddings, or RAG.

### 5. `docs/features/FEAT-XXX-<slug>.md`
One file per distinct feature, use case, or user story from the PRD. Assign FEAT IDs
sequentially (FEAT-001, FEAT-002, …). Set **Status: Approved** (PRD content is already
validated — skip Draft review).

AC derivation:
- If PRD has explicit acceptance criteria, given/when/then, or definition of done → use them verbatim
- If PRD has scenarios or flow descriptions → rewrite as Given/When/Then ACs
- If PRD only has a brief feature description → infer 1-2 minimal ACs from the description

## Reporting

After writing all files, print a summary table:

```
## PRD Bootstrap Summary

| Artifact | Action | Notes |
|---|---|---|
| docs/vision.md | Written | |
| docs/requirements.md | Written | X FRs, Y NFRs, Z constraints |
| docs/architecture.md | Written | Stack: fastapi-vue (inferred / explicit) |
| docs/data_model.md | Written | X entities |
| docs/features/ | Written | FEAT-001 … FEAT-00N |
```

If any PRD section was ambiguous or required significant inference, list those decisions
so the user can review and correct before running `/sprint`.

## Workflow

1. Check that `docs/prd.md` exists — if absent, tell the user to place their PRD at that path
   and suggest running `/vision` instead if they want the guided interview
2. Read `docs/prd.md` in full
3. For each downstream artifact (vision → requirements → architecture → data-model → features):
   a. Check if the file already exists — if yes, note it will be overwritten
   b. Extract relevant content from the PRD
   c. Apply defaults for anything not found
   d. Write the file
4. Print the summary table
5. Suggest next step: review `docs/features/` then run `/sprint`
