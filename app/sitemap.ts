import { MetadataRoute } from 'next';
import { routing, Locale } from '~/lib/i18n/routing';
import { getPathname } from '~/lib/i18n/navigation';
import { i18nPaths } from '~/lib/i18n/paths';
import fs from 'fs';
import path from 'path';

// 导入个人页面数据
const personalPages: Array<{ path: string }> = [];

try {
  const meDir = path.join(process.cwd(), 'app/(me)');
  const meDirs = fs
    .readdirSync(meDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  meDirs.forEach((dirName) => {
    const meJsonPath = path.join(meDir, dirName, 'me.json');
    try {
      if (fs.existsSync(meJsonPath)) {
        personalPages.push({ path: dirName });
      }
    } catch (error) {
      console.warn(`无法读取 ${dirName}/me.json:`, error);
    }
  });
} catch (error) {
  console.warn('无法读取个人页面目录:', error);
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
  return routing.locales.map((locale) => {
    const url = getUrl(href, locale);
    const entry: MetadataRoute.Sitemap[0] = {
      url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: href === '/' ? 1.0 : 0.8,
    };

    // 只有在有多个语言时才添加 alternates
    if (routing.locales.length > 1) {
      entry.alternates = {
        languages: Object.fromEntries(routing.locales.map((cur) => [cur, getUrl(href, cur)])),
      };
    }

    return entry;
  });
}

function getUrl(href: Href, locale: Locale): string {
  const pathname = getPathname({ locale, href });
  return 'https://antfe.com' + pathname;
}

function getPersonalUrl(personalPath: string): string {
  return `https://antfe.com/${personalPath}`;
}
