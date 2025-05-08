import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { asc, eq } from 'drizzle-orm';
import { boards } from '@/storage/schema.ts'

export class PinsRepository {
  constructor(private db:NodePgDatabase){}

  async createBoard(board: typeof boards.$inferInsert) {
    return await this.db.insert(boards).values(board).returning({id: boards.id});
  }

  async getBoardByID(id: number) {
    const result = await this.db.select().from(boards).where(eq(boards.id, id)).limit(1)
    return result[0];
  }

  async getAllBoardsByUserID(user_id: number) {
    const result = await this.db.select().from(boards).where(eq(boards.user_id, user_id)).limit(1)
    return result;
  }
  
  async getAllBoards(limit: number, offset: number) {
    return await this.db.select().from(boards).limit(limit).offset(offset).orderBy(asc(boards.created_at));
  }
}
