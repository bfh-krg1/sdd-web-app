import { eq } from 'drizzle-orm'
import { db } from '../db'
import { entities, type Entity, type EntityInsert } from '../db/schema/entity'

export const EntityService = {
  async getAll(): Promise<Entity[]> {
    return db.select().from(entities).orderBy(entities.id)
  },

  async getById(id: number): Promise<Entity | undefined> {
    const [item] = await db.select().from(entities).where(eq(entities.id, id))
    return item
  },

  async create(data: Omit<EntityInsert, 'id' | 'createdAt'>): Promise<Entity> {
    const [item] = await db.insert(entities).values(data).returning()
    return item
  },

  async remove(id: number): Promise<boolean> {
    const result = await db.delete(entities).where(eq(entities.id, id)).returning()
    return result.length > 0
  },
}
