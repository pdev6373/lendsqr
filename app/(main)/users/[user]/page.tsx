'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import localFont from 'next/font/local';
import { UserDataType, UserType } from '@/context/MainContext';
import formatPhoneNumber, { formatCurrency, truncateEmail } from '@/helpers';

const sfCompact = localFont({
  src: [
    {
      path: '../../../../public/fonts/sf-compact/SF-Compact-Text-Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-sf-compact',
});

const tabs = [
  {
    name: 'General Details',
    route: 'general-details',
  },
  {
    name: 'Documents',
    route: 'documents',
  },
  {
    name: 'Bank Details',
    route: 'bank-details',
  },
  {
    name: 'Loans',
    route: 'loans',
  },
  {
    name: 'Savings',
    route: 'savings',
  },
  {
    name: 'App and System',
    route: 'app-and-system',
  },
];

type UserDetailsProps = {
  details: UserDataType;
  isLast: boolean;
};

const UserDetails = ({ details, isLast }: UserDetailsProps) => (
  <div className={styles.details__bottom__content}>
    {details.title.startsWith('education') ? (
      <p className={styles.details__bottom__content__title}>
        Education and Employment
      </p>
    ) : (
      <p
        className={`${styles.details__bottom__content__title} ${styles.details__bottom__content__titleUppercase}`}
      >
        {details.title}
      </p>
    )}

    <div className={styles.details__bottom__content__details}>
      {details.data.map((data) => (
        <div
          className={styles.details__bottom__content__details__main}
          key={data.title}
        >
          <p className={styles.details__bottom__content__details__main__title}>
            {data.title}
          </p>
          <p
            className={`${
              styles.details__bottom__content__details__main__text
            } ${
              (typeof data.value === 'string' && data.value?.includes('@')) ||
              data.title.toLowerCase().startsWith('duration')
                ? styles.details__bottom__content__details__main__textLower
                : ''
            }  ${
              data.title.toLowerCase() === 'children'
                ? styles.details__bottom__content__details__main__textUpper
                : ''
            }`}
          >
            {typeof data.value === 'string' || typeof data.value === 'number'
              ? typeof data.value === 'string' && data.value?.includes('@')
                ? truncateEmail(data.value)
                : data.title.toLowerCase().startsWith('duration')
                ? `${data.value} ${Number(data.value) > 1 ? 'years' : 'year'}`
                : data.title.toLowerCase().startsWith('monthly') ||
                  data.title.toLowerCase().startsWith('loan')
                ? data.title.toLowerCase().startsWith('monthly')
                  ? `${formatCurrency(
                      Number(data.value) * 0.7,
                    )} - ${formatCurrency(data.value)}`
                  : formatCurrency(data.value).slice(
                      0,
                      formatCurrency(data.value).length - 3,
                    )
                : data.title.toLowerCase().startsWith('phone number')
                ? formatPhoneNumber(data.value)
                : data.value
              : `${data?.value?.name?.last} ${data?.value?.name?.first}`}
          </p>
        </div>
      ))}
    </div>

    {isLast ? <></> : <div className={styles.details__bottom__content__line} />}
  </div>
);

export default function User() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const userAsString = localStorage.getItem('lendsqr__user');
  const [isUserBlacklisted, setIsUserBlacklisted] = useState(false);
  const [isUserActivated, setIsUserActivated] = useState(false);

  useEffect(() => {
    window.focus();
    window.scrollTo(0, 0);
  }, []);

  if (!userAsString) {
    router.replace('/users');
    return;
  }

  const user: UserType = JSON.parse(userAsString as string);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header__back} onClick={router.back}>
          <Image
            src={'/assets/svgs/back-arrow.svg'}
            alt="back"
            width={30}
            height={30}
          />
          <p className={styles.header__back__text}>Back to Users</p>
        </div>

        <div className={styles.header__main}>
          <p className={styles.header__main__title}>User Details</p>

          <div className={styles.header__main__actions}>
            <button
              className={styles.header__main__actions__action}
              onClick={() => setIsUserBlacklisted((prev) => !prev)}
            >
              {isUserBlacklisted ? 'Whitelist User' : 'Blacklist User'}
            </button>
            <button
              className={`${styles.header__main__actions__action} ${styles.header__main__actions__actionActivate}`}
              onClick={() => setIsUserActivated((prev) => !prev)}
            >
              {isUserActivated ? 'Dectivate User' : 'Activate User'}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.details__main}>
          <div className={styles.details__main__profile}>
            <Image
              src={user.overview.profilePicture}
              alt="user"
              fill
              className={styles.details__main__profile__image}
            />
          </div>

          <div className={styles.details__main__content}>
            <div className={styles.details__main__content__name}>
              <p className={styles.details__main__content__name__text}>
                {user.overview.fullName}
              </p>
              <p className={styles.details__main__content__name__id}>
                {user.overview.id}
              </p>
            </div>

            <div className={styles.details__main__content__rating}>
              <p className={styles.details__main__content__rating__tier}>
                User’s Tier
              </p>

              <div className={styles.details__main__content__rating__icon}>
                {Number(user.overview.rating) > 0 ? (
                  <Image
                    src={'/assets/svgs/star-filled.svg'}
                    alt="star"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src={'/assets/svgs/star-outline.svg'}
                    alt="star"
                    width={16}
                    height={16}
                  />
                )}

                {Number(user.overview.rating) > 1 ? (
                  <Image
                    src={'/assets/svgs/star-filled.svg'}
                    alt="star"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src={'/assets/svgs/star-outline.svg'}
                    alt="star"
                    width={16}
                    height={16}
                  />
                )}

                {Number(user.overview.rating) > 2 ? (
                  <Image
                    src={'/assets/svgs/star-filled.svg'}
                    alt="star"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src={'/assets/svgs/star-outline.svg'}
                    alt="star"
                    width={16}
                    height={16}
                  />
                )}
              </div>
            </div>

            <div className={styles.details__main__content__balance}>
              <p className={styles.details__main__content__balance__text}>
                {formatCurrency(user.overview.balance)}
              </p>
              <p className={styles.details__main__content__balance__bank}>
                {`${user.overview.bankAccount}/${user.overview.bank}`}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.details__tabs}>
          {tabs.map((tab) => (
            <div
              key={tab.name}
              onClick={() => setCurrentTab(tab)}
              className={
                currentTab.name === tab.name
                  ? styles.details__tabs__tabCurrent
                  : `${sfCompact.variable} ${styles.details__tabs__tab}`
              }
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.details} ${styles.details__bottom}`}>
        {user.data.map((details, index) =>
          details.title.toLowerCase().startsWith('education') ? (
            <>
              <UserDetails
                details={details}
                isLast={user.data.length - 1 === index}
              />

              <UserDetails
                details={{
                  title: 'Socials',
                  data: [
                    {
                      title: 'Twitter',
                      value: `@${user.overview.username}`,
                    },
                    {
                      title: 'Facebook',
                      value: user.overview.fullName,
                    },
                    {
                      title: 'Instagram',
                      value: `@${user.overview.username}`,
                    },
                  ],
                }}
                isLast={false}
              />
            </>
          ) : (
            <UserDetails
              details={
                !index
                  ? {
                      title: details.title,
                      data: [
                        {
                          title: 'full Name',
                          value: user.overview.fullName,
                        },
                        {
                          title: 'Phone Number',
                          value: formatPhoneNumber(user.overview.phoneNumber),
                        },
                        {
                          title: 'Email Address',
                          value: truncateEmail(user.overview.email),
                        },
                        ...details.data,
                      ],
                    }
                  : details
              }
              isLast={user.data.length - 1 === index}
            />
          ),
        )}
      </div>
    </div>
  );
}
