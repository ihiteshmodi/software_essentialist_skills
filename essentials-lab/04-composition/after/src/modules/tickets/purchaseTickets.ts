import type { IdGenerator } from '../../shared/ports';
import type { UsersRepository } from '../users/usersRepository';
import type { OrdersRepository, PaymentGateway } from './ports';

export type PurchaseTicketsResult =
  | { type: 'OrderPlaced'; orderId: string; total: number }
  | { type: 'UnknownUser' }
  | { type: 'PaymentFailed'; reason: string };

// Every collaborator arrives through the constructor; nothing is imported "willy nilly".
export class PurchaseTickets {
  constructor(
    private readonly users: UsersRepository,
    private readonly orders: OrdersRepository,
    private readonly payments: PaymentGateway,
    private readonly ids: IdGenerator,
    private readonly ticketPrice: number,
  ) {}

  async execute(input: { userId: string; quantity: number }): Promise<PurchaseTicketsResult> {
    if (!(await this.users.getById(input.userId))) return { type: 'UnknownUser' };
    const total = input.quantity * this.ticketPrice;
    const payment = await this.payments.charge(input.userId, total);
    if (!payment.ok) return { type: 'PaymentFailed', reason: payment.reason };
    const order = { id: this.ids.next(), userId: input.userId, quantity: input.quantity, total };
    await this.orders.save(order);
    return { type: 'OrderPlaced', orderId: order.id, total };
  }
}
