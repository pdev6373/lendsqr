'use client';
import {
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
  forwardRef,
} from 'react';
import styles from './Input.module.scss';

type InputProps = {
  placeHolder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  extra?: JSX.Element;
  type?: HTMLInputTypeAttribute;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeHolder, value, setValue, extra, type = 'text' }, ref) => {
    return (
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          placeholder={placeHolder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          ref={ref}
        />

        {extra ? <div className={styles.extra}>{extra}</div> : <></>}
      </div>
    );
  },
);

export default Input;
