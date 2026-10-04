import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './Button.module.css';

export type ButtonVariant = 'attention' | 'attention-icon' | 'default' | 'live' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md';

interface BaseProps {
  /**
   * attention: the single primary action in a view (purple/500).
   * attention-icon: attention with the icon in a circle on the right (defaults to an arrow).
   * default: secondary actions (purple/700).
   * live: only for live states such as a running nap timer or playing audio (blue).
   * ghost: low emphasis. link: inline-style action.
   */
  variant?: ButtonVariant;
  /** sm is 44px tall, md is 56px tall. */
  size?: ButtonSize;
  /** Icon before the label (Figma: Icon left + Icon left swap). */
  iconLeft?: ReactNode;
  /** Icon after the label (Figma: Icon right + Icon right swap). */
  iconRight?: ReactNode;
  /** Figma sets the instance to Fill container. */
  fullWidth?: boolean;
  /** Show an interactive state without interacting. For documentation and visual tests only. */
  forceState?: 'hover' | 'pressed' | 'focus';
  children: ReactNode;
}

type AsButton = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };
type AsLink = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string; disabled?: boolean };
export type ButtonProps = AsButton | AsLink;

export function Button(props: ButtonProps) {
  const {
    variant = 'default',
    size = 'md',
    iconLeft,
    iconRight,
    fullWidth = false,
    forceState,
    children,
    className,
    ...rest
  } = props;

  const common = {
    className: [styles.button, className].filter(Boolean).join(' '),
    'data-variant': variant,
    'data-size': size,
    'data-full-width': fullWidth || undefined,
    'data-force-state': forceState,
  };

  const content = variant === 'attention-icon' ? (
    <>
      <span>{children}</span>
      <span className={styles.circle}>{iconRight ?? <Icon name="arrow-right" size={size === 'sm' ? 'sm' : 'md'} />}</span>
    </>
  ) : (
    <>
      {iconLeft ? <span className={styles.icon}>{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span className={styles.icon}>{iconRight}</span> : null}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const { disabled, href, onClick, ...anchor } = rest as AsLink;
    return (
      <a
        {...anchor}
        {...common}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : anchor.tabIndex}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', ...button } = rest as AsButton;
  return (
    <button {...button} {...common} type={type}>
      {content}
    </button>
  );
}
