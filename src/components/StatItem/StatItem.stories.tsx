import type { Meta, StoryObj } from '@storybook/react';
import { StatItem, TrustBar } from './StatItem';

/** Figma components `StatItem` (properties Title, Description, Divider) and `TrustBar`. Copy is placeholder until verified. */
const meta = {
  title: 'Molecules/TrustBar',
  component: TrustBar,
  tags: ['autodocs'],
  args: {
    items: [
      { title: 'Trusted by parents', description: '[Number] sleep entries' },
      { title: '[Rating] stars', description: '[Number] installs in the App Store' },
      { title: 'Safe by design', description: '[Certification, to be verified]' },
    ],
  },
} satisfies Meta<typeof TrustBar>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
export const SingleItem: StoryObj<typeof StatItem> = {
  render: () => <StatItem title="Trusted by parents" description="[Number] sleep entries" />,
};
