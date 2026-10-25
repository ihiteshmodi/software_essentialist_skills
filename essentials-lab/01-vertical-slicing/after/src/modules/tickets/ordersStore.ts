import type { OrderRecord } from './domain/order';

export class OrdersStore {
  private orders: OrderRecord[] = [];

  add(order: OrderRecord) { this.orders.push(order); }
  forUser(userId: string) { return this.orders.filter((o) => o.userId === userId); }
}
