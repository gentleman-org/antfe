import { MetadataRoute } from 'next';
import { routing, Locale } from '~/lib/i18n/routing';
import { getPathname } from '~/lib/i18n/navigation';
import { i18nPaths } from '~/lib/i18n/paths';
import fs from 'fs';
import path from 'path';

// 导入个人页面数据
const meJsonPath = path.join(process.cwd(), 'me.json');
let personalPages: Array<{ path: string }> = [];

try {
  const meData = fs.readFileSync(meJsonPath, 'utf-8');
  personalPages = JSON.parse(meData);
} catch (error) {
  console.warn('无法读取 me.json:', error);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 使用国际化路径配置
  i18nPaths.forEach((path) => {
    entries.push(...getEntries(path as Href));
  });

  // 个人页面（非国际化）
  personalPages.forEach((person) => {
    entries.push({
      url: getPersonalUrl(person.path),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // 特殊页面（如果不在 i18nPaths 中）
  const specialPages = ['/mdx'];
  specialPages.forEach((specialPath) => {
    // 检查是否已经在 i18nPaths 中
    if (!i18nPaths.includes(specialPath)) {
      entries.push({
        url: `https://antfe.com${specialPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  });

  return entries;
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntries(href: Href): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: href === '/' ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((cur) => [cur, getUrl(href, cur)])),
    },
  }));
}

function getUrl(href: Href, locale: Locale): string {
  const pathname = getPathname({ locale, href });
  return 'https://antfe.com' + pathname;
}

function getPersonalUrl(personalPath: string): string {
  return `https://antfe.com/${personalPath}`;
}
