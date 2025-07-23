// lib/i18n/paths.ts

/**
 * An array of paths that should be handled by the i18n middleware.
 * These are the routes that will be prefixed with a locale.
 *
 * All other paths will be treated as personal pages and will be passed through without a locale prefix.
 */
export const i18nPaths = [
  '/', // The root path always needs to be localized.
  '/about',
  '/article',
  '/page',
  '/auth-demo', // Authentication demo page
  '/sign-in', // Sign-in page
  '/sign-up', // Sign-up page
  '/discord', // Discord page
  // Add any other top-level i18n paths here.
  // For example: '/contact', '/pricing'
];
