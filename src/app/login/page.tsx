'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-[320px] flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Sign In</h1>
          <p className="text-sm text-muted-foreground/80 font-medium">IMS Portal</p>
        </div>

        <form action={formAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username" className="text-xs font-medium text-muted-foreground ml-1">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="admin, manager, or engineer"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-xs font-medium text-muted-foreground ml-1">
              Password
            </Label>
            <Input id="password" name="password" type="password" required placeholder="••••••••" />
          </div>

          {state?.error && (
            <div className="text-sm font-medium text-destructive text-center">{state.error}</div>
          )}

          <Button
            type="submit"
            className="h-11 w-full rounded-xl mt-4 font-medium transition-transform active:scale-[0.98]"
            disabled={isPending}
          >
            {isPending ? 'Authenticating...' : 'Continue'}
          </Button>
        </form>

        <div className="flex flex-col gap-1.5 text-center text-[11px] text-muted-foreground/60 mt-4">
          <p>Admin: admin / Admin@IMS</p>
          <p>Manager: manager / Manager@IMS</p>
          <p>Engineer: engineer / Engineer@IMS</p>
        </div>
      </div>
    </div>
  );
}
