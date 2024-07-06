DO $$ BEGIN
 CREATE TYPE "public"."answerType" AS ENUM('unassisted', 'withQuestionTypeHint', 'withTheory', 'withCode');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."difficulty" AS ENUM('easy', 'medium', 'hard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "instances" (
	"id" uuid PRIMARY KEY NOT NULL,
	"questionId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"answerType" "answerType" NOT NULL,
	"queuedFor" timestamp,
	"answeredAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"category" varchar(30) NOT NULL,
	"link" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userNotes" (
	"userId" uuid NOT NULL,
	"questionId" uuid NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "userNotes_userId_questionId_pk" PRIMARY KEY("userId","questionId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instances" ADD CONSTRAINT "instances_questionId_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instances" ADD CONSTRAINT "instances_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userNotes" ADD CONSTRAINT "userNotes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userNotes" ADD CONSTRAINT "userNotes_questionId_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
