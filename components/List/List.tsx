import { useSelector } from 'react-redux';
import { Components, Virtuoso } from 'react-virtuoso';
import {
  selectAllCharacters,
  selectCharacterStatus,
} from 'redux/slices/characters.slice';

export function List() {
  const characters = useSelector(selectAllCharacters);
  const characterLoadingStatus = useSelector(selectCharacterStatus);

  console.log(characters);
  console.log(characterLoadingStatus);

  return (
    characterLoadingStatus === 'idle' && (
      <Virtuoso
        style={{ height: '100%', width: '100%' }}
        data={characters}
        itemContent={(index, character) => <span>{character.name}</span>}
        components={{
          Item,
        }}
      />
    )
  );
}

function Item({
  children,
  ...props
}: Components['Item'] & { children: React.ReactNode }) {
  return <li {...props}>{children}</li>;
}
