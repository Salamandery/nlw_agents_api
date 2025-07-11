import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../env.ts';
import { schema } from './schema/index.ts';

const client = postgres(env.DATABASE_URL);
const db = drizzle(client, {
  schema,
  casing: 'snake_case',
});

export { client, db };
