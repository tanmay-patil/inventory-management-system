'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { InventoryItem } from '@/core/entities/InventoryItem';

import { Trash2 } from 'lucide-react';
import { deleteInventoryItem, updateInventoryItem } from '@/app/actions/inventoryActions';
import { useTransition } from 'react';
import { ItemStatus } from '@/core/entities/InventoryItem';

const StatusCell = ({ row }: { row: Row<InventoryItem> }) => {
  const [isPending, startTransition] = useTransition();
  const item = row.original;

  return (
    <select
      value={item.status}
      disabled={isPending}
      onChange={(e) => {
        startTransition(() => {
          updateInventoryItem(item.id, { status: e.target.value as ItemStatus });
        });
      }}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold appearance-none cursor-pointer border-0 ${
        item.status === 'IN_STOCK'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
          : item.status === 'IN_USE'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            : item.status === 'DEFECTIVE'
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      }`}
    >
      <option value="IN_STOCK">IN STOCK</option>
      <option value="IN_USE">IN USE</option>
      <option value="DEFECTIVE">DEFECTIVE</option>
      <option value="IN_REPAIR">IN REPAIR</option>
    </select>
  );
};

const ActionCell = ({ row }: { row: Row<InventoryItem> }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          startTransition(() => {
            deleteInventoryItem(row.original.id);
          });
        }
      }}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors p-2"
      title="Delete Item"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
};

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: 'id',
    header: 'Inventory ID',
    cell: ({ row }) => <div className="text-muted-foreground text-xs">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'partMasterId',
    header: 'Part Master ID',
    cell: ({ row }) => <div className="font-medium">{row.getValue('partMasterId')}</div>,
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
