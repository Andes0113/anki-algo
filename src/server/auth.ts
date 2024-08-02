import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { users } from '@/server/db/schema';
import db from '@/server/db';
import { User } from '@/common/types';
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
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID_DEV || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET_DEV || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log(token, user, account, profile);

      if (!user || !account) return {};

      const { email } = user;
      if (!email) return {};

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

      if (dbUser) token.userId = user.id;

      console.log('TOKEN', token);

      return token;
    },
    async session({ session, token, user }) {
      return { ...session, userId: token.userId };
    },
    async signIn({ user, account, profile }) {
      return true;
    },
  },
  secret: 'FAKE_SECRET',
};
