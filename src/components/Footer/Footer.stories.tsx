import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Footer } from './Footer';
import logo from '../../assets/logo-wordmark.svg';

/**
 * ## Use case: footer
 * Legal links, language and copyright on the page-dark surface.
 *
 * **Built from:** `Atoms/Link` (the legal links), a native `select` for the language (keyboard and screen reader friendly), the logo as a slot.
 *
 * **Behaviour:** logo left and links right from 768 px; stacked on mobile with 44 px touch targets. Figma properties: `Copyright`, `Show language`, `Breakpoint`.
 * Always keep the Impressum and Datenschutz links: they are a legal requirement for a German site.
 */
const meta = {
  title: 'Use cases/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    logo: <a href="#"><img src={logo} alt="Happy Baby, zur Startseite" /></a>,
    links: [
      { label: 'Impressum', href: '#' },
      { label: 'Datenschutz', href: '#' },
      { label: 'Nutzungsbedingungen', href: '#' },
    ],
    language: { value: 'de', options: [{ value: 'de', label: 'DE' }, { value: 'en', label: 'EN' }] },
    copyright: '© [Jahr] [Firmenname]. Alle Rechte vorbehalten.',
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
export const WithoutLanguage: Story = { args: { language: undefined } };
export const Interactive: Story = {
  render: (args) => {
    const [lang, setLang] = useState('de');
    return <Footer {...args} language={{ value: lang, options: [{ value: 'de', label: 'DE' }, { value: 'en', label: 'EN' }], onChange: setLang }} />;
  },
};
