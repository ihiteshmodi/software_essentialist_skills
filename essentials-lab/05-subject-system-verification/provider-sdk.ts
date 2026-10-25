// Stand-in for a third-party payment SDK. Its real response shape is { status }, not { ok }.
export type ProviderResponse = { status: 'approved' | 'declined'; id: string };

const DECLINED_CARD_PREFIX = '4000';

export async function createCharge(request: { card: string; amountInCents: number }): Promise<ProviderResponse> {
  const status = request.card.startsWith(DECLINED_CARD_PREFIX) ? 'declined' : 'approved';
  return { status, id: `ch_${Math.abs(request.amountInCents)}_${request.card.slice(-4)}` };
}
