import type { Mailer } from '../../../../shared-infra';

export const sendTicketsConfirmed = (mailer: Mailer) => async (e: { email: string }) => {
  await mailer.send(e.email, 'tickets-confirmed');
};

export const sendPaymentFailed = (mailer: Mailer) => async (e: { email: string }) => {
  await mailer.send(e.email, 'payment-failed');
};
