'use client';
import Image from 'next/image';
import styles from './Sidenav.module.scss';
import { useContext, useEffect } from 'react';
import { MainContext } from '@/context/MainContext';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

const navs = [
  {
    title: 'CUSTOMERS',
    links: [
      {
        name: 'Users',
        route: '/users',
        icon: '/assets/svgs/users.svg',
      },
      {
        name: 'Guarantors',
        route: '/guarantors',
        icon: '/assets/svgs/guarantors.svg',
      },
      {
        name: 'Loans',
        route: '/loans',
        icon: '/assets/svgs/loans.svg',
      },
      {
        name: 'Decision Models',
        route: '/decision-models',
        icon: '/assets/svgs/decision-models.svg',
      },
      {
        name: 'Savings',
        route: '/savings',
        icon: '/assets/svgs/savings.svg',
      },
      {
        name: 'Loan Requests',
        route: '/loan-requests',
        icon: '/assets/svgs/loan-requests.svg',
      },
      {
        name: 'Whitelist',
        route: '/whitelist',
        icon: '/assets/svgs/whitelist.svg',
      },
      {
        name: 'Karma',
        route: '/karma',
        icon: '/assets/svgs/karma.svg',
      },
    ],
  },
  {
    title: 'BUSINESSES',
    links: [
      {
        name: 'Organization',
        route: '/organization',
        icon: '/assets/svgs/organization.svg',
      },
      {
        name: 'Loan Products',
        route: '/loan-products',
        icon: '/assets/svgs/loan-products.svg',
      },
      {
        name: 'Savings Products',
        route: '/savings-products',
        icon: '/assets/svgs/savings-products.svg',
      },
      {
        name: 'Fees and Charges',
        route: '/fees-and-charges',
        icon: '/assets/svgs/fees-and-charges.svg',
      },
      {
        name: 'Transactions',
        route: '/transactions',
        icon: '/assets/svgs/transactions.svg',
      },
      {
        name: 'Services',
        route: '/services',
        icon: '/assets/svgs/services.svg',
      },
      {
        name: 'Service Account',
        route: '/service-account',
        icon: '/assets/svgs/service-account.svg',
      },
      {
        name: 'Settlements',
        route: '/settlements',
        icon: '/assets/svgs/settlements.svg',
      },
      {
        name: 'Reports',
        route: '/reports',
        icon: '/assets/svgs/reports.svg',
      },
    ],
  },
  {
    title: 'SETTINGS',
    links: [
      {
        name: 'Preferences',
        route: '/preferences',
        icon: '/assets/svgs/preferences.svg',
      },
      {
        name: 'Fees and Pricing',
        route: '/fees-and-pricing',
        icon: '/assets/svgs/fees-and-pricing.svg',
      },
      {
        name: 'Audit Logs',
        route: '/audit-logs',
        icon: '/assets/svgs/audit-logs.svg',
      },
      {
        name: 'Systems Messages',
        route: '/systems-messages',
        icon: '/assets/svgs/systems-messages.svg',
      },
    ],
  },
];

export default function Sidenav() {
  const { showSidebar, setShowSidebar } = useContext(MainContext);
  const { setEmail } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    setShowSidebar(false);
  }, []);

  return (
    <>
      <div
        className={`${styles.overlay} ${
          !showSidebar ? styles.overlayHidden : ''
        }`}
        onClick={() => setShowSidebar(false)}
      />

      <div
        className={`${styles.wrapper} ${showSidebar ? styles.wrapperShow : ''}`}
      >
        <div className={styles.logo}>
          <div className={styles.logo__inner}>
            <div className={styles.logo__inner__wrapper}>
              <Image
                src={'/assets/svgs/logo.svg'}
                alt="logo"
                fill
                className={styles.logo__inner__wrapper__image}
              />
            </div>

            <div onClick={() => setShowSidebar(false)} className={styles.close}>
              <Image
                src={'/assets/svgs/close.svg'}
                alt="close"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        <nav className={styles.nav}>
          <div className={styles.nav__main}>
            <div className={styles.nav__main__top}>
              <div
                className={styles.nav__main__top__content}
                onClick={() => setShowSidebar(false)}
              >
                <Image
                  src={'/assets/svgs/briefcase.svg'}
                  alt="briefcase"
                  width={16}
                  height={16}
                />
                <p className={styles.nav__main__top__content__darkText}>
                  Switch Organization
                </p>
                <Image
                  src={'/assets/svgs/down.svg'}
                  alt="down"
                  width={14}
                  height={14}
                />
              </div>

              <div
                className={styles.nav__main__top__content}
                onClick={() => setShowSidebar(false)}
              >
                <Image
                  src={'/assets/svgs/home.svg'}
                  alt="home"
                  width={16}
                  height={15}
                />
                <p className={styles.nav__main__top__content__lightText}>
                  Dashboard
                </p>
              </div>
            </div>

            <div className={styles.nav__main}>
              {navs.map((nav) => (
                <div className={styles.nav__main__content} key={nav.title}>
                  <h3 className={styles.nav__main__content__title}>
                    {nav.title}
                  </h3>
                  <ul className={styles.nav__main__content__links}>
                    {nav.links.map((link) => (
                      <li key={link.name}>
                        <div
                          onClick={() => setShowSidebar(false)}
                          className={`${styles.nav__main__top__content} ${
                            link.route.includes('/users')
                              ? styles.nav__main__top__content__active
                              : ''
                          }`}
                        >
                          <div className={styles.nav__iconWrapper}>
                            <Image
                              src={link.icon}
                              alt="nav icon"
                              className={styles.nav__iconWrapper__icon}
                              fill
                            />
                          </div>

                          <p
                            className={`${
                              styles.nav__main__top__content__lightText
                            } ${
                              link.route.includes('/users')
                                ? styles.nav__main__top__content__darkText
                                : ''
                            }`}
                          >
                            {link.name}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className={styles.logout}>
                <div
                  onClick={() => {
                    localStorage.removeItem('lendsqr__email');
                    localStorage.removeItem('lendsqr__user');
                    setEmail('');
                  }}
                  className={styles.nav__main__top__content}
                >
                  <div className={styles.nav__iconWrapper}>
                    <Image
                      src={'/assets/svgs/logout.svg'}
                      alt="logout"
                      className={styles.nav__iconWrapper__icon}
                      fill
                    />
                  </div>

                  <p
                    className={`${styles.nav__main__top__content__lightText} ${styles.nav__main__top__content__darkText}`}
                  >
                    Logout
                  </p>
                </div>

                <p className={styles.version}>v1.2.0</p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
