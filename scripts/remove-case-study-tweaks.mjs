/**
 * Remove TweaksPanel from case study pages; keep default tweak values via window globals.
 */
import fs from 'fs';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname;

const PATCHES = [
  {
    file: 'support-churn.html',
    oldApp: `    function App() {
      const [t, setTweak] = useTweaks(MOSAIC_DEFAULTS);

      // Expose the current mosaic choice on window so the Understand section can read it.
      React.useEffect(() => { window.__supportMosaic = t.mosaic; window.dispatchEvent(new Event("supportmosaic")); }, [t.mosaic]);

      return (
        <>
          <CaseStudySupportPage />
          <Footer />

          <TweaksPanel title="Tweaks">
            <TweakSection label="Understand — mosaic layout">
              <TweakSelect
                label="Variant"
                value={t.mosaic}
                onChange={v => setTweak("mosaic", v)}
                options={[
                  { value: "ai-discovery", label: "A. AI Discovery (current)" },
                  { value: "marquee",      label: "B. Marquee — wall of complaints" },
                  { value: "appstore",     label: "C. App Store — rating chart" },
                  { value: "editorial",    label: "D. Editorial — magazine pull-quote" },
                ]}
              />
            </TweakSection>
          </TweaksPanel>
        </>
      );
    }`,
    newApp: `    function App() {
      React.useEffect(() => {
        window.__supportMosaic = "marquee";
        window.dispatchEvent(new Event("supportmosaic"));
      }, []);

      return (
        <>
          <CaseStudySupportPage />
          <Footer />
        </>
      );
    }`,
  },
  {
    file: 'ai-caption.html',
    oldApp: `    function App() {
      const [t, setTweak] = useTweaks(AIC_DEFAULTS);

      React.useEffect(() => {
        window.__aicMosaic = t.mosaic;
        window.dispatchEvent(new Event("aicmosaic"));
      }, [t.mosaic]);

      React.useEffect(() => {
        window.__slackSide = t.slackSide;
        window.dispatchEvent(new Event("slackside"));
      }, [t.slackSide]);

      return (
        <>
          <CaseStudyPage />
          <Footer />

          <TweaksPanel title="Tweaks">
            <TweakSection label="Discovery — quote mosaic">
              <TweakSelect
                label="Variant"
                value={t.mosaic}
                onChange={v => setTweak("mosaic", v)}
                options={[
                  { value: "avalanche", label: "1. Notification Avalanche" },
                  { value: "themes",    label: "2. Theme Grid (3 columns)" },
                  { value: "rows",      label: "3. Theme Rows (horizontal)" },
                  { value: "bands",     label: "4. Theme Bands (stat-led)" },
                  { value: "original",  label: "Original (image)" },
                ]}
              />
            </TweakSection>
            <TweakSection label="Ideation — Slack sidebar">
              <TweakSelect
                label="Variant"
                value={t.slackSide}
                onChange={v => setTweak("slackSide", v)}
                options={[
                  { value: "original", label: "Original (channels + DMs)" },
                  { value: "project",  label: "A. Project Hub" },
                  { value: "activity", label: "B. Activity Feed" },
                ]}
              />
            </TweakSection>
          </TweaksPanel>
        </>
      );
    }`,
    newApp: `    function App() {
      React.useEffect(() => {
        window.__aicMosaic = "themes";
        window.dispatchEvent(new Event("aicmosaic"));
      }, []);

      React.useEffect(() => {
        window.__slackSide = "original";
        window.dispatchEvent(new Event("slackside"));
      }, []);

      return (
        <>
          <CaseStudyPage />
          <Footer />
        </>
      );
    }`,
  },
];

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

for (const { file, oldApp, newApp } of PATCHES) {
  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const { contentStart, contentEnd } = getTemplateBounds(html);
  let template = JSON.parse(html.slice(contentStart, contentEnd).trim());

  if (!template.includes('TweaksPanel title="Tweaks"')) {
    console.log(`${file}: Tweaks already removed`);
    continue;
  }
  if (!template.includes(oldApp)) {
    console.error(`${file}: App block mismatch — update remove-case-study-tweaks.mjs`);
    process.exit(1);
  }

  template = template.replace(oldApp, newApp);
  template = template.replace(
    '  <script type="text/babel" src="a377015d-8d44-46be-9b55-6c2cddace40a"></script>\n',
    ''
  );

  const newJson = encodeTemplateJson(template);
  html = html.slice(0, contentStart) + newJson + html.slice(contentEnd);
  fs.writeFileSync(filePath, html);
  console.log(`${file}: Tweaks removed`);
}
