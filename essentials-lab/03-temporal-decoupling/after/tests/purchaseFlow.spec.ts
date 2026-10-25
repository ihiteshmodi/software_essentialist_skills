import { describe, expect, it } from 'vitest';
import { Analytics, Inventory, Mailer, PaymentProvider } from '../../shared-infra';
import { compose } from '../src/compose';

const james = { orderId: 'o1', customerId: 'james', email: 'james@example.com', quantity: 3, unitPrice: 100 };

const setup = (options: { decline?: string[]; mailDown?: boolean } = {}) => {
  const infra = { inventory: new Inventory(100), payments: new PaymentProvider(options.decline), mailer: new Mailer(options.mailDown), analytics: new Analytics() };
  return { infra, ...compose(infra) };
};

// The subject is widened to include the event bus because we verify the whole temporal chain.
describe('purchase flow (event-driven)', () => {
  it('confirms the order, keeps the seats and emails the tickets on the happy path', async () => {
    const { infra, orders, placeOrder } = setup();

    await placeOrder.execute(james);

    expect((await orders.get('o1'))?.getStatus()).toBe('Confirmed');
    expect(infra.inventory.seatsLeft).toBe(97);
    expect(infra.mailer.sent).toEqual([{ to: 'james@example.com', template: 'tickets-confirmed' }]);
    expect(infra.analytics.events).toEqual(['order_placed']);
  });

  it('cancels the order, releases the seats and tells the customer when the card is declined', async () => {
    const { infra, orders, placeOrder } = setup({ decline: ['james'] });

    await placeOrder.execute(james);

    expect((await orders.get('o1'))?.getStatus()).toBe('Cancelled');
    expect(infra.inventory.seatsLeft).toBe(100);
    expect(infra.mailer.sent).toEqual([{ to: 'james@example.com', template: 'payment-failed' }]);
  });

  it('still confirms the order when the mail provider is down, and records only that failure', async () => {
    const { infra, bus, orders, placeOrder } = setup({ mailDown: true });

    const result = await placeOrder.execute(james);

    expect(result.type).toBe('OrderPlaced');
    expect((await orders.get('o1'))?.getStatus()).toBe('Confirmed');
    expect(infra.analytics.events).toEqual(['order_placed']);
    expect(bus.failures).toEqual([
      { handler: 'notifications.ticketsConfirmed', event: 'PaymentSucceeded', error: 'Mail provider unavailable' },
    ]);
  });

  it('dispatches events in the order they happened', async () => {
    const { bus, placeOrder } = setup();

    await placeOrder.execute(james);

    expect(bus.published.map((e) => e.type)).toEqual(['OrderPlaced', 'PaymentSucceeded']);
  });
});
