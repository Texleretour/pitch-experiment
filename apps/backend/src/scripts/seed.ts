import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type Database from "better-sqlite3";

export async function seedTestData(db: Database.Database) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const existingData = db.prepare("SELECT COUNT(*) as count FROM PARTICIPANTS;").get() as {
    count: number;
  };

  if (existingData.count > 0) {
    return;
  }

  const insert = db.prepare("INSERT INTO PARTICIPANTS (code) VALUES (@code);");
  const { participants } = JSON.parse(
    await readFile(path.join(__dirname, "../../data/seed.json"), "utf8"),
  );

  const seed = db.transaction((participants) => {
    for (const participant of participants) insert.run(participant);
  });

  seed(participants);
}
