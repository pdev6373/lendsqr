'use client';
import styles from './page.module.scss';
import Image from 'next/image';
import { columns, DataTable } from '@/components/index';
import { useContext, useEffect, useState } from 'react';
import { MainContext, UserOverviewType } from '@/context/MainContext';
import { format } from 'date-fns';
import { truncateEmail, formatPhoneNumber, shortenString } from '@/helpers';

const usersDetails = [
  {
    type: 'Users',
    amount: '2,453',
    icon: '/assets/svgs/all-users.svg',
  },
  {
    type: 'Active Users',
    amount: '2,453',
    icon: '/assets/svgs/active-users.svg',
  },
  {
    type: 'Users with Loans',
    amount: '12,453',
    icon: '/assets/svgs/users-with-loans.svg',
  },
  {
    type: 'Users with Savings',
    amount: '102,453',
    icon: '/assets/svgs/users-with-savings.svg',
  },
];

export default function Users() {
  const { users, setUsers } = useContext(MainContext);
  const [tableData, setTableData] = useState<UserOverviewType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      fetch('https://apimocha.com/lend/users', { method: 'GET' })
        .then((response) => response.json())
        .then((json) => {
          setUsers(json);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (users)
      setTableData(
        users.map((user) => ({
          ...user.overview,
          email: truncateEmail(user.overview.email),
          phoneNumber: formatPhoneNumber(user.overview.phoneNumber),
          organization: shortenString(user.overview.organization),
          dateJoined: format(
            user.overview.dateJoined as Date,
            'MMM dd, yyyy h:mm a',
          ),
        })),
      );
  }, [users]);

  if (loading || !tableData)
    return (
      <div className={styles.loading}>
        <div />
        <div />
        <div />
        <div>
          <Image
            src={'/assets/svgs/logo-icon.svg'}
            alt="logo icon"
            width={28}
            height={28}
          />
        </div>
      </div>
    );

  if (!users && !loading) return <></>;

  return (
    <div className={styles.wrapper}>
      <section className={styles.header}>
        <p className={styles.header__title}>Users</p>

        <div className={styles.header__users}>
          {usersDetails.map((user, index) => (
            <div className={styles.header__users__user} key={index}>
              <Image
                src={user.icon}
                alt="user section"
                width={40}
                height={40}
              />
              <p className={styles.header__users__user__type}>{user.type}</p>
              <p className={styles.header__users__user__amount}>
                {user.amount}
              </p>
            </div>
          ))}
        </div>
      </section>

      {!tableData ? <></> : <DataTable columns={columns} data={tableData} />}
    </div>
  );
}
