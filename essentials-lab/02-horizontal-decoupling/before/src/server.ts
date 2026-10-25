import { randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import express from 'express';

const REGISTRATION_CLOSES_AT = new Date('2026-11-01T00:00:00Z');

// HTTP parsing, business rules, time and SQL all live in one handler.
export function createServer(db = new DatabaseSync(':memory:')) {
  db.exec('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE, password TEXT, registered_at TEXT)');

  const app = express();
  app.use(express.json());

  app.post('/users', (req, res) => {
    const { email, password } = req.body ?? {};
    if (new Date() >= REGISTRATION_CLOSES_AT) {
      return res.status(403).json({ error: 'Registration is closed' });
    }
    if (typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'Password too short' });
    }
    const normalized = email.trim().toLowerCase();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalized);
    if (existing) return res.status(409).json({ error: 'Email already taken' });

    const id = randomUUID();
    const registeredAt = new Date().toISOString();
    db.prepare('INSERT INTO users (id, email, password, registered_at) VALUES (?, ?, ?, ?)').run(id, normalized, password, registeredAt);
    return res.status(201).json({ id, email: normalized, registeredAt });
  });

  return app;
}
