import { buttonVariants } from '@/components/ui/button';
import AnkiAlgoLogo from '../../public/ankialgo high-res.webp';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between py-24 px-20 md:px-40">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col min-w-full gap-28">
        <div className="flex flex-col gap-8 lg:w-[75%] xl:w-[60%]">
          <img src={AnkiAlgoLogo.src} />
          <h2 className="text-4xl">
            Your <span className="text-primary">personal trainer</span> for
            mastering the technical interview
          </h2>
        </div>
        <div className="flex gap-4 justify-end md:mr-20 items-center">
          <a
            className="underline-offset-4 underline text-nowrap transition duration-300 hover:text-gray-300"
            href="#how"
          >
            Learn More
          </a>
          <Link
            href={'/login'}
            className={cn(buttonVariants({ size: 'lg' }), 'text-xl')}
          >
            Get Started
          </Link>
        </div>
      </div>
      {/* Spaced repetition */}
      <div
        id="how"
        className="flex flex-col items-center justify-between w-full min-h-screen"
      >
        <div className="w-full flex flex-col items-start gap-4 py-32">
          <h1 className="text-4xl text-left w-full">
            All it takes is{' '}
            <span className="text-primary">timed repetition</span>
            <br />
            and <span className="text-primary">pattern recognition</span>
          </h1>
          <p className="text-xl md:w-[30%]">
            Questions are spaced out strategically to optimize the performance
            of human memory.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full min-h-screen">
        <div className="w-full flex flex-col items-end gap-4 text-right py-32">
          <h1 className="text-4xl">
            Identify and address your <br /> weak points with{' '}
            <span className="text-primary">AI</span>
          </h1>
          <p className="text-xl md:w-[40%]">
            AnkiAlgo adapts to your performance and provides questions that
            reinforce your understanding as you learn
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full">
        <div className="w-full flex flex-col items-center py-32 gap-12">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl">Ace your next technical interview.</h1>
            {/* TODO: component that occasionally swaps between better / faster / easier */}
            <p className="text-2xl">
              Learn <span className="text-primary">faster</span> with AnkiAlgo.
            </p>
          </div>
          <Link
            href={'/login'}
            className={cn(buttonVariants({ size: 'lg' }), 'text-xl')}
          >
            Get Started for Free
          </Link>
        </div>
      </div>
    </main>
  );
}
