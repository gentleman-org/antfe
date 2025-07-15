// app/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js AI Starter',
    short_name: 'Next App',
    description: 'A starter template for Next.js with AI features',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    orientation: 'portrait',
    categories: ['productivity', 'utilities'],
    screenshots: [
      {
        src: '/screenshots/mobile.png',
        sizes: '540x720',
        type: 'image/png',
      },
      {
        src: '/screenshots/desktop.png',
        sizes: '1280x800',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icons: [{ src: '/icons/dashboard.png', sizes: '96x96' }],
      },
      {
        name: 'Profile',
        url: '/profile',
        icons: [{ src: '/icons/profile.png', sizes: '96x96' }],
      },
    ],
  };
}
