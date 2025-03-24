import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export function setupDatabase(): NodePgDatabase  {
  const db = drizzle(Deno.env.get("DATABASE_URL")!);
  return db;
}
