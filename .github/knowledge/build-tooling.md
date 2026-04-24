---
domain: build-tooling
related: [routing-ssr, article-data, seo-comments]
---

# Build & Tooling — Mental Model

## package.json scripts

- OWNS: `start` → `nx serve blog` (dev with SSR)
- OWNS: `prebuild` → `node tools/generate-article-index.mjs && node tools/generate-sitemap.mjs`
- OWNS: `build` → `nx build blog` (relies on npm-lifecycle `prebuild` to fire first)
- OWNS: `test` → `nx test blog` (Vitest via `@angular/build:unit-test`)
- OWNS: `lint` → `nx lint blog`
- INVARIANT: `prebuild` MUST run before `build` — `articles-index.json` and `sitemap.xml` are required artifacts
- INVARIANT: `npm run build` triggers `prebuild`; `nx build blog` directly does NOT — always invoke through npm or chain manually

## apps/blog/project.json (Nx targets)

- OWNS: build target — `@angular/build:application`, `outputPath: dist/apps/blog`, `outputMode: 'static'` (production), `'server'` (development)
- OWNS: assets glob — copies `apps/blog/public/**`, `data/articles.json` → `/data/articles.json`, `data/articles-index.json` → `/data/articles-index.json`
- OWNS: SSR entry `apps/blog/src/server.ts`, server bootstrap `main.server.ts`
- OWNS: loader `{ ".md": "text" }` — markdown imports become string content
- OWNS: production budgets — initial `500kb warn / 1mb error`, anyComponentStyle `12kb warn / 16kb error`
- INVARIANT: dev configuration uses `outputMode: 'server'` (full SSR) — production uses `'static'` (SSG only)
- INVARIANT: data JSON files are EMITTED into the static build under `/data/*.json` so client `HttpClient` calls resolve

## generate-article-index.mjs

- See `article-data.md` — projects `articles.json` to `articles-index.json` minus `content` field

## generate-sitemap.mjs

- See `seo-comments.md` — emits `sitemap.xml` for published articles only

## Nx workspace (nx.json)

- OWNS: target defaults, cache rules, plugin configuration
- READS FROM: `@nx/angular`, `@nx/eslint`, `@nx/web`

## libs/shared (libs/shared/project.json)

- OWNS: `@blog/shared` library — model + services + marked config
- INVARIANT: importable as `@blog/shared` (path alias in `tsconfig.base.json`)
- INVARIANT: any browser-only API used here breaks SSR — services must guard with `isPlatformBrowser` or use SSR-safe APIs (`HttpClient` is fine, `localStorage` is not)

## CI / deploy

- OWNS: GitHub Pages deployment of `dist/apps/blog/browser` (static prerendered output)
- READS FROM: `master` branch — `git push` from admin API triggers rebuild
- TENSION: every admin save → commit + push → CI rebuild; no batching

## Build-time data flow

- FLOW: `npm run build` → npm runs `prebuild` → `generate-article-index.mjs` writes `data/articles-index.json` → `generate-sitemap.mjs` writes `apps/blog/public/sitemap.xml` → `nx build blog` → Angular compiles, runs `serverRoutes.getPrerenderParams()` (imports `articles.json`), emits one HTML per published slug + index pages → static dist ready to deploy
