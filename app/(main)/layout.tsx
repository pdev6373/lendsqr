'use client';
import { Header, Sidenav } from '@/components/index';
import styles from './layout.module.scss';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { redirect } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { email } = useContext(AuthContext);

  useEffect(() => {
    if (!email) redirect('/login');
  }, [email]);

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
