import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import LoginButton from '@/components/login-button';

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session?.user.id) redirect('/dashboard');
  return (
    <div>
      <LoginButton />
    </div>
  );
}
