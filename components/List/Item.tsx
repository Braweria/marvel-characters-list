import { forwardRef } from 'react';
import type { Components } from 'react-virtuoso';

import styles from './CharacterList.module.css';
import type { ItemRef } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Item: any = forwardRef<ItemRef, Components['Item']>(
  ({ children, ...props }, ref): JSX.Element => {
    return (
      <li {...props} ref={ref} className={styles.item}>
        {children}
      </li>
    );
  }
);
