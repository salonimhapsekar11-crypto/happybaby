import type { Meta, StoryObj } from '@storybook/react';
import { ReviewsSection } from './ReviewsSection';
import a1 from '../../assets/images/avatars/avatar-1.webp';
import a2 from '../../assets/images/avatars/avatar-2.webp';
import a4 from '../../assets/images/avatars/avatar-4.webp';

const base = {
  rating: 5 as const,
  title: 'Titel der Bewertung',
  quote: 'Zitat nach Freigabe einfügen. Nur echte, geprüfte Bewertungen verwenden.',
  source: 'Quelle: [App Store] · [Monat Jahr]',
};

/**
 * ## Use case: reviews
 * Social proof below the product story.
 *
 * **Built from**
 * - `Molecules/ReviewCard`: rating, title, quote, author with photo, source
 * - `Atoms/StarRating`, `Atoms/Avatar`
 * - Foundations: Headline H4 (mobile) and H2 (desktop)
 *
 * **Behaviour:** one column on mobile, three equal columns from 768 px. Only approved, real reviews go live: the copy here is placeholder.
 */
const meta = {
  title: 'Use cases/Reviews',
  component: ReviewsSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    headline: 'What [number] parents have achieved with Happy Baby',
    reviews: [
      { ...base, author: { name: '[Vorname N.]', relationship: 'Mutter von Baby, 6 Monate', avatar: a2 } },
      { ...base, author: { name: '[Vorname N.]', relationship: 'Vater von Baby, 3 Monate', avatar: a1 } },
      { ...base, author: { name: '[Vorname N.]', relationship: 'Mutter von Zwillingen', avatar: a4 } },
    ],
  },
} satisfies Meta<typeof ReviewsSection>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
