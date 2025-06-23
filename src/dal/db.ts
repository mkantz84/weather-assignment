import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Path to the SQLite database file
const DB_PATH = "./weather.sqlite";

// Singleton pattern: store the Promise for the database connection
// This ensures the database is only opened once and all callers share the same connection
let dbPromise: Promise<Database<sqlite3.Database, sqlite3.Statement>> | null =
  null;

// Get the database connection (async)
// If the connection is not yet established, open it and store the Promise
// If already opening/opened, return the existing Promise
export async function getDb() {
  if (!dbPromise) {
    dbPromise = open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    });
  }
  return dbPromise;
}
