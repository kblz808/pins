import { expect } from 'jsr:@std/expect'
import { UserRepository} from "@/storage/repository/user.repository.ts"
import { crypto } from 'jsr:@std/crypto'
import { setupDatabase } from "@/tests/storage/db.setup.ts";

Deno.test({
  name: "user repository test",
  permissions: {env: true, net: true},

  fn: async (t) => {
    const db = setupDatabase();
    const userRepository = new UserRepository(db);

    let id: number | null = null;

    await t.step("should create a new user", async () => {
      const password = 'pa55word';
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const data = encoder.encode(password);
      const password_hash = await crypto.subtle.digest('BLAKE3', data);

      const userData = {
        username: 'morty',
        email: 'alex@mail7.com',
        password_hash: decoder.decode(password_hash),
        avatar_url: 'https://images.com/avatar1.png',
        bio: 'some random bio',
        website: 'alex.com',
        created_at: new Date(),
      };

      const user_result = await userRepository.createUser(userData);
      id = user_result[0].id
    })

     await t.step("should select a user", async () => {
       const user = await userRepository.getUserByID(id!);
       expect(user.id).toBe(id)
    })
  }
})
