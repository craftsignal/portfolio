/**
 * Fix bundled JSX scripts where Babel renamed __R to __R7/__R9 but left
 * mismatched usages, or where __R is undefined at runtime.
 * Replaces all __R* resource access with (window.__resources||{}).
 */
import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const FILES = ['index.html', 'support-churn.html', 'ai-caption.html', 'crime-feature.html'];

const RES = '(window.__resources||{})';
const __R_DEF_RE = /^const __R = \(typeof window[^\n]*\n\n?/m;

function decodeEntry(entry) {
  const raw = Buffer.from(entry.data, 'base64');
  return entry.compressed ? zlib.gunzipSync(raw) : raw;
}

function encodeEntry(text, entry) {
  return {
    ...entry,
    mime: entry.mime || 'application/javascript',
    compressed: true,
    data: zlib.gzipSync(Buffer.from(text, 'utf8')).toString('base64'),
  };
}

function fixScript(source) {
  if (!/\b__R[a-zA-Z0-9]*/.test(source)) return { text: source, changed: false };

  let text = source;
  const before = text;

  text = text.replace(__R_DEF_RE, '');
  text = text.replace(/\b__R[a-zA-Z0-9]*\./g, `${RES}.`);
  text = text.replace(/\b__R[a-zA-Z0-9]*\[/g, `${RES}[`);

  return { text, changed: text !== before };
}

function patchBootstrap(html) {
  const needle =
    "';</' + 'script>";
  const replacement =
    "';window.__R=window.__resources;</' + 'script>";
  if (html.includes('window.__R=window.__resources')) return html;
  if (!html.includes(needle)) return html;
  return html.replace(needle, replacement);
}

for (const file of FILES) {
  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const manifestMatch = html.match(
    /<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/
  );
  if (!manifestMatch) {
    console.log(`${file}: no manifest`);
    continue;
  }

  const manifest = JSON.parse(manifestMatch[1]);
  let fixed = 0;

  for (const [uuid, entry] of Object.entries(manifest)) {
    if (!entry.mime?.includes('javascript')) continue;
    const source = decodeEntry(entry).toString('utf8');
    const { text, changed } = fixScript(source);
    if (changed) {
      manifest[uuid] = encodeEntry(text, entry);
      fixed++;
    }
  }

  const nextHtml = patchBootstrap(
    fixed > 0 ? html.replace(manifestMatch[1], JSON.stringify(manifest)) : html
  );
  if (nextHtml !== html) {
    fs.writeFileSync(filePath, nextHtml);
    console.log(`${file}: fixed ${fixed} script(s), bootstrap patched`);
  } else if (fixed > 0) {
    fs.writeFileSync(filePath, nextHtml);
    console.log(`${file}: fixed ${fixed} script(s)`);
  } else {
    console.log(`${file}: ok`);
  }
}
