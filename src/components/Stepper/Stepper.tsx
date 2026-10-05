import { useState } from 'react';
import styles from './Stepper.module.css';

export interface StepperStep {
  /** Figma: Time (eyebrow above the title). */
  time: string;
  /** Figma: Title. */
  title: string;
  /** Figma: Description. Shown for the active step only. */
  description: string;
}

export interface StepperProps {
  steps: StepperStep[];
  /** Index of the active step. Steps before it are completed. Uncontrolled when omitted. */
  activeStep?: number;
  onStepChange?: (index: number) => void;
}

/**
 * Vertical stepper (Figma `DayStep`: State = Active, Inactive, Completed).
 * Each step is a button, so keyboard and screen reader users can move between steps.
 * The separator is part of each step and stretches to the next indicator, so the line is continuous.
 */
export function Stepper({ steps, activeStep, onStepChange }: StepperProps) {
  const [inner, setInner] = useState(0);
  const active = activeStep ?? inner;
  const select = (i: number) => {
    setInner(i);
    onStepChange?.(i);
  };

  return (
    <ol className={styles.list}>
      {steps.map((step, i) => {
        const state = i < active ? 'completed' : i === active ? 'active' : 'inactive';
        return (
          <li key={step.title} className={styles.step} data-state={state}>
            <button type="button" className={styles.trigger} onClick={() => select(i)} aria-current={state === 'active' ? 'step' : undefined}>
              <span className={styles.rail}>
                <span className={`type-caption ${styles.indicator}`}>
                  {state === 'completed' ? (
                    <svg viewBox="0 0 12 9" className={styles.check} aria-hidden>
                      <path d="M1 4.5 4.2 7.7 11 1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                {i < steps.length - 1 && <span className={styles.separator} aria-hidden />}
              </span>
              <span className={styles.content}>
                <span className={`type-eyebrow ${styles.time}`}>{step.time}</span>
                <span className={`type-title-medium ${styles.title}`}>{step.title}</span>
                {state === 'active' && <span className={`type-body-small ${styles.description}`}>{step.description}</span>}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
