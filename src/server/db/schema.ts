import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard']);
export const answerType = pgEnum('answerType', [
  'unassisted',
  'withQuestionTypeHint',
  'withTheory',
  'withCode',
]);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  provider: varchar('provider'),
  providerAccountId: varchar('providerAccountId'),
  email: varchar('email'),
});

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey(),
  difficulty: difficultyEnum('difficulty').notNull(),
  category: varchar('category', { length: 30 }).notNull(),
  link: varchar('link').notNull(),
});

// Represents an instance of a question prompted to a user.
// A user can be asked the same question multiple times, so (questionId, userId) is not unique
export const instances = pgTable('instances', {
  id: uuid('id').primaryKey(),
  questionId: uuid('questionId')
    .references(() => questions.id)
    .notNull(),
  userId: uuid('userId')
    .references(() => users.id)
    .notNull(),
  answerType: answerType('answerType').notNull(),
  queuedFor: timestamp('queuedFor'), // Time queued for user to answer
  answeredAt: timestamp('answeredAt'), // Unanswered: null value
});

// A single user's notes on a question
export const userNotes = pgTable(
  'userNotes',
  {
    userId: uuid('userId')
      .references(() => users.id)
      .notNull(),
    questionId: uuid('questionId')
      .references(() => questions.id)
      .notNull(),
    content: text('content').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.questionId] }),
    };
  }
);
