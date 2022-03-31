import { Avatar } from '@/Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import {
  selectAllCharacters,
  selectCharacterStatus,
  updateOffset,
  fetchCharacters,
} from 'redux/slices/characters.slice';
import { Item } from './Item';
import { List } from './List';

import styles from './CharacterList.module.css';
import Link from 'next/link';
import { ArrowIcon } from '@/ArrowIcon/ArrowIcon';

export function CharacterList() {
  const characters = useSelector(selectAllCharacters);
  const characterLoadingStatus = useSelector(selectCharacterStatus);
  const dispatch = useDispatch();

  const loadMore = () => {
    dispatch(updateOffset());
    dispatch(fetchCharacters());
  };

  return (
    characterLoadingStatus === 'idle' && (
      <Virtuoso
        className={styles.virtuoso}
        data={characters}
        itemContent={(_index, character) => {
          return (
            <Link
              href={{
                pathname: '/[id]',
                query: { id: character.id },
              }}
            >
              <a>
                <div>
                  <Avatar
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                </div>
                <div className={styles.information}>
                  <span>{character.name}</span>
                  {character.description ? (
                    <p>{character.description}</p>
                  ) : (
                    <p className={styles.noDescription}>
                      No description available
                    </p>
                  )}
                </div>
                <ArrowIcon />
              </a>
            </Link>
          );
        }}
        components={{
          Item,
          List,
        }}
        endReached={loadMore}
      />
    )
  );
}
