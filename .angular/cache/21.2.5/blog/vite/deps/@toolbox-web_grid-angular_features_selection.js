import {
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal
} from "./chunk-V4JNLVB6.js";
import "./chunk-RSS3ODKE.js";
import {
  i
} from "./chunk-T2EC7GEW.js";
import {
  __spreadValues
} from "./chunk-46DXP6YY.js";

// node_modules/@toolbox-web/grid/lib/plugins/selection/index.js
function e(e2) {
  if (!e2) return -1;
  const t2 = e2.getAttribute("data-row");
  if (t2) return parseInt(t2, 10);
  const s2 = e2.closest(".data-grid-row");
  if (!s2) return -1;
  const i3 = s2.parentElement;
  if (!i3) return -1;
  const r2 = i3.querySelectorAll(":scope > .data-grid-row");
  for (let o2 = 0; o2 < r2.length; o2++) if (r2[o2] === s2) return o2;
  return -1;
}
function t(e2) {
  e2 && e2.querySelectorAll(".cell-focus").forEach((e3) => e3.classList.remove("cell-focus"));
}
function s(e2, t2) {
  return `[tbw-grid${e2 ? `#${e2}` : ""}${t2 ? `:${t2}` : ""}]`;
}
function i2(e2, t2, i3, r2) {
  return `${s(i3, r2)} ${e2}: ${t2}

  → More info: ${(function(e3) {
    return `https://toolboxjs.com/grid/errors#${e3.toLowerCase()}`;
  })(e2)}`;
}
var r = /* @__PURE__ */ new Set(["script", "iframe", "object", "embed", "form", "input", "button", "textarea", "select", "link", "meta", "base", "style", "template", "slot", "portal", "frame", "frameset", "applet", "noscript", "noembed", "plaintext", "xmp", "listing"]);
var o = /^on\w+$/i;
var n = /* @__PURE__ */ new Set(["href", "src", "action", "formaction", "data", "srcdoc", "xlink:href", "poster", "srcset"]);
var l = /^\s*(javascript|vbscript|data|blob):/i;
function c(e2) {
  if (!e2 || "string" != typeof e2) return "";
  if (-1 === e2.indexOf("<")) return e2;
  const t2 = document.createElement("template");
  return t2.innerHTML = e2, (function(e3) {
    const t3 = [], s2 = e3.querySelectorAll("*");
    for (const i3 of s2) {
      const e4 = i3.tagName.toLowerCase();
      if (r.has(e4)) {
        t3.push(i3);
        continue;
      }
      if ("svg" === e4 || "http://www.w3.org/2000/svg" === i3.namespaceURI) {
        if (Array.from(i3.attributes).some((e5) => o.test(e5.name) || "href" === e5.name || "xlink:href" === e5.name)) {
          t3.push(i3);
          continue;
        }
      }
      const s3 = [];
      for (const t4 of i3.attributes) {
        const e5 = t4.name.toLowerCase();
        o.test(e5) ? s3.push(t4.name) : (n.has(e5) && l.test(t4.value) || "style" === e5 && /expression\s*\(|javascript:|behavior\s*:/i.test(t4.value)) && s3.push(t4.name);
      }
      s3.forEach((e5) => i3.removeAttribute(e5));
    }
    t3.forEach((e4) => e4.remove());
  })(t2.content), t2.innerHTML;
}
var a = '<svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>';
var d = { expand: "▶", collapse: "▼", sortAsc: "▲", sortDesc: "▼", sortNone: "⇅", submenuArrow: "▶", dragHandle: "⋮⋮", toolPanel: "☰", filter: a, filterActive: a, print: "🖨️" };
var h = class {
  static dependencies;
  static manifest;
  aliases;
  version = "undefined" != typeof __GRID_VERSION__ ? __GRID_VERSION__ : "dev";
  styles;
  cellRenderers;
  headerRenderers;
  cellEditors;
  grid;
  config;
  userConfig;
  #e;
  get defaultConfig() {
    return {};
  }
  constructor(e2 = {}) {
    this.userConfig = e2;
  }
  attach(e2) {
    this.#e?.abort(), this.#e = new AbortController(), this.grid = e2, this.config = __spreadValues(__spreadValues({}, this.defaultConfig), this.userConfig);
  }
  detach() {
    this.#e?.abort(), this.#e = void 0;
  }
  getPlugin(e2) {
    return this.grid?.getPlugin(e2);
  }
  emit(e2, t2) {
    this.grid?.dispatchEvent?.(new CustomEvent(e2, { detail: t2, bubbles: true }));
  }
  emitCancelable(e2, t2) {
    const s2 = new CustomEvent(e2, { detail: t2, bubbles: true, cancelable: true });
    return this.grid?.dispatchEvent?.(s2), s2.defaultPrevented;
  }
  on(e2, t2) {
    this.grid?._pluginManager?.subscribe(this, e2, t2);
  }
  off(e2) {
    this.grid?._pluginManager?.unsubscribe(this, e2);
  }
  emitPluginEvent(e2, t2) {
    this.grid?._pluginManager?.emitPluginEvent(e2, t2);
  }
  requestRender() {
    this.grid?.requestRender?.();
  }
  requestColumnsRender() {
    this.grid?.requestColumnsRender?.();
  }
  requestRenderWithFocus() {
    this.grid?.requestRenderWithFocus?.();
  }
  requestAfterRender() {
    this.grid?.requestAfterRender?.();
  }
  requestVirtualRefresh() {
    this.grid?.requestVirtualRefresh?.();
  }
  get rows() {
    return this.grid?.rows ?? [];
  }
  get sourceRows() {
    return this.grid?.sourceRows ?? [];
  }
  get columns() {
    return this.grid?.columns ?? [];
  }
  get visibleColumns() {
    return this.grid?._visibleColumns ?? [];
  }
  get gridElement() {
    return this.grid?._hostElement;
  }
  get disconnectSignal() {
    return this.#e?.signal ?? this.grid?.disconnectSignal;
  }
  get gridIcons() {
    const e2 = this.grid?.gridConfig?.icons ?? {};
    return __spreadValues(__spreadValues({}, d), e2);
  }
  get isAnimationEnabled() {
    const e2 = this.grid?.effectiveConfig?.animation?.mode ?? "reduced-motion";
    if (false === e2 || "off" === e2) return false;
    if (true === e2 || "on" === e2) return true;
    const t2 = this.gridElement;
    if (t2) {
      return "0" !== getComputedStyle(t2).getPropertyValue("--tbw-animation-enabled").trim();
    }
    return true;
  }
  get animationDuration() {
    const e2 = this.gridElement;
    if (e2) {
      const t2 = getComputedStyle(e2).getPropertyValue("--tbw-animation-duration").trim(), s2 = parseInt(t2, 10);
      if (!isNaN(s2)) return s2;
    }
    return 200;
  }
  resolveIcon(e2, t2) {
    return void 0 !== t2 ? t2 : this.gridIcons[e2];
  }
  setIcon(e2, t2) {
    "string" == typeof t2 ? e2.innerHTML = c(t2) : t2 instanceof HTMLElement && (e2.innerHTML = "", e2.appendChild(t2.cloneNode(true)));
  }
  warn(e2, t2) {
    void 0 !== t2 ? console.warn(i2(e2, t2, this.gridElement.id, this.name)) : console.warn(`${s(this.gridElement.id, this.name)} ${e2}`);
  }
  throwDiagnostic(e2, t2) {
    throw new Error(i2(e2, t2, this.gridElement.id, this.name));
  }
};
function u(e2) {
  return "__tbw_expander" === e2.field;
}
function g(e2) {
  return true === e2.meta?.utility;
}
function w(e2) {
  return { startRow: Math.min(e2.startRow, e2.endRow), startCol: Math.min(e2.startCol, e2.endCol), endRow: Math.max(e2.startRow, e2.endRow), endCol: Math.max(e2.startCol, e2.endCol) };
}
function f(e2) {
  const t2 = w(e2);
  return { from: { row: t2.startRow, col: t2.startCol }, to: { row: t2.endRow, col: t2.endCol } };
}
function b(e2) {
  return e2.map(f);
}
function m(e2, t2, s2) {
  return s2.some((s3) => (function(e3, t3, s4) {
    const i3 = w(s4);
    return e3 >= i3.startRow && e3 <= i3.endRow && t3 >= i3.startCol && t3 <= i3.endCol;
  })(e2, t2, s3));
}
function p(e2) {
  const t2 = [], s2 = w(e2);
  for (let i3 = s2.startRow; i3 <= s2.endRow; i3++) for (let e3 = s2.startCol; e3 <= s2.endCol; e3++) t2.push({ row: i3, col: e3 });
  return t2;
}
function R(e2, t2) {
  return { startRow: e2.row, startCol: e2.col, endRow: t2.row, endCol: t2.col };
}
function v(e2, t2) {
  const s2 = w(e2), i3 = w(t2);
  return s2.startRow === i3.startRow && s2.startCol === i3.startCol && s2.endRow === i3.endRow && s2.endCol === i3.endCol;
}
var S = "__tbw_checkbox";
var y = class extends h {
  static manifest = { queries: [{ type: "getSelection", description: "Get the current selection state" }, { type: "selectRows", description: "Select specific rows by index (row mode only)" }, { type: "getSelectedRowIndices", description: "Get sorted array of selected row indices" }, { type: "getSelectedRows", description: "Get actual row objects for the current selection (works in all modes)" }], configRules: [{ id: "selection/range-dblclick", severity: "warn", message: `"triggerOn: 'dblclick'" has no effect when mode is "range".
  → Range selection uses drag interaction (mousedown → mousemove), not click events.
  → The "triggerOn" option only affects "cell" and "row" selection modes.`, check: (e2) => "range" === e2.mode && "dblclick" === e2.triggerOn }] };
  name = "selection";
  styles = '@layer tbw-plugins{tbw-grid.selecting .data-grid-row>.cell{-webkit-user-select:none;user-select:none}tbw-grid:has(.selection){-webkit-user-select:none;user-select:none}tbw-grid:has(.selection)[data-selection-mode=row] .cell-focus,tbw-grid:has(.selection)[data-selection-mode=row] .row-focus,tbw-grid:has(.selection)[data-selection-mode=range] .cell-focus{outline:none}tbw-grid .data-grid-row.row-focus{background-color:var(--tbw-focus-background, rgba(from var(--tbw-color-accent) r g b / 12%));outline:none;position:relative}tbw-grid .data-grid-row.row-focus:after{content:"";position:absolute;inset:0;pointer-events:none;border-width:0;border-style:var(--tbw-selection-border-style, var(--tbw-border-style));border-color:var(--tbw-range-border-color, var(--tbw-color-accent));border-top-width:var(--tbw-selection-border-width, var(--tbw-border-width));border-bottom-width:var(--tbw-selection-border-width, var(--tbw-border-width));z-index:1}tbw-grid .data-grid-row.row-focus+.data-grid-row.row-focus:after{border-top-width:0}tbw-grid .data-grid-row.row-focus:has(+.data-grid-row.row-focus):after{border-bottom-width:0}tbw-grid .data-grid-row>.cell.selected{background-color:var(--tbw-range-selection-bg);position:relative}tbw-grid .data-grid-row>.cell.selected:after{content:"";position:absolute;inset:0;pointer-events:none;border:0 var(--tbw-selection-border-style, var(--tbw-border-style)) var(--tbw-range-border-color);z-index:1}tbw-grid .data-grid-row>.cell.selected.top:after{border-top-width:var(--tbw-selection-border-width, var(--tbw-border-width))}tbw-grid .data-grid-row>.cell.selected.bottom:after{border-bottom-width:var(--tbw-selection-border-width, var(--tbw-border-width))}tbw-grid .data-grid-row>.cell.selected.first:after{border-left-width:var(--tbw-selection-border-width, var(--tbw-border-width))}tbw-grid .data-grid-row>.cell.selected.last:after{border-right-width:var(--tbw-selection-border-width, var(--tbw-border-width))}tbw-grid .data-grid-row[data-selectable=false]{cursor:not-allowed;opacity:.6}tbw-grid .data-grid-row[data-selectable=false].row-focus{background-color:var(--tbw-color-row-alt)}tbw-grid .data-grid-row>.cell[data-selectable=false]{cursor:not-allowed;opacity:.6}tbw-grid .data-grid-row>.cell[data-selectable=false].selected{background-color:var(--tbw-selection-warning-bg, rgba(from var(--tbw-color-error) r g b / 50%))}tbw-grid .tbw-selection-summary{font-size:var(--tbw-font-size-sm, .8125rem);color:var(--tbw-color-fg-muted);white-space:nowrap}tbw-grid .data-grid-row>.cell[data-field=__tbw_checkbox],tbw-grid .header-row>.cell[data-field=__tbw_checkbox]{text-align:center;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center}tbw-grid .tbw-select-row-checkbox{pointer-events:none;margin:0;cursor:pointer}tbw-grid .tbw-checkbox-header{display:flex;justify-content:center;align-items:center;height:100%}tbw-grid .tbw-select-all-checkbox{margin:0;cursor:pointer}}';
  get defaultConfig() {
    return { mode: "cell", triggerOn: "click", enabled: true, multiSelect: true };
  }
  selected = /* @__PURE__ */ new Set();
  lastSelected = null;
  anchor = null;
  ranges = [];
  activeRange = null;
  cellAnchor = null;
  isDragging = false;
  pendingKeyboardUpdate = null;
  pendingRowKeyUpdate = null;
  selectedCell = null;
  lastSyncedFocusRow = -1;
  lastSyncedFocusCol = -1;
  explicitSelection = false;
  isSelectionEnabled() {
    return false !== this.config.enabled && false !== this.grid.effectiveConfig?.selectable;
  }
  checkSelectable(e2, t2) {
    const { isSelectable: s2 } = this.config;
    if (!s2) return true;
    const i3 = this.rows[e2];
    if (!i3) return false;
    return s2(i3, e2, void 0 !== t2 ? this.visibleColumns[t2] : void 0, t2);
  }
  isRowSelectable(e2) {
    return this.checkSelectable(e2);
  }
  isCellSelectable(e2, t2) {
    return this.checkSelectable(e2, t2);
  }
  attach(e2) {
    super.attach(e2), this.on("filter-applied", () => this.clearSelectionSilent()), this.on("grouping-state-change", () => this.clearSelectionSilent()), this.on("tree-state-change", () => this.clearSelectionSilent());
  }
  handleQuery(e2) {
    return "getSelection" === e2.type ? this.getSelection() : "getSelectedRowIndices" === e2.type ? this.getSelectedRowIndices() : "getSelectedRows" === e2.type ? this.getSelectedRows() : "selectRows" === e2.type ? (this.selectRows(e2.context), true) : void 0;
  }
  detach() {
    this.selected.clear(), this.ranges = [], this.activeRange = null, this.cellAnchor = null, this.isDragging = false, this.selectedCell = null, this.pendingKeyboardUpdate = null, this.pendingRowKeyUpdate = null, this.lastSyncedFocusRow = -1, this.lastSyncedFocusCol = -1;
  }
  clearSelectionSilent() {
    this.selected.clear(), this.ranges = [], this.activeRange = null, this.cellAnchor = null, this.selectedCell = null, this.lastSelected = null, this.anchor = null, this.lastSyncedFocusRow = -1, this.lastSyncedFocusCol = -1, this.requestAfterRender();
  }
  onCellClick(e2) {
    if (!this.isSelectionEnabled()) return false;
    const { rowIndex: t2, colIndex: s2, originalEvent: i3 } = e2, { mode: r2, triggerOn: o2 = "click" } = this.config;
    if (i3.type !== o2) return false;
    const n2 = e2.column, l2 = n2 && g(n2);
    if ("cell" === r2) {
      if (l2) return false;
      if (!this.isCellSelectable(t2, s2)) return false;
      const e3 = this.selectedCell;
      return e3 && e3.row === t2 && e3.col === s2 || (this.selectedCell = { row: t2, col: s2 }, this.emit("selection-change", this.#t()), this.requestAfterRender()), false;
    }
    if ("row" === r2) {
      if (!this.isRowSelectable(t2)) return false;
      const e3 = false !== this.config.multiSelect, s3 = i3.shiftKey && e3, r3 = (i3.ctrlKey || i3.metaKey) && e3, o3 = true === n2?.meta?.checkboxColumn;
      if (s3 && null !== this.anchor) {
        const e4 = Math.min(this.anchor, t2), s4 = Math.max(this.anchor, t2);
        r3 || this.selected.clear();
        for (let t3 = e4; t3 <= s4; t3++) this.isRowSelectable(t3) && this.selected.add(t3);
      } else if (r3 || o3 && e3) this.selected.has(t2) ? this.selected.delete(t2) : this.selected.add(t2), this.anchor = t2;
      else {
        if (1 === this.selected.size && this.selected.has(t2)) return false;
        this.selected.clear(), this.selected.add(t2), this.anchor = t2;
      }
      return this.lastSelected = t2, this.explicitSelection = true, this.emit("selection-change", this.#t()), this.requestAfterRender(), false;
    }
    if ("range" === r2) {
      if (l2) return false;
      if (!this.isCellSelectable(t2, s2)) return false;
      const e3 = i3.shiftKey, r3 = (i3.ctrlKey || i3.metaKey) && false !== this.config.multiSelect;
      if (e3 && this.cellAnchor) {
        const e4 = R(this.cellAnchor, { row: t2, col: s2 }), i4 = this.ranges.length > 0 ? this.ranges[this.ranges.length - 1] : null;
        if (i4 && v(i4, e4)) return false;
        r3 ? this.ranges.length > 0 ? this.ranges[this.ranges.length - 1] = e4 : this.ranges.push(e4) : this.ranges = [e4], this.activeRange = e4;
      } else if (r3) {
        const e4 = { startRow: t2, startCol: s2, endRow: t2, endCol: s2 };
        this.ranges.push(e4), this.activeRange = e4, this.cellAnchor = { row: t2, col: s2 };
      } else {
        const e4 = { startRow: t2, startCol: s2, endRow: t2, endCol: s2 };
        if (1 === this.ranges.length && v(this.ranges[0], e4)) return false;
        this.ranges = [e4], this.activeRange = e4, this.cellAnchor = { row: t2, col: s2 };
      }
      return this.emit("selection-change", this.#t()), this.requestAfterRender(), false;
    }
    return false;
  }
  onKeyDown(e2) {
    if (!this.isSelectionEnabled()) return false;
    const { mode: t2 } = this.config, s2 = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab", "Home", "End", "PageUp", "PageDown"].includes(e2.key);
    if ("Escape" === e2.key) {
      return !this.grid.query("isEditing").some(Boolean) && ("cell" === t2 ? this.selectedCell = null : "row" === t2 ? (this.selected.clear(), this.anchor = null) : "range" === t2 && (this.ranges = [], this.activeRange = null, this.cellAnchor = null), this.emit("selection-change", this.#t()), this.requestAfterRender(), true);
    }
    if ("cell" === t2 && s2) return queueMicrotask(() => {
      const e3 = this.grid._focusRow, t3 = this.grid._focusCol;
      this.isCellSelectable(e3, t3) ? this.selectedCell = { row: e3, col: t3 } : this.selectedCell = null, this.emit("selection-change", this.#t()), this.requestAfterRender();
    }), false;
    if ("row" === t2) {
      const t3 = false !== this.config.multiSelect;
      if ("ArrowUp" === e2.key || "ArrowDown" === e2.key || "PageUp" === e2.key || "PageDown" === e2.key || (e2.ctrlKey || e2.metaKey) && ("Home" === e2.key || "End" === e2.key)) {
        const s3 = e2.shiftKey && t3;
        return s3 && null === this.anchor && (this.anchor = this.grid._focusRow), this.explicitSelection = true, this.pendingRowKeyUpdate = { shiftKey: s3 }, queueMicrotask(() => this.requestAfterRender()), false;
      }
      if (t3 && "a" === e2.key && (e2.ctrlKey || e2.metaKey)) {
        return !this.grid.query("isEditing").some(Boolean) && (e2.preventDefault(), e2.stopPropagation(), this.selectAll(), true);
      }
    }
    if ("range" === t2 && s2) {
      const t3 = "Tab" === e2.key, s3 = e2.shiftKey && !t3;
      return s3 && !this.cellAnchor && (this.cellAnchor = { row: this.grid._focusRow, col: this.grid._focusCol }), this.pendingKeyboardUpdate = { shiftKey: s3 }, queueMicrotask(() => this.requestAfterRender()), false;
    }
    if ("range" === t2 && false !== this.config.multiSelect && "a" === e2.key && (e2.ctrlKey || e2.metaKey)) {
      return !this.grid.query("isEditing").some(Boolean) && (e2.preventDefault(), e2.stopPropagation(), this.selectAll(), true);
    }
    return false;
  }
  onCellMouseDown(e2) {
    if (!this.isSelectionEnabled()) return;
    if ("range" !== this.config.mode) return;
    if (void 0 === e2.rowIndex || void 0 === e2.colIndex) return;
    if (e2.rowIndex < 0) return;
    if (e2.column && g(e2.column)) return;
    if (!this.isCellSelectable(e2.rowIndex, e2.colIndex)) return;
    if (e2.originalEvent.shiftKey && this.cellAnchor) return;
    this.isDragging = true;
    const t2 = e2.rowIndex, s2 = e2.colIndex, i3 = (e2.originalEvent.ctrlKey || e2.originalEvent.metaKey) && false !== this.config.multiSelect, r2 = { startRow: t2, startCol: s2, endRow: t2, endCol: s2 };
    return !i3 && 1 === this.ranges.length && v(this.ranges[0], r2) ? (this.cellAnchor = { row: t2, col: s2 }, true) : (this.cellAnchor = { row: t2, col: s2 }, i3 || (this.ranges = []), this.ranges.push(r2), this.activeRange = r2, this.emit("selection-change", this.#t()), this.requestAfterRender(), true);
  }
  onCellMouseMove(e2) {
    if (!this.isSelectionEnabled()) return;
    if ("range" !== this.config.mode) return;
    if (!this.isDragging || !this.cellAnchor) return;
    if (void 0 === e2.rowIndex || void 0 === e2.colIndex) return;
    if (e2.rowIndex < 0) return;
    let t2 = e2.colIndex;
    const s2 = this.visibleColumns[t2];
    if (s2 && g(s2)) {
      const e3 = this.visibleColumns.findIndex((e4) => !g(e4));
      e3 >= 0 && (t2 = e3);
    }
    const i3 = R(this.cellAnchor, { row: e2.rowIndex, col: t2 }), r2 = this.ranges.length > 0 ? this.ranges[this.ranges.length - 1] : null;
    return r2 && v(r2, i3) || (this.ranges.length > 0 ? this.ranges[this.ranges.length - 1] = i3 : this.ranges.push(i3), this.activeRange = i3, this.emit("selection-change", this.#t()), this.requestAfterRender()), true;
  }
  onCellMouseUp(e2) {
    if (this.isSelectionEnabled() && "range" === this.config.mode) return this.isDragging ? (this.isDragging = false, true) : void 0;
  }
  processColumns(e2) {
    if (this.config.checkbox && "row" === this.config.mode) {
      if (e2.some((e3) => e3.field === S)) return e2;
      const t2 = this.#s(), s2 = e2.findIndex(u), i3 = s2 >= 0 ? s2 + 1 : 0;
      return [...e2.slice(0, i3), t2, ...e2.slice(i3)];
    }
    return e2;
  }
  #s() {
    return { field: S, header: "", width: 32, resizable: false, sortable: false, meta: { lockPosition: true, suppressMovable: true, utility: true, checkboxColumn: true }, headerRenderer: () => {
      const e2 = document.createElement("div");
      if (e2.className = "tbw-checkbox-header", false === this.config.multiSelect) return e2;
      const t2 = document.createElement("input");
      return t2.type = "checkbox", t2.className = "tbw-select-all-checkbox", t2.addEventListener("click", (e3) => {
        e3.stopPropagation(), e3.target.checked ? this.selectAll() : this.clearSelection();
      }), e2.appendChild(t2), e2;
    }, renderer: (e2) => {
      const t2 = document.createElement("input");
      t2.type = "checkbox", t2.className = "tbw-select-row-checkbox";
      const s2 = e2.cellEl;
      if (s2) {
        const e3 = parseInt(s2.getAttribute("data-row") ?? "-1", 10);
        e3 >= 0 && (t2.checked = this.selected.has(e3));
      }
      return t2;
    } };
  }
  #i(t2) {
    t2.querySelectorAll(".tbw-select-row-checkbox").forEach((t3) => {
      const s3 = t3.closest(".cell"), i3 = s3 ? e(s3) : -1;
      i3 >= 0 && (t3.checked = this.selected.has(i3));
    });
    const s2 = t2.querySelector(".tbw-select-all-checkbox");
    if (s2) {
      const e2 = this.rows.length;
      let t3 = 0;
      if (this.config.isSelectable) for (let s3 = 0; s3 < e2; s3++) this.isRowSelectable(s3) && t3++;
      else t3 = e2;
      const i3 = t3 > 0 && this.selected.size >= t3, r2 = this.selected.size > 0;
      s2.checked = i3, s2.indeterminate = r2 && !i3;
    }
  }
  #r(e2) {
    const t2 = this.grid._focusRow, s2 = this.grid._focusCol;
    if ("row" === e2) {
      if (this.explicitSelection) return this.explicitSelection = false, void (this.lastSyncedFocusRow = t2);
      t2 !== this.lastSyncedFocusRow && (this.lastSyncedFocusRow = t2, this.isRowSelectable(t2) && (this.selected.has(t2) && 1 === this.selected.size || (this.selected.clear(), this.selected.add(t2), this.lastSelected = t2, this.anchor = t2, this.emit("selection-change", this.#t()))));
    }
    if ("cell" === e2) {
      if (this.explicitSelection) return this.explicitSelection = false, this.lastSyncedFocusRow = t2, void (this.lastSyncedFocusCol = s2);
      if ((t2 !== this.lastSyncedFocusRow || s2 !== this.lastSyncedFocusCol) && (this.lastSyncedFocusRow = t2, this.lastSyncedFocusCol = s2, this.isCellSelectable(t2, s2))) {
        const e3 = this.selectedCell;
        e3 && e3.row === t2 && e3.col === s2 || (this.selectedCell = { row: t2, col: s2 }, this.emit("selection-change", this.#t()));
      }
    }
  }
  #o() {
    const s2 = this.gridElement;
    if (!s2) return;
    const { mode: i3 } = this.config, r2 = !!this.config.isSelectable;
    s2.querySelectorAll(".cell").forEach((e2) => {
      e2.classList.remove("selected", "top", "bottom", "first", "last"), r2 && e2.removeAttribute("data-selectable");
    });
    const o2 = s2.querySelectorAll(".data-grid-row");
    if (o2.forEach((e2) => {
      e2.classList.remove("selected", "row-focus"), e2.setAttribute("aria-selected", "false"), r2 && e2.removeAttribute("data-selectable");
    }), "row" === i3 && (t(s2), o2.forEach((t2) => {
      const s3 = e(t2.querySelector(".cell[data-row]"));
      s3 >= 0 && (r2 && !this.isRowSelectable(s3) && t2.setAttribute("data-selectable", "false"), this.selected.has(s3) && (t2.classList.add("selected", "row-focus"), t2.setAttribute("aria-selected", "true")));
    }), this.config.checkbox && this.#i(s2)), ("cell" === i3 || "range" === i3) && r2) {
      s2.querySelectorAll(".cell[data-row][data-col]").forEach((e2) => {
        const t2 = parseInt(e2.getAttribute("data-row") ?? "-1", 10), s3 = parseInt(e2.getAttribute("data-col") ?? "-1", 10);
        t2 >= 0 && s3 >= 0 && (this.isCellSelectable(t2, s3) || e2.setAttribute("data-selectable", "false"));
      });
    }
    if ("range" === i3 && this.ranges.length > 0) {
      t(s2);
      const e2 = this.ranges.map(w), i4 = (t2, s3) => {
        for (const i5 of e2) if (t2 >= i5.startRow && t2 <= i5.endRow && s3 >= i5.startCol && s3 <= i5.endCol) return true;
        return false;
      };
      s2.querySelectorAll(".cell[data-row][data-col]").forEach((e3) => {
        const t2 = parseInt(e3.getAttribute("data-row") ?? "-1", 10), s3 = parseInt(e3.getAttribute("data-col") ?? "-1", 10);
        if (t2 >= 0 && s3 >= 0) {
          const r3 = this.visibleColumns[s3];
          if (r3 && g(r3)) return;
          i4(t2, s3) && (e3.classList.add("selected"), e3.setAttribute("aria-selected", "true"), i4(t2 - 1, s3) || e3.classList.add("top"), i4(t2 + 1, s3) || e3.classList.add("bottom"), i4(t2, s3 - 1) || e3.classList.add("first"), i4(t2, s3 + 1) || e3.classList.add("last"));
        }
      });
    }
  }
  afterRender() {
    if (!this.isSelectionEnabled()) return;
    const e2 = this.gridElement;
    if (!e2) return;
    const t2 = e2.querySelector(".tbw-grid-root"), { mode: s2 } = this.config;
    if (this.pendingRowKeyUpdate && "row" === s2) {
      const { shiftKey: e3 } = this.pendingRowKeyUpdate;
      this.pendingRowKeyUpdate = null;
      const t3 = this.grid._focusRow;
      if (e3 && null !== this.anchor) {
        this.selected.clear();
        const e4 = Math.min(this.anchor, t3), s3 = Math.max(this.anchor, t3);
        for (let t4 = e4; t4 <= s3; t4++) this.isRowSelectable(t4) && this.selected.add(t4);
      } else this.isRowSelectable(t3) ? (this.selected.clear(), this.selected.add(t3), this.anchor = t3) : this.selected.clear();
      this.lastSelected = t3, this.emit("selection-change", this.#t());
    }
    if (this.pendingKeyboardUpdate && "range" === s2) {
      const { shiftKey: e3 } = this.pendingKeyboardUpdate;
      this.pendingKeyboardUpdate = null;
      const t3 = this.grid._focusRow, s3 = this.grid._focusCol;
      if (e3 && this.cellAnchor) {
        const e4 = R(this.cellAnchor, { row: t3, col: s3 });
        this.ranges = [e4], this.activeRange = e4;
      } else e3 || (this.ranges = [], this.activeRange = null, this.cellAnchor = { row: t3, col: s3 });
      this.emit("selection-change", this.#t());
    }
    this.#r(s2), this.gridElement.setAttribute("data-selection-mode", s2), t2 && t2.classList.toggle("selecting", this.isDragging), this.#o();
  }
  onScrollRender() {
    this.isSelectionEnabled() && this.#o();
  }
  getSelection() {
    return { mode: this.config.mode, ranges: this.#t().ranges, anchor: this.cellAnchor };
  }
  getSelectedCells() {
    return (function(e2) {
      const t2 = /* @__PURE__ */ new Map();
      for (const s2 of e2) for (const e3 of p(s2)) t2.set(`${e3.row},${e3.col}`, e3);
      return [...t2.values()];
    })(this.ranges);
  }
  isCellSelected(e2, t2) {
    return m(e2, t2, this.ranges);
  }
  selectAll() {
    const { mode: e2, multiSelect: t2 } = this.config;
    if (false !== t2) {
      if ("row" === e2) {
        this.selected.clear();
        for (let e3 = 0; e3 < this.rows.length; e3++) this.isRowSelectable(e3) && this.selected.add(e3);
        this.explicitSelection = true, this.emit("selection-change", this.#t()), this.requestAfterRender();
      } else if ("range" === e2) {
        const e3 = this.rows.length, t3 = this.columns.length;
        if (e3 > 0 && t3 > 0) {
          const s2 = { startRow: 0, startCol: 0, endRow: e3 - 1, endCol: t3 - 1 };
          this.ranges = [s2], this.activeRange = s2, this.emit("selection-change", this.#t()), this.requestAfterRender();
        }
      }
    }
  }
  selectRows(e2) {
    if ("row" !== this.config.mode) return;
    const t2 = false === this.config.multiSelect && e2.length > 1 ? [e2[e2.length - 1]] : e2;
    this.selected.clear();
    for (const s2 of t2) s2 >= 0 && s2 < this.rows.length && this.isRowSelectable(s2) && this.selected.add(s2);
    this.anchor = t2.length > 0 ? t2[t2.length - 1] : null, this.explicitSelection = true, this.emit("selection-change", this.#t()), this.requestAfterRender();
  }
  getSelectedRowIndices() {
    return [...this.selected].sort((e2, t2) => e2 - t2);
  }
  getSelectedRows() {
    const { mode: e2 } = this.config, t2 = this.rows;
    if ("row" === e2) return this.getSelectedRowIndices().filter((e3) => e3 >= 0 && e3 < t2.length).map((e3) => t2[e3]);
    if ("cell" === e2 && this.selectedCell) {
      const { row: e3 } = this.selectedCell;
      return e3 >= 0 && e3 < t2.length ? [t2[e3]] : [];
    }
    if ("range" === e2 && this.ranges.length > 0) {
      const e3 = /* @__PURE__ */ new Set();
      for (const s2 of this.ranges) {
        const i3 = Math.max(0, Math.min(s2.startRow, s2.endRow)), r2 = Math.min(t2.length - 1, Math.max(s2.startRow, s2.endRow));
        for (let t3 = i3; t3 <= r2; t3++) e3.add(t3);
      }
      return [...e3].sort((e4, t3) => e4 - t3).map((e4) => t2[e4]);
    }
    return [];
  }
  clearSelection() {
    this.selectedCell = null, this.selected.clear(), this.anchor = null, this.ranges = [], this.activeRange = null, this.cellAnchor = null, this.emit("selection-change", { mode: this.config.mode, ranges: [] }), this.requestAfterRender();
  }
  setRanges(e2) {
    this.ranges = e2.map((e3) => ({ startRow: e3.from.row, startCol: e3.from.col, endRow: e3.to.row, endCol: e3.to.col })), this.activeRange = this.ranges.length > 0 ? this.ranges[this.ranges.length - 1] : null, this.emit("selection-change", { mode: this.config.mode, ranges: b(this.ranges) }), this.requestAfterRender();
  }
  #t() {
    return (function(e2, t2, s2) {
      if ("cell" === e2 && t2.selectedCell) return { mode: e2, ranges: [{ from: { row: t2.selectedCell.row, col: t2.selectedCell.col }, to: { row: t2.selectedCell.row, col: t2.selectedCell.col } }] };
      if ("row" === e2 && t2.selected.size > 0) {
        const i3 = [...t2.selected].sort((e3, t3) => e3 - t3), r2 = [];
        let o2 = i3[0], n2 = o2;
        for (let e3 = 1; e3 < i3.length; e3++) i3[e3] === n2 + 1 ? n2 = i3[e3] : (r2.push({ from: { row: o2, col: 0 }, to: { row: n2, col: s2 - 1 } }), o2 = i3[e3], n2 = o2);
        return r2.push({ from: { row: o2, col: 0 }, to: { row: n2, col: s2 - 1 } }), { mode: e2, ranges: r2 };
      }
      return "range" === e2 && t2.ranges.length > 0 ? { mode: e2, ranges: b(t2.ranges) } : { mode: e2, ranges: [] };
    })(this.config.mode, { selectedCell: this.selectedCell, selected: this.selected, ranges: this.ranges }, this.columns.length);
  }
};

// node_modules/@toolbox-web/grid/lib/features/selection.js
i("selection", (e2) => new y("cell" === e2 || "row" === e2 || "range" === e2 ? { mode: e2 } : e2 ?? void 0));

// node_modules/@toolbox-web/grid-angular/fesm2022/toolbox-web-grid-angular-features-selection.mjs
function injectGridSelection() {
  const elementRef = inject(ElementRef);
  const destroyRef = inject(DestroyRef);
  const isReady = signal(false, ...ngDevMode ? [{ debugName: "isReady" }] : (
    /* istanbul ignore next */
    []
  ));
  const selectionSignal = signal(null, ...ngDevMode ? [{ debugName: "selectionSignal" }] : (
    /* istanbul ignore next */
    []
  ));
  const selectedRowIndicesSignal = signal([], ...ngDevMode ? [{ debugName: "selectedRowIndicesSignal" }] : (
    /* istanbul ignore next */
    []
  ));
  const selectedRowsSignal = signal([], ...ngDevMode ? [{ debugName: "selectedRowsSignal" }] : (
    /* istanbul ignore next */
    []
  ));
  let cachedGrid = null;
  let readyPromiseStarted = false;
  let listenerAttached = false;
  const onSelectionChange = (detail) => {
    const plugin = getPlugin();
    if (plugin) {
      selectionSignal.set(plugin.getSelection());
      selectedRowIndicesSignal.set(detail.mode === "row" ? plugin.getSelectedRowIndices() : []);
      selectedRowsSignal.set(plugin.getSelectedRows());
    }
  };
  const attachListener = (grid) => {
    if (listenerAttached)
      return;
    listenerAttached = true;
    const unsub = grid.on("selection-change", onSelectionChange);
    destroyRef.onDestroy(() => {
      unsub();
    });
  };
  const getGrid = () => {
    if (cachedGrid)
      return cachedGrid;
    const grid = elementRef.nativeElement.querySelector("tbw-grid");
    if (grid) {
      cachedGrid = grid;
      attachListener(grid);
      if (!readyPromiseStarted) {
        readyPromiseStarted = true;
        grid.ready?.().then(() => isReady.set(true));
      }
    }
    return grid;
  };
  const getPlugin = () => {
    return getGrid()?.getPluginByName("selection");
  };
  const syncSignals = () => {
    const plugin = getPlugin();
    if (plugin) {
      selectionSignal.set(plugin.getSelection());
      const mode = plugin.config?.mode;
      selectedRowIndicesSignal.set(mode === "row" ? plugin.getSelectedRowIndices() : []);
      selectedRowsSignal.set(plugin.getSelectedRows());
    }
  };
  afterNextRender(() => {
    const grid = getGrid();
    if (grid) {
      grid.ready?.().then(syncSignals);
      return;
    }
    const host = elementRef.nativeElement;
    const observer = new MutationObserver(() => {
      const discovered = getGrid();
      if (discovered) {
        observer.disconnect();
        discovered.ready?.().then(syncSignals);
      }
    });
    observer.observe(host, { childList: true, subtree: true });
    destroyRef.onDestroy(() => observer.disconnect());
  });
  return {
    isReady: isReady.asReadonly(),
    selection: selectionSignal.asReadonly(),
    selectedRowIndices: selectedRowIndicesSignal.asReadonly(),
    selectedRows: selectedRowsSignal.asReadonly(),
    selectAll: () => {
      const plugin = getPlugin();
      if (!plugin) {
        console.warn(`[tbw-grid:selection] SelectionPlugin not found.

  → Enable selection on the grid:
    <tbw-grid [selection]="'range'" />`);
        return;
      }
      const grid = getGrid();
      const mode = plugin.config?.mode;
      if (mode === "row") {
        const rowCount = grid?.rows?.length ?? 0;
        const allIndices = /* @__PURE__ */ new Set();
        for (let i3 = 0; i3 < rowCount; i3++)
          allIndices.add(i3);
        plugin.selected = allIndices;
        plugin.requestAfterRender?.();
      } else if (mode === "range") {
        const rowCount = grid?.rows?.length ?? 0;
        const colCount = grid?._columns?.length ?? 0;
        if (rowCount > 0 && colCount > 0) {
          plugin.setRanges([{ from: { row: 0, col: 0 }, to: { row: rowCount - 1, col: colCount - 1 } }]);
        }
      }
    },
    clearSelection: () => {
      getPlugin()?.clearSelection();
    },
    getSelection: () => {
      return getPlugin()?.getSelection() ?? null;
    },
    isCellSelected: (row, col) => {
      return getPlugin()?.isCellSelected(row, col) ?? false;
    },
    setRanges: (ranges) => {
      getPlugin()?.setRanges(ranges);
    }
  };
}
export {
  injectGridSelection
};
//# sourceMappingURL=@toolbox-web_grid-angular_features_selection.js.map
