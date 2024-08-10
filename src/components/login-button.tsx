'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from './ui/dialog';
import { Loader2 } from 'lucide-react';

export default function LoginButton() {
  const { data: session, status } = useSession();
  console.log('LOGINBUTTON', session, status);

  if (status === 'loading')
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );

  if (session?.user) return <Button onClick={() => signOut()}>Sign Out</Button>;

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
