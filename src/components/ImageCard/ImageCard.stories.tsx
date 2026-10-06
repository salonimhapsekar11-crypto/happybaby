import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard } from './ImageCard';
import live from '../../assets/images/how-it-works/live-tracking.webp';

/**
 * Figma component `HowItWorksCard` (properties Eyebrow, Title, Description), styled after reui `c-card-8`.
 * The photo fills the card; a gradient (`--gradient-scrim-bottom`) keeps the white text readable.
 * The text lives at the bottom. App UI can float above it through the `overlay` slot.
 */
const meta = {
  title: 'Molecules/ImageCard',
  component: ImageCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 600 }}><Story /></div>],
  args: {
    image: live,
    eyebrow: 'Schlaf-Tracker',
    title: 'Live Tracking',
    description: 'Log feeds, diapers and sleep in a few taps.',
  },
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithOverlay: Story = {
  args: { overlay: <div style={{ padding: 'var(--space-16)', borderRadius: 'var(--radius-xl)', background: 'var(--color-action-default-bg)', color: 'var(--color-action-default-text)' }}>Maya is asleep since 03:41:45</div> },
};
export const WithoutImage: Story = { args: { image: undefined } };
