import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  i
} from "./chunk-TZYRBE7Q.js";
import {
  __spreadValues
} from "./chunk-6DU2HRTW.js";

// node_modules/@toolbox-web/grid/lib/plugins/pinned-rows/index.js
function t(t2, e2) {
  return `[tbw-grid${t2 ? `#${t2}` : ""}${e2 ? `:${e2}` : ""}]`;
}
function e(e2, n2, i3, o2) {
  return `${t(i3, o2)} ${e2}: ${n2}

  → More info: ${(function(t2) {
    return `https://toolboxjs.com/grid/errors#${t2.toLowerCase()}`;
  })(e2)}`;
}
var n = /* @__PURE__ */ new Set(["script", "iframe", "object", "embed", "form", "input", "button", "textarea", "select", "link", "meta", "base", "style", "template", "slot", "portal", "frame", "frameset", "applet", "noscript", "noembed", "plaintext", "xmp", "listing"]);
var i2 = /^on\w+$/i;
var o = /* @__PURE__ */ new Set(["href", "src", "action", "formaction", "data", "srcdoc", "xlink:href", "poster", "srcset"]);
var r = /^\s*(javascript|vbscript|data|blob):/i;
function s(t2) {
  if (!t2 || "string" != typeof t2) return "";
  if (-1 === t2.indexOf("<")) return t2;
  const e2 = document.createElement("template");
  return e2.innerHTML = t2, (function(t3) {
    const e3 = [], s2 = t3.querySelectorAll("*");
    for (const a2 of s2) {
      const t4 = a2.tagName.toLowerCase();
      if (n.has(t4)) {
        e3.push(a2);
        continue;
      }
      if ("svg" === t4 || "http://www.w3.org/2000/svg" === a2.namespaceURI) {
        if (Array.from(a2.attributes).some((t5) => i2.test(t5.name) || "href" === t5.name || "xlink:href" === t5.name)) {
          e3.push(a2);
          continue;
        }
      }
      const s3 = [];
      for (const e4 of a2.attributes) {
        const t5 = e4.name.toLowerCase();
        i2.test(t5) ? s3.push(e4.name) : (o.has(t5) && r.test(e4.value) || "style" === t5 && /expression\s*\(|javascript:|behavior\s*:/i.test(e4.value)) && s3.push(e4.name);
      }
      s3.forEach((t5) => a2.removeAttribute(t5));
    }
    e3.forEach((t4) => t4.remove());
  })(e2.content), e2.innerHTML;
}
var a = '<svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>';
var l = { expand: "▶", collapse: "▼", sortAsc: "▲", sortDesc: "▼", sortNone: "⇅", submenuArrow: "▶", dragHandle: "⋮⋮", toolPanel: "☰", filter: a, filterActive: a, print: "🖨️" };
var g = class {
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
  #t;
  get defaultConfig() {
    return {};
  }
  constructor(t2 = {}) {
    this.userConfig = t2;
  }
  attach(t2) {
    this.#t?.abort(), this.#t = new AbortController(), this.grid = t2, this.config = __spreadValues(__spreadValues({}, this.defaultConfig), this.userConfig);
  }
  detach() {
    this.#t?.abort(), this.#t = void 0;
  }
  getPlugin(t2) {
    return this.grid?.getPlugin(t2);
  }
  emit(t2, e2) {
    this.grid?.dispatchEvent?.(new CustomEvent(t2, { detail: e2, bubbles: true }));
  }
  emitCancelable(t2, e2) {
    const n2 = new CustomEvent(t2, { detail: e2, bubbles: true, cancelable: true });
    return this.grid?.dispatchEvent?.(n2), n2.defaultPrevented;
  }
  on(t2, e2) {
    this.grid?._pluginManager?.subscribe(this, t2, e2);
  }
  off(t2) {
    this.grid?._pluginManager?.unsubscribe(this, t2);
  }
  emitPluginEvent(t2, e2) {
    this.grid?._pluginManager?.emitPluginEvent(t2, e2);
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
    return this.#t?.signal ?? this.grid?.disconnectSignal;
  }
  get gridIcons() {
    const t2 = this.grid?.gridConfig?.icons ?? {};
    return __spreadValues(__spreadValues({}, l), t2);
  }
  get isAnimationEnabled() {
    const t2 = this.grid?.effectiveConfig?.animation?.mode ?? "reduced-motion";
    if (false === t2 || "off" === t2) return false;
    if (true === t2 || "on" === t2) return true;
    const e2 = this.gridElement;
    if (e2) {
      return "0" !== getComputedStyle(e2).getPropertyValue("--tbw-animation-enabled").trim();
    }
    return true;
  }
  get animationDuration() {
    const t2 = this.gridElement;
    if (t2) {
      const e2 = getComputedStyle(t2).getPropertyValue("--tbw-animation-duration").trim(), n2 = parseInt(e2, 10);
      if (!isNaN(n2)) return n2;
    }
    return 200;
  }
  resolveIcon(t2, e2) {
    return void 0 !== e2 ? e2 : this.gridIcons[t2];
  }
  setIcon(t2, e2) {
    "string" == typeof e2 ? t2.innerHTML = s(e2) : e2 instanceof HTMLElement && (t2.innerHTML = "", t2.appendChild(e2.cloneNode(true)));
  }
  warn(n2, i3) {
    void 0 !== i3 ? console.warn(e(n2, i3, this.gridElement.id, this.name)) : console.warn(`${t(this.gridElement.id, this.name)} ${n2}`);
  }
  throwDiagnostic(t2, n2) {
    throw new Error(e(t2, n2, this.gridElement.id, this.name));
  }
};
var c = { sum: (t2, e2) => t2.reduce((t3, n2) => t3 + (Number(n2[e2]) || 0), 0), avg: (t2, e2) => {
  const n2 = t2.reduce((t3, n3) => t3 + (Number(n3[e2]) || 0), 0);
  return t2.length ? n2 / t2.length : 0;
}, count: (t2) => t2.length, min: (t2, e2) => t2.length ? Math.min(...t2.map((t3) => Number(t3[e2]) || 1 / 0)) : 0, max: (t2, e2) => t2.length ? Math.max(...t2.map((t3) => Number(t3[e2]) || -1 / 0)) : 0, first: (t2, e2) => t2[0]?.[e2], last: (t2, e2) => t2[t2.length - 1]?.[e2] };
var d = /* @__PURE__ */ new Map();
var h = { register(t2, e2) {
  d.set(t2, e2);
}, unregister(t2) {
  d.delete(t2);
}, get(t2) {
  if (void 0 !== t2) return "function" == typeof t2 ? t2 : d.get(t2) ?? c[t2];
}, run(t2, e2, n2, i3) {
  const o2 = this.get(t2);
  return o2 ? o2(e2, n2, i3) : void 0;
}, has: (t2) => d.has(t2) || t2 in c, list: () => [...Object.keys(c), ...d.keys()] };
h.register.bind(h), h.unregister.bind(h);
var u = h.get.bind(h);
function p(t2, e2) {
  const n2 = document.createElement("div");
  n2.className = "tbw-pinned-rows", n2.setAttribute("role", "presentation"), n2.setAttribute("aria-live", "polite");
  const i3 = document.createElement("div");
  i3.className = "tbw-pinned-rows-left";
  const o2 = document.createElement("div");
  o2.className = "tbw-pinned-rows-center";
  const r2 = document.createElement("div");
  if (r2.className = "tbw-pinned-rows-right", false !== t2.showRowCount) {
    const t3 = document.createElement("span");
    t3.className = "tbw-status-panel tbw-status-panel-row-count", t3.textContent = `Total: ${e2.totalRows} rows`, i3.appendChild(t3);
  }
  if (t2.showFilteredCount && e2.filteredRows !== e2.totalRows) {
    const t3 = document.createElement("span");
    t3.className = "tbw-status-panel tbw-status-panel-filtered-count", t3.textContent = `Filtered: ${e2.filteredRows}`, i3.appendChild(t3);
  }
  if (t2.showSelectedCount && e2.selectedRows > 0) {
    const t3 = document.createElement("span");
    t3.className = "tbw-status-panel tbw-status-panel-selected-count", t3.textContent = `Selected: ${e2.selectedRows}`, r2.appendChild(t3);
  }
  if (t2.customPanels) for (const s2 of t2.customPanels) {
    const t3 = v(s2, e2);
    switch (s2.position) {
      case "left":
        i3.appendChild(t3);
        break;
      case "center":
        o2.appendChild(t3);
        break;
      case "right":
        r2.appendChild(t3);
    }
  }
  return n2.appendChild(i3), n2.appendChild(o2), n2.appendChild(r2), n2;
}
function f(t2) {
  const e2 = document.createElement("div");
  return e2.className = `tbw-aggregation-rows tbw-aggregation-rows-${t2}`, e2.setAttribute("role", "presentation"), e2;
}
function m(t2, e2, n2, i3, o2 = false) {
  t2.innerHTML = "";
  for (const r2 of e2) {
    const e3 = document.createElement("div");
    e3.className = "tbw-aggregation-row", e3.setAttribute("role", "presentation"), r2.id && e3.setAttribute("data-aggregation-id", r2.id);
    r2.fullWidth ?? o2 ? b(e3, r2, n2, i3) : w(e3, r2, n2, i3), t2.appendChild(e3);
  }
}
function b(t2, e2, n2, i3) {
  const o2 = document.createElement("div");
  o2.className = "tbw-aggregation-cell tbw-aggregation-cell-full", o2.style.gridColumn = "1 / -1";
  const r2 = "function" == typeof e2.label ? e2.label(i3, n2) : e2.label;
  if (r2) {
    const t3 = document.createElement("span");
    t3.className = "tbw-aggregation-label", t3.textContent = r2, o2.appendChild(t3);
  }
  const s2 = (function(t3, e3, n3) {
    const i4 = t3.aggregators && Object.keys(t3.aggregators).length > 0, o3 = t3.cells && Object.keys(t3.cells).length > 0;
    if (!i4 && !o3) return null;
    const r3 = document.createElement("span");
    r3.className = "tbw-aggregation-aggregates";
    for (const s3 of e3) {
      const { value: e4, formatter: i5 } = C(t3, s3, n3);
      if (null != e4) {
        const t4 = document.createElement("span");
        t4.className = "tbw-aggregation-aggregate", t4.setAttribute("data-field", s3.field);
        const n4 = s3.header ?? s3.field, o4 = i5 ? i5(e4, s3.field, s3) : String(e4);
        t4.textContent = `${n4}: ${o4}`, r3.appendChild(t4);
      }
    }
    return r3.children.length > 0 ? r3 : null;
  })(e2, n2, i3);
  s2 && o2.appendChild(s2), t2.appendChild(o2);
}
function w(t2, e2, n2, i3) {
  for (const r2 of n2) {
    const n3 = document.createElement("div");
    n3.className = "tbw-aggregation-cell", n3.setAttribute("data-field", r2.field);
    const { value: o3, formatter: s2 } = C(e2, r2, i3);
    n3.textContent = null != o3 ? s2 ? s2(o3, r2.field, r2) : String(o3) : "", t2.appendChild(n3);
  }
  const o2 = "function" == typeof e2.label ? e2.label(i3, n2) : e2.label;
  if (o2) {
    const e3 = document.createElement("span");
    e3.className = "tbw-aggregation-label", e3.textContent = o2, t2.appendChild(e3);
  }
}
function C(t2, e2, n2) {
  let i3, o2;
  const r2 = t2.aggregators?.[e2.field];
  if (r2) if ("object" == typeof (s2 = r2) && null !== s2 && "aggFunc" in s2) {
    const t3 = u(r2.aggFunc);
    t3 && (i3 = t3(n2, e2.field, e2)), o2 = r2.formatter;
  } else {
    const t3 = u(r2);
    t3 && (i3 = t3(n2, e2.field, e2));
  }
  else if (t2.cells && Object.prototype.hasOwnProperty.call(t2.cells, e2.field)) {
    const o3 = t2.cells[e2.field];
    i3 = "function" == typeof o3 ? o3(n2, e2.field, e2) : o3;
  }
  var s2;
  return { value: i3, formatter: o2 };
}
function v(t2, e2) {
  const n2 = document.createElement("div");
  n2.className = "tbw-status-panel tbw-status-panel-custom", n2.id = `status-panel-${t2.id}`;
  const i3 = t2.render(e2);
  return "string" == typeof i3 ? n2.innerHTML = i3 : n2.appendChild(i3), n2;
}
function E(t2, e2, n2, i3, o2) {
  return { totalRows: t2.length, filteredRows: o2?.cachedResult?.length ?? t2.length, selectedRows: i3?.selected?.size ?? 0, columns: e2, rows: t2, grid: n2 };
}
h.run.bind(h), h.list.bind(h);
var R = class extends g {
  name = "pinnedRows";
  styles = "@layer tbw-plugins{.tbw-scroll-area{container-type:inline-size}.tbw-footer{flex-shrink:0;z-index:var(--tbw-z-layer-pinned-rows, 20);background:var(--tbw-color-panel-bg);min-width:fit-content}.tbw-pinned-rows{display:flex;align-items:center;justify-content:space-between;padding:var(--tbw-button-padding, var(--tbw-spacing-md, .5rem) var(--tbw-spacing-lg, .75rem));background:var(--tbw-pinned-rows-bg, var(--tbw-color-panel-bg));border-top:1px solid var(--tbw-pinned-rows-border, var(--tbw-color-border));font-size:var(--tbw-font-size-xs, .75rem);color:var(--tbw-pinned-rows-color, var(--tbw-color-fg-muted));min-height:32px;box-sizing:border-box;position:sticky;left:0;min-width:0;width:100cqi}.tbw-pinned-rows-left,.tbw-pinned-rows-center,.tbw-pinned-rows-right{display:flex;align-items:center;gap:var(--tbw-spacing-xl, 1rem)}.tbw-pinned-rows-left{justify-content:flex-start}.tbw-pinned-rows-center{justify-content:center;flex:1}.tbw-pinned-rows-right{justify-content:flex-end}.tbw-status-panel{white-space:nowrap}.tbw-aggregation-rows{min-width:fit-content;background:var(--tbw-aggregation-bg, var(--tbw-color-header-bg))}.tbw-aggregation-rows-top{border-bottom:1px solid var(--tbw-aggregation-border, var(--tbw-color-border))}.tbw-aggregation-rows-bottom{border-top:1px solid var(--tbw-aggregation-border, var(--tbw-color-border))}.tbw-aggregation-row{display:grid;grid-template-columns:var(--tbw-column-template);font-size:var(--tbw-aggregation-font-size, .8em);font-weight:var(--tbw-aggregation-font-weight, 600);position:relative;background:inherit}.tbw-aggregation-row>.tbw-aggregation-label{position:sticky;left:0;grid-row:1;grid-column:1;display:flex;align-items:center;padding:var(--tbw-cell-padding, .125rem .5rem);background:inherit;z-index:1;pointer-events:none}.tbw-aggregation-row>.tbw-aggregation-cell:first-child{grid-column:1;grid-row:1}.tbw-aggregation-cell:not(:empty){position:relative;z-index:2;background:inherit}.tbw-aggregation-cell{padding:var(--tbw-cell-padding, .125rem .5rem);min-height:var(--tbw-row-height, 1.75rem);display:block;align-items:center;align-content:center;border-right:1px solid var(--tbw-color-border-cell);overflow:hidden;text-overflow:ellipsis;white-space:var(--tbw-cell-white-space, nowrap)}.tbw-aggregation-cell:last-child{border-right:0}.tbw-aggregation-cell-full{grid-column:1 / -1;border-right:0;display:flex;align-items:center;gap:var(--tbw-spacing-lg, .75rem)}.tbw-aggregation-label{white-space:nowrap}.tbw-aggregation-aggregates{display:flex;align-items:center;gap:var(--tbw-spacing-lg, .75rem);font-weight:400;opacity:.85}.tbw-aggregation-aggregate{white-space:nowrap}}";
  get defaultConfig() {
    return { position: "bottom", showRowCount: true, showSelectedCount: true, showFilteredCount: true };
  }
  infoBarElement = null;
  topAggregationContainer = null;
  bottomAggregationContainer = null;
  footerWrapper = null;
  detach() {
    this.infoBarElement && (this.infoBarElement.remove(), this.infoBarElement = null), this.topAggregationContainer && (this.topAggregationContainer.remove(), this.topAggregationContainer = null), this.bottomAggregationContainer && (this.bottomAggregationContainer.remove(), this.bottomAggregationContainer = null), this.footerWrapper && (this.footerWrapper.remove(), this.footerWrapper = null);
  }
  afterRender() {
    const t2 = this.gridElement;
    if (!t2) return;
    const e2 = t2.querySelector(".tbw-scroll-area") ?? t2.querySelector(".tbw-grid-content") ?? t2.querySelector(".tbw-grid-root");
    if (!e2) return;
    this.footerWrapper && !e2.contains(this.footerWrapper) && (this.footerWrapper = null, this.bottomAggregationContainer = null, this.infoBarElement = null), this.topAggregationContainer && !e2.contains(this.topAggregationContainer) && (this.topAggregationContainer = null), this.infoBarElement && !e2.contains(this.infoBarElement) && (this.infoBarElement = null);
    const n2 = this.getSelectionState(), i3 = this.getFilterState(), o2 = E(this.sourceRows, this.columns, this.gridElement, n2, i3), r2 = this.config.aggregationRows || [], s2 = r2.filter((t3) => "top" === t3.position), a2 = r2.filter((t3) => "top" !== t3.position);
    if (s2.length > 0) {
      if (!this.topAggregationContainer) {
        this.topAggregationContainer = f("top");
        const n3 = t2.querySelector(".header");
        n3 && n3.nextSibling ? e2.insertBefore(this.topAggregationContainer, n3.nextSibling) : e2.appendChild(this.topAggregationContainer);
      }
      m(this.topAggregationContainer, s2, this.visibleColumns, this.sourceRows, this.config.fullWidth);
    } else this.topAggregationContainer && (this.topAggregationContainer.remove(), this.topAggregationContainer = null);
    const l2 = false !== this.config.showRowCount || this.config.showSelectedCount && o2.selectedRows > 0 || this.config.showFilteredCount && o2.filteredRows !== o2.totalRows || this.config.customPanels && this.config.customPanels.length > 0, g2 = l2 && "top" !== this.config.position, c2 = a2.length > 0 || g2;
    if (l2 && "top" === this.config.position) if (this.infoBarElement) {
      const t3 = p(this.config, o2);
      this.infoBarElement.replaceWith(t3), this.infoBarElement = t3;
    } else this.infoBarElement = p(this.config, o2), e2.insertBefore(this.infoBarElement, e2.firstChild);
    else "top" === this.config.position && this.infoBarElement && (this.infoBarElement.remove(), this.infoBarElement = null);
    c2 ? (this.footerWrapper || (this.footerWrapper = document.createElement("div"), this.footerWrapper.className = "tbw-footer", e2.appendChild(this.footerWrapper)), this.footerWrapper.innerHTML = "", a2.length > 0 && (this.bottomAggregationContainer || (this.bottomAggregationContainer = f("bottom")), this.footerWrapper.appendChild(this.bottomAggregationContainer), m(this.bottomAggregationContainer, a2, this.visibleColumns, this.sourceRows, this.config.fullWidth)), g2 && (this.infoBarElement = p(this.config, o2), this.footerWrapper.appendChild(this.infoBarElement))) : this.cleanupFooter();
  }
  cleanup() {
    this.infoBarElement && (this.infoBarElement.remove(), this.infoBarElement = null), this.topAggregationContainer && (this.topAggregationContainer.remove(), this.topAggregationContainer = null), this.bottomAggregationContainer && (this.bottomAggregationContainer.remove(), this.bottomAggregationContainer = null), this.footerWrapper && (this.footerWrapper.remove(), this.footerWrapper = null);
  }
  cleanupFooter() {
    this.footerWrapper && (this.footerWrapper.remove(), this.footerWrapper = null), this.bottomAggregationContainer && (this.bottomAggregationContainer.remove(), this.bottomAggregationContainer = null), this.infoBarElement && "top" !== this.config.position && (this.infoBarElement.remove(), this.infoBarElement = null);
  }
  getSelectionState() {
    try {
      return this.grid?.getPluginState?.("selection") ?? null;
    } catch {
      return null;
    }
  }
  getFilterState() {
    try {
      return this.grid?.getPluginState?.("filtering") ?? null;
    } catch {
      return null;
    }
  }
  refresh() {
    this.requestRender();
  }
  getContext() {
    const t2 = this.getSelectionState(), e2 = this.getFilterState();
    return E(this.rows, this.columns, this.gridElement, t2, e2);
  }
  addPanel(t2) {
    this.config.customPanels || (this.config.customPanels = []), this.config.customPanels.push(t2), this.requestRender();
  }
  removePanel(t2) {
    this.config.customPanels && (this.config.customPanels = this.config.customPanels.filter((e2) => e2.id !== t2), this.requestRender());
  }
  addAggregationRow(t2) {
    this.config.aggregationRows || (this.config.aggregationRows = []), this.config.aggregationRows.push(t2), this.requestRender();
  }
  removeAggregationRow(t2) {
    this.config.aggregationRows && (this.config.aggregationRows = this.config.aggregationRows.filter((e2) => e2.id !== t2), this.requestRender());
  }
};

// node_modules/@toolbox-web/grid/lib/features/pinned-rows.js
i("pinnedRows", (e2) => new R("boolean" == typeof e2 ? {} : e2 ?? {}));
//# sourceMappingURL=@toolbox-web_grid-angular_features_pinned-rows.js.map
