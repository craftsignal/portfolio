/**
 * Restore supportLight cover: light theme + phone cascade (hover state).
 */
import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const INDEX = new URL('../index.html', import.meta.url).pathname;
const LIGHT_ORIGINAL = new URL('./_support-light-original.html', import.meta.url).pathname;
const ASSETS_ROOT = '/Users/tians/my-portfolio/public/case-studies/assets';

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

function encodeEntry(html, entry) {
  return {
    mime: entry?.mime || 'text/html',
    compressed: true,
    data: zlib.gzipSync(Buffer.from(html, 'utf8')).toString('base64'),
  };
}

function toDataUrl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext];
  if (!mime) throw new Error(`Unsupported type ${ext}: ${filePath}`);
  return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
}

function embedAssets(html) {
  let out = html;
  const refs = [...html.matchAll(/assets\/([a-zA-Z0-9._-]+)/g)].map((m) => m[1]);
  for (const name of [...new Set(refs)]) {
    const filePath = path.join(ASSETS_ROOT, name);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing asset: ${filePath}`);
    }
    out = out.split(`assets/${name}`).join(toDataUrl(filePath));
  }
  return out;
}

let lightHtml = fs.readFileSync(LIGHT_ORIGINAL, 'utf8');
lightHtml = embedAssets(lightHtml);

if (!lightHtml.includes('Case Study Cover — Light Mode')) {
  console.error('Light cover template missing expected title');
  process.exit(1);
}
if (!lightHtml.includes('phone-screen')) {
  console.error('Phone markup missing from light cover');
  process.exit(1);
}
if (/assets\/[a-zA-Z0-9._-]+/.test(lightHtml)) {
  console.error('Unresolved relative assets remain');
  process.exit(1);
}

const pageHtml = fs.readFileSync(INDEX, 'utf8');
const manifest = JSON.parse(
  pageHtml.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/)[1]
);
const ext = JSON.parse(
  pageHtml.match(/<script type="__bundler\/ext_resources">\s*([\s\S]*?)\s*<\/script>/)[1]
);
const supportLightUuid = ext.find((e) => e.id === 'supportLight')?.uuid;
if (!supportLightUuid) {
  console.error('supportLight not in ext_resources');
  process.exit(1);
}

manifest[supportLightUuid] = encodeEntry(lightHtml, manifest[supportLightUuid]);

const newPage = pageHtml.replace(
  pageHtml.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/)[1],
  JSON.stringify(manifest)
);
fs.writeFileSync(INDEX, newPage);

const light = zlib
  .gunzipSync(Buffer.from(manifest[supportLightUuid].data, 'base64'))
  .toString('utf8');
console.log('supportLight: phone cascade restored with embedded assets');
console.log('size:', light.length, 'chars');
