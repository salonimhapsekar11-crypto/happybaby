# AGENTS.md: Happy Baby design system

Read this first. It tells an AI coding agent how to build a **landing page from a screenshot** using this repo's components and the Figma file. Prefer reusing what exists over writing new CSS.

- Repo: https://github.com/salonimhapsekar11-crypto/happybaby (Storybook is published with GitHub Pages)
- Figma file: `3AAhNwvt6arydm2XE1epYy` (page "Design System" for components, page "Explorations" for the Home page)
- Stack: React 18, TypeScript strict, Vite, Storybook 8.6.18, CSS Modules. **No Tailwind.**

## 1. Workflow: screenshot to page

1. **Segment the screenshot** into sections, top to bottom (hero, steps, cards, reviews, join, footer). Name each.
2. **Match each section** to a use case in section 4. Reuse the section component. Only build a new one if nothing fits.
3. **Match elements inside it** to components in section 3. Never rebuild a button, card, avatar or rating row by hand.
4. **Lay out with `Flex` and `Container`.** No new `display: flex` rules unless a component needs one internally.
5. **Take every value from tokens** (section 2). If the screenshot needs a value that has no token, pick the nearest token and list the gap at the end of your answer. Do not invent a hex or pixel value.
6. **Copy:** keep the screenshot's wording if it is real content. If a number, rating or certification is a claim, keep it in brackets, for example `[Number] installs`. Never invent statistics.
7. **Run the checks** (section 6) and fix every failure before you say you are done.

## 2. Tokens (the only source of values)

Generated, never hand-edit: `src/styles/tokens.css` (CSS variables) and `src/styles/tokens.ts`. Source of truth: `tokens/figma-export.json`.

| Need | Use | Never |
|---|---|---|
| Colour | `var(--color-*)` semantic tokens (`--color-text-primary`, `--color-surface-card`, `--color-action-default-bg`, `--color-accent-live`) | hex, `--primitive-*` in components |
| Spacing | `var(--space-4 … 128)` | raw px for gap or padding |
| Radius | `var(--radius-sm … 2xl, full)` | raw px radius |
| Size | `var(--size-*)` (avatar, hero, card media, container, step) | magic widths |
| Type | classes `type-h1`, `type-body`, `type-title-medium`, `type-eyebrow`, `type-label`, … or `var(--type-<role>-<mobile\|desktop>-size)` | font shorthands by hand |
| Gradient and shadow | `--gradient-scrim-top\|left\|bottom`, `--gradient-section-fade`, `--shadow-nav-scrolled` | custom gradients, any other shadow |

Rules that matter:
- Mobile is the base; desktop applies from **768 px** (`@media (min-width: 48em)`).
- **One typeface: Poppins.** Headlines H3 and H4 are Bold, H5 and H6 SemiBold.
- **Purple 500 is the single primary action per view** (`Button variant="attention"` or `right-icon`). **Blue is only for a live state** (`--color-accent-live`): an active step, a running timer.
- Dark is the default theme (`data-theme="dark"`). Some landing sections use the light surface (`--color-surface-light`, `--color-text-on-light`); the hero, join and footer are dark.
- **Text over a photo always sits on a gradient token.** No exceptions.
- No shadows on cards or buttons. Depth comes from surface colour.
- The check script fails on hex colours or pixel literals in component code.

## 3. Components

Import from `src/components/<Name>/<Name>`. Prop names mirror the Figma component properties. Each has a story with controls: open Storybook for the exact API.

### Layout
| Component | Use |
|---|---|
| `Flex` | `direction`, `gap` (space tokens only), `align`, `justify`, `wrap`, `stackOnMobile`, `as` |
| `Container` | page-width wrapper, `size="default"` (1248) or `"narrow"` (720), 24 px side padding on mobile and 96 px from 768 px |

### Atoms
| Component | Figma | Notes |
|---|---|---|
| `Button` | `Button` (node 27:10997) | `variant` attention, right-icon, default, live, ghost, link; `size` sm or md; `iconLeft`, `iconRight`, `fullWidth`, `href` makes it a link |
| `IconButton` | IconButton | 44 px circle |
| `Icon` | Icons | Lucide, `name`, `size` |
| `Link` | `Link` (Standalone) | `href`, `iconRight`; hover turns the text yellow |
| `Badge` | `badge` | short pill, blue |
| `Avatar` | `.Avatar` (Size, Photo) | `src`, `alt`, `size` sm, md, lg |
| `StarRating` | `.StarRow` | `rating` 1 to 5 |

