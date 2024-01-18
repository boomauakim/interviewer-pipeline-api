-- -------------------------------------------------------------
-- TablePlus 5.8.4(530)
--
-- https://tableplus.com/
--
-- Database: interviewer-pipeline
-- Generation Time: 2567-01-18 12:38:18.4690
-- -------------------------------------------------------------


-- Table Definition
CREATE TABLE "public"."_prisma_migrations" (
    "id" varchar(36) NOT NULL,
    "checksum" varchar(64) NOT NULL,
    "finished_at" timestamptz,
    "migration_name" varchar(255) NOT NULL,
    "logs" text,
    "rolled_back_at" timestamptz,
    "started_at" timestamptz NOT NULL DEFAULT now(),
    "applied_steps_count" int4 NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
);

-- Type Definition
CREATE TYPE "public"."Status" AS ENUM ('TO_DO', 'IN_PROGRESS', 'DONE');

-- Table Definition
CREATE TABLE "public"."task" (
    "id" text NOT NULL,
    "user_id" text NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'TO_DO'::"Status",
    "is_archived" bool NOT NULL DEFAULT false,
    "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- Table Definition
CREATE TABLE "public"."task_changelog" (
    "id" text NOT NULL,
    "task_id" text NOT NULL,
    "user_id" text NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "status" "public"."Status" NOT NULL,
    "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- Table Definition
CREATE TABLE "public"."task_comment" (
    "id" text NOT NULL,
    "task_id" text NOT NULL,
    "user_id" text NOT NULL,
    "comment" text NOT NULL,
    "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- Table Definition
CREATE TABLE "public"."user" (
    "id" text NOT NULL,
    "email" text NOT NULL,
    "name" text NOT NULL,
    "password" text NOT NULL,
    "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
('ca3247a5-34c6-49b2-90c4-a6c293262c2b', '1775b1fc52701054152b37f2b15bb1a89ca8c7f5f7daedad15b1250a1d734479', '2024-01-18 05:11:19.184442+00', '20240118041709_init', NULL, NULL, '2024-01-18 05:11:19.163189+00', 1);

INSERT INTO "public"."task" ("id", "user_id", "title", "description", "status", "is_archived", "created_at", "updated_at") VALUES
('7a436fe2-5274-4f7b-8b3a-3baad51f3c59', '2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'Candidate 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'TO_DO', 'f', '2024-01-18 05:25:33.255', '2024-01-18 05:25:33.255'),
('cb53e39f-23c7-4785-b048-3809b82ef9e9', '2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'Candidate 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'TO_DO', 'f', '2024-01-18 05:25:33.258', '2024-01-18 05:25:33.258'),
('f6b1c3f3-3c3a-4d3b-9e9e-8a7c8d5f5f5b', '2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'Candidate 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'TO_DO', 'f', '2024-01-18 05:25:33.249', '2024-01-18 05:25:33.249');

INSERT INTO "public"."task_changelog" ("id", "task_id", "user_id", "title", "description", "status", "created_at", "updated_at") VALUES
('16f7cd64-2502-43b0-abed-ba0c941b72ea', '7a436fe2-5274-4f7b-8b3a-3baad51f3c59', '2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'Candidate 2', 'Task created', 'TO_DO', '2024-01-18 05:25:33.27', '2024-01-18 05:25:33.27'),
('2dfcf037-7bc8-4fa0-a9f9-ac27557ed35d', 'cb53e39f-23c7-4785-b048-3809b82ef9e9', '2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'Candidate 3', 'Task created', 'TO_DO', '2024-01-18 05:25:33.271', '2024-01-18 05:25:33.271'),
('45b4cd9a-b5d1-4449-a8ac-0cdec05f2754', 'f6b1c3f3-3c3a-4d3b-9e9e-8a7c8d5f5f5b', '2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'Candidate 1', 'Task created', 'TO_DO', '2024-01-18 05:25:33.267', '2024-01-18 05:25:33.267'),
('607f8811-76c6-4ab6-bc67-a190617dd2aa', 'f6b1c3f3-3c3a-4d3b-9e9e-8a7c8d5f5f5b', '2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'Candidate 1', 'Comment created', 'TO_DO', '2024-01-18 05:25:33.273', '2024-01-18 05:25:33.273'),
('c1c79f7f-dcc1-463d-991a-29c661c7f8f7', 'f6b1c3f3-3c3a-4d3b-9e9e-8a7c8d5f5f5b', '2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'Candidate 1', 'Comment created', 'TO_DO', '2024-01-18 05:25:33.275', '2024-01-18 05:25:33.275'),
('fcff5cd9-aab1-4fc2-ab24-bea59d6c31e3', 'f6b1c3f3-3c3a-4d3b-9e9e-8a7c8d5f5f5b', '96072241-d69f-45f4-867e-770176fb4395', 'Candidate 1', 'Comment created', 'TO_DO', '2024-01-18 05:25:33.274', '2024-01-18 05:25:33.274');

INSERT INTO "public"."task_comment" ("id", "task_id", "user_id", "comment", "created_at", "updated_at") VALUES
('47dc887c-109e-4302-8152-33e5e60f4625', 'f6b1c3f3-3c3a-4d3b-9e9e-8a7c8d5f5f5b', '96072241-d69f-45f4-867e-770176fb4395', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2024-01-18 05:25:33.264', '2024-01-18 05:25:33.264'),
('ce1a79d9-726f-4ca1-9994-6f992514e08d', 'f6b1c3f3-3c3a-4d3b-9e9e-8a7c8d5f5f5b', '2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2024-01-18 05:25:33.26', '2024-01-18 05:25:33.26'),
('e9c9dc87-d6c3-40d4-a9ed-fb01dea8a88a', 'f6b1c3f3-3c3a-4d3b-9e9e-8a7c8d5f5f5b', '2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2024-01-18 05:25:33.265', '2024-01-18 05:25:33.265');

INSERT INTO "public"."user" ("id", "email", "name", "password", "created_at", "updated_at") VALUES
('2b3c6d78-dc01-4379-8ad7-ee1f448c33b6', 'tony@avenger.team', 'Tony', '$2b$10$AnUzEOcS6FEynzoZ8XRdWuIVZF9S/iiCLL5qEikgkUj2tWixK7zJa', '2024-01-18 05:25:33.24', '2024-01-18 05:25:33.24'),
('96072241-d69f-45f4-867e-770176fb4395', 'roger@avenger.team', 'Roger', '$2b$10$TIUK5sdLRbYnRzPGq7B.Pu97hq73w5AGPexRC6/fUG7DDv4o/0xL6', '2024-01-18 05:25:33.247', '2024-01-18 05:25:33.247');

ALTER TABLE "public"."task" ADD FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE;
ALTER TABLE "public"."task_changelog" ADD FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE;
ALTER TABLE "public"."task_changelog" ADD FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."task_comment" ADD FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE;
ALTER TABLE "public"."task_comment" ADD FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
