---
name: implement-node-vue
description: >
  Implements a feature using Fastify + Drizzle ORM + Vue3 in the monorepo.
  Creates backend schemas, services, routes in backend/ and Vue SFCs in frontend/.
  Invoked by core:implement and core:sprint — not usually called directly.
  Use when the user says "implement with Fastify", "build node-vue feature", or when
  core:architecture returns node-vue.
argument-hint: "FEAT-001"
---

# Implement — Fastify + Vue3

## Instructions

Implement the feature specified in `$ARGUMENTS` using Fastify (backend) and Vue3 (frontend)
in the monorepo layout. Read the feature spec and data model before writing any code.

## Monorepo layout

```
backend/
├── src/
│   ├── index.ts          # Fastify server, plugin registration
│   ├── db/
│   │   ├── index.ts      # Drizzle client
│   │   └── schema/       # Drizzle table definitions per entity
│   ├── services/         # Business logic + Drizzle queries
│   ├── routes/           # Fastify plugins per feature
│   └── llm.ts            # LLM provider (scaffold when feature needs RAG/embeddings)
├── drizzle/              # generated migrations
├── drizzle.config.ts
├── package.json
└── Dockerfile.api

frontend/
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── router/index.ts
│   ├── stores/           # Pinia stores per feature
│   └── views/            # Vue SFCs per feature
├── package.json
├── vite.config.ts
└── Dockerfile.web

docker-compose.yml        # at monorepo root
.env.example              # at monorepo root
```

## DO NOT

- Write tests (use `node-vue:test-node-vue`)
- Run migrations (use `node-vue:migration`)
- Use `any` TypeScript type — use proper Zod schemas and Drizzle inferred types
- Use raw SQL — use Drizzle query builder

## Files to create per feature

1. `backend/src/db/schema/<entity>.ts` — Drizzle table definition
2. `backend/src/services/<feature>.ts` — service functions with Drizzle queries
3. `backend/src/routes/<feature>.ts` — Fastify plugin with Zod-validated routes
4. `frontend/src/stores/<feature>.ts` — Pinia store
5. `frontend/src/views/<Feature>View.vue` — Vue3 SFC with TailwindCSS
6. Register route plugin in `backend/src/index.ts`
7. Add route in `frontend/src/router/index.ts`

If feature mentions embeddings, search, similarity, or RAG:
- Scaffold `backend/src/llm.ts` if absent (see LLM section below)
- Add `vector` column to the Drizzle schema using `customType`

## After implementation

Run: `cd backend && npx eslint --fix src/ && npx prettier --write src/`

## LLM provider module

Scaffold when a feature needs embeddings or text generation:

```typescript
// backend/src/llm.ts
const OLLAMA_BASE = process.env.OLLAMA_BASE_URL ?? 'http://ollama:11434'

export async function generate(prompt: string, model?: string): Promise<string> {
  if (process.env.OPENAI_API_KEY) {
    const { OpenAI } = await import('openai')
    const client = new OpenAI()
    const resp = await client.chat.completions.create({
      model: model ?? 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    })
    return resp.choices[0].message.content ?? ''
  }
  // Ollama fallback
  const res = await fetch(`${OLLAMA_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: model ?? 'llama3.2', prompt, stream: false }),
  })
  const data = await res.json()
  return data.response as string
}

export async function embed(text: string): Promise<number[]> {
  if (process.env.OPENAI_API_KEY) {
    const { OpenAI } = await import('openai')
    const client = new OpenAI()
    const resp = await client.embeddings.create({ model: 'text-embedding-3-small', input: text })
    return resp.data[0].embedding
  }
  const res = await fetch(`${OLLAMA_BASE}/api/embeddings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'nomic-embed-text', prompt: text }),
  })
  const data = await res.json()
  return data.embedding as number[]
}
```

## Workflow

1. Read `docs/features/FEAT-XXX-*.md` for the feature spec and ACs
2. Read `docs/data_model.md` for entity definitions
3. Check existing code in `backend/src/` for patterns and conventions
4. Create or update the Drizzle schema file
5. Create the service file with one function per AC
6. Create the Fastify route plugin with Zod validation
7. Register the route in `backend/src/index.ts`
8. Create the Pinia store in `frontend/src/stores/`
9. Create the Vue SFC in `frontend/src/views/`
10. Add the route in `frontend/src/router/index.ts`
11. Run `cd backend && npx eslint --fix src/ && npx prettier --write src/`
