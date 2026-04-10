import { EditorView, WidgetType } from "@codemirror/view";

import { serializeTable } from "./table-parser";
import { type ParsedTable, type TableDOMElement } from "./table.model";

/** Selector for editable cells (excludes drag-handle cells). */
export const CELL_SELECTOR =
  "th:not(.cm-table-drag-cell), td:not(.cm-table-drag-cell)";

/** Find the table widget DOM element near a given doc position. */
export function findWidgetDOM(
  view: EditorView,
  pos: number,
): HTMLElement | null {
  // For block replace decorations, domAtPos may return a sibling of the
  // widget (e.g. .cm-content) rather than a node inside it, so closest()
  // traversing upward won't find .cm-table-widget.  Try it first as a
  // fast path, then fall back to scanning all widgets by stored position.
  try {
    const domAtPos = view.domAtPos(pos);
    const container =
      domAtPos.node instanceof HTMLElement
        ? domAtPos.node
        : domAtPos.node.parentElement;
    const found = container?.closest(".cm-table-widget") as HTMLElement | null;
    if (found) return found;

    // domAtPos may return { node: cm-content, offset: N } where the child
    // at that offset IS the widget wrapper.
    if (container) {
      const child = container.childNodes[domAtPos.offset];
      if (child instanceof HTMLElement) {
        if (child.classList.contains("cm-table-widget")) return child;
        const nested = child.querySelector(".cm-table-widget");
        if (nested) return nested as HTMLElement;
      }
    }
  } catch {
    // domAtPos can throw for positions inside replaced content
  }

  // Final fallback: scan all table widgets by their stored _tableFrom.
  const widgets = view.dom.querySelectorAll(".cm-table-widget");
  for (let i = 0; i < widgets.length; i++) {
    const w = widgets[i] as HTMLElement;
    if ((w as unknown as TableDOMElement)._tableFrom === pos) return w;
  }
  return null;
}

// ── Inline markdown rendering for table cells ─────────────────────────────────

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Render inline markdown (bold, italic, code, strikethrough) as HTML. */
function renderInlineMarkdown(text: string): string {
  if (!text) return "";
  let html = escapeHtml(text);
  // Inline code first (protects content from further processing)
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Bold (before italic since ** contains *)
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");
  return html;
}

/** Set a cell to show rendered inline markdown. */
function renderCell(cell: HTMLElement): void {
  const raw = cell.dataset["raw"] ?? "";
  cell.innerHTML = renderInlineMarkdown(raw);
}

/** After a DOM rebuild, focus the first cell of a specific tbody row.
 *  Pass -1 for bodyRowIndex to target the last row. */
export function focusBodyRow(
  view: EditorView,
  tableFrom: number,
  bodyRowIndex: number,
) {
  requestAnimationFrame(() => {
    const widget = findWidgetDOM(view, tableFrom);
    if (widget) {
      const tbodyRows = widget.querySelectorAll("tbody tr");
      const targetRow =
        bodyRowIndex < 0
          ? tbodyRows[tbodyRows.length - 1]
          : tbodyRows[bodyRowIndex];
      const cells = targetRow?.querySelectorAll("td:not(.cm-table-drag-cell)");
      if (cells?.[0]) (cells[0] as HTMLElement).focus();
    }
  });
}

/** Always-rendered table widget with contenteditable inline editing. */
export class TableWidget extends WidgetType {
  constructor(
    private table: ParsedTable,
    private tableFrom: number,
    private tableTo: number,
  ) {
    super();
  }

  /** Deep-compare table content so unchanged edits don't rebuild DOM. */
  override eq(other: TableWidget): boolean {
    const a = this.table,
      b = other.table;
    if (a.headers.length !== b.headers.length) return false;
    if (a.rows.length !== b.rows.length) return false;
    for (let i = 0; i < a.headers.length; i++) {
      if (a.headers[i] !== b.headers[i]) return false;
      if (a.alignments[i] !== b.alignments[i]) return false;
    }
    for (let r = 0; r < a.rows.length; r++) {
      for (let c = 0; c < a.headers.length; c++) {
        if ((a.rows[r][c] ?? "") !== (b.rows[r][c] ?? "")) return false;
      }
    }
    return true;
  }

