import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

// or
const client = new Client({
  database: 'ankialgodev',
});

await client.connect();
const db = drizzle(client, { schema });

export default db;
