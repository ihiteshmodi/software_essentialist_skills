import { randomUUID } from 'node:crypto';
import type { DatabaseSync } from 'node:sqlite';

export type User = { id: string; email: string };
export type RegisterResult = { type: 'Registered'; user: User } | { type: 'InvalidEmail' } | { type: 'EmailAlreadyTaken' };

// Deliberately thin: the skeleton proves the path UI → server → DB → deploy, not the design.
export class Users {
  private readonly db: DatabaseSync;

  constructor(db: DatabaseSync) {
    this.db = db;
    db.exec('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL)');
  }

  register(rawEmail: string): RegisterResult {
    const email = rawEmail.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { type: 'InvalidEmail' };
    if (this.findByEmail(email)) return { type: 'EmailAlreadyTaken' };
    const user = { id: randomUUID(), email };
    this.db.prepare('INSERT INTO users (id, email) VALUES (?, ?)').run(user.id, user.email);
    return { type: 'Registered', user };
  }

  findByEmail(email: string): User | null {
    return (this.db.prepare('SELECT id, email FROM users WHERE email = ?').get(email.trim().toLowerCase()) as User | undefined) ?? null;
  }
}
