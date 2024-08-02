import { and, eq, isNull, sql } from 'drizzle-orm';
import db from '.';
import { instances, questions } from './schema';

export const selectUsers = db.select().from(instances).prepare('selectUsers');

export const getNextQuestionInstance = db.query.instances
  .findFirst({
    orderBy: instances.queuedFor,
    where: and(
      eq(instances.userId, sql.placeholder('userId')),
      isNull(instances.answeredAt)
    ),
  })
  .prepare('getNextQueuedQuestion');

export const getQuestionById = db.query.questions
  .findFirst({
    where: eq(questions.id, sql.placeholder('questionId')),
  })
  .prepare('getQuestionById');
