import { getPartMasters } from '@/app/actions/partMasterActions';
import { PartMastersClient } from './client-page';

export const metadata = {
  title: 'Part Masters | IMS',
};

export default async function PartMastersPage() {
  const data = await getPartMasters();

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Part Masters</h1>
        <p className="text-muted-foreground">
          Manage the central catalog of all MRI and CT spare parts.
        </p>
      </div>

      <PartMastersClient initialData={data} />
    </div>
  );
}
