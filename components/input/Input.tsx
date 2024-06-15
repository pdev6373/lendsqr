'use client';
import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';
import styles from './Input.module.scss';

type InputProps = {
  placeHolder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  extra?: JSX.Element;
  type?: HTMLInputTypeAttribute;
  focus?: boolean;
};

export default function Input({
  placeHolder,
  value,
  setValue,
  extra,
  type = 'text',
  focus = false,
}: InputProps) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        autoFocus={focus}
      />

      {extra ? <div className={styles.extra}>{extra}</div> : <></>}
    </div>
  );
}
