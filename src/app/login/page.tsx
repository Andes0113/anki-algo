import { getServerAuthSession } from '@/server/auth';
import Navbar from '../dashboard/components/navbar';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session?.user.id) redirect('/dashboard');
  return (
    <div>
      <Navbar />
    </div>
  );
}
