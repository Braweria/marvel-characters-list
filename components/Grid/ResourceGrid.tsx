import { VirtuosoGrid } from 'react-virtuoso';
import { selectComicById, selectComicsByIds } from 'redux/slices/comics.slice';
import { useAppSelector } from 'redux/store';
import { extractIdFromUris, mapArrayToKeyValue } from './consts';
import styles from './ResourceGrid.module.css';

export function ResourceGrid({ items }) {
  const ids = extractIdFromUris(mapArrayToKeyValue(items, 'resourceURI'));

  const comics = useAppSelector((state) => selectComicsByIds(state, ids));
  console.log(comics);
  return (
    <VirtuosoGrid
      className={styles.virtuoso}
      totalCount={items.length}
      itemContent={(index) => <p>{items[index].name}</p>}
    />
  );
}
