import { InvalidTransition } from './order';
import type { Clock, EmailService, OrdersRepository } from './ports';

export const REFUND_WINDOW_DAYS = 14;

export type RefundOrderResult = { type: 'Refunded' } | { type: 'UnknownOrder' } | { type: 'RefundWindowClosed' } | { type: 'NotRefundable' };

// Knowing *when* is an application concern: the use case asks the clock; the order only guards its arrows.
export class RefundOrder {
  constructor(private readonly orders: OrdersRepository, private readonly emails: EmailService, private readonly clock: Clock) {}

  async execute(input: { orderId: string }): Promise<RefundOrderResult> {
    const order = await this.orders.getById(input.orderId);
    if (!order) return { type: 'UnknownOrder' };

    const paidAt = order.paidAt;
    const windowEnds = paidAt && new Date(paidAt.getTime() + REFUND_WINDOW_DAYS * 24 * 60 * 60 * 1000);
    if (windowEnds && this.clock.now() > windowEnds) return { type: 'RefundWindowClosed' };

    if (order.refund() instanceof InvalidTransition) return { type: 'NotRefundable' };
    await this.orders.save(order);
    await this.emails.send(order.toSnapshot().email, 'refund-issued');
    return { type: 'Refunded' };
  }
}
