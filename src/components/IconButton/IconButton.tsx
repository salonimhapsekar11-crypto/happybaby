import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './IconButton.module.css';

export type IconButtonVariant = 'default' | 'ghost' | 'subtle';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  /** The icon. Pass an `<Icon />`. */
  icon: ReactNode;
  /** Accessible name (Figma: the hidden Label property). Required, because the button has no visible text. */
  label: string;
  /** default: purple/700 fill. ghost: no fill. subtle: purple/50 fill. */
  variant?: IconButtonVariant;
  /** Show an interactive state without interacting. For documentation and visual tests only. */
  forceState?: 'hover' | 'pressed' | 'focus';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant = 'default', forceState, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      aria-label={label}
      className={[styles.iconButton, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-force-state={forceState}
    >
      {icon}
    </button>
  );
});
