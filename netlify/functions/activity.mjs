// Netlify Function: fetches GitHub contributions + Stepik data and caches them on Netlify CDN.
// Endpoint: /.netlify/functions/activity?year=2026
// Cached for 24 hours on Netlify's edge (durable cache).

export default async (request) => {
  const url = new URL(request.url);
  const year = url.searchParams.get('year') || new Date().getFullYear().toString();

  const results = {
    timestamp: new Date().toISOString(),
    year,
    github: null,
    stepikUser: null,
    stepikActivity: null,
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

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // Cache for 24 hours on Netlify CDN (durable = survives deploys)
      'Netlify-CDN-Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600, durable',
      // Browser cache: 1 hour, then revalidate
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
};

export const config = {
  path: '/api/activity',
};
