# Happy Baby design system

React + TypeScript components, documented in Storybook. Design tokens are **generated from the Figma file**, not typed by hand.

Figma: file `3AAhNwvt6arydm2XE1epYy`, page **Design System**.

## Live Storybook

Published with GitHub Pages on every push to `main`: https://salonimhapsekar11-crypto.github.io/happybaby/

One-time setup: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Run it

```bash
npm install
npm run storybook          # http://localhost:6006
npm run check              # typecheck, unit tests, token checks, Storybook build, browser checks
```

First time only, for the browser checks: `npx playwright install chromium`.

## Stack

| Layer | Tool | Why |
| --- | --- | --- |
| UI | React 18 | Component model that maps 1:1 to Figma component sets |
| Language | TypeScript (strict) | Props are typed, and Figma property names are enforced in code |
| Build | Vite 5 | Fast dev server and build; Storybook runs on it |
| Docs | Storybook 8 (`react-vite`) | Stories per variant, state matrix, playground, code shown under every demo |
| Styling | CSS Modules + CSS custom properties | Figma variables become CSS variables; no runtime cost; themes by `data-theme` |
| Tokens | `tokens/figma-export.json` + `scripts/build-tokens.mjs` | One generated `tokens.css`; Dark (default) and Light |
| Icons | `lucide-react` (ISC) | Open source, 24 px grid, 2 px stroke, same style as the Figma icons |
| Font | `@fontsource/poppins` | Self-hosted Poppins 400/500/600/700, no external request |
| Unit tests | Vitest + Testing Library | Behaviour and semantics of each component |
| Accessibility | `@storybook/addon-a11y` + axe via Playwright | Runs on every story, both themes |
| Browser checks | Playwright | Renders the built Storybook and compares real sizes, colours and focus rings with Figma |

Tailwind is **not** used. The tokens are semantic CSS variables (`--color-action-attention-bg`), and Tailwind would need a second mapping layer from those names to utility classes.
It can be added later on top of the same variables if the team prefers it.

## How tokens flow

1. Figma variables and text styles are exported to `tokens/figma-export.json`.
2. `npm run tokens` generates `src/styles/tokens.css` (and `tokens.ts` for docs). Never edit these by hand.
3. Components use **semantic tokens only** (`--color-*`, `--space-*`, `--radius-*`, `--size-*`, `.type-*`). Primitives exist but are not used by components.
4. `npm run check:tokens` proves the CSS equals the Figma export, checks WCAG contrast for every Button pairing in both themes, and fails on hex colours or pixel literals in component code.

## Rules carried over from Figma

- **Blue is only for a live state** (running timer, playing audio). Never a generic call to action.
- **`attention` (purple/500) is the single primary action** in a view. Everything else is `default` (purple/700).
- White text on blue fails contrast (2.75:1), so the Live button label is purple/700.
- **Hover is yellow/500 with a purple/700 label** (`--color-action-hover-bg`, `--color-action-hover-text`), because white on yellow fails contrast. **Link hover has no fill:** the underlined text turns yellow (`--color-text-link-hover`; purple/700 in Light).
- Interactive targets are at least 44 px. Focus is a 2 px yellow ring with a 2 px offset.

## Figma to code property map (Button)

| Figma | Code |
| --- | --- |
| `Variant` Attention / RightIcon / Default / Live / Ghost / Link | `variant` `'attention' \| 'right-icon' \| 'default' \| 'live' \| 'ghost' \| 'link'` |
| `Size` Sm / Md | `size` `'sm' \| 'md'` |
| `State` Default / Hover / Pressed / Focus / Disabled | CSS `:hover`, `:active`, `:focus-visible`, `disabled` |
| `Label` | `children` |
| `Icon left` + `Icon left swap` | `iconLeft` |
| `Icon right` + `Icon right swap` | `iconRight` |
| Fill container | `fullWidth` |

## Status

Built: Foundations (Colors, Typography, Spacing) and Atoms/Button.
Next: IconButton, Link, Chip, Tag, then navigation and content components.
