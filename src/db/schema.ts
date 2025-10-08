import { varchar, integer, pgTable } from 'drizzle-orm/pg-core';

export const coffeesTable = pgTable('coffees', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  brand: varchar({ length: 50 }).notNull(),
});

// Export all tables for Drizzle
export const schema = {
  coffeesTable,
};
