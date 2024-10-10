import { getNextQuestion } from "@/server/actions";

export default async function QuestionPage() {
  const { question, error } = await getNextQuestion();

  if (error) return <div>{error.message}</div>;

  return <div>{question?.name}</div>;
}
