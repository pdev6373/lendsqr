'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const loginHandler = async () => {
    router.push('/');
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.aside}>
        <div className={styles.logoWrapper}>
          <Image
            src={'/assets/svgs/logo.svg'}
            alt="logo"
            fill
            className={styles.logo}
          />
        </div>

        <div className={styles.illustrationWrapperOuter}>
          <div className={styles.illustrationWrapper}>
            <Image
              src={'/assets/pngs/auth-illustration.png'}
              alt="illustration"
              fill
              className={styles.illustration}
            />
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.main__heading}>
          <p className={styles.main__heading__header}>Welcome!</p>
          <p className={styles.main__heading__body}>Enter details to login.</p>
        </div>

        <form className={styles.form}>
          <Input
            placeHolder="Email"
            value={email}
            setValue={setEmail}
            ref={emailRef}
          />

          <Input
            placeHolder="Password"
            value={password}
            setValue={setPassword}
            type={showPassword ? 'text' : 'password'}
            extra={
              <p
                className={styles.passwordText}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </p>
            }
          />

          <Link href={'#'} className={styles.forgotPassword}>
            Forgot PASSWORD?
          </Link>

          <button onClick={loginHandler} className={styles.form__submit}>
            LOG IN
          </button>
        </form>
      </main>
    </div>
  );
}
