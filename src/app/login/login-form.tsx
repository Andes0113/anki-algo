'use client';
import { signIn } from 'next-auth/react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AnkiAlgoLogo from '../../../public/ankialgo.webp';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa6';

export default function LoginForm() {
  return (
    <Card className="max-w-lg w-full flex flex-col items-center gap-8 py-8">
      <CardHeader className="w-full flex flex-col items-center">
        <img src={AnkiAlgoLogo.src} width={250} />
        <h1 className="text-2xl">Sign in or Create an Account</h1>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 w-full max-w-md">
        <Button
          className="flex gap-2 items-center"
          variant="secondary"
          size="lg"
          onClick={() => signIn('google')}
        >
          <FcGoogle size={25} />
          <div>Sign In With Google</div>
        </Button>
        <Button
          className="flex gap-2 items-center"
          variant="secondary"
          size="lg"
          onClick={() => signIn('github')}
        >
          <FaGithub size={25} />
          <div>Sign In With Github</div>
        </Button>
      </CardContent>
    </Card>
  );
}
