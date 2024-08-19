import { Err, Ok, type Result, type User } from '@/lib/types';
import sql from '.';

export async function findOrCreateUser(
  email: string,
  provider: string,
  providerAccountId: string
): Promise<Result<User, Error>> {
  try {
    const result: User = await sql.begin(async (tx) => {
      await tx`
        INSERT INTO users (email, provider, providerAccountId)
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
        throw new Error(`Wrong provider for ${email}: Use ${user[0].provider} instead.`);
      }

      return user[0];
    }) as User;

    return Ok(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Err(error);
    }
    return Err(new Error('Error finding or creating user', { cause: error }));
  }
}