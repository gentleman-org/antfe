import type { NextConfig } from 'next';
import withSerwistInit from '@serwist/next';
import createNextIntlPlugin from 'next-intl/plugin';

const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  additionalPrecacheEntries: [{ url: '/~offline', revision }],
  disable: process.env.NODE_ENV === 'development',
});

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // experimental features
  experimental: {
    // enable progressive page rendering (PPR) - requires canary version
    // ppr: 'incremental',
    // enable React compiler
    // reactCompiler: true,
    // enable LightningCSS
    // useLightningcss: true,  // can not work with postcss
    // enable view transition
    viewTransition: true,
    // enable CSS code splitting
    cssChunking: true,
    // optimize common package imports
    optimizePackageImports: [
      'react',
      'react-dom',
      'lucide-react',
      'next-intl',
      'zustand',
      'sonner',
      'tailwind-merge',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-slot',
      'class-variance-authority',
    ],
  },
  // configure image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  // configure security headers
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
};

export default withSerwist(withNextIntl(nextConfig));
