export type Difficulty = 'easy' | 'medium' | 'hard';
export type AnswerType =
  | 'unassisted'
  | 'withTypeHint'
  | 'withTheory'
  | 'withCode';

export type User = {
  id: string;
  email: string | null;
  provider: string | null;
  providerAccountId: string | null;
};

export type Question = {
  id: string;
  name: string;
  description: string;
  category: string;
  link: string;
  videoUrl: string;
  starterCode: string;
  solutionCode: string;
  difficulty: Difficulty;
  createdAt: Date;
  updatedAt: Date;
};

export type QuestionInstance = Question & { instanceId: string };

export type Instance = {
  id: string;
  questionId: string;
  userId: string;
  answerType: AnswerType;
  queuedFor: Date;
  answeredAt: Date | null;
};

export type Result<T, E = undefined> =
  | { ok: true; value: T }
  | { ok: false; error: E | undefined };

export const Ok = <T>(data: T): Result<T, never> => {
  return { ok: true, value: data };
};

export const Err = <E>(error?: E): Result<never, E> => {
  return { ok: false, error };
};
