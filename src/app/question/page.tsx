import { getNextQuestionInstance, getQuestionById } from '@/lib/db/questions';

async function getNextQuestion(userId: string) {
  try {
    const instance = await getNextQuestionInstance.execute({ userId });

    if (!instance) return { error: new Error('No queued question found') };

    const question = await getQuestionById.execute({
      questionId: instance.questionId,
    });

    return { instance, question };
  } catch (err) {
    return { error: new Error('database error: ', { cause: err }) };
  }
}

export default async function QuestionPage() {
  const { instance, question, error } = await getNextQuestion(
    '12e2c6ea-c7a8-4ff2-bdc7-c17ad3691f9c' // Placeholder
  );
  if (error) {
    return <div>Error fetching question: {error.message}</div>;
  }

  return <div>Hello</div>;
}
