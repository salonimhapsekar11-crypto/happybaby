import type { ElementType, HTMLAttributes } from 'react';
import styles from './Container.module.css';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** default: 1248 px of content. narrow: 720 px, for text-led sections. */
  size?: 'default' | 'narrow';
  as?: ElementType;
}

/**
 * Centres page content and gives it side padding: 24 px on mobile, 96 px from 768 px.
 * Backgrounds stay full width outside it, so a section can bleed while its content stays aligned.
 */
export function Container({ size = 'default', as: Tag = 'div', className, children, ...rest }: ContainerProps) {
  return (
    <Tag {...rest} className={[styles.container, className].filter(Boolean).join(' ')} data-size={size}>
      {children}
    </Tag>
  );
}
