import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const steps = [
  { time: 'Morning', title: 'First wake-up', description: 'One or two sentences describing what happens in the app at this point of the day. Placeholder copy.' },
  { time: 'Midday', title: 'Naps and feeds', description: 'Placeholder copy.' },
  { time: 'Evening', title: 'Massages and bedtime stories', description: 'Placeholder copy.' },
  { time: 'Night', title: 'Night wake-ups and feedings', description: 'Placeholder copy.' },
];

/**
 * Figma component `DayStep` (properties Time, Title, Description, Number, Show description; variants State and Device).
 * Active and completed steps use `--color-accent-live` (blue/500). Steps are buttons; arrow keys are not needed because every step is a tab stop.
 * Meant for a light surface.
 */
const meta = {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: { steps },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-surface-light)', padding: 'var(--space-32)', maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SecondStepActive: Story = { args: { activeStep: 1 } };
