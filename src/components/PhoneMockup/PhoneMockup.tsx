import type { ReactNode } from 'react';
import styles from './PhoneMockup.module.css';

export interface PhoneMockupProps {
  /** Screen content: an app screenshot or any element. */
  children: ReactNode;
  /** Accessible description of what the screen shows. */
  label: string;
}

/** Phone frame (Figma `device/phone`, 354 × 752). The screen is clipped to the rounded frame. */
export function PhoneMockup({ children, label }: PhoneMockupProps) {
  return (
    <div className={styles.phone} role="img" aria-label={label}>
      <div className={styles.screen}>{children}</div>
    </div>
  );
}
