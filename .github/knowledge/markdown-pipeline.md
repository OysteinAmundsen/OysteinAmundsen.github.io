---
domain: markdown-pipeline
related: [article-data, markdown-editor, styling-theme]
---

# Markdown Rendering Pipeline — Mental Model

## marked.config (libs/shared/src/lib/marked.config.ts)

- OWNS: configured singleton `marked` instance — exported from `@blog/shared`
- OWNS: GFM enabled (`gfm: true`), `breaks: false` (single newline ≠ `<br>`)
- OWNS: registered highlight.js languages: typescript, html (xml), css, bash, json
- OWNS: custom `del` tokenizer — requires DOUBLE tilde `~~text~~`; single tilde is left as text
- OWNS: custom `downloadLink` inline extension — `[text](url){download}` or `[text](url){download=filename.ext}` renders as `<a href download[="filename"]>` so authors can write download links in pure markdown without inline HTML
- READS FROM: code-block lang fences for syntax highlighting
- WRITES TO: HTML string with `class="hljs language-<lang>"` on `<code>` elements
- INVARIANT: same `marked` import is used by both runtime renderer (`article.component`) and editor live-preview (`live-preview.ts`) — output must be identical
- INVARIANT: only the 5 registered languages get explicit highlighting; unknown langs fall back to `hljs.highlightAuto`
- DECIDED: double-tilde-only strikethrough chosen so single `~` (common in shell paths, math) renders as plain text
- DECIDED: download links use a custom `{download}` suffix syntax instead of raw `<a download>` HTML — keeps article content as portable markdown and lets the codemirror live-preview style it as a normal link
- TENSION: marked is bundled into the client (used by editor live-preview); no server-only rendering split

## ArticleComponent (apps/blog/src/app/pages/article/article.component.ts)

- OWNS: per-route article state (`article` signal) and rendered HTML (`renderedContent` computed)
- READS FROM: `slug` route input (via `withComponentInputBinding`)
- READS FROM: `ArticleService.getArticleBySlug(slug)`
- WRITES TO: SEO meta via `SeoService.setArticleMeta(article)`
- WRITES TO: page DOM via `[innerHTML]` binding of `renderedContent()`
- FLOW: route `/article/:slug` → `slug` input fires effect → fetch article → set signal → `renderedContent` computed runs `marked.parse` → template binds HTML → `SeoService.setArticleMeta` updates head
- INVARIANT: `renderedContent` is `computed()` — re-runs only when `article()` changes; safe to read in template
- TENSION: rendering is sync inside `computed` — large markdown blocks the main thread on first read
- DECIDED: `marked.parse` runs in template-time computed (not a service) so SSR pre-renders the HTML inline

## \_prose.scss (apps/blog/src/styles/\_prose.scss)

- OWNS: typography for rendered markdown (headings, paragraphs, code, blockquotes, lists, tables)
- READS FROM: design tokens (`--on-surface`, `--code-inline`, etc.)
- INVARIANT: prose styles target the wrapper class around the `[innerHTML]` output — must not leak into UI chrome
