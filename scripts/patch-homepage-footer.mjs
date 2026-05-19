/**
 * Remove Tweaks panel from homepage; fix LinkedIn URLs.
 */
import fs from 'fs';
import zlib from 'zlib';

const INDEX = new URL('../index.html', import.meta.url).pathname;
const LINKEDIN = 'https://www.linkedin.com/in/tian-s-7b2229a4/';

function getTemplateBounds(html) {
  const open = '<script type="__bundler/template">';
  const start = html.indexOf(open);
  if (start === -1) throw new Error('template tag not found');
  const contentStart = html.indexOf('>', start) + 1;
  const close = '\n  </script>';
  const contentEnd = html.indexOf(close, contentStart);
  if (contentEnd === -1) throw new Error('template close tag not found');
  return { contentStart, contentEnd };
}

function encodeTemplateJson(template) {
  return JSON.stringify(template).replace(/<\/script>/gi, '\\u003C/script\\u003E');
}

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

let html = fs.readFileSync(INDEX, 'utf8');
const { contentStart, contentEnd } = getTemplateBounds(html);
let template = JSON.parse(html.slice(contentStart, contentEnd).trim());

const appBlock = template.match(
  /const HOME_DEFAULTS[\s\S]*?root\.render\(<App \/>\);/
);
if (!appBlock) {
  console.error('Could not locate App block in template');
  process.exit(1);
}

const newAppBlock = `    function App() {
      const [menuOpen, setMenuOpen] = useState(false);

      return (
        <div data-screen-label="01 Homepage">
          <ChromeNav
            onHomeClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onMenuClick={() => setMenuOpen(true)}
          />
          <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
          <Hero />
          <CaseStudies />
          <Selfintro />
          <ExperienceTimeline labelStyle="active" />
          <Footer />
        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);`;

if (!template.includes('TweaksPanel title="Tweaks"')) {
  console.error('Tweaks panel already removed?');
  process.exit(1);
}

template = template.replace(appBlock[0], newAppBlock);
template = template.replace(
  '  <script type="text/babel" src="a377015d-8d44-46be-9b55-6c2cddace40a"></script>\n',
  ''
);

const newTemplateJson = encodeTemplateJson(template);
html =
  html.slice(0, contentStart) + newTemplateJson + html.slice(contentEnd);

const manifest = JSON.parse(
  html.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/)[1]
);

const footerUuid = '2ba41876-af4c-4eeb-88e5-fd0f0dc261fd';
const heroUuid = 'e60b3777-11fd-4f85-b2dc-d66565a73aee';

let footer = decodeEntry(manifest[footerUuid]).toString('utf8');
footer = footer.replace(
  '<a href="#" onClick={(e) => e.preventDefault()} className="footer-linkedin" aria-label="LinkedIn">',
  `<a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer" className="footer-linkedin" aria-label="LinkedIn">`
);
manifest[footerUuid] = encodeEntry(footer, manifest[footerUuid]);

let hero = decodeEntry(manifest[heroUuid]).toString('utf8');
hero = hero.replace(
  '<a href="#" className="menu-li" onClick={(e) => e.preventDefault()}>\n          LinkedIn',
  `<a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer" className="menu-li">\n          LinkedIn`
);
manifest[heroUuid] = encodeEntry(hero, manifest[heroUuid]);

html = html.replace(
  html.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/)[1],
  JSON.stringify(manifest)
);

fs.writeFileSync(INDEX, html);
console.log('Patched: Tweaks removed, LinkedIn updated');
