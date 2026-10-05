import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StepperSection } from './StepperSection';

const steps = [
  { time: 'Morning', title: 'First wake-up', description: 'One or two sentences describing what happens in the app at this point of the day. Placeholder copy.' },
  { time: 'Midday', title: 'Naps and feeds', description: 'Placeholder copy.' },
  { time: 'Evening', title: 'Massages and bedtime stories', description: 'Placeholder copy.' },
  { time: 'Night', title: 'Night wake-ups and feedings', description: 'Placeholder copy.' },
];

/**
 * ## Use case: "What does your first 24 hours look like?"
 * Walks a parent through a day with the app. The active step expands; the phone shows the matching screen.
 *
 * **Built from**
 * - `Molecules/Stepper`: numbered indicators joined by one continuous line, active and completed in blue/500
 * - `Molecules/PhoneMockup`: the device frame
 * - Foundations: Headline H4 (mobile) and H2 (desktop), `--size-step-*`, `--color-accent-live`
 *
 * **Behaviour**
 * - Each step is a button. Activating one makes it the active step and completes the steps before it.
 * - Under 768 px the phone moves below the steps and is centred.
 * - The phone shows a placeholder: replace it with the real app screenshot per step.
 */
const meta = {
  title: 'Use cases/First 24 hours',
  component: StepperSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    headline: 'What does your first 24 hours look like?',
    steps,
    screenLabel: 'App screen: daily overview',
    screen: <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>App screen</div>,
  },
} satisfies Meta<typeof StepperSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
export const SyncedScreen: Story = {
  render: (args) => {
    const [i, setI] = useState(0);
    return <StepperSection {...args} activeStep={i} onStepChange={setI} screen={<div style={{ display: 'grid', placeItems: 'center', height: '100%', color: 'var(--color-text-primary)' }}>{steps[i].time}</div>} />;
  },
};
