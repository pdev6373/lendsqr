import { Dispatch, SetStateAction } from 'react';
import styles from './Search.module.scss';
import Image from 'next/image';

type SearchProps = {
  placeHolder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function Search({ placeHolder, setValue, value }: SearchProps) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className={styles.searchIcon}>
        <Image
          src={'/assets/svgs/search.svg'}
          alt="search"
          width={14}
          height={14}
        />
      </div>
    </div>
  );
}
