/**
 * Embed local image files as data URLs into cover HTML in all bundled pages.
 */
import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const FILES = ['index.html', 'support-churn.html', 'ai-caption.html', 'crime-feature.html'];
const ASSETS_ROOT = '/Users/tians/my-portfolio/public/case-studies/assets';

/** @type {Record<string, string>} basename -> absolute file path */
const ASSET_SOURCES = {
  'support-center-new.jpg': new URL('./support-cover-hero.png', import.meta.url).pathname,
  'phone-1-support.png': path.join(ASSETS_ROOT, 'phone-1-support.png'),
  'phone-2.png': path.join(ASSETS_ROOT, 'phone-2.png'),
  'phone-3.png': path.join(ASSETS_ROOT, 'phone-3.png'),
  'phone-4.png': path.join(ASSETS_ROOT, 'phone-4.png'),
  'phone-5.png': path.join(ASSETS_ROOT, 'phone-5.png'),
  'phone-6-discovery.png': path.join(ASSETS_ROOT, 'phone-6-discovery.png'),

  'caption-1.png': '/Users/tians/Desktop/BACKUPS/AI/event caption/Caption 1.png',
  'caption-2.png': '/Users/tians/Desktop/BACKUPS/AI/event caption/Caption 2.png',
  'caption-3.png': '/Users/tians/Desktop/BACKUPS/AI/event caption/Caption 3.png',
  'caption-4.png': '/Users/tians/Desktop/BACKUPS/AI/event caption/Caption 4.png',

  'captions-search.png': '/Users/tians/Desktop/BACKUPS/AI/event caption/Feed.jpg',
  'captions-settings.png': '/Users/tians/Downloads/portfolio/ai caption/Settings.png',
  'captions-enable.png': '/Users/tians/Downloads/portfolio/ai caption/Settings-1.png',
  'captions-packages.png': '/Users/tians/Downloads/portfolio/ai caption/Location.png',

  'arlosafe-aed.png': '/Users/tians/Downloads/portfolio/crimes/AED.png',
  'arlosafe-crime.png': '/Users/tians/Downloads/portfolio/crimes/crimes.png',
  'arlosafe-offenders.png': '/Users/tians/Downloads/portfolio/crimes/offender.png',

  'arlosafe-aed-map.png': '/Users/tians/Downloads/portfolio/crimes/map.jpg',
  'arlosafe-aed-detail.jpg': '/Users/tians/Downloads/portfolio/crimes/aed-1.jpg',
  'arlosafe-crimes-map.png': '/Users/tians/Downloads/portfolio/crimes/crimes-2.png',
  'arlosafe-crime-detail.png': '/Users/tians/Downloads/portfolio/crimes/screen.png',
  'arlosafe-offender-map.png': '/Users/tians/Downloads/portfolio/crimes/Offenders_Education.png',
};

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

function decodeEntry(entry) {
  const raw = Buffer.from(entry.data, 'base64');
  try {
    return entry.compressed ? zlib.gunzipSync(raw) : raw;
  } catch {
    return raw;
  }
}

function encodeEntry(html, entry) {
  return {
    ...entry,
    mime: entry.mime || 'text/html',
    compressed: true,
    data: zlib.gzipSync(Buffer.from(html, 'utf8')).toString('base64'),
  };
}

function toDataUrl(filePath, refName) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing asset for ${refName}: ${filePath}`);
  }
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext];
  if (!mime) throw new Error(`Unsupported type ${ext} for ${refName}`);
  const b64 = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${b64}`;
}

function embedAssets(html) {
  let out = html;
  const refs = [...html.matchAll(/assets\/([a-zA-Z0-9._-]+)/g)].map((m) => m[1]);
  for (const name of [...new Set(refs)]) {
    const src = ASSET_SOURCES[name];
    if (!src) {
      console.warn(`  skip (no source mapped): assets/${name}`);
      continue;
    }
    out = out.split(`assets/${name}`).join(toDataUrl(src, name));
  }
  return out;
}

for (const file of FILES) {
  const filePath = path.join(ROOT, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const manifestMatch = html.match(
    /<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/
  );
  const extMatch = html.match(
    /<script type="__bundler\/ext_resources">\s*([\s\S]*?)\s*<\/script>/
  );
  if (!manifestMatch || !extMatch) {
    console.warn(`${file}: skip (no manifest)`);
    continue;
  }

  const manifest = JSON.parse(manifestMatch[1]);
  const ext = JSON.parse(extMatch[1]);
  let updated = 0;

  for (const { id, uuid } of ext) {
    const entry = manifest[uuid];
    if (!entry?.mime?.includes('html')) continue;
    const before = decodeEntry(entry).toString('utf8');
    const refs = [...before.matchAll(/assets\/[a-zA-Z0-9._-]+/g)];
    if (refs.length === 0) continue;
    const after = embedAssets(before);
    const remaining = [...after.matchAll(/assets\/[a-zA-Z0-9._-]+/g)];
    if (remaining.length) {
      console.error(
        `${file} ${id}: still has relative assets:`,
        [...new Set(remaining.map((r) => r[0]))]
      );
      process.exit(1);
    }
    manifest[uuid] = encodeEntry(after, entry);
    console.log(
      `${file} ${id}: embedded ${refs.length} ref(s), ${before.length} -> ${after.length}`
    );
    updated++;
  }

  if (updated > 0) {
    fs.writeFileSync(filePath, html.replace(manifestMatch[1], JSON.stringify(manifest)));
  } else {
    console.log(`${file}: all covers already embedded`);
  }
}
