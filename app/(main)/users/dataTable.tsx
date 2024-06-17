'use client';
import styles from './dataTable.module.scss';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Image from 'next/image';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const pageSizeOptions = [20, 40, 60, 80, 100];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className={styles.wrapper}>
      <div
      // className="flex items-center py-4"
      >
        <input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          // className="max-w-sm"
        />
      </div>

      <div className={styles.table}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>
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
                <TableCell colSpan={columns.length} className={styles.noResult}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className={styles.bottom}>
        <div className={styles.inputWrapper}>
          <p className={styles.bottom__left__text}>
            {`Showing ${
              table.getState().pagination.pageIndex + 1
            } out of ${table.getPageCount()}`}
          </p>

          <Select
            value={`${
              table.getState().pagination.pageSize || pageSizeOptions[0]
            }`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className={styles.trigger}>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  <p className={styles.pageSize}>{pageSize}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={styles.controls}>
          <Image
            src={
              table.getCanPreviousPage()
                ? '/assets/svgs/prev.svg'
                : '/assets/svgs/prev-inactive.svg'
            }
            alt="previous"
            width={24}
            height={24}
            onClick={() => table.getCanPreviousPage() && table.previousPage()}
            className={styles.control}
          />

          {Array(table.getPageCount()).map((page, index) => (
            <p key={index} onClick={() => table.setPageIndex(index)}>
              {index + 1}
            </p>
          ))}

          <Image
            src={
              table.getCanNextPage()
                ? '/assets/svgs/next.svg'
                : '/assets/svgs/next-inactive.svg'
            }
            alt="next"
            width={24}
            height={24}
            onClick={() => table.getCanNextPage() && table.nextPage()}
            className={styles.control}
          />
        </div>
      </div>
    </div>
  );
}
