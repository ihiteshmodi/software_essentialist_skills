import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createApp } from './app.ts';

const dataDir = process.env.DATA_DIR ?? join(process.cwd(), '.data');
mkdirSync(dataDir, { recursive: true });

const port = Number(process.env.PORT ?? 3000);
const app = createApp(new DatabaseSync(join(dataDir, 'skeleton.db')));
app.listen(port, () => console.log(`walking skeleton listening on ${port}`));
