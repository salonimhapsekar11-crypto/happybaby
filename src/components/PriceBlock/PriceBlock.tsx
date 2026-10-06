import { Badge } from '../Badge/Badge';
import styles from './PriceBlock.module.css';

export interface PriceBlockProps {
  /** Current price as text, so the formatting stays with the locale, for example "€ 5,99". */
  price: string;
  /** Crossed-out earlier price. */
  previousPrice?: string;
  /** For example "/ Monat". */
  period?: string;
  /** Short offer next to the price. */
  badge?: string;
}

/**
 * Price with an optional earlier price, period and offer. Figma component `PriceBlock`.
 * The earlier price is read as "was" by screen readers.
 */
export function PriceBlock({ price, previousPrice, period, badge }: PriceBlockProps) {
  return (
    <div className={styles.block}>
      <p className={styles.price}>{price}</p>
      {previousPrice && (
        <p className={`type-title-small ${styles.previous}`}>
          <span className={styles.srOnly}>Vorher </span>
          <s>{previousPrice}</s>
        </p>
      )}
      {period && <p className={`type-small ${styles.period}`}>{period}</p>}
      {badge && <Badge>{badge}</Badge>}
    </div>
  );
}
