CREATE TABLE "tarefa" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"isComplet" boolean DEFAULT false NOT NULL
);
