import { afterEach, describe, expect, it, vi } from 'vitest';

// To change one collaborator we must mutate globals and re-import the whole module graph.
const loadFreshModules = async (env: Record<string, string>) => {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
  const tickets = await import('../src/tickets');
  const payments = await import('../src/payments');
  return { ...tickets, ...payments };
};

describe('tickets (hidden wiring)', () => {
  afterEach(() => { vi.unstubAllEnvs(); });

  it('charges and places an order', async () => {
    const { registerUser, purchaseTickets, fakeCharges } = await loadFreshModules({ NODE_ENV: 'test' });
    const userId = registerUser('james@example.com');

    const result = await purchaseTickets(userId, 3);

    expect(result.orderId).toBeDefined();
    expect(fakeCharges).toEqual([{ userId, amount: 300 }]);
  });

  it('reports a failed payment (only by flipping an env flag the payment module secretly reads)', async () => {
    const { registerUser, purchaseTickets } = await loadFreshModules({ NODE_ENV: 'test', DECLINE_ALL: 'true' });
    const userId = registerUser('james@example.com');

    expect(await purchaseTickets(userId, 3)).toEqual({ error: 'payment failed' });
  });
});
