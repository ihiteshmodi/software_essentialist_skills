import type { Order } from '../models/order';

export class OrderRepository {
  private orders: Order[] = [];

  add(order: Order) { this.orders.push(order); }
  findByUser(userId: string) { return this.orders.filter((o) => o.userId === userId); }
}
