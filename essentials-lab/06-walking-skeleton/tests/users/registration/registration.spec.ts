import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { afterAll, beforeAll } from 'vitest';
import { createApp } from '../../../src/app';
import { RegistrationApiDriver } from '../../drivers/registrationDriver';
import { registrationAcceptance } from './registration.acceptance';

// Same acceptance spec, run in-process against a real HTTP server and a real (in-memory) SQLite database.
let server: Server;
let baseUrl = '';

beforeAll(async () => {
  server = createApp(new DatabaseSync(':memory:')).listen(0);
  await new Promise<void>((resolve) => server.once('listening', () => resolve()));
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(() => { server.close(); });

registrationAcceptance(() => new RegistrationApiDriver(baseUrl));
