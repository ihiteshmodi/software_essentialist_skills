import { randomUUID } from 'node:crypto';
import { db } from './db';
import { charge } from './payments';

const PRICE = Number(process.env.TICKET_PRICE ?? 100);

export function registerUser(email: string) {
  const id = randomUUID();
  db.prepare('INSERT INTO users (id, email) VALUES (?, ?)').run(id, email);
  return id;
}

export async function purchaseTickets(userId: string, quantity: number) {
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
  if (!user) return { error: 'unknown user' };
  try {
    await charge(userId, quantity * PRICE);
  } catch {
    return { error: 'payment failed' };
  }
  const id = randomUUID();
  db.prepare('INSERT INTO orders (id, user_id, quantity, total) VALUES (?, ?, ?, ?)').run(id, userId, quantity, quantity * PRICE);
  return { orderId: id };
}
