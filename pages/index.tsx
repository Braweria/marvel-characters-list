import type { NextPageWithTitle } from '../utils/NextPageWithTitle';
import Head from 'next/head';

const Home: NextPageWithTitle = () => {
  return (
    <div style={{ height: '100vh', backgroundColor: '#007acc' }}>
      <Head>
        <title>Next.js Boilerplate with TypeScript</title>
      </Head>

      <main
        style={{
          textAlign: 'center',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <h1 style={{ margin: 0 }}>Next.js Boilerplate with TypeScript</h1>
        <p>Start editing...</p>
      </main>
    </div>
  );
};

export default Home;

Home.title = 'Next.js Boilerplate with TypeScript';
