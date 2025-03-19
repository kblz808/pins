// import { Hono } from 'hono'

// const app = new Hono()

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

// Deno.serve(app.fetch)

import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from "@/storage/schema.ts";

const db = drizzle(Deno.env.get("DATABASE_URL")!);

async function main() {
  console.log(db);

  const user: typeof users.$inferInsert = {
    username: 'alex',
    email: 'alex@mail.com',
    password_hash: '1234567890',
    avatar_url: 'images://avatar1.png',
    bio: 'some random bio',
    website: 'alex.com',
  };

  await db.insert(users).values(user);
  console.log('new user created');

  const users_result = await db.select().from(users);
  console.log(users_result);
}

main();
