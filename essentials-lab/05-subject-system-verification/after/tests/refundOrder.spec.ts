import { describe, expect, it } from 'vitest';
import { InMemoryOrdersRepository } from '../src/infra/actors';
import { RefundOrder } from '../src/tickets/refundOrder';
import { EmailServiceSpy, FakeClock } from './doubles/doubles';
import { OrderStates } from './doubles/orderStates';

const PAID_AT = '2026-10-05T10:00:00Z';
const DAY = 24 * 60 * 60;

const setup = async (order = OrderStates.paidOn(PAID_AT)) => {
  const orders = new InMemoryOrdersRepository();
  await orders.save(order);
  const clock = new FakeClock(new Date(PAID_AT));
  const emails = new EmailServiceSpy();
  return { orders, clock, emails, refund: new RefundOrder(orders, emails, clock) };
};

// Level 3 with time as a role: a fortnight passes instantly.
describe('RefundOrder', () => {
  it('refunds a paid order within 14 days and emails the customer', async () => {
    const { orders, clock, emails, refund } = await setup();
    await clock.tickForward(13 * DAY);

    expect(await refund.execute({ orderId: 'order-1' })).toEqual({ type: 'Refunded' });
    expect((await orders.getById('order-1'))?.status).toBe('Refunded');
    expect(emails.getTimesCalled()).toBe(1);
  });

  it('knows the refund window closes after 14 days', async () => {
    const { clock, emails, refund } = await setup();
    await clock.tickForward(15 * DAY);

    expect(await refund.execute({ orderId: 'order-1' })).toEqual({ type: 'RefundWindowClosed' });
    expect(emails.getTimesCalled()).toBe(0);
  });

  it('knows a cancelled order is not refundable', async () => {
    const { refund } = await setup(OrderStates.cancelled());

    expect(await refund.execute({ orderId: 'order-1' })).toEqual({ type: 'NotRefundable' });
  });
});
