'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export function OnboardingWizard() {
  return (
    <div className="mt-8 grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Step 1: Catalog Nudge */}
      <Card className="border-primary/20 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fi fi-rr-box-open text-8xl"></i>
        </div>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              1
            </span>
            <CardTitle className="text-xl">Create your first Catalog Part</CardTitle>
          </div>
          <CardDescription className="text-base">
            Before you can track physical inventory, you need to define what the part is. The{' '}
            <strong>Catalog</strong> acts as the master template (e.g., &quot;MRI Head Coil&quot;).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 p-4 mb-6 relative">
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
              <Link href="/dashboard/part-masters">
                <Button className="shadow-lg shadow-primary/20">
                  <i className="fi fi-rr-plus mr-2 translate-y-px"></i> Go to Catalog
                </Button>
              </Link>
            </div>

            {/* Placeholder Form UI */}
            <div className="space-y-4 opacity-50 select-none pointer-events-none">
              <div className="space-y-2">
                <Label>Part Name</Label>
                <Input placeholder="e.g. MRI Head Coil" disabled />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Part Number</Label>
                  <Input placeholder="e.g. COIL-100" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Used In</Label>
                  <Input placeholder="MRI" disabled />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Inventory Nudge */}
      <Card className="border-border shadow-sm relative overflow-hidden opacity-80">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <i className="fi fi-rr-boxes text-8xl"></i>
        </div>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground font-bold border border-border">
              2
            </span>
            <CardTitle className="text-xl text-muted-foreground">
              Receive Physical Inventory
            </CardTitle>
          </div>
          <CardDescription className="text-base">
            Once you have defined a part in the Catalog, you can start receiving actual physical
            units into your <strong>Inventory</strong>, each with its own unique serial number and
            location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-muted-foreground/20 bg-muted/10 p-4">
            {/* Placeholder Form UI */}
            <div className="space-y-4 opacity-30 select-none pointer-events-none">
              <div className="space-y-2">
                <Label>Select Catalog Part</Label>
                <Input placeholder="MRI Head Coil (COIL-100)" disabled />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Serial Number</Label>
                  <Input placeholder="e.g. SN-998877" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="e.g. Main Warehouse" disabled />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
