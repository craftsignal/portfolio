/**
 * Portfolio updates:
 * 1. Swap AI Captions / Proactive Safety order in homepage + read-next sections
 * 2. Restore subtle top-left hero light on case study pages
 * 3. Align mobile screen captions under their corresponding phones (support-churn)
 */
import fs from "fs";
import path from "path";
import zlib from "zlib";
import { fileURLToPath } from "url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const CASE_STUDY_FILES = [
  "index.html",
  "support-churn.html",
  "ai-caption.html",
  "crime-feature.html",
];

function getTemplateBounds(html) {
  const open = '<script type="__bundler/template">';
  const start = html.indexOf(open);
  if (start === -1) throw new Error("template tag not found");
  const contentStart = html.indexOf(">", start) + 1;
  const contentEnd = html.indexOf("</script>", contentStart);
  if (contentEnd === -1) throw new Error("template close tag not found");
  return { contentStart, contentEnd };
}

function getManifestBounds(html) {
  const open = '<script type="__bundler/manifest">';
  const start = html.indexOf(open);
  if (start === -1) throw new Error("manifest tag not found");
  const contentStart = html.indexOf(">", start) + 1;
  const contentEnd = html.indexOf("</script>", contentStart);
  if (contentEnd === -1) throw new Error("manifest close tag not found");
  return { contentStart, contentEnd };
}

function encodeTemplateJson(template) {
  return JSON.stringify(template).replace(/<\/script>/gi, "\\u003C/script\\u003E");
}

function decodeEntry(entry) {
  const raw = Buffer.from(entry.data, "base64");
  return (entry.compressed ? zlib.gunzipSync(raw) : raw).toString("utf8");
}

function encodeEntry(text, entry) {
  return {
    ...entry,
    mime: entry.mime || "application/javascript",
    compressed: true,
    data: zlib.gzipSync(Buffer.from(text, "utf8")).toString("base64"),
  };
}

const CS_WASH_BLOCK = `.cs-wash {
  position: absolute; inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 18% 22% at 6% -2%,
      rgba(255, 252, 240, 0.55) 0%,
      rgba(255, 250, 232, 0.28) 35%,
      rgba(255, 248, 224, 0.10) 60%,
      transparent 80%),
    radial-gradient(ellipse 65% 55% at 4% -10%,
      rgba(255, 250, 235, 0.12) 0%,
      rgba(255, 248, 230, 0.04) 40%,
      transparent 70%),
    linear-gradient(to bottom right, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.28) 32%, rgba(255,255,255,0.06) 52%, transparent 72%);
}`;

function patchTemplateCss(template) {
  const washRe = /\.cs-wash \{[\s\S]*?\n\}/;
  if (!washRe.test(template)) {
    throw new Error("Expected .cs-wash block not found in template");
  }
  template = template.replace(washRe, CS_WASH_BLOCK);

  const oldMobileCss = `.sup-mobile-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  justify-items: center;
  margin-top: 24px;
}
@media (max-width: 768px) { .sup-mobile-3 { grid-template-columns: 1fr; } }
.sup-mobile-cell { width: 100%; max-width: 260px; }
.sup-mobile-cell img {
  width: 100%; height: auto; display: block;
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 18px 32px -10px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.04);
}
.sup-mobile-caps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 28px;
}
@media (max-width: 768px) { .sup-mobile-caps { grid-template-columns: 1fr; } }
.sup-mobile-caps strong {
  display: block;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: #000;
  margin-bottom: 4px;
}
.sup-mobile-caps p {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--ink-600);
}`;

  const newMobileCss = `.sup-mobile-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: start;
  margin-top: 24px;
}
@media (max-width: 768px) { .sup-mobile-3 { grid-template-columns: 1fr; } }
.sup-mobile-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sup-mobile-cell { width: 100%; max-width: 260px; }
.sup-mobile-cell img {
  width: 100%; height: auto; display: block;
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 18px 32px -10px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.04);
}
.sup-mobile-cap {
  width: 100%;
  max-width: 260px;
  margin-top: 28px;
}
.sup-mobile-cap strong {
  display: block;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: #000;
  margin-bottom: 4px;
}
.sup-mobile-cap p {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--ink-600);
}`;

  if (template.includes(oldMobileCss)) {
    template = template.replace(oldMobileCss, newMobileCss);
  }

  return template;
}

