import type { Meta, StoryObj } from '@storybook/react';
import { PhoneMockup } from './PhoneMockup';

/** Figma frame `device/phone`. Pass a screenshot as the child. The story uses a placeholder screen. */
const meta = {
  title: 'Molecules/PhoneMockup',
  component: PhoneMockup,
  tags: ['autodocs'],
  args: {
    label: 'App screen: daily overview',
    children: <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>App screen</div>,
  },
} satisfies Meta<typeof PhoneMockup>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
