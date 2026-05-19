/**
 * Patch homepage burger menu only (CSS + MenuOverlay in index.html).
 */
import fs from 'fs';
import zlib from 'zlib';

const INDEX = new URL('../index.html', import.meta.url).pathname;
const MENU_SCRIPT_UUID = 'e60b3777-11fd-4f85-b2dc-d66565a73aee';

const OLD_MENU_CSS = `/* -----------------------------------------------------------
   MenuOverlay
   ----------------------------------------------------------- */
.menu-fixed { position: fixed; inset: 0; z-index: 100; }
.menu-scrim {
  position: absolute; inset: 0;
  background: rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 0; padding: 0;
  cursor: pointer;
}
.menu-card {
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  width: min(calc(100vw - 2.5rem), 380px);
  background: rgba(247, 247, 245, 0.97);
  padding: 32px 32px 40px;
  border-radius: 28px;
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.12),
    0 2px 0 rgba(255, 255, 255, 0.65) inset,
    0 0 0 0.5px rgba(0, 0, 0, 0.06);
  font-family: var(--font-sans);
}
.menu-close {
  position: absolute; right: 18px; top: 18px;
  width: 40px; height: 40px;
  border-radius: 999px;
  display: flex; align-items: center; justify-content: center;
  color: var(--ink-700);
  font-size: 22px;
  line-height: 1;
  transition: background var(--motion-fast) var(--ease-standard);
}
.menu-close:hover { background: rgba(0, 0, 0, 0.04); color: var(--ink-900); }
.menu-nav {
  display: flex; flex-direction: column;
  gap: 4px;
  margin-top: 12px;
  padding-right: 32px;
}
.menu-nav a {
  font-family: var(--font-serif-display);
  font-weight: 400;
  font-size: 2.35rem;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--ink-900);
  padding: 12px;
  margin: 0 -12px;
  border-radius: 12px;
  transition: background var(--motion-fast) var(--ease-standard);
}
.menu-nav a:hover { background: rgba(0, 0, 0, 0.03); }
.menu-divider { height: 1px; background: rgba(0, 0, 0, 0.06); margin: 32px 0 28px; }
.menu-li {
  display: inline-flex;
  align-items: center; justify-content: center; gap: 8px;
  width: 100%;
  background: var(--ink-950);
  color: var(--fg-inverse);
  padding: 14px 0;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: -0.01em;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.18);
  transition: opacity var(--motion-fast) var(--ease-standard), transform var(--motion-fast) var(--ease-standard);
}
.menu-li:hover { opacity: 0.96; }
.menu-li:active { transform: scale(0.99); }`;

const NEW_MENU_CSS = `/* -----------------------------------------------------------
   MenuOverlay — top-right floating card
   ----------------------------------------------------------- */
.menu-fixed { position: fixed; inset: 0; z-index: 100; pointer-events: none; }
.menu-scrim {
  position: absolute; inset: 0;
  background: transparent;
  border: 0; padding: 0; margin: 0;
  cursor: default;
  pointer-events: auto;
}
.menu-card {
  position: absolute;
  top: 72px;
  right: 28px;
  width: min(calc(100vw - 2.5rem), 280px);
  background: #fff;
  padding: 20px 20px 24px;
  border-radius: 20px;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.06);
  font-family: var(--font-sans);
  pointer-events: auto;
}
@media (max-width: 640px) {
  .menu-card { top: 66px; right: 20px; }
}
.menu-close {
  position: absolute; right: 14px; top: 14px;
  width: 32px; height: 32px;
  border-radius: 999px;
  display: flex; align-items: center; justify-content: center;
  color: var(--ink-700);
  font-size: 22px;
  line-height: 1;
  transition: background var(--motion-fast) var(--ease-standard);
}
.menu-close:hover { background: rgba(0, 0, 0, 0.05); color: var(--ink-900); }
.menu-nav {
  display: flex; flex-direction: column;
  gap: 2px;
  margin-top: 4px;
  padding-right: 28px;
}
.menu-nav a {
  font-family: var(--font-serif-display);
  font-weight: 400;
  font-size: 2.35rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--ink-900);
  padding: 8px 0;
  margin: 0;
  border-radius: 0;
  transition: opacity var(--motion-fast) var(--ease-standard);
  text-decoration: none;
}
.menu-nav a:hover { opacity: 0.65; background: transparent; }
.menu-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}
.menu-linkedin {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px; height: 44px;
  background: var(--ink-800);
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: background var(--motion-fast) var(--ease-standard);
}
.menu-linkedin:hover { background: var(--ink-700); }
.menu-linkedin svg { width: 20px; height: 20px; display: block; }`;

