import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { i18nPaths } from './lib/i18n/paths';

const nextIntlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is already localized
  const isLocalized = routing.locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (isLocalized) {
    return nextIntlMiddleware(request);
  }

  // Check if the path is in the i18n whitelist
  const isI18nPath = i18nPaths.some((path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  });

  if (isI18nPath) {
    // For whitelisted paths, let next-intl handle localization and redirection.
    // e.g., /about -> /en/about
    return nextIntlMiddleware(request);
  }

  // All other paths are considered personal pages and are passed through directly.
  // e.g., /vadxq -> /vadxq
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except for
    // - api (API routes)
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - files with extensions (e.g. .ico, .svg)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
