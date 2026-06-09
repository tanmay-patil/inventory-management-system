export type ItemStatus = 'IN_STOCK' | 'IN_USE' | 'DEFECTIVE' | 'IN_REPAIR';

export interface InventoryItem {
  id: string;
  partMasterId: string;
  serialNumber?: string;
  status: ItemStatus;
  locationId?: string;
}
