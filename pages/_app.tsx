import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Page from '../components/Page';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session as Session}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </SessionProvider>
  );
}

export default MyApp;
