import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { asc, eq, ilike } from 'drizzle-orm';
import { pins } from '@/storage/schema.ts'

export class PinsRepository {
  constructor(private db:NodePgDatabase){}

  async createPin(pin: typeof pins.$inferInsert) {
    return await this.db.insert(pins).values(pin).returning({id: pins.id});
  }

  async getPinByID(id: number) {
    const result = await this.db.select().from(pins).where(eq(pins.id, id)).limit(1)
    return result[0];
  }

  async getPinsByTitle(title: string, limit: number, offset: number) {
    return await this.db.select().from(pins).where(ilike(pins.title, title)).limit(limit).offset(offset);
  }

  async getAllPins(limit: number, offset: number) {
    return await this.db.select().from(pins).limit(limit).offset(offset).orderBy(asc(pins.created_at));
  }

  async updatePin(id: number, pin: typeof pins.$inferInsert) {
    const result = await this.db.update(pins).set(pin).where(eq(pins.id, id)).returning({user_id: pins.user_id});
    return result[0].user_id;
  }
}
