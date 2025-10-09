CREATE TABLE "coffee_flavors" (
	"coffee_id" integer NOT NULL,
	"flavor_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flavors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "flavors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "coffee_flavors" ADD CONSTRAINT "coffee_flavors_coffee_id_coffees_id_fk" FOREIGN KEY ("coffee_id") REFERENCES "public"."coffees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_flavors" ADD CONSTRAINT "coffee_flavors_flavor_id_flavors_id_fk" FOREIGN KEY ("flavor_id") REFERENCES "public"."flavors"("id") ON DELETE cascade ON UPDATE no action;