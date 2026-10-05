# Figma → Storybook component map

Source: Figma file "Design System" and the Home page (desktop 1440, mobile 390). The nav bar is out of scope for now.

## Already in Storybook

| Figma | Storybook | Notes |
|---|---|---|
| Button (Attention, Default, Live, Ghost, Link, RightIcon × Sm/Md) | `Atoms/Button` | Label property → `children` |
| IconButton | `Atoms/IconButton` | |
| Icons | `Atoms/Icon` (Lucide) | |
| Foundations: Colour, Type, Spacing | `Foundations/*` | Type now has all 69 styles |

## To build, in this order

### 1. Atoms
| Figma | Storybook story | Props |
|---|---|---|
| Logo (Byline Aumio/None × Horizontal/Stacked × Sm/Md) | `Atoms/Logo` | `byline`, `lockup`, `size` |
| BrandLogo (Happy Baby, Aumio Kids, Ally, Aumio) | `Atoms/BrandLogo` | `brand` |
| Avatar (Sm/Md/Lg, Photo None/Image) | `Atoms/Avatar` | `size`, `src`, `alt` |
| StarRow (.StarRow Rating 1–5) | `Atoms/StarRating` | `rating` |
| Link | `Atoms/Link` | footer links, hover = yellow text |
| Badge (PriceBlock offer pill) | `Atoms/Badge` | `tone`, `children` |
| Indicator (DayStep circle: number / check) | `Atoms/StepIndicator` | `state`, `number` |

### 2. Molecules
| Figma | Storybook story | Props |
|---|---|---|
| StatItem (Divider On/Off) + TrustBar | `Molecules/TrustBar` | `items[{title, description}]` |
| AvatarStack (Sm/Md) | `Molecules/AvatarStack` | `avatars`, `size` |
| ProofRow (avatar stack + label) | `Molecules/ProofRow` | `label`, `avatars` |
| RatingRow (avatar stack + stars + text) | `Molecules/RatingRow` | `rating`, `label` |
| PriceBlock | `Molecules/PriceBlock` | `price`, `previous`, `period`, `badge` |
| CheckItem | `Molecules/CheckItem` | `children` |
| DayStep (State Active/Inactive/Completed × Device) | `Molecules/Stepper` | `steps[{time,title,description}]`, `activeStep`, vertical |
| ReviewCard (Standard/Outline/Featured × Avatar) | `Molecules/ReviewCard` | `rating`, `title`, `quote`, `author`, `source` |
| FeatureCard (image card, text on gradient, reui c-card-8 style) | `Molecules/ImageCard` | `image`, `eyebrow`, `title`, `description`, `overlay` slot |

### 3. Organisms
| Figma | Storybook story | Composition |
|---|---|---|
| Hero / Home (+ Mobile) | `Organisms/Hero` | media bleed + scrims, headline, Button, TrustBar, ProofRow |
| Section / First 24 hours | `Organisms/StepperSection` | headline, Stepper, PhoneMockup |
| PhoneMockup (device/phone) | `Molecules/PhoneMockup` | `children` or `src` |
| Section / How it works | `Organisms/FeatureCards` | headline, ImageCard × n |
| Section / Reviews | `Organisms/ReviewsSection` | headline, ReviewCard × n |
| Section / Join (dark) | `Organisms/MembershipSection` | media card, RatingRow, headline, PriceBlock, CheckItem × n, Button |
| Footer (Desktop/Laptop/Mobile) | `Organisms/Footer` | links, language, copyright |
| Fade transition light → dark | `Organisms/SectionFade` | utility, eased gradient |

Not on the Home page but in Figma, to schedule later: Sticky CTA, Cookie Banner, CTA with QR, Content Sections.

### 4. Page template
`Pages/Home` composes the organisms at desktop and mobile widths.

## Rules to carry into code
- Headlines H3–H6 are one weight heavier than before: H3, H4 Bold; H5, H6 SemiBold. H1, H2, Display were already Bold.
- Mobile uses the `Mobile/*` styles only. Never reference a `Desktop/*` style in a mobile layout.
- Active and completed highlight = `blue/500`. It needs a semantic alias before code uses it.
- Every text has a Figma text style. Product UI mock content (Maya timer panel, feeding buttons, emoji) is exempt.

## Decisions (resolved from the Figma audit)
1. **One type scale:** `Headline / Title / Body / Button` (plus Display, Eyebrow, Data, Caption, Label) is canonical. The flat `H1–H3, Body L, Body, Small, Label L` styles are legacy: kept so existing layouts do not break, marked "Legacy" in their Figma description, not used in new work.
2. **Fixed:** `Body/Small` is 14 on mobile and tablet (16 on desktop). `Button/Small` is 14/20 on every breakpoint.
3. **Gradients and shadow:** code-only tokens built from semantic colours with `color-mix`, so they follow the theme: `--gradient-scrim-top|left|bottom`, `--gradient-section-fade` (11 eased stops), `--shadow-nav-scrolled`. In Figma they are saved as paint styles `Gradient/*` and effect style `Shadow/nav-scrolled`. No other shadows exist in the system.
4. **`accent/live`** added to both alias collections (blue/500). DayStep uses it.
5. **New size tokens:** `size/step-indicator` 28, `size/step-separator` 2, `size/avatar-overlap-sm|md` 10/14 (applied as negative margin in code), `size/card-media-desktop|mobile` 620/440, `size/hero-desktop|mobile` 1005/780.
6. **Images:** need exporting from Figma into `src/assets/images/` (open question for the design owner).
7. **Claims:** hero stats, proof row and the reviews headline now carry bracketed placeholders until verified.
