import type { DatabaseSync } from 'node:sqlite';
import { User } from '../domain/user';
import type { UsersRepository } from '../usersRepository';

type UserRow = { id: string; email: string; password: string; registered_at: string };

export class SqliteUsersRepository implements UsersRepository {
  constructor(private readonly db: DatabaseSync) {
    db.exec('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE, password TEXT, registered_at TEXT)');
  }

  async findByEmail(email: string) {
    const row = this.db.prepare('SELECT * FROM users WHERE email = ?').get(email) as UserRow | undefined;
    if (!row) return null;
    return User.create({ id: row.id, email: row.email, password: row.password, registeredAt: new Date(row.registered_at) }) as User;
  }

  async save(user: User) {
    const s = user.toSnapshot();
    this.db
      .prepare('INSERT INTO users (id, email, password, registered_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET email = excluded.email, password = excluded.password')
      .run(s.id, s.email, s.password, s.registeredAt.toISOString());
  }
}
