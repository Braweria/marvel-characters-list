import Head from 'next/head';
import { fetchCharacters } from 'redux/slices/characters.slice';
import { wrapper } from 'redux/store';

import { CharacterList } from '@/List';
import type { NextPageWithTitle } from '~/NextPageWithTitle';

// eslint-disable-next-line react/function-component-definition
const Home: NextPageWithTitle = () => {
  return (
    <div>
      <Head>
        <title>Marvel Characters</title>
      </Head>

      <h1>Marvel Characters</h1>
      <CharacterList />
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
