import { useSelector } from 'react-redux';
import { selectAllCharacters } from 'redux/slices/characters.slice';

export function List() {
  const characters = useSelector(selectAllCharacters);

  console.log(characters);

  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>{character.name}</li>
      ))}
    </ul>
  );
}
