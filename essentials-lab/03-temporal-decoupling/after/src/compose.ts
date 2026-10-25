import type { Analytics, Inventory, Mailer, PaymentProvider } from '../../shared-infra';
import { chargeCustomer } from './modules/billing/chargeCustomer';
import { releaseSeats, reserveSeats } from './modules/inventory/seats';
import { sendPaymentFailed, sendTicketsConfirmed } from './modules/notifications/emails';
import { OrdersStore } from './modules/tickets/ordersStore';
import { PlaceOrder } from './modules/tickets/placing/placeOrder';
import { cancelOrder, confirmOrder } from './modules/tickets/settling/settleOrder';
import { InProcessEventBus } from './shared/eventBus';

// Every "after X, do Y" policy is one subscription, listed in one place.
export function compose(infra: { inventory: Inventory; payments: PaymentProvider; mailer: Mailer; analytics: Analytics }) {
  const bus = new InProcessEventBus();
  const orders = new OrdersStore();

  bus.subscribe('OrderPlaced', 'inventory.reserveSeats', reserveSeats(infra.inventory));
  bus.subscribe('OrderPlaced', 'billing.chargeCustomer', chargeCustomer(infra.payments, bus));
  bus.subscribe('OrderPlaced', 'analytics.track', async () => infra.analytics.track('order_placed'));

  bus.subscribe('PaymentSucceeded', 'tickets.confirmOrder', confirmOrder(orders));
  bus.subscribe('PaymentSucceeded', 'notifications.ticketsConfirmed', sendTicketsConfirmed(infra.mailer));

  bus.subscribe('PaymentFailed', 'tickets.cancelOrder', cancelOrder(orders));
  bus.subscribe('PaymentFailed', 'inventory.releaseSeats', releaseSeats(infra.inventory));
  bus.subscribe('PaymentFailed', 'notifications.paymentFailed', sendPaymentFailed(infra.mailer));

  return { bus, orders, placeOrder: new PlaceOrder(orders, bus) };
}
