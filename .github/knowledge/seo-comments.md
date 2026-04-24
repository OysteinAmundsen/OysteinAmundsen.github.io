---
domain: seo-comments
related: [article-data, routing-ssr, build-tooling]
---

# SEO & Giscus Comments — Mental Model

## SeoService (libs/shared/src/lib/services/seo.service.ts)

- OWNS: head meta tags — title, description, Open Graph (`og:*`), Twitter Card, canonical link
- OWNS: JSON-LD `<script type="application/ld+json">` injection (BlogPosting schema)
- OWNS: cleanup of article-specific tags (`article:published_time`, `article:modified_time`, `article:author`, `article:tag`)
- READS FROM: `Article` model fields (title, excerpt, slug, coverImage, publishedAt, updatedAt, author, tags)
- WRITES TO: `<title>`, `<meta>` tags, `<link rel="canonical">`, JSON-LD `<script>` in document head
- INVARIANT: `setPageMeta` is the base operation — `setArticleMeta` ALWAYS calls it first then layers article-specific tags
- INVARIANT: every call to `setPageMeta` removes prior article tags + JSON-LD (prevents stale data leaking across navigation)
- INVARIANT: `SITE_URL` is hardcoded `https://oysteinamundsen.github.io` — image and canonical URLs prepend this if not absolute
- INVARIANT: `twitter:card` is `summary_large_image` when image present, otherwise `summary`
- INVARIANT: `article:tag` uses `addTag` (not `updateTag`) — multiple tags create multiple meta elements; cleanup must `querySelectorAll().forEach(remove)`
- TENSION: hardcoded `SITE_NAME`/`SITE_URL` — multi-domain or staging URL would require service refactor
- DECIDED: canonical URL injection works during SSR because `DOCUMENT` token resolves to the SSR document

## generate-sitemap.mjs (tools/)

- OWNS: build-time generation of `apps/blog/public/sitemap.xml`
- READS FROM: `data/articles.json` filtered to `status === 'published'`
- WRITES TO: `apps/blog/public/sitemap.xml` (single file, deletes any matching `sitemap*.xml` first)
- INVARIANT: homepage gets `priority 1.0, changefreq weekly`; articles get `priority 0.8, changefreq monthly`
- INVARIANT: article `lastmod` falls back chain: `updatedAt` → `publishedAt` → today
- INVARIANT: must run BEFORE `nx build blog` (chained via npm `prebuild` script)

## GiscusComponent (apps/blog/src/app/pages/article/giscus.component.ts)

- OWNS: Giscus iframe embed for an article's discussion thread
- OWNS: theme sync via `MutationObserver` on `<html>` `data-theme` attribute
- READS FROM: `term` input (article slug — used as `data-term` discussion key)
- READS FROM: `data-theme` attribute on `<html>` and `prefers-color-scheme` media query
- WRITES TO: appends `<script src="https://giscus.app/client.js">` into `.giscus-container`
- WRITES TO: `iframe.contentWindow.postMessage` with new theme on `data-theme` change
- INVARIANT: only loads in browser (`isPlatformBrowser` guard) — no SSR
- INVARIANT: Giscus repo / category is hardcoded — `OysteinAmundsen/OysteinAmundsen.github.io`, category `Announcements`
- INVARIANT: theme mapping — `light → light`, `dark → dark_dimmed`, system → match `prefers-color-scheme`
- TENSION: re-running effect rebuilds the iframe (clears container + re-inserts script) — comment scroll position lost

## GiscusService (libs/shared/src/lib/services/giscus.service.ts)

- OWNS: cached fetch of all repo discussions (one HTTP call shared via `shareReplay(1)`)
- READS FROM: GitHub REST `https://api.github.com/repos/{repo}/discussions?per_page=100`
- INVARIANT: response keyed by discussion `title` — must match `GiscusComponent`'s `data-term` (= article slug)
- INVARIANT: no auth — relies on public unauthenticated rate limit (60 req/h per IP); `shareReplay` makes this 1 req per session
- TENSION: only first 100 discussions fetched; pagination not implemented
- TENSION: returns `totalReplyCount: 0` always — REST endpoint doesn't expose reply counts (would need GraphQL)
- DECIDED: REST chosen over GraphQL to avoid requiring a token in the static client

## GiscusStatsComponent (apps/blog/src/app/pages/feed/giscus-stats.component.ts)

- OWNS: comment + reaction count badge in feed listing
- READS FROM: `GiscusService.getDiscussionStats(slug)`
- INVARIANT: renders nothing when stats null OR both counts zero
