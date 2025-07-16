// app/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AntFE 程序员社区',
    short_name: 'AntFE',
    description: '连接全球优秀程序员的技术交流平台',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#3B82F6',
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
    categories: ['social', 'education', 'developer'],
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
        name: '社区',
        url: '/community',
        icons: [{ src: '/icons/community.png', sizes: '96x96' }],
      },
      {
        name: '技术文章',
        url: '/articles',
        icons: [{ src: '/icons/articles.png', sizes: '96x96' }],
      },
      {
        name: '开源项目',
        url: '/projects',
        icons: [{ src: '/icons/projects.png', sizes: '96x96' }],
      },
    ],
  };
}
