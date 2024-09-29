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
  console.log('dashboardlayout');
  if (!session?.user.id) {
    redirect('/login');
  }
  return (
    <SessionProvider>
      <Navbar />
      {session?.user.id}
      {children}
    </SessionProvider>
  );
}
