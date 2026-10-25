import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import { InMemoryOrdersRepository, ProviderPaymentGateway, SqliteOrdersRepository, SystemClock } from '../src/infra/actors';
import type { Clock, OrdersRepository, PaymentGateway } from '../src/tickets/ports';
import { FakeClock, FakePaymentGateway } from './doubles/doubles';
import { OrderStates } from './doubles/orderStates';

// Level 4 · contract tests: one spec per role, looped over every implementation (fake and real).

describe.each<[string, () => OrdersRepository]>([
  ['in-memory', () => new InMemoryOrdersRepository()],
  ['sqlite', () => new SqliteOrdersRepository(new DatabaseSync(':memory:'))],
])('OrdersRepository contract (%s)', (_name, makeRepo) => {
  it('returns a saved order with its state', async () => {
    const repo = makeRepo();
    await repo.save(OrderStates.paidOn('2026-10-05T10:00:00Z'));

    const found = await repo.getById('order-1');

    expect(found?.toSnapshot()).toEqual(OrderStates.paidOn('2026-10-05T10:00:00Z').toSnapshot());
  });

  it('overwrites an order when it changes state', async () => {
    const repo = makeRepo();
    const order = OrderStates.paidOn('2026-10-05T10:00:00Z');
    await repo.save(order);
    order.refund();
    await repo.save(order);

    expect((await repo.getById('order-1'))?.status).toBe('Refunded');
  });

  it('knows an unknown id finds nothing', async () => {
    expect(await makeRepo().getById('nope')).toBeNull();
  });
});

describe.each<[string, () => { gateway: PaymentGateway; goodCard: string; declinedCard: string }]>([
  ['fake', () => ({ gateway: new FakePaymentGateway(['4000000000000002']), goodCard: '4242424242424242', declinedCard: '4000000000000002' })],
  ['provider', () => ({ gateway: new ProviderPaymentGateway(), goodCard: '4242424242424242', declinedCard: '4000000000000002' })],
])('PaymentGateway contract (%s)', (_name, make) => {
  it('approves a good card', async () => {
    const { gateway, goodCard } = make();
    expect(await gateway.charge(goodCard, 300)).toBe('approved');
  });

  it('declines a declined card', async () => {
    const { gateway, declinedCard } = make();
    expect(await gateway.charge(declinedCard, 300)).toBe('declined');
  });
});

describe.each<[string, () => Clock]>([
  ['system', () => new SystemClock()],
  ['fake', () => new FakeClock()],
])('Clock contract (%s)', (_name, makeClock) => {
  it('can tick forward', async () => {
    const clock = makeClock();
    const start = clock.now().getTime();

    await clock.tickForward(0.05);

    expect(clock.now().getTime() - start).toBeGreaterThanOrEqual(50);
  });
});
