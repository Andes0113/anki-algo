import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
});

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey(),
  difficulty: difficultyEnum('difficulty').notNull(),
  category: varchar('category', { length: 30 }).notNull(),
  link: varchar('link').notNull(),
});

export const instances = pgTable('instances', {
  id: uuid('id').primaryKey(),
  questionId: uuid('questionId')
    .references(() => questions.id)
    .notNull(),
  userId: uuid('userId')
    .references(() => users.id)
    .notNull(),
  note: text('note').notNull(),
  answeredAt: timestamp('answeredAt'), // Unanswered: null value
});
