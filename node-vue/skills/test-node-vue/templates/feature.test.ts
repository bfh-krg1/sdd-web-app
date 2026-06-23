import { describe, it, expect, beforeAll, afterAll } from 'vitest'

// Start the Fastify server before tests
let baseURL: string
beforeAll(async () => {
  const { buildApp } = await import('../src/app')
  const app = await buildApp()
  await app.listen({ port: 0 }) // random port
  const address = app.server.address()
  baseURL = typeof address === 'string' ? address : `http://localhost:${address?.port}`
})

describe('FEAT-001: Feature Title', () => {
  describe('AC1: given no entities exist, list returns empty array', () => {
    it('returns 200 with empty array', async () => {
      const res = await fetch(`${baseURL}/entities`)
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(Array.isArray(data)).toBe(true)
    })
  })

  describe('AC2: given valid data, when created, entity appears in list', () => {
    it('creates entity and returns 201', async () => {
      const res = await fetch(`${baseURL}/entities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Entity' }),
      })
      expect(res.status).toBe(201)
      const data = await res.json()
      expect(data.name).toBe('Test Entity')
      expect(data.id).toBeTypeOf('number')
    })

    it('created entity appears in list', async () => {
      const listRes = await fetch(`${baseURL}/entities`)
      const items = await listRes.json()
      const names = items.map((i: { name: string }) => i.name)
      expect(names).toContain('Test Entity')
    })
  })
})
