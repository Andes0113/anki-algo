import sql from '.';

export const getNextQuestionInstance = async (userId: string) => {
  const result = await sql`
    SELECT * FROM instances
    WHERE userId = ${userId} AND answeredAt IS NULL
    ORDER BY queuedFor
    LIMIT 1
  `;
  return result[0];
};

export const getQuestionById = async (questionId: string) => {
  const result = await sql`
    SELECT * FROM questions
    WHERE id = ${questionId}
    LIMIT 1
  `;
  return result[0];
};