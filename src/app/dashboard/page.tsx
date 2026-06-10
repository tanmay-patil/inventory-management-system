import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/core/entities/User';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getPartMasters } from '@/app/actions/partMasterActions';
import { getInventoryItems } from '@/app/actions/inventoryActions';
import { ItemStatus } from '@/core/entities/InventoryItem';
import { OnboardingWizard } from './onboarding-wizard';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;
  const session = await decrypt(sessionValue);

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user as User;

  // Fetch actual data
  const catalogParts = await getPartMasters();
  const inventoryItems = await getInventoryItems();

  const totalCatalog = catalogParts.length;
  const totalInventory = inventoryItems.length;

  const inStockCount = inventoryItems.filter((i) => i.status === ItemStatus.IN_STOCK).length;
  const defectiveCount = inventoryItems.filter((i) => i.status === ItemStatus.DEFECTIVE).length;
  const inRepairCount = inventoryItems.filter((i) => i.status === ItemStatus.IN_REPAIR).length;
  const needsAttentionCount = defectiveCount + inRepairCount;

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, <span className="font-semibold text-primary">{user.name}</span>. Here is the
          current state of your inventory.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/dashboard/part-masters"
          className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        >
          <Card className="shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-full active:scale-[0.98]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Catalog Parts
              </CardTitle>
              <i className="fi fi-rr-box-open text-muted-foreground text-lg mt-0.5"></i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalCatalog}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered unique parts</p>
            </CardContent>
          </Card>
        </Link>

        <Link
          href="/dashboard/inventory"
          className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        >
          <Card className="shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-full active:scale-[0.98]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Inventory</CardTitle>
              <i className="fi fi-rr-boxes text-muted-foreground text-lg mt-0.5"></i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalInventory}</div>
              <p className="text-xs text-muted-foreground mt-1">Total inventory items</p>
            </CardContent>
          </Card>
        </Link>

        <Link
          href="/dashboard/inventory"
          className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        >
          <Card className="shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-full active:scale-[0.98]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Stock (Ready)
              </CardTitle>
              <i className="fi fi-rr-check-circle text-green-500 text-lg mt-0.5"></i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{inStockCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Available for use</p>
            </CardContent>
          </Card>
        </Link>

        <Link
          href="/dashboard/inventory"
          className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        >
          <Card className="shadow-sm border-amber-200 dark:border-amber-900/50 hover:shadow-md hover:border-amber-400 dark:hover:border-amber-700 transition-all cursor-pointer h-full active:scale-[0.98]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Needs Attention
              </CardTitle>
              <i className="fi fi-rr-triangle-warning text-amber-500 text-lg mt-0.5"></i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                {needsAttentionCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Defective or in repair</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {totalCatalog === 0 && totalInventory === 0 && <OnboardingWizard />}
    </div>
  );
}
