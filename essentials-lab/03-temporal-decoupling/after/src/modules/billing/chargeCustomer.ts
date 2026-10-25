import type { PaymentProvider } from '../../../../shared-infra';
import type { EventBus, OrderPlaced } from '../../shared/eventBus';

// Billing reacts to OrderPlaced and reports the outcome as its own event (including the failure path).
export const chargeCustomer = (payments: PaymentProvider, bus: EventBus) => async (e: OrderPlaced) => {
  try {
    await payments.charge(e.customerId, e.total);
  } catch (error) {
    await bus.publish({ type: 'PaymentFailed', orderId: e.orderId, email: e.email, quantity: e.quantity, reason: (error as Error).message });
    return;
  }
  await bus.publish({ type: 'PaymentSucceeded', orderId: e.orderId, email: e.email });
};
