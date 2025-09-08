import Database from "better-sqlite3";

const db = new Database("database.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS transcripts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    original_json TEXT NOT NULL,
    summary TEXT,
    sentiment TEXT,
    action_items TEXT
  )
`);

export default db;
