'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full w-9 h-9 relative"
    >
      <i className="fi fi-rr-sun absolute inset-0 flex items-center justify-center text-[1.15rem] translate-y-px rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"></i>
      <i className="fi fi-rr-moon absolute inset-0 flex items-center justify-center text-[1.15rem] translate-y-px rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"></i>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
