import { Order } from '../../src/tickets/order';

// Named, well-known initial states so tests show intent, not setup.
export const OrderStates = {
  pending: () => Order.create({ id: 'order-1', email: 'james@example.com', quantity: 3, total: 300 }),
  paidOn: (date: string) => {
    const order = OrderStates.pending();
    order.pay(new Date(date));
    return order;
  },
  cancelled: () => {
    const order = OrderStates.pending();
    order.cancel();
    return order;
  },
};
