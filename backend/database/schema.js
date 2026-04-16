import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const tarefa = pgTable("tarefa", {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    isComplete: boolean("isComplete").default(false).notNull(),
    userId: integer("userId").notNull().references(() => user.id),
});

export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    senhaHash: text("senhaHash").notNull(),
});