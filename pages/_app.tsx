import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }: AppPropsWithTitle) {
  const title = Component.title || 'Default Title';

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default wrapper.withRedux(MyApp);

type AppPropsWithTitle = {
  Component: AppProps['Component'] & { title?: string };
  pageProps: AppProps['pageProps'];
};
