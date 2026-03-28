---
description: "Use when working with @toolbox-web/grid or @toolbox-web/grid-angular — configuring data grids, columns, features, plugins, renderers, editors, filtering, sorting, selection, or any tbw-grid element. Also use for grid theming, events, and migration from AG Grid."
applyTo: "**/*grid*,**/*admin*"
---

# Toolbox Grid — Angular Integration Guide

> Reference: [Toolbox Grid Docs](https://raw.githubusercontent.com/OysteinAmundsen/toolbox/main/llms.txt) · [Full API Guide](https://raw.githubusercontent.com/OysteinAmundsen/toolbox/main/llms-full.txt)

## Critical Rules

1. **Height and display are required** — `tbw-grid` must have `height` and `display: block`
2. **Features require side-effect imports** — import the feature before using it
3. **Editing is opt-in** — `editable: true` without the editing feature throws an error
4. **Plugin dependencies must load in order** — Clipboard requires Selection, UndoRedo requires Editing
5. **No CUSTOM_ELEMENTS_SCHEMA needed** — the `Grid` directive handles `<tbw-grid>` recognition
6. **Light DOM** — no Shadow DOM; CSS cascade works normally
7. **Em-based sizing** — change `font-size` to scale the entire grid

## Angular Setup

```typescript
import { Grid } from "@toolbox-web/grid-angular";
// Import features via side-effect imports
import "@toolbox-web/grid-angular/features/selection";
import "@toolbox-web/grid-angular/features/filtering";
import "@toolbox-web/grid-angular/features/pinned-rows";

@Component({
  imports: [Grid],
  template: `
    <tbw-grid
      [rows]="data()"
      [columns]="columns"
      [selection]="'row'"
      [filtering]="true"
      [pinnedRows]="{ showRowCount: true }"
      (rowClick)="onRowClick($event)"
      style="height: 400px; display: block;"
    />
  `,
})
```

## Column Configuration

```typescript
import type { ColumnConfig } from "@toolbox-web/grid";

const columns: ColumnConfig<MyRow>[] = [
  { field: "id", header: "ID", type: "number", width: 60, sortable: true },
  { field: "name", header: "Name", filterable: true, editable: true },
  {
    field: "status",
    header: "Status",
    renderer: (ctx) => {
      const span = document.createElement("span");
      span.className = `badge badge-${ctx.value}`;
      span.textContent = ctx.value;
      return span;
    },
  },
  {
    field: "date",
    header: "Created",
    type: "date",
    format: (value) => (value ? new Date(value).toLocaleDateString() : ""),
  },
];
```

## GridConfig (Full Configuration)

```typescript
import type { GridConfig } from "@toolbox-web/grid";

const gridConfig: GridConfig<MyRow> = {
  columns: [...],
  features: {
    selection: "row",          // "cell" | "row" | "range" | { mode, checkbox }
    editing: "dblclick",       // true | "click" | "dblclick" | "manual"
    filtering: true,           // true | { debounceMs: 200 }
    multiSort: true,           // true | { maxSortColumns: 3 }
    pinnedRows: { showRowCount: true, showFilteredCount: true },
    pinnedColumns: true,
    reorderColumns: true,
    visibility: true,
    export: true,
    tooltip: true,
  },
};
```

## Feature Props Reference (Angular)

| Feature Prop       | Side-Effect Import         | Example Values                          |
| ------------------ | -------------------------- | --------------------------------------- |
| `[selection]`      | `features/selection`       | `"cell"`, `"row"`, `"range"`            |
| `[editing]`        | `features/editing`         | `true`, `"dblclick"`, `"manual"`        |
| `[filtering]`      | `features/filtering`       | `true`, `{ debounceMs: 200 }`           |
| `[multiSort]`      | `features/multi-sort`      | `true`, `{ maxSortColumns: 3 }`         |
| `[pinnedRows]`     | `features/pinned-rows`     | `true`, `{ showRowCount: true }`        |
| `[pinnedColumns]`  | `features/pinned-columns`  | `true`                                  |
| `[reorderColumns]` | `features/reorder-columns` | `true`                                  |
| `[visibility]`     | `features/visibility`      | `true`                                  |
| `[export]`         | `features/export`          | `true`, `{ filename: "data.csv" }`      |
| `[tree]`           | `features/tree`            | `{ childrenField: "children" }`         |
| `[masterDetail]`   | `features/master-detail`   | `{ renderer: (row, el) => ... }`        |
| `[groupingRows]`   | `features/grouping-rows`   | `{ groupOn: (row) => [...] }`           |
| `[responsive]`     | `features/responsive`      | `true`, `{ breakpoint: 768 }`           |
| `[serverSide]`     | `features/server-side`     | `{ dataSource: async (params) => ... }` |
| `[clipboard]`      | `features/clipboard`       | `true` (requires selection)             |
| `[undoRedo]`       | `features/undo-redo`       | `true` (requires editing)               |
| `[tooltip]`        | `features/tooltip`         | `true`                                  |

## Angular Template Renderers

```html
<tbw-grid [rows]="employees()" [columns]="columns" [editing]="'dblclick'">
  <tbw-grid-column field="status" header="Status" [editable]="true">
    <span *tbwRenderer="let value; row as row" [class]="'badge badge-' + value">
      {{ value }}
    </span>
    <select
      *tbwEditor="let value; onCommit as onCommit"
      (change)="onCommit($event.target.value)"
    >
      <option value="active" [selected]="value === 'active'">Active</option>
      <option value="inactive" [selected]="value === 'inactive'">
        Inactive
      </option>
    </select>
  </tbw-grid-column>
</tbw-grid>
```

Requires importing `TbwRenderer` and `TbwEditor` from `@toolbox-web/grid-angular`.

## Events (Angular)

Use **camelCase** outputs — detail is unwrapped automatically:

```html
<tbw-grid
  [rows]="data()"
  [columns]="columns"
  (cellClick)="onCellClick($event)"
  (rowClick)="onRowClick($event)"
  (sortChange)="onSortChange($event)"
  (cellCommit)="onCellCommit($event)"
/>
```

Use kebab-case `(cell-commit)` when you need `event.preventDefault()` on the native `CustomEvent`.

## Key Events

| Event             | Detail Properties                                            |
| ----------------- | ------------------------------------------------------------ |
| `cellClick`       | `row`, `field`, `value`, `column`, `cellEl`, `originalEvent` |
| `rowClick`        | `row`, `rowIndex`, `rowEl`, `originalEvent`                  |
| `cellChange`      | `row`, `field`, `oldValue`, `newValue`, `changes`            |
| `cellCommit`      | `row`, `field`, `value`, `oldValue`, `changedRows`           |
| `sortChange`      | `field`, `direction` (0=none, 1=asc, -1=desc)                |
| `selectionChange` | `SelectionChangeDetail`                                      |
| `filterChange`    | `filters[]`, `filteredRowCount`                              |

## Incompatible Plugin Combinations

| Plugin A     | Plugin B                | Reason                               |
| ------------ | ----------------------- | ------------------------------------ |
| GroupingRows | Tree                    | Both transform the entire row model  |
| GroupingRows | Pivot                   | Pivot creates its own structure      |
| Tree         | Pivot                   | Cannot coexist                       |
| ServerSide   | GroupingRows/Tree/Pivot | Require full dataset vs lazy loading |

## Theming

The grid uses CSS custom properties. Key variables:

```css
tbw-grid {
  --tbw-color-bg: transparent;
  --tbw-color-fg: #333;
  --tbw-color-accent: #1976d2;
  --tbw-color-border: #e0e0e0;
  --tbw-color-header-bg: #f5f5f5;
  --tbw-color-row-hover: #f0f7ff;
  --tbw-color-selection: #e3f2fd;
  --tbw-row-height: 1.75em;
  --tbw-header-height: 1.875em;
}
```

Built-in themes: `dg-theme-material`, `dg-theme-bootstrap`, `dg-theme-vibrant`, `dg-theme-contrast`, `dg-theme-large`, `dg-theme-standard`.

## Base Classes (Angular-Specific)

| Class               | Purpose                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `BaseGridEditor`    | Common inputs/outputs, validation, edit-close lifecycle           |
| `BaseGridEditorCVA` | Adds `ControlValueAccessor` — works in grid + standalone forms    |
| `BaseOverlayEditor` | Floating overlay panel with CSS anchor positioning + focus gating |
| `BaseFilterPanel`   | Ready-made `params` input for custom filter UIs                   |
