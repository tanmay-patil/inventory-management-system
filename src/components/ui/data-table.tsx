'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
      <div className="w-full">
        <table className="w-full text-sm flex flex-col md:table">
          <thead className="hidden md:table-header-group">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border bg-muted/20">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="h-10 px-4 text-left align-middle font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="flex flex-col md:table-row-group">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="flex flex-col border-b border-border p-4 gap-2 md:gap-0 md:p-0 md:table-row transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="flex flex-row items-center justify-between py-1 md:py-4 md:px-4 md:table-cell md:justify-start"
                    >
                      <span className="md:hidden font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        {typeof cell.column.columnDef.header === 'string'
                          ? cell.column.columnDef.header
                          : cell.column.id}
                      </span>
                      <div className="text-right md:text-left flex items-center justify-end md:justify-start">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="flex flex-col md:table-row">
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground flex items-center justify-center md:table-cell"
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between space-x-2 py-4 px-4 border-t border-border bg-muted/10">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </div>
          <div className="space-x-2 flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
