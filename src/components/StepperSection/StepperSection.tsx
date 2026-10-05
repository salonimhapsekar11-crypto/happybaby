import type { ReactNode } from 'react';
import { Stepper, type StepperProps } from '../Stepper/Stepper';
import { PhoneMockup } from '../PhoneMockup/PhoneMockup';
import styles from './StepperSection.module.css';

export interface StepperSectionProps {
  headline: string;
  steps: StepperProps['steps'];
  /** Screen shown inside the phone. */
  screen: ReactNode;
  screenLabel: string;
  activeStep?: number;
  onStepChange?: (index: number) => void;
}

/** Headline and stepper on one side, phone on the other. Stacks on mobile with the phone centred. */
export function StepperSection({ headline, steps, screen, screenLabel, activeStep, onStepChange }: StepperSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.text}>
        <h2 className={styles.headline}>{headline}</h2>
        <Stepper steps={steps} activeStep={activeStep} onStepChange={onStepChange} />
      </div>
      <div className={styles.device}>
        <PhoneMockup label={screenLabel}>{screen}</PhoneMockup>
      </div>
    </section>
  );
}
