import { Avatar, type AvatarSize } from '../Avatar/Avatar';
import styles from './AvatarStack.module.css';

export interface AvatarStackProps {
  avatars: { src?: string; alt: string }[];
  /** Figma: Size (Sm, Md). */
  size?: Extract<AvatarSize, 'sm' | 'md'>;
}

/** Overlapping avatars. The overlap comes from the size/avatar-overlap tokens. */
export function AvatarStack({ avatars, size = 'md' }: AvatarStackProps) {
  return (
    <span className={styles.stack} data-size={size}>
      {avatars.map((a, i) => (
        <Avatar key={i} {...a} size={size} ring />
      ))}
    </span>
  );
}
