// This is needed to convert SessionProvider into a client component
// Otherwise, can't wrap our app within layouts
// https://stackoverflow.com/a/76715302/18887989

'use client';

export { SessionProvider } from 'next-auth/react';
