import { selectCharacterById } from 'redux/slices/characters.slice';
import { wrapper } from 'redux/store';

import { Avatar } from '@/Avatar/Avatar';
import { useSelector } from 'react-redux';

/**
 * stories
 * comics
 * events
 * series
 */

export default function CharacterPage({ id }) {
  const character = useSelector((state) => selectCharacterById(state, id));
  console.log(character.name);
  return (
    <div>
      <h1>{character.name}</h1>
      {/* <Avatar src={character.image} alt={character.name} /> */}
      <p>{character.description}</p>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { id } = params;
      return {
        props: {
          id,
        },
      };
    }
);
