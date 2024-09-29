import type { User, Result, QuestionInstance } from '@/lib/types';
import { Err, Ok } from '@/lib/types';
import sql from '.';

export const DB = {
  questions: {
    async getNextQuestion(
      userId: string
    ): Promise<QuestionInstance | undefined> {
      const result = await sql`
                    SELECT Q."name", Q.description, Q.difficulty, Q.category, Q.link, Q.videoUrl, Q.starterCode, Q.solutionCode
                    FROM questions Q join (
                      SELECT "questionId"
                      FROM instances
                      WHERE "userId"=${userId}
                      AND "answeredAt" IS NULL
                      LIMIT 1
                    ) I ON Q.id = I."questionId"
                    LIMIT 1;
                `;
      return result[0] as QuestionInstance;
    },
  },
  users: {
    async findOrCreateUser(
      email: string,
      provider: string,
      providerAccountId: string
    ): Promise<Result<User, Error>> {
      try {
        const result: User = (await sql.begin(async (tx) => {
          await tx`
                  INSERT INTO users (email, provider, "providerAccountId")
                  VALUES (${email}, ${provider}, ${providerAccountId})
                  ON CONFLICT (email) DO NOTHING
                `;

          const user = await tx`
                  SELECT * FROM users
                  WHERE email = ${email}
                  LIMIT 1
                `;

          if (user.length === 0) {
            throw new Error('Error registering user');
          }

          if (user[0].provider !== provider) {
            throw new Error(
              `Wrong provider for ${email}: Use ${user[0].provider} instead.`
            );
          }

          return user[0];
        })) as User;

        return Ok(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return Err(error);
        }
        return Err(
          new Error('Error finding or creating user', { cause: error })
        );
      }
    },
  },
};
