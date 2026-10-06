import type { ReactNode } from 'react';
import styles from './CheckItem.module.css';

export interface CheckItemProps {
  /** One line of text. Figma: text. */
  children: ReactNode;
}

/** A benefit with a check mark. Render several inside a `<ul>` (see MembershipSection). */
export function CheckItem({ children }: CheckItemProps) {
  return (
    <span className={styles.item}>
      <span className={styles.icon} aria-hidden>
        <svg viewBox="0 0 10 8" className={styles.check}>
          <path d="M1 4.2 3.6 6.8 9 1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="type-body">{children}</span>
    </span>
  );
}
