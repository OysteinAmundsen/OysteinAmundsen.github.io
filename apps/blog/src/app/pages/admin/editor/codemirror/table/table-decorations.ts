import { syntaxTree } from "@codemirror/language";
import { type EditorState, type Range, StateField } from "@codemirror/state";
import {
  Decoration,
  type DecorationSet,
  EditorView,
  keymap,
} from "@codemirror/view";

import { parseMarkdownTable } from "./table-parser";
import { CELL_SELECTOR, findWidgetDOM, TableWidget } from "./table-widget";

// ── Table widget StateField (can replace line breaks, unlike ViewPlugin) ──────

function buildTableDecorations(state: EditorState): DecorationSet {
  const tree = syntaxTree(state);
  const decorations: Range<Decoration>[] = [];

  tree.iterate({
    enter(node) {
      if (node.type.name !== "Table") return;
      const { from, to } = node;

      // Skip tables at the very end of the document (no trailing newline).
      // The cursor at this position has no DOM element to render on, so we
      // show raw markdown instead — the user can keep deleting characters.
      if (to >= state.doc.length) return false;

      const tableText = state.doc.sliceString(from, to);
      const parsed = parseMarkdownTable(tableText);
      if (parsed) {
        decorations.push(
          Decoration.replace({
            widget: new TableWidget(parsed, from, to),
            block: true,
          }).range(from, to),
        );
      }

      return false;
    },
  });

  return Decoration.set(decorations, true);
}

export const tableDecorations = StateField.define<DecorationSet>({
  create(state) {
    return buildTableDecorations(state);
  },
  update(value, tr) {
    if (tr.docChanged) {
      return buildTableDecorations(tr.state);
    }
    return value;
  },
  provide: (f) => EditorView.decorations.from(f),
});

// ── Arrow-key navigation into table widgets ───────────────────────────────────

/** Find all Table node ranges in the current syntax tree. */
function findTableRanges(
  state: EditorState,
): Array<{ from: number; to: number }> {
  const ranges: Array<{ from: number; to: number }> = [];
  syntaxTree(state).iterate({
    enter(node) {
      if (node.type.name === "Table") {
        ranges.push({ from: node.from, to: node.to });
        return false;
      }
      return;
    },
  });
  return ranges;
}

/** Focus an editable cell inside a table widget.
 *  position: which cell to target
 *  caret: 'start' = caret at start, 'end' = at end. */
function focusTableCell(
  view: EditorView,
  tableFrom: number,
  position: "first" | "last" | "last-row-first-col",
  caret: "start" | "end" = "start",
): boolean {
  const widget = findWidgetDOM(view, tableFrom);
  if (!widget) return false;

  let cell: HTMLElement | null = null;

  if (position === "first") {
    cell = widget.querySelector(CELL_SELECTOR);
  } else if (position === "last") {
    const cells = widget.querySelectorAll(CELL_SELECTOR);
    cell = (cells[cells.length - 1] as HTMLElement) ?? null;
  } else if (position === "last-row-first-col") {
    const rows = widget.querySelectorAll("tbody tr");
    const lastRow = rows[rows.length - 1];
    if (lastRow) {
      cell = lastRow.querySelector("td:not(.cm-table-drag-cell)");
    }
  }
  if (!cell) return false;

  cell.focus();
  const sel = window.getSelection();
  if (sel && cell.childNodes.length > 0) {
    const textNode = cell.childNodes[0];
    const offset = caret === "end" ? (textNode.textContent?.length ?? 0) : 0;
    sel.collapse(textNode, offset);
  } else if (sel) {
    sel.collapse(cell, 0);
  }
  return true;
}

