---
domain: admin-grid
related: [article-data, styling-theme]
---

# Admin Articles Grid — Mental Model

## AdminArticlesComponent (apps/blog/src/app/pages/admin/articles/admin-articles.component.ts)

- OWNS: full article list state (`allArticles` signal — populated from `getAllArticles()`)
- OWNS: derived counts (`totalCount`, `publishedCount`, `draftCount`, `archivedCount` — `computed`)
- OWNS: search-query filter (`searchQuery` signal — title/id/author substring match in `articles` computed)
- OWNS: status filter (`statusFilter` signal) — applied via grid filtering API, NOT via the `articles` computed
- READS FROM: `ArticleService.getAllArticles()` (admin `/api/articles`)
- WRITES TO: grid filter via `injectGridFiltering().setFilter('status', ...)`
- WRITES TO: navigation to `admin/edit/:id` on row click
- INVARIANT: status filter routes through `@toolbox-web/grid` filtering feature (not local computed) so the grid's filtered-row count reflects the active status
- INVARIANT: search-query filter is local computed (grid receives the pre-filtered list)
- INVARIANT: imports of `@toolbox-web/grid-angular/features/{filtering,pinned-rows,selection}` are SIDE-EFFECT imports — required to register feature plugins
- INVARIANT: `injectGridFiltering()` returns a controller with `isReady()` — must check before `setFilter` (effect guards on it)

## column renderers

- OWNS: imperative DOM construction in `renderer: (ctx) => HTMLElement`
- OWNS: cells: title (thumbnail + title + id), status (badge), createdAt (ISO date), updatedAt (relative time), operations (edit/delete buttons)
- INVARIANT: action buttons inside `Operations` column call `event.stopPropagation()` to suppress row-click selection
- TENSION: hand-rolled DOM in renderers — no Angular template binding inside cells, all event listeners attached imperatively
- DECIDED: `@toolbox-web/grid` chosen over AG Grid (see `.github/instructions/toolbox-grid.instructions.md`); migration path to renderers preserves cell flexibility

## gridConfig

- OWNS: feature toggles — `selection: 'row'`, `filtering: true`, `pinnedRows: { showRowCount, showFilteredCount }`
- INVARIANT: pinned-rows feature shows total + filtered count at bottom — relies on filtering feature being registered
