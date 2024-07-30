import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

const client = new Client({
  database: 'ankialgodev',
});

try {
  await client.connect();
} catch (error) {
  console.log(`Error connecting to db: ${error}`);
}
const db = drizzle(client, { schema });

export default db;
