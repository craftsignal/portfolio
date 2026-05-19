import fs from 'fs';
import zlib from 'zlib';

const html = fs.readFileSync('index.html', 'utf8');
const manifest = JSON.parse(
  html.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/)[1]
);
const ext = JSON.parse(
  html.match(/<script type="__bundler\/ext_resources">\s*([\s\S]*?)\s*<\/script>/)[1]
);
const extByUuid = Object.fromEntries(ext.map((e) => [e.uuid, e.id]));

function decodeData(entry) {
  const raw = Buffer.from(entry.data, 'base64');
  if (entry.compressed) return zlib.gunzipSync(raw);
  return raw;
}

for (const [uuid, entry] of Object.entries(manifest)) {
  const mime = entry.mime || '';
  if (!mime.startsWith('image/')) continue;
  let buf;
  try {
    buf = decodeData(entry);
  } catch (e) {
    console.log(uuid, mime, 'decode failed', e.message);
    continue;
  }
  const id = extByUuid[uuid] || '';
  console.log(uuid, mime, buf.length, id || '(no ext id)');
}
