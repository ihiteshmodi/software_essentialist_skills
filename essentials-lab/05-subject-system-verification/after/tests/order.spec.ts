import { describe, expect, it } from 'vitest';
import { InvalidTransition } from '../src/tickets/order';
import { OrderStates } from './doubles/orderStates';

// Level 2 · state verification: act, then inquire into state. One test per arrow and forbidden arrow.
describe('Order', () => {
  it('starts out pending', () => {
    expect(OrderStates.pending().status).toBe('Pending');
  });

  it('moves a pending order to paid and remembers when', () => {
    const order = OrderStates.pending();
    order.pay(new Date('2026-10-05T10:00:00Z'));
    expect(order.status).toBe('Paid');
    expect(order.paidAt).toEqual(new Date('2026-10-05T10:00:00Z'));
  });

  it('moves a paid order to refunded', () => {
    const order = OrderStates.paidOn('2026-10-05T10:00:00Z');
    order.refund();
    expect(order.status).toBe('Refunded');
  });

  it.each([
    { state: 'pending', make: OrderStates.pending, act: 'refund' },
    { state: 'cancelled', make: OrderStates.cancelled, act: 'pay' },
    { state: 'cancelled', make: OrderStates.cancelled, act: 'refund' },
  ] as const)('knows a $state order cannot $act', ({ make, act }) => {
    const order = make();
    const before = order.status;
    const error = act === 'pay' ? order.pay(new Date()) : order.refund();
    expect(error).toBeInstanceOf(InvalidTransition);
    expect(order.status).toBe(before);
  });
});
