import { expect } from 'jsr:@std/expect'
// import { drizzle } from 'drizzle-orm/node-postgres';
import { User, UserRepository} from "@/storage/repository/user.repository.ts"
import { crypto } from 'jsr:@std/crypto'
import { setupDatabase } from "@/tests/storage/db.setup.ts";

// Deno.test({
//   name: "simple test",
//   permissions: {read: true},
//   fn: () => {
//     const x = 1 + 2;
//     assertEquals(x, 3);
//   },
// })

// const db = drizzle(Deno.env.get("DATABASE_URL")!);
// console.log(Deno.env.get("DATABASE_URL")!);

Deno.test({
  name: "user repository test",
  permissions: {env: true, net: true},
  fn: async (t) => {
    const db = setupDatabase();

    const userRepository = new UserRepository(db);

    await t.step("should create a new user", async () => {
      const password = 'pa55word';
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const data = encoder.encode(password);
      const password_hash = await crypto.subtle.digest('BLAKE3', data);

      const userData: User = {
        username: 'alex',
        email: 'alex@mail.com',
        password_hash: decoder.decode(password_hash),
        avatar_url: 'https://images.com/avatar1.png',
        bio: 'some random bio',
        website: 'alex.com',
      };

      await userRepository.createUser(userData);
    })
  
    const result = 2 + 2;
    expect(result).toBe(4);
  }
})
