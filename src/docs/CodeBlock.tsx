import { useState } from 'react';
import styles from './docs.module.css';

/** Shows a code snippet under a demo, with a copy button. Used on the Foundations pages. */
export function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard can be refused in some frames: the text stays selectable */
    }
  };
  return (
    <div className={styles.code}>
      <div className={styles.codeHeader}>
        <span>{language}</span>
        <button type="button" className={styles.copy} onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className={styles.pre} tabIndex={0}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
