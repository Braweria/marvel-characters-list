import Image from 'next/image';
import styles from './Avatar.module.css';

export function Avatar({ src, alt }) {
  return (
    <div className={styles.avatar}>
      <Image
        layout="fill"
        className={styles.image}
        src={src}
        alt={alt}
        objectFit="cover"
      />
    </div>
  );
}
