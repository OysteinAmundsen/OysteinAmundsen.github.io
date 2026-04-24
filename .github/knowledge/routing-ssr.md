---
domain: routing-ssr
related: [article-data, build-tooling]
---

# Routing & SSR — Mental Model

## appRoutes (apps/blog/src/app/app.routes.ts)

- OWNS: client-side route table (lazy `loadComponent` only, no NgModules)
- OWNS: top-level routes — `''` (feed), `article/:slug`, `admin` with children `''`, `edit/:id`, `new`
- INVARIANT: every route uses `loadComponent` (standalone components only)
- INVARIANT: admin routes are nested under a single `AdminLayoutComponent` parent

## serverRoutes (apps/blog/src/app/app.routes.server.ts)

- OWNS: per-route render mode for SSR/SSG
- OWNS: prerender param resolution for `article/:slug` via `getPrerenderParams()`
- READS FROM: `data/articles.json` at build time (static import — bundled into server build)
- INVARIANT: only `status === 'published'` articles are prerendered
- INVARIANT: `admin/**` is `RenderMode.Client` — never prerendered, never SSR'd
- FLOW[prerender]: build → import articles.json → filter published → emit slug list → Angular generates one HTML per slug
- TENSION: every published article must exist in `articles.json` at build time; runtime-only articles cannot exist
- DECIDED: admin tree is client-only to avoid bundling admin code into the static output and to keep `/api` calls out of prerender

## appConfig (apps/blog/src/app/app.config.ts)

- OWNS: client provider graph
- OWNS: `provideClientHydration(withEventReplay())` — replays user clicks during hydration
- OWNS: `provideRouter(appRoutes, withComponentInputBinding())` — route params auto-bind to `input()` signals
- OWNS: `provideHttpClient(withFetch())` — uses Fetch API (works in SSR)
- INVARIANT: `withComponentInputBinding()` is required because page components consume route params via `input.required<string>()` (see `article.component.ts` `slug`)

## appConfigServer (apps/blog/src/app/app.config.server.ts)

- OWNS: server-only provider merge with `appConfig`
- READS FROM: `serverRoutes` for SSR route configuration

## server.ts (Express SSR host)

- OWNS: Express app composing API + static + Angular SSR
- OWNS: middleware order — `/api` → public assets → browser dist → Angular SSR catch-all
- WRITES TO: HTTP responses via `writeResponseToNodeResponse`
- INVARIANT: `/api` is mounted before static handlers so admin endpoints win against any same-named asset
- INVARIANT: static `browserDistFolder` cached `1y`; `publicFolder` `maxAge: 0` (data files must update without cache busting)
- TENSION: admin API only exists when running `nx serve` (or production server); static deployment has no `/api`
- DECIDED: bodyParser limit `10mb` to allow base64 image uploads without chunking

## main.server.ts

- OWNS: server bootstrap context (consumed by `@angular/ssr/node`)
