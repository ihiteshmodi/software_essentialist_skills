import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import type { ApplicationAPI } from '../src/application';
import { createWebServer } from '../src/web/server';

const fakeApp = () => ({
  users: { register: vi.fn().mockResolvedValue({ type: 'Registered', userId: 'u1' }) },
  tickets: { purchase: vi.fn().mockResolvedValue({ type: 'OrderPlaced', orderId: 'o1', total: 300 }) },
}) satisfies ApplicationAPI;

// Level 6: endpoints call the right use case with the right parameters. The app itself is a trivial stub.
describe('web server', () => {
  it('POST /orders calls tickets.purchase with the parsed body', async () => {
    const app = fakeApp();

    const res = await request(createWebServer(app)).post('/orders').send({ userId: 'u1', quantity: '3' });

    expect(app.tickets.purchase).toHaveBeenCalledWith({ userId: 'u1', quantity: 3 });
    expect(res.status).toBe(201);
  });

  it('POST /users calls users.register with the email', async () => {
    const app = fakeApp();

    await request(createWebServer(app)).post('/users').send({ email: 'james@example.com' });

    expect(app.users.register).toHaveBeenCalledWith({ email: 'james@example.com' });
  });
});
