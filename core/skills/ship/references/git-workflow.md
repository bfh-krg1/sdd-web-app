# Git Workflow Reference

Shared conventions used by implement, sprint, and ship skills.

## Branch naming

Format: `feat/FEAT-XXX-<slug>`

- `FEAT-XXX` — zero-padded feature ID matching `docs/features/FEAT-XXX-*.md`
- `<slug>` — feature title, lowercased, spaces and punctuation replaced with hyphens, max 40 chars

Examples:
- `feat/FEAT-001-user-login`
- `feat/FEAT-007-search-by-keyword`

## Branch create/switch

```bash
git checkout -b feat/FEAT-001-user-login 2>/dev/null || git checkout feat/FEAT-001-user-login
```

## Base branch detection

```bash
git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@'
```

Fall back to `main` if no remote HEAD is set.

## Commit message format

```
FEAT-001: Feature Title

- AC1: acceptance criterion text
- AC2: acceptance criterion text
```

The first line is `FEAT-XXX: <title from feature spec>`. The body lists each AC from the feature spec.

## Remote / CLI detection

```bash
git remote get-url origin 2>/dev/null
```

- Contains `github.com` → use `gh` CLI
- Contains `gitlab` → use `glab` CLI
- Neither CLI installed → push only, skip PR creation

## Push protocol

**Never push automatically.** Always ask:

> "Push `feat/FEAT-001-user-login` to origin? (y/N)"

Only after `y` (or explicit confirmation) run:

```bash
git push -u origin feat/FEAT-001-user-login
```
