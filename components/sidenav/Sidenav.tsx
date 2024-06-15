import Image from 'next/image';
import styles from './Sidenav.module.scss';

export default function Sidenav() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <Image
          src={'/assets/svgs/logo.svg'}
          alt="logo"
          fill
          className={styles.logo}
        />
      </div>

      <nav className={styles.nav}>
        <p>Switch Organization</p>
      </nav>
    </div>
  );
}
