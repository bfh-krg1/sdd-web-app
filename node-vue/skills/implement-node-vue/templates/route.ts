import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { EntityService } from '../services/entity'

const EntityCreateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
})

const EntityResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
})

const entityRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/entities', async () => {
    return EntityService.getAll()
  })

  fastify.get<{ Params: { id: string } }>('/entities/:id', async (req, reply) => {
    const item = await EntityService.getById(Number(req.params.id))
    if (!item) return reply.status(404).send({ error: 'Not found' })
    return item
  })

  fastify.post(
    '/entities',
    {
      schema: {
        body: EntityCreateSchema,
      },
    },
    async (req, reply) => {
      const data = EntityCreateSchema.parse(req.body)
      const item = await EntityService.create(data)
      return reply.status(201).send(item)
    },
  )

  fastify.delete<{ Params: { id: string } }>('/entities/:id', async (req, reply) => {
    const deleted = await EntityService.remove(Number(req.params.id))
    if (!deleted) return reply.status(404).send({ error: 'Not found' })
    return reply.status(204).send()
  })
}

export default entityRoutes
