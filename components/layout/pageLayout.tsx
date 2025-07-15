import React from 'react';
import Header from './header';
import Footer from './footer';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-black dark:to-blue-950/30">
      <Header />
      <main className="w-full pt-16">{children}</main>
      <Footer />
    </div>
  );
}
