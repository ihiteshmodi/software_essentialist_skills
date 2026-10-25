import { describe, expect, it } from 'vitest';
import { priceTickets } from '../src/tickets/pricing';

// Level 1 · result verification: input → output, nothing else observed.
describe('ticket pricing', () => {
  it.each([
    { quantity: 1, type: 'standard', expected: { subtotal: 100, discount: 0, total: 100 } },
    { quantity: 4, type: 'standard', expected: { subtotal: 400, discount: 0, total: 400 } },
    { quantity: 5, type: 'standard', expected: { subtotal: 500, discount: 50, total: 450 } },
    { quantity: 3, type: 'early-bird', expected: { subtotal: 240, discount: 0, total: 240 } },
    { quantity: 7, type: 'early-bird', expected: { subtotal: 560, discount: 56, total: 504 } },
  ] as const)('knows $quantity $type tickets cost $expected.total', ({ quantity, type, expected }) => {
    expect(priceTickets(quantity, type)).toEqual(expected);
  });
});
