'use client';
import { ReactNode, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { redirect } from 'next/navigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { email } = useContext(AuthContext);

  useEffect(() => {
    if (email) redirect('/');
  }, [email]);

  return <>{children}</>;
}
