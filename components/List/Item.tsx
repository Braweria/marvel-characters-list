import { forwardRef } from 'react';
import type { Components } from 'react-virtuoso';

import styles from './CharacterList.module.css';
import type { ItemRef } from './types';

export const Item = forwardRef<ItemRef, Components['Item']>(
  ({ children, ...props }, ref) => {
    return (
      <li {...props} ref={ref} className={styles.item}>
        {children}
      </li>
    );
  }
);
