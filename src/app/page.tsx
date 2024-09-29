import { buttonVariants } from '@/components/ui/button';
import AnkiAlgoLogo from '../../public/ankialgo high-res.webp';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between py-16 md:py-24 px-20 md:px-40">
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
          <a className="underline-offset-4 underline text-nowrap" href="#how">
            Learn More
          </a>
          <Link
            href={'/login'}
            className={buttonVariants({ size: 'lg' }) + ' text-xl'}
          >
            Get Started
          </Link>
        </div>
      </div>
      {/* Spaced repetition */}
      <div
        id="how"
        className="flex flex-col items-center justify-between w-full min-h-full"
      >
        <div className="w-full flex flex-col items-start gap-4">
          <h1 className="text-4xl text-left w-full">
            All it takes is{' '}
            <span className="text-primary">timed repetition</span>
            <br />
            and <span className="text-primary">pattern recognition</span>
          </h1>
          <p className="text-xl w-[30%]">
            Questions are spaced out strategically to optimize the performance
            of human memory.
          </p>
        </div>
      </div>
    </main>
  );
}
