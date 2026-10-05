import type { Meta, StoryObj } from '@storybook/react';
import { ProofRow } from './ProofRow';
import a1 from '../../assets/images/avatars/avatar-1.webp';
import a2 from '../../assets/images/avatars/avatar-2.webp';
import a4 from '../../assets/images/avatars/avatar-4.webp';
import a5 from '../../assets/images/avatars/avatar-5.webp';

/** Figma component `ProofRow`: property `Label`. */
const meta = {
  title: 'Molecules/ProofRow',
  component: ProofRow,
  tags: ['autodocs'],
  args: {
    label: '[Expert endorsement, to be verified]',
    avatars: [a1, a2, a4, a5].map((src) => ({ src, alt: '' })),
  },
} satisfies Meta<typeof ProofRow>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
