import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('src/content/blog');
const failures = [];

async function markdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return markdownFiles(fullPath);
    if (entry.isFile() && entry.name.endsWith('.md')) return [fullPath];
    return [];
  }));
  return files.flat();
}

function addFailure(file, message) {
  failures.push(`${path.relative(process.cwd(), file)}: ${message}`);
}

function frontmatterFor(file, text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    addFailure(file, 'missing frontmatter');
    return '';
  }
  return match[1];
}

function hasTags(frontmatter) {
  const tagsMatch = frontmatter.match(/^tags:\s*\r?\n((?:\s+-\s+\S[^\r\n]*\r?\n?)+)/m);
  return Boolean(tagsMatch);
}

for (const file of await markdownFiles(root)) {
  const text = await readFile(file, 'utf8');
  const frontmatter = frontmatterFor(file, text);

  if (!/^description:\s*["']?.+\S/m.test(frontmatter)) {
    addFailure(file, 'missing description');
  }

  if (!hasTags(frontmatter)) {
    addFailure(file, 'missing or empty tags');
  }

  for (const match of text.matchAll(/!?\[[^\]]*]\(([^)]+)\)/g)) {
    const isImage = match[0].startsWith('!');
    const target = match[1].trim();

    if (isImage) {
      if (match[0].startsWith('![](')) {
        addFailure(file, `empty image alt text: ${target}`);
      }
      if (target.startsWith('/assets/')) {
        addFailure(file, `image path begins /assets/: ${target}`);
      }
      if (target.startsWith('/images/')) {
        addFailure(file, `image path begins /images/: ${target}`);
      }
      continue;
    }

    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) {
      continue;
    }

    if (target.endsWith('.md') || /\.md(?:#|\?)/.test(target)) {
      addFailure(file, `internal markdown link ends in .md: ${target}`);
    }
    if (target.startsWith('posts/')) {
      addFailure(file, `internal markdown link begins posts/: ${target}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Content SEO check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Content SEO check passed.');
