'use client';

import { useState, useTransition } from 'react';
import { Row } from '@tanstack/react-table';
import { InventoryItem, ItemStatus } from '@/core/entities/InventoryItem';
import { deleteInventoryItem, updateInventoryItem } from '@/app/actions/inventoryActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

export const ActionCell = ({ row }: { row: Row<InventoryItem> }) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editForm, setEditForm] = useState({
    serialNumber: row.original.serialNumber || '',
    status: row.original.status,
    locationId: row.original.locationId || '',
  });

  const handleSave = () => {
    startTransition(() => {
      updateInventoryItem(row.original.id, editForm);
      setIsEditing(false);
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isPending}
          className="text-blue-500 hover:text-blue-700 disabled:opacity-50 transition-colors p-2 cursor-pointer"
          title="Edit Item"
        >
          <i className="fi fi-rr-pencil text-lg"></i>
        </button>
        <button
          onClick={() => setIsDeleting(true)}
          disabled={isPending}
          className="text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors p-2 cursor-pointer"
          title="Delete Item"
        >
          <i className="fi fi-rr-trash text-lg"></i>
        </button>
      </div>

      <ConfirmDialog
        isOpen={isDeleting}
        title="Delete Inventory Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        onCancel={() => setIsDeleting(false)}
        onConfirm={() => {
          startTransition(() => {
            deleteInventoryItem(row.original.id);
            setIsDeleting(false);
          });
        }}
        isDestructive={true}
        isPending={isPending}
      />

      {isEditing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md rounded-xl shadow-lg border border-border p-6 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <i className="fi fi-rr-cross"></i>
            </button>
            <h3 className="text-lg font-semibold mb-6 text-left">Edit Inventory Item</h3>
            <div className="flex flex-col gap-4 text-left">
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  value={editForm.serialNumber}
                  onChange={(e) => setEditForm({ ...editForm, serialNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <Label htmlFor="status">Status</Label>
                <div className="relative">
                  <select
                    id="status"
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value as ItemStatus })
                    }
                    className="appearance-none flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value={ItemStatus.IN_STOCK}>In Stock</option>
                    <option value={ItemStatus.IN_USE}>In Use</option>
                    <option value={ItemStatus.DEFECTIVE}>Defective</option>
                    <option value={ItemStatus.IN_REPAIR}>In Repair</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                    <i className="fi fi-rr-angle-small-down mt-1"></i>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="locationId">Location</Label>
                <Input
                  id="locationId"
                  value={editForm.locationId}
                  onChange={(e) => setEditForm({ ...editForm, locationId: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isPending}>
                  {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
