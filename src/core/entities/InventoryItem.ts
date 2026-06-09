export enum ItemStatus {
  IN_STOCK = 'IN_STOCK',
  IN_USE = 'IN_USE',
  DEFECTIVE = 'DEFECTIVE',
  IN_REPAIR = 'IN_REPAIR',
}

export interface InventoryItem {
  id: string;
  partMasterId: string;
  serialNumber?: string;
  status: ItemStatus;
  locationId?: string;
}
