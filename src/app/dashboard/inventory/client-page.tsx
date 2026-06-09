'use client';

import { useActionState, useState } from 'react';
import { InventoryItem } from '@/core/entities/InventoryItem';
import { PartMaster } from '@/core/entities/PartMaster';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { addInventoryItem } from '@/app/actions/inventoryActions';

interface InventoryClientProps {
  initialData: InventoryItem[];
  partMasters: PartMaster[];
}

type FormState = { success?: boolean; error?: string } | null;

export function InventoryClient({ initialData, partMasters }: InventoryClientProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) => {
      try {
        await addInventoryItem(formData);
        setIsAdding(false);
        return { success: true };
      } catch (e: unknown) {
        return { error: e instanceof Error ? e.message : 'An error occurred' };
      }
    },
    null
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Current Stock</h2>
        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? 'outline' : 'default'}>
          {isAdding ? (
            'Cancel'
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" /> Receive Stock
            </>
          )}
        </Button>
      </div>

      {isAdding && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Receive New Inventory</h3>
          <form action={formAction} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="partMasterId">Part Master (Catalog)</Label>
                <select
                  id="partMasterId"
                  name="partMasterId"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a part...</option>
                  {partMasters.map((pm) => (
                    <option key={pm.id} value={pm.id}>
                      {pm.partNumber} - {pm.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="serialNumber">Serial Number (Optional)</Label>
                <Input id="serialNumber" name="serialNumber" placeholder="e.g. SN-12345" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Initial Status</Label>
                <select
                  id="status"
                  name="status"
                  required
                  defaultValue="IN_STOCK"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="IN_STOCK">In Stock</option>
                  <option value="IN_USE">In Use</option>
                  <option value="DEFECTIVE">Defective</option>
                  <option value="IN_REPAIR">In Repair</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="locationId">Storage Location</Label>
                <Input id="locationId" name="locationId" placeholder="e.g. Main Warehouse" />
              </div>
            </div>
            {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
            <div className="flex justify-end mt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Add to Stock'}
              </Button>
            </div>
          </form>
        </div>
      )}

      <DataTable columns={columns} data={initialData} />
    </div>
  );
}
