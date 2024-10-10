import { getServerAuthSession } from '@/server/auth';
import LoginButton from '@/components/login-button';
import { ModeToggle } from '@/components/theme-button';
import SignoutButton from '@/components/signout-button';
import AnkiAlgoLogo from '../../../../public/ankialgo.webp';
import Link from 'next/link';

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-8 text-lg">
        <div className="ml-4 pt-2 px-2">
          <Link href="/dashboard/practice">
            <img src={AnkiAlgoLogo.src} width={125} />
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
        {session === null ? <LoginButton /> : <SignoutButton />}
      </div>
    </div>
  );
}
