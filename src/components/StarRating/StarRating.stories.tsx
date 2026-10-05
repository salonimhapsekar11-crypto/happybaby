import type { Meta, StoryObj } from '@storybook/react';
import { StarRating } from './StarRating';

/** Figma component `.StarRow` (Rating 1 to 5). Filled stars use the yellow accent. */
const meta = {
  title: 'Atoms/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  args: { rating: 5 },
  argTypes: { rating: { control: 'inline-radio', options: [1, 2, 3, 4, 5] } },
} satisfies Meta<typeof StarRating>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
export const ThreeStars: StoryObj<typeof meta> = { args: { rating: 3 } };
