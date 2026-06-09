import { getInventoryItems } from '@/app/actions/inventoryActions';
import { getPartMasters } from '@/app/actions/partMasterActions';
import { InventoryClient } from './client-page';

export const metadata = {
  title: 'Inventory Stock | IMS',
};

export default async function InventoryPage() {
  const [inventoryItems, partMasters] = await Promise.all([getInventoryItems(), getPartMasters()]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Physical Inventory</h1>
        <p className="text-muted-foreground">
          Manage physical stock, locations, and status of parts.
        </p>
      </div>

      <InventoryClient initialData={inventoryItems} partMasters={partMasters} />
    </div>
  );
}
