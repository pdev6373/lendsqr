import styles from './page.module.scss';
import Image from 'next/image';
import { usersData } from '@/constants';
import { columns } from './columns';
import { DataTable } from './dataTable';

const users = [
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
  return (
    <div className={styles.wrapper}>
      <section className={styles.header}>
        <p className={styles.title}>Users</p>

        <div className={styles.users}>
          {users.map((user, index) => (
            <div className={styles.user} key={index}>
              <Image
                src={user.icon}
                alt="user section"
                width={40}
                height={40}
              />

              <p className={styles.type}>{user.type}</p>

              <p className={styles.amount}>{user.amount}</p>
            </div>
          ))}
        </div>
      </section>

      <DataTable columns={columns} data={usersData} />
    </div>
  );
}
