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
