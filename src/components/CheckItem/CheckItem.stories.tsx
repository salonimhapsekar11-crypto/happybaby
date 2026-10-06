import type { Meta, StoryObj } from '@storybook/react';
import { CheckItem } from './CheckItem';

/** Figma component `CheckItem`. The text wraps and the check stays at the top. */
const meta = { title: 'Molecules/CheckItem', component: CheckItem, tags: ['autodocs'], args: { children: 'Merkmal in einer Zeile, Platzhalter' }, decorators: [(S) => <div style={{ maxWidth: 360 }}><S /></div>] } satisfies Meta<typeof CheckItem>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const LongText: StoryObj<typeof meta> = { args: { children: 'Ein längerer Satz, der in der Mobilansicht auf zwei Zeilen umbricht und trotzdem sauber ausgerichtet bleibt' } };
