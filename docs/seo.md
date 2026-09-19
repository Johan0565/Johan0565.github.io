# SEO and search AI

The site renders its content and JSON-LD at build time. The existing introduction, project descriptions, certificates and navigation are present in the HTML. Project details retain the original expandable-card UI.

- Edit localized titles and descriptions in `src/data/seo.ts`. Person structured data reuses the existing hero description from `src/i18n/translations.ts`; no extra biography block is added to the interface. Keep facts consistent with the portfolio.
- Each page has its own canonical URL, reciprocal English/Russian alternates and a page-specific English `x-default`. Canonical paths use trailing slashes.
- `src/pages/sitemap.xml.ts` and `src/pages/robots.txt.ts` generate discovery files using the production URL in `astro.config.mjs`. Update `pageKeys`, page metadata and the SEO check when adding routes.
- ProfilePage / Person describe the home pages. CollectionPage, BreadcrumbList and SoftwareSourceCode describe the other pages and projects. No unverified credentials or ratings are added.
- The wildcard robots policy allows search and AI crawlers. Hosting/CDN access controls can still block them; verify production separately.

## Validation

Run `npm run build` followed by `npm run check:seo`. The check inspects all six generated HTML pages, language links, canonical URLs, JSON-LD, visible summaries, local links, social images and sitemap coverage.

## After publishing

1. Check that all six canonical URLs, `/robots.txt` and `/sitemap.xml` return HTTP 200 on `https://magomedov.online`. Alternate hosts should redirect to the canonical host, preserving paths.
2. Verify domain ownership in Google Search Console, Yandex Webmaster and Bing Webmaster Tools; submit `https://magomedov.online/sitemap.xml`. Ownership tokens must come from the owner's accounts.
3. Request indexing of `/` and `/ru/`; inspect the rendered HTML and structured data with URL Inspection and Google's Rich Results Test.
4. Measure field Core Web Vitals and indexing after deployment. Local builds do not establish real-user performance or search rankings.
5. Keep education, project details and course completion status current. Do not mark the entire Google certificate complete based on individual course certificates.

Google's [AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) recommends crawlable, useful text and structured data that matches visible content. No special AI file or markup guarantees a summary. Search systems choose whether to cite the site, what to say and how long their response should be; indexing and inclusion are not guaranteed.
