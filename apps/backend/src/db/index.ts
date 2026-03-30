import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import * as dotenv from "dotenv";
import { seedTestData } from "../scripts/seed.js";
import { createSchema } from "./schema.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let database: Database.Database;

if (process.env.NODE_ENV === "PROD") {
  database = new Database(`${process.env.DATA_DIR}/db.sqlite`);
} else {
  database = new Database(path.join(__dirname, "../../data/test.db"));
}

database.pragma("foreign_keys = ON");

createSchema(database);
process.env.NODE_ENV === "DEV" && seedTestData(database);

export default database;
