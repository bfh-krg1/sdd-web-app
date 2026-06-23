---
name: ship
description: >
  Pushes a feature branch to origin after user confirmation, then offers to open a PR via
  gh (GitHub) or glab (GitLab). Always asks before pushing — never pushes automatically.
  Use when the user says "ship this", "push the branch", "open a PR", or "ship FEAT-001".
  No-arg = current branch.
argument-hint: "[FEAT-001]"
disable-model-invocation: true
---

# Ship

## Instructions

Push a feature branch to origin only after explicit user confirmation.
Then offer to open a PR using `gh` or `glab` (auto-detected from remote URL).

## DO NOT

- Push without asking first
- Create a PR without offering first
- Operate on `main` or `master` directly
- Run on a branch that is not a `feat/` branch (warn and stop)

## Workflow

1. Determine target branch:
   - With args: find the branch matching `feat/FEAT-XXX-*`
   - No args: use current branch (`git rev-parse --abbrev-ref HEAD`)
2. Verify the branch is a `feat/` branch — warn and stop if not
3. Show: branch name, number of commits ahead of base, changed files count
4. Ask: "Push `feat/FEAT-XXX-<slug>` to origin? (y/N)"
5. If confirmed:
   ```bash
   git push -u origin <branch>
   ```
6. Detect remote CLI (see [references/git-workflow.md](references/git-workflow.md))
7. If `gh` available: offer "Open a PR on GitHub? (y/N)"
   - If yes: read the feature spec, create PR:
     ```bash
     gh pr create \
       --title "FEAT-XXX: Feature Title" \
       --body "## Summary\n\nImplements FEAT-XXX.\n\n## Acceptance Criteria\n\n- [ ] AC1\n- [ ] AC2\n\nSee [docs/features/FEAT-XXX-*.md]"
     ```
8. If `glab` available: same with `glab mr create`
9. If neither: inform user to install `gh` or `glab` and authenticate
