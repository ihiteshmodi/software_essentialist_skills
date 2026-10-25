import { describe, expect, it } from 'vitest';
import { Analytics, Inventory, Mailer, PaymentProvider } from '../../shared-infra';
import { makePurchase, type PaidOrder } from '../src/makePurchase';

const james = { customerId: 'james', email: 'james@example.com', quantity: 3, unitPrice: 100 };

const setup = (options: { decline?: string[]; mailDown?: boolean } = {}) => ({
  inventory: new Inventory(100),
  payments: new PaymentProvider(options.decline),
  orders: [] as PaidOrder[],
  mailer: new Mailer(options.mailDown),
  analytics: new Analytics(),
});

// These tests pass, and that is the problem: they document the damage a transaction script does.
describe('makePurchase (transaction script)', () => {
  it('works on the happy path', async () => {
    const deps = setup();
    await makePurchase(deps, james);
    expect(deps.orders).toHaveLength(1);
  });

  it('leaves seats reserved with no order when the card is declined', async () => {
    const deps = setup({ decline: ['james'] });

    await expect(makePurchase(deps, james)).rejects.toThrow('Card declined');

    expect(deps.inventory.seatsLeft).toBe(97);
    expect(deps.orders).toHaveLength(0);
  });

  it('fails the whole purchase when email is down, although the customer was already charged', async () => {
    const deps = setup({ mailDown: true });

    await expect(makePurchase(deps, james)).rejects.toThrow('Mail provider unavailable');

    expect(deps.payments.charges).toHaveLength(1);
    expect(deps.orders).toHaveLength(1);
    expect(deps.analytics.events).toEqual([]);
  });
});
