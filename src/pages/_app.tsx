import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout';
import { UserProvider } from '@/contexts/UserContext';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
