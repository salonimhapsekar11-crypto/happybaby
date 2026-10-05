import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import styles from './Flex.module.css';

export type Space = '0' | '4' | '8' | '12' | '16' | '20' | '24' | '32' | '40' | '48' | '64' | '80' | '96' | '128';

export interface FlexProps extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  /** Main axis. Figma auto layout: Horizontal = row, Vertical = column. */
  direction?: 'row' | 'column';
  /** Column on mobile, row from 768 px. The most common landing-page pattern. Overrides `direction`. */
  stackOnMobile?: boolean;
  /** Space between children. Only space tokens are allowed. Figma: Spacing between items. */
  gap?: Space;
  /** Cross axis alignment. Figma: the alignment grid, vertical in a row. */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Main axis distribution. Figma: Packed, or Space between. */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  /** Let children move to the next line when they do not fit. */
  wrap?: boolean;
  /** Rendered element. Use a semantic one (`ul`, `section`, `nav`) when it fits. */
  as?: ElementType;
  /** Extra inline styles. Prefer the props above. */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Flexbox as a component: one dimension, children laid out along a main axis.
 * Replaces hand-written `display: flex` rules, and maps one to one to Figma auto layout.
 */
export function Flex({
  direction = 'row',
  stackOnMobile = false,
  gap = '0',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  as: Tag = 'div',
  className,
  style,
  children,
  ...rest
}: FlexProps) {
  return (
    <Tag
      {...rest}
      className={[styles.flex, className].filter(Boolean).join(' ')}
      data-direction={stackOnMobile ? 'stack' : direction}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap || undefined}
      style={{ gap: `var(--space-${gap})`, ...style }}
    >
      {children}
    </Tag>
  );
}
