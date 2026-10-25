import { describe, expect, it } from 'vitest';
import { purchaseTickets } from '../src/purchaseTickets';

// Same code with the real payment client: every valid card is "declined". The mocked test above never noticed.
describe('purchaseTickets (real collaborators)', () => {
  it('declines a perfectly good card because the mock lied about the response shape', async () => {
    const result = await purchaseTickets({ email: 'james@example.com', card: '4242424242424242', quantity: 3 });

    expect(result.type).toBe('PaymentDeclined');
  });
});
