import request from 'supertest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createServer } from '../src/server';

// Every rule can only be checked through HTTP + a real database, and time needs a global patch.
describe('POST /users (fat handler)', () => {
  afterEach(() => { vi.useRealTimers(); });

  it('registers a user', async () => {
    vi.setSystemTime(new Date('2026-10-05T10:00:00Z'));
    const res = await request(createServer()).post('/users').send({ email: 'james@example.com', password: 'S3cure-pass!' });
    expect(res.status).toBe(201);
  });

  it('rejects a duplicate email', async () => {
    vi.setSystemTime(new Date('2026-10-05T10:00:00Z'));
    const app = createServer();
    await request(app).post('/users').send({ email: 'james@example.com', password: 'S3cure-pass!' });
    const res = await request(app).post('/users').send({ email: 'JAMES@example.com', password: 'Other-pass!' });
    expect(res.status).toBe(409);
  });

  it('rejects registration after the closing date', async () => {
    vi.setSystemTime(new Date('2026-11-02T00:00:00Z'));
    const res = await request(createServer()).post('/users').send({ email: 'late@example.com', password: 'S3cure-pass!' });
    expect(res.status).toBe(403);
  });
});
