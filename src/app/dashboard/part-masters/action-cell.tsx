'use client';

import { useState, useTransition } from 'react';
import { Row } from '@tanstack/react-table';
import { PartMaster, MachineType } from '@/core/entities/PartMaster';
import { deletePartMaster, updatePartMaster } from '@/app/actions/partMasterActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

export const ActionCell = ({ row }: { row: Row<PartMaster> }) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editForm, setEditForm] = useState(row.original);

  const handleSave = () => {
    startTransition(() => {
      updatePartMaster(row.original.id, editForm);
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
          title="Edit Part Master"
        >
          <i className="fi fi-rr-pencil text-lg"></i>
        </button>
        <button
          onClick={() => setIsDeleting(true)}
          disabled={isPending}
          className="text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors p-2 cursor-pointer"
          title="Delete Part Master"
        >
          <i className="fi fi-rr-trash text-lg"></i>
        </button>
      </div>

      <ConfirmDialog
        isOpen={isDeleting}
        title="Delete Part Master"
        description="Are you sure you want to delete this part master? This might affect linked inventory and cannot be undone."
        confirmText="Delete"
        onCancel={() => setIsDeleting(false)}
        onConfirm={() => {
          startTransition(() => {
            deletePartMaster(row.original.id);
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
            <h3 className="text-lg font-semibold mb-6">Edit Part Master</h3>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="partNumber">Part Number</Label>
                <Input
                  id="partNumber"
                  value={editForm.partNumber}
                  onChange={(e) => setEditForm({ ...editForm, partNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Part Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serialNo">Serial No (Prefix)</Label>
                <Input
                  id="serialNo"
                  value={editForm.serialNo || ''}
                  onChange={(e) => setEditForm({ ...editForm, serialNo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="machineType">Used in (MRI/CT)</Label>
                <select
                  id="machineType"
                  value={editForm.machineType || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm, machineType: e.target.value as MachineType })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select Machine Type</option>
                  <option value={MachineType.MRI}>MRI</option>
                  <option value={MachineType.CT}>CT</option>
                  <option value={MachineType.GENERAL}>General / Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
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
