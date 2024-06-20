import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.scss';
import localFont from 'next/font/local';
import { Entry } from '@/components/index';

const avenirNext = localFont({
  src: [
    {
      path: '../public/fonts/avenir-next/AvenirNextCyr-Regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/avenir-next/AvenirNextCyr-Medium.woff2',
      weight: '500',
    },
    {
      path: '../public/fonts/avenir-next/AvenirNextCyr-Demi.woff2',
      weight: '600',
    },
    {
      path: '../public/fonts/avenir-next/AvenirNextCyr-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-avenir-next',
});

const workSans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lendsqr - Empowering the smartest lenders',
  description: 'Empowering the smartest lenders',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} ${avenirNext.variable}`}>
        <Entry>{children}</Entry>
      </body>
    </html>
  );
}
