---
domain: markdown-editor
related: [markdown-pipeline, article-data]
---

# Markdown Editor (CodeMirror) — Mental Model

## MarkdownEditorComponent (apps/blog/src/app/pages/admin/editor/markdown-editor.component.ts)

- OWNS: lifecycle of the `EditorView` instance and its DOM host
- OWNS: bidirectional value sync between `value` input and CM doc via `lastSyncedValue` guard
- OWNS: dual-mode toggle — WYSIWYG (CM editor) vs raw `markdownMode` textarea
- READS FROM: `value` (input), `imageUpload` (input — async upload fn), `markdownMode` (model)
- WRITES TO: `valueChange` output on every CM doc change
- INVARIANT: `ViewEncapsulation.None` — required so global CSS can target `.cm-*` classes inside CM's DOM
- INVARIANT: editor only constructs after `afterNextRender` AND when `value` is non-empty (prevents mounting before SSR data arrives)
- INVARIANT: `lastSyncedValue` blocks the value-input effect from re-dispatching changes that the editor itself just emitted (echo prevention)
- INVARIANT: capture-phase `keydown` listener is added DIRECTLY to `view.dom` — must fire BEFORE CodeMirror's keymap dispatch
- FLOW[init]: `markdownMode=false` + browser ready + `value` non-empty → rAF → `initEditor()` → create `EditorView` with all extensions → register capture-phase keydown
- FLOW[mode-switch-to-raw]: `markdownMode=true` → effect destroys `view`, captures current doc into `lastSyncedValue` (preserves edits)
- FLOW[external-update]: parent sets new `value` → effect sees `val !== lastSyncedValue` → CM `dispatch` replaces full doc
- FLOW[cursor-keep-visible]: selection moves with focus → rAF → if cursor `coords.top < toolbar.bottom` → `window.scrollBy` to expose cursor
- TENSION: `requestAnimationFrame` before `initEditor()` exists because CM measures cursor positions; without it, layout-not-yet-settled causes wrong coordinates
- TENSION: full-doc replacement on external `value` change discards CM history (undo stack reset)
- DECIDED: toolbar uses `mousedown + preventDefault` (not `click`) so the editor never loses focus

## list-handlers.ts (capture-phase keydown)

- OWNS: Enter / Tab / Shift+Tab behavior on list lines
- OWNS: ordered-list renumbering on indent — walks backwards to find peer marker, increments
- READS FROM: `state.doc` line containing the cursor
- INVARIANT: `emptyListItemPattern` (`^(\s*)([*+-]|\d+[.)])\s*$`) — Enter on empty marker exits the list (clears the line)
- INVARIANT: indent unit is 4 spaces (`indent + "    "`)
- INVARIANT: registered via `dom.addEventListener('keydown', ..., { capture: true })` — REQUIRED to beat CM's keymap
- INVARIANT: handler calls `event.preventDefault()` AND `event.stopPropagation()` after handling — keeps CM from re-processing
- DECIDED: list logic lives outside CM keymap because CM keymap dispatch happens too late to suppress default Tab indent in some cases

## image-drop-handler.ts

- OWNS: `drop` and `paste` DOM event handlers via `EditorView.domEventHandlers`
- READS FROM: `event.dataTransfer.files` (drop) or `clipboardData.items` (paste)
- WRITES TO: editor doc — inserts `![](url)` at drop position (or selection head for paste)
- INVARIANT: only first file is processed on drop; only first image item on paste
- INVARIANT: `event.preventDefault()` + return `true` to suppress browser's default file-drop / image-paste
- TENSION: upload happens async; user keeps typing → cursor moves; insertion happens at the original `pos` (may interleave with subsequent typing)

## live-preview.ts (ViewPlugin)

- OWNS: in-editor decorations — replaces markdown markers with rendered widgets when cursor is NOT on the line
- OWNS: `HrWidget`, `CodeLangWidget` (language badge), `ImageWidget` (lazy-loaded `<img>`)
- READS FROM: `syntaxTree(state)` (lezer markdown tree), `state.selection` (active lines)
- INVARIANT: a "line is active" if any cursor/selection range touches it — active lines show raw markdown
- INVARIANT: `ImageWidget` mousedown moves caret to image line, switching back to raw markdown for editing
- INVARIANT: fenced-code blocks: hide opening fence as `CodeLangWidget(lang)` and hide closing fence when inactive
- INVARIANT: skips `Table` nodes — they're handled by `tableDecorations` StateField (block-replace requires StateField, not ViewPlugin)
- TENSION: full tree iteration on every doc change — fine for typical posts, slows on huge docs

## table/ (table-decorations.ts, table-parser.ts, table-widget.ts, table.model.ts)

- OWNS: GFM tables rendered as editable HTML widget (not raw markdown lines)
- OWNS: `tableDecorations` `StateField` — uses `Decoration.replace({block: true})` to replace the entire Table node
- OWNS: `tableNavKeymap` — Tab/arrow nav between cells
- OWNS: `tableAutoComplete` — auto-extend rows on Enter at last cell
- READS FROM: lezer markdown tree `Table` nodes
- WRITES TO: dispatches doc updates serializing the widget back to `| ... |` markdown via `table-parser.serializeTable`
- INVARIANT: tables at end-of-document (no trailing newline) skip widget rendering — show raw markdown so user can keep deleting
- INVARIANT: `StateField` (not ViewPlugin) is used because block decorations spanning line breaks require state-level decoration sources
- INVARIANT: `TableDOMElement` augments DOM with `_tableFrom`, `_tableTo`, `_tableAlignments` — read by keymap to dispatch correct ranges
- TENSION: table widget breaks natural cell↔text editor flow; requires custom keymap for keyboard accessibility

## toolbar.ts

- OWNS: formatting commands `toggleBold`, `toggleItalic`, `toggleStrikethrough`, `toggleInlineCode`
- OWNS: insertion commands `insertLink`, `insertTable`, `insertImage`
- OWNS: `toolbarItems` array consumed by component template
- INVARIANT: `wrapSelection` uses placeholder text when no selection exists; selects the inserted text after wrap
- INVARIANT: `insertLink` cursor-selects the literal `url` substring so the user can type the URL immediately
- INVARIANT: `insertImage` without `uploadFn` falls back to `![alt text](url)` placeholder

## image-replace-button.ts

- OWNS: hover-button on image widgets to trigger re-upload via the same `imageUpload` fn

## highlight-style.ts

- OWNS: CodeMirror syntax highlight tokens — light/dark aware via design tokens
