'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { InventoryItem, ItemStatus } from '@/core/entities/InventoryItem';

import { ActionCell } from './action-cell';

const StatusCell = ({ row }: { row: Row<InventoryItem> }) => {
  const item = row.original;

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border-0 ${
        item.status === ItemStatus.IN_STOCK
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
          : item.status === ItemStatus.IN_USE
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            : item.status === ItemStatus.DEFECTIVE
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      }`}
    >
      {item.status.replace('_', ' ')}
    </div>
  );
};

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: 'partName',
    header: 'Part Details',
    cell: ({ row }) => <div className="font-medium">{row.getValue('partName')}</div>,
  },
  {
    accessorKey: 'serialNumber',
    header: 'Serial Number',
    cell: ({ row }) => row.getValue('serialNumber') || '-',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    accessorKey: 'locationId',
    header: 'Location',
    cell: ({ row }) => row.getValue('locationId') || 'Unassigned',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