export const tableNavKeymap = keymap.of([
  {
    key: "ArrowDown",
    run(view) {
      const { state } = view;
      const sel = state.selection.main;
      const head = sel.head;
      const line = state.doc.lineAt(head);
      const tables = findTableRanges(state);

      for (const table of tables) {
        // Cursor on line immediately above the table
        const tableLine = state.doc.lineAt(table.from);
        if (tableLine.number === line.number + 1) {
          if (table.to < state.doc.length) {
            // Only intercept if the cursor is on the last visual line
            // of the current doc line (long lines wrap visually).
            const after = view.moveVertically(sel, true);
            if (state.doc.lineAt(after.head).number === line.number) {
              // Still on the same doc line — let default ArrowDown handle it
              return false;
            }
            return focusTableCell(view, table.from, "first");
          }
        }
        // Safety net: cursor is at the widget boundary (block cursor)
        if (
          head >= table.from &&
          head <= table.to &&
          table.to < state.doc.length
        ) {
          return focusTableCell(view, table.from, "first");
        }
      }
      return false;
    },
  },
  {
    key: "ArrowUp",
    run(view) {
      const { state } = view;
      const sel = state.selection.main;
      const head = sel.head;
      const cursorLine = state.doc.lineAt(head);
      const tables = findTableRanges(state);

      for (const table of tables) {
        if (table.to >= state.doc.length) continue;
        // Cursor on line immediately below the table
        const tableEndLine = state.doc.lineAt(table.to);
        const gap = cursorLine.number - tableEndLine.number;
        if (gap >= 1 && gap <= 2) {
          // Only intercept if the cursor is on the first visual line
          // of the current doc line (long lines wrap visually).
          const before = view.moveVertically(sel, false);
          if (state.doc.lineAt(before.head).number === cursorLine.number) {
            return false;
          }
          return focusTableCell(view, table.from, "last-row-first-col", "end");
        }
        // Safety net: cursor is at the widget boundary (block cursor)
        if (head >= table.from && head <= table.to) {
          return focusTableCell(view, table.from, "last-row-first-col", "end");
        }
      }
      return false;
    },
  },
  {
    key: "ArrowRight",
    run(view) {
      const { state } = view;
      const sel = state.selection.main;
      if (!sel.empty) return false;

      const tables = findTableRanges(state);
      const line = state.doc.lineAt(sel.head);

      for (const table of tables) {
        // Cursor at end of line immediately above the table
        if (sel.head === line.to) {
          const tableLine = state.doc.lineAt(table.from);
          if (
            tableLine.number === line.number + 1 &&
            table.to < state.doc.length
          ) {
            return focusTableCell(view, table.from, "first", "start");
          }
        }
        // Safety net: cursor is at the widget boundary (block cursor)
        if (
          sel.head >= table.from &&
          sel.head <= table.to &&
          table.to < state.doc.length
        ) {
          return focusTableCell(view, table.from, "first", "start");
        }
      }
      return false;
    },
  },
  {
    key: "ArrowLeft",
    run(view) {
      const { state } = view;
      const sel = state.selection.main;
      if (!sel.empty) return false;

      const tables = findTableRanges(state);
      const line = state.doc.lineAt(sel.head);

      for (const table of tables) {
        if (table.to >= state.doc.length) continue;
        // Cursor at start of line immediately below the table
        if (sel.head === line.from) {
          const tableEndLine = state.doc.lineAt(table.to);
          const gap = line.number - tableEndLine.number;
          if (gap >= 1 && gap <= 2) {
            return focusTableCell(view, table.from, "last", "end");
          }
        }
        // Safety net: cursor is at the widget boundary (block cursor)
        if (sel.head >= table.from && sel.head <= table.to) {
          return focusTableCell(view, table.from, "last", "end");
        }
      }
      return false;
    },
  },
]);

// ── Table auto-complete on separator line ─────────────────────────────────────

const tableLinePattern = /^\|.*\|$/;

export const tableAutoComplete = EditorView.updateListener.of((update) => {
  if (!update.docChanged) return;

  // Check each change for a `|` being inserted
  update.changes.iterChanges((fromA, _toA, _fromB, toB, inserted) => {
    const insertedText = inserted.toString();
    if (insertedText !== "|") return;

    const state = update.state;
    const line = state.doc.lineAt(toB);

    // Check if the current line is a separator-like line
    const trimmedSep = line.text.trim();
    if (!/^\|[\s:]*-/.test(trimmedSep)) return;
    if (!trimmedSep.endsWith("|")) return;

    // Check if the previous line is a header line
    if (line.number < 2) return;
    const headerLine = state.doc.line(line.number - 1);
    if (!tableLinePattern.test(headerLine.text.trim())) return;

    // Don't auto-complete if there's already a data row below (table already exists)
    if (line.number < state.doc.lines) {
      const nextLine = state.doc.line(line.number + 1);
      if (tableLinePattern.test(nextLine.text.trim())) return;
    }

    // Count separator cells — must each contain at least a dash
    const sepCells = trimmedSep
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
    if (!sepCells.every((c) => /^:?-+:?$/.test(c))) return;

    // Count columns from header
    const headerCells = headerLine.text
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|");
    const colCount = headerCells.length;
    if (colCount < 1) return;

    // Build formatted table
    const headers = headerCells.map((h) => h.trim());
    const widths = headers.map((h) => Math.max(8, h.length));

    const fmtHeader =
      "| " + headers.map((h, i) => h.padEnd(widths[i])).join(" | ") + " |";
    const fmtSep = "| " + widths.map((w) => "-".repeat(w)).join(" | ") + " |";
    const emptyRow = "| " + widths.map((w) => " ".repeat(w)).join(" | ") + " |";

    const newText = fmtHeader + "\n" + fmtSep + "\n" + emptyRow;

    // Replace from header line start to current line end
    const from = headerLine.from;
    const to = line.to;

    // Use requestAnimationFrame to avoid dispatching during update
    const view = update.view;
    requestAnimationFrame(() => {
      view.dispatch({
        changes: { from, to, insert: newText },
      });

      // Place cursor in first cell of empty row
      const newDoc = view.state.doc;
      const emptyRowLine = newDoc.line(headerLine.number + 2);
      const firstPipe = emptyRowLine.text.indexOf("|");
      const secondPipe = emptyRowLine.text.indexOf("|", firstPipe + 1);
      if (secondPipe > firstPipe) {
        view.dispatch({
          selection: { anchor: emptyRowLine.from + firstPipe + 2 },
        });
      }
      view.focus();
    });
  });
});
