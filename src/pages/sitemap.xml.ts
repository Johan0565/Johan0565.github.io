import type { APIRoute } from 'astro';
import { pageKeys, pagePath } from '../data/seo';

export const GET: APIRoute = ({ site }) => {
  const absolute = (path: string) => new URL(path, site).href;
  const entries = pageKeys.flatMap((page) => ['en', 'ru'].map((locale) => {
    const lang = locale as 'en' | 'ru';
    return `<url><loc>${absolute(pagePath(page, lang))}</loc>${(['en', 'ru', 'x-default'] as const).map((alternate) =>
      `<xhtml:link rel="alternate" hreflang="${alternate}" href="${absolute(pagePath(page, alternate === 'ru' ? 'ru' : 'en'))}" />`
    ).join('')}</url>`;
  }));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('\n')}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
