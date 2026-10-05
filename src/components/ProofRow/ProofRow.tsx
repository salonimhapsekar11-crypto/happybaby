import { AvatarStack, type AvatarStackProps } from '../AvatarStack/AvatarStack';
import styles from './ProofRow.module.css';

export interface ProofRowProps {
  avatars: AvatarStackProps['avatars'];
  /** Figma: Label. */
  label: string;
}

/** Avatar stack with a short line of social proof. */
export function ProofRow({ avatars, label }: ProofRowProps) {
  return (
    <div className={styles.row}>
      <AvatarStack avatars={avatars} size="md" />
      <p className={`type-label ${styles.label}`}>{label}</p>
    </div>
  );
}
