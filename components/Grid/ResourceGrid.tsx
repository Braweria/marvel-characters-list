import { VirtuosoGrid } from 'react-virtuoso';

import { useAppSelector } from 'redux/store';
import { GridContent } from './GridContent';
import { GridStoryContent } from './GridStoryContent';
import { Item } from './Item';
import { List } from './List';
import styles from './ResourceGrid.module.css';
import { ResourceGridProps } from './types';

export function ResourceGrid({ items, type }: ResourceGridProps): JSX.Element {
  console.log(items[0], type);
  return (
    <VirtuosoGrid
      className={styles.virtuoso}
      totalCount={items.length}
      useWindowScroll
      overscan={10}
      itemContent={(index) =>
        type === 'stories' ? (
          <GridStoryContent item={items[index]} />
        ) : (
          <GridContent item={items[index]} />
        )
      }
      components={{
        List,
        Item,
      }}
    />
  );
}
