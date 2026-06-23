---
name: implement-fastapi-vue
description: >
  Implements a feature using FastAPI + SQLAlchemy 2.0 + Vue3 in the monorepo.
  Creates backend models, schemas, services, routers in backend/ and Vue SFCs in frontend/.
  Invoked by core:implement and core:sprint — not usually called directly.
  Use when the user says "implement with FastAPI", "build fastapi-vue feature", or when
  core:architecture returns fastapi-vue.
argument-hint: "FEAT-001"
---

# Implement — FastAPI + Vue3

## Instructions

Implement the feature specified in `$ARGUMENTS` using FastAPI (backend) and Vue3 (frontend)
in the monorepo layout. Read the feature spec and data model before writing any code.

## Monorepo layout

```
backend/
├── app/
│   ├── main.py           # FastAPI app, router registration
│   ├── database.py       # AsyncSession, engine, Base
│   ├── models/           # SQLAlchemy Mapped[] models
│   ├── schemas/          # Pydantic v2 request/response schemas
│   ├── services/         # Business logic + DB queries
│   ├── routers/          # FastAPI APIRouter per feature
│   └── llm.py            # LLM provider (scaffold when feature needs RAG/embeddings)
├── requirements.txt
├── Dockerfile.api
└── alembic/              # created by /migration skill

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

- Write tests (use `fastapi-vue:test-fastapi-vue`)
- Run migrations (use `fastapi-vue:migration`)
- Use synchronous SQLAlchemy functions in async context
- Use `session.query()` — use `select()` with `session.execute()`
- Import models in schemas or vice versa (keep layers separate)

## Files to create per feature

1. `backend/app/models/<entity>.py` — SQLAlchemy `Mapped[]` model
2. `backend/app/schemas/<entity>.py` — Pydantic v2 schemas (Create, Update, Response)
3. `backend/app/services/<feature>.py` — async service functions
4. `backend/app/routers/<feature>.py` — FastAPI router with CRUD endpoints
5. `frontend/src/stores/<feature>.ts` — Pinia store
6. `frontend/src/views/<Feature>View.vue` — Vue3 SFC with TailwindCSS
7. Register router in `backend/app/main.py` if not already present
8. Add route in `frontend/src/router/index.ts`

If feature mentions embeddings, search, similarity, or RAG:
- Scaffold `backend/app/llm.py` if absent (see LLM section below)
- Add `embedding vector(1536)` column to the relevant model

## After implementation

Run: `cd backend && ruff check --fix .`

## LLM provider module

Scaffold when a feature needs embeddings or text generation:

```python
# backend/app/llm.py
import os
from typing import Optional

async def generate(prompt: str, model: Optional[str] = None) -> str:
    """Generate text. Provider selected by env vars."""
    if os.getenv("OPENAI_API_KEY"):
        from openai import AsyncOpenAI
        client = AsyncOpenAI()
        resp = await client.chat.completions.create(
            model=model or "gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        return resp.choices[0].message.content
    elif os.getenv("GEMINI_API_KEY"):
        import google.generativeai as genai
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        m = genai.GenerativeModel(model or "gemini-1.5-flash")
        resp = await m.generate_content_async(prompt)
        return resp.text
    else:
        # Ollama (local)
        import httpx
        base = os.getenv("OLLAMA_BASE_URL", "http://ollama:11434")
        async with httpx.AsyncClient() as client:
            resp = await client.post(f"{base}/api/generate",
                json={"model": model or "llama3.2", "prompt": prompt, "stream": False})
            return resp.json()["response"]

async def embed(text: str) -> list[float]:
    """Generate embedding vector."""
    if os.getenv("OPENAI_API_KEY"):
        from openai import AsyncOpenAI
        client = AsyncOpenAI()
        resp = await client.embeddings.create(model="text-embedding-3-small", input=text)
        return resp.data[0].embedding
    else:
        import httpx
        base = os.getenv("OLLAMA_BASE_URL", "http://ollama:11434")
        async with httpx.AsyncClient() as client:
            resp = await client.post(f"{base}/api/embeddings",
                json={"model": "nomic-embed-text", "prompt": text})
            return resp.json()["embedding"]
```

## Workflow

1. Read `docs/features/FEAT-XXX-*.md` for the feature spec and ACs
2. Read `docs/data_model.md` for entity definitions
3. Check existing code in `backend/app/` for patterns and conventions
4. Create or update the model file
5. Create or update the schema file
6. Create the service file with one async function per AC
7. Create the router file with CRUD endpoints
8. Register the router in `backend/app/main.py`
9. Create the Pinia store in `frontend/src/stores/`
10. Create the Vue SFC in `frontend/src/views/`
11. Add the route in `frontend/src/router/index.ts`
12. Run `cd backend && ruff check --fix .`
