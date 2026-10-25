import { compose, type Env } from './compose';

// Process entry point: reads the environment once and hands plain values to the composition root.
const env = (process.env.APP_ENV ?? 'development') as Env;
const { server } = compose(env, {
  ticketPrice: Number(process.env.TICKET_PRICE ?? 100),
  dbPath: process.env.DB_PATH,
  payments: process.env.PAYMENTS_URL ? { url: process.env.PAYMENTS_URL, apiKey: process.env.PAYMENTS_API_KEY ?? '' } : undefined,
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, () => console.log(`listening on ${port} (${env})`));
