import type { DatabaseSync } from 'node:sqlite';
import { createCharge } from '../../../provider-sdk';
import { Order, type OrderSnapshot } from '../tickets/order';
import type { Clock, OrdersRepository, PaymentGateway } from '../tickets/ports';

export class InMemoryOrdersRepository implements OrdersRepository {
  private rows = new Map<string, OrderSnapshot>();
  async save(order: Order) { this.rows.set(order.id, order.toSnapshot()); }
  async getById(id: string) {
    const row = this.rows.get(id);
    return row ? Order.fromSnapshot(row) : null;
  }
}

export class SqliteOrdersRepository implements OrdersRepository {
  constructor(private readonly db: DatabaseSync) {
    db.exec('CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, email TEXT, quantity INTEGER, total INTEGER, status TEXT, paid_at TEXT)');
  }
  async save(order: Order) {
    const s = order.toSnapshot();
    this.db
      .prepare('INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET status = excluded.status, paid_at = excluded.paid_at')
      .run(s.id, s.email, s.quantity, s.total, s.status, s.paidAt);
  }
  async getById(id: string) {
    const row = this.db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as
      | { id: string; email: string; quantity: number; total: number; status: OrderSnapshot['status']; paid_at: string | null }
      | undefined;
    return row
      ? Order.fromSnapshot({ id: row.id, email: row.email, quantity: row.quantity, total: row.total, status: row.status, paidAt: row.paid_at })
      : null;
  }
}

// Adapter over the provider SDK: translates its { status } response into our contract.
export class ProviderPaymentGateway implements PaymentGateway {
  async charge(card: string, amount: number) {
    const response = await createCharge({ card, amountInCents: amount * 100 });
    return response.status;
  }
}

export class SystemClock implements Clock {
  now() { return new Date(); }
  async tickForward(seconds: number) { await new Promise((resolve) => setTimeout(resolve, seconds * 1000)); }
}
