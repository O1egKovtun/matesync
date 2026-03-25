import Database from 'better-sqlite3';
import path from 'path';

// Connect to a local SQLite database or create it if it doesn't exist
const dbFile = path.join(process.cwd(), 'contacts.db');
const db = new Database(dbFile, { verbose: console.log });

// Initialize the database table
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    messenger_type TEXT NOT NULL,
    messenger_contact TEXT NOT NULL,
    services TEXT NOT NULL,
    brief TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
