const orders: Array<{ id: string; email: string; quantity: number; status: string }> = [];

export async function saveOrder(order: { id: string; email: string; quantity: number; status: string }) {
  orders.push(order);
}

export async function findOrders(email: string) {
  return orders.filter((o) => o.email === email);
}
