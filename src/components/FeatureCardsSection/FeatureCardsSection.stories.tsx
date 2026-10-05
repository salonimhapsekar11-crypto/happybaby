import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCardsSection } from './FeatureCardsSection';
import join from '../../assets/images/join/join-image.webp';
import hero from '../../assets/images/hero/hero-mobile.webp';

const panel = (text: string) => (
  <div style={{ padding: 'var(--space-16)', borderRadius: 'var(--radius-xl)', background: 'var(--color-action-default-bg)', color: 'var(--color-text-primary)' }}>{text}</div>
);

/**
 * ## Use case: how it works
 * Two large image cards that show the product in context.
 *
 * **Built from**
 * - `Molecules/ImageCard`: full-bleed photo, gradient under the text, text at the bottom, app UI in the `overlay` slot
 * - Foundations: `--gradient-scrim-bottom`, `--size-card-media-*`, H3 type, Headline H4 (mobile) and H2 (desktop)
 *
 * **Behaviour:** stacked on mobile (440 px tall), side by side from 768 px (620 px tall). The photo scales slightly on hover and the effect is off when the visitor prefers reduced motion.
 *
 * The photos here are stand-ins: swap in the sleeping-baby and feeding photos.
 */
const meta = {
  title: 'Use cases/How it works',
  component: FeatureCardsSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    headline: 'How it works',
    cards: [
      { image: hero, eyebrow: 'Schlaf-Tracker', title: 'Live Tracking', description: 'Log feeds, diapers and sleep in a few taps.', overlay: panel('Maya is asleep since 03:41:45') },
      { image: join, eyebrow: 'Fütterungs-Tracker', title: 'Track Baby Feedings', description: 'Log feeds, diapers and sleep in a few taps.', overlay: panel('Enter amount') },
    ],
  },
} satisfies Meta<typeof FeatureCardsSection>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
