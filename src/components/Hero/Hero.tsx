import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import { TrustBar, type TrustBarProps } from '../StatItem/StatItem';
import { ProofRow, type ProofRowProps } from '../ProofRow/ProofRow';
import styles from './Hero.module.css';

/** Desktop type and layout start at 768 px (Figma breakpoint md), written in em. */
const DESKTOP = '(min-width: 48em)';

export interface HeroProps {
  /** Figma: Headline. Use a line break for the two-line headline. */
  headline: ReactNode;
  /** Label and target of the single primary action. */
  cta: { label: string; href: string };
  /** Figma: Show trust bar. Leave out to hide. */
  stats?: TrustBarProps['items'];
  /** Figma: Show proof row. Leave out to hide. */
  proof?: ProofRowProps;
  /** Photo for 768 px and wider, and for narrow screens. */
  image: { desktop: string; mobile: string; alt: string };
  /** The site navigation sits on top of the image. Rendered as is. */
  nav?: ReactNode;
}

/**
 * Full-bleed hero banner. The photo is larger than the frame so it bleeds on every edge.
 * The exported photos already carry the top shade and the fade into the next section; one left gradient keeps the white text readable.
 */
export function Hero({ headline, cta, stats, proof, image, nav }: HeroProps) {
  return (
    <section className={styles.hero}>
      <picture className={styles.media}>
        <source media={DESKTOP} srcSet={image.desktop} />
        <img src={image.mobile} alt={image.alt} />
      </picture>
      <span className={`${styles.layer} ${styles.scrimLeft}`} aria-hidden />
      <div className={styles.nav}>{nav}</div>
      <div className={styles.body}>
        <div className={styles.content}>
          <h1 className={styles.headline}>{headline}</h1>
          <div className={styles.cta}>
            <Button variant="right-icon" size="md" href={cta.href}>
              {cta.label}
            </Button>
          </div>
          {stats && <TrustBar items={stats} />}
        </div>
        {proof && (
          <div className={styles.proof}>
            <ProofRow {...proof} />
          </div>
        )}
      </div>
    </section>
  );
}
