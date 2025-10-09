import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

//Coffee Table 
export const coffeesTable = pgTable("coffees", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  brand: varchar({ length: 50 }).notNull(),
});

// Flavor Table 
export const flavorsTable = pgTable("flavors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
});

// Junction Table (Many-to-Many) 
export const coffeeFlavorsTable = pgTable("coffee_flavors", {
  coffeeId: integer("coffee_id")
    .notNull()
    .references(() => coffeesTable.id, { onDelete: "cascade" }),
  flavorId: integer("flavor_id")
    .notNull()
    .references(() => flavorsTable.id, { onDelete: "cascade" }),
});

// Define Relations 
export const coffeesRelations = relations(coffeesTable, ({ many }) => ({
  coffeeFlavors: many(coffeeFlavorsTable),
}));

export const flavorsRelations = relations(flavorsTable, ({ many }) => ({
  coffeeFlavors: many(coffeeFlavorsTable),
}));

export const coffeeFlavorsRelations = relations(coffeeFlavorsTable, ({ one }) => ({
  coffee: one(coffeesTable, {
    fields: [coffeeFlavorsTable.coffeeId],
    references: [coffeesTable.id],
  }),
  flavor: one(flavorsTable, {
    fields: [coffeeFlavorsTable.flavorId],
    references: [flavorsTable.id],
  }),
}));

// Export all tables
export const schema = {
  coffeesTable,
  flavorsTable,
  coffeeFlavorsTable,
};
