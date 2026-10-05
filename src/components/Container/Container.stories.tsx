import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import docs from '../../docs/docs.module.css';

/**
 * Keeps page content aligned and readable. Section backgrounds run full width; the content sits in the container.
 * Side padding is 24 px on mobile and 96 px from 768 px, which matches the Figma frames (390 and 1440).
 */
const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { size: 'default', children: <div className={docs.item}>Content</div> },
  argTypes: { size: { control: 'inline-radio', options: ['default', 'narrow'] }, as: { control: false } },
  decorators: [(Story) => <div style={{ background: 'var(--color-surface-card)', paddingBlock: 'var(--space-32)' }}><Story /></div>],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Narrow: Story = { args: { size: 'narrow' } };
