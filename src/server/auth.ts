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

      const { user: dbUser, error } = await findOrCreateUser(
        email,
        provider,
        providerAccountId
      );

      if (error) {
        console.log('ERROR', error);
        token.error = error.message;
      }

      if (dbUser) token.userId = dbUser.id;

      console.log('TOKEN', token);

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
