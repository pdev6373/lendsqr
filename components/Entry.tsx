'use client';
import AuthProvider from '@/context/AuthContext';
import { ReactNode } from 'react';
import MainProvider from '@/context/MainContext';
import AppEntry from './AppEntry';

export default function Entry({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MainProvider>
        <AppEntry>{children}</AppEntry>
      </MainProvider>
    </AuthProvider>
  );
}
