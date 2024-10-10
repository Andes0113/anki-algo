import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL!;

const sql = postgres(connectionString, {
  prepare: false,
  max: 20,
  idle_timeout: 30,
  connect_timeout: 10,
});

export default sql;
