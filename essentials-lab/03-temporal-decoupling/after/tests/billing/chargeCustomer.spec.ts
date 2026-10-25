import { describe, expect, it } from 'vitest';
import { PaymentProvider } from '../../../shared-infra';
import { chargeCustomer } from '../../src/modules/billing/chargeCustomer';
import { InProcessEventBus, type OrderPlaced } from '../../src/shared/eventBus';

const orderPlaced: OrderPlaced = { type: 'OrderPlaced', orderId: 'o1', customerId: 'james', email: 'james@example.com', quantity: 3, total: 300 };

// Level 3 for one handler: its own slice, tested alone.
describe('chargeCustomer', () => {
  it('charges the total and announces PaymentSucceeded', async () => {
    const payments = new PaymentProvider();
    const bus = new InProcessEventBus();

    await chargeCustomer(payments, bus)(orderPlaced);

    expect(payments.charges).toEqual([{ customerId: 'james', amount: 300 }]);
    expect(bus.published.map((e) => e.type)).toEqual(['PaymentSucceeded']);
  });

  it('announces PaymentFailed with the reason when the card is declined', async () => {
    const bus = new InProcessEventBus();

    await chargeCustomer(new PaymentProvider(['james']), bus)(orderPlaced);

    expect(bus.published).toEqual([
      { type: 'PaymentFailed', orderId: 'o1', email: 'james@example.com', quantity: 3, reason: 'Card declined' },
    ]);
  });
});
