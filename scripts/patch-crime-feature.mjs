/**
 * Crime feature fixes:
 * 1. Embed phone images in arloDark cover HTML (blob iframe can't resolve assets/)
 * 2. Point "Jump to the Final Design" at Final Outcomes (#cf-outcomes-heading)
 */
import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const FILE = path.join(ROOT, 'crime-feature.html');

const ASSET_SOURCES = {
  'arlosafe-aed.png': '/Users/tians/Downloads/portfolio/crimes/AED.png',
  'arlosafe-crime.png': '/Users/tians/Downloads/portfolio/crimes/crimes.png',
  'arlosafe-offenders.png': '/Users/tians/Downloads/portfolio/crimes/offender.png',
};

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };

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

function toDataUrl(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing: ${filePath}`);
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext];
  const b64 = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${b64}`;
}

function embedAssets(html) {
  let out = html;
  for (const name of Object.keys(ASSET_SOURCES)) {
    out = out.split(`assets/${name}`).join(toDataUrl(ASSET_SOURCES[name]));
  }
  return out;
}

let html = fs.readFileSync(FILE, 'utf8');

// Fix jump anchor in template (parse JSON — raw file escapes quotes as \")
const templateMatch = html.match(
  /<script type="__bundler\/template">\s*([\s\S]*?)\s*<\/script>/
);
if (!templateMatch) throw new Error('template not found');
let template = JSON.parse(templateMatch[1].trim());
const jumpOld =
  'href="#impact" className="cs-cta-primary">Jump to the Final Design';
const jumpNew =
  'href="#cf-outcomes-heading" className="cs-cta-primary">Jump to the Final Design';
if (template.includes(jumpOld)) {
  template = template.replace(jumpOld, jumpNew);
  const encoded = JSON.stringify(template).replace(/<\/script>/gi, '\\u003C/script\\u003E');
  html = html.replace(templateMatch[1], encoded);
  console.log('Jump link: #impact -> #cf-outcomes-heading');
} else if (template.includes('#cf-outcomes-heading')) {
  console.log('Jump link: already points to Final Outcomes');
} else {
  console.warn('Jump link pattern not found — check template');
}

const manifestMatch = html.match(
  /<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/
);
const extMatch = html.match(
  /<script type="__bundler\/ext_resources">\s*([\s\S]*?)\s*<\/script>/
);
const manifest = JSON.parse(manifestMatch[1]);
const ext = JSON.parse(extMatch[1]);
const arloUuid = ext.find((e) => e.id === 'arloDark')?.uuid;
if (!arloUuid) throw new Error('arloDark not in ext_resources');

const before = decodeEntry(manifest[arloUuid]).toString('utf8');
if (/assets\/arlosafe-/.test(before)) {
  const after = embedAssets(before);
  if (/assets\/arlosafe-/.test(after)) throw new Error('arloDark: unresolved assets remain');
  manifest[arloUuid] = encodeEntry(after, manifest[arloUuid]);
  html = html.replace(manifestMatch[1], JSON.stringify(manifest));
  console.log(`arloDark cover: embedded 3 images (${before.length} -> ${after.length} bytes)`);
} else if (before.includes('data:image/png;base64')) {
  console.log('arloDark cover: images already embedded');
} else {
  console.warn('arloDark cover: no arlosafe asset refs found');
}

fs.writeFileSync(FILE, html);
console.log('Wrote', FILE);
