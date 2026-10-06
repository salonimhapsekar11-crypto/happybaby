import type { Meta, StoryObj } from '@storybook/react';
import { RatingRow } from './RatingRow';
import a1 from '../../assets/images/avatars/avatar-1.webp';
import a2 from '../../assets/images/avatars/avatar-2.webp';
import a4 from '../../assets/images/avatars/avatar-4.webp';
import a5 from '../../assets/images/avatars/avatar-5.webp';

/** Figma component `RatingRow`. */
const meta = { title: 'Molecules/RatingRow', component: RatingRow, tags: ['autodocs'], args: { rating: 5, label: '[Rating] · [Number] Familien', avatars: [a1, a2, a4, a5].map((src) => ({ src, alt: '' })) } } satisfies Meta<typeof RatingRow>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
