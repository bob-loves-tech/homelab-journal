const baseArg = process.argv[2] ?? 'https://bob-loves-tech.github.io/homelab-journal/';
const baseUrl = new URL(baseArg);
const sitemapUrl = new URL('sitemap.xml', baseUrl);
const failures = [];
const checkedUrls = new Map();

function addFailure(url, message) {
  failures.push(`${url}: ${message}`);
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.text();
}

async function checkStatus(url) {
  const key = url.toString();
  if (checkedUrls.has(key)) return checkedUrls.get(key);
  const response = await fetch(url);
  checkedUrls.set(key, response.status);
  return response.status;
}

function extractAttributes(html, tagName, attrName) {
  const values = [];
  const tagPattern = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  for (const match of html.matchAll(tagPattern)) {
    const attr = match[0].match(new RegExp(`\\s${attrName}=["']([^"']+)["']`, 'i'));
    if (attr) values.push(attr[1]);
  }
  return values;
}

function toInternalUrl(value, pageUrl) {
  if (value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('tel:')) return undefined;
  const url = new URL(value, pageUrl);
  if (url.origin !== baseUrl.origin) return undefined;
  if (!url.pathname.startsWith(baseUrl.pathname)) return undefined;
  url.hash = '';
  return url;
}

let sitemap;
try {
  sitemap = await fetchText(sitemapUrl);
} catch (error) {
  console.error(`Unable to fetch sitemap ${sitemapUrl}: ${error.message}`);
  process.exit(1);
}

const pageUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));

for (const pageUrl of pageUrls) {
  let html;
  try {
    const status = await checkStatus(pageUrl);
    if (status !== 200) {
      addFailure(pageUrl, `expected 200, got ${status}`);
      continue;
    }
    html = await fetchText(pageUrl);
  } catch (error) {
    addFailure(pageUrl, error.message);
    continue;
  }

  if (!/<link\s+[^>]*rel=["']canonical["'][^>]*href=["'][^"']+["'][^>]*>/i.test(html)) {
    addFailure(pageUrl, 'missing canonical tag');
  }
  if (!/<meta\s+[^>]*name=["']description["'][^>]*content=["'][^"']+["'][^>]*>/i.test(html)) {
    addFailure(pageUrl, 'missing meta description');
  }

  const urlsToCheck = [
    ...extractAttributes(html, 'img', 'src'),
    ...extractAttributes(html, 'a', 'href').filter((href) => href.includes('/posts/'))
  ];

  for (const rawUrl of urlsToCheck) {
    const internalUrl = toInternalUrl(rawUrl, pageUrl);
    if (!internalUrl) continue;
    const status = await checkStatus(internalUrl);
    if (status !== 200) {
      addFailure(pageUrl, `${rawUrl} returned HTTP ${status}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Live site check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Live site check passed for ${pageUrls.length} sitemap URLs.`);