const OLD_MENU_JS = `/* =============================================================
   MenuOverlay — scrim + blurred backdrop + serif nav list
   ============================================================= */
function MenuOverlay({ open, onClose, onNavigate }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const items = ["Work", "About", "Contact"];

  return (
    <motion.div className="menu-fixed">
      <button type="button" aria-label="Dismiss menu" className="menu-scrim" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label="Site menu" className="menu-card">
        <button type="button" onClick={onClose} aria-label="Close" className="menu-close">×</button>
        <nav className="menu-nav" aria-label="Primary">
          {items.map((label) => (
            <a key={label} href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(label); onClose(); }}>
              {label}
            </a>
          ))}
        </nav>
        <div className="menu-divider" />
        <a href="https://www.linkedin.com/in/tian-s-7b2229a4/" target="_blank" rel="noopener noreferrer" className="menu-li">
          LinkedIn <span aria-hidden style={{ fontWeight: 300, fontSize: 14 }}>↗</span>
        </a>
      </div>
    </div>
  );
}`;

const NEW_MENU_JS = `/* =============================================================
   MenuOverlay — top-right floating card near burger
   ============================================================= */
function MenuOverlay({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const scrollToSection = (label) => {
    const selector =
      label === "Work" ? ".case-studies" :
      label === "About" ? "#about" :
      label === "Contact" ? ".site-footer" : null;
    const el = selector && document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onNavClick = (e, label) => {
    e.preventDefault();
    scrollToSection(label);
    onClose();
  };

  if (!open) return null;
  const items = ["Work", "About", "Contact"];

  return (
    <div className="menu-fixed">
      <button type="button" aria-label="Dismiss menu" className="menu-scrim" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label="Site menu" className="menu-card">
        <button type="button" onClick={onClose} aria-label="Close" className="menu-close">×</button>
        <nav className="menu-nav" aria-label="Primary">
          {items.map((label) => (
            <a key={label} href="#" onClick={(e) => onNavClick(e, label)}>
              {label}
            </a>
          ))}
        </nav>
        <motion.div className="menu-footer">
          <a
            href="https://www.linkedin.com/in/tian-s-7b2229a4/"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-linkedin"
            aria-label="LinkedIn"
            onClick={() => onClose()}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}`;

// Fix accidental motion.div in NEW_MENU_JS template string
const NEW_MENU_JS_CLEAN = NEW_MENU_JS
  .replace('<motion.div className="menu-footer">', '<div className="menu-footer">')
  .replace('        </motion.div>\n      </motion.div>', '        </div>\n      </div>');

// Fix OLD_MENU_JS - actual source uses div not motion.div
const OLD_MENU_JS_CLEAN = OLD_MENU_JS.replace(
  '<motion.div className="menu-fixed">',
  '<div className="menu-fixed">'
);

function getTemplateBounds(html) {
  const open = '<script type="__bundler/template">';
  const start = html.indexOf(open);
  const contentStart = html.indexOf('>', start) + 1;
  const contentEnd = html.indexOf('\n  </script>', contentStart);
  if (contentEnd === -1) throw new Error('template close not found');
  return { contentStart, contentEnd };
}

function encodeTemplateJson(template) {
  return JSON.stringify(template).replace(/<\/script>/gi, '\\u003C/script\\u003E');
}

let html = fs.readFileSync(INDEX, 'utf8');
const { contentStart, contentEnd } = getTemplateBounds(html);
let template = JSON.parse(html.slice(contentStart, contentEnd).trim());

if (!template.includes(OLD_MENU_CSS)) {
  console.error('Old menu CSS block not found');
  process.exit(1);
}
template = template.replace(OLD_MENU_CSS, NEW_MENU_CSS);

const manifest = JSON.parse(
  html.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/)[1]
);
const entry = manifest[MENU_SCRIPT_UUID];
let script = zlib.gunzipSync(Buffer.from(entry.data, 'base64')).toString('utf8');

if (!script.includes('function MenuOverlay({ open, onClose, onNavigate })')) {
  console.error('Old MenuOverlay JS not found');
  process.exit(1);
}

const oldStart = script.indexOf('/* =============================================================\n   MenuOverlay');
const oldEnd = script.indexOf('/* =============================================================\n   ResumeCTA');
if (oldStart < 0 || oldEnd < 0) {
  console.error('Could not locate MenuOverlay block boundaries');
  process.exit(1);
}
script = script.slice(0, oldStart) + NEW_MENU_JS_CLEAN + '\n\n' + script.slice(oldEnd);

manifest[MENU_SCRIPT_UUID] = {
  ...entry,
  mime: entry.mime || 'application/javascript',
  compressed: true,
  data: zlib.gzipSync(Buffer.from(script, 'utf8')).toString('base64'),
};

const newTemplateJson = encodeTemplateJson(template);
html =
  html.slice(0, contentStart) +
  newTemplateJson +
  html.slice(contentEnd);
html = html.replace(
  html.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/)[1],
  JSON.stringify(manifest)
);

fs.writeFileSync(INDEX, html);
console.log('Burger menu patched in index.html');
