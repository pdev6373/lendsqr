'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import localFont from 'next/font/local';

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

const details = {
  overview: {
    profilePicture: '/assets/svgs/user.svg',
    fullName: 'Grace Effiom',
    id: 'LSQFf587g90',
    balance: '₦200,000.00',
    bank: 'Providus Bank',
    bankAccount: '9912345678',
    tier: {
      type: 'User’s Tier',
      rating: 1,
      totalRating: 3,
    },
  },
  data: [
    {
      title: 'Personal Information',
      data: [
        {
          title: 'full Name',
          value: 'Grace Effiom',
        },
        {
          title: 'Phone Number',
          value: '07060780922',
        },
        {
          title: 'Email Address',
          value: 'grace@gmail.com',
        },
        {
          title: 'Bvn',
          value: '07060780922',
        },
        {
          title: 'Gender',
          value: 'Female',
        },
        {
          title: 'Marital status',
          value: 'Single',
        },
        {
          title: 'Children',
          value: 'None',
        },
        {
          title: 'Type of residence',
          value: 'Parent’s Apartment',
        },
      ],
    },
    {
      title: 'Education and Employment',
      data: [
        {
          title: 'level of education',
          value: 'B.Sc',
        },
        {
          title: 'employment status',
          value: 'Employed',
        },
        {
          title: 'sector of employment',
          value: 'FinTech',
        },
        {
          title: 'Duration of employment',
          value: '2 years',
        },
        {
          title: 'office email',
          value: 'grace@lendsqr.com',
        },
        {
          title: 'Monthly income',
          value: '₦200,000.00- ₦400,000.00',
        },
        {
          title: 'loan repayment',
          value: '40,000',
        },
      ],
    },
    {
      title: 'Socials',
      data: [
        {
          title: 'Twitter',
          value: '@grace_effiom',
        },
        {
          title: 'Facebook',
          value: 'Grace Effiom',
        },
        {
          title: 'Instagram',
          value: '@grace_effiom',
        },
      ],
    },
    {
      title: 'First Guarantor',
      data: [
        {
          title: 'full Name',
          value: 'Debby Ogana',
        },
        {
          title: 'Phone Number',
          value: '07060780922',
        },
        {
          title: 'Email Address',
          value: 'debby@gmail.com',
        },
        {
          title: 'Relationship',
          value: 'Sister',
        },
      ],
    },
    {
      title: 'Second Guarantor',
      data: [
        {
          title: 'full Name',
          value: 'Debby Ogana',
        },
        {
          title: 'Phone Number',
          value: '07060780922',
        },
        {
          title: 'Email Address',
          value: 'debby@gmail.com',
        },
        {
          title: 'Relationship',
          value: 'Sister',
        },
      ],
    },
  ],
};

export default function User() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.back} onClick={router.back}>
          <Image
            src={'/assets/svgs/back-arrow.svg'}
            alt="back"
            width={30}
            height={30}
          />
          <p className={styles.back__text}>Back to Users</p>
        </div>

        <div className={styles.header__main}>
          <p className={styles.header__main__title}>User Details</p>

          <div className={styles.header__actions}>
            <button className={styles.header__actions__action}>
              Blacklist User
            </button>
            <button
              className={`${styles.header__actions__action} ${styles.header__actions__action__activate}`}
            >
              Activate User
            </button>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.details__main}>
          <Image
            src={details.overview.profilePicture}
            alt="user"
            width={100}
            height={100}
          />

          <div className={styles.details__main__content}>
            <div className={styles.nameWrapper}>
              <p className={styles.nameWrapper__name}>
                {details.overview.fullName}
              </p>
              <p className={styles.nameWrapper__id}>{details.overview.id}</p>
            </div>

            <div className={styles.ratingWrapper}>
              <p className={styles.ratingWrapper__tier}>
                {details.overview.tier.type}
              </p>
              <div className={styles.rating}>
                {details.overview.tier.rating > 0 ? (
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

                {details.overview.tier.rating > 1 ? (
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

                {details.overview.tier.rating > 2 ? (
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

            <div className={styles.balanceWrapper}>
              <p className={styles.balanceWrapper__balance}>
                {details.overview.balance}
              </p>
              <p className={styles.balanceWrapper__bank}>
                {`${details.overview.bankAccount}/${details.overview.bank}`}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <div
              key={tab.name}
              // href={'#'}
              onClick={() => setCurrentTab(tab)}
              className={
                currentTab.name === tab.name
                  ? styles.tabs__current
                  : `${sfCompact.variable} ${styles.tab}`
              }
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.details} ${styles.details__bottom}`}>
        {details.data.map((detail, index) => (
          <div className={styles.details__bottom__content} key={index}>
            <p className={styles.details__bottom__content__title}>
              {detail.title}
            </p>

            <div className={styles.details__bottom__content__details}>
              {detail.data.map((data) => (
                <div
                  className={styles.details__bottom__content__details__main}
                  key={data.title}
                >
                  <p
                    className={
                      styles.details__bottom__content__details__main__title
                    }
                  >
                    {data.title}
                  </p>
                  <p
                    className={
                      styles.details__bottom__content__details__main__text
                    }
                  >
                    {data.value}
                  </p>
                </div>
              ))}
            </div>

            {details.data.length - 1 === index ? (
              <></>
            ) : (
              <div className={styles.line} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
