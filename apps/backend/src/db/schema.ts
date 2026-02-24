import type Database from "better-sqlite3";

export function createSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "participants" (
        "code" varchar(8) PRIMARY KEY,
        "interference_group" bool,
        "octave_group" bool,
        "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "learning_task_trials" (
        "trial_number" integer,
        "participant_code" varchar(8),
        "block_id" integer,
        "reference_to_target_real_distance_cents" integer,
        "is_proposition_correct" bool,
        "is_participant_correct" bool,
        "response_time_ms" integer,
        "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY ("trial_number", "participant_code", "block_id"),
        FOREIGN KEY ("participant_code") REFERENCES "participants" ("code")
    );

    CREATE TABLE IF NOT EXISTS "post_task_trials" (
        "trial_number" integer,
        "participant_code" varchar(8),
        "block_id" integer,
        "reference_to_target_real_distance_cents" integer,
        "is_proposition_correct" bool,
        "is_participant_correct" bool,
        "response_time_ms" integer,
        "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY ("trial_number", "participant_code", "block_id"),
        FOREIGN KEY ("participant_code") REFERENCES "participants" ("code")
    );

    CREATE TABLE IF NOT EXISTS "inm_task_trials" (
        "participant_code" varchar(8),
        "trial_number" integer,
        "reference_to_answer_distance_cents" integer,
        "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY ("participant_code", "trial_number"),
        FOREIGN KEY ("participant_code") REFERENCES "participants" ("code")
    );
`);
}
