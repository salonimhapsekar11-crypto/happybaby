import { Avatar } from '../Avatar/Avatar';
import { StarRating, type StarRatingProps } from '../StarRating/StarRating';
import styles from './ReviewCard.module.css';

export interface ReviewCardProps {
  /** Figma: Layout (Standard, Outline, Featured). */
  layout?: 'standard' | 'outline' | 'featured';
  rating: StarRatingProps['rating'];
  title: string;
  quote: string;
  author: { name: string; relationship: string; avatar?: string };
  /** Where and when the review was left, for example "Quelle: [App Store] · [Monat Jahr]". */
  source: string;
}

/**
 * Testimonial with rating. Only use genuine, approved reviews: the Figma copy is placeholder.
 * Without `author.avatar` the avatar shows the neutral placeholder (Figma: Avatar = None).
 */
export function ReviewCard({ layout = 'standard', rating, title, quote, author, source }: ReviewCardProps) {
  return (
    <figure className={styles.card} data-layout={layout}>
      <StarRating rating={rating} />
      <p className={`type-title-medium ${styles.title}`}>{title}</p>
      <blockquote className={`type-body-small ${styles.quote}`}>{quote}</blockquote>
      <figcaption className={styles.author}>
        <Avatar src={author.avatar} alt="" size="md" />
        <span className={styles.who}>
          <span className="type-label">{author.name}</span>
          <span className={`type-small ${styles.muted}`}>{author.relationship}</span>
        </span>
      </figcaption>
      <p className={`type-caption ${styles.muted} ${styles.source}`}>{source}</p>
    </figure>
  );
}
