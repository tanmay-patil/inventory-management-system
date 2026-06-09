'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Activity } from 'lucide-react';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 md:p-8">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">IMS Portal</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign In</CardTitle>
            <CardDescription>Use your assigned role credentials to proceed.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="admin, manager, or engineer"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>

              {state?.error && (
                <div className="text-sm font-medium text-destructive">{state.error}</div>
              )}

              <Button type="submit" className="w-full mt-2" disabled={isPending}>
                {isPending ? 'Authenticating...' : 'Login'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground border-t border-border pt-4">
            <div className="flex flex-col gap-1 text-xs">
              <p>Admin: admin / Admin@IMS</p>
              <p>Manager: manager / Manager@IMS</p>
              <p>Engineer: engineer / Engineer@IMS</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
