'use client';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from './ui/dialog';

export default function LoginButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Register / Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In or Create an Account</DialogTitle>
        </DialogHeader>
        <Button variant="secondary" onClick={() => signIn('google')}>
          Sign In With Google
        </Button>
        <Button variant="secondary" onClick={() => signIn('github')}>
          Sign In With Github
        </Button>
      </DialogContent>
    </Dialog>
  );
}
