import Image from 'next/image';
import styles from './Avatar.module.css';
import { checkIfImageIsAvailable } from './consts';
import { AvatarProps } from './types';

export function Avatar({ src, alt }: AvatarProps): JSX.Element {
  const isImageAvailable = checkIfImageIsAvailable(src);

  const imageSrc = isImageAvailable ? src : '/marvel-logo-square.png';

  return (
    <div className={styles.avatar}>
      <Image
        layout="fill"
        className={styles.image}
        src={imageSrc}
        alt={alt}
        objectFit="cover"
      />
    </div>
  );
}
