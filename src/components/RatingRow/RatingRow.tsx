import { AvatarStack, type AvatarStackProps } from '../AvatarStack/AvatarStack';
import { StarRating, type StarRatingProps } from '../StarRating/StarRating';
import styles from './RatingRow.module.css';

export interface RatingRowProps {
  avatars: AvatarStackProps['avatars'];
  rating: StarRatingProps['rating'];
  /** Figma: label, for example "0,0 · 000+ Familien". Keep bracketed until verified. */
  label: string;
}

/** Avatar stack, stars and a short line. Wraps onto two lines on narrow screens. */
export function RatingRow({ avatars, rating, label }: RatingRowProps) {
  return (
    <div className={styles.row}>
      <AvatarStack avatars={avatars} size="sm" />
      <StarRating rating={rating} />
      <p className={`type-small ${styles.label}`}>{label}</p>
    </div>
  );
}
