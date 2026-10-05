import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Icon } from '../Icon/Icon';

/**
 * Argument names match the Figma component properties: `variant`, and `icon` (the Figma Icon swap).
 * `label` is the hidden accessible name. Hover is yellow/500 with a purple/700 icon.
 */
const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { label: 'Zurück', variant: 'default', icon: <Icon name="arrow-left" /> },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'ghost', 'subtle'] },
    icon: { control: false },
    forceState: { control: 'select', options: [undefined, 'hover', 'pressed', 'focus'] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Subtle: Story = { args: { variant: 'subtle' } };
export const Disabled: Story = { args: { disabled: true } };
export const Menu: Story = { args: { label: 'Menü öffnen', variant: 'ghost', icon: <Icon name="menu" /> } };
