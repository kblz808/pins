import {pgTable, boolean, text, integer, serial, varchar, timestamp} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';

export const users = pgTable("users", {
  id: serial().primaryKey(),
  username: varchar({length: 20}).notNull(),
  email: varchar({length: 50}).unique().notNull(),
  password_hash: text().notNull(),
  avatar_url: text().notNull(),
  bio: text(),
  website: varchar({length: 50}),
  created_at: timestamp().defaultNow(),
});

export const pins = pgTable("pins", {
  id: serial().primaryKey(),
  user_id: integer().references(() => users.id, {onDelete: 'cascade'}).notNull(),
  title: varchar({length: 50}).notNull(),
  description: text(),
  image_url: text().notNull(),
  source_url: text(),
  views_count: integer(),
  created_at: timestamp(),
});

export const boards = pgTable("boards", {
  id: serial().primaryKey(),
  user_id: integer().references(() => users.id, {onDelete: 'cascade'}).notNull(),
  name: varchar({length: 20}),
  description: text(),
  is_private: boolean(),
  cover_image_url: text(),
  tags: text(),
  created_at: timestamp(),
});

export const comments = pgTable("comments", {
  id: serial().primaryKey(),
  user_id: integer().references(() => users.id, {onDelete: 'cascade'}).notNull(),
  content: text(),
  created_at: timestamp(),
});

export const userRelations = relations(users, ({many}) => ({
  pins: many(pins),
  boards: many(boards),
  comments: many(comments),
}))

export const pinsRelations = relations(pins, ({one}) => ({
  user: one(users, {fields: [pins.user_id], references: [users.id]}),
}))

export const boardRelations =relations(boards, ({one}) => ({
  user: one(users, {fields: [boards.user_id], references: [users.id]}),
}))

export const commentRelations = relations(comments, ({one}) => ({
  user: one(users, {fields: [comments.user_id], references: [users.id]}),
}))


