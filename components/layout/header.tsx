'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { ThemeToggle } from '~/components/themeToggle';
import LocaleSwitcher from '~/components/langSelect/localeSwitcher';
import { usePathname, Link } from '~/lib/i18n/navigation'; // Correctly import Link from next-intl's navigation

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Listen for scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('header.navigation.home'), href: '/' },
    { name: t('header.navigation.community'), href: 'https://dc.antfe.com' },
    // { name: t('header.navigation.articles'), href: '/articles' },
    { name: t('header.navigation.projects'), href: '/projects' },
    { name: t('header.navigation.developers'), href: '/developers' },
    // { name: t('header.navigation.events'), href: '/events' },
    { name: t('layout.github'), href: 'https://github.com/gentleman-org/antfe' },
  ];

  return (
    <>
      <header className={`sticky top-0 right-0 left-0 z-50 transition-all duration-700 ease-out ${isScrolled ? 'liquid-glass-header-scrolled' : 'liquid-glass-header'} `}>
        {/* Dynamic rainbow light */}
        <div className="through-purple-500/60 absolute top-0 right-0 left-0 h-px animate-pulse bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

        {/* Liquid glass container */}
        <div className="liquid-glass-container">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo area - Enhanced glow effect */}
              <div className="flex items-center space-x-4">
                <Link href="/" className="group flex items-center space-x-2">
                  <div className="relative">
                    <div className="liquid-glow flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-500 group-hover:shadow-blue-500/40">
                      <Zap className="h-5 w-5 text-white drop-shadow-sm" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-40" />
                  </div>
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                    <span>{t('layout.shortTitle')}</span>
                    {/* <span className="md:hidden">{t('layout.shortTitle')}</span> */}
                    {/* <span className="hidden md:inline">{t('layout.title')}</span> */}
                  </span>
                </Link>
              </div>

              {/* Desktop navigation - Enhanced liquid effect */}
              <div className="hidden md:block">
                <div className="flex items-center space-x-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`liquid-nav-item relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-500 ${
                          isActive
                            ? 'liquid-nav-active text-blue-600 dark:text-blue-400'
                            : 'liquid-nav-hover text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                        } `}>
                        {item.name}
                        {isActive && (
                          <div className="liquid-indicator absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right action area - Enhanced glass buttons */}
              <div className="flex items-center space-x-2">
                {/* Language switcher */}
                <div className="liquid-glass-container-small">
                  <LocaleSwitcher />
                </div>

                {/* Theme toggle */}
                <div className="liquid-glass-container-small">
                  <ThemeToggle />
                </div>

                {/* Mobile menu button */}
                <Button variant="ghost" size="icon" className="liquid-glass-button md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom rainbow light */}
        <div className="through-pink-500/50 absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </header>

      {/* Mobile menu - Enhanced liquid effect */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 md:hidden">
          <div className="liquid-glass-mobile-menu">
            <div className="space-y-4 px-4 py-6">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-500 ${
                      isActive
                        ? 'liquid-nav-active text-blue-600 dark:text-blue-400'
                        : 'liquid-nav-hover text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                    } `}
                    onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Overlay - Enhanced blur */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-black/20 backdrop-blur-md transition-all duration-300 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
}
