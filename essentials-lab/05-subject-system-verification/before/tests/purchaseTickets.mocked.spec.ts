import { describe, expect, it, vi } from 'vitest';
import { sendEmail } from '../src/mailer';
import { saveOrder } from '../src/ordersDb';
import { purchaseTickets } from '../src/purchaseTickets';

vi.mock('../src/payments', () => ({ charge: vi.fn().mockResolvedValue({ ok: true }) }));
vi.mock('../src/ordersDb', () => ({ saveOrder: vi.fn() }));
vi.mock('../src/mailer', () => ({ sendEmail: vi.fn() }));

// Library-mock soup: green, fast, and wrong. The mocked payment shape { ok } is not what the real client returns.
describe('purchaseTickets (mocked)', () => {
  it('saves the order and sends the email', async () => {
    const result = await purchaseTickets({ email: 'james@example.com', card: '4242424242424242', quantity: 3 });

    expect(result.type).toBe('OrderPaid');
    expect(saveOrder).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith('james@example.com', 'tickets-confirmed');
  });
});
