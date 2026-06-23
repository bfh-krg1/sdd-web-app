import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const entities = pgTable('entities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Entity = typeof entities.$inferSelect
export type EntityInsert = typeof entities.$inferInsert
