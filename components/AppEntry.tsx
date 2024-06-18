'use client';
import { AuthContext } from '@/context/AuthContext';
import { ReactNode, useContext, useEffect, useState } from 'react';

export default function AppEntry({ children }: { children: ReactNode }) {
  const { setEmail } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem('lendsqr__email');
    if (userName) setEmail(userName);

    setShow(true);
  }, []);

  if (typeof window === 'undefined') return <></>;

  return show ? <>{children}</> : <></>;
}
