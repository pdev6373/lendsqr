'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import styles from './Actions.module.css';
import Image from 'next/image';
import { useContext } from 'react';
import { MainContext, UserOverviewType } from '@/context/MainContext';
import { useRouter } from 'next/navigation';
import { Row } from '@tanstack/react-table';

type ActionsProps = {
  row: Row<UserOverviewType>;
};

export default function Actions({ row }: ActionsProps) {
  const status = row.original.status;
  const router = useRouter();
  const { users } = useContext(MainContext);

  return (
    <div className={styles.actions}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <span className="sr-only">Open menu</span>
            <Image
              src={'/assets/svgs/more.svg'}
              alt="more"
              width={20}
              height={20}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-40}
          className={styles.content}
        >
          <DropdownMenuItem
            className={styles.itemWrapper}
            onClick={() => {
              if (users) {
                const user = users?.find(
                  (user) =>
                    user.overview.id === row.original.id &&
                    user.overview.username === row.original.username,
                );

                if (user)
                  localStorage.setItem('lendsqr__user', JSON.stringify(user));

                router.push(`/users/${row.original.username}`);
              }
            }}
          >
            <Image
              src={'/assets/svgs/view.svg'}
              alt="view"
              width={16}
              height={16}
            />
            <p className={styles.dropdownText}>View Details</p>
          </DropdownMenuItem>

          <DropdownMenuItem className={styles.itemWrapper}>
            <Image
              src={'/assets/svgs/blacklist.svg'}
              alt="blacklist"
              width={16}
              height={16}
            />
            <p className={styles.dropdownText}>
              {status === 'Blacklisted' ? 'Whitelist User' : 'Blacklist User'}
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem className={styles.itemWrapper}>
            <Image
              src={'/assets/svgs/activate-user.svg'}
              alt="activate"
              width={16}
              height={16}
            />
            <p className={styles.dropdownText}>
              {status === 'Active' ? 'Deactivate User' : 'Activate User'}
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
