# Project Guidelines

## Overview

This is an Angular 21+ blog application built as an Nx monorepo with SSR support. It uses standalone components, Angular Signals for state management, and `@toolbox-web/grid-angular` for data grids in the admin section.

## Project Structure

| Path                 | Purpose                                               |
| -------------------- | ----------------------------------------------------- |
| `apps/blog/`         | Main Angular application                              |
| `libs/shared/`       | Shared models and services (import as `@blog/shared`) |
| `data/articles.json` | Article content data                                  |

## Build & Dev

| Command             | Action                        |
| ------------------- | ----------------------------- |
| `npx nx serve blog` | Dev server with SSR           |
| `npx nx build blog` | Production build (static SSR) |
| `npx nx test blog`  | Run unit tests (Vitest)       |
| `npx nx lint blog`  | Run ESLint                    |

## Instruction Files

Context-specific guidance is available in `.github/instructions/`. These are loaded automatically when relevant:

| Instruction                                                | When It Applies                                                                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [Angular](instructions/angular.instructions.md)            | Writing components, services, templates, routing, signals, DI — any `.ts` / `.html` / `.scss` file                                   |
| [Toolbox Grid](instructions/toolbox-grid.instructions.md)  | Working with `<tbw-grid>`, column configs, grid features/plugins, renderers, editors, filtering, sorting — especially in admin pages |
| [Testing](instructions/testing.instructions.md)            | Writing or modifying test files (`*.spec.ts`), mocking services, using TestBed or Vitest                                             |
| [Stitch](instructions/stitch.instructions.md)              | Validating UI against the design system, generating or editing screens with Stitch, working with design tokens                       |
| [Browser](instructions/browser-validation.instructions.md) | Validating rendered pages, reproducing bugs in the browser, taking screenshots, running Lighthouse audits, inspecting DOM            |

## Key Conventions

- **Standalone components only** — no NgModules
- **Signal-based state** — `signal()`, `computed()`, `effect()`, `input()`, `output()`
- **New control flow** — `@if`, `@for`, `@switch` (never `*ngIf` / `*ngFor`)
- **`inject()` function** for dependency injection (not constructor parameters)
- **SCSS** with CSS custom properties for theming
- **Static SSR** output mode with `@angular/ssr`
- **Component selector prefix**: `app`

## Knowledge Reference

The mental model of each subsystem lives in `.github/knowledge/`. Load on demand when working in the matching paths.

| File                                                | Domain            | Covers                                                                                          |
| --------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| [routing-ssr](knowledge/routing-ssr.md)             | routing-ssr       | App routes, prerender strategy, hydration, Express SSR host, admin client-only mode             |
| [article-data](knowledge/article-data.md)           | article-data      | `Article` model, `ArticleService`, `articles.json` source of truth, admin `/api/*`, image flow  |
| [markdown-pipeline](knowledge/markdown-pipeline.md) | markdown-pipeline | `marked` config (GFM, hljs, double-tilde del), `ArticleComponent` rendering, prose styles       |
| [markdown-editor](knowledge/markdown-editor.md)     | markdown-editor   | CodeMirror lifecycle, capture-phase list handlers, image drop/paste, live preview, table widget |
| [admin-grid](knowledge/admin-grid.md)               | admin-grid        | `@toolbox-web/grid-angular` setup, column renderers, filtering controller                       |
| [seo-comments](knowledge/seo-comments.md)           | seo-comments      | `SeoService` (OG/Twitter/JSON-LD), sitemap, Giscus iframe + GitHub discussions stats            |
| [styling-theme](knowledge/styling-theme.md)         | styling-theme     | Design tokens, `light-dark()` theming, `data-theme`, view transitions, grid theme               |
| [build-tooling](knowledge/build-tooling.md)         | build-tooling     | Nx targets, prebuild scripts, asset globs, SSR vs static output, deploy flow                    |

## Skills

- [retrospective](skills/retrospective/SKILL.md) — post-task review that updates instructions/knowledge/skills

> **Knowledge files — read before editing, write after learning:**
>
> - **Read gate:** Before editing any file in `apps/blog/**`, `libs/**`, or `tools/**`, or making a
>   non-trivial change anywhere, you MUST first read the knowledge files
>   that cover the affected domain. This rebuilds the mental model — state
>   ownership, invariants, design rationale — so you can spot when a
>   proposed change contradicts an earlier `DECIDED` entry and push back
>   rather than silently regress it. Trivial edits (typos, comments,
>   formatting) are exempt.
> - **Write gate:** During or after any task, if you discover a new
>   invariant, state-ownership fact, data-flow edge, design decision, or
>   tension that is not already in a knowledge file, you MUST add it to the
>   correct file using the structured notation (OWNS / READS FROM /
>   WRITES TO / INVARIANT / FLOW / TENSION / DECIDED). These files are your
>   externalized mental model — if you don't write it down, the next session
>   will rediscover it from scratch.
> - **Rule of thumb:** If the user argues for a change that contradicts a
>   `DECIDED` entry, cite the entry and ask them to justify overriding it
>   before implementing. Past decisions have context; don't silently reverse
>   them.
