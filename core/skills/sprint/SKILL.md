---
name: sprint
description: >
  Batch skill: implements, tests, and commits all Approved features in one run.
  No-arg = all docs/features/*.md with Status Approved. With args = specific FEAT IDs.
  Creates a branch per feature, implements, tests, auto-commits locally if green, marks Done.
  Never pushes automatically — offers /ship at the end. Use when the user says "run the sprint",
  "implement everything", "batch implement", or "process all features".
argument-hint: "[FEAT-001 ...]"
---

# Sprint

## Instructions

Process features in order: branch → implement → lint → test → commit (if green) → Done.
Never push to origin without explicit confirmation. Offer `/ship` at the end.

## DO NOT

- Push to origin automatically
- Mark a feature Done before its tests pass
- Continue to the next feature if the current one fails (stop and report)
- Mix multiple features in one commit

## Workflow

1. Read `docs/architecture.md` → get stack name (fastapi-vue or node-vue)
2. Detect base branch: `git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@'` or fall back to `main`
3. Ensure there are no uncommitted changes on base branch (warn if dirty)
4. Collect features to process:
   - No args: all `docs/features/*.md` where `**Status:** Approved`
   - With args: only the specified FEAT IDs
5. For each feature (in FEAT-XXX order):
   a. Read the feature spec
   b. Create/switch to `feat/FEAT-XXX-<slug>` branch (see [references/git-workflow.md](../ship/references/git-workflow.md) for branch naming)
   c. Invoke stack implement skill (fastapi-vue:implement-fastapi-vue or node-vue:implement-node-vue) for this single feature
   d. Run linter:
      - fastapi-vue: `cd backend && ruff check --fix .`
      - node-vue: `cd backend && npx eslint --fix src/ && npx prettier --write src/`
   e. Invoke stack test skill for this feature
   f. If tests pass:
      - Auto-commit: message format from [references/git-workflow.md](../ship/references/git-workflow.md)
      - Update feature Status to `Done` in `docs/features/FEAT-XXX-*.md`
      - Switch back to base branch
      - Continue to next feature
   g. If tests fail:
      - Report: which test failed, the error output, and which AC it maps to
      - Stop the sprint (do NOT process remaining features)
      - Suggest: fix the issue and re-run `/sprint FEAT-XXX` or `/test FEAT-XXX`
6. Print summary table:
   ```
   | FEAT | Title | Status | Branch |
   |------|-------|--------|--------|
   ```
7. Offer: "Run `/ship` to push completed feature branches."

## Error recovery

If git operations fail (e.g. branch already exists with conflicts):
- Report the conflict clearly
- Ask whether to reset the branch or skip this feature
- Never force-reset without asking
