import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { users } from "@/storage/schema.ts";

export type User = typeof users.$inferInsert;

export class UserRepository {
  private db: NodePgDatabase;
  
  constructor(db: NodePgDatabase) {
    this.db = db;
  }

  async createUser(user: User) {
    // const user: typeof users.$inferInsert = {
    //   username: 'alex',
    //   email: 'alex@mail.com',
    //   password_hash: '1234567890',
    //   avatar_url: 'images://avatar1.png',
    //   bio: 'some random bio',
    //   website: 'alex.com',
    // };

    const result = await this.db.insert(users).values(user).returning();
    console.log(result);
    console.log('new user created');
  }
}
