#!/usr/bin/env node

/**
 * Pre-build image optimiser for homelab-journal.
 * Processes all JPEG/PNG in public/assets/images/ and public/images/:
 *   - Resizes wider images to 900px (blog column width)
 *   - JPEGs → quality 80, progressive
 *   - PNGs → optimised with palette support for screenshots
 *   - WebP → re-compressed at quality 80
 *   - Skips files < 10KB (already small enough)
 *   - Writes in-place — all existing content references work
 *
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOTS = ['public/assets/images', 'public/images'];
const MAX_WIDTH = 900;       // blog column width
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const SKIP_UNDER_BYTES = 10 * 1024;  // skip files under 10KB

function walk(dir) {
  const files = [];
  let entries;
  try { entries = readdirSync(dir); } catch { return files; }
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function optimise() {
  console.log('🔍 Scanning for images...');
  const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
  const files = ROOTS.flatMap(r => walk(r))
    .filter(f => imageExts.has(extname(f).toLowerCase()))
    .filter(f => statSync(f).size >= SKIP_UNDER_BYTES);

  console.log(`  Found ${files.length} images to process\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let errors = 0;

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const beforeBytes = statSync(file).size;
    totalBefore += beforeBytes;

    try {
      let pipeline = sharp(file);

      // Get metadata first
      const meta = await pipeline.metadata();
      const needsResize = meta.width > MAX_WIDTH;

      if (needsResize) {
        pipeline = pipeline.resize(MAX_WIDTH, null, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      switch (ext) {
        case '.jpg':
        case '.jpeg':
          pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true });
          break;
        case '.png':
          pipeline = pipeline.png({ 
            compressionLevel: 9, 
            palette: true,
            colors: 128,
            dither: 0.8,
          });
          break;
        case '.webp':
          pipeline = pipeline.webp({ quality: WEBP_QUALITY });
          break;
      }

      await pipeline.toFile(file + '.tmp');
      // Atomic replace
      const { renameSync } = await import('fs');
      renameSync(file + '.tmp', file);
      const afterBytes = statSync(file).size;
      totalAfter += afterBytes;
      processed++;

      const saved = beforeBytes - afterBytes;
      const pct = beforeBytes > 0 ? ((saved / beforeBytes) * 100).toFixed(1) : '0.0';
      if (saved > 0) {
        const action = needsResize 
          ? `↕️ ${meta.width}→900` 
          : '  ✓';
        console.log(`  ${action}  ${formatBytes(beforeBytes)} → ${formatBytes(afterBytes)}  (-${pct}%)  ${file.replace(/^public\//, '')}`);
      } else {
        console.log(`  —    ${formatBytes(beforeBytes)} (no change)  ${file.replace(/^public\//, '')}`);
      }

    } catch (err) {
      errors++;
      console.error(`  ❌  ${file}: ${err.message}`);
    }
  }

  const totalSaved = totalBefore - totalAfter;
  const totalPct = totalBefore > 0 ? ((totalSaved / totalBefore) * 100).toFixed(1) : '0.0';

  console.log(`\n📊 Summary:`);
  console.log(`  Processed: ${processed} of ${files.length} files`);
  console.log(`  Errors:    ${errors}`);
  console.log(`  Before:    ${formatBytes(totalBefore)}`);
  console.log(`  After:     ${formatBytes(totalAfter)}`);
  console.log(`  Saved:     ${formatBytes(totalSaved)} (${totalPct}%)`);

  if (errors > 0) process.exit(1);
}

optimise().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
