import { fileURLToPath } from 'node:url';
import type { DatabaseSync } from 'node:sqlite';
import express from 'express';
import { Users } from './users.ts';

const STATUS = { Registered: 201, InvalidEmail: 400, EmailAlreadyTaken: 409 } as const;

export function createApp(db: DatabaseSync) {
  const users = new Users(db);
  const app = express();
  app.use(express.json());
  app.use(express.static(fileURLToPath(new URL('../public', import.meta.url))));

  app.get('/health', (_req, res) => { res.json({ ok: true }); });

  app.post('/users', (req, res) => {
    const result = users.register(String(req.body?.email ?? ''));
    res.status(STATUS[result.type]).json(result);
  });

  app.get('/users', (req, res) => {
    const user = users.findByEmail(String(req.query.email ?? ''));
    if (!user) return res.status(404).json({ type: 'NotFound' });
    return res.json(user);
  });

  return app;
}
