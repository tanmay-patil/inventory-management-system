'use client';

import { useState, useTransition } from 'react';
import { Row } from '@tanstack/react-table';
import { InventoryItem, ItemStatus } from '@/core/entities/InventoryItem';
import { deleteInventoryItem, updateInventoryItem } from '@/app/actions/inventoryActions';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { EditModal } from './edit-modal';

export const ActionCell = ({ row }: { row: Row<InventoryItem> }) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editForm, setEditForm] = useState({
    serialNumber: row.original.serialNumber || '',
    status: row.original.status,
    locationId: row.original.locationId || '',
    issuedBy: row.original.issuedBy || '',
    issuedTo: row.original.issuedTo || '',
    siteLocation: row.original.siteLocation || '',
  });

  const handleReturnToManager = () => {
    startTransition(() => {
      updateInventoryItem(row.original.id, {
        status: ItemStatus.IN_STOCK,
        issuedTo: undefined,
        siteLocation: undefined,
      });
      setIsEditing(false);
    });
  };

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
        <EditModal
          editForm={editForm}
          setEditForm={setEditForm}
          isPending={isPending}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
          onReturnToManager={handleReturnToManager}
        />
      )}
    </>
  );
};
