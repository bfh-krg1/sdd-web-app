---
name: requirements
description: >
  Gathers and documents software requirements into structured catalogs with functional
  requirements (FR, user stories), non-functional requirements (NFR, measurable quality
  attributes), and constraints (C). Use when the user asks to "write requirements",
  "create a PRD", "gather requirements", "document feature specs", "write user stories",
  "define NFRs", "list constraints", or mentions requirements catalog or product requirements document.
---

# Requirements

## Instructions

Create or update `docs/requirements.md` based on `docs/vision.md`. The document contains
three tables: functional requirements (FR), non-functional requirements (NFR), and constraints (C).

## DO NOT

- Mix requirement types in a single table
- Skip the user story format for FRs
- Use duplicate IDs across any table
- Leave the Status column empty
- Write vague NFRs without measurable thresholds

## Requirement Types

### Functional Requirements (FR)

User story format: **As a [role], I want [goal] so that [benefit].**

| ID | Title | User Story | Priority | Status |
|---|---|---|---|---|
| FR-001 | Example | As a user, I want to log in so that I can access my data. | High | Open |

### Non-Functional Requirements (NFR)

Must be measurable — include a number or threshold.

| ID | Title | Requirement | Category | Priority | Status |
|---|---|---|---|---|---|
| NFR-001 | Response Time | All API responses within 500ms at p95. | Performance | High | Open |

NFR categories: Performance, Availability, Security, Scalability, Usability, Maintainability, Compliance.

### Constraints (C)

Limitations imposed on the solution.

| ID | Title | Constraint | Category | Priority | Status |
|---|---|---|---|---|---|
| C-001 | Stack | Backend must use Python / FastAPI. | Technical | High | Open |

Constraint categories: Technical, Business, Schedule, Legal.

Priority values: High / Medium / Low
Status values: Open / In Progress / Done

## Quality Checks

Every requirement must pass:

| Check | Rule |
|---|---|
| Measurable | NFRs must have a number or threshold |
| Singular | One requirement per row |
| Unambiguous | No subjective terms ("user-friendly", "fast") |
| Testable | Can write a pass/fail test |
| Unique IDs | No duplicates across all tables |

## Workflow

1. Read `docs/vision.md` and `docs/architecture.md` (if present) for context
2. Identify user roles from vision
3. Write FR table — one row per user story, High/Medium priority
4. Write NFR table — derive from vision success criteria and common quality goals
5. Write C table — derive from vision tech constraints and stack choice
6. Validate: run every requirement against the quality checks
7. Write `docs/requirements.md`
8. Suggest next step: `/data-model` or `/feature-spec`
