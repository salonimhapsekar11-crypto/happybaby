import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCardsSection } from './FeatureCardsSection';
import live from '../../assets/images/how-it-works/live-tracking.webp';
import feeding from '../../assets/images/how-it-works/feeding.webp';

/**
 * ## Use case: how it works
 * Two large image cards that show the product in context.
 *
 * **Built from**
 * - `Molecules/ImageCard`: full-bleed image with the app UI already in it, gradient under the text, text at the bottom
 * - Foundations: `--gradient-scrim-bottom`, `--size-card-media-*`, H3 type, Headline H4 (mobile) and H2 (desktop)
 *
 * **Behaviour:** stacked on mobile (440 px tall), side by side from 768 px (620 px tall). The photo scales slightly on hover and the effect is off when the visitor prefers reduced motion.
 */
const meta = {
  title: 'Use cases/How it works',
  component: FeatureCardsSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    headline: 'How it works',
    cards: [
      { image: live, eyebrow: 'Schlaf-Tracker', title: 'Live Tracking', description: 'Log feeds, diapers and sleep in a few taps.' },
      { image: feeding, eyebrow: 'Fütterungs-Tracker', title: 'Track Baby Feedings', description: 'Log feeds, diapers and sleep in a few taps.' },
    ],
  },
} satisfies Meta<typeof FeatureCardsSection>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
