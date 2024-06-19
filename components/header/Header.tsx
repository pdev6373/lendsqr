'use client';
import Image from 'next/image';
import styles from './Header.module.scss';
import Search from '../search/Search';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { MainContext } from '@/context/MainContext';
import { AuthContext } from '@/context/AuthContext';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function Header() {
  const { setShowSidebar, setSearch } = useContext(MainContext);
  const { email } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className={styles.wrapper}>
      <div className={styles.wrapper__menu}>
        <div
          className={styles.menuWrapper}
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <Image
            src={'/assets/svgs/menu.svg'}
            alt="menu"
            width={24}
            height={24}
            className={styles.menu}
          />
        </div>

        <Search
          placeHolder="Search for anything"
          value={searchValue}
          setValue={setSearchValue}
          onSearch={() => setSearch(searchValue)}
        />
      </div>

      <div className={styles.aside}>
        <a
          href="https://blog.lendsqr.com/how-to-use-lendsqr-apis-to-power-your-loan-app/"
          target="_blank"
          className={`${roboto.className} ${styles.docs}`}
        >
          Docs
        </a>

        <Image
          src={'/assets/pngs/notification.png'}
          alt="notification"
          width={26}
          height={26}
          className={styles.notification}
        />

        <div className={styles.profile}>
          <div className={styles.profileImageWrapper}>
            <Image
              src={'/assets/pngs/profile.png'}
              alt="profile"
              fill
              className={styles.profileImage}
            />
          </div>

          <div className={styles.user}>
            <p className={styles.name}>{email.replace(/@.+$/, '')}</p>
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
