import { getServerAuthSession } from '@/server/auth';
import Navbar from './components/navbar';
import { SessionProvider } from '@/components/providers/session-provider';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();
  if (!session?.user.id) {
    redirect('/login');
  }
  return (
    <SessionProvider>
      <Navbar />
      <div className="px-4 py-1">
        {session?.user.id}
        {children}
      </div>
    </SessionProvider>
  );
}
