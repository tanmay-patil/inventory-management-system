'use server';

import { revalidatePath } from 'next/cache';
import { JsonDatabase } from '@/core/db/JsonDatabase';
import { InventoryRepository } from '@/core/repositories/InventoryRepository';
import { InventoryItem, ItemStatus } from '@/core/entities/InventoryItem';
import crypto from 'crypto';

// Dependency injection instantiation for the Server Actions
const db = new JsonDatabase();
const repo = new InventoryRepository(db);

export async function getInventoryItems(): Promise<InventoryItem[]> {
  return repo.findAll();
}

export async function addInventoryItem(formData: FormData) {
  const partMasterId = formData.get('partMasterId') as string;
  const serialNumber = formData.get('serialNumber') as string | null;
  const status = (formData.get('status') as ItemStatus) || ItemStatus.IN_STOCK;
  const locationId = formData.get('locationId') as string | null;
  const issuedBy = formData.get('issuedBy') as string | null;
  const issuedTo = formData.get('issuedTo') as string | null;
  const dateAdded = (formData.get('dateAdded') as string) || new Date().toISOString();
  const siteLocation = formData.get('siteLocation') as string | null;

  if (!partMasterId) {
    throw new Error('Part Master is required');
  }

  const newItem: InventoryItem = {
    id: crypto.randomUUID(),
    partMasterId,
    serialNumber: serialNumber || undefined,
    status,
    locationId: locationId || undefined,
    issuedBy: issuedBy || undefined,
    issuedTo: issuedTo || undefined,
    dateAdded,
    siteLocation: siteLocation || undefined,
  };

  await repo.create(newItem);
  revalidatePath('/dashboard', 'layout');
}

export async function deleteInventoryItem(id: string) {
  await repo.delete(id);
  revalidatePath('/dashboard', 'layout');
}

export async function updateInventoryItem(id: string, updates: Partial<InventoryItem>) {
  await repo.update(id, updates);
  revalidatePath('/dashboard', 'layout');
}
