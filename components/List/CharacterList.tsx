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
import { Footer } from './Footer';

import styles from './CharacterList.module.css';
import Link from 'next/link';
import { ArrowIcon } from '@/ArrowIcon/ArrowIcon';
import { useCallback } from 'react';

export function CharacterList() {
  const characters = useSelector(selectAllCharacters);
  const dispatch = useDispatch();

  const loadMore = useCallback(() => {
    // Fake loading time
    setTimeout(() => {
      dispatch(updateOffset());
      dispatch(fetchCharacters());
    }, 500);
  }, [dispatch]);

  return (
    <Virtuoso
      id="marvel-characters"
      className={styles.virtuoso}
      data={characters}
      useWindowScroll
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
                  src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                  alt={character.name}
                />
              </div>
              <div className={styles.information}>
                <span className='character-name'>{character.name}</span>
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
        Footer,
      }}
      endReached={loadMore}
    />
  );
}
