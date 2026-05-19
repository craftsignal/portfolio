/**
 * Fix support case-study covers: use desktop Support Center UI (not phone collage).
 */
import fs from 'fs';
import zlib from 'zlib';

const INDEX = new URL('../index.html', import.meta.url).pathname;
const DESKTOP_SHOT = new URL('./support-cover-hero.png', import.meta.url).pathname;

function decodeEntry(entry) {
  const raw = Buffer.from(entry.data, 'base64');
  return entry.compressed ? zlib.gunzipSync(raw) : raw;
}

function encodeEntry(html, entry) {
  return {
    ...entry,
    mime: entry.mime || 'text/html',
    compressed: true,
    data: zlib.gzipSync(Buffer.from(html, 'utf8')).toString('base64'),
  };
}

const html = fs.readFileSync(INDEX, 'utf8');
const manifest = JSON.parse(
  html.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/)[1]
);
const ext = JSON.parse(
  html.match(/<script type="__bundler\/ext_resources">\s*([\s\S]*?)\s*<\/script>/)[1]
);

const supportDarkUuid = ext.find((e) => e.id === 'supportDark')?.uuid;
const supportLightUuid = ext.find((e) => e.id === 'supportLight')?.uuid;
if (!supportDarkUuid || !supportLightUuid) {
  console.error('Missing supportDark/supportLight in ext_resources');
  process.exit(1);
}
if (!fs.existsSync(DESKTOP_SHOT)) {
  console.error('Missing desktop screenshot:', DESKTOP_SHOT);
  process.exit(1);
}

const dataUrl = `data:image/png;base64,${fs.readFileSync(DESKTOP_SHOT).toString('base64')}`;
let darkHtml = decodeEntry(manifest[supportDarkUuid]).toString('utf8');

const before = darkHtml;
darkHtml = darkHtml.replace(
  /(<img src=")data:image\/[^"]+(" alt="Redesigned Arlo Support Center" \/>)/,
  `$1${dataUrl}$2`
);
if (darkHtml === before) {
  console.error('Could not find support hero <img> to replace');
  process.exit(1);
}

manifest[supportDarkUuid] = encodeEntry(darkHtml, manifest[supportDarkUuid]);

const newHtml = html.replace(
  html.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/)[1],
  JSON.stringify(manifest)
);
fs.writeFileSync(INDEX, newHtml);
console.log('supportDark: desktop Support Center UI embedded');
console.log('supportLight: run restore-support-light-cover.mjs to update light hover cover');
