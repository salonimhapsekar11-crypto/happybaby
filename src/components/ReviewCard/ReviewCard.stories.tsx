import type { Meta, StoryObj } from '@storybook/react';
import { ReviewCard } from './ReviewCard';
import a2 from '../../assets/images/avatars/avatar-2.webp';

/** Figma component `ReviewCard`: `Layout` (Standard, Outline, Featured) × `Avatar` (Photo, None). The text is placeholder until real reviews are approved. */
const meta = {
  title: 'Molecules/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
  args: {
    layout: 'standard',
    rating: 5,
    title: 'Titel der Bewertung',
    quote: 'Zitat nach Freigabe einfügen. Nur echte, geprüfte Bewertungen verwenden.',
    author: { name: '[Vorname N.]', relationship: 'Mutter von Baby, 6 Monate', avatar: a2 },
    source: 'Quelle: [App Store] · [Monat Jahr]',
  },
  argTypes: { layout: { control: 'inline-radio', options: ['standard', 'outline', 'featured'] } },
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Standard: Story = {};
export const Outline: Story = { args: { layout: 'outline' } };
export const Featured: Story = { args: { layout: 'featured' } };
export const WithoutPhoto: Story = { args: { author: { name: '[Vorname N.]', relationship: 'Vater von Baby, 3 Monate' } } };
