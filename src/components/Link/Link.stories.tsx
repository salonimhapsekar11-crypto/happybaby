import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

/** Figma component `Link` (Variant Standalone, properties Label and Icon right). No fill on hover: the underlined text turns yellow. */
const meta = { title: 'Atoms/Link', component: Link, tags: ['autodocs'], args: { href: '#', children: 'Datenschutz' } } satisfies Meta<typeof Link>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const WithArrow: StoryObj<typeof meta> = { args: { iconRight: true, children: 'Mehr erfahren' } };
