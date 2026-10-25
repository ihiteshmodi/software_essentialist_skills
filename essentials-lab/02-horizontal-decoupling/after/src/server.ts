import { DatabaseSync } from 'node:sqlite';
import express from 'express';
import { SqliteUsersRepository } from './modules/users/infra/sqliteUsersRepository';
import { RegisterUser } from './modules/users/registration/registerUser';
import { registrationRouter } from './modules/users/registration/registrationController';
import { RandomIdGenerator, SystemClock } from './shared/infra/system';

const REGISTRATION_CLOSES_AT = new Date('2026-11-01T00:00:00Z');

// Minimal wiring; lab 04 turns this into a full composition root.
export function createServer(db = new DatabaseSync(':memory:')) {
  const registerUser = new RegisterUser(new SqliteUsersRepository(db), new SystemClock(), new RandomIdGenerator(), REGISTRATION_CLOSES_AT);
  const app = express();
  app.use(express.json());
  app.use(registrationRouter((input) => registerUser.execute(input)));
  return app;
}
