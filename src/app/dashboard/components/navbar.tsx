import { ModeToggle } from '@/components/theme-button';
import SignoutButton from '@/components/signout-button';
import AnkiAlgoLogo from '../../../../public/ankialgo.webp';
import Link from 'next/link';
import Image from 'next/image';

export default async function Navbar() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-8 text-lg">
        <div className="ml-4 pt-2 px-2">
          <Link href="/dashboard/practice">
            <Image src={AnkiAlgoLogo.src} width={125} alt="" />
          </Link>
        </div>
        <div className="flex items-center gap-4 text-lg">
          <Link
            className="transition duration-300 hover:opacity-75"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="transition duration-300 hover:opacity-75"
            href="/dashboard/practice"
          >
            Practice
          </Link>
        </div>
      </div>
      <div className="text-lg flex justify-end gap-2 p-1 mr-6 items-center">
        <ModeToggle />
        <SignoutButton />
      </div>
    </div>
  );
}