function ensureHomepageCaseStudyOrder(text) {
  const blockRe =
    /const CASE_STUDIES = \[[\s\S]*?\/\/ Hidden — Reimagining Arlo Safe's History View Experience/;
  const match = text.match(blockRe);
  if (!match) return text;

  const supportEntryRe =
    /\{\s*title: "Enhancing Support to Reduce Returns and Churn",[\s\S]*?href: "support-churn\.html",\s*\},/;
  const aiEntryRe =
    /\{\s*title: "Beyond Generic Alerts: Boosting Premium Subscriptions with AI Event Captions",[\s\S]*?href: "ai-caption\.html",\s*\},/;
  const proactiveEntryRe =
    /\{\s*title: "Elevating proactive safety for 6 million users",[\s\S]*?href: "crime-feature\.html",\s*\},/;

  const block = match[0];
  const support = block.match(supportEntryRe)?.[0];
  const ai = block.match(aiEntryRe)?.[0];
  const proactive = block.match(proactiveEntryRe)?.[0];
  if (!support || !ai || !proactive) return text;

  const reordered = `const CASE_STUDIES = [
  ${support}
  ${ai}
  ${proactive}
  // Hidden — Reimagining Arlo Safe's History View Experience`;
  return text.replace(block, reordered);
}

const READNEXT_PROACTIVE_FIRST = `<ReadNextCard
          title="Elevating proactive safety for 6 million users"
          tags={["Mobile", "Growth Strategy"]}
          href="crime-feature.html"
          htmlCoverDark={(window.__resources||{}).arloDark}
          htmlCoverLight={(window.__resources||{}).arloLight}
          launched
        />
        <ReadNextCard
          title="Beyond Generic Alerts: Boosting Premium Subscriptions with AI Event Captions"
          tags={["AI", "Growth Strategy"]}
          href="ai-caption.html"
          htmlCoverDark={(window.__resources||{}).aiDark}
          htmlCoverLight={(window.__resources||{}).aiLight}
          launched
        />`;

const READNEXT_AI_FIRST = `<ReadNextCard
          title="Beyond Generic Alerts: Boosting Premium Subscriptions with AI Event Captions"
          tags={["AI", "Growth Strategy"]}
          href="ai-caption.html"
          htmlCoverDark={(window.__resources||{}).aiDark}
          htmlCoverLight={(window.__resources||{}).aiLight}
          launched
        />
        <ReadNextCard
          title="Elevating proactive safety for 6 million users"
          tags={["Mobile", "Growth Strategy"]}
          href="crime-feature.html"
          htmlCoverDark={(window.__resources||{}).arloDark}
          htmlCoverLight={(window.__resources||{}).arloLight}
          launched
        />`;

function swapReadNextCards(text) {
  if (text.includes(READNEXT_PROACTIVE_FIRST)) {
    return text.replace(READNEXT_PROACTIVE_FIRST, READNEXT_AI_FIRST);
  }
  return text;
}

function swapReadNextInlineTemplate(text) {
  const proactiveFirst = `<a className="case-card-link" href="crime-feature.html">
                  <div className="case-card-cover case-card-cover--html">
                    <iframe
                      className="case-card-html case-card-html--light"
                      src={__RC.arloLight`;
  if (!text.includes(proactiveFirst)) return text;

  const blockRe =
    /(<div className="cs-readnext-grid">)[\s\S]*?(<\/div>\s*<\/section>)/;
  const match = text.match(blockRe);
  if (!match) return text;

  const grid = match[0];
  const cards = [...grid.matchAll(/<a className="case-card-link" href="([^"]+)"[\s\S]*?(?=<a className="case-card-link"|$)/g)];
  if (cards.length !== 2) return text;

  const hrefs = cards.map((c) => c[1]);
  if (!hrefs.includes("crime-feature.html") || !hrefs.includes("ai-caption.html")) {
    return text;
  }
  if (hrefs[0] === "ai-caption.html") return text;

  const swappedGrid = grid.replace(cards[0][0], "__CARD_A__").replace(cards[1][0], cards[0][0]).replace("__CARD_A__", cards[1][0]);
  return text.replace(grid, swappedGrid);
}

function patchSupportOutcomes(text) {
  const oldBlock = `        <div className="sup-mobile-3">
          <div className="sup-mobile-cell">
            <img src={(window.__resources||{}).phone1Support} alt="We are here to help — three support paths" />
          </div>
          <div className="sup-mobile-cell">
            <img src={(window.__resources||{}).phone3} alt="Your phone call request has been received confirmation" />
          </div>
          <div className="sup-mobile-cell">
            <img src={(window.__resources||{}).phone2} alt="To call the next available agent — keypad flow" />
          </div>
        </div>
        <div className="sup-mobile-caps">
          <div>
            <strong>We are here to help.</strong>
            <p>Three primary paths (phone, chat, self-serve) replace a single buried link.</p>
          </div>
          <div>
            <strong>Call request received.</strong>
            <p>Reassurance + ability to cancel removes the "did anyone see my request?" anxiety.</p>
          </div>
          <div>
            <strong>Live wait estimate.</strong>
            <p>The keypad confirms the number to dial, plus the next-available-agent ETA.</p>
          </div>
        </div>`;

  const newBlock = `        <div className="sup-mobile-3">
          <div className="sup-mobile-col">
            <div className="sup-mobile-cell">
              <img src={(window.__resources||{}).phone1Support} alt="We are here to help — three support paths" />
            </div>
            <div className="sup-mobile-cap">
              <strong>We are here to help.</strong>
              <p>Three primary paths (phone, chat, self-serve) replace a single buried link.</p>
            </div>
          </div>
          <div className="sup-mobile-col">
            <div className="sup-mobile-cell">
              <img src={(window.__resources||{}).phone3} alt="Your phone call request has been received confirmation" />
            </div>
            <div className="sup-mobile-cap">
              <strong>Call request received.</strong>
              <p>Reassurance + ability to cancel removes the "did anyone see my request?" anxiety.</p>
            </div>
          </div>
          <div className="sup-mobile-col">
            <div className="sup-mobile-cell">
              <img src={(window.__resources||{}).phone2} alt="To call the next available agent — keypad flow" />
            </div>
            <div className="sup-mobile-cap">
              <strong>Live wait estimate.</strong>
              <p>The keypad confirms the number to dial, plus the next-available-agent ETA.</p>
            </div>
          </div>
        </div>`;

  if (text.includes(oldBlock)) {
    return text.replace(oldBlock, newBlock);
  }
  if (text.includes("sup-mobile-col")) {
    return text;
  }
  throw new Error("Support outcomes mobile block not found");
}

function patchManifest(manifest, mutator) {
  let changed = false;
  for (const [uid, entry] of Object.entries(manifest)) {
    if (!entry?.data) continue;
    let text;
    try {
      text = decodeEntry(entry);
    } catch {
      continue;
    }
    const next = mutator(text, uid);
    if (next !== text) {
      manifest[uid] = encodeEntry(next, entry);
      changed = true;
    }
  }
  return changed;
}

for (const file of CASE_STUDY_FILES) {
  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, "utf8");
  const { contentStart, contentEnd } = getTemplateBounds(html);
  let template = JSON.parse(html.slice(contentStart, contentEnd).trim());
  template = patchTemplateCss(template);
  template = swapReadNextInlineTemplate(template);
  html = html.slice(0, contentStart) + encodeTemplateJson(template) + html.slice(contentEnd);

  const manifestBounds = getManifestBounds(html);
  const manifest = JSON.parse(html.slice(manifestBounds.contentStart, manifestBounds.contentEnd).trim());

  const manifestChanged = patchManifest(manifest, (text, uid) => {
    let next = text;
    if (file === "index.html" && uid === "4dfd96eb-105b-4c9c-b99f-57c7a63f9972") {
      next = ensureHomepageCaseStudyOrder(next);
    }
    next = swapReadNextCards(next);
    if (file === "support-churn.html" && next.includes("function CaseStudySupportOutcomes")) {
      next = patchSupportOutcomes(next);
    }
    return next;
  });

  if (manifestChanged) {
    html =
      html.slice(0, manifestBounds.contentStart) +
      JSON.stringify(manifest) +
      html.slice(manifestBounds.contentEnd);
  }

  fs.writeFileSync(filePath, html);
  console.log(`Patched ${file}`);
}
