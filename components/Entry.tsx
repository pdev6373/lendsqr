'use client';
import AuthProvider from '@/context/AuthContext';
import { ReactNode } from 'react';
import MainProvider from '@/context/MainContext';

export default function Entry({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MainProvider>
        <>{children}</>
      </MainProvider>
    </AuthProvider>
  );
}
