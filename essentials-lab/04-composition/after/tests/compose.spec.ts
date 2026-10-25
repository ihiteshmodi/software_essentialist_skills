import { describe, expect, it } from 'vitest';
import { compose, type Env } from '../src/compose';
import { FakePaymentGateway } from '../src/infra/actors';

const config = { ticketPrice: 100 };

// Same behavior, different actors per environment: the use cases never notice.
describe.each<Env>(['test', 'development'])('the composed application (%s)', (env) => {
  it('lets a registered user buy tickets', async () => {
    const { app } = compose(env, config);
    const registered = await app.users.register({ email: 'james@example.com' });
    if (registered.type !== 'Registered') throw new Error('setup failed');

    const result = await app.tickets.purchase({ userId: registered.userId, quantity: 3 });

    expect(result).toMatchObject({ type: 'OrderPlaced', total: 300 });
  });

  it('knows an email cannot register twice', async () => {
    const { app } = compose(env, config);
    await app.users.register({ email: 'james@example.com' });

    expect((await app.users.register({ email: 'JAMES@example.com' })).type).toBe('EmailAlreadyTaken');
  });
});

describe('swapping one actor', () => {
  it('reports a declined payment by injecting a declining gateway, no env flags needed', async () => {
    const payments = new FakePaymentGateway({ declineAll: true });
    const { app } = compose('test', config, { payments });
    const registered = await app.users.register({ email: 'james@example.com' });
    if (registered.type !== 'Registered') throw new Error('setup failed');

    const result = await app.tickets.purchase({ userId: registered.userId, quantity: 3 });

    expect(result).toEqual({ type: 'PaymentFailed', reason: 'Card declined' });
    expect(payments.charges).toEqual([]);
  });
});
