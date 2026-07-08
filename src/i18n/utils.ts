import { translations, type Locale } from './translations';

/**
 * Get the full translation object for a given locale.
 */
export function t(locale: Locale) {
  return translations[locale];
}

/**
 * Determine locale from the current URL pathname.
 * `/en/...` → 'en', everything else → 'ru'
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  if (segment === 'en') return 'en';
  return 'ru';
}

/**
 * Get the URL for the alternate language version of the current page.
 */
export function getAlternateUrl(pathname: string, currentLocale: Locale): string {
  if (currentLocale === 'ru') {
    // Russian → English: prepend /en
    return '/en' + (pathname === '/' ? '/' : pathname);
  }
  // English → Russian: strip /en prefix
  const stripped = pathname.replace(/^\/en\/?/, '/');
  return stripped || '/';
}
