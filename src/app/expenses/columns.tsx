'use client';

import { Button } from '@/components/ui/button';
import { Expense } from '@/types/Expense';
import { formatCurrency } from '@/utils/expenseUtils';
import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

const renderHeader = ({
  column,
  name,
}: {
  name: string;
  column: Column<Expense>;
}) => (
  <div>
    {name}
    <Button
      variant="ghost"
      size={'sm'}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="ml-1"
    >
      <ArrowUpDown />
    </Button>
  </div>
);

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'atcud',
    header: ({ column }) => renderHeader({ name: 'ATCUD', column }),
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => renderHeader({ name: 'Amount', column }),
    cell: ({ row }) => formatCurrency(row.getValue('totalAmount')),
  },
  {
    accessorKey: 'totalTaxes',
    header: ({ column }) => renderHeader({ name: 'Total Taxes', column }),
    cell: ({ row }) => formatCurrency(row.getValue('totalTaxes')),
  },
  {
    id: 'taxesPercent',
    header: 'Taxes (%)',
    cell: ({ row }) =>
      `${(
        ((row.getValue('totalTaxes') as number) /
          (row.getValue('totalAmount') as number)) *
        100
      ).toFixed(2)}%`,
  },
  {
    accessorKey: 'merchantVatNumber',
    header: ({ column }) => renderHeader({ name: 'Merchant VAT', column }),
  },
  {
    accessorKey: 'documentDate',
    header: ({ column }) => renderHeader({ name: 'Date', column }),
    cell: ({ row }) =>
      moment(row.getValue('documentDate')).format('DD/MM/YYYY'),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <Link href={`/expenses/${expense._id}`}>
          <Button variant="outline" size={'sm'}>
            Details
          </Button>
        </Link>
      );
    },
  },
];
