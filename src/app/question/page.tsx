import { getServerAuthSession } from '@/server/auth';
import {
  getNextQuestionInstance,
  getQuestionById,
} from '@/server/db/questions';

async function getNextQuestion() {
  const session = await getServerAuthSession();

  console.log('SESSION', session);

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
  } catch (err) {
    return { error: err };
  }
}

export default async function QuestionPage() {
  const { instance, question, error } = await getNextQuestion();
  if (error) {
    console.log(error);
  }

  return <div>Hello</div>;
}
