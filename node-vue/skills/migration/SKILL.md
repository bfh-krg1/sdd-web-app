---
name: migration
description: >
  Creates and applies Drizzle Kit migrations from TypeScript schema files in the monorepo
  backend/ directory. Use when the user says "run migration", "drizzle migration",
  "update the database schema", or after implementing new schemas.
---

# Migration (Node / Drizzle Kit)

## Instructions

Generate and apply Drizzle Kit migrations from schema files in `backend/src/db/schema/`.
All operations run from the `backend/` directory.

## DO NOT

- Hand-write migration SQL when Drizzle Kit can generate it
- Skip adding the pgvector extension for vector columns
- Run `drizzle-kit migrate` without reviewing generated SQL first
- Run from project root — always `cd backend` first

## Workflow

1. `cd backend`
2. Check if `drizzle.config.ts` exists — create if absent:
   ```typescript
   import { defineConfig } from 'drizzle-kit'
   export default defineConfig({
     schema: './src/db/schema/*',
     out: './drizzle',
     dialect: 'postgresql',
     dbCredentials: {
       url: process.env.DATABASE_URL!,
     },
   })
   ```
3. Check `docs/data_model.md` for vector columns — if present, add to the migration SQL:
   `CREATE EXTENSION IF NOT EXISTS vector;`
4. Run: `npx drizzle-kit generate`
5. Review the generated SQL in `drizzle/`
6. If pgvector columns present, prepend the extension creation to the migration SQL file
7. Run: `npx drizzle-kit migrate`
8. Confirm: "Migration applied."
