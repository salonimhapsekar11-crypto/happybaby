import {
  ArrowLeft, ArrowRight, Check, ChevronDown, CircleArrowLeft, ExternalLink, Lock,
  Menu, Pause, Play, Plus, Star, User, X, type LucideIcon,
} from 'lucide-react';

/**
 * Icons come from Lucide (ISC licence): 24 px grid, 2 px stroke, round caps, the same
 * style as the Figma icon set. Names match the Figma components `Icon/<name>`.
 * Sizes match the Figma Size property: sm 20, md 24 (default), lg 40.
 */
export const icons = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-left-circle': CircleArrowLeft,
  star: Star,
  close: X,
  menu: Menu,
  plus: Plus,
  check: Check,
  play: Play,
  pause: Pause,
  'chevron-down': ChevronDown,
  'external-link': ExternalLink,
  lock: Lock,
  person: User,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
export type IconSize = 'sm' | 'md' | 'lg';

const SIZE: Record<IconSize, string> = {
  sm: 'var(--size-icon-sm)',
  md: 'var(--size-icon-md)',
  lg: 'var(--size-icon-lg)',
};

export interface IconProps {
  name: IconName;
  size?: IconSize;
  /** Accessible name. Leave empty for decorative icons (hidden from screen readers). */
  label?: string;
}

export function Icon({ name, size = 'md', label }: IconProps) {
  const Component = icons[name];
  return (
    <Component
      width={SIZE[size]}
      height={SIZE[size]}
      strokeWidth={2}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable="false"
      style={{ flex: 'none' }}
    />
  );
}
