import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { getNextQuestion } from '@/server/actions';

export default async function PracticePrompt() {
  const practiceButtonVariants = ['Practice'];

  const { question, error } = await getNextQuestion();

  if (error) {
    return (
      <div className="flex w-full justify-center p-4 rounded-lg border bg-card">
        <h1 className="text-2xl text-destructive">
          Error fetching next question
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center p-4 rounded-lg border bg-card">
      <h1 className="text-xl w-full text-left">Next up:</h1>
      <h1 className="text-3xl mt-4">{question?.name}</h1>
      <div className="mt-10">
        <Link
          href="/dashboard/practice"
          className={cn(buttonVariants({ size: 'lg' }), 'text-3xl py-8 px-8')}
        >
          {
            practiceButtonVariants[
              Math.floor(Math.random() * practiceButtonVariants.length)
            ]
          }
        </Link>
      </div>
    </div>
  );
}
