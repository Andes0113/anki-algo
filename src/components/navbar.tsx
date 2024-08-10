import { getServerAuthSession } from '@/server/auth';
import LoginButton from './login-button';
import { ModeToggle } from './theme-button';
import SignoutButton from './signout-button';

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="w-full flex justify-between items-center">
      <div className="text-xl ml-4 py-4 px-2">AnkiAlgo</div>
      <div className="text-lg flex justify-end gap-2 p-1 mr-6 items-center">
        {session === null ? <LoginButton /> : <SignoutButton />}
        <ModeToggle />
      </div>
    </div>
  );
}
