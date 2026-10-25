import { randomUUID } from 'node:crypto';
import type { DatabaseSync } from 'node:sqlite';
import type { Order, OrdersRepository, PaymentGateway } from '../modules/tickets/ports';
import type { User, UsersRepository } from '../modules/users/usersRepository';
import type { IdGenerator } from '../shared/ports';

export class RandomIds implements IdGenerator {
  next() { return randomUUID(); }
}

export class InMemoryUsersRepository implements UsersRepository {
  private users = new Map<string, User>();
  async save(user: User) { this.users.set(user.id, { ...user }); }
  async getById(id: string) { return this.users.get(id) ?? null; }
  async getByEmail(email: string) { return [...this.users.values()].find((u) => u.email === email) ?? null; }
}

export class InMemoryOrdersRepository implements OrdersRepository {
  private orders: Order[] = [];
  async save(order: Order) { this.orders.push({ ...order }); }
  async forUser(userId: string) { return this.orders.filter((o) => o.userId === userId); }
}

export class SqliteUsersRepository implements UsersRepository {
  constructor(private readonly db: DatabaseSync) {
    db.exec('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE)');
  }
  async save(user: User) { this.db.prepare('INSERT INTO users (id, email) VALUES (?, ?)').run(user.id, user.email); }
  async getById(id: string) { return (this.db.prepare('SELECT id, email FROM users WHERE id = ?').get(id) as User | undefined) ?? null; }
  async getByEmail(email: string) { return (this.db.prepare('SELECT id, email FROM users WHERE email = ?').get(email) as User | undefined) ?? null; }
}

export class SqliteOrdersRepository implements OrdersRepository {
  constructor(private readonly db: DatabaseSync) {
    db.exec('CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, user_id TEXT, quantity INTEGER, total INTEGER)');
  }
  async save(o: Order) { this.db.prepare('INSERT INTO orders (id, user_id, quantity, total) VALUES (?, ?, ?, ?)').run(o.id, o.userId, o.quantity, o.total); }
  async forUser(userId: string) {
    const rows = this.db.prepare('SELECT id, user_id, quantity, total FROM orders WHERE user_id = ?').all(userId) as Array<{ id: string; user_id: string; quantity: number; total: number }>;
    return rows.map((r) => ({ id: r.id, userId: r.user_id, quantity: r.quantity, total: r.total }));
  }
}

export class FakePaymentGateway implements PaymentGateway {
  readonly charges: Array<{ userId: string; amount: number }> = [];
  constructor(private readonly options: { declineAll?: boolean } = {}) {}
  async charge(userId: string, amount: number) {
    if (this.options.declineAll) return { ok: false as const, reason: 'Card declined' };
    this.charges.push({ userId, amount });
    return { ok: true as const };
  }
}

export class HttpPaymentGateway implements PaymentGateway {
  constructor(private readonly baseUrl: string, private readonly apiKey: string) {}
  async charge(userId: string, amount: number) {
    const res = await fetch(`${this.baseUrl}/charges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ userId, amount }),
    });
    return res.ok ? { ok: true as const } : { ok: false as const, reason: `Provider returned ${res.status}` };
  }
}
