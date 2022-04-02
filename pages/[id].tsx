import {
  fetchCharacterById,
  selectCharacterById,
} from 'redux/slices/characters.slice';

import { useAppSelector, wrapper } from 'redux/store';

import { Avatar } from '@/Avatar/Avatar';
import { ResourceGrid } from '@/Grid/ResourceGrid';
import { Character } from 'redux/typesSlice';

import { selectComicsByCharacterName } from 'redux/slices/comics.slice';
import { selectEventsByCharacterName } from 'redux/slices/events.slice';
import { selectSeriesByCharacterName } from 'redux/slices/series.slice';
import { selectStoriesByCharacterName } from 'redux/slices/stories.slice';

/**
 * stories
 * comics
 * events
 * series
 */

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

  return (
    <div>
      <h1>{character.name}</h1>
      {/* <Avatar src={character.image} alt={character.name} /> */}
      <p>{character.description}</p>
      <h2>Comics</h2>
      <ResourceGrid items={comics} type="comics" />
      <h2>Events</h2>
      <ResourceGrid items={events} type="events" />
      <h2>Series</h2>
      <ResourceGrid items={series} type="series" />
      <h2>Stories</h2>
      <ResourceGrid items={stories} type="stories" />
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
