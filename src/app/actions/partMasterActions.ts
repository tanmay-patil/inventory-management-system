'use server';

import { revalidatePath } from 'next/cache';
import { JsonDatabase } from '@/core/db/JsonDatabase';
import { PartMasterRepository } from '@/core/repositories/PartMasterRepository';
import { PartMaster, MachineType } from '@/core/entities/PartMaster';
import crypto from 'crypto';

// Dependency injection instantiation for the Server Actions
const db = new JsonDatabase();
const repo = new PartMasterRepository(db);

export async function getPartMasters(): Promise<PartMaster[]> {
  return repo.findAll();
}

export async function addPartMaster(formData: FormData) {
  const name = formData.get('name') as string;
  const partNumber = formData.get('partNumber') as string;
  const description = formData.get('description') as string | null;
  const serialNo = formData.get('serialNo') as string | null;
  const machineType = formData.get('machineType') as MachineType | null;

  if (!name || !partNumber) {
    throw new Error('Name and Part Number are required');
  }

  const newItem: PartMaster = {
    id: crypto.randomUUID(),
    name,
    partNumber,
    serialNo: serialNo || undefined,
    machineType: machineType || undefined,
    description: description || undefined,
  };

  await repo.create(newItem);
  revalidatePath('/dashboard/part-masters');
}

export async function deletePartMaster(id: string) {
  await repo.delete(id);
  revalidatePath('/dashboard/part-masters');
}

export async function updatePartMaster(id: string, updates: Partial<PartMaster>) {
  await repo.update(id, updates);
  revalidatePath('/dashboard/part-masters');
}
