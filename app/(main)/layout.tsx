'use client';
import { Header, Sidenav } from '@/components/index';
import styles from './layout.module.scss';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { redirect, usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { email } = useContext(AuthContext);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!email) redirect('/login');
  }, [email]);

  useEffect(() => {
    if (ref.current) ref.current.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className={styles.wrapper}>
      <Sidenav />

      <div className={styles.main} ref={ref}>
        <Header />
        <div className={styles.main__children}>{children}</div>
      </div>
    </div>
  );
}
