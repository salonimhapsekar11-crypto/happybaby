import type { ReactNode } from 'react';
import { Link } from '../Link/Link';
import styles from './Footer.module.css';

export interface FooterProps {
  /** The brand logo, usually an image wrapped in a link to the home page. */
  logo: ReactNode;
  links: { label: string; href: string }[];
  /** Language switch. Omit to hide it (Figma: Show language). */
  language?: { value: string; options: { value: string; label: string }[]; onChange?: (value: string) => void };
  /** Figma: Copyright. */
  copyright: string;
}

/**
 * Page footer (Figma `Footer`, Breakpoint Desktop, Laptop, Mobile).
 * Logo left and links right on wide screens, stacked on mobile. Landmark: `contentinfo`.
 */
export function Footer({ logo, links, language, copyright }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.logo}>{logo}</div>
        <nav className={styles.links} aria-label="Rechtliches">
          <ul>
            {links.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            {language && (
              <li>
                <label className={styles.language}>
                  <span className={styles.srOnly}>Sprache</span>
                  <select className="type-label" value={language.value} onChange={(e) => language.onChange?.(e.target.value)}>
                    {language.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <p className={`type-small ${styles.copyright}`}>{copyright}</p>
    </footer>
  );
}
