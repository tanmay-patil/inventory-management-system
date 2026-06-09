import { ReactNode } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { logoutAction } from './actions';
import { MobileNav } from './mobile-nav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <header className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <i className="fi fi-rr-chart-line-up absolute inset-0 flex items-center justify-center text-[1.15rem] translate-y-[2px]"></i>
              </div>
              <span className="font-semibold text-foreground tracking-tight hidden sm:inline-block">
                IMS Portal
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
              >
                <i className="fi fi-rr-apps text-base translate-y-px"></i> Overview
              </Link>
              <Link
                href="/dashboard/part-masters"
                className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
              >
                <i className="fi fi-rr-box-open text-base translate-y-px"></i> Catalog
              </Link>
              <Link
                href="/dashboard/inventory"
                className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
              >
                <i className="fi fi-rr-boxes text-base translate-y-px"></i> Inventory
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <form action={logoutAction}>
                <Button
                  variant="ghost"
                  type="submit"
                  className="text-muted-foreground hover:text-foreground gap-2"
                >
                  <i className="fi fi-rr-sign-out-alt text-[1.15rem] translate-y-px"></i>
                  Logout
                </Button>
              </form>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
