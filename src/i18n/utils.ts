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
  if (segment === 'ru') return 'ru';
  return 'en';
}

/**
 * Get the URL for the alternate language version of the current page.
 */
export function getAlternateUrl(pathname: string, currentLocale: Locale): string {
  if (currentLocale === 'en') {
    // English → Russian: prepend /ru
    return '/ru' + (pathname === '/' ? '/' : pathname);
  }
  // Russian → English: strip /ru prefix
  const stripped = pathname.replace(/^\/ru\/?/, '/');
  return stripped || '/';
}
