'use client';

import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Exclude<Theme, 'system'>;
};

const ThemeContext = React.createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = React.useState<Exclude<Theme, 'system'>>('light');
  const [mounted, setMounted] = React.useState(false);

  // Initialize theme from localStorage on mount
  React.useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(savedTheme);
    setMounted(true);
  }, []);

  // Handle theme changes
  React.useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const actualTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

    setResolvedTheme(actualTheme);

    // Add transition animation
    root.classList.add('theme-transition');
    root.style.transition = 'all 0.3s ease-in-out';

    // Delay removing transition effect
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);

    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);
    root.style.colorScheme = actualTheme;

    // Save to localStorage
    if (theme !== 'system') {
      localStorage.setItem('theme', theme);
    } else {
      localStorage.removeItem('theme');
    }
  }, [theme]);

  // Listen for system theme changes
  React.useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  if (!mounted) return null;

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
