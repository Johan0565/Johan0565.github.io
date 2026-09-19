import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const origin = 'https://magomedov.online';
const paths = ['/', '/projects/', '/activity/', '/ru/', '/ru/projects/', '/ru/activity/'];
const read = (path) => readFileSync(join('dist', path), 'utf8');
const titles = new Set();
const descriptions = new Set();
const sitemap = read('sitemap.xml');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(locations.sort(), paths.map((path) => origin + path).sort());
assert.ok(read('robots.txt').includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(read('robots.txt').includes('User-agent: *\nAllow: /'));

for (const path of paths) {
  const html = read(`${path}index.html`);
  const body = html.split('<body')[1];
  const bodyText = body.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(([tag]) =>
    Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])));
  const meta = (name) => tags.find((tag) => tag.name === name || tag.property === name)?.content;
  const alternate = (lang) => tags.find((tag) => tag.hreflang === lang)?.href;
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const locale = path.startsWith('/ru/') ? 'ru' : 'en';
  const englishPath = path.replace(/^\/ru\//, '/');
  assert.ok(html.includes(`<html lang="${locale}"`), `${path}: document language`);
  assert.equal(tags.find((tag) => tag.rel === 'canonical')?.href, origin + path);
  assert.equal(alternate('en'), origin + englishPath);
  assert.equal(alternate('ru'), origin + '/ru' + englishPath);
  assert.equal(alternate('x-default'), origin + englishPath);
  assert.equal((body.match(/<h1\b/g) || []).length, 1, `${path}: one H1`);
  assert.ok(title && !titles.has(title), `${path}: unique title`);
  assert.ok(meta('description') && !descriptions.has(meta('description')), `${path}: unique description`);
  titles.add(title);
  descriptions.add(meta('description'));
  assert.equal(meta('og:title'), title);
  assert.equal(meta('og:url'), origin + path);
  assert.equal(meta('og:description'), meta('description'));
  assert.equal(meta('twitter:description'), meta('description'));
  assert.ok(!/noindex|nosnippet/.test(meta('robots')));
  assert.ok(existsSync(join('dist', new URL(meta('og:image')).pathname)));

  const json = html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)?.[1];
  const schema = JSON.parse(json);
  const person = schema['@graph'].find((node) => node['@type'] === 'Person');
  assert.equal(person['@id'], `${origin}/#person`);
  const page = schema['@graph'].find((node) => node['@id'] === `${origin}${path}#webpage`);
  assert.equal(page.inLanguage, locale);
  if (englishPath === '/') {
    assert.equal(page['@type'], 'ProfilePage');
    assert.ok(bodyText.includes(person.description), `${path}: visible biography matches schema`);
    assert.match(body, /srcset="[^"]+\.webp/);
  } else {
    assert.equal(page['@type'], 'CollectionPage');
    assert.ok(schema['@graph'].some((node) => node['@type'] === 'BreadcrumbList'));
  }
  if (englishPath === '/projects/') {
    for (const { item } of page.mainEntity.itemListElement) {
      assert.ok(body.includes(`id="${new URL(item.url).hash.slice(1)}"`));
      assert.ok(bodyText.includes(item.description), `${path}: visible project matches schema`);
    }
  }
  for (const [, href] of body.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    assert.ok(existsSync(join('dist', href.endsWith('/') ? `${href}index.html` : href)), `${path}: broken internal link ${href}`);
  }
  console.log(`SEO OK ${path}`);
}
console.log('All 6 pages: metadata, hreflang, structured data, visible summaries, links and sitemap OK.');
