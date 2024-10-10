import { packageError } from '@/lib/utils';
import { getServerAuthSession } from '@/server/auth';
import { DB } from '@/server/db/query';

export async function getNextQuestion() {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    return { error: new Error('Invalid session') };
  }

  try {
    const question = await DB.questions.getNextQuestion(session.user.id);

    return { question };
  } catch (err: unknown) {
    const error = packageError(err);
    console.log(error);
    return { error };
  }
}
