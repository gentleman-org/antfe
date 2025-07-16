import { getRequestConfig } from 'next-intl/server';
import { routing, Locale } from './routing';

// 静态导入所有语言文件
import enMessages from '../../locales/en.json';
import zhCNMessages from '../../locales/zh-CN.json';

// 创建消息映射
const messages = {
  en: enMessages,
  'zh-CN': zhCNMessages,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = (await requestLocale) as Locale;

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // messages: (await import(`../../locales/${locale}.json`)).default,
    messages: messages[locale],
  };
});
