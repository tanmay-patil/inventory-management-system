'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { logoutAction } from './actions';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 relative"
      >
        {isOpen ? (
          <i className="fi fi-rr-cross absolute inset-0 flex items-center justify-center text-[1.15rem] translate-y-px"></i>
        ) : (
          <i className="fi fi-rr-menu-burger absolute inset-0 flex items-center justify-center text-[1.15rem] translate-y-px"></i>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Fullscreen Backdrop */}
          <div
            className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-background/60 backdrop-blur-sm animate-in fade-in"
            onClick={closeMenu}
          />

          {/* Dropdown Menu */}
          <div className="absolute top-16 left-0 w-full bg-background border-b border-border shadow-2xl z-50 flex flex-col p-4 gap-6 animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-5 text-base font-medium">
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="text-foreground transition-colors hover:text-primary flex items-center gap-3"
              >
                <i className="fi fi-rr-apps text-[1.15rem] translate-y-px text-muted-foreground"></i>{' '}
                Overview
              </Link>
              <Link
                href="/dashboard/part-masters"
                onClick={closeMenu}
                className="text-foreground transition-colors hover:text-primary flex items-center gap-3"
              >
                <i className="fi fi-rr-box-open text-[1.15rem] translate-y-px text-muted-foreground"></i>{' '}
                Catalog
              </Link>
              <Link
                href="/dashboard/inventory"
                onClick={closeMenu}
                className="text-foreground transition-colors hover:text-primary flex items-center gap-3"
              >
                <i className="fi fi-rr-boxes text-[1.15rem] translate-y-px text-muted-foreground"></i>{' '}
                Inventory
              </Link>
            </nav>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <ThemeToggle />
              <form action={logoutAction}>
                <Button
                  variant="ghost"
                  type="submit"
                  className="text-muted-foreground hover:text-foreground gap-2"
                  onClick={closeMenu}
                >
                  <i className="fi fi-rr-sign-out-alt text-[1.15rem] translate-y-px"></i>
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
