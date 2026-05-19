/**
 * Restore supportLight cover: light theme + desktop Support Center screenshot (no phones).
 */
import fs from 'fs';
import zlib from 'zlib';

const INDEX = new URL('../index.html', import.meta.url).pathname;
const LIGHT_ORIGINAL = new URL('./_support-light-original.html', import.meta.url).pathname;
const HERO = new URL('./support-cover-hero.png', import.meta.url).pathname;

function encodeEntry(html, entry) {
  return {
    mime: entry?.mime || 'text/html',
    compressed: true,
    data: zlib.gzipSync(Buffer.from(html, 'utf8')).toString('base64'),
  };
}

const dataUrl = `data:image/png;base64,${fs.readFileSync(HERO).toString('base64')}`;

const showcaseCss = `
  /* --- left: desktop showcase (light) --- */
  .showcase {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 90px;
    pointer-events: none;
  }
  .showcase-stack {
    position: relative;
    width: 1020px;
    height: 100%;
  }
  .shot-new {
    position: absolute;
    width: 1020px;
    height: auto;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 22px;
    overflow: hidden;
    background: #fff;
    box-shadow:
      0 40px 80px rgba(150, 165, 180, 0.35),
      0 0 0 1px rgba(255, 255, 255, 0.95),
      0 0 60px rgba(26, 142, 179, 0.18);
  }
  .shot-new img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const showcaseHtml = `      <div class="grid">
        <div class="showcase">
          <div class="showcase-stack">
            <div class="shot-new">
              <img src="${dataUrl}" alt="Redesigned Arlo Support Center" />
            </div>
          </div>
        </div>
      </div>`;

let lightHtml = fs.readFileSync(LIGHT_ORIGINAL, 'utf8');

lightHtml = lightHtml.replace(
  /\/\* phones cascade \*\/[\s\S]*?\/\* "Launched" badge/,
  showcaseCss + '\n  /* "Launched" badge'
);

lightHtml = lightHtml.replace(
  /<!-- main grid — phone zipper cascade -->[\s\S]*?<!-- Open case study chip -->/,
  `<!-- main grid — desktop showcase -->\n${showcaseHtml}\n\n      <!-- Open case study chip -->`
);

if (!lightHtml.includes('Case Study Cover — Light Mode')) {
  console.error('Light cover template missing expected title');
  process.exit(1);
}
if (!lightHtml.includes(dataUrl.slice(0, 60))) {
  console.error('Failed to embed hero image in light cover');
  process.exit(1);
}
if (lightHtml.includes('phone-screen')) {
  console.error('Phone markup still present in light cover');
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
const supportDarkUuid = ext.find((e) => e.id === 'supportDark')?.uuid;

manifest[supportLightUuid] = encodeEntry(lightHtml, manifest[supportLightUuid]);

const newPage = pageHtml.replace(
  pageHtml.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/)[1],
  JSON.stringify(manifest)
);
fs.writeFileSync(INDEX, newPage);

const dark = zlib.gunzipSync(Buffer.from(manifest[supportDarkUuid].data, 'base64')).toString('utf8');
const light = zlib.gunzipSync(Buffer.from(manifest[supportLightUuid].data, 'base64')).toString('utf8');
console.log('supportLight: restored light theme with desktop UI');
console.log('covers differ:', dark !== light);
console.log('light title:', light.match(/<title>([^<]+)/)?.[1]);
