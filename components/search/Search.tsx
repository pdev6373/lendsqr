import { Dispatch, SetStateAction } from 'react';
import styles from './Search.module.scss';
import Image from 'next/image';

type SearchProps = {
  placeHolder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onSearch: () => any;
};

export default function Search({
  placeHolder,
  setValue,
  value,
  onSearch,
}: SearchProps) {
  return (
    <form
      className={styles.wrapper}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <input
        className={styles.input}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button className={styles.searchIcon}>
        <Image
          src={'/assets/svgs/search.svg'}
          alt="search"
          width={14}
          height={14}
        />
      </button>
    </form>
  );
}
