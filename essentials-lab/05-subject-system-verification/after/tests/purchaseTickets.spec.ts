import { describe, expect, it } from 'vitest';
import { InMemoryOrdersRepository } from '../src/infra/actors';
import { PurchaseTickets } from '../src/tickets/purchaseTickets';
import { EmailServiceSpy, FakeClock, FakePaymentGateway, SequentialIds } from './doubles/doubles';

const DECLINED_CARD = '4000000000000002';
const GOOD_CARD = '4242424242424242';

const setup = () => {
  const orders = new InMemoryOrdersRepository();
  const payments = new FakePaymentGateway([DECLINED_CARD]);
  const emails = new EmailServiceSpy();
  const purchase = new PurchaseTickets(orders, payments, emails, new FakeClock(), new SequentialIds());
  return { orders, payments, emails, purchase };
};

// Level 3 · result + state + communication. The only level where we verify calls to collaborators.
describe('PurchaseTickets', () => {
  it('charges the discounted total, stores a paid order and emails the tickets', async () => {
    const { orders, payments, emails, purchase } = setup();

    const result = await purchase.execute({ email: 'james@example.com', card: GOOD_CARD, quantity: 5, type: 'standard' });

    expect(result).toEqual({ type: 'OrderPaid', orderId: 'order-1', total: 450 });                 // result
    expect((await orders.getById('order-1'))?.status).toBe('Paid');                                // state (indirect output)
    expect(payments.charges).toEqual([{ card: GOOD_CARD, amount: 450 }]);                          // communication
    expect(emails.getCalls()).toEqual([{ to: 'james@example.com', template: 'tickets-confirmed' }]); // communication
  });

  it('cancels the order and tells the customer when the card is declined', async () => {
    const { orders, emails, purchase } = setup();

    const result = await purchase.execute({ email: 'james@example.com', card: DECLINED_CARD, quantity: 3, type: 'standard' });

    expect(result.type).toBe('PaymentDeclined');
    expect((await orders.getById('order-1'))?.status).toBe('Cancelled');
    expect(emails.getCalls()).toEqual([{ to: 'james@example.com', template: 'payment-declined' }]);
  });
});
