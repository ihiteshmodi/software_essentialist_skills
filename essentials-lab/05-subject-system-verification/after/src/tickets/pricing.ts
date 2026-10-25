export type TicketType = 'standard' | 'early-bird';
export type Price = { subtotal: number; discount: number; total: number };

export const UNIT_PRICE: Record<TicketType, number> = { standard: 100, 'early-bird': 80 };
export const GROUP_SIZE = 5;
export const GROUP_DISCOUNT = 0.1;

// Level 1: data in, data out.
export function priceTickets(quantity: number, type: TicketType): Price {
  const subtotal = quantity * UNIT_PRICE[type];
  const discount = quantity >= GROUP_SIZE ? Math.round(subtotal * GROUP_DISCOUNT) : 0;
  return { subtotal, discount, total: subtotal - discount };
}
