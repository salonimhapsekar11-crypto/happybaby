import styles from './StarRating.module.css';

export interface StarRatingProps {
  /** 1 to 5. Figma: `.StarRow` Rating. */
  rating: 1 | 2 | 3 | 4 | 5;
}

const path = 'M8.5 0.8l2.1 5.2 5.6.4-4.3 3.6 1.4 5.4-4.8-3-4.8 3 1.4-5.4L.8 6.4l5.6-.4z';

export function StarRating({ rating }: StarRatingProps) {
  return (
    <span className={styles.row} role="img" aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 17 16" className={styles.star} data-filled={n <= rating || undefined} aria-hidden>
          <path d={path} />
        </svg>
      ))}
    </span>
  );
}