  /** Patch existing DOM in-place when table content changed (preserves focus). */
  override updateDOM(dom: HTMLElement): boolean {
    const { headers, alignments, rows } = this.table;
    const thead = dom.querySelector("thead");
    const tbody = dom.querySelector("tbody");
    if (!thead || !tbody) return false;

    const headerCells = thead.querySelectorAll(
      "th:not(.cm-table-drag-cell)",
    ) as NodeListOf<HTMLElement>;
    const bodyRows = tbody.querySelectorAll("tr");

    // Structure changed — need full rebuild
    if (headerCells.length !== headers.length) return false;
    if (bodyRows.length !== rows.length) return false;

    const active = dom.ownerDocument.activeElement;

    // Update header cells
    for (let c = 0; c < headers.length; c++) {
      const th = headerCells[c];
      if (th !== active && th.dataset["raw"] !== headers[c]) {
        th.dataset["raw"] = headers[c];
        renderCell(th);
      }
      th.style.textAlign = alignments[c] ?? "";
    }

    // Update body cells
    for (let r = 0; r < rows.length; r++) {
      const cells = bodyRows[r].querySelectorAll(
        "td:not(.cm-table-drag-cell)",
      ) as NodeListOf<HTMLElement>;
      if (cells.length !== headers.length) return false;
      for (let c = 0; c < headers.length; c++) {
        const td = cells[c];
        const val = rows[r][c] ?? "";
        if (td !== active && td.dataset["raw"] !== val) {
          td.dataset["raw"] = val;
          renderCell(td);
        }
        td.style.textAlign = alignments[c] ?? "";
      }
    }

    // Update stored positions
    (dom as unknown as TableDOMElement)._tableFrom = this.tableFrom;
    (dom as unknown as TableDOMElement)._tableTo = this.tableTo;
    (dom as unknown as TableDOMElement)._tableAlignments = alignments;

    // Ensure column-handle count matches
    const handleContainer = dom.querySelector(".cm-table-col-handles");
    if (handleContainer && handleContainer.children.length !== headers.length) {
      return false;
    }

    return true;
  }

  /** Let the widget handle all events internally. */
  override ignoreEvent(): boolean {
    return true;
  }

