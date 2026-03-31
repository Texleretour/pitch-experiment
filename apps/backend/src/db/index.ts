import path from "node:path";
import { fileURLToPath } from "node:url";
import { NODE_ENVS } from "@pitch-experiment/types";
import Database from "better-sqlite3";
import { CONFIG } from "../config.js";
import { seedTestData } from "../scripts/seed.js";
import { createSchema } from "./schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let database: Database.Database;

if (CONFIG.NODE_ENV === NODE_ENVS.PROD) {
  database = new Database(`${CONFIG.DATA_DIR}/db.sqlite`);
} else {
  database = new Database(path.join(__dirname, "../../data/test.db"));
}

database.pragma("foreign_keys = ON");

createSchema(database);
CONFIG.NODE_ENV === NODE_ENVS.DEV && seedTestData(database);

export default database;
