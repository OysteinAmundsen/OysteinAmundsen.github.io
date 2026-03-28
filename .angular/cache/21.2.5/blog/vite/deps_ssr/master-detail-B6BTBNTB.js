import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  __spreadProps,
  __spreadValues
} from "./chunk-6DU2HRTW.js";

// node_modules/@toolbox-web/grid/lib/plugins/master-detail/index.js
var e = /{{\s*([^}]+)\s*}}/g;
var t = "__DG_EMPTY__";
var i = /^[\w$. '?+\-*/%:()!<>=,&|]+$/;
var n = /__(proto|defineGetter|defineSetter)|constructor|window|globalThis|global|process|Function|import|eval|Reflect|Proxy|Error|arguments|document|location|cookie|localStorage|sessionStorage|indexedDB|fetch|XMLHttpRequest|WebSocket|Worker|SharedWorker|ServiceWorker|opener|parent|top|frames|self|this\b/;
var r = /* @__PURE__ */ new Set(["script", "iframe", "object", "embed", "form", "input", "button", "textarea", "select", "link", "meta", "base", "style", "template", "slot", "portal", "frame", "frameset", "applet", "noscript", "noembed", "plaintext", "xmp", "listing"]);
var s = /^on\w+$/i;
var o = /* @__PURE__ */ new Set(["href", "src", "action", "formaction", "data", "srcdoc", "xlink:href", "poster", "srcset"]);
var a = /^\s*(javascript|vbscript|data|blob):/i;
function l(e2) {
  if (!e2 || "string" != typeof e2) return "";
  if (-1 === e2.indexOf("<")) return e2;
  const t2 = document.createElement("template");
  return t2.innerHTML = e2, (function(e3) {
    const t3 = [], i2 = e3.querySelectorAll("*");
    for (const n2 of i2) {
      const e4 = n2.tagName.toLowerCase();
      if (r.has(e4)) {
        t3.push(n2);
        continue;
      }
      if ("svg" === e4 || "http://www.w3.org/2000/svg" === n2.namespaceURI) {
        if (Array.from(n2.attributes).some((e5) => s.test(e5.name) || "href" === e5.name || "xlink:href" === e5.name)) {
          t3.push(n2);
          continue;
        }
      }
      const i3 = [];
      for (const t4 of n2.attributes) {
        const e5 = t4.name.toLowerCase();
        s.test(e5) ? i3.push(t4.name) : (o.has(e5) && a.test(t4.value) || "style" === e5 && /expression\s*\(|javascript:|behavior\s*:/i.test(t4.value)) && i3.push(t4.name);
      }
      i3.forEach((e5) => n2.removeAttribute(e5));
    }
    t3.forEach((e4) => e4.remove());
  })(t2.content), t2.innerHTML;
}
function d(r2, s2) {
  if (!r2 || -1 === r2.indexOf("{{")) return r2;
  const o2 = [], a2 = r2.replace(e, (e2, r3) => {
    const a3 = (function(e3, r4) {
      if (e3 = (e3 || "").trim(), !e3) return t;
      if (c.test(e3)) return t;
      if ("value" === e3) return null == r4.value ? t : String(r4.value);
      if (e3.startsWith("row.") && !/[()?]/.test(e3) && !e3.includes(":")) {
        const i2 = e3.slice(4), n2 = r4.row ? r4.row[i2] : void 0;
        return null == n2 ? t : String(n2);
      }
      if (e3.length > 80) return t;
      if (!i.test(e3) || n.test(e3)) return t;
      const s3 = e3.match(/\./g);
      if (s3 && s3.length > 1) return t;
      try {
        const i2 = new Function("value", "row", `return (${e3});`)(r4.value, r4.row), n2 = null == i2 ? "" : String(i2);
        return c.test(n2) ? t : n2 || t;
      } catch {
        return t;
      }
    })(r3, s2);
    return o2.push({ expr: r3.trim(), result: a3 }), a3;
  }), l2 = (d2 = a2) ? d2.replace(new RegExp(t, "g"), "").replace(/Reflect\.[^<>{}\s]+|\bProxy\b|ownKeys\([^)]*\)/g, "") : d2;
  var d2;
  const h2 = o2.length && o2.every((e2) => "" === e2.result || e2.result === t);
  return c.test(r2) || h2 ? "" : l2;
}
var c = /Reflect|Proxy|ownKeys/;
function h(e2, t2) {
  return `[tbw-grid${e2 ? `#${e2}` : ""}${t2 ? `:${t2}` : ""}]`;
}
function u(e2, t2, i2, n2) {
  return `${h(i2, n2)} ${e2}: ${t2}

  → More info: ${(function(e3) {
    return `https://toolboxjs.com/grid/errors#${e3.toLowerCase()}`;
  })(e2)}`;
}
var g = '<svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>';
var f = { expand: "▶", collapse: "▼", sortAsc: "▲", sortDesc: "▼", sortNone: "⇅", submenuArrow: "▶", dragHandle: "⋮⋮", toolPanel: "☰", filter: g, filterActive: g, print: "🖨️" };
var m = class {
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
    const i2 = new CustomEvent(e2, { detail: t2, bubbles: true, cancelable: true });
    return this.grid?.dispatchEvent?.(i2), i2.defaultPrevented;
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
    return __spreadValues(__spreadValues({}, f), e2);
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
      const t2 = getComputedStyle(e2).getPropertyValue("--tbw-animation-duration").trim(), i2 = parseInt(t2, 10);
      if (!isNaN(i2)) return i2;
    }
    return 200;
  }
  resolveIcon(e2, t2) {
    return void 0 !== t2 ? t2 : this.gridIcons[e2];
  }
  setIcon(e2, t2) {
    "string" == typeof t2 ? e2.innerHTML = l(t2) : t2 instanceof HTMLElement && (e2.innerHTML = "", e2.appendChild(t2.cloneNode(true)));
  }
  warn(e2, t2) {
    void 0 !== t2 ? console.warn(u(e2, t2, this.gridElement.id, this.name)) : console.warn(`${h(this.gridElement.id, this.name)} ${e2}`);
  }
  throwDiagnostic(e2, t2) {
    throw new Error(u(e2, t2, this.gridElement.id, this.name));
  }
};
var p = "__tbw_expander";
function w(e2) {
  return e2.field === p;
}
function b(e2, t2) {
  const i2 = new Set(e2);
  return i2.has(t2) ? i2.delete(t2) : i2.add(t2), i2;
}
function x(e2, t2, i2, n2) {
  const r2 = document.createElement("div");
  r2.className = "master-detail-row", r2.setAttribute("data-detail-for", String(t2)), r2.setAttribute("role", "row");
  const s2 = document.createElement("div");
  s2.className = "master-detail-cell", s2.setAttribute("role", "cell"), s2.style.gridColumn = `1 / ${n2 + 1}`;
  const o2 = i2(e2, t2);
  return "string" == typeof o2 ? s2.innerHTML = o2 : o2 instanceof HTMLElement && s2.appendChild(o2), r2.appendChild(s2), r2;
}
var R = class _R extends m {
  name = "masterDetail";
  styles = "@layer tbw-plugins{tbw-grid .cell[data-field=__tbw_expander]{border-right:none!important;padding:0;display:flex;align-items:center;justify-content:center}tbw-grid .header-row .cell[data-field=__tbw_expander]{display:none}tbw-grid .master-detail-expander{display:flex;align-items:center;justify-content:center;width:100%;height:100%}tbw-grid .master-detail-toggle{cursor:pointer;opacity:.7;-webkit-user-select:none;user-select:none;display:inline-flex;align-items:center;justify-content:center}tbw-grid .master-detail-toggle:hover{opacity:1}tbw-grid .master-detail-row{grid-column:1 / -1;display:grid;background:var(--tbw-master-detail-bg, var(--tbw-color-row-alt));border-bottom:1px solid var(--tbw-master-detail-border, var(--tbw-color-border));overflow:hidden}tbw-grid .master-detail-cell{padding:var(--tbw-detail-padding, var(--tbw-spacing-xl, 1rem));overflow:auto}tbw-grid .master-detail-row.tbw-expanding{animation:tbw-detail-expand var(--tbw-animation-duration, .2s) var(--tbw-animation-easing, ease-out) forwards}tbw-grid .master-detail-row.tbw-collapsing{animation:tbw-detail-collapse var(--tbw-animation-duration, .2s) var(--tbw-animation-easing, ease-out) forwards}@keyframes tbw-detail-expand{0%{opacity:0;max-height:0;padding-top:0;padding-bottom:0}to{opacity:1;max-height:var(--tbw-detail-max-height, 31.25rem);padding-top:var(--tbw-detail-padding, var(--tbw-spacing-xl, 1rem));padding-bottom:var(--tbw-detail-padding, var(--tbw-spacing-xl, 1rem))}}@keyframes tbw-detail-collapse{0%{opacity:1;max-height:var(--tbw-detail-max-height, 31.25rem)}to{opacity:0;max-height:0}}}";
  get #t() {
    return this.grid;
  }
  get defaultConfig() {
    return { detailHeight: "auto", expandOnRowClick: false, collapseOnClickOutside: false, animation: "slide" };
  }
  attach(e2) {
    super.attach(e2), this.parseLightDomDetail();
  }
  parseLightDomDetail() {
    const e2 = this.gridElement;
    if (!e2) return;
    const t2 = e2.querySelector("tbw-grid-detail");
    if (!t2) return;
    const i2 = this.#t.__frameworkAdapter;
    if (i2?.parseDetailElement) {
      const e3 = i2.parseDetailElement(t2);
      if (e3) return void (this.config = __spreadProps(__spreadValues({}, this.config), { detailRenderer: e3 }));
    }
    const n2 = t2.getAttribute("animation"), r2 = t2.getAttribute("show-expand-column"), s2 = t2.getAttribute("expand-on-row-click"), o2 = t2.getAttribute("collapse-on-click-outside"), a2 = t2.getAttribute("height"), c2 = {};
    null !== n2 && (c2.animation = "false" !== n2 && n2), null !== r2 && (c2.showExpandColumn = "false" !== r2), null !== s2 && (c2.expandOnRowClick = "true" === s2), null !== o2 && (c2.collapseOnClickOutside = "true" === o2), null !== a2 && (c2.detailHeight = "auto" === a2 ? "auto" : parseInt(a2, 10));
    const h2 = t2.innerHTML.trim();
    h2 && !this.config.detailRenderer && (c2.detailRenderer = (e3, t3) => l(d(h2, { value: e3, row: e3 }))), Object.keys(c2).length > 0 && (this.config = __spreadValues(__spreadValues({}, this.config), c2));
  }
  get animationStyle() {
    return !!this.isAnimationEnabled && (this.config.animation ?? "slide");
  }
  animateExpand(e2, t2, i2) {
    if (!this.isAnimationEnabled || false === this.animationStyle) return false;
    e2.classList.add("tbw-expanding");
    let n2 = false;
    const r2 = () => {
      n2 || (n2 = true, e2.classList.remove("tbw-expanding"), void 0 !== t2 && void 0 !== i2 && this.#i(e2, t2, i2));
    };
    return e2.addEventListener("animationend", r2, { once: true }), setTimeout(r2, this.animationDuration + 50), true;
  }
  animateCollapse(e2, t2) {
    if (!this.isAnimationEnabled || false === this.animationStyle) return void t2();
    e2.classList.add("tbw-collapsing");
    const i2 = () => {
      e2.classList.remove("tbw-collapsing"), t2();
    };
    e2.addEventListener("animationend", i2, { once: true }), setTimeout(i2, this.animationDuration + 50);
  }
  #i(e2, t2, i2) {
    if (!e2.isConnected) return;
    const n2 = e2.offsetHeight;
    if (n2 > 0) {
      const e3 = this.measuredDetailHeights.get(t2);
      this.measuredDetailHeights.set(t2, n2), e3 !== n2 && this.grid.invalidateRowHeight(i2);
    }
  }
  expandedRows = /* @__PURE__ */ new Set();
  detailElements = /* @__PURE__ */ new Map();
  measuredDetailHeights = /* @__PURE__ */ new Map();
  rowsToAnimate = /* @__PURE__ */ new Set();
  static DEFAULT_DETAIL_HEIGHT = 150;
  getDetailHeight(e2) {
    const t2 = this.detailElements.get(e2);
    if (t2) {
      if (!(t2.classList.contains("tbw-expanding") || t2.classList.contains("tbw-collapsing"))) {
        const i3 = t2.offsetHeight;
        if (i3 > 0) return this.measuredDetailHeights.set(e2, i3), i3;
      }
    }
    const i2 = this.measuredDetailHeights.get(e2);
    return i2 && i2 > 0 ? i2 : "number" == typeof this.config?.detailHeight ? this.config.detailHeight : _R.DEFAULT_DETAIL_HEIGHT;
  }
  toggleAndEmit(e2, t2) {
    if (e2?.__isGroupRow) return;
    this.expandedRows = b(this.expandedRows, e2);
    const i2 = this.expandedRows.has(e2);
    i2 && this.rowsToAnimate.add(e2), this.emit("detail-expand", { rowIndex: t2, row: e2, expanded: i2 }), this.requestRender();
  }
  detach() {
    this.expandedRows.clear(), this.detailElements.clear(), this.measuredDetailHeights.clear(), this.rowsToAnimate.clear();
  }
  processColumns(e2) {
    if (!(true === this.config.showExpandColumn || false !== this.config.showExpandColumn && !!this.config.detailRenderer)) return [...e2];
    const t2 = [...e2], i2 = (function(e3) {
      return e3.find(w);
    })(t2);
    if (i2) return t2;
    const n2 = (r2 = this.name, { field: p, header: "", width: 32, resizable: false, sortable: false, filterable: false, meta: { lockPosition: true, suppressMovable: true, expanderColumn: true, expanderPlugin: r2, utility: true } });
    var r2;
    return n2.viewRenderer = (e3) => {
      const { row: t3 } = e3, i3 = this.expandedRows.has(t3), n3 = document.createElement("span");
      n3.className = "master-detail-expander expander-cell";
      const r3 = document.createElement("span");
      return r3.className = "master-detail-toggle" + (i3 ? " expanded" : ""), this.setIcon(r3, this.resolveIcon(i3 ? "collapse" : "expand")), r3.setAttribute("role", "button"), r3.setAttribute("tabindex", "0"), r3.setAttribute("aria-expanded", String(i3)), r3.setAttribute("aria-label", i3 ? "Collapse details" : "Expand details"), n3.appendChild(r3), n3;
    }, [n2, ...t2];
  }
  onRowClick(e2) {
    if (this.config.expandOnRowClick && this.config.detailRenderer) return this.toggleAndEmit(e2.row, e2.rowIndex), false;
  }
  onCellClick(e2) {
    const t2 = e2.originalEvent?.target;
    if (t2?.classList.contains("master-detail-toggle")) return this.toggleAndEmit(e2.row, e2.rowIndex), true;
    this.expandedRows.size > 0 && queueMicrotask(() => this.#n());
  }
  onKeyDown(e2) {
    if (" " !== e2.key) return;
    const t2 = this.grid._focusCol, i2 = this.grid._focusRow, n2 = this.visibleColumns[t2];
    if (!n2 || !w(n2)) return;
    const r2 = this.rows[i2];
    return r2 ? (e2.preventDefault(), this.toggleAndEmit(r2, i2), this.requestRenderWithFocus(), true) : void 0;
  }
  afterRender() {
    this.#r(), this.#n();
  }
  #r() {
    const e2 = this.gridElement?.querySelector('.header-row .cell[data-field="__tbw_expander"]');
    if (!e2) return;
    const t2 = parseInt(e2.getAttribute("data-col") || "0", 10), i2 = e2.nextElementSibling;
    i2 && (i2.style.gridColumn = `${t2 + 1} / ${t2 + 3}`);
  }
  onScrollRender() {
    this.config.detailRenderer && 0 !== this.expandedRows.size && this.#n();
  }
  #n() {
    if (!this.config.detailRenderer) return;
    const e2 = this.gridElement?.querySelector(".rows");
    if (!e2) return;
    const t2 = this.grid, i2 = t2._rowPool, n2 = t2._virtualization?.start ?? 0, r2 = t2._virtualization?.end ?? 0, s2 = this.columns.length, o2 = n2, a2 = r2, l2 = /* @__PURE__ */ new Map();
    if (i2) {
      const t3 = Math.min(i2.length, a2 - o2);
      for (let n3 = 0; n3 < t3; n3++) {
        const t4 = i2[n3];
        t4.parentNode === e2 && l2.set(o2 + n3, t4);
      }
    } else {
      const t3 = e2.querySelectorAll(".data-grid-row");
      for (const e3 of t3) {
        const t4 = e3.querySelector(".cell[data-row]"), i3 = t4 ? parseInt(t4.getAttribute("data-row") ?? "-1", 10) : -1;
        i3 >= 0 && l2.set(i3, e3);
      }
    }
    for (const [d2, c2] of this.detailElements) {
      const e3 = this.rows.indexOf(d2), t3 = this.expandedRows.has(d2), i3 = e3 >= 0 && l2.has(e3);
      if (!t3 || !i3) {
        const e4 = this.#t.__frameworkAdapter;
        if (e4?.unmount) {
          const t4 = c2.querySelector(".master-detail-cell"), i4 = t4?.firstElementChild;
          i4 && e4.unmount(i4);
        }
        c2.parentNode && c2.remove(), this.detailElements.delete(d2);
      }
    }
    for (const [d2, c2] of l2) {
      const e3 = this.rows[d2];
      if (!e3 || !this.expandedRows.has(e3)) continue;
      const t3 = this.detailElements.get(e3);
      if (t3) {
        t3.previousElementSibling !== c2 && c2.after(t3);
        continue;
      }
      const i3 = x(e3, d2, this.config.detailRenderer, s2);
      "number" == typeof this.config.detailHeight && (i3.style.height = `${this.config.detailHeight}px`), c2.after(i3), this.detailElements.set(e3, i3);
      const n3 = this.rowsToAnimate.has(e3);
      n3 && this.rowsToAnimate.delete(e3);
      n3 && this.animateExpand(i3, e3, d2) || requestAnimationFrame(() => {
        this.#i(i3, e3, d2);
      });
    }
  }
  getExtraHeight() {
    let e2 = 0;
    for (const t2 of this.expandedRows) e2 += this.getDetailHeight(t2);
    return e2;
  }
  getExtraHeightBefore(e2) {
    let t2 = 0;
    for (const i2 of this.expandedRows) {
      const n2 = this.rows.indexOf(i2);
      n2 >= 0 && n2 < e2 && (t2 += this.getDetailHeight(i2));
    }
    return t2;
  }
  getRowHeight(e2, t2) {
    if (!this.expandedRows.has(e2)) return;
    return (this.grid.defaultRowHeight ?? 28) + this.getDetailHeight(e2);
  }
  adjustVirtualStart(e2, t2, i2) {
    if (0 === this.expandedRows.size) return e2;
    const n2 = this.grid?._virtualization?.positionCache;
    let r2 = e2;
    if (n2 && n2.length > 0) for (const s2 of this.expandedRows) {
      const i3 = this.rows.indexOf(s2);
      if (i3 < 0 || i3 >= e2) continue;
      n2[i3].offset + n2[i3].height > t2 && i3 < r2 && (r2 = i3);
    }
    else {
      const n3 = [];
      for (const e3 of this.expandedRows) {
        const t3 = this.rows.indexOf(e3);
        t3 >= 0 && n3.push({ index: t3, row: e3 });
      }
      n3.sort((e3, t3) => e3.index - t3.index);
      let s2 = 0;
      for (const { index: o2, row: a2 } of n3) {
        const n4 = o2 * i2 + s2, l2 = this.getDetailHeight(a2);
        s2 += l2, o2 >= e2 || n4 + i2 + l2 > t2 && o2 < r2 && (r2 = o2);
      }
    }
    return r2;
  }
  expand(e2) {
    const t2 = this.rows[e2];
    t2 && !t2.__isGroupRow && (this.rowsToAnimate.add(t2), this.expandedRows = (function(e3, t3) {
      const i2 = new Set(e3);
      return i2.add(t3), i2;
    })(this.expandedRows, t2), this.requestRender());
  }
  collapse(e2) {
    const t2 = this.rows[e2];
    t2 && (this.expandedRows = (function(e3, t3) {
      const i2 = new Set(e3);
      return i2.delete(t3), i2;
    })(this.expandedRows, t2), this.requestRender());
  }
  toggle(e2) {
    const t2 = this.rows[e2];
    t2 && !t2.__isGroupRow && (this.expandedRows = b(this.expandedRows, t2), this.expandedRows.has(t2) && this.rowsToAnimate.add(t2), this.requestRender());
  }
  isExpanded(e2) {
    const t2 = this.rows[e2];
    return !!t2 && (function(e3, t3) {
      return e3.has(t3);
    })(this.expandedRows, t2);
  }
  expandAll() {
    for (const e2 of this.rows) e2?.__isGroupRow || (this.rowsToAnimate.add(e2), this.expandedRows.add(e2));
    this.requestRender();
  }
  collapseAll() {
    this.expandedRows.clear(), this.requestRender();
  }
  getExpandedRows() {
    const e2 = [];
    for (const t2 of this.expandedRows) {
      const i2 = this.rows.indexOf(t2);
      i2 >= 0 && e2.push(i2);
    }
    return e2;
  }
  getDetailElement(e2) {
    const t2 = this.rows[e2];
    return t2 ? this.detailElements.get(t2) : void 0;
  }
  refreshDetailRenderer() {
    const e2 = this.config.detailRenderer;
    if (this.config = __spreadProps(__spreadValues({}, this.config), { detailRenderer: void 0 }), this.parseLightDomDetail(), !this.config.detailRenderer && e2 && (this.config = __spreadProps(__spreadValues({}, this.config), { detailRenderer: e2 })), this.config.detailRenderer) {
      const e3 = this.#t;
      "function" == typeof e3.refreshColumns ? e3.refreshColumns() : this.requestRender();
    }
  }
};
export {
  R as MasterDetailPlugin
};
//# sourceMappingURL=master-detail-B6BTBNTB.js.map
