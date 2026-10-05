import styles from './StatItem.module.css';

export interface StatItemProps {
  /** Figma: Title. */
  title: string;
  /** Figma: Description. */
  description: string;
  /** Figma: Divider = On. A vertical line before the item. */
  divider?: boolean;
}

export function StatItem({ title, description, divider = false }: StatItemProps) {
  return (
    <div className={styles.item} data-divider={divider || undefined}>
      <p className={`type-label ${styles.title}`}>{title}</p>
      <p className={`type-small ${styles.description}`}>{description}</p>
    </div>
  );
}

export interface TrustBarProps {
  items: Pick<StatItemProps, 'title' | 'description'>[];
}

/** Row of stats on desktop, stacked on mobile. Dividers are added between items on desktop only. */
export function TrustBar({ items }: TrustBarProps) {
  return (
    <div className={styles.bar}>
      {items.map((item) => (
        <StatItem key={item.title} {...item} />
      ))}
    </div>
  );
}
