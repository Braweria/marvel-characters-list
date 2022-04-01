import { Loader } from '@/Loader/Loader';
import styles from './CharacterList.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Loader />
      <span>Loading more Marvel characters...</span>
    </footer>
  );
}
