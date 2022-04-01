import styles from './Loader.module.css';

/**
 * Simple Loader Indicator taken from Marvel's Website
 */

export function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderA} />
      <div className={styles.loaderB} />
    </div>
  );
}
