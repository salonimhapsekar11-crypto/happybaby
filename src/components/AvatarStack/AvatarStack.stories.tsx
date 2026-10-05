import type { Meta, StoryObj } from '@storybook/react';
import { AvatarStack } from './AvatarStack';
import a1 from '../../assets/images/avatars/avatar-1.webp';
import a2 from '../../assets/images/avatars/avatar-2.webp';
import a4 from '../../assets/images/avatars/avatar-4.webp';
import a5 from '../../assets/images/avatars/avatar-5.webp';

/** Figma component `AvatarStack`: property `Size` (Sm, Md). */
const meta = {
  title: 'Molecules/AvatarStack',
  component: AvatarStack,
  tags: ['autodocs'],
  args: {
    size: 'md',
    avatars: [
      { src: a1, alt: '' },
      { src: a2, alt: '' },
      { src: a4, alt: '' },
      { src: a5, alt: '' },
    ],
  },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
} satisfies Meta<typeof AvatarStack>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
export const Small: StoryObj<typeof meta> = { args: { size: 'sm' } };
