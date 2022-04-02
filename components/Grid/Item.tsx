import { forwardRef } from 'react';
import type { Components } from 'react-virtuoso';

import styles from './ResourceGrid.module.css';
import type { ListAndItemRef } from './types';

export const Item = forwardRef<ListAndItemRef, Components['Item']>(
  ({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={styles.item}>
        {children}
      </div>
    );
  }
);
