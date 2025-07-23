import { NextRequest, NextResponse } from 'next/server';
import { routing, Locale } from '~/lib/i18n/routing';
import { getPathname } from '~/lib/i18n/navigation';
import { i18nPaths } from '~/lib/i18n/paths';
import fs from 'fs';
import path from 'path';

// 读取个人页面数据
function getPersonalPages() {
  try {
    const meJsonPath = path.join(process.cwd(), 'me.json');
    const meData = fs.readFileSync(meJsonPath, 'utf-8');
    return JSON.parse(meData);
  } catch (error) {
    console.warn('无法读取 me.json:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const personalPages = getPersonalPages();
  const urls: string[] = [];

  // 国际化页面
  i18nPaths.forEach((path) => {
    routing.locales.forEach((locale) => {
      const url = getUrl(path, locale);
      const lastmod = new Date().toISOString();
      const priority = path === '/' ? '1.0' : '0.8';

      urls.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${priority}</priority>`);

      // 添加多语言链接 - 使用正确的命名空间
      if (routing.locales.length > 1) {
        routing.locales.forEach((altLocale) => {
          const altUrl = getUrl(path, altLocale);
          urls.push(`    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}" />`);
        });
      }

      urls.push(`  </url>`);
    });
  });

  // 个人页面
  personalPages.forEach((person: { path: string }) => {
    const url = `https://antfe.com/${person.path}`;
    const lastmod = new Date().toISOString();

    urls.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
  });

  // 特殊页面
  const specialPages = ['/mdx'];
  specialPages.forEach((specialPath) => {
    if (!i18nPaths.includes(specialPath)) {
      const url = `https://antfe.com${specialPath}`;
      const lastmod = new Date().toISOString();

      urls.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }
  });

  // 生成最终的 XML - 使用正确的 http 命名空间
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function getUrl(href: string, locale: string): string {
  const pathname = getPathname({ locale: locale as Locale, href: href as string });
  return 'https://antfe.com' + pathname;
}
