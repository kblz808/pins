import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from 'drizzle-orm';
import { comments } from '@/storage/schema.ts'

export class CommentsRepository {
  constructor(private db:NodePgDatabase){}

  async createComment(pin: typeof comments.$inferInsert) {
    return await this.db.insert(comments).values(pin).returning({id: comments.id});
  }

  async GetCommentsByPinID(pin_id: number) {
    const result = await this.db.select().from(comments).where(eq(comments.pin_id, pin_id)).limit(1)
    return result[0];
  }
}
