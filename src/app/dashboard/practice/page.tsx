import { packageError } from '@/lib/utils';
import { getServerAuthSession } from '@/server/auth';
import { DB } from '@/server/db/query';

async function getNextQuestion() {
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

export default async function QuestionPage() {
  const { question, error } = await getNextQuestion();

  if (error) return <div>{error.message}</div>;

  return <div>{question?.name}</div>;
}
