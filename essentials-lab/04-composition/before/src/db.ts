import { DatabaseSync } from 'node:sqlite';

// Chosen at import time from a global. Every importer gets whichever database the environment implied.
export const db = new DatabaseSync(process.env.NODE_ENV === 'production' ? (process.env.DB_PATH ?? 'prod.db') : ':memory:');
db.exec('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE)');
db.exec('CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, user_id TEXT, quantity INTEGER, total INTEGER)');
