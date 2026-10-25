import { Order } from './order';
import type { Clock, EmailService, IdGenerator, OrdersRepository, PaymentGateway } from './ports';
import { priceTickets, type TicketType } from './pricing';

export type PurchaseTicketsInput = { email: string; card: string; quantity: number; type: TicketType };
export type PurchaseTicketsResult = { type: 'OrderPaid'; orderId: string; total: number } | { type: 'PaymentDeclined'; orderId: string };

// Level 3: coordinates pricing (L1), the order state machine (L2) and three contracts.
export class PurchaseTickets {
  constructor(
    private readonly orders: OrdersRepository,
    private readonly payments: PaymentGateway,
    private readonly emails: EmailService,
    private readonly clock: Clock,
    private readonly ids: IdGenerator,
  ) {}

  async execute(input: PurchaseTicketsInput): Promise<PurchaseTicketsResult> {
    const { total } = priceTickets(input.quantity, input.type);
    const order = Order.create({ id: this.ids.next(), email: input.email, quantity: input.quantity, total });

    if ((await this.payments.charge(input.card, total)) === 'declined') {
      order.cancel();
      await this.orders.save(order);
      await this.emails.send(input.email, 'payment-declined');
      return { type: 'PaymentDeclined', orderId: order.id };
    }

    order.pay(this.clock.now());
    await this.orders.save(order);
    await this.emails.send(input.email, 'tickets-confirmed');
    return { type: 'OrderPaid', orderId: order.id, total };
  }
}
