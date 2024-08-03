import { packageError } from '@/common/utils';
import { getServerAuthSession } from '@/server/auth';
import {
  getNextQuestionInstance,
  getQuestionById,
} from '@/server/db/questions';

async function getNextQuestion() {
  const session = await getServerAuthSession();

  if (!session || !session.user.id) {
    return { error: new Error('Invalid session') };
  }

  try {
    const instance = await getNextQuestionInstance.execute({
      userId: session?.user.id,
    });

    if (!instance) return { error: new Error('No queued question found') };

    const question = await getQuestionById.execute({
      questionId: instance.questionId,
    });

    return { instance, question };
  } catch (error: unknown) {
    return { error: packageError(error) };
  }
}

export default async function QuestionPage() {
  const { instance, question, error } = await getNextQuestion();

  if (error) return <div>{error.message}</div>;

  return <div>Hello</div>;
}
