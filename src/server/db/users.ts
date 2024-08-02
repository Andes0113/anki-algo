import { and, eq } from 'drizzle-orm';
import db from '.';
import { User } from '@/common/types';
import { users } from './schema';

export async function findOrCreateUser(
  email: string,
  provider: string,
  providerAccountId: string
): Promise<{ user?: User; error?: Error }> {
  try {
    let user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      await db.insert(users).values({ email, provider, providerAccountId });

      user = await db.query.users.findFirst({ where: eq(users.email, email) });
    }

    if (!user) return { error: new Error('Error registering user') };

    if (user.provider != provider) {
      return {
        error: new Error(
          `Wrong provider for ${email}: Use ${user.provider} instead.`
        ),
      };
    }

    return { user };
  } catch (error: unknown) {
    return { error: new Error('Error finding user') };
  }
}
