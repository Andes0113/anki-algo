'use client';
import { SessionProvider } from 'next-auth/react';
import LoginButton from './login-button';
import { ModeToggle } from './theme-button';

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="text-xl ml-4 py-4 px-2">AnkiAlgo</div>
      <div className="text-lg flex justify-end gap-2 p-1 mr-6 items-center">
        <SessionProvider>
          <LoginButton />
        </SessionProvider>
        <div>Hello</div>
        <div>goodbye</div>
        <ModeToggle />
      </div>
    </div>
  );
}
