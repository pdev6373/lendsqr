'use client';
import styles from './DataTable.module.scss';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MainContext, UserOverviewType } from '@/context/MainContext';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<UserOverviewType, TValue>[];
  data: UserOverviewType[];
}

const pageSizeOptions = [20, 40, 60, 80, 100];

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [organization, setOrganization] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState<Date>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState<string>();
  const [showFilter, setShowFilter] = useState(false);
  const { organizations, search, setSearchValue } = useContext(MainContext);
  const [tableData, setTableData] = useState<UserOverviewType[]>(data);

  useEffect(() => {
    resetHandler();

    setTableData(
      data?.filter(
        (user) =>
          user.organization
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim()) ||
          user.username
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim()) ||
          user.email
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim()) ||
          user.phoneNumber
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim()) ||
          (user.dateJoined as string)
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim()) ||
          user.status
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim()),
      ),
    );
  }, [search]);

  const filterHandler = () => {
    setSearchValue('');
    if (!organization && !user && !email && !date && !phoneNumber && !status) {
      resetHandler();
      return;
    }

    setTableData(
      (data as UserOverviewType[]).filter(
        (data) =>
          (organization &&
            data.organization.toLowerCase().trim() ===
              organization?.toLowerCase()?.trim()) ||
          (user &&
            data.username
              .toLowerCase()
              .trim()
              .includes(user?.toLowerCase()?.trim())) ||
          (email &&
            data.email
              .toLowerCase()
              .trim()
              .includes(email?.toLowerCase()?.trim())) ||
          (date &&
            format(new Date(data.dateJoined as string), 'MMM dd, yyyy')
              .toLowerCase()
              .trim()
              .includes(format(date, 'MMM dd, yyyy')?.toLowerCase()?.trim())) ||
          (phoneNumber &&
            data.phoneNumber
              .toLowerCase()
              .trim()
              .includes(phoneNumber?.toLowerCase()?.trim())) ||
          (status &&
            data.status.toLowerCase().trim() === status?.toLowerCase()?.trim()),
      ),
    );
    setShowFilter(false);
  };

  const resetHandler = () => {
    setTableData(data);
    setOrganization('');
    setUser('');
    setEmail('');
    setDate(undefined);
    setPhoneNumber('');
    setStatus(undefined);
    setShowFilter(false);
  };

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
  });

  return (
    <div
      className={`${styles.wrapper} ${showFilter ? styles.wrapperOpen : ''}`}
    >
      {showFilter ? (
        <>
          <div
            className={styles.overlayTop}
            onClick={() => setShowFilter(false)}
          />
          <div
            className={styles.overlay}
            onClick={() => setShowFilter(false)}
          />
        </>
      ) : (
        <></>
      )}

      <div
        className={`${styles.filters} ${showFilter ? styles.filtersOpen : ''}`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            filterHandler();
          }}
          className={styles.filters__inner}
        >
          <div className={styles.filters__inner__items}>
            <p className={styles.filters__inner__items__title}>Organization</p>
            <Select
              value={organization}
              onValueChange={(value) => {
                setOrganization(value);
              }}
            >
              <SelectTrigger
                className={styles.filters__inner__items__organization}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <ScrollArea className={styles.scrollArea}>
                    {organizations?.map((organization, index) => (
                      <SelectItem
                        key={index}
                        value={organization}
                        className={
                          styles.filters__inner__items__organization__text
                        }
                      >
                        {organization}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className={styles.filters__inner__items}>
            <p className={styles.filters__inner__items__title}>Username</p>
            <input
              placeholder="User"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className={styles.filters__inner__items__input}
            />
          </div>

          <div className={styles.filters__inner__items}>
            <p className={styles.filters__inner__items__title}>Email</p>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.filters__inner__items__input}
            />
          </div>

          <div className={styles.filters__inner__items}>
            <p className={styles.filters__inner__items__title}>Date</p>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={`${styles.filters__inner__items__organization} ${styles.filters__inner__items__date}`}
                >
                  {date ? format(date, 'PPP') : 'Date'}
                  <Image
                    src={'/assets/svgs/calendar.svg'}
                    alt="calendar"
                    width={16}
                    height={16}
                  />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className={styles.filters__inner__items}>
            <p className={styles.filters__inner__items__title}>Phone Number</p>
            <input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={styles.filters__inner__items__input}
            />
          </div>

          <div className={styles.filters__inner__items}>
            <p className={styles.filters__inner__items__title}>Status</p>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger
                className={styles.filters__inner__items__organization}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    value="Active"
                    className={styles.filters__inner__items__organization__text}
                  >
                    Active
                  </SelectItem>
                  <SelectItem
                    value="Inactive"
                    className={styles.filters__inner__items__organization__text}
                  >
                    Inactive
                  </SelectItem>
                  <SelectItem
                    value="Pending"
                    className={styles.filters__inner__items__organization__text}
                  >
                    Pending
                  </SelectItem>
                  <SelectItem
                    value="Blacklisted"
                    className={styles.filters__inner__items__organization__text}
                  >
                    Blacklisted
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.actions__reset}
              onClick={resetHandler}
              type="button"
            >
              Reset
            </button>
            <button
              className={styles.actions__filter}
              type="submit"
              onClick={filterHandler}
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      <div className={styles.table}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={styles.table__header__row}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={styles.table__header__row__cell}
                      onClick={() => setShowFilter((prev) => !prev)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={styles.table__body__row__cell}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={styles.table__empty}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottom__input}>
          <p
            className={`${styles.bottom__input__text} ${styles.bottom__input__showingText}`}
          >
            Showing
          </p>

          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className={styles.bottom__input__trigger}>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  <p className={styles.bottom__input__size}>{pageSize}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p className={styles.bottom__input__text}>
            {`out of ${table.getRowCount()}`}
          </p>
        </div>

        <div className={styles.controls}>
          {table.getPageCount() > 1 ? (
            <Image
              src={
                table.getCanPreviousPage()
                  ? '/assets/svgs/prev-active.svg'
                  : '/assets/svgs/prev-inactive.svg'
              }
              alt="previous"
              width={24}
              height={24}
              onClick={() => table.getCanPreviousPage() && table.previousPage()}
              className={`${styles.controls__control} ${
                table.getCanPreviousPage() ? '' : styles.notAllowed
              }`}
            />
          ) : (
            <></>
          )}

          {table.getPageCount() < 3 ? (
            <></>
          ) : (
            <div className={styles.pagination}>
              {(() => {
                const currentPage = () =>
                  table.getState().pagination.pageIndex + 1;

                return (
                  <>
                    <p
                      className={`${styles.pagination__number} ${
                        currentPage() === 1 ? styles.pagination__active : ''
                      }`}
                      onClick={() => table.setPageIndex(0)}
                    >
                      1
                    </p>
                    <p
                      className={`${styles.pagination__number} ${
                        currentPage() === 2 ? styles.pagination__active : ''
                      }`}
                      onClick={() => table.setPageIndex(1)}
                    >
                      2
                    </p>
                    <p
                      className={`${styles.pagination__number} ${
                        currentPage() === 3 ? styles.pagination__active : ''
                      }`}
                      onClick={() => table.setPageIndex(2)}
                    >
                      3
                    </p>

                    {table.getPageCount() > 5 ? (
                      <>
                        <p
                          className={`${styles.pagination__number}`}
                          style={{ cursor: 'not-allowed' }}
                        >
                          ...
                        </p>

                        <p
                          className={`${styles.pagination__number} ${
                            currentPage() === table.getPageCount() - 1
                              ? styles.pagination__active
                              : ''
                          }`}
                          onClick={() =>
                            table.setPageIndex(table.getPageCount() - 2)
                          }
                        >
                          {table.getPageCount() - 1}
                        </p>
                        <p
                          className={`${styles.pagination__number} ${
                            currentPage() === table.getPageCount()
                              ? styles.pagination__active
                              : ''
                          }`}
                          onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                          }
                        >
                          {table.getPageCount()}
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {table.getPageCount() > 1 ? (
            <Image
              src={
                table.getCanNextPage()
                  ? '/assets/svgs/next-active.svg'
                  : '/assets/svgs/next-inactive.svg'
              }
              alt="next"
              width={24}
              height={24}
              onClick={() => table.getCanNextPage() && table.nextPage()}
              className={`${styles.controls__control} ${
                table.getCanNextPage() ? '' : styles.notAllowed
              }`}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
