import type { OrdersStore } from '../ordersStore';

export type MyOrderView = { orderId: string; tickets: number };

// Query: reads only, returns the simplest shape the screen needs.
export const getMyOrders =
  (orders: OrdersStore) =>
  (userId: string): MyOrderView[] =>
    orders.forUser(userId).map((o) => ({ orderId: o.id, tickets: o.quantity }));
