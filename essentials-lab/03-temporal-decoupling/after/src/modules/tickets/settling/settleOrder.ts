import type { OrdersStore } from '../ordersStore';

// Policies reacting to billing: confirm on success, cancel on failure.
export const confirmOrder = (orders: OrdersStore) => async (e: { orderId: string }) => {
  const order = await orders.get(e.orderId);
  if (!order) throw new Error(`Unknown order ${e.orderId}`);
  order.confirm();
  await orders.save(order);
};

export const cancelOrder = (orders: OrdersStore) => async (e: { orderId: string }) => {
  const order = await orders.get(e.orderId);
  if (!order) throw new Error(`Unknown order ${e.orderId}`);
  order.cancel();
  await orders.save(order);
};
