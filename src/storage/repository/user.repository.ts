import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { asc, eq, ilike } from 'drizzle-orm';
import { users } from "@/storage/schema.ts";

export class UserRepository {
  private db: NodePgDatabase;
  
  constructor(db: NodePgDatabase) {
    this.db = db;
  }

  async createUser(user: typeof users.$inferInsert) {
    return await this.db.insert(users).values(user).returning({id: users.id});
  }

  async getUserByID(id: number) {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string) {
    return await this.db.select().from(users).where(ilike(users.username, username)).limit(10);
  }

  async getAllUsers(limit: number, offset: number) {
    const result = await this.db.select().from(users).limit(limit).offset(offset).orderBy(asc(users.created_at));
    return result;
  }

  async updateUser(id: number, user: typeof users.$inferInsert){
    const result = await this.db.update(users).set(user).where(eq(users.id, id)).returning({user_id: users.id});
    return result[0].user_id;
  }
}
