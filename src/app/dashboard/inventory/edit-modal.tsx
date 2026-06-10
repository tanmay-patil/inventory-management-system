'use client';

import { ItemStatus } from '@/core/entities/InventoryItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditModalProps {
  editForm: {
    serialNumber: string;
    status: ItemStatus;
    locationId: string;
    issuedBy: string;
    issuedTo: string;
    siteLocation: string;
  };
  setEditForm: (form: {
    serialNumber: string;
    status: ItemStatus;
    locationId: string;
    issuedBy: string;
    issuedTo: string;
    siteLocation: string;
  }) => void;
  isPending: boolean;
  onClose: () => void;
  onSave: () => void;
  onReturnToManager: () => void;
}

export const EditModal = ({
  editForm,
  setEditForm,
  isPending,
  onClose,
  onSave,
  onReturnToManager,
}: EditModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-md rounded-xl shadow-lg border border-border p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
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
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value as ItemStatus })}
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
            <Label htmlFor="locationId">Current Location</Label>
            <Input
              id="locationId"
              value={editForm.locationId}
              onChange={(e) => setEditForm({ ...editForm, locationId: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issuedBy">Issued By</Label>
            <Input
              id="issuedBy"
              value={editForm.issuedBy}
              onChange={(e) => setEditForm({ ...editForm, issuedBy: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issuedTo">Issued To (Engineer)</Label>
            <Input
              id="issuedTo"
              value={editForm.issuedTo}
              onChange={(e) => setEditForm({ ...editForm, issuedTo: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteLocation">Site Location</Label>
            <Input
              id="siteLocation"
              value={editForm.siteLocation}
              onChange={(e) => setEditForm({ ...editForm, siteLocation: e.target.value })}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="secondary"
              onClick={onReturnToManager}
              disabled={isPending}
              type="button"
            >
              <i className="fi fi-rr-undo mr-2 translate-y-px"></i> Return
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onSave} disabled={isPending}>
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