  override toDOM(view: EditorView): HTMLElement {
    const el = document.createElement("div");
    el.className = "cm-table-widget";
    const wrapper = el as unknown as TableDOMElement;

    // Store mutable positions for sync handlers
    wrapper._tableFrom = this.tableFrom;
    wrapper._tableTo = this.tableTo;
    wrapper._tableAlignments = this.table.alignments;

    // When any cell inside the table receives focus, move the CM
    // selection onto the table so the live-preview plugin no longer
    // considers the previous cursor line "active" (e.g. an adjacent
    // image would otherwise stay in raw-markdown mode).
    el.addEventListener("focusin", () => {
      const anchor = wrapper._tableFrom;
      if (view.state.selection.main.head !== anchor) {
        view.dispatch({ selection: { anchor } });
      }
    });

    const tbl = document.createElement("table");
    const { headers, alignments, rows } = this.table;
    const colCount = headers.length;

    // ── Helper: read current table state from the live DOM ──
    const readDOMTable = (): ParsedTable => {
      const hs: string[] = [];
      const theadCells = tbl.querySelectorAll(
        "thead th:not(.cm-table-drag-cell)",
      );
      theadCells.forEach((th) => {
        const el = th as HTMLElement;
        hs.push(el.dataset["raw"] ?? el.textContent ?? "");
      });

      const rs: string[][] = [];
      tbl.querySelectorAll("tbody tr").forEach((tr) => {
        const row: string[] = [];
        tr.querySelectorAll("td:not(.cm-table-drag-cell)").forEach((td) => {
          const el = td as HTMLElement;
          row.push(el.dataset["raw"] ?? el.textContent ?? "");
        });
        rs.push(row);
      });

      return {
        headers: hs,
        alignments: wrapper._tableAlignments as ParsedTable["alignments"],
        rows: rs,
      };
    };

    // ── Helper: sync DOM table → CM markdown state ──
    const syncToMarkdown = () => {
      const tableFrom: number = wrapper._tableFrom;
      const tableTo: number = wrapper._tableTo;
      const parsed = readDOMTable();
      const newText = serializeTable(parsed);
      const oldText = view.state.doc.sliceString(tableFrom, tableTo);
      if (newText === oldText) return;
      view.dispatch({
        changes: { from: tableFrom, to: tableTo, insert: newText },
      });
    };

    // ── Helper: focus a cell by logical row/col (row 0 = header) ──
    // caret: 'all' = select all, 'start' = caret at start, 'end' = caret at end
    const focusDOMCell = (
      row: number,
      col: number,
      caret: "all" | "start" | "end" = "all",
    ) => {
      const targetRow =
        row === 0
          ? tbl.querySelector("thead tr")
          : tbl.querySelectorAll("tbody tr")[row - 1];
      if (!targetRow) return;
      const cells = targetRow.querySelectorAll(CELL_SELECTOR);
      const cell = cells[col] as HTMLElement | undefined;
      if (!cell) return;
      cell.focus();
      const sel = window.getSelection();
      if (!sel) return;
      if (caret === "all") {
        const range = document.createRange();
        range.selectNodeContents(cell);
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (cell.childNodes.length > 0) {
        const textNode = cell.childNodes[0];
        const offset =
          caret === "end" ? (textNode.textContent?.length ?? 0) : 0;
        sel.collapse(textNode, offset);
      } else {
        sel.collapse(cell, 0);
      }
    };

    /** Exit the table and place cursor on the adjacent line.
     *  direction: 'before' = line before the table, 'after' = line after. */
    const exitTable = (direction: "before" | "after") => {
      if (direction === "before") {
        const tableFrom: number = wrapper._tableFrom;
        const tableLine = view.state.doc.lineAt(tableFrom);
        if (tableLine.number > 1) {
          const prevLine = view.state.doc.line(tableLine.number - 1);
          view.dispatch({ selection: { anchor: prevLine.to } });
        } else {
          view.dispatch({ selection: { anchor: tableFrom } });
        }
      } else {
        const tableTo: number = wrapper._tableTo;
        const tableLine = view.state.doc.lineAt(tableTo);
        if (tableLine.number < view.state.doc.lines) {
          const nextLine = view.state.doc.line(tableLine.number + 1);
          view.dispatch({ selection: { anchor: nextLine.from } });
        } else {
          view.dispatch({
            selection: {
              anchor: Math.min(tableTo + 1, view.state.doc.length),
            },
          });
        }
      }
      view.focus();
    };

    // ── Cell keydown handler for Tab / Enter / Escape ──
    const handleCellKeydown = (e: KeyboardEvent, row: number, col: number) => {
      const bodyRowCount = tbl.querySelectorAll("tbody tr").length;
      const totalRows = 1 + bodyRowCount;

      if (e.key === "Tab" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        let nextRow = row;
        let nextCol = e.shiftKey ? col - 1 : col + 1;

        if (nextCol >= colCount) {
          nextCol = 0;
          nextRow++;
          if (nextRow >= totalRows) {
            // Tab past last cell — add a new row
            syncToMarkdown();
            const tableFrom: number = wrapper._tableFrom;
            const tableTo: number = wrapper._tableTo;
            const parsed = readDOMTable();
            parsed.rows.push(Array(colCount).fill(""));
            const newText = serializeTable(parsed);
            view.dispatch({
              changes: { from: tableFrom, to: tableTo, insert: newText },
            });
            focusBodyRow(view, wrapper._tableFrom, -1);
            return;
          }
        } else if (nextCol < 0) {
          nextCol = colCount - 1;
          nextRow--;
          if (nextRow < 0) return;
        }

        focusDOMCell(nextRow, nextCol);
        return;
      }

      if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        e.stopPropagation();

        // If inside a body row, check if the row is all empty → exit table
        if (row > 0) {
          const bodyTr = tbl.querySelectorAll("tbody tr")[row - 1];
          if (bodyTr) {
            const cells = bodyTr.querySelectorAll(
              "td:not(.cm-table-drag-cell)",
            );
            const allEmpty = Array.from(cells).every(
              (c) => (c.textContent ?? "").trim() === "",
            );
            if (allEmpty) {
              // Remove the empty row and place cursor after table
              syncToMarkdown();
              const tableFrom: number = wrapper._tableFrom;
              const tableTo: number = wrapper._tableTo;
              const parsed = readDOMTable();
              parsed.rows = parsed.rows.filter((_, i) => i !== row - 1);
              const newText = serializeTable(parsed);
              view.dispatch({
                changes: {
                  from: tableFrom,
                  to: tableTo,
                  insert: newText + "\n",
                },
                selection: { anchor: tableFrom + newText.length + 1 },
              });
              view.focus();
              return;
            }
          }
        }

        // Non-empty row: insert a new row below and focus it
        syncToMarkdown();
        const tableFrom: number = wrapper._tableFrom;
        const tableTo: number = wrapper._tableTo;
        const parsed = readDOMTable();
        const insertIdx = row === 0 ? 0 : row; // after header → idx 0, else after current body row
        parsed.rows.splice(insertIdx, 0, Array(colCount).fill(""));
        const newText = serializeTable(parsed);
        view.dispatch({
          changes: { from: tableFrom, to: tableTo, insert: newText },
        });
        focusBodyRow(view, wrapper._tableFrom, insertIdx);
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        (e.target as HTMLElement).blur();
        // Place CM cursor after the table
        const tableTo: number = wrapper._tableTo;
        view.dispatch({
          selection: { anchor: Math.min(tableTo + 1, view.state.doc.length) },
        });
        view.focus();
        return;
      }

      // Arrow-key cell navigation
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const nextRow = e.key === "ArrowUp" ? row - 1 : row + 1;
        if (nextRow >= 0 && nextRow < totalRows) {
          e.preventDefault();
          focusDOMCell(nextRow, col, "start");
        } else {
          e.preventDefault();
          (e.target as HTMLElement).blur();
          exitTable(e.key === "ArrowUp" ? "before" : "after");
        }
      }

      // Arrow left/right: move between cells and exit table at boundaries
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;

        const cell = e.target as HTMLElement;
        const textLen = (cell.textContent ?? "").length;
        const offset = sel.focusOffset;

        const atStart = offset === 0;
        const atEnd = offset >= textLen;

        if (e.key === "ArrowLeft" && atStart) {
          e.preventDefault();
          // Move to previous cell (end), or exit table
          let prevRow = row;
          let prevCol = col - 1;
          if (prevCol < 0) {
            prevCol = colCount - 1;
            prevRow--;
          }
          if (prevRow >= 0) {
            focusDOMCell(prevRow, prevCol, "end");
          } else {
            (e.target as HTMLElement).blur();
            exitTable("before");
          }
          return;
        }

        if (e.key === "ArrowRight" && atEnd) {
          e.preventDefault();
          // Move to next cell (start), or exit table
          let nextRow = row;
          let nextCol = col + 1;
          if (nextCol >= colCount) {
            nextCol = 0;
            nextRow++;
          }
          if (nextRow < totalRows) {
            focusDOMCell(nextRow, nextCol, "start");
          } else {
            (e.target as HTMLElement).blur();
            exitTable("after");
          }
          return;
        }
      }
    };

    // ── Row/column selection state ──
    let selectedRow = -1;
    let selectedCol = -1;

    const clearSelection = () => {
      selectedRow = -1;
      selectedCol = -1;
      el.querySelectorAll(".cm-table-row-selected").forEach((e) =>
        e.classList.remove("cm-table-row-selected"),
      );
      el.querySelectorAll(".cm-table-col-selected").forEach((e) =>
        e.classList.remove("cm-table-col-selected"),
      );
    };

    const selectRow = (r: number) => {
      clearSelection();
      selectedRow = r;
      const row = tbl.querySelectorAll("tbody tr")[r];
      if (row) row.classList.add("cm-table-row-selected");
      wrapper.tabIndex = -1;
      wrapper.focus();
    };

    const selectCol = (c: number) => {
      clearSelection();
      selectedCol = c;
      tbl.querySelectorAll("thead tr, tbody tr").forEach((tr) => {
        const cells = tr.querySelectorAll(CELL_SELECTOR);
        if (cells[c]) cells[c].classList.add("cm-table-col-selected");
      });
      const handles = colHandles.querySelectorAll(".cm-table-col-handle");
      if (handles[c]) handles[c].classList.add("cm-table-col-selected");
      wrapper.tabIndex = -1;
      wrapper.focus();
    };

    const deleteSelection = () => {
      if (selectedRow >= 0) {
        syncToMarkdown();
        const parsed = readDOMTable();
        parsed.rows.splice(selectedRow, 1);
        const newText = serializeTable(parsed);
        view.dispatch({
          changes: {
            from: wrapper._tableFrom,
            to: wrapper._tableTo,
            insert: newText,
          },
        });
        clearSelection();
      } else if (selectedCol >= 0) {
        syncToMarkdown();
        const parsed = readDOMTable();
        if (parsed.headers.length <= 1) {
          // Last column — remove the entire table
          const from = wrapper._tableFrom;
          let to = wrapper._tableTo;
          // Include trailing newline if present
          if (
            to < view.state.doc.length &&
            view.state.doc.sliceString(to, to + 1) === "\n"
          ) {
            to++;
          }
          view.dispatch({
            changes: { from, to, insert: "" },
            selection: {
              anchor: Math.min(from, view.state.doc.length - (to - from)),
            },
          });
          view.focus();
        } else {
          parsed.headers.splice(selectedCol, 1);
          parsed.alignments.splice(selectedCol, 1);
          parsed.rows = parsed.rows.map((row) => {
            row.splice(selectedCol, 1);
            return row;
          });
          const newText = serializeTable(parsed);
          view.dispatch({
            changes: {
              from: wrapper._tableFrom,
              to: wrapper._tableTo,
              insert: newText,
            },
          });
        }
        clearSelection();
      }
    };

    // ── Column drag handles (top) ──
    const colHandles = document.createElement("div");
    colHandles.className = "cm-table-col-handles";
    for (let c = 0; c < colCount; c++) {
      const handle = document.createElement("div");
      handle.className = "cm-table-col-handle";
      handle.title = "Click to select column, drag to reorder";
      handle.draggable = true;
      handle.dataset["col"] = String(c);
      handle.addEventListener("click", () => {
        if (selectedCol === c) clearSelection();
        else selectCol(c);
      });
      colHandles.appendChild(handle);
    }
    wrapper.appendChild(colHandles);

    // ── <thead> ──
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    // Row drag handle placeholder for header
    const dragTh = document.createElement("th");
    dragTh.className = "cm-table-drag-cell";
    headRow.appendChild(dragTh);

    for (let c = 0; c < colCount; c++) {
      const th = document.createElement("th");
      th.dataset["raw"] = headers[c];
      renderCell(th);
      th.contentEditable = "true";
      th.style.textAlign = alignments[c] ?? "";
      th.addEventListener("input", () => {
        th.dataset["raw"] = th.textContent ?? "";
        syncToMarkdown();
      });
      th.addEventListener("keydown", (e) => handleCellKeydown(e, 0, c));
      th.addEventListener("focus", () => {
        clearSelection();
        th.textContent = th.dataset["raw"] ?? "";
      });
      th.addEventListener("blur", () => {
        th.dataset["raw"] = th.textContent ?? "";
        renderCell(th);
      });
      headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    tbl.appendChild(thead);

    // ── <tbody> ──
    const tbody = document.createElement("tbody");
    for (let r = 0; r < rows.length; r++) {
      const tr = document.createElement("tr");

      // Row drag handle
      const dragTd = document.createElement("td");
      dragTd.className = "cm-table-drag-cell";
      const dragIcon = document.createElement("span");
      dragIcon.className = "cm-table-row-handle";
      dragIcon.title = "Click to select row, drag to reorder";
      dragIcon.draggable = true;
      dragIcon.dataset["row"] = String(r);
      dragIcon.addEventListener("click", () => {
        if (selectedRow === r) clearSelection();
        else selectRow(r);
      });
      dragTd.appendChild(dragIcon);
      tr.appendChild(dragTd);

      for (let c = 0; c < colCount; c++) {
        const td = document.createElement("td");
        td.dataset["raw"] = rows[r][c] ?? "";
        renderCell(td);
        td.contentEditable = "true";
        td.style.textAlign = alignments[c] ?? "";
        td.addEventListener("input", () => {
          td.dataset["raw"] = td.textContent ?? "";
          syncToMarkdown();
        });
        td.addEventListener("keydown", (e) => handleCellKeydown(e, r + 1, c));
        td.addEventListener("focus", () => {
          clearSelection();
          td.textContent = td.dataset["raw"] ?? "";
        });
        td.addEventListener("blur", () => {
          td.dataset["raw"] = td.textContent ?? "";
          renderCell(td);
        });
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    tbl.appendChild(tbody);
    wrapper.appendChild(tbl);

    // ── Add column button (right edge) ──
    const addCol = document.createElement("button");
    addCol.className = "cm-table-add-col";
    addCol.title = "Add column to the right";
    addCol.textContent = "+";
    addCol.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.addColumn(view, wrapper, readDOMTable);
    });
    wrapper.appendChild(addCol);

    // ── Add row button (bottom edge) ──
    const addRow = document.createElement("button");
    addRow.className = "cm-table-add-row";
    addRow.title = "Add row below";
    addRow.textContent = "+";
    addRow.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.addRow(view, wrapper, readDOMTable);
    });
    wrapper.appendChild(addRow);

    // ── Delete / Escape key on selected row/column ──
    wrapper.addEventListener("keydown", (e) => {
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        (selectedRow >= 0 || selectedCol >= 0)
      ) {
        e.preventDefault();
        e.stopPropagation();
        deleteSelection();
      }
      if (e.key === "Escape" && (selectedRow >= 0 || selectedCol >= 0)) {
        e.preventDefault();
        clearSelection();
      }
    });

    // ── Wire up drag-and-drop ──
    this.setupRowDrag(wrapper, view, readDOMTable);
    this.setupColDrag(wrapper, view, readDOMTable);

    return wrapper;
  }

  private addColumn(
    view: EditorView,
    wrapper: TableDOMElement,
    readDOM: () => ParsedTable,
  ) {
    const tableFrom: number = wrapper._tableFrom;
    const tableTo: number = wrapper._tableTo;
    const parsed = readDOM();
    parsed.headers = [...parsed.headers, ""];
    parsed.alignments = [...parsed.alignments, null];
    parsed.rows = parsed.rows.map((r) => [...r, ""]);
    const newText = serializeTable(parsed);
    view.dispatch({
      changes: { from: tableFrom, to: tableTo, insert: newText },
    });
  }

  private addRow(
    view: EditorView,
    wrapper: TableDOMElement,
    readDOM: () => ParsedTable,
  ) {
    const tableFrom: number = wrapper._tableFrom;
    const tableTo: number = wrapper._tableTo;
    const parsed = readDOM();
    parsed.rows = [...parsed.rows, Array(parsed.headers.length).fill("")];
    const newText = serializeTable(parsed);
    view.dispatch({
      changes: { from: tableFrom, to: tableTo, insert: newText },
    });
    focusBodyRow(view, wrapper._tableFrom, -1);
  }

  private setupRowDrag(
    wrapper: TableDOMElement,
    view: EditorView,
    readDOM: () => ParsedTable,
  ) {
    let dragRow = -1;
    wrapper.addEventListener("dragstart", (e) => {
      const handle = (e.target as HTMLElement).closest(".cm-table-row-handle");
      if (!handle) return;
      dragRow = parseInt((handle as HTMLElement).dataset["row"] ?? "-1", 10);
      if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
    });
    wrapper.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    });
    wrapper.addEventListener("drop", (e) => {
      e.preventDefault();
      const target = (e.target as HTMLElement).closest("tr");
      if (!target || dragRow < 0) return;
      const tbody = wrapper.querySelector("tbody");
      if (!tbody) return;
      const rows = Array.from(tbody.querySelectorAll("tr"));
      const dropRow = rows.indexOf(target);
      if (dropRow < 0 || dropRow === dragRow) return;

      const tableFrom: number = wrapper._tableFrom;
      const tableTo: number = wrapper._tableTo;
      const parsed = readDOM();
      const [moved] = parsed.rows.splice(dragRow, 1);
      parsed.rows.splice(dropRow, 0, moved);
      const newText = serializeTable(parsed);
      view.dispatch({
        changes: { from: tableFrom, to: tableTo, insert: newText },
      });
      dragRow = -1;
    });
  }

  private setupColDrag(
    wrapper: TableDOMElement,
    view: EditorView,
    readDOM: () => ParsedTable,
  ) {
    let dragCol = -1;
    wrapper.addEventListener("dragstart", (e) => {
      const handle = (e.target as HTMLElement).closest(".cm-table-col-handle");
      if (!handle) return;
      dragCol = parseInt((handle as HTMLElement).dataset["col"] ?? "-1", 10);
      if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
    });
    wrapper.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    });
    wrapper.addEventListener("drop", (e) => {
      const handle = (e.target as HTMLElement).closest(".cm-table-col-handle");
      if (!handle || dragCol < 0) return;
      e.preventDefault();
      const dropCol = parseInt(
        (handle as HTMLElement).dataset["col"] ?? "-1",
        10,
      );
      if (dropCol < 0 || dropCol === dragCol) return;

      const swap = <T>(arr: T[]): T[] => {
        const copy = [...arr];
        const [moved] = copy.splice(dragCol, 1);
        copy.splice(dropCol, 0, moved);
        return copy;
      };

      const tableFrom: number = wrapper._tableFrom;
      const tableTo: number = wrapper._tableTo;
      const parsed = readDOM();
      const newTable: ParsedTable = {
        headers: swap(parsed.headers),
        alignments: swap(parsed.alignments),
        rows: parsed.rows.map(swap),
      };
      const newText = serializeTable(newTable);
      view.dispatch({
        changes: { from: tableFrom, to: tableTo, insert: newText },
      });
      dragCol = -1;
    });
  }
}
