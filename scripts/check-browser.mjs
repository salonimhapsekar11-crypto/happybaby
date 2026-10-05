// Browser checks against the built Storybook (storybook-static):
// 1. axe accessibility on every story and docs page, in Dark and Light
// 2. no horizontal scroll at 320, 390, 768, 1024, 1440
// 3. Button: rendered sizes, fonts, colours and focus ring match the Figma component
// Run: npm run build-storybook && node scripts/check-browser.mjs
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = join(root, 'storybook-static');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  const f = join(dir, p === '/' ? 'index.html' : p);
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;
const index = JSON.parse(readFileSync(join(dir, 'index.json'), 'utf8'));
const entries = Object.values(index.entries);
mkdirSync(join(root, 'reports/screens'), { recursive: true });

const browser = await chromium.launch();
let failures = 0;
const log = (ok, name, detail = '') => { if (!ok) failures++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(70)} ${detail}`); };

// ---- 1. axe on every entry, both themes
for (const theme of ['dark', 'light']) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  let total = 0, bad = [];
  for (const e of entries) {
    const mode = e.type === 'docs' ? 'docs' : 'story';
    await page.goto(`${base}/iframe.html?id=${e.id}&viewMode=${mode}&globals=theme:${theme}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const builder = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']);
    // On docs pages, test our content only: Storybook's own Controls table and code highlighter are not ours.
    if (mode === 'docs') builder.exclude('.docblock-argstable').exclude('.docblock-source').exclude('.prismjs');
    const r = await builder.analyze();
    total++;
    const serious = r.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    if (serious.length) bad.push(`${e.id}: ${serious.map((v) => `${v.id}(${v.nodes.length})`).join(', ')}`);
  }
  log(bad.length === 0, `axe serious/critical (${theme}): ${total} stories and docs pages`, bad.slice(0, 6).join(' | '));
  await ctx.close();
}

// ---- 2. no horizontal scroll
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const targets = entries.filter((e) => e.type === 'docs');
  const wide = [];
  for (const w of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width: w, height: 900 });
    for (const e of targets) {
      await page.goto(`${base}/iframe.html?id=${e.id}&viewMode=docs`, { waitUntil: 'networkidle' });
      // Storybook's own Controls table (.docblock-argstable) is not part of our code, so it is not measured.
      const over = await page.evaluate(() => {
        const W = document.documentElement.clientWidth;
        const offenders = [...document.querySelectorAll('body *')].filter((el) => !el.closest('.docblock-argstable') && el.getBoundingClientRect().right > W + 1 && !el.closest('[style*="overflow"], .sb-unstyled > div'));
        return offenders.length;
      });
      if (over > 0) wide.push(`${e.id}@${w} (${over} elements)`);
    }
  }
  log(wide.length === 0, `Our docs content fits at 320, 390, 768, 1024, 1440 (${targets.length} pages)`, wide.slice(0, 6).join(' | '));
  await ctx.close();
}

