import type { Meta, StoryObj } from '@storybook/react';
import { PriceBlock } from './PriceBlock';

/** Figma component `PriceBlock`: price, earlier price, period and offer. All text values are properties. Placeholder amounts until the pricing is approved. */
const meta = { title: 'Molecules/PriceBlock', component: PriceBlock, tags: ['autodocs'], args: { price: '€ [Preis]', previousPrice: '€ [alt]', period: '/ Monat', badge: 'Angebotstext' } } satisfies Meta<typeof PriceBlock>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const PriceOnly: StoryObj<typeof meta> = { args: { previousPrice: undefined, badge: undefined } };
