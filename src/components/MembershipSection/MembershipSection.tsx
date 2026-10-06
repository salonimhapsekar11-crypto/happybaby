import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import { CheckItem } from '../CheckItem/CheckItem';
import { PriceBlock, type PriceBlockProps } from '../PriceBlock/PriceBlock';
import { RatingRow, type RatingRowProps } from '../RatingRow/RatingRow';
import styles from './MembershipSection.module.css';

export interface MembershipSectionProps {
  headline: string;
  body: string;
  rating?: RatingRowProps;
  price: PriceBlockProps;
  benefits: string[];
  cta: { label: string; href: string };
  image: { src: string; alt: string };
  /** Eased gradient from the light surface above into this dark section. */
  fade?: boolean;
  children?: ReactNode;
}

/**
 * Dark closing section: one image, rating, headline, price, benefits and the action.
 * Image on top on mobile, side by side from 768 px. The bottom padding leaves room before the footer.
 */
export function MembershipSection({ headline, body, rating, price, benefits, cta, image, fade = true }: MembershipSectionProps) {
  return (
    <section className={styles.section} data-fade={fade || undefined}>
      <div className={styles.inner}>
        <div className={styles.media}>
          <img src={image.src} alt={image.alt} width={573} height={595} loading="lazy" />
        </div>
        <div className={styles.content}>
          {rating && <RatingRow {...rating} />}
          <h2 className={styles.headline}>{headline}</h2>
          <p className={`type-body-medium ${styles.body}`}>{body}</p>
          <PriceBlock {...price} />
          <ul className={styles.list}>
            {benefits.map((b) => (
              <li key={b}>
                <CheckItem>{b}</CheckItem>
              </li>
            ))}
          </ul>
          <div className={styles.cta}>
            <Button variant="right-icon" size="md" href={cta.href}>
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
