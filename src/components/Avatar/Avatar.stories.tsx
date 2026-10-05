import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import a1 from '../../assets/images/avatars/avatar-1.webp';
import docs from '../../docs/docs.module.css';

/** Figma component `.Avatar`: properties `Size` (Sm, Md, Lg) and `Photo` (None, Image). */
const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { alt: 'Portrait einer Mutter', size: 'md', src: a1 },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }, ring: { control: 'boolean' } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Photo: Story = {};
export const Placeholder: Story = { args: { src: undefined, alt: '' } };
export const Sizes: Story = {
  render: (args) => (
    <div className={docs.row}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};