### Molecules
| Component | Figma | Props |
|---|---|---|
| `AvatarStack` | AvatarStack | `avatars[{src, alt}]`, `size` |
| `TrustBar` / `StatItem` | TrustBar | `items[{title, description}]`. Stacks on mobile |
| `ProofRow` | ProofRow | `avatars`, `label` |
| `CheckItem` | CheckItem | benefit with a check |
| `RatingRow` | RatingRow | `avatars`, `rating`, `label` |
| `PriceBlock` | PriceBlock | `price`, `previousPrice`, `period`, `badge` |
| `ReviewCard` | ReviewCard (Layout, Avatar) | `layout`, `rating`, `title`, `quote`, `author`, `source` |
| `ImageCard` | HowItWorksCard (node 72:7011) | `image`, `eyebrow`, `title`, `description`, `overlay` |
| `Stepper` | DayStep (node 77:7786) | `steps[{time, title, description}]`, `activeStep`, `onStepChange` |
| `PhoneMockup` | `device/phone` | `children`, `label` |

### Organisms and sections
| Component | Figma | Composition |
|---|---|---|
| `Hero` | `Hero / Home` (72:6185), `Hero / Home Mobile` (77:7304) | `headline`, `cta`, `stats`, `proof`, `image{desktop,mobile,alt}`, `nav` slot |
| `StepperSection` | Section / First 24 hours | headline, `Stepper`, `PhoneMockup` |
| `FeatureCardsSection` | Section / How it works | headline, `ImageCard` × n |
| `ReviewsSection` | Section / Reviews | headline, `ReviewCard` × n |
| `MembershipSection` | Section / Join (dark), Home page 72:7227 | headline, body, `RatingRow`, `PriceBlock`, `CheckItem` × n, `Button`, one image, `fade` |
| `Footer` | `Footer` (Breakpoint Desktop, Laptop, Mobile) | `logo` slot, `links`, `language`, `copyright` |
| `NavBar` | BrandNav (69:4186) | `appearance` transparent or purple, `links`, `language`, `cta`. Passes into `Hero` through `nav` |

### Not built yet: build with the same rules, and say so
- **Side menu panel** (Figma 69:4721) and the **page template** (`Pages/Home`).

## 4. Section recipes (page order)

Reference page in Figma: desktop `72:5917`, mobile `77:7257` (page "Explorations"). Stories: **Use cases / Hero banner, First 24 hours, How it works, Reviews**.

```tsx
<main>
  <Hero headline={<>Rested parents<br />Calmer Days</>} cta={{ label: 'Download from App Store', href: '#' }}
        stats={[…]} proof={{ label: '[Expert endorsement, to be verified]', avatars }} image={{ desktop, mobile, alt }} nav={<NavBar … />} />
  <StepperSection headline="What does your first 24 hours look like?" steps={steps} screen={…} screenLabel="…" />
  <FeatureCardsSection headline="How it works" cards={cards} />
  <ReviewsSection headline="What [number] parents have achieved with Happy Baby" reviews={reviews} />
  <MembershipSection headline="Join Happy Family" body="…" price={…} benefits={…} cta={…} image={…} />
</main>
<Footer logo={…} links={…} language={…} copyright="© [Jahr] [Firmenname]. Alle Rechte vorbehalten." />
```

Transitions: light sections end with a `--gradient-section-fade` band into the dark join section. Keep roughly 160 px of space between the join content and the footer.

## 5. Images

Photos live in `src/assets/images/` (WebP). The two How it works images already include the app UI panels, so `ImageCard` needs no `overlay` for them. Hero photos already contain their own top shade and bottom fade. Use `<picture>` for desktop and mobile. Avatars are 96 px WebP. Product screenshots and stock photos here are stand-ins: do not present them as final.

## 6. Checks (must pass)

```bash
npm install
npm run check          # typecheck, tests, token parity, build, axe, no-horizontal-scroll 320 to 1440 px
```

If you change a token: edit Figma, export to `tokens/figma-export.json`, run `npm run tokens`, then `npm run check:tokens`.

## 7. Reading Figma

Use the Figma MCP server with file key `3AAhNwvt6arydm2XE1epYy`. Components are on page "Design System" (sections Foundations, Atoms, Navigation, Content and social proof). Read variables from the file, not from screenshots: text styles are named `Mobile|Desktop|Tablet / Headline / H4` and so on, and map one to one to the `type-*` classes. A longer component map with props is in `docs/storybook-component-map.md`.

## 8. Do not

- Do not use Tailwind, inline pixel values or raw hex colours.
- Do not add a second typeface.
- Do not add a shadow to a card or button.
- Do not place white text on a photo without a gradient.
- Do not claim numbers, ratings, certifications or endorsements. Use bracketed placeholders.
- Do not edit `tokens.css`, `tokens.ts` or `storybook-static/`.
