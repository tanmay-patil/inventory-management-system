'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { PartMaster } from '@/core/entities/PartMaster';

import { Trash2 } from 'lucide-react';
import { deletePartMaster } from '@/app/actions/partMasterActions';
import { useTransition } from 'react';

const ActionCell = ({ row }: { row: Row<PartMaster> }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (
          confirm(
            'Are you sure you want to delete this part master? This might affect linked inventory.'
          )
        ) {
          startTransition(() => {
            deletePartMaster(row.original.id);
          });
        }
      }}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors p-2"
      title="Delete Part Master"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
};

export const columns: ColumnDef<PartMaster>[] = [
  {
    accessorKey: 'partNumber',
    header: 'Part Number',
    cell: ({ row }) => <div className="font-medium">{row.getValue('partNumber')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Part Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      return (
        <div className="text-muted-foreground truncate max-w-[200px]">{description || '-'}</div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
