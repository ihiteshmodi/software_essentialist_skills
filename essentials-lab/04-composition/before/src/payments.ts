export const fakeCharges: Array<{ userId: string; amount: number }> = [];

export async function charge(userId: string, amount: number) {
  if (process.env.NODE_ENV === 'production') {
    const res = await fetch(`${process.env.PAYMENTS_URL}/charges`, { method: 'POST', body: JSON.stringify({ userId, amount }) });
    if (!res.ok) throw new Error('Payment failed');
    return;
  }
  if (process.env.DECLINE_ALL === 'true') throw new Error('Payment failed');
  fakeCharges.push({ userId, amount });
}
