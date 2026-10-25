import { newId } from '../../../shared/ids';
import { isValidTicketQuantity } from '../domain/order';
import type { OrdersStore } from '../ordersStore';

export type PurchaseTicketsResult =
  | { type: 'OrderPlaced'; orderId: string }
  | { type: 'UnknownUser' }
  | { type: 'InvalidQuantity' };

// Command: changes state. Depends only on the question it needs answered about users.
export const purchaseTickets =
  (deps: { orders: OrdersStore; userExists: (userId: string) => boolean }) =>
  (input: { userId: string; quantity: number }): PurchaseTicketsResult => {
    if (!deps.userExists(input.userId)) return { type: 'UnknownUser' };
    if (!isValidTicketQuantity(input.quantity)) return { type: 'InvalidQuantity' };

    const orderId = newId();
    deps.orders.add({ id: orderId, userId: input.userId, quantity: input.quantity });
    return { type: 'OrderPlaced', orderId };
  };
