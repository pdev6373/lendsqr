'use client';
import styles from './columns.module.scss';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type Users = {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Inactive' | 'Pending' | 'Blacklisted' | 'Active';
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: 'organization',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={styles.header}
        >
          <p className={styles.header__text}>ORGANIZATION</p>
          <Image
            src={'/assets/svgs/sort.svg'}
            alt="sort"
            width={16}
            height={16}
          />
        </div>
      );
    },
  },
  {
    id: 'space',
    cell: () => {
      return <div className={styles.space} />;
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={styles.header}
        >
          <p className={styles.header__text}>USERNAME</p>
          <Image
            src={'/assets/svgs/sort.svg'}
            alt="sort"
            width={16}
            height={16}
          />
        </div>
      );
    },
  },
  {
    id: 'space-2',
    cell: () => {
      return <div className={styles.space} />;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={styles.header}
        >
          <p className={styles.header__text}>EMAIL</p>
          <Image
            src={'/assets/svgs/sort.svg'}
            alt="sort"
            width={16}
            height={16}
          />
        </div>
      );
    },
  },
  {
    id: 'space-3',
    cell: () => {
      return <div className={styles.space} />;
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={styles.header}
        >
          <p className={styles.header__text}>PHONE NUMBER</p>
          <Image
            src={'/assets/svgs/sort.svg'}
            alt="sort"
            width={16}
            height={16}
          />
        </div>
      );
    },
  },
  {
    id: 'space-4',
    cell: () => {
      return <div className={styles.space} />;
    },
  },
  {
    accessorKey: 'dateJoined',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={styles.header}
        >
          <p className={styles.header__text}>DATE JOINED</p>
          <Image
            src={'/assets/svgs/sort.svg'}
            alt="sort"
            width={16}
            height={16}
          />
        </div>
      );
    },
  },
  {
    id: 'space-5',
    cell: () => {
      return <div className={styles.space} />;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={styles.header}
        >
          <p className={styles.header__text}>STATUS</p>
          <Image
            src={'/assets/svgs/sort.svg'}
            alt="sort"
            width={16}
            height={16}
          />
        </div>
      );
    },
    cell: ({ cell: { getValue } }) => {
      const value = getValue() as string;

      return (
        <div className={styles.tableCellStatusWrapper}>
          <div
            className={(() => {
              return `${styles.tableCellStatus} ${
                value === 'Pending'
                  ? styles.pending
                  : value === 'Blacklisted'
                  ? styles.blacklisted
                  : value === 'Active'
                  ? styles.active
                  : ''
              }`;
            })()}
          >
            {value}
          </div>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

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
              <DropdownMenuItem className={styles.itemWrapper}>
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
                <p className={styles.dropdownText}>Blacklist User</p>
              </DropdownMenuItem>

              <DropdownMenuItem className={styles.itemWrapper}>
                <Image
                  src={'/assets/svgs/activate-user.svg'}
                  alt="activate"
                  width={16}
                  height={16}
                />
                <p className={styles.dropdownText}>Activate User</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
