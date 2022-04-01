import {
  fetchCharacterById,
  selectCharacterById,
} from 'redux/slices/characters.slice';
import { useAppSelector, wrapper } from 'redux/store';

import { Avatar } from '@/Avatar/Avatar';
import { CharacterPageProps } from '~/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ResourceGrid } from '@/Grid/ResourceGrid';
import { Character } from 'redux/typesSlice';

/**
 * stories
 * comics
 * events
 * series
 */

export default function CharacterPage({ character }: { character: Character }) {
  // console.log(character);
  return (
    <div>
      <h1>{character.name}</h1>
      {/* <Avatar src={character.image} alt={character.name} /> */}
      <p>{character.description}</p>
      <ResourceGrid items={character.comics.items} />
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
