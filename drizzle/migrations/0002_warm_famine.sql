CREATE TABLE "events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50),
	"type" varchar(50),
	"payload" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "coffees" ADD COLUMN "recommendations" integer DEFAULT 0 NOT NULL;