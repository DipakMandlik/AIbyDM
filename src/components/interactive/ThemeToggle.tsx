import { useCallback, useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

type Theme = 'dark' | 'light' | 'system';

const STORAGE_KEY = 'aibydm-theme';

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const resolved = theme === 'system' ? getSystemTheme() : theme;
  const root = document.documentElement;

  if (resolved === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
  }
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light' || stored === 'system') {
    return stored;
  }
  return 'light';
}

const themeOrder: Theme[] = ['dark', 'light', 'system'];

const themeLabel: Record<Theme, string> = {
  dark: 'Dark mode',
  light: 'Light mode',
  system: 'System theme',
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getStoredTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [theme, mounted]);

  const cycleTheme = useCallback(() => {
    setTheme((current) => {
      const idx = themeOrder.indexOf(current);
      return themeOrder[(idx + 1) % themeOrder.length];
    });
  }, []);

  // Prevent hydration mismatch: render a placeholder until mounted
  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-secondary)]"
        aria-label="Toggle theme"
        disabled
      >
        <div className="h-[18px] w-[18px]" />
      </button>
    );
  }

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-none"
      aria-label={`Current theme: ${themeLabel[theme]}. Click to switch.`}
      title={themeLabel[theme]}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
