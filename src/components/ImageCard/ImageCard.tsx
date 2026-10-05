import type { ReactNode } from 'react';
import styles from './ImageCard.module.css';

export interface ImageCardProps {
  /** Full-bleed photo. A neutral gradient is shown without one. */
  image?: string;
  /** Figma: Eyebrow. */
  eyebrow?: string;
  /** Figma: Title. */
  title: string;
  /** Figma: Description. */
  description: string;
  /** App UI that floats in the upper part of the card (for example the timer panel). */
  overlay?: ReactNode;
}

/**
 * Card with a full-bleed image, a gradient under the text and the text at the bottom
 * (after reui `c-card-8`). The image scales slightly on hover.
 */
export function ImageCard({ image, eyebrow, title, description, overlay }: ImageCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media} data-empty={!image || undefined}>
        {image && <img src={image} alt="" />}
      </div>
      <span className={styles.scrim} aria-hidden />
      {overlay && <div className={styles.overlay}>{overlay}</div>}
      <div className={styles.text}>
        {eyebrow && <p className={`type-eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
        <h3 className={styles.title}>{title}</h3>
        <p className={`type-body-small ${styles.description}`}>{description}</p>
      </div>
    </article>
  );
}
