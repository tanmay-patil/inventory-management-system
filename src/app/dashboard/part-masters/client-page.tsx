'use client';

import { useActionState, useState } from 'react';
import { PartMaster } from '@/core/entities/PartMaster';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { addPartMaster } from '@/app/actions/partMasterActions';

interface PartMastersClientProps {
  initialData: PartMaster[];
}

type FormState = { success?: boolean; error?: string } | null;

export function PartMastersClient({ initialData }: PartMastersClientProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) => {
      try {
        await addPartMaster(formData);
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
        <h2 className="text-xl font-semibold">Catalog</h2>
        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? 'outline' : 'default'}>
          {isAdding ? (
            'Cancel'
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" /> Add Part
            </>
          )}
        </Button>
      </div>

      {isAdding && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Add New Part Master</h3>
          <form action={formAction} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="partNumber">Part Number</Label>
                <Input id="partNumber" name="partNumber" required placeholder="e.g. RF-COIL-100" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Part Name</Label>
                <Input id="name" name="name" required placeholder="e.g. MRI Head Coil" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input id="description" name="description" placeholder="Technical specs..." />
              </div>
            </div>
            {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
            <div className="flex justify-end mt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Part Master'}
              </Button>
            </div>
          </form>
        </div>
      )}

      <DataTable columns={columns} data={initialData} />
    </div>
  );
}
