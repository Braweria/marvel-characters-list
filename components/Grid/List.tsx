import { forwardRef } from 'react';
import type { Components } from 'react-virtuoso';

import styles from './ResourceGrid.module.css';
import type { ListAndItemRef } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const List: any = forwardRef<ListAndItemRef, Components['List']>(
  ({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={styles.list}>
        {children}
      </div>
    );
  }
);
