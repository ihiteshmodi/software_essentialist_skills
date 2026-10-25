import express from 'express';
import type { ApplicationAPI } from '../application';

const STATUS: Record<string, number> = { Registered: 201, OrderPlaced: 201, EmailAlreadyTaken: 409, UnknownUser: 404, PaymentFailed: 402 };

// Delivery mechanism: it *uses* the application; it doesn't build it.
export function createWebServer(app: ApplicationAPI) {
  const server = express();
  server.use(express.json());
  server.post('/users', async (req, res) => {
    const result = await app.users.register({ email: String(req.body?.email ?? '') });
    res.status(STATUS[result.type]).json(result);
  });
  server.post('/orders', async (req, res) => {
    const result = await app.tickets.purchase({ userId: String(req.body?.userId ?? ''), quantity: Number(req.body?.quantity) });
    res.status(STATUS[result.type]).json(result);
  });
  return server;
}
