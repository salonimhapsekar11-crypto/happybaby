// Design-system checks. Exit code 1 if any hard check fails. Run: npm run check:tokens
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const figma = JSON.parse(readFileSync(join(root, 'tokens/figma-export.json'), 'utf8'));
const css = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8');
let failures = 0;
const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  if (!ok) failures++;
};

// ---------- 1. Parity: every CSS variable resolves to the Figma value ----------
const block = (selector) => {
  const re = new RegExp(`${selector.replace(/[[\]()'.*+?^${}|]/g, '\\$&')}\\s*\\{([^}]*)\\}`);
  return (css.match(re) || [])[1] || '';
};
const parseVars = (text) => Object.fromEntries([...text.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const lightBlockText = block("[data-theme='light']");
const rootVars = parseVars(css.replace(lightBlockText, ''));
const lightVars = parseVars(lightBlockText);
const slug = (n) => n.replace(/\//g, '-');
const resolve = (name, vars) => {
  let v = vars[name] ?? rootVars[name];
  while (v && v.startsWith('var(')) v = (vars[v.slice(6, -1)] ?? rootVars[v.slice(6, -1)]);
  return v;
};

let primBad = 0;
for (const [n, hex] of Object.entries(figma.primitives)) if ((rootVars[`primitive-${slug(n)}`] || '').toUpperCase() !== hex) primBad++;
check('Primitives: CSS equals Figma', primBad === 0, `${Object.keys(figma.primitives).length} checked, ${primBad} mismatched`);

for (const mode of ['dark', 'light']) {
  const vars = mode === 'dark' ? rootVars : { ...rootVars, ...lightVars };
  let bad = 0;
  for (const [n, v] of Object.entries(figma.alias)) {
    const got = (resolve(`color-${slug(n)}`, vars) || '').toUpperCase();
    if (got !== figma.primitives[v[mode]]) bad++;
  }
  check(`Semantic (${mode}): CSS resolves to Figma`, bad === 0, `${Object.keys(figma.alias).length} checked, ${bad} mismatched`);
}

let spBad = 0;
for (const [n, v] of Object.entries(figma.spacing)) if (rootVars[slug(n)] !== `${v}px`) spBad++;
check('Spacing, radius, size: CSS equals Figma', spBad === 0, `${Object.keys(figma.spacing).length} checked, ${spBad} mismatched`);

let tyBad = 0;
const W = { Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 };
for (const s of figma.styles) {
  const [bp, ...r] = s.name.split('/');
  const role = slug(r.join('/').toLowerCase().replace(/\s+/g, '-'));
  const k = `type-${role}-${bp.toLowerCase()}`;
  if (rootVars[`${k}-size`] !== `${s.size}px` || rootVars[`${k}-line`] !== `${s.lh}px` || rootVars[`${k}-weight`] !== String(W[s.style]) || rootVars[`${k}-tracking`] !== `${+(s.ls / 100).toFixed(4)}em`) tyBad++;
}
check('Type styles: CSS equals Figma', tyBad === 0, `${figma.styles.length} checked, ${tyBad} mismatched`);
check('Font family is Poppins only', figma.styles.every((s) => s.family === 'Poppins') && !/jakarta/i.test(css), '');

// ---------- 2. Contrast (WCAG 2.x) ----------
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const val = (token, mode) => figma.primitives[figma.alias[token][mode]];
const pairs = [];
for (const v of ['attention', 'default', 'live']) for (const st of ['', '-hover', '-pressed']) pairs.push([`action/${v}/text`, `action/${v}/bg${st}`, 4.5, `Button ${v}${st || ' (rest)'}`]);
pairs.push(['text/link', 'surface/page', 4.5, 'Link on page'], ['text/primary', 'text/primary'.replace('text/primary', 'surface/page'), 4.5, 'Ghost button on page'],
  ['text/primary', 'surface/card-raised', 4.5, 'Ghost hover'], ['action/default/text', 'action/default/bg-pressed', 4.5, 'Ghost pressed'],
  ['text/secondary', 'surface/page', 4.5, 'Secondary text'], ['text/muted', 'surface/page', 4.5, 'Muted text'], ['text/muted', 'surface/card', 4.5, 'Muted text on card'],
  ['focus/ring', 'surface/page', 3, 'Focus ring (non-text)'], ['focus/ring', 'surface/card', 3, 'Focus ring on card (non-text)'], ['border/strong', 'surface/page', 3, 'Strong border (non-text)']);
for (const mode of ['dark', 'light']) {
  const low = [];
  for (const [fg, bg, need, label] of pairs) {
    const r = ratio(val(fg, mode), val(bg, mode));
    if (r < need) low.push(`${label} ${r.toFixed(2)}<${need}`);
  }
  check(`Contrast AA (${mode}): ${pairs.length} pairs`, low.length === 0, low.join('; '));
}
const dis = ['dark', 'light'].map((m) => `${m} ${ratio(val('action/disabled/text', m), val('action/disabled/bg', m)).toFixed(2)}`).join(', ');
results.push({ name: 'Disabled text contrast (exempt from WCAG, shown for reference)', ok: true, detail: dis });

// ---------- 3. No hard-coded values in components ----------
const files = [];
const walk = (dir) => { for (const f of readdirSync(dir)) { const p = join(dir, f); statSync(p).isDirectory() ? walk(p) : files.push(p); } };
walk(join(root, 'src/components'));
const offenders = [];
for (const f of files.filter((f) => ['.css', '.tsx', '.ts'].includes(extname(f)) && !f.includes('.test.') && !f.includes('.stories.'))) {
  const text = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  if (/#[0-9a-fA-F]{3,8}\b/.test(text)) offenders.push(`${f.replace(root, '')}: hex colour`);
  for (const m of text.matchAll(/(?<![\w-])(\d+)px/g)) if (!['0', '1', '2'].includes(m[1])) offenders.push(`${f.replace(root, '')}: ${m[0]}`);
  if (/jakarta/i.test(text)) offenders.push(`${f.replace(root, '')}: Plus Jakarta Sans`);
}
// Allow the Figma type scale only through tokens: the component CSS uses var(--type-*) already.
check('No hex colours or pixel literals in component code', offenders.length === 0, offenders.slice(0, 8).join('; '));

// ---------- report ----------
const pad = (s, n) => String(s).padEnd(n);
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${pad(r.name, 62)} ${r.detail}`);
console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
