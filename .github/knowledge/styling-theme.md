---
domain: styling-theme
related: [markdown-pipeline, admin-grid]
---

# Styling System & Theming — Mental Model

## \_tokens.scss (apps/blog/src/styles/\_tokens.scss)

- OWNS: all CSS custom properties — surfaces, primary/secondary/tertiary palettes, text, borders, error, inverse, header, cosmic gradients
- OWNS: `color-scheme: light dark` default + per-mode overrides via `[data-theme="light"|"dark"]`
- OWNS: MPA View Transitions (`@view-transition { navigation: auto }`) — also has a render-blocking copy in `index.html`
- INVARIANT: all colors use `light-dark(<light>, <dark>)` — single-source theming; toggle by setting `color-scheme` (NOT by swapping value lists)
- INVARIANT: tokens follow Material 3 naming (`surface`, `surface-container`, `on-surface`, `primary`, `on-primary`, etc.)
- TENSION: gradients can't use `light-dark()` (commas conflict with parser) — set per-mode under `[data-theme]` selectors instead
- DECIDED: `light-dark()` chosen over CSS variable swap to keep token definitions in one block per token

## \_base.scss

- OWNS: element-level resets and base typography

## \_components.scss

- OWNS: shared UI primitives (buttons, badges, surface containers)
- READS FROM: tokens

## \_prose.scss

- OWNS: typography for rendered markdown content (see `markdown-pipeline.md`)

## \_grid-theme.scss

- OWNS: visual overrides for `@toolbox-web/grid` (cell padding, row hover, header borders)
- INVARIANT: grid theme is global — applies to every `<tbw-grid>` instance in the app

## \_transitions.scss

- OWNS: `::view-transition-*` pseudos — fade/slide animations for cross-document navigation
- INVARIANT: depends on `@view-transition: auto` declaration in `_tokens.scss` and `index.html`

## styles.scss (entry)

- OWNS: import order — tokens first, then base, then components, then prose/grid/transitions
- INVARIANT: tokens MUST be imported before any consumer (pure ordering convention; SCSS will error if someone forgets)

## Theme toggle convention

- INVARIANT: `<html data-theme="light|dark">` overrides system preference; absence falls back to `color-scheme: light dark` and OS setting
- INVARIANT: `GiscusComponent` mirrors this attribute via `MutationObserver` (see `seo-comments.md`)
