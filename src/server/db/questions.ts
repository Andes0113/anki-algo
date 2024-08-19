import { Instance, Question } from '@/lib/types';
import sql from '.';

export const getNextQuestionInstance = async (userId: string) : Promise<Instance | undefined> => {
  const result = await sql`
    SELECT * FROM instances
    WHERE userId = ${userId} AND answeredAt IS NULL
    ORDER BY queuedFor
    LIMIT 1
  `;
  return result[0] as Instance;
};

export const getQuestionById = async (questionId: string): Promise<Question | undefined> => {
  const result = await sql`
    SELECT * FROM questions
    WHERE id = ${questionId}
    LIMIT 1
  `;
  return result[0] as Question;
};