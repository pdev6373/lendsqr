'use client';
import Image from 'next/image';
import styles from './Header.module.scss';
import Search from '../search/Search';
import { useContext, useState } from 'react';
import { Roboto } from 'next/font/google';
import { MainContext } from '@/context/MainContext';
import { AuthContext } from '@/context/AuthContext';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function Header() {
  const { setShowSidebar, setSearch, search, setSearchValue, searchValue } =
    useContext(MainContext);
  const { email } = useContext(AuthContext);

  return (
    <header className={styles.wrapper}>
      <div className={styles.menu}>
        <div
          className={styles.menu__image}
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <Image
            src={'/assets/svgs/menu.svg'}
            alt="menu"
            width={24}
            height={24}
          />
        </div>

        <Search
          placeHolder="Search for anything"
          value={searchValue}
          setValue={(e) => {
            setSearch(e);
            setSearchValue(e);
          }}
          onSearch={() => {
            setSearch(search);
            setSearchValue(searchValue);
          }}
        />
      </div>

      <div className={styles.aside}>
        <a
          href="https://blog.lendsqr.com/how-to-use-lendsqr-apis-to-power-your-loan-app/"
          target="_blank"
          className={`${roboto.className} ${styles.aside__docs}`}
        >
          Docs
        </a>

        <Image
          src={'/assets/pngs/notification.png'}
          alt="notification"
          width={26}
          height={26}
          className={styles.aside__notification}
        />

        <div className={styles.aside__profile}>
          <div className={styles.aside__profile__image}>
            <Image
              src={'/assets/pngs/profile.png'}
              alt="profile"
              fill
              className={styles.aside__profile__image__link}
            />
          </div>

          <div className={styles.aside__user}>
            <p className={styles.aside__user__name}>
              {email.replace(/@.+$/, '')}
            </p>
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
