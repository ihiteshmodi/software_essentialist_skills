import { randomUUID } from 'node:crypto';
import type { Analytics, Inventory, Mailer, PaymentProvider } from '../../shared-infra';

export type PurchaseCommand = { customerId: string; email: string; quantity: number; unitPrice: number };
export type PaidOrder = { id: string; customerId: string; quantity: number; total: number; status: 'Paid' };

export type PurchaseDeps = {
  inventory: Inventory;
  payments: PaymentProvider;
  orders: PaidOrder[];
  mailer: Mailer;
  analytics: Analytics;
};

// Transaction script: every follow-up is appended as another awaited step.
export async function makePurchase(deps: PurchaseDeps, cmd: PurchaseCommand): Promise<PaidOrder> {
  const total = cmd.quantity * cmd.unitPrice;
  await deps.inventory.reserve(cmd.quantity);
  await deps.payments.charge(cmd.customerId, total);
  const order: PaidOrder = { id: randomUUID(), customerId: cmd.customerId, quantity: cmd.quantity, total, status: 'Paid' };
  deps.orders.push(order);
  await deps.mailer.send(cmd.email, 'tickets-confirmed');
  await deps.analytics.track('order_placed');
  return order;
}
