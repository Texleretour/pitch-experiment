import type Database from "better-sqlite3";

export function createSchema(db: Database.Database) {
  db.exec(`
        CREATE TABLE IF NOT EXISTS participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        age INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}
