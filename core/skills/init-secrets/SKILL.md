---
name: init-secrets
description: >
  Reads .env.example and generates .env with cryptographically random values for all
  <replace: ...> placeholders using openssl rand. Use when the user says "init secrets",
  "generate the env file", "set up env", or "create .env from the example".
---

# Init Secrets

## Instructions

Read `.env.example`, replace all `<replace: ...>` placeholders with random values generated
via the specified `openssl rand` command, and write `.env`.

## DO NOT

- Print secret values to the terminal or in any response
- Commit `.env` to git
- Overwrite an existing `.env` without asking first

## Workflow

1. Check if `.env` already exists:
   - If yes: ask "`.env` already exists. Overwrite it? (y/N)"
   - If no: proceed
2. Read `.env.example`
3. For each line matching `KEY=<replace: COMMAND>`:
   - Run the command via Bash (e.g. `openssl rand -hex 32`)
   - Replace the placeholder with the output
4. Write the result to `.env`
5. Verify `.env` is listed in `.gitignore` — add it if missing
6. Confirm: "`.env` written. Never commit this file."

## Placeholder format

```
SECRET_KEY=<replace: openssl rand -hex 32>
POSTGRES_PASSWORD=<replace: openssl rand -hex 24>
```

The command after `replace:` is run verbatim via Bash.
