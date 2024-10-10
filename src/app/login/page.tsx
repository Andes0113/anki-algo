import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import LoginForm from '@/app/login/login-form';

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session?.user.id) redirect('/dashboard');
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
