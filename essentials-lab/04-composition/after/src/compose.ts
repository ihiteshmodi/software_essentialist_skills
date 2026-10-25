import { DatabaseSync } from 'node:sqlite';
import type { ApplicationAPI } from './application';
import {
  FakePaymentGateway,
  HttpPaymentGateway,
  InMemoryOrdersRepository,
  InMemoryUsersRepository,
  RandomIds,
  SqliteOrdersRepository,
  SqliteUsersRepository,
} from './infra/actors';
import type { PaymentGateway } from './modules/tickets/ports';
import { PurchaseTickets } from './modules/tickets/purchaseTickets';
import { RegisterUser } from './modules/users/registerUser';
import { createWebServer } from './web/server';

export type Env = 'test' | 'development' | 'production';
export type Config = { ticketPrice: number; dbPath?: string; payments?: { url: string; apiKey: string } };

// The only place that knows which actor plays each role in each environment (Russian dolls).
export function compose(env: Env, config: Config, overrides: { payments?: PaymentGateway } = {}) {
  const db = env === 'test' ? null : new DatabaseSync(config.dbPath ?? ':memory:');
  const users = db ? new SqliteUsersRepository(db) : new InMemoryUsersRepository();
  const orders = db ? new SqliteOrdersRepository(db) : new InMemoryOrdersRepository();
  const payments =
    overrides.payments ??
    (env === 'production' && config.payments ? new HttpPaymentGateway(config.payments.url, config.payments.apiKey) : new FakePaymentGateway());
  const ids = new RandomIds();

  const registerUser = new RegisterUser(users, ids);
  const purchaseTickets = new PurchaseTickets(users, orders, payments, ids, config.ticketPrice);

  const app: ApplicationAPI = {
    users: { register: (input) => registerUser.execute(input) },
    tickets: { purchase: (input) => purchaseTickets.execute(input) },
  };

  return { app, server: createWebServer(app) };
}
