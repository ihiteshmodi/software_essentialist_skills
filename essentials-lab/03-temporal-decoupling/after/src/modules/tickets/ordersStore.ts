import type { Order } from './domain/order';

export class OrdersStore {
  private orders = new Map<string, Order>();
  async save(order: Order) { this.orders.set(order.id, order); }
  async get(id: string) { return this.orders.get(id) ?? null; }
}
