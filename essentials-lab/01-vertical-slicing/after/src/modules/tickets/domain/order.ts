export const MAX_TICKETS_PER_ORDER = 10;

export type OrderRecord = { id: string; userId: string; quantity: number };

export const isValidTicketQuantity = (quantity: number) =>
  Number.isInteger(quantity) && quantity >= 1 && quantity <= MAX_TICKETS_PER_ORDER;
