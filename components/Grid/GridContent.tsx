import Image from 'next/image';
import Link from 'next/link';
import styles from './ResourceGrid.module.css';
import { GridContentProps } from './types';

export function GridContent({ item }: GridContentProps) {
  return (
    <div>
      <Link href={item.urls ? item.urls[0]?.url : '#'}>
        <a target="_blank" className={styles.contentLink}>
          {item.thumbnail && (
            <div className={styles.contentImageWrapper}>
              <Image
                src={item.thumbnail.path + '.' + item.thumbnail.extension}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
              <svg
                className={styles.contentImageOverlay}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </div>
          )}
          <div>{item.title}</div>
        </a>
      </Link>
    </div>
  );
}
