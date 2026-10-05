import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';
import desktop from '../../assets/images/hero/hero-desktop.webp';
import mobile from '../../assets/images/hero/hero-mobile.webp';
import a1 from '../../assets/images/avatars/avatar-1.webp';
import a2 from '../../assets/images/avatars/avatar-2.webp';
import a4 from '../../assets/images/avatars/avatar-4.webp';
import a5 from '../../assets/images/avatars/avatar-5.webp';

/**
 * ## Use case: hero banner
 * The first screen of the landing page. One headline, one primary action, a short row of proof.
 *
 * **Built from** (each has its own page in Storybook):
 * - `Atoms/Button`, variant `right-icon`: the single primary action
 * - `Molecules/TrustBar` with `StatItem`: three facts, stacked on mobile
 * - `Molecules/ProofRow` with `AvatarStack` and `Avatar`: social proof
 * - Foundations: `--gradient-scrim-left`, `--size-hero-*`, Display (mobile) and H1 (desktop) type
 *
 * **Behaviour**
 * - Under 768 px the mobile photo is used, the stats stack and the button fills the width.
 * - The photo is larger than the frame, so it bleeds on every edge. The exported photos already contain the top shade and the bottom fade; one left gradient keeps the white text readable (WCAG AA).
 * - The navigation is a slot (`nav`) and is not part of this story.
 *
 * Statistics and endorsements are placeholders until they are verified.
 */
const meta = {
  title: 'Use cases/Hero banner',
  component: Hero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-surface-light)' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    headline: (
      <>
        Rested parents
        <br />
        Calmer Days
      </>
    ),
    cta: { label: 'Download from App Store', href: '#' },
    stats: [
      { title: 'Trusted by parents', description: '[Number] sleep entries' },
      { title: '[Rating] stars', description: '[Number] installs in the App Store' },
      { title: 'Safe by design', description: '[Certification, to be verified]' },
    ],
    proof: { label: '[Expert endorsement, to be verified]', avatars: [a1, a2, a4, a5].map((src) => ({ src, alt: '' })) },
    image: { desktop, mobile, alt: 'A father holds his sleeping newborn on his shoulder' },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
export const WithoutProof: Story = { args: { proof: undefined, stats: undefined } };
