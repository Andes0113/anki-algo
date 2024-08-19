import { Err, Ok, type Result, type User } from '@/lib/types';
import { eq } from 'drizzle-orm';
import db from '.';
import { users } from './schema';

export async function findOrCreateUser(
  email: string,
  provider: string,
  providerAccountId: string
): Promise<Result<User, Error>> {
  try {
    const result = await db.transaction(async (tx) => {
      // Attempt to insert, or do nothing if the email already exists
      await tx
        .insert(users)
        .values({ email, provider, providerAccountId })
        .onConflictDoNothing({ target: users.email });

      // Query the user (whether it was just inserted or already existed)
      const user = await tx.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user) {
        throw new Error('Error registering user');
      }

      if (user.provider !== provider) {
        throw new Error(`Wrong provider for ${email}: Use ${user.provider} instead.`);
      }

      return user;
    });

    return Ok(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Err(error);
    }
    return Err(new Error('Error finding or creating user', { cause: error }));
  }
}