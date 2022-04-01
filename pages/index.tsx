import Head from 'next/head';
import { fetchCharacters } from 'redux/slices/characters.slice';
import { wrapper } from 'redux/store';

import { CharacterList } from '@/List';
import type { NextPageWithTitle } from '~/utils/NextPageWithTitle';

// eslint-disable-next-line react/function-component-definition
const Home: NextPageWithTitle = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>Marvel Characters</title>
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
        <h1>Marvel Characters</h1>
        <CharacterList />
      </main>
    </div>
  );
};

export default Home;

Home.title = 'Marvel Characters';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchCharacters());

    return {
      props: {},
    };
  }
);
