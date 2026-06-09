import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/core/entities/User';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;
  const session = await decrypt(sessionValue);

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user as User;

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back, {user.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          You are currently logged in as a{' '}
          <span className="font-semibold text-primary">{user.role}</span>.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Active</div>
            <p className="text-xs text-muted-foreground mt-1">Verified via mock auth service</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Assigned Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground capitalize">
              {user.role.toLowerCase()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Phase 0 Role Assignment</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Session Expires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7 Days</div>
            <p className="text-xs text-muted-foreground mt-1">JWT valid for 7 days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
