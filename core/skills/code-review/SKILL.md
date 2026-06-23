---
name: code-review
description: >
  FEAT-aware wrapper around the bundled /code-review skill. Maps review findings to FEAT-XXX
  IDs and prefixes each finding with the relevant feature. Use when the user asks for a
  "code review", "review my code", or "check the implementation".
---

# Code Review

## Instructions

Determine which features are touched by the current changes, then delegate to the bundled
`/code-review` skill. Prefix each finding with `[FEAT-XXX]` where traceable.

## Workflow

1. Check the current git branch name — if it matches `feat/FEAT-XXX-*`, note the primary FEAT ID
2. Run `git diff --name-only HEAD~1` (or vs base branch) to see changed files
3. Cross-reference changed files against `docs/features/*.md` to identify affected features
4. Invoke bundled `/code-review`
5. For each finding: prefix with `[FEAT-XXX]` if the changed file belongs to that feature's implementation
6. Summarize: findings by feature, plus any cross-cutting findings
