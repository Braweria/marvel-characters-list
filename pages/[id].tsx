import {
  fetchCharacterById,
  selectCharacterById,
} from 'redux/slices/characters.slice';

import { useAppSelector, wrapper } from 'redux/store';

import { ResourceGrid } from '@/Grid';
import { Character } from 'redux/typesSlice';

import { selectComicsByCharacterName } from 'redux/slices/comics.slice';
import { selectEventsByCharacterName } from 'redux/slices/events.slice';
import { selectSeriesByCharacterName } from 'redux/slices/series.slice';
import { selectStoriesByCharacterName } from 'redux/slices/stories.slice';

import styles from '../components/List/CharacterList.module.css';
import Link from 'next/link';
import { ArrowBackButton } from '@/ArrowIcon/ArrowBackButton';

export default function CharacterPage({ character }: { character: Character }) {
  const comics = useAppSelector((state) =>
    selectComicsByCharacterName(state, character.name)
  );
  const events = useAppSelector((state) =>
    selectEventsByCharacterName(state, character.name)
  );
  const series = useAppSelector((state) =>
    selectSeriesByCharacterName(state, character.name)
  );
  const stories = useAppSelector((state) =>
    selectStoriesByCharacterName(state, character.name)
  );

  console.log(events);

  return (
    <div>
      <ArrowBackButton />
      <h1>{character.name}</h1>
      {character.description ? (
        <p>{character.description}</p>
      ) : (
        <p className={styles.noDescription}>No description available</p>
      )}
      <h2>Comics</h2>
      {comics.length > 0 ? (
        <ResourceGrid items={comics} type="comics" />
      ) : (
        <p className={styles.noDescription}>No comics available</p>
      )}
      <h2>Events</h2>
      {events.length > 0 ? (
        <ResourceGrid items={events} type="events" />
      ) : (
        <p className={styles.noDescription}>No events available</p>
      )}
      <h2>Series</h2>
      {series.length > 0 ? (
        <ResourceGrid items={series} type="series" />
      ) : (
        <p className={styles.noDescription}>No series available</p>
      )}
      <h2>Stories</h2>
      {stories.length > 0 ? (
        <ResourceGrid items={stories} type="stories" />
      ) : (
        <p className={styles.noDescription}>No stories available</p>
      )}
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      if (!params || !params.id) {
        return { notFound: true };
      }

      const character = await store.dispatch(
        fetchCharacterById(Number(params.id))
      );

      if (!character.payload) {
        return { notFound: true };
      }

      return {
        props: {
          character: character.payload,
        },
      };
    }
);
