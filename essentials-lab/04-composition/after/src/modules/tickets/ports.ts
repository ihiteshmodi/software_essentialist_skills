export type Order = { id: string; userId: string; quantity: number; total: number };

export interface OrdersRepository {
  save(order: Order): Promise<void>;
  forUser(userId: string): Promise<Order[]>;
}

export interface PaymentGateway {
  charge(userId: string, amount: number): Promise<{ ok: true } | { ok: false; reason: string }>;
}
