import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

/** Figma `badge` (surface/live fill, Caption type). Dark label (text/on-light) on blue in both themes, for contrast. */
const meta = { title: 'Atoms/Badge', component: Badge, tags: ['autodocs'], args: { children: 'Angebotstext' } } satisfies Meta<typeof Badge>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
