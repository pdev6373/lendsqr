'use client';
import { useContext, useEffect, useState } from 'react';
import styles from './page.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/index';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

type ErrorType = {
  type: 'email' | 'password';
  message: string;
};

type ErrorProps = {
  text: string;
};

const Error = ({ text }: ErrorProps) => (
  <div className={styles.error}>
    <Image src={'/assets/svgs/error.svg'} alt="error" width={16} height={16} />
    <p className={styles.error__text}>{text}</p>
  </div>
);

export default function Login() {
  const { setEmail: setUserEmail } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const router = useRouter();

  useEffect(() => {
    setError(null);
  }, [email, password]);

  const validateEmail = () => {
    if (!email.length) return { status: false, message: 'Email is required' };
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return { status: false, message: 'Invalid email address' };

    return {
      status: true,
      message: '',
    };
  };

  const validatePassword = () => {
    if (!password.length)
      return { status: false, message: 'Password is required' };

    return {
      status: true,
      message: '',
    };
  };

  const loginHandler = () => {
    const { message, status } = validateEmail();

    if (!status) {
      setError({
        message,
        type: 'email',
      });

      return;
    }

    const { message: passwordMessage, status: passwordStatus } =
      validatePassword();

    if (!passwordStatus) {
      setError({
        message: passwordMessage,
        type: 'password',
      });

      return;
    }

    localStorage.setItem('lendsqr__email', email);
    setPassword('');
    setShowPassword(false);
    setUserEmail(email);
    setEmail('');
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.aside}>
        <div className={styles.aside__inner}>
          <div className={styles.aside__inner__logo}>
            <Image
              src={'/assets/svgs/logo.svg'}
              alt="logo"
              fill
              className={styles.aside__image}
            />
          </div>

          <div className={styles.aside__illustration}>
            <div className={styles.aside__illustration__image}>
              <Image
                src={'/assets/pngs/auth-illustration.png'}
                alt="illustration"
                fill
                className={styles.aside__image}
              />
            </div>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.main__heading}>
          <p className={styles.main__heading__header}>Welcome!</p>
          <p className={styles.main__heading__body}>Enter details to login.</p>
        </div>

        <form
          className={styles.main__form}
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler();
          }}
        >
          <div className={styles.main__form__input}>
            <Input
              placeHolder="Email"
              value={email}
              setValue={setEmail}
              focus
              outline={error && error.type === 'email' ? 'error' : undefined}
            />
            {error && error.type === 'email' ? (
              <Error text={error.message} />
            ) : (
              <></>
            )}
          </div>

          <div className={styles.main__form__input}>
            <Input
              placeHolder="Password"
              value={password}
              setValue={setPassword}
              type={showPassword ? 'text' : 'password'}
              extra={
                <p
                  className={styles.main__form__text}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </p>
              }
              outline={error && error.type === 'password' ? 'error' : undefined}
            />
            {error && error.type === 'password' ? (
              <Error text={error.message} />
            ) : (
              <></>
            )}
          </div>

          <Link
            href={'#'}
            className={`${styles.main__form__text} ${styles.main__form__forgotPassword}`}
          >
            Forgot PASSWORD?
          </Link>

          <button className={styles.main__form__submit}>LOG IN</button>
        </form>
      </main>
    </div>
  );
}