// ---- 3. Button matches Figma
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/iframe.html?id=atoms-button--state-matrix&viewMode=story`, { waitUntil: 'networkidle' });
  await page.waitForSelector('button[data-variant]');
  const rows = await page.evaluate(() => [...document.querySelectorAll('button[data-variant]')].map((b) => {
    const cs = getComputedStyle(b), r = b.getBoundingClientRect();
    return { v: b.dataset.variant, s: b.dataset.size, state: b.dataset.forceState || (b.disabled ? 'disabled' : 'default'), h: Math.round(r.height), w: Math.round(r.width), font: cs.fontSize, weight: cs.fontWeight, family: cs.fontFamily.split(',')[0], radius: cs.borderTopLeftRadius, bg: cs.backgroundColor, fg: cs.color, outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineOffset + ' ' + cs.outlineColor, circle: (() => { const c = b.querySelector('span[class*=circle]'); if (!c) return null; const k = getComputedStyle(c); const r = c.getBoundingClientRect(); return { bg: k.backgroundColor, fg: k.color, w: Math.round(r.width) }; })() };
  }));
  const rgb = (hex) => { const n = parseInt(hex.slice(1), 16); return `rgb(${n >> 16}, ${(n >> 8) & 255}, ${n & 255})`; };
  const figma = JSON.parse(readFileSync(join(root, 'tokens/figma-export.json'), 'utf8'));
  const dark = (t) => rgb(figma.primitives[figma.alias[t].dark]);
  const expect = (v0, st) => {
    let v = v0;
    const sfx = st === 'pressed' ? '-pressed' : '';
    if (st === 'disabled') return { bg: (v === 'ghost' || v === 'link') ? 'rgba(0, 0, 0, 0)' : dark('action/disabled/bg'), fg: dark('action/disabled/text') };
    // Hover is yellow/500 with a purple/700 label for every variant.
    if (st === 'hover' && v === 'link') return { bg: 'rgba(0, 0, 0, 0)', fg: dark('text/link-hover') };
    if (st === 'hover') return { bg: dark('action/hover/bg'), fg: dark('action/hover/text') };
    if (v === 'right-icon') v = 'attention';
    if (v === 'ghost') return { bg: st === 'pressed' ? dark('action/default/bg') : 'rgba(0, 0, 0, 0)', fg: st === 'pressed' ? dark('action/default/text') : dark('text/primary') };
    if (v === 'link') return { bg: 'rgba(0, 0, 0, 0)', fg: st === 'pressed' ? dark('text/secondary') : dark('text/link') };
    return { bg: dark(`action/${v}/bg${sfx}`), fg: dark(`action/${v}/text`) };
  };
  const errs = [];
  for (const b of rows) {
    if (b.h !== (b.s === 'sm' ? 44 : 56)) errs.push(`${b.v}/${b.s}/${b.state} height ${b.h}`);
    const minW = b.v === 'link' || b.v === 'right-icon' ? 0 : b.s === 'sm' ? 200 : 240;
    if (b.w < minW) errs.push(`${b.v}/${b.s}/${b.state} width ${b.w}<${minW}`);
    if (b.font !== (b.s === 'sm' ? '16px' : '18px') || b.weight !== '600') errs.push(`${b.v}/${b.s} font ${b.font}/${b.weight}`);
    if (!b.family.includes('Poppins')) errs.push(`${b.v}/${b.s} family ${b.family}`);
    if (b.radius === '0px') errs.push(`${b.v}/${b.s} radius`);
    const ex = expect(b.v, b.state);
    if (b.bg !== ex.bg) errs.push(`${b.v}/${b.s}/${b.state} bg ${b.bg} != ${ex.bg}`);
    if (b.fg !== ex.fg) errs.push(`${b.v}/${b.s}/${b.state} fg ${b.fg} != ${ex.fg}`);
    if (b.v === 'right-icon') {
      const white = rgb(figma.primitives['base/white']);
      const exC = b.state === 'disabled' ? { bg: dark('action/disabled/text'), fg: dark('action/disabled/bg') }
        : b.state === 'hover' ? { bg: white, fg: dark('action/hover/text') }
        : b.state === 'pressed' ? { bg: dark('action/default/bg-pressed'), fg: white }
        : { bg: dark('action/default/bg'), fg: white };
      if (!b.circle || b.circle.bg !== exC.bg || b.circle.fg !== exC.fg) errs.push(`${b.v}/${b.s}/${b.state} circle ${JSON.stringify(b.circle)} != ${JSON.stringify(exC)}`);
      if (b.circle && b.circle.w !== (b.s === 'sm' ? 36 : 40)) errs.push(`${b.v}/${b.s} circle size ${b.circle.w}`);
    }
    if (b.state === 'focus' && !(b.outline.startsWith('solid 2px 2px') && b.outline.includes(dark('focus/ring')))) errs.push(`${b.v}/${b.s} focus ring ${b.outline}`);
  }
  log(errs.length === 0, `Button vs Figma: ${rows.length} variants x sizes x states (height, width, font, colour, focus ring)`, errs.slice(0, 5).join(' | '));
  await page.screenshot({ path: join(root, 'reports/screens/button-state-matrix.png'), fullPage: true });

  // keyboard: Tab reaches a button and shows a focus ring
  await page.goto(`${base}/iframe.html?id=atoms-button--attention&viewMode=story`, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  const ring = await page.evaluate(() => { const el = document.activeElement; const cs = getComputedStyle(el); return { tag: el.tagName, outline: cs.outlineStyle + ' ' + cs.outlineWidth }; });
  log(ring.tag === 'BUTTON' && ring.outline === 'solid 2px', 'Keyboard: Tab focuses the button and shows a 2px ring', JSON.stringify(ring));
  await ctx.close();
}

// ---- screenshots for review
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  for (const id of ['foundations-colors--docs', 'foundations-typography--docs', 'foundations-spacing--docs', 'atoms-button--docs']) {
    await page.goto(`${base}/iframe.html?id=${id}&viewMode=docs`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(root, `reports/screens/${id}.png`), fullPage: true });
  }
  await ctx.close();
}

await browser.close();
server.close();
console.log(failures ? `\n${failures} check(s) failed` : '\nAll browser checks passed');
process.exit(failures ? 1 : 0);
