'use client';
import styles from './Columns.module.scss';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { UserOverviewType } from '@/context/MainContext';
import { Actions } from '@/components/index';

export const columns: ColumnDef<UserOverviewType>[] = [
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
    cell: ({ row }) => <Actions row={row} />,
  },
];
