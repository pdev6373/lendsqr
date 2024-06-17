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
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              {/* <Button variant="ghost" className="h-8 w-8 p-0"> */}
              <span className="sr-only">Open menu</span>
              <Image
                src={'/assets/svgs/more.svg'}
                alt="more"
                width={20}
                height={20}
              />
            </div>
            {/* </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
