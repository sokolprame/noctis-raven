import { Pool, QueryResult } from "pg";

const connectionString = process.env.DATABASE_URL;

const pool = connectionString
  ? new Pool({
      connectionString,
    })
  : null;

export async function query(text: string, params: unknown[] = []): Promise<QueryResult<Record<string, unknown>>> {
  if (!pool) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const client = await pool.connect();

  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}
