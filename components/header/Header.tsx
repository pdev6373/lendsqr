'use client';

import Image from 'next/image';
import styles from './Header.module.scss';
import Search from '../search/Search';
import { useState } from 'react';
import Link from 'next/link';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function Header() {
  const [search, setSearch] = useState('');

  return (
    <header className={styles.wrapper}>
      <Search
        placeHolder="Search for anything"
        value={search}
        setValue={setSearch}
      />

      <div className={styles.aside}>
        <Link href={'#'} className={`${roboto.className} ${styles.docs}`}>
          Docs
        </Link>

        <Image
          src={'/assets/pngs/notification.png'}
          alt="notification"
          width={26}
          height={26}
          className={styles.notification}
        />

        <div className={styles.profile}>
          <Image
            src={'/assets/pngs/profile.png'}
            alt="profile"
            width={48}
            height={48}
            className={styles.profileImage}
          />

          <div className={styles.user}>
            <p className={styles.name}>Adedeji</p>
            <Image
              src={'/assets/svgs/dropdown.svg'}
              alt="dropdown"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
