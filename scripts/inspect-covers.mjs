import fs from 'fs';
import zlib from 'zlib';

const html = fs.readFileSync('index.html', 'utf8');
const manifestText = html.match(
  /<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/
)?.[1];
const extText = html.match(
  /<script type="__bundler\/ext_resources">\s*([\s\S]*?)\s*<\/script>/
)?.[1];
if (!manifestText || !extText) {
  console.error('missing manifest or ext_resources');
  process.exit(1);
}
const manifest = JSON.parse(manifestText);
const ext = JSON.parse(extText);

function decodeEntry(entry) {
  const b64 = typeof entry === 'string' ? entry : entry?.data ?? entry?.gzip;
  if (!b64) throw new Error('unknown entry shape: ' + JSON.stringify(entry).slice(0, 80));
  const raw = Buffer.from(b64, 'base64');
  const buf =
    typeof entry === 'object' && entry.compressed === false
      ? raw
      : zlib.gunzipSync(raw);
  return buf.toString('utf8');
}

const sampleUuid = ext.find((e) => e.id === 'supportDark')?.uuid;
if (sampleUuid) {
  console.log('sample entry keys', Object.keys(manifest[sampleUuid] || manifest[sampleUuid]));
  console.log('sample type', typeof manifest[sampleUuid]);
}

const ids = ['supportDark', 'supportLight', 'aiDark', 'aiLight', 'arloDark', 'arloLight'];
for (const { id, uuid } of ext.filter((e) => ids.includes(e.id))) {
  const entry = manifest[uuid];
  if (!entry) {
    console.log(id, 'MISSING uuid', uuid);
    continue;
  }
  const text = decodeEntry(entry);
  const assets = [...text.matchAll(/assets\/[a-zA-Z0-9._-]+/g)].map((x) => x[0]);
  console.log(id, uuid, 'len', text.length, 'assets', [...new Set(assets)]);
}
