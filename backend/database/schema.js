import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const tarefa = pgTable("tarefa", {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    isComplete: boolean("isComplet").default(false).notNull(),
});