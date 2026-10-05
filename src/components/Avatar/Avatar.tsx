import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  /** Photo URL. Without it the avatar shows a neutral placeholder (Figma: Photo = None). */
  src?: string;
  /** Describe the person, or pass an empty string when the avatar is decorative. */
  alt: string;
  /** sm 40, md 56, lg 80. Figma: Size. */
  size?: AvatarSize;
  /** Draws a ring in the page colour so overlapping avatars stay readable. */
  ring?: boolean;
}

export function Avatar({ src, alt, size = 'md', ring = false }: AvatarProps) {
  return (
    <span className={styles.avatar} data-size={size} data-ring={ring || undefined}>
      {src ? (
        <img className={styles.image} src={src} alt={alt} width={96} height={96} loading="lazy" />
      ) : (
        <svg className={styles.placeholder} viewBox="0 0 24 24" aria-hidden={alt === '' ? true : undefined} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
          <circle cx="12" cy="9" r="4" fill="currentColor" />
          <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" fill="currentColor" />
        </svg>
      )}
    </span>
  );
}
