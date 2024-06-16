import Image from 'next/image';
import styles from './Sidenav.module.scss';
import Link from 'next/link';
import { title } from 'process';

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
    ],
  },
];

export default function Sidenav() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapperOuter}>
        <div className={styles.logoWrapper}>
          <Image
            src={'/assets/svgs/logo.svg'}
            alt="logo"
            fill
            className={styles.logo}
          />
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.nav__main}>
          <div className={styles.nav__top}>
            <div className={styles.nav__top__content}>
              <Image
                src={'/assets/svgs/briefcase.svg'}
                alt="briefcase"
                width={16}
                height={16}
              />
              <p className={styles.nav__text__dark}>Switch Organization</p>
              <Image
                src={'/assets/svgs/down.svg'}
                alt="down"
                width={14}
                height={14}
              />
            </div>

            <div className={styles.nav__top__content}>
              <Image
                src={'/assets/svgs/home.svg'}
                alt="home"
                width={16}
                height={15}
              />
              <p className={styles.nav__text__light}>Dashboard</p>
            </div>
          </div>

          <div className={styles.nav__main}>
            {navs.map((nav) => (
              <div className={styles.nav__content}>
                <h3 className={styles.nav__title}>{nav.title}</h3>
                <ul className={styles.nav_links}>
                  {nav.links.map((link) => (
                    <li>
                      <Link
                        href={''}
                        className={`${styles.nav__top__content} ${
                          link.route.includes('/users')
                            ? styles.nav__top__content__active
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
                          className={`${styles.nav__text__light} ${
                            link.route.includes('/users')
                              ? styles.nav__text__dark
                              : ''
                          }`}
                        >
                          {link.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
