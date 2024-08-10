import type { DefaultSession, NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { findOrCreateUser } from '@/server/db/users';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID_DEV ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET_DEV ?? '',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (!user || !account) return token;

      const { email } = user;
      if (!email) return token;

      const { provider, providerAccountId } = account;

      const data = await findOrCreateUser(email, provider, providerAccountId);

      if (!data.ok) {
        console.log('ERROR', data.error);
        token.error = data.error?.message;
        return token;
      }

      token.userId = data.value.id;

      return token;
    },
    async session({ session, token }) {
      console.log('SESSION TOKEN', token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.userId,
        },
      };
    },
    async signIn() {
      return true;
    },
  },
  secret: 'FAKE_SECRET',
};

export const getServerAuthSession = () => getServerSession(authOptions);
