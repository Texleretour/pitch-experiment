import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { seedTestData } from "../scripts/seed";
import { createSchema } from "./schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const database: Database.Database = new Database(path.join(__dirname, "../../data/test.db"));

database.pragma("foreign_keys = ON");

createSchema(database);
seedTestData(database);

export default database;
