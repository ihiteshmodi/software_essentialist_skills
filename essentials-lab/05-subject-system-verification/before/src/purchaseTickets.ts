import { randomUUID } from 'node:crypto';
import { sendEmail } from './mailer';
import { saveOrder } from './ordersDb';
import { charge } from './payments';

export async function purchaseTickets(input: { email: string; card: string; quantity: number }) {
  const result = (await charge(input.card, input.quantity * 100)) as unknown as { ok: boolean };
  if (!result.ok) return { type: 'PaymentDeclined' as const };
  const id = randomUUID();
  await saveOrder({ id, email: input.email, quantity: input.quantity, status: 'paid' });
  await sendEmail(input.email, 'tickets-confirmed');
  return { type: 'OrderPaid' as const, orderId: id };
}
