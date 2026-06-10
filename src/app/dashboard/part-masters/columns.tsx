'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PartMaster } from '@/core/entities/PartMaster';

import { ActionCell } from './action-cell';

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
    accessorKey: 'serialNo',
    header: 'Serial No',
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue('serialNo') || '-'}</div>
    ),
  },
  {
    accessorKey: 'machineType',
    header: 'Machine Type',
    cell: ({ row }) => {
      const type = row.getValue('machineType') as string;
      return <div className="text-muted-foreground">{type ? type.replace('_', ' ') : '-'}</div>;
    },
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
