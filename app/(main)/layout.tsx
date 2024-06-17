import { Header, Sidenav } from '@/components/index';
import styles from './layout.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <Sidenav />

      <div className={styles.main}>
        <Header />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
}
