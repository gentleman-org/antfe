// app/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AntFE 开发者社区',
    short_name: 'AntFE',
    description: '连接全球优秀开发者',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/icons/icon-192x192.ico',
        sizes: '192x192',
        type: 'image/ico',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.ico',
        sizes: '512x512',
        type: 'image/ico',
      },
    ],
    orientation: 'portrait',
    categories: ['social', 'education', 'developer'],
    shortcuts: [
      {
        name: '社区',
        url: 'https://dc.antfe.com',
        icons: [{ src: '/icons/community.ico', sizes: '96x96' }],
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
