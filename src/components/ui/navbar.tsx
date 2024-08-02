'use client';
import { ModeToggle } from './theme-button';
import { signIn } from 'next-auth/react';

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="text-xl ml-4 py-4 px-2">AnkiAlgo</div>
      <div className="text-lg flex justify-end gap-2 p-1 mr-6 items-center">
        <div>Hello</div>
        <div>goodbye</div>
        <button onClick={() => signIn('google')}>google</button>
        <button onClick={() => signIn('github')}>github</button>
        <ModeToggle />
      </div>
    </div>
  );
}
