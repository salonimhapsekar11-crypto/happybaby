import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { NavBar } from './NavBar';

/**
 * A backdrop with colour behind the bar, so the glass effect can be seen. Glass keeps the text readable on
 * dark or mid-tone content; avoid placing it over very bright images.
 */
const withBackdrop: Decorator = (Story) => (
  <div style={{ position: 'relative', minHeight: 360, overflow: 'hidden', background: 'var(--color-surface-page)' }}>
    {[
      ['var(--color-action-attention-bg)', 8, -60, 260],
      ['var(--color-border-strong)', 38, -40, 220],
      ['var(--color-action-default-bg-hover)', 70, -50, 200],
    ].map(([color, left, top, size]) => (
      <span
        key={String(color)}
        aria-hidden
        style={{ position: 'absolute', left: `${left}%`, top, width: size, height: size, borderRadius: '50%', background: String(color) }}
      />
    ))}
    <Story />
  </div>
);

/**
 * Argument names match the Figma properties: `appearance` (Style), `scrolled` (Scroll),
 * `showLanguage`, `showCta`. **Transparent is the default** and should be used unless the design calls
 * for a solid bar. No shadows. The desktop layout applies from 768 px: logo left, links and language
 * grouped in the centre, call to action right. Below that the bar shows the logo, language and a menu button.
 */
const meta = {
  title: 'Organisms/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { appearance: 'transparent', scrolled: false },
  argTypes: {
    appearance: { control: 'inline-radio', options: ['transparent', 'purple'] },
    scrolled: { control: 'boolean' },

    cta: { control: 'object' },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default: no fill, no shadow. */
export const Transparent: Story = {};

/** A solid purple bar, for when the design calls for one. */
export const Purple: Story = { args: { appearance: 'purple' } };

/** Scrolled: a translucent fill with a 24 px background blur. */
export const TransparentScrolled: Story = { args: { scrolled: true }, decorators: [withBackdrop] };

export const PurpleScrolled: Story = { args: { appearance: 'purple', scrolled: true }, decorators: [withBackdrop] };

/** Without `scrolled`, the bar switches to glass by itself once the page scrolls. */
export const AutomaticGlass: Story = {
  args: { scrolled: undefined },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 1400, background: 'linear-gradient(var(--color-surface-page), var(--color-surface-card-raised))' }}>
        <Story />
        <p style={{ margin: 0, padding: 'var(--space-32)', color: 'var(--color-text-secondary)' }}>Scroll down: the bar becomes glass.</p>
      </div>
    ),
  ],
};

export const WithoutLanguageAndCta: Story = { args: { showLanguage: false, showCta: false } };

/** Mobile: logo left, language and menu button right. */
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };

/** The mobile menu (Figma NavMenu). Escape closes it and focus returns to the menu button. */
export const MobileMenuOpen: Story = { args: { defaultMenuOpen: true }, parameters: { viewport: { defaultViewport: 'mobile' } } };

export const MobileMenuPurple: Story = { args: { defaultMenuOpen: true, appearance: 'purple' }, parameters: { viewport: { defaultViewport: 'mobile' } } };

/** The side drawer menu on desktop. */
export const DesktopMenuOpen: Story = { args: { defaultMenuOpen: true } };
