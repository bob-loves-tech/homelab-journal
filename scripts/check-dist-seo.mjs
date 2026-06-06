import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const distRoot = path.resolve('dist');
const failures = [];

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(fullPath);
    if (entry.isFile() && entry.name.endsWith('.html')) return [fullPath];
    return [];
  }));
  return files.flat();
}

function addFailure(file, message) {
  failures.push(`${path.relative(process.cwd(), file)}: ${message}`);
}

function hasMeta(html, name) {
  const pattern = new RegExp(`<meta\\s+[^>]*(?:name|property)=["']${name}["'][^>]*content=["'][^"']+["'][^>]*>`, 'i');
  return pattern.test(html);
}

for (const file of await htmlFiles(distRoot)) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(distRoot, file).replaceAll(path.sep, '/');
  const isPost = relative.startsWith('posts/');

  if (/href=["'][^"']*\.md(?:[#?][^"']*)?["']/i.test(html)) {
    addFailure(file, 'generated internal .md href');
  }
  if (/src=["']\/assets\//i.test(html)) {
    addFailure(file, 'generated src begins /assets/');
  }
  if (/src=["']\/images\//i.test(html)) {
    addFailure(file, 'generated src begins /images/');
  }
  if (!/<link\s+[^>]*rel=["']canonical["'][^>]*href=["'][^"']+["'][^>]*>/i.test(html)) {
    addFailure(file, 'missing canonical tag');
  }
  if (!hasMeta(html, 'description')) {
    addFailure(file, 'missing meta description');
  }
  for (const meta of ['og:title', 'og:description', 'og:url', 'og:image', 'twitter:card']) {
    if (!hasMeta(html, meta)) {
      addFailure(file, `missing ${meta}`);
    }
  }
  if (isPost && !/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>/i.test(html)) {
    addFailure(file, 'missing JSON-LD on post page');
  }
  if (isPost) {
    for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0];
      const alt = tag.match(/\salt=["']([^"']*)["']/i);
      if (!alt || alt[1].trim() === '') {
        addFailure(file, `empty article image alt text: ${tag}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error('Dist SEO check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Dist SEO check passed.');
