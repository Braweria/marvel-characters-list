import { forwardRef } from 'react';
import type { Components } from 'react-virtuoso';

import styles from './CharacterList.module.css';
import type { ListRef } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const List: any = forwardRef<ListRef, Components['List']>(
  ({ children, ...props }, ref) => {
    return (
      <ul {...props} ref={ref} className={styles.list}>
        {children}
      </ul>
    );
  }
);
