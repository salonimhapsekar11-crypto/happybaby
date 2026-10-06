import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './Link.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Show the arrow after the label. Figma: Icon right. */
  iconRight?: boolean;
  children: ReactNode;
}

/** Standalone text link (Figma `Link`, Variant = Standalone). Hover turns the text yellow. 44 px tall for touch. */
export function Link({ iconRight = false, className, children, ...rest }: LinkProps) {
  return (
    <a {...rest} className={[`type-label`, styles.link, className].filter(Boolean).join(' ')}>
      {children}
      {iconRight && <Icon name="arrow-right" size="sm" />}
    </a>
  );
}
