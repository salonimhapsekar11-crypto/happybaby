import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';
import docs from '../../docs/docs.module.css';

const items = (n = 4) => Array.from({ length: n }, (_, i) => <div key={i} className={docs.item}>{i + 1}</div>);

/**
 * Flexbox as a component. New to flexbox? Read **Layout / What is flexbox** first.
 *
 * - `direction` is `flex-direction` and Figma Horizontal / Vertical
 * - `gap` is `gap` and Figma Spacing between items
 * - `align` is `align-items` and Figma alignment (cross axis)
 * - `justify` is `justify-content` and Figma Packed / Space between
 * - `wrap` is `flex-wrap` and Figma Wrap
 *
 * Gaps only accept space tokens, so layouts cannot drift off the 4 px grid.
 */
const meta = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  args: { direction: 'row', gap: '16', align: 'stretch', justify: 'start', children: items() },
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column'] },
    gap: { control: 'select', options: ['0', '4', '8', '12', '16', '20', '24', '32', '40', '48', '64', '80', '96', '128'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around'] },
    wrap: { control: 'boolean' },
    as: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {};
export const Column: Story = { args: { direction: 'column' } };
export const SpaceBetween: Story = { args: { justify: 'between' } };
export const CenteredBothAxes: Story = { args: { justify: 'center', align: 'center', style: { minHeight: 160 } } };
export const Wrapping: Story = { args: { wrap: true, gap: '12', children: items(14) } };
export const StackOnMobile: Story = {
  args: { stackOnMobile: true, gap: '24' },
  parameters: { docs: { description: { story: 'Column under 768 px, row above. Resize the canvas or switch the viewport to see it.' } } },
};
