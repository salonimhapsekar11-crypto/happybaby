import { ReviewCard, type ReviewCardProps } from '../ReviewCard/ReviewCard';
import styles from './ReviewsSection.module.css';

export interface ReviewsSectionProps {
  headline: string;
  reviews: ReviewCardProps[];
}

/** Headline and review cards: one column on mobile, equal columns from 768 px. */
export function ReviewsSection({ headline, reviews }: ReviewsSectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>{headline}</h2>
      <div className={styles.grid}>
        {reviews.map((r, i) => (
          <ReviewCard key={i} {...r} />
        ))}
      </div>
    </section>
  );
}
