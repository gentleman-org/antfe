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
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    orientation: 'portrait',
    categories: ['social', 'education', 'developer'],
    screenshots: [
      {
        src: '/screenshots/desktop-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'AntFE 开发者社区桌面版',
      },
      {
        src: '/screenshots/mobile-narrow.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'AntFE 开发者社区移动版',
      },
    ],
    // shortcuts: [
    //   {
    //     name: '社区',
    //     url: 'https://dc.antfe.com',
    //     icons: [{ src: '/icons/community.ico', sizes: '96x96' }],
    //   },
    //   {
    //     name: '技术文章',
    //     url: '/articles',
    //     icons: [{ src: '/icons/articles.png', sizes: '96x96' }],
    //   },
    //   {
    //     name: '开源项目',
    //     url: '/projects',
    //     icons: [{ src: '/icons/projects.png', sizes: '96x96' }],
    //   },
    // ],
  };
}

// {
//   "name": "AntFE 开发者社区",
//   "short_name": "AntFE",
//   "description": "连接全球优秀开发者",
//   "icons": [
//     {
//       "src": "/icons/icon-192x192.png",
//       "sizes": "192x192",
//       "type": "image/png",
//       "purpose": "any maskable"
//     },
//     {
//       "src": "/icons/icon-512x512.png",
//       "sizes": "512x512",
//       "type": "image/png",
//       "purpose": "any maskable"
//     }
//   ],
//   "screenshots": [
//     {
//       "src": "/screenshots/desktop-wide.png",
//       "sizes": "1280x720",
//       "type": "image/png",
//       "form_factor": "wide",
//       "label": "AntFE 开发者社区桌面版"
//     },
//     {
//       "src": "/screenshots/mobile-narrow.png",
//       "sizes": "390x844",
//       "type": "image/png",
//       "form_factor": "narrow",
//       "label": "AntFE 开发者社区移动版"
//     }
//   ],
//   "theme_color": "#3B82F6",
//   "background_color": "#FFFFFF",
//   "start_url": "/",
//   "display": "standalone",
//   "orientation": "portrait",
//   "categories": ["social", "education", "developer"]
// }
