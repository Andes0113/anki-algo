import type { Question, User, Result } from '@/lib/types';
import { Err, Ok } from '@/lib/types';
import sql from '.';

export const DB = {
  questions: {
    async getNextQuestion(userId: string): Promise<Question | undefined> {
      const result = await sql`
                    SELECT "name", description, difficulty, category, link, videoUrl, starterCode, solutionCode
                    FROM questions
                    WHERE id = (
                      SELECT "questionId"
                      FROM instances
                      WHERE "userId"=${userId}
                      AND "answeredAt" IS NULL
                      LIMIT 1
                    ) LIMIT 1;
                `;
      return result[0] as Question;
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
