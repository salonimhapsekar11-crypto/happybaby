import type { Meta, StoryObj } from '@storybook/react';
import { MembershipSection } from './MembershipSection';
import image from '../../assets/images/join/join-image.webp';
import a1 from '../../assets/images/avatars/avatar-1.webp';
import a2 from '../../assets/images/avatars/avatar-2.webp';
import a4 from '../../assets/images/avatars/avatar-4.webp';
import a5 from '../../assets/images/avatars/avatar-5.webp';

/**
 * ## Use case: join section
 * The closing argument before the footer: one image, proof, the offer and a single action.
 *
 * **Built from**
 * - `Molecules/RatingRow` (`AvatarStack`, `StarRating`), `Molecules/PriceBlock` (with `Atoms/Badge`), `Molecules/CheckItem`
 * - `Atoms/Button`, variant `right-icon`: the one primary action
 * - Foundations: `--gradient-section-fade`, Headline H4 (mobile) and H2 (desktop), `--size-container-default`
 *
 * **Behaviour:** one image, no gallery. Image above the text on mobile, side by side from 768 px. The fade at the top blends the light section above into this dark one; turn it off with `fade={false}` when the section follows another dark one. Prices and ratings are placeholders until approved.
 */
const meta = {
  title: 'Use cases/Join section',
  component: MembershipSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div style={{ background: 'var(--color-surface-light)', paddingTop: 'var(--space-64)' }}><S /></div>],
  args: {
    headline: 'Join Happy Family',
    body: 'Know when the next nap is likely, log it in one tap, and plan the rest of your day around it.',
    rating: { rating: 5, label: '[Rating] · [Number] Familien', avatars: [a1, a2, a4, a5].map((src) => ({ src, alt: '' })) },
    price: { price: '€ [Preis]', previousPrice: '€ [alt]', period: '/ Monat', badge: 'Angebotstext' },
    benefits: [
      'Next-nap estimates that learn from your baby’s own rhythm',
      'White noise, lullabies and bedtime stories for calmer evenings',
      'Sleep, feeds, solids and growth logged in one tap',
      'Share the day with your partner, nanny or grandparents',
    ],
    cta: { label: 'Download and try free for 7 days', href: '#' },
    image: { src: image, alt: 'A parent holds a sleeping baby under a lavender sky' },
  },
} satisfies Meta<typeof MembershipSection>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
export const WithoutFade: Story = { args: { fade: false } };
