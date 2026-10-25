import { createCharge } from '../../provider-sdk';

export async function charge(card: string, amount: number) {
  return createCharge({ card, amountInCents: amount * 100 });
}
