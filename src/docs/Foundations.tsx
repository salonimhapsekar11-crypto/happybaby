import type { ReactElement } from 'react';
import { Unstyled } from '@storybook/blocks';
import { alias, primitives, spacing, typeStyles } from '../styles/tokens';
import { CodeBlock } from './CodeBlock';
import styles from './docs.module.css';

const slug = (n: string) => n.replace(/\//g, '-');

/** Opts out of Storybook's own docs typography and lets wide content scroll inside its box. */
const wrap = (el: ReactElement) => (
  <Unstyled>
    <div className={styles.scroll}>{el}</div>
  </Unstyled>
);

export function PrimitiveScale({ family }: { family: 'purple' | 'blue' | 'pink' | 'yellow' | 'gray' }) {
  const entries = Object.entries(primitives).filter(([n]) => n.startsWith(`${family}/`));
  return wrap(
    <div className={styles.panel}>
      <div className={styles.grid}>
        {entries.map(([name, hex]) => (
          <div className={styles.swatch} key={name}>
            <div className={styles.chip} style={{ background: `var(--primitive-${slug(name)})` }} />
            <span>{name.split('/')[1]}</span>
            <span className={styles.muted}>{hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FoundationColors() {
  const entries = ['night/950', 'base/black', 'base/white'] as const;
  return wrap(
    <div className={styles.panel}>
      <div className={styles.grid}>
        {entries.map((name) => (
          <div className={styles.swatch} key={name}>
            <div className={styles.chip} style={{ background: `var(--primitive-${slug(name)})` }} />
            <span>{name}</span>
            <span className={styles.muted}>{primitives[name]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Semantic tokens with their value in both themes, previewed live from the CSS variables. */
export function SemanticColors({ group }: { group: string }) {
  const entries = Object.entries(alias).filter(([n]) => n.startsWith(`${group}/`));
  return wrap(
    <div className={styles.panel}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Token</th>
          <th>Dark</th>
          <th>Light</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([name, v]) => (
          <tr key={name}>
            <td>
              <code className={styles.mono}>--color-{slug(name)}</code>
            </td>
            {(['dark', 'light'] as const).map((mode) => (
              <td key={mode} data-theme={mode} className={styles.themeCell}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 32,
                      height: 24,
                      borderRadius: 8,
                      border: '1px solid var(--color-border-strong)',
                      background: `var(--color-${slug(name)})`,
                    }}
                  />
                  <span className={styles.mono}>{v[mode]}</span>
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function sampleFor(role: string) {
  if (role.startsWith('headline')) return 'Ein Tagesplan, der mitwächst';
  if (role.startsWith('title')) return 'Live-Tracking für den Schlaf';
  if (role.startsWith('button')) return 'Jetzt kostenlos starten';
  return 'Starte den Timer, sobald dein Baby einschläft.';
}

export function TypeSpecimen({ breakpoint }: { breakpoint: 'desktop' | 'mobile' }) {
  const samples: Record<string, string> = {
    display: 'Gute Nacht, kleiner Schatz',
    h1: 'Schlaf ist kein Zufall',
    h2: 'Ein Tagesplan, der mitwächst',
    h3: 'Wann ist dein Baby müde?',
    'body-l': 'Happy Baby zeigt dir, wann dein Baby bereit für den nächsten Schlaf ist.',
    body: 'Starte den Timer, sobald dein Baby einschläft.',
    small: 'Nach der Testphase verlängert sich das Abo automatisch.',
    caption: 'Quelle und Datum folgen nach Prüfung',
    label: 'Happy Baby kostenlos ausprobieren',
    'label-l': 'Happy Baby kostenlos ausprobieren',
    eyebrow: 'Schlaf-Tracker',
    data: '00:30:45',
  };
  const bp = breakpoint === 'desktop' ? 'Desktop' : 'Mobile';
  const rows = typeStyles.filter((s) => s.name.startsWith(`${bp}/`));
  return wrap(
    <div className={styles.panel}>
      <table className={styles.table}>
        <tbody>
          {rows.map((s) => {
            const role = s.name.split('/').slice(1).join('-').toLowerCase().replace(/\s+/g, '-');
            const v = (p: string) => `var(--type-${role}-${breakpoint}-${p})`;
            return (
              <tr key={s.name}>
                <td style={{ width: 220 }}>
                  <code className={styles.mono}>.type-{role}</code>
                  <br />
                  <span className={styles.muted}>
                    {s.style} {s.size}/{s.lh}
                    {s.ls ? ` · ${s.ls}%` : ''}
                  </span>
                </td>
                <td>
                  <p
                    className={styles.specimen}
                    style={{
                      font: `${v('weight')} ${v('size')}/${v('line')} var(--font-family)`,
                      letterSpacing: v('tracking'),
                      textTransform: s.upper ? 'uppercase' : undefined,
                      fontVariantNumeric: role === 'data' ? 'tabular-nums' : undefined,
                    }}
                  >
                    {samples[role] ?? sampleFor(role)}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function SpacingScale() {
  const entries = Object.entries(spacing).filter(([n]) => n.startsWith('space/') && n !== 'space/0');
  return wrap(
    <div className={styles.panel}>
      <table className={styles.table}>
        <tbody>
          {entries.map(([name, value]) => (
            <tr key={name}>
              <td style={{ width: 200 }}>
                <code className={styles.mono}>--{slug(name)}</code>
              </td>
              <td style={{ width: 80 }}>{value}px</td>
              <td>
                <div className={styles.bar} style={{ width: `var(--${slug(name)})` }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RadiusScale() {
  const entries = Object.entries(spacing).filter(([n]) => n.startsWith('radius/'));
  return wrap(
    <div className={styles.panel}>
      <div className={styles.row}>
        {entries.map(([name, value]) => (
          <div className={styles.swatch} key={name}>
            <div className={styles.radiusBox} style={{ borderRadius: `var(--${slug(name)})` }} />
            <span>{name.split('/')[1]}</span>
            <span className={styles.muted}>{value === 999 ? 'full' : `${value}px`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SizeScale() {
  const entries = Object.entries(spacing).filter(([n]) => n.startsWith('size/icon-') || n === 'size/hit-min');
  return wrap(
    <div className={styles.panel}>
      <div className={styles.row}>
        {entries.map(([name, value]) => (
          <div className={styles.swatch} key={name}>
            <div
              style={{
                width: `var(--${slug(name)})`,
                height: `var(--${slug(name)})`,
                background: 'var(--color-action-default-bg)',
                border: '1px solid var(--color-border-strong)',
              }}
            />
            <span>{name.split('/')[1]}</span>
            <span className={styles.muted}>{value}px</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CodeBlock };
