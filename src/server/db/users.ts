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
    let user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      await db.insert(users).values({ email, provider, providerAccountId });

      user = await db.query.users.findFirst({ where: eq(users.email, email) });
    }

    if (!user) return Err(new Error('Error registering user'));

    if (user.provider != provider) {
      return Err(
        new Error(`Wrong provider for ${email}: Use ${user.provider} instead.`)
      );
    }

    return Ok(user);
  } catch (error: unknown) {
    return Err(new Error('Error finding user', { cause: error }));
  }
}
