import { packageError } from '@/lib/utils';
import { getServerAuthSession } from '@/server/auth';
import {
  getNextQuestionInstance,
  getQuestionById,
} from '@/server/db/questions';

async function getNextQuestion() {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    return { error: new Error('Invalid session') };
  }

  try {
    const instance = await getNextQuestionInstance(session.user.id);

    if (!instance) return { error: new Error('No queued question found') };

    const question = await getQuestionById(instance.questionId);

    return { instance, question };
  } catch (err: unknown) {
    const error = packageError(err);
    console.log(error);
    return { error };
  }
}

export default async function QuestionPage() {
  const { error } = await getNextQuestion();

  if (error) return <div>{error.message}</div>;

  return <div>Hello</div>;
}
