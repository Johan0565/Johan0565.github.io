// Netlify Function: fetches GitHub contributions + Stepik data and caches them on Netlify CDN.
// Endpoint: /.netlify/functions/activity?year=2026
// Successful responses are cached on Netlify's edge (durable cache).

const ACTIVITY_SCHEMA_VERSION = 'duolingo-v1';

export default async (request) => {
  const url = new URL(request.url);
  const year = url.searchParams.get('year') || new Date().getFullYear().toString();

  const results = {
    schemaVersion: ACTIVITY_SCHEMA_VERSION,
    timestamp: new Date().toISOString(),
    year,
    github: null,
    stepikUser: null,
    stepikActivity: null,
    duolingo: null,
  };

  // --- GitHub Contributions (scrape HTML) ---
  try {
    const ghUrl = `https://github.com/users/Johan0565/contributions?from=${year}-01-01&to=${year}-12-31`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const ghRes = await fetch(ghUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NetlifyFunction/1.0)',
        'Accept': 'text/html',
      },
    });
    clearTimeout(timeout);
    if (ghRes.ok) {
      results.github = await ghRes.text();
    }
  } catch (err) {
    console.error('GitHub fetch failed:', err.message);
  }

  // --- Stepik User Stats ---
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const stepikUserRes = await fetch('https://stepik.org/api/users/611926268', {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NetlifyFunction/1.0)' },
    });
    clearTimeout(timeout);
    if (stepikUserRes.ok) {
      results.stepikUser = await stepikUserRes.json();
    }
  } catch (err) {
    console.error('Stepik user fetch failed:', err.message);
  }

  // --- Stepik Activity (heatmap pins) ---
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const stepikActRes = await fetch('https://stepik.org/api/user-activities/611926268', {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NetlifyFunction/1.0)' },
    });
    clearTimeout(timeout);
    if (stepikActRes.ok) {
      results.stepikActivity = await stepikActRes.json();
    }
  } catch (err) {
    console.error('Stepik activity fetch failed:', err.message);
  }

  // --- Duolingo Public Profile ---
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const duoRes = await fetch('https://www.duolingo.com/2017-06-30/users?username=Muhammad73304', {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NetlifyFunction/1.0)',
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeout);
    if (duoRes.ok) {
      results.duolingo = await duoRes.json();
    }
  } catch (err) {
    console.error('Duolingo profile fetch failed:', err.message);
  }

  const hasDuolingoData = Boolean(results.duolingo?.users?.[0]);

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // The version parameter creates a new cache key when the response schema changes.
      'Netlify-Vary': 'query=year|v',
      // Never keep an upstream failure for a full day.
      'Netlify-CDN-Cache-Control': hasDuolingoData
        ? 'public, max-age=86400, stale-while-revalidate=3600, durable'
        : 'public, max-age=120, stale-while-revalidate=60',
      'Cache-Control': hasDuolingoData
        ? 'public, max-age=3600, stale-while-revalidate=86400'
        : 'no-cache, max-age=0, must-revalidate',
    },
  });
};

export const config = {
  path: '/api/activity',
};
