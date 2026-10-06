import type { ReactNode } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  /** live (blue) marks something current or new. Keep it for live states and short offers. */
  tone?: 'live';
  children: ReactNode;
}

/** Small pill, for example the offer next to a price. Figma: `badge` inside PriceBlock. */
export function Badge({ tone = 'live', children }: BadgeProps) {
  return (
    <span className={`type-caption ${styles.badge}`} data-tone={tone}>
      {children}
    </span>
  );
}
