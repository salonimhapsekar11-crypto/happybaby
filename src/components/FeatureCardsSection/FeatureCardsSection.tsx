import { ImageCard, type ImageCardProps } from '../ImageCard/ImageCard';
import styles from './FeatureCardsSection.module.css';

export interface FeatureCardsSectionProps {
  headline: string;
  cards: ImageCardProps[];
}

/** Headline and image cards: stacked on mobile, side by side from 768 px. */
export function FeatureCardsSection({ headline, cards }: FeatureCardsSectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>{headline}</h2>
      <div className={styles.grid}>
        {cards.map((c) => (
          <ImageCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}
