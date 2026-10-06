import { useState, useEffect } from 'react';
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
  const [internalStep, setInternalStep] = useState(0);
  
  const currentStep = activeStep ?? internalStep;

  useEffect(() => {
    // If activeStep is controlled externally, don't auto-play internally.
    if (activeStep !== undefined) return;
    
    const interval = setInterval(() => {
      setInternalStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [activeStep, steps.length]);

  const handleStepChange = (index: number) => {
    setInternalStep(index);
    if (onStepChange) onStepChange(index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.text}>
        <h2 className={styles.headline}>{headline}</h2>
        <Stepper steps={steps} activeStep={currentStep} onStepChange={handleStepChange} />
      </div>
      <div className={styles.device}>
        <PhoneMockup label={screenLabel}>{screen}</PhoneMockup>
      </div>
    </section>
  );
}
