import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  i
} from "./chunk-TZYRBE7Q.js";
import {
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal
} from "./chunk-TIPPOAWF.js";
import "./chunk-O5J3CNTX.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-6DU2HRTW.js";

// node_modules/@toolbox-web/grid/lib/plugins/filtering/index.js
var e = "(Blank)";
function t(e2) {
  if (e2 instanceof Date) return e2.getTime();
  const t2 = Number(e2);
  if (!isNaN(t2)) return t2;
  return new Date(e2).getTime();
}
function r(r2, i3, n2 = false, l2) {
  return i3.length ? r2.filter((r3) => i3.every((i4) => (function(r4, i5, n3 = false, l3) {
    const a2 = r4[i5.field];
    if ("blank" === i5.operator) return null == a2 || "" === a2;
    if ("notBlank" === i5.operator) return null != a2 && "" !== a2;
    if (l3 && ("notIn" === i5.operator || "in" === i5.operator)) {
      const t2 = l3(a2, r4), n4 = Array.isArray(t2) ? t2 : null != t2 ? [t2] : [];
      if ("notIn" === i5.operator) {
        const t3 = i5.value;
        return !Array.isArray(t3) || (0 === n4.length ? !t3.includes(e) : !n4.some((e2) => t3.includes(e2)));
      }
      if ("in" === i5.operator) {
        const t3 = i5.value;
        return !!Array.isArray(t3) && (0 === n4.length ? t3.includes(e) : n4.some((e2) => t3.includes(e2)));
      }
    }
    if ("notIn" === i5.operator) return null == a2 || "" === a2 ? !Array.isArray(i5.value) || !i5.value.includes(e) : Array.isArray(i5.value) && !i5.value.includes(a2);
    if ("in" === i5.operator) return null == a2 || "" === a2 ? Array.isArray(i5.value) && i5.value.includes(e) : Array.isArray(i5.value) && i5.value.includes(a2);
    if (null == a2) return false;
    const s2 = String(a2), o2 = n3 ? s2 : s2.toLowerCase(), c2 = n3 ? String(i5.value) : String(i5.value).toLowerCase();
    switch (i5.operator) {
      case "contains":
        return o2.includes(c2);
      case "notContains":
        return !o2.includes(c2);
      case "equals":
        return o2 === c2;
      case "notEquals":
        return o2 !== c2;
      case "startsWith":
        return o2.startsWith(c2);
      case "endsWith":
        return o2.endsWith(c2);
      case "lessThan":
        return t(a2) < t(i5.value);
      case "lessThanOrEqual":
        return t(a2) <= t(i5.value);
      case "greaterThan":
        return t(a2) > t(i5.value);
      case "greaterThanOrEqual":
        return t(a2) >= t(i5.value);
      case "between":
        return t(a2) >= t(i5.value) && t(a2) <= t(i5.valueTo);
      default:
        return true;
    }
  })(r3, i4, n2, l2?.get(i4.field)))) : r2;
}
function i2(t2, r2, i3) {
  const n2 = /* @__PURE__ */ new Set();
  let l2 = false;
  for (const e2 of t2) {
    const t3 = e2[r2];
    if (i3) {
      const r3 = i3(t3, e2);
      if (Array.isArray(r3)) {
        0 === r3.length && (l2 = true);
        for (const e3 of r3) null != e3 && n2.add(e3);
      } else null != r3 ? n2.add(r3) : l2 = true;
    } else null != t3 && "" !== t3 ? n2.add(t3) : l2 = true;
  }
  return l2 && n2.add(e), [...n2].sort((e2, t3) => "number" == typeof e2 && "number" == typeof t3 ? e2 - t3 : String(e2).localeCompare(String(t3)));
}
function n(e2, t2) {
  const r2 = e2.querySelector?.(".tbw-sr-only");
  r2 && (r2.textContent = "", requestAnimationFrame(() => {
    r2.textContent = t2;
  }));
}
function l(e2, t2) {
  return `[tbw-grid${e2 ? `#${e2}` : ""}${t2 ? `:${t2}` : ""}]`;
}
function a(e2, t2, r2, i3) {
  return `${l(r2, i3)} ${e2}: ${t2}

  → More info: ${(function(e3) {
    return `https://toolboxjs.com/grid/errors#${e3.toLowerCase()}`;
  })(e2)}`;
}
var s = /* @__PURE__ */ new Set(["script", "iframe", "object", "embed", "form", "input", "button", "textarea", "select", "link", "meta", "base", "style", "template", "slot", "portal", "frame", "frameset", "applet", "noscript", "noembed", "plaintext", "xmp", "listing"]);
var o = /^on\w+$/i;
var c = /* @__PURE__ */ new Set(["href", "src", "action", "formaction", "data", "srcdoc", "xlink:href", "poster", "srcset"]);
var d = /^\s*(javascript|vbscript|data|blob):/i;
function u(e2) {
  if (!e2 || "string" != typeof e2) return "";
  if (-1 === e2.indexOf("<")) return e2;
  const t2 = document.createElement("template");
  return t2.innerHTML = e2, (function(e3) {
    const t3 = [], r2 = e3.querySelectorAll("*");
    for (const i3 of r2) {
      const e4 = i3.tagName.toLowerCase();
      if (s.has(e4)) {
        t3.push(i3);
        continue;
      }
      if ("svg" === e4 || "http://www.w3.org/2000/svg" === i3.namespaceURI) {
        if (Array.from(i3.attributes).some((e5) => o.test(e5.name) || "href" === e5.name || "xlink:href" === e5.name)) {
          t3.push(i3);
          continue;
        }
      }
      const r3 = [];
      for (const t4 of i3.attributes) {
        const e5 = t4.name.toLowerCase();
        o.test(e5) ? r3.push(t4.name) : (c.has(e5) && d.test(t4.value) || "style" === e5 && /expression\s*\(|javascript:|behavior\s*:/i.test(t4.value)) && r3.push(t4.name);
      }
      r3.forEach((e5) => i3.removeAttribute(e5));
    }
    t3.forEach((e4) => e4.remove());
  })(t2.content), t2.innerHTML;
}
var p = '<svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>';
var h = { expand: "▶", collapse: "▼", sortAsc: "▲", sortDesc: "▼", sortNone: "⇅", submenuArrow: "▶", dragHandle: "⋮⋮", toolPanel: "☰", filter: p, filterActive: p, print: "🖨️" };
var f = class {
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
    const r2 = new CustomEvent(e2, { detail: t2, bubbles: true, cancelable: true });
    return this.grid?.dispatchEvent?.(r2), r2.defaultPrevented;
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
    return __spreadValues(__spreadValues({}, h), e2);
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
      const t2 = getComputedStyle(e2).getPropertyValue("--tbw-animation-duration").trim(), r2 = parseInt(t2, 10);
      if (!isNaN(r2)) return r2;
    }
    return 200;
  }
  resolveIcon(e2, t2) {
    return void 0 !== t2 ? t2 : this.gridIcons[e2];
  }
  setIcon(e2, t2) {
    "string" == typeof t2 ? e2.innerHTML = u(t2) : t2 instanceof HTMLElement && (e2.innerHTML = "", e2.appendChild(t2.cloneNode(true)));
  }
  warn(e2, t2) {
    void 0 !== t2 ? console.warn(a(e2, t2, this.gridElement.id, this.name)) : console.warn(`${l(this.gridElement.id, this.name)} ${e2}`);
  }
  throwDiagnostic(e2, t2) {
    throw new Error(a(e2, t2, this.gridElement.id, this.name));
  }
};
function b(e2) {
  return e2 ? e2.toISOString().split("T")[0] : "";
}
function g(e2) {
  return e2 ? "string" == typeof e2 ? e2 : "number" == typeof e2 ? b(new Date(e2)) : "" : "";
}
function m(e2, t2, r2, i3, n2, l2) {
  const { field: a2, column: s2 } = t2, o2 = (function(e3) {
    if (e3) {
      const t3 = getComputedStyle(e3).getPropertyValue("--tbw-filter-item-height");
      if (t3 && t3.trim()) {
        const e4 = parseFloat(t3);
        if (!isNaN(e4) && e4 > 0) return e4;
      }
    }
    return 28;
  })(e2), c2 = (e3) => {
    if (null == e3) return "(Blank)";
    if (s2.format && !s2.filterValue) {
      const t3 = s2.format(e3, void 0);
      if (t3) return t3;
    }
    return String(e3);
  };
  r2 = r2.slice().sort((e3, t3) => c2(e3).localeCompare(c2(t3)));
  const d2 = document.createElement("div");
  d2.className = "tbw-filter-search";
  const u2 = document.createElement("input");
  u2.type = "text", u2.placeholder = "Search...", u2.className = "tbw-filter-search-input", u2.value = l2.get(a2) ?? "", d2.appendChild(u2), e2.appendChild(d2);
  const p2 = document.createElement("div");
  p2.className = "tbw-filter-actions";
  const h2 = document.createElement("label");
  h2.className = "tbw-filter-value-item", h2.style.padding = "0", h2.style.margin = "0";
  const f2 = document.createElement("input");
  f2.type = "checkbox", f2.className = "tbw-filter-checkbox";
  const b2 = document.createElement("span");
  b2.textContent = "Select All", h2.appendChild(f2), h2.appendChild(b2), p2.appendChild(h2);
  const g2 = /* @__PURE__ */ new Map();
  r2.forEach((e3) => {
    const t3 = null == e3 ? "__null__" : String(e3);
    g2.set(t3, !i3.has(e3));
  });
  const m2 = () => {
    const e3 = [...g2.values()], t3 = e3.every((e4) => e4), r3 = e3.every((e4) => !e4);
    f2.checked = t3, f2.indeterminate = !t3 && !r3;
  };
  f2.addEventListener("change", () => {
    const e3 = f2.checked;
    for (const t3 of g2.keys()) g2.set(t3, e3);
    m2(), E();
  }), m2(), e2.appendChild(p2);
  const v2 = document.createElement("div");
  v2.className = "tbw-filter-values";
  const w2 = document.createElement("div");
  w2.className = "tbw-filter-values-spacer", v2.appendChild(w2);
  const y = document.createElement("div");
  y.className = "tbw-filter-values-content", v2.appendChild(y);
  let x = [];
  const C = (e3, t3) => {
    const r3 = c2(e3), i4 = null == e3 ? "__null__" : String(e3), n3 = document.createElement("label");
    n3.className = "tbw-filter-value-item", n3.style.position = "absolute", n3.style.top = `calc(var(--tbw-filter-item-height, 28px) * ${t3})`, n3.style.left = "0", n3.style.right = "0", n3.style.boxSizing = "border-box";
    const l3 = document.createElement("input");
    l3.type = "checkbox", l3.className = "tbw-filter-checkbox", l3.checked = g2.get(i4) ?? true, l3.dataset.value = i4, l3.addEventListener("change", () => {
      g2.set(i4, l3.checked), m2();
    });
    const a3 = document.createElement("span");
    return a3.textContent = r3, n3.appendChild(l3), n3.appendChild(a3), n3;
  }, E = () => {
    const e3 = x.length, t3 = v2.clientHeight, r3 = v2.scrollTop;
    if (w2.style.height = e3 * o2 + "px", e3 <= 50 / 3) return y.innerHTML = "", y.style.transform = "translateY(0px)", void x.forEach((e4, t4) => {
      y.appendChild(C(e4, t4));
    });
    const i4 = (function(e4) {
      const { totalRows: t4, viewportHeight: r4, scrollTop: i5, rowHeight: n3, overscan: l3 } = e4, a3 = Math.ceil(r4 / n3);
      let s3 = Math.floor(i5 / n3) - l3;
      s3 < 0 && (s3 = 0);
      let o3 = s3 + a3 + 2 * l3;
      return o3 > t4 && (o3 = t4), o3 === t4 && s3 > 0 && (s3 = Math.max(0, o3 - a3 - 2 * l3)), { start: s3, end: o3, offsetY: s3 * n3, totalHeight: t4 * n3 };
    })({ totalRows: e3, viewportHeight: t3, scrollTop: r3, rowHeight: o2, overscan: 3 });
    y.style.transform = `translateY(${i4.offsetY}px)`, y.innerHTML = "";
    for (let n3 = i4.start; n3 < i4.end; n3++) y.appendChild(C(x[n3], n3 - i4.start));
  }, k = (e3) => {
    const t3 = n2.caseSensitive ?? false, i4 = t3 ? e3 : e3.toLowerCase();
    if (x = r2.filter((r3) => {
      const n3 = c2(r3), l3 = t3 ? n3 : n3.toLowerCase();
      return !e3 || l3.includes(i4);
    }), x.sort((e4, t4) => {
      const r3 = null == e4 ? "__null__" : String(e4), i5 = null == t4 ? "__null__" : String(t4), n3 = g2.get(r3) ?? true;
      return n3 !== (g2.get(i5) ?? true) ? n3 ? -1 : 1 : c2(e4).localeCompare(c2(t4));
    }), 0 === x.length) {
      w2.style.height = "0px", y.innerHTML = "";
      const e4 = document.createElement("div");
      return e4.className = "tbw-filter-no-match", e4.textContent = "No matching values", void y.appendChild(e4);
    }
    E();
  };
  let S;
  v2.addEventListener("scroll", () => {
    x.length > 0 && E();
  }, { passive: true }), k(u2.value), e2.appendChild(v2), u2.addEventListener("input", () => {
    clearTimeout(S), S = setTimeout(() => {
      l2.set(a2, u2.value), k(u2.value);
    }, n2.debounceMs ?? 150);
  });
  const F = document.createElement("div");
  F.className = "tbw-filter-buttons";
  const A = document.createElement("button");
  A.className = "tbw-filter-apply-btn", A.textContent = "Apply", A.addEventListener("click", () => {
    const e3 = [];
    for (const [t3, i4] of g2) if (!i4) if ("__null__" === t3) e3.push(null);
    else {
      const i5 = r2.find((e4) => String(e4) === t3);
      e3.push(void 0 !== i5 ? i5 : t3);
    }
    t2.applySetFilter(e3);
  }), F.appendChild(A);
  const N = document.createElement("button");
  N.className = "tbw-filter-clear-btn", N.textContent = "Clear Filter", N.addEventListener("click", () => {
    t2.clearFilter();
  }), F.appendChild(N), e2.appendChild(F);
}
function v(e2, t2) {
  if ("number" == typeof e2) return e2;
  if ("string" == typeof e2) {
    const r2 = parseFloat(e2);
    return isNaN(r2) ? t2 : r2;
  }
  return t2;
}
var w = class _w extends f {
  static manifest = { events: [{ type: "filter-applied", description: "Emitted when filter criteria change. Subscribers can react to row visibility changes." }], queries: [{ type: "getContextMenuItems", description: "Contributes filter-related items to the header context menu" }] };
  name = "filtering";
  styles = '@layer tbw-plugins{tbw-grid .tbw-quick-filter-input{flex:1;max-width:300px;height:var(--tbw-input-height, 1.75rem);padding:var(--tbw-input-padding, 0 .5rem);border:1px solid var(--tbw-color-border);border-radius:var(--tbw-border-radius);background:var(--tbw-color-bg);color:var(--tbw-color-fg);font-size:var(--tbw-font-size-sm, .8125rem)}tbw-grid .tbw-quick-filter-input:focus{outline:none;border-color:var(--tbw-color-accent)}tbw-grid .header-cell.filtered:before{content:"";position:absolute;top:var(--tbw-spacing-xs, .25rem);right:var(--tbw-spacing-xs, .25rem);width:var(--tbw-indicator-size, .375rem);height:var(--tbw-indicator-size, .375rem);background:var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6));border-radius:50%}tbw-grid .tbw-filter-btn{display:var(--tbw-filter-btn-display, inline-flex);visibility:var(--tbw-filter-btn-visibility, visible);align-items:center;justify-content:center;background:transparent;border:none;cursor:pointer;padding:2px;margin-left:var(--tbw-spacing-xs, .25rem);opacity:.4;transition:opacity .15s,visibility 0s,display 0s allow-discrete;color:inherit;vertical-align:middle;transition-behavior:allow-discrete}tbw-grid .tbw-filter-btn:hover,tbw-grid .tbw-filter-btn.active{opacity:1;visibility:visible;display:inline-flex}tbw-grid .tbw-filter-btn.active{color:var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6))}tbw-grid .header-row .cell:hover .tbw-filter-btn,tbw-grid .header-row .cell.filtered .tbw-filter-btn{display:inline-flex;visibility:visible}}';
  get defaultConfig() {
    return { debounceMs: 300, caseSensitive: false, trimInput: true, useWorker: true };
  }
  isFilteringEnabled() {
    return false !== this.grid.effectiveConfig?.filterable;
  }
  isColumnFilterable(e2) {
    return !!this.isFilteringEnabled() && false !== e2.filterable;
  }
  getFilterValues() {
    const e2 = this.grid.effectiveConfig?.columns;
    if (!e2) return;
    let t2;
    for (const r2 of e2) r2.field && r2.filterValue && (t2 || (t2 = /* @__PURE__ */ new Map()), t2.set(r2.field, r2.filterValue));
    return t2;
  }
  filters = /* @__PURE__ */ new Map();
  cachedResult = null;
  cacheKey = null;
  cachedInputSpot = null;
  openPanelField = null;
  panelElement = null;
  panelAnchorElement = null;
  searchText = /* @__PURE__ */ new Map();
  excludedValues = /* @__PURE__ */ new Map();
  panelAbortController = null;
  globalStylesInjected = false;
  computeSelected() {
    const t2 = {}, r2 = [];
    for (const [e2, i3] of this.filters) if ("set" === i3.type) {
      if ("in" === i3.operator && Array.isArray(i3.value)) t2[e2] = i3.value;
      else if ("notIn" === i3.operator) {
        const t3 = this.grid.effectiveConfig?.columns?.find((t4) => t4.field === e2);
        r2.push({ field: e2, filterValue: t3?.filterValue });
      }
    }
    if (r2.length > 0) {
      const i3 = (function(t3, r3) {
        const i4 = /* @__PURE__ */ new Map();
        for (const { field: e2, filterValue: l2 } of r3) i4.set(e2, { values: /* @__PURE__ */ new Set(), hasBlank: false, hasExtractor: !!l2 });
        for (const e2 of t3) for (const { field: t4, filterValue: n3 } of r3) {
          const r4 = i4.get(t4), l2 = e2[t4];
          if (n3) {
            const t5 = n3(l2, e2);
            if (Array.isArray(t5)) {
              0 === t5.length && (r4.hasBlank = true);
              for (const e3 of t5) null != e3 && r4.values.add(e3);
            } else null != t5 ? r4.values.add(t5) : r4.hasBlank = true;
          } else null != l2 && "" !== l2 ? r4.values.add(l2) : r4.hasBlank = true;
        }
        const n2 = /* @__PURE__ */ new Map();
        for (const [l2, { values: a2, hasBlank: s2 }] of i4) s2 && a2.add(e), n2.set(l2, [...a2].sort((e2, t4) => "number" == typeof e2 && "number" == typeof t4 ? e2 - t4 : String(e2).localeCompare(String(t4))));
        return n2;
      })(this.sourceRows, r2);
      for (const { field: e2 } of r2) {
        const r3 = this.excludedValues.get(e2), n2 = i3.get(e2) ?? [];
        t2[e2] = r3 ? n2.filter((e3) => !r3.has(e3)) : n2;
      }
    }
    return t2;
  }
  syncExcludedValues(t2, r2) {
    if (r2) if ("set" === r2.type && "notIn" === r2.operator && Array.isArray(r2.value)) this.excludedValues.set(t2, new Set(r2.value));
    else if ("set" === r2.type && "in" === r2.operator && Array.isArray(r2.value)) {
      const i3 = this.sourceRows;
      if (!i3 || 0 === i3.length) return void this.excludedValues.delete(t2);
      const n2 = r2.value, l2 = new Set(n2.map((t3) => null == t3 ? e : t3)), a2 = this.getUniqueValues(t2), s2 = new Set(a2.filter((e2) => !l2.has(e2)));
      this.excludedValues.set(t2, s2);
    } else "set" === r2.type && this.excludedValues.delete(t2);
    else this.excludedValues.delete(t2);
  }
  attach(e2) {
    super.attach(e2), this.injectGlobalStyles();
  }
  detach() {
    this.filters.clear(), this.cachedResult = null, this.cacheKey = null, this.cachedInputSpot = null, this.openPanelField = null, this.panelElement && (this.panelElement.remove(), this.panelElement = null), this.searchText.clear(), this.excludedValues.clear(), this.panelAbortController?.abort(), this.panelAbortController = null;
  }
  handleQuery(e2) {
    if ("getContextMenuItems" === e2.type) {
      const t2 = e2.context;
      if (!t2.isHeader) return;
      const r2 = t2.column;
      if (!r2?.field) return;
      if (!this.isFilteringEnabled()) return;
      if (!this.isColumnFilterable(r2)) return;
      const i3 = [], n2 = this.isFieldFiltered(r2.field), l2 = this.filters.size > 0;
      return n2 && i3.push({ id: "filtering/clear-column-filter", label: "Clear Filter", icon: "✕", order: 20, action: () => this.clearFieldFilter(r2.field) }), l2 && i3.push({ id: "filtering/clear-all-filters", label: "Clear All Filters", icon: "✕", order: 21, disabled: !l2, action: () => this.clearAllFilters() }), i3.length > 0 ? i3 : void 0;
    }
  }
  processRows(e2) {
    const t2 = [...this.filters.values()];
    if (!t2.length) return [...e2];
    if (this.config.filterHandler) return this.cachedResult ? this.cachedResult : [...e2];
    const i3 = (n2 = t2, JSON.stringify(n2.map((e3) => ({ field: e3.field, operator: e3.operator, value: e3.value, valueTo: e3.valueTo }))));
    var n2;
    const l2 = { len: e2.length, first: e2[0], mid: e2[Math.floor(e2.length / 2)], last: e2[e2.length - 1] }, a2 = null != this.cachedInputSpot && l2.len === this.cachedInputSpot.len && l2.first === this.cachedInputSpot.first && l2.mid === this.cachedInputSpot.mid && l2.last === this.cachedInputSpot.last;
    if (this.cacheKey === i3 && this.cachedResult && a2) return this.cachedResult;
    if (!a2) for (const [r2, o2] of this.filters) "set" === o2.type && "in" === o2.operator && this.syncExcludedValues(r2, o2);
    const s2 = r([...e2], t2, this.config.caseSensitive, this.getFilterValues());
    return this.cachedResult = s2, this.cacheKey = i3, this.cachedInputSpot = l2, s2;
  }
  afterRender() {
    const e2 = this.gridElement;
    if (!e2) return;
    e2.querySelectorAll('[part~="header-cell"]').forEach((e3) => {
      const t2 = e3.getAttribute("data-col");
      if (null === t2) return;
      const r2 = this.visibleColumns[parseInt(t2, 10)];
      if (!r2 || !this.isColumnFilterable(r2)) return;
      if (i3 = r2, true === i3.meta?.utility) return;
      var i3;
      const n2 = r2.field;
      if (!n2) return;
      const l2 = this.filters.has(n2);
      let a2 = e3.querySelector(".tbw-filter-btn");
      if (a2) {
        const t3 = a2.classList.contains("active");
        if (a2.classList.toggle("active", l2), e3.classList.toggle("filtered", l2), l2 ? e3.setAttribute("aria-description", "Filtered") : e3.removeAttribute("aria-description"), t3 !== l2) {
          const e4 = l2 ? "filterActive" : "filter";
          this.setIcon(a2, this.resolveIcon(e4));
        }
        return;
      }
      a2 = document.createElement("button"), a2.className = "tbw-filter-btn", a2.setAttribute("aria-label", `Filter ${r2.header ?? n2}`);
      const s2 = l2 ? "filterActive" : "filter";
      this.setIcon(a2, this.resolveIcon(s2)), l2 && (a2.classList.add("active"), e3.classList.add("filtered"), e3.setAttribute("aria-description", "Filtered")), a2.addEventListener("click", (e4) => {
        e4.stopPropagation(), this.toggleFilterPanel(n2, r2, a2);
      });
      const o2 = e3.querySelector(".resize-handle");
      o2 ? e3.insertBefore(a2, o2) : e3.appendChild(a2);
    });
  }
  setFilter(e2, t2, r2) {
    if (null === t2) this.filters.delete(e2), this.syncExcludedValues(e2, null);
    else {
      const r3 = __spreadProps(__spreadValues({}, t2), { field: e2 });
      this.filters.set(e2, r3), this.syncExcludedValues(e2, r3);
    }
    if (this.cachedResult = null, this.cacheKey = null, this.cachedInputSpot = null, !r2?.silent) {
      this.emit("filter-change", { filters: [...this.filters.values()], filteredRowCount: 0, selected: this.computeSelected() }), this.config.trackColumnState && this.grid.requestStateChange?.();
      const r3 = this.grid.effectiveConfig?.columns?.find((t3) => t3.field === e2)?.header ?? e2;
      n(this.gridElement, null === t2 ? `Filter cleared from ${r3}` : `Filter applied on ${r3}`);
    }
    this.emitPluginEvent("filter-applied", { filters: [...this.filters.values()] }), this.requestRender();
  }
  getFilter(e2) {
    return this.filters.get(e2);
  }
  getFilters() {
    return [...this.filters.values()];
  }
  getFilterModel() {
    return this.getFilters();
  }
  setFilterModel(e2, t2) {
    this.filters.clear(), this.excludedValues.clear();
    for (const r2 of e2) this.filters.set(r2.field, r2), this.syncExcludedValues(r2.field, r2);
    this.cachedResult = null, this.cacheKey = null, this.cachedInputSpot = null, t2?.silent || (this.emit("filter-change", { filters: [...this.filters.values()], filteredRowCount: 0, selected: this.computeSelected() }), this.config.trackColumnState && this.grid.requestStateChange?.()), this.emitPluginEvent("filter-applied", { filters: [...this.filters.values()] }), this.requestRender();
  }
  clearAllFilters(e2) {
    this.filters.clear(), this.excludedValues.clear(), this.searchText.clear(), this.applyFiltersInternal(e2?.silent), e2?.silent || n(this.gridElement, "All filters cleared");
  }
  clearFieldFilter(e2, t2) {
    if (this.filters.delete(e2), this.excludedValues.delete(e2), this.searchText.delete(e2), this.applyFiltersInternal(t2?.silent), !t2?.silent) {
      const t3 = this.grid.effectiveConfig?.columns?.find((t4) => t4.field === e2)?.header ?? e2;
      n(this.gridElement, `Filter cleared from ${t3}`);
    }
  }
  isFieldFiltered(e2) {
    return this.filters.has(e2);
  }
  getFilteredRowCount() {
    return this.cachedResult?.length ?? this.rows.length;
  }
  getActiveFilters() {
    return this.getFilters();
  }
  getUniqueValues(e2) {
    const t2 = this.grid.effectiveConfig?.columns?.find((t3) => t3.field === e2), r2 = t2?.filterValue;
    return i2(this.sourceRows, e2, r2);
  }
  getStaleFilters() {
    const e2 = [];
    for (const [t2, r2] of this.filters) {
      if ("set" !== r2.type) continue;
      const i3 = this.getUniqueValues(t2);
      if ("notIn" === r2.operator && Array.isArray(r2.value)) {
        const t3 = new Set(r2.value);
        0 === i3.filter((e3) => !t3.has(e3)).length && e2.push(r2);
      } else if ("in" === r2.operator && Array.isArray(r2.value)) {
        const t3 = new Set(r2.value);
        0 === i3.filter((e3) => t3.has(e3)).length && e2.push(r2);
      }
    }
    return e2;
  }
  getBlankMode(e2) {
    const t2 = this.filters.get(e2);
    return "blank" === t2?.operator ? "blanksOnly" : "notBlank" === t2?.operator ? "nonBlanksOnly" : "all";
  }
  toggleBlankFilter(e2, t2) {
    if ("all" === t2) {
      const t3 = this.filters.get(e2);
      if (t3?.valueTo && "object" == typeof t3.valueTo) {
        const r3 = t3.valueTo;
        this.setFilter(e2, r3);
      } else this.setFilter(e2, null);
      return;
    }
    const r2 = this.filters.get(e2), i3 = r2 && "blank" !== r2.operator && "notBlank" !== r2.operator ? { type: r2.type, operator: r2.operator, value: r2.value, valueTo: r2.valueTo } : r2?.valueTo;
    this.setFilter(e2, { type: r2?.type ?? "text", operator: "blanksOnly" === t2 ? "blank" : "notBlank", value: "", valueTo: i3 });
  }
  copyGridThemeContext(e2) {
    const t2 = this.gridElement;
    if (!t2) return;
    for (const i3 of t2.classList) i3.startsWith("tbw-") || "selecting" === i3 || e2.classList.add(i3);
    const r2 = t2.dataset.theme;
    r2 && (e2.dataset.theme = r2);
  }
  injectGlobalStyles() {
    if (this.globalStylesInjected) return;
    if (document.getElementById("tbw-filter-panel-styles")) return void (this.globalStylesInjected = true);
    const e2 = document.createElement("style");
    e2.id = "tbw-filter-panel-styles", e2.textContent = "@layer tbw-plugins{.tbw-filter-panel{position:fixed;background:var(--tbw-filter-panel-bg, var(--tbw-color-panel-bg, light-dark(#eeeeee, #222222)));color:var(--tbw-filter-panel-fg, var(--tbw-color-fg, light-dark(#222222, #eeeeee)));border:1px solid var(--tbw-filter-panel-border, var(--tbw-color-border, light-dark(#d0d0d4, #454545)));border-radius:var(--tbw-filter-panel-radius, var(--tbw-border-radius, .25rem));box-shadow:0 4px 16px var(--tbw-filter-panel-shadow, var(--tbw-color-shadow, light-dark(rgba(0, 0, 0, .1), rgba(0, 0, 0, .3))));padding:var(--tbw-panel-padding, var(--tbw-spacing-lg, .75rem));z-index:10000;min-width:200px;max-width:280px;max-height:350px;display:flex;flex-direction:column;font-family:var(--tbw-font-family, system-ui, sans-serif);font-size:var(--tbw-font-size, .8125rem);transform-origin:top center}.tbw-filter-panel.tbw-filter-panel-above{transform-origin:bottom center}.tbw-filter-panel.tbw-filter-panel-animated{animation:tbw-filter-panel-enter var(--tbw-animation-duration, .15s) var(--tbw-animation-easing, ease-out)}.tbw-filter-panel.tbw-filter-panel-above.tbw-filter-panel-animated{animation:tbw-filter-panel-enter-above var(--tbw-animation-duration, .15s) var(--tbw-animation-easing, ease-out)}@keyframes tbw-filter-panel-enter{0%{opacity:0;transform:scaleY(.3) translateY(-10px)}to{opacity:1;transform:scaleY(1) translateY(0)}}@keyframes tbw-filter-panel-enter-above{0%{opacity:0;transform:scaleY(.3) translateY(10px)}to{opacity:1;transform:scaleY(1) translateY(0)}}@supports (anchor-name: --test){.tbw-filter-panel{position-anchor:--tbw-filter-anchor;top:anchor(bottom);left:anchor(left);margin-top:4px;position-try-fallbacks:flip-inline,flip-block,flip-block flip-inline}}.tbw-filter-search{margin-bottom:var(--tbw-panel-gap, var(--tbw-spacing-md, .5rem));min-height:var(--tbw-filter-item-height, 28px)}.tbw-filter-search-input{height:var(--tbw-filter-item-height, 28px);width:100%;padding:var(--tbw-filter-search-padding, var(--tbw-spacing-sm, .375rem) var(--tbw-spacing-md, .5rem));background:var(--tbw-filter-input-bg, var(--tbw-color-bg, transparent));color:inherit;border:1px solid var(--tbw-filter-input-border, var(--tbw-color-border, light-dark(#d0d0d4, #454545)));border-radius:var(--tbw-filter-input-radius, var(--tbw-border-radius, .25rem));font-size:inherit;box-sizing:border-box}.tbw-filter-search-input:focus{outline:none;border-color:var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6));box-shadow:0 0 0 2px rgba(from var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6)) r g b / 15%)}.tbw-filter-actions{display:flex;padding:var(--tbw-button-padding-sm, .25rem .125rem);margin-bottom:var(--tbw-panel-gap, var(--tbw-spacing-md, .5rem));border-bottom:1px solid var(--tbw-filter-divider, var(--tbw-color-border, light-dark(#d0d0d4, #454545)));min-height:var(--tbw-filter-item-height, 28px)}.tbw-filter-actions .tbw-filter-value-item{flex:1}.tbw-filter-values{flex:1;overflow-y:auto;margin-bottom:var(--tbw-panel-gap, var(--tbw-spacing-md, .5rem));max-height:180px;position:relative}.tbw-filter-values-spacer{width:1px}.tbw-filter-values-content{position:absolute;top:0;left:0;right:0}.tbw-filter-value-item{display:flex;align-items:center;gap:var(--tbw-panel-gap, var(--tbw-spacing-md, .5rem));padding:var(--tbw-button-padding-sm, .25rem .125rem);cursor:pointer;border-radius:3px;height:var(--tbw-filter-item-height, 28px)}.tbw-filter-value-item:hover{background:var(--tbw-filter-hover, var(--tbw-color-row-hover, light-dark(#f0f6ff, #1c1c1c)))}.tbw-filter-checkbox{margin:0;cursor:pointer;accent-color:var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6))}.tbw-filter-no-match{color:var(--tbw-filter-muted, var(--tbw-color-fg-muted, light-dark(#555555, #aaaaaa)));padding:var(--tbw-panel-gap, var(--tbw-spacing-md, .5rem)) 0;text-align:center;font-style:italic}.tbw-filter-buttons{display:flex;gap:var(--tbw-panel-gap, var(--tbw-spacing-md, .5rem));padding-top:var(--tbw-panel-gap, var(--tbw-spacing-md, .5rem));border-top:1px solid var(--tbw-filter-divider, var(--tbw-color-border, light-dark(#d0d0d4, #454545)))}.tbw-filter-apply-btn{flex:1;padding:var(--tbw-filter-btn-padding, var(--tbw-button-padding, .375rem .75rem));background:var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6));color:var(--tbw-filter-accent-fg, var(--tbw-color-accent-fg, light-dark(#ffffff, #000000)));border:none;border-radius:var(--tbw-border-radius, .25rem);cursor:pointer;font-size:var(--tbw-font-size-sm, .8125rem);font-weight:var(--tbw-filter-btn-font-weight, 500);min-height:var(--tbw-filter-btn-min-height, auto)}.tbw-filter-apply-btn:hover{filter:brightness(.9)}.tbw-filter-clear-btn{flex:1;padding:var(--tbw-filter-btn-padding, var(--tbw-button-padding, .375rem .75rem));background:transparent;color:var(--tbw-filter-muted, var(--tbw-color-fg-muted, light-dark(#555555, #aaaaaa)));border:1px solid var(--tbw-filter-input-border, var(--tbw-color-border, light-dark(#d0d0d4, #454545)));border-radius:var(--tbw-border-radius, .25rem);cursor:pointer;font-size:var(--tbw-font-size-sm, .8125rem);font-weight:var(--tbw-filter-btn-font-weight, 500);min-height:var(--tbw-filter-btn-min-height, auto)}.tbw-filter-clear-btn:hover{background:var(--tbw-filter-hover, var(--tbw-color-row-hover, light-dark(#f0f6ff, #1c1c1c)))}.tbw-filter-range-inputs,.tbw-filter-date-range{display:flex;align-items:flex-end;gap:var(--tbw-spacing-sm, .375rem);margin-bottom:var(--tbw-panel-gap, var(--tbw-spacing-md, .5rem))}.tbw-filter-range-group,.tbw-filter-date-group{display:flex;flex-direction:column;gap:var(--tbw-spacing-xs, .25rem);flex:1}.tbw-filter-range-label{font-size:var(--tbw-font-size-xs, .75rem);color:var(--tbw-filter-muted, var(--tbw-color-fg-muted, light-dark(#555555, #aaaaaa)))}.tbw-filter-range-input,.tbw-filter-date-input{width:100%;height:var(--tbw-filter-item-height, 28px);padding:var(--tbw-spacing-xs, .25rem) var(--tbw-spacing-sm, .375rem);background:var(--tbw-filter-input-bg, var(--tbw-color-bg, transparent));color:inherit;border:1px solid var(--tbw-filter-input-border, var(--tbw-color-border, light-dark(#d0d0d4, #454545)));border-radius:var(--tbw-filter-input-radius, var(--tbw-border-radius, .25rem));font-size:inherit;box-sizing:border-box}.tbw-filter-range-input:focus,.tbw-filter-date-input:focus{outline:none;border-color:var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6));box-shadow:0 0 0 2px rgba(from var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6)) r g b / 15%)}.tbw-filter-range-separator{color:var(--tbw-filter-muted, var(--tbw-color-fg-muted, light-dark(#555555, #aaaaaa)));padding-bottom:var(--tbw-spacing-xs, .25rem)}.tbw-filter-blank-option{display:flex;align-items:center;gap:var(--tbw-spacing-sm, .375rem);padding:var(--tbw-spacing-xs, .25rem) 0;margin-bottom:var(--tbw-spacing-xs, .25rem);font-size:var(--tbw-font-size-sm, .8125rem);cursor:pointer;-webkit-user-select:none;user-select:none}.tbw-filter-blank-checkbox{accent-color:var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6));margin:0;cursor:pointer}.tbw-filter-date-range.tbw-filter-disabled,.tbw-filter-range-inputs.tbw-filter-disabled,.tbw-filter-range-slider.tbw-filter-disabled{opacity:.4;pointer-events:none}.tbw-filter-range-slider{position:relative;height:24px;margin:var(--tbw-spacing-md, .5rem) 0 var(--tbw-panel-gap, var(--tbw-spacing-md, .5rem))}.tbw-filter-range-track{position:absolute;top:50%;left:0;right:0;height:4px;background:var(--tbw-filter-input-border, var(--tbw-color-border, light-dark(#d0d0d4, #454545)));border-radius:2px;transform:translateY(-50%)}.tbw-filter-range-fill{position:absolute;top:50%;height:4px;background:var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6));border-radius:2px;transform:translateY(-50%)}.tbw-filter-range-thumb{position:absolute;top:0;width:100%;height:100%;background:none;pointer-events:none;-webkit-appearance:none;appearance:none}.tbw-filter-range-thumb::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;background:var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6));border:2px solid var(--tbw-filter-panel-bg, var(--tbw-color-panel-bg, light-dark(#eeeeee, #222222)));border-radius:50%;cursor:pointer;pointer-events:all;box-shadow:0 1px 3px #0003}.tbw-filter-range-thumb::-moz-range-thumb{width:16px;height:16px;background:var(--tbw-filter-accent, var(--tbw-color-accent, #3b82f6));border:2px solid var(--tbw-filter-panel-bg, var(--tbw-color-panel-bg, light-dark(#eeeeee, #222222)));border-radius:50%;cursor:pointer;pointer-events:all;box-shadow:0 1px 3px #0003}.tbw-filter-range-thumb::-webkit-slider-thumb:hover{transform:scale(1.1)}.tbw-filter-range-thumb::-moz-range-thumb:hover{transform:scale(1.1)}}", document.head.appendChild(e2), this.globalStylesInjected = true;
  }
  toggleFilterPanel(e2, t2, r2) {
    if (this.openPanelField === e2) return void this.closeFilterPanel();
    this.closeFilterPanel();
    const n2 = document.createElement("div");
    if (n2.className = "tbw-filter-panel", this.copyGridThemeContext(n2), this.isAnimationEnabled && n2.classList.add("tbw-filter-panel-animated"), this.panelElement = n2, this.openPanelField = e2, this.config.valuesHandler) return n2.innerHTML = '<div class="tbw-filter-loading">Loading...</div>', document.body.appendChild(n2), this.positionPanel(n2, r2), this.setupPanelCloseHandler(n2, r2), void this.config.valuesHandler(e2, t2).then((r3) => {
      this.openPanelField === e2 && this.panelElement && (n2.innerHTML = "", this.renderPanelContent(e2, t2, n2, r3));
    });
    const l2 = i2(this.sourceRows, e2, t2.filterValue);
    document.body.appendChild(n2), this.positionPanel(n2, r2), this.renderPanelContent(e2, t2, n2, l2), this.setupPanelCloseHandler(n2, r2);
  }
  renderPanelContent(t2, r2, i3, n2) {
    const l2 = this.filters.get(t2);
    if ("in" === l2?.operator && "set" === l2.type && Array.isArray(l2.value) && !this.excludedValues.has(t2)) {
      const r3 = l2.value, i4 = new Set(r3.map((t3) => null == t3 ? e : t3)), a3 = new Set(n2.filter((e2) => !i4.has(e2)));
      this.excludedValues.set(t2, a3);
    }
    let a2 = this.excludedValues.get(t2);
    a2 || (a2 = /* @__PURE__ */ new Set(), this.excludedValues.set(t2, a2));
    const s2 = this.searchText.get(t2) ?? "", o2 = { field: t2, column: r2, uniqueValues: n2, excludedValues: a2, searchText: s2, currentFilter: this.filters.get(t2), applySetFilter: (e2, r3) => {
      this.applySetFilter(t2, e2, r3), this.closeFilterPanel();
    }, applyTextFilter: (e2, r3, i4) => {
      this.applyTextFilter(t2, e2, r3, i4), this.closeFilterPanel();
    }, clearFilter: () => {
      this.clearFieldFilter(t2), this.closeFilterPanel();
    }, closePanel: () => this.closeFilterPanel() };
    let c2 = false;
    if (this.config.filterPanelRenderer && (this.config.filterPanelRenderer(i3, o2), c2 = i3.children.length > 0), !c2 && r2.type) {
      const e2 = this.grid.effectiveConfig.typeDefaults?.[r2.type];
      e2?.filterPanelRenderer && (e2.filterPanelRenderer(i3, o2), c2 = i3.children.length > 0);
    }
    if (!c2) {
      const e2 = r2.type;
      "number" === e2 ? (function(e3, t3, r3, i4) {
        const { field: n3, column: l3 } = t3, a3 = l3.filterParams, s3 = l3.editorParams, o3 = r3.filter((e4) => "number" == typeof e4 && !isNaN(e4)), c3 = o3.length > 0 ? Math.min(...o3) : 0, d2 = o3.length > 0 ? Math.max(...o3) : 100, u2 = v(a3?.min ?? s3?.min, c3), p2 = v(a3?.max ?? s3?.max, d2), h2 = a3?.step ?? s3?.step ?? 1, f2 = i4.get(n3);
        let b2 = u2, g2 = p2;
        const m2 = "blank" === f2?.operator;
        "between" === f2?.operator ? (b2 = v(f2.value, u2), g2 = v(f2.valueTo, p2)) : "greaterThanOrEqual" === f2?.operator ? b2 = v(f2.value, u2) : "lessThanOrEqual" === f2?.operator && (g2 = v(f2.value, p2));
        const w2 = document.createElement("div");
        w2.className = "tbw-filter-range-inputs";
        const y = document.createElement("div");
        y.className = "tbw-filter-range-group";
        const x = document.createElement("label");
        x.textContent = "Min", x.className = "tbw-filter-range-label";
        const C = document.createElement("input");
        C.type = "number", C.className = "tbw-filter-range-input", C.min = String(u2), C.max = String(p2), C.step = String(h2), C.value = String(b2), y.appendChild(x), y.appendChild(C), w2.appendChild(y);
        const E = document.createElement("span");
        E.className = "tbw-filter-range-separator", E.textContent = "–", w2.appendChild(E);
        const k = document.createElement("div");
        k.className = "tbw-filter-range-group";
        const S = document.createElement("label");
        S.textContent = "Max", S.className = "tbw-filter-range-label";
        const F = document.createElement("input");
        F.type = "number", F.className = "tbw-filter-range-input", F.min = String(u2), F.max = String(p2), F.step = String(h2), F.value = String(g2), k.appendChild(S), k.appendChild(F), w2.appendChild(k), e3.appendChild(w2);
        const A = document.createElement("div");
        A.className = "tbw-filter-range-slider";
        const N = document.createElement("div");
        N.className = "tbw-filter-range-track";
        const T = document.createElement("div");
        T.className = "tbw-filter-range-fill";
        const R = document.createElement("input");
        R.type = "range", R.className = "tbw-filter-range-thumb tbw-filter-range-thumb-min", R.min = String(u2), R.max = String(p2), R.step = String(h2), R.value = String(b2);
        const P = document.createElement("input");
        P.type = "range", P.className = "tbw-filter-range-thumb tbw-filter-range-thumb-max", P.min = String(u2), P.max = String(p2), P.step = String(h2), P.value = String(g2), A.appendChild(N), A.appendChild(T), A.appendChild(R), A.appendChild(P), e3.appendChild(A);
        const L = document.createElement("label");
        L.className = "tbw-filter-blank-option";
        const I = document.createElement("input");
        I.type = "checkbox", I.className = "tbw-filter-blank-checkbox", I.checked = m2;
        const M = document.createTextNode("Blank");
        L.appendChild(I), L.appendChild(M);
        const V = (e4) => {
          C.disabled = e4, F.disabled = e4, R.disabled = e4, P.disabled = e4, w2.classList.toggle("tbw-filter-disabled", e4), A.classList.toggle("tbw-filter-disabled", e4);
        };
        V(m2), I.addEventListener("change", () => {
          V(I.checked);
        }), e3.appendChild(L);
        const q = () => {
          const e4 = parseFloat(R.value), t4 = parseFloat(P.value), r4 = p2 - u2, i5 = (e4 - u2) / r4 * 100, n4 = (t4 - u2) / r4 * 100;
          T.style.left = `${i5}%`, T.style.width = n4 - i5 + "%";
        };
        R.addEventListener("input", () => {
          const e4 = Math.min(parseFloat(R.value), parseFloat(P.value));
          R.value = String(e4), C.value = String(e4), q();
        }), P.addEventListener("input", () => {
          const e4 = Math.max(parseFloat(P.value), parseFloat(R.value));
          P.value = String(e4), F.value = String(e4), q();
        }), C.addEventListener("input", () => {
          let e4 = parseFloat(C.value) || u2;
          e4 = Math.max(u2, Math.min(e4, parseFloat(F.value))), R.value = String(e4), q();
        }), F.addEventListener("input", () => {
          let e4 = parseFloat(F.value) || p2;
          e4 = Math.min(p2, Math.max(e4, parseFloat(C.value))), P.value = String(e4), q();
        }), q();
        const _ = document.createElement("div");
        _.className = "tbw-filter-buttons";
        const z = document.createElement("button");
        z.className = "tbw-filter-apply-btn", z.textContent = "Apply", z.addEventListener("click", () => {
          if (I.checked) return void t3.applyTextFilter("blank", "");
          const e4 = parseFloat(C.value), r4 = parseFloat(F.value);
          t3.applyTextFilter("between", e4, r4);
        }), _.appendChild(z);
        const H = document.createElement("button");
        H.className = "tbw-filter-clear-btn", H.textContent = "Clear Filter", H.addEventListener("click", () => {
          t3.clearFilter();
        }), _.appendChild(H), e3.appendChild(_);
      })(i3, o2, n2, this.filters) : "date" === e2 ? (function(e3, t3, r3, i4) {
        const { field: n3, column: l3 } = t3, a3 = l3.filterParams, s3 = l3.editorParams, o3 = r3.filter((e4) => e4 instanceof Date || "string" == typeof e4 && !isNaN(Date.parse(e4))).map((e4) => e4 instanceof Date ? e4 : new Date(e4)).filter((e4) => !isNaN(e4.getTime())), c3 = o3.length > 0 ? new Date(Math.min(...o3.map((e4) => e4.getTime()))) : null, d2 = o3.length > 0 ? new Date(Math.max(...o3.map((e4) => e4.getTime()))) : null, u2 = g(a3?.min) || g(s3?.min) || b(c3), p2 = g(a3?.max) || g(s3?.max) || b(d2), h2 = i4.get(n3);
        let f2 = "", m2 = "";
        const v2 = "blank" === h2?.operator;
        "between" === h2?.operator ? (f2 = g(h2.value) || "", m2 = g(h2.valueTo) || "") : "greaterThanOrEqual" === h2?.operator ? f2 = g(h2.value) || "" : "lessThanOrEqual" === h2?.operator && (m2 = g(h2.value) || "");
        const w2 = document.createElement("div");
        w2.className = "tbw-filter-date-range";
        const y = document.createElement("div");
        y.className = "tbw-filter-date-group";
        const x = document.createElement("label");
        x.textContent = "From", x.className = "tbw-filter-range-label";
        const C = document.createElement("input");
        C.type = "date", C.className = "tbw-filter-date-input", u2 && (C.min = u2), p2 && (C.max = p2), C.value = f2, y.appendChild(x), y.appendChild(C), w2.appendChild(y);
        const E = document.createElement("span");
        E.className = "tbw-filter-range-separator", E.textContent = "–", w2.appendChild(E);
        const k = document.createElement("div");
        k.className = "tbw-filter-date-group";
        const S = document.createElement("label");
        S.textContent = "To", S.className = "tbw-filter-range-label";
        const F = document.createElement("input");
        F.type = "date", F.className = "tbw-filter-date-input", u2 && (F.min = u2), p2 && (F.max = p2), F.value = m2, k.appendChild(S), k.appendChild(F), w2.appendChild(k), e3.appendChild(w2);
        const A = document.createElement("label");
        A.className = "tbw-filter-blank-option";
        const N = document.createElement("input");
        N.type = "checkbox", N.className = "tbw-filter-blank-checkbox", N.checked = v2;
        const T = document.createTextNode("Show only blank");
        A.appendChild(N), A.appendChild(T);
        const R = (e4) => {
          C.disabled = e4, F.disabled = e4, w2.classList.toggle("tbw-filter-disabled", e4);
        };
        R(v2), N.addEventListener("change", () => {
          R(N.checked);
        }), e3.appendChild(A);
        const P = document.createElement("div");
        P.className = "tbw-filter-buttons";
        const L = document.createElement("button");
        L.className = "tbw-filter-apply-btn", L.textContent = "Apply", L.addEventListener("click", () => {
          if (N.checked) return void t3.applyTextFilter("blank", "");
          const e4 = C.value, r4 = F.value;
          e4 && r4 ? t3.applyTextFilter("between", e4, r4) : e4 ? t3.applyTextFilter("greaterThanOrEqual", e4) : r4 ? t3.applyTextFilter("lessThanOrEqual", r4) : t3.clearFilter();
        }), P.appendChild(L);
        const I = document.createElement("button");
        I.className = "tbw-filter-clear-btn", I.textContent = "Clear Filter", I.addEventListener("click", () => {
          t3.clearFilter();
        }), P.appendChild(I), e3.appendChild(P);
      })(i3, o2, n2, this.filters) : m(i3, o2, n2, a2, { caseSensitive: this.config.caseSensitive, debounceMs: this.config.debounceMs }, this.searchText);
    }
  }
  setupPanelCloseHandler(e2, t2) {
    this.panelAbortController = new AbortController(), setTimeout(() => {
      document.addEventListener("click", (r2) => {
        e2.contains(r2.target) || r2.target === t2 || this.closeFilterPanel();
      }, { signal: this.panelAbortController?.signal });
    }, 0);
  }
  closeFilterPanel() {
    const e2 = this.panelElement;
    e2 && (e2.remove(), this.panelElement = null), this.panelAnchorElement && (this.panelAnchorElement.style.anchorName = "", this.panelAnchorElement = null), this.openPanelField = null, this.panelAbortController?.abort(), this.panelAbortController = null;
  }
  static supportsAnchorPositioning = null;
  static checkAnchorPositioningSupport() {
    return null === _w.supportsAnchorPositioning && (_w.supportsAnchorPositioning = CSS.supports("anchor-name", "--test")), _w.supportsAnchorPositioning;
  }
  positionPanel(e2, t2) {
    const r2 = t2.closest(".cell") ?? t2;
    if (r2.style.anchorName = "--tbw-filter-anchor", this.panelAnchorElement = r2, _w.checkAnchorPositioningSupport()) return void requestAnimationFrame(() => {
      const t3 = e2.getBoundingClientRect(), i4 = r2.getBoundingClientRect();
      t3.top < i4.top && e2.classList.add("tbw-filter-panel-above");
    });
    const i3 = r2.getBoundingClientRect();
    e2.style.position = "fixed", e2.style.top = `${i3.bottom + 4}px`, e2.style.left = `${i3.left}px`, requestAnimationFrame(() => {
      const t3 = e2.getBoundingClientRect();
      t3.right > window.innerWidth - 8 && (e2.style.left = i3.right - t3.width + "px"), t3.bottom > window.innerHeight - 8 && (e2.style.top = i3.top - t3.height - 4 + "px", e2.classList.add("tbw-filter-panel-above"));
    });
  }
  applySetFilter(e2, t2, r2) {
    if (this.excludedValues.set(e2, new Set(t2)), 0 === t2.length) this.filters.delete(e2);
    else {
      const i3 = this.filters.get(e2);
      if ("in" === i3?.operator) {
        const i4 = this.getUniqueValues(e2), n2 = new Set(t2), l2 = i4.filter((e3) => !n2.has(e3));
        this.filters.set(e2, __spreadValues({ field: e2, type: "set", operator: "in", value: l2 }, void 0 !== r2 && { valueTo: r2 }));
      } else this.filters.set(e2, __spreadValues({ field: e2, type: "set", operator: "notIn", value: t2 }, void 0 !== r2 && { valueTo: r2 }));
    }
    this.applyFiltersInternal();
  }
  applyTextFilter(e2, t2, r2, i3) {
    this.filters.set(e2, { field: e2, type: "text", operator: t2, value: r2, valueTo: i3 }), this.applyFiltersInternal();
  }
  applyFiltersInternal(e2) {
    this.cachedResult = null, this.cacheKey = null, this.cachedInputSpot = null;
    const t2 = [...this.filters.values()];
    if (this.config.filterHandler) {
      this.gridElement.setAttribute("aria-busy", "true");
      const r2 = this.config.filterHandler(t2, this.sourceRows), i3 = (r3) => {
        this.gridElement.removeAttribute("aria-busy"), this.cachedResult = r3, this.grid.rows = r3, e2 || (this.emit("filter-change", { filters: t2, filteredRowCount: r3.length, selected: this.computeSelected() }), this.config.trackColumnState && this.grid.requestStateChange?.()), this.emitPluginEvent("filter-applied", { filters: t2 }), this.requestRender();
      };
      return void (r2 && "function" == typeof r2.then ? r2.then(i3) : i3(r2));
    }
    e2 || (this.emit("filter-change", { filters: t2, filteredRowCount: 0, selected: this.computeSelected() }), this.config.trackColumnState && this.grid.requestStateChange?.()), this.emitPluginEvent("filter-applied", { filters: t2 }), this.requestRender();
  }
  getColumnState(e2) {
    if (!this.config.trackColumnState) return;
    const t2 = this.filters.get(e2);
    return t2 ? { filter: { type: t2.type, operator: t2.operator, value: t2.value, valueTo: t2.valueTo } } : void 0;
  }
  applyColumnState(e2, t2) {
    if (!this.config.trackColumnState) return;
    if (!t2.filter) return void this.filters.delete(e2);
    const r2 = { field: e2, type: t2.filter.type, operator: t2.filter.operator, value: t2.filter.value, valueTo: t2.filter.valueTo };
    this.filters.set(e2, r2), this.cachedResult = null, this.cacheKey = null, this.cachedInputSpot = null;
  }
};

// node_modules/@toolbox-web/grid/lib/features/filtering.js
i("filtering", (e2) => "boolean" == typeof e2 ? new w() : new w(e2 ?? void 0));

// node_modules/@toolbox-web/grid-angular/fesm2022/toolbox-web-grid-angular-features-filtering.mjs
function injectGridFiltering() {
  const elementRef = inject(ElementRef);
  const destroyRef = inject(DestroyRef);
  const isReady = signal(false, ...ngDevMode ? [{ debugName: "isReady" }] : (
    /* istanbul ignore next */
    []
  ));
  let cachedGrid = null;
  let readyPromiseStarted = false;
  const getGrid = () => {
    if (cachedGrid)
      return cachedGrid;
    const grid = elementRef.nativeElement.querySelector("tbw-grid");
    if (grid) {
      cachedGrid = grid;
      if (!readyPromiseStarted) {
        readyPromiseStarted = true;
        grid.ready?.().then(() => isReady.set(true));
      }
    }
    return grid;
  };
  const getPlugin = () => {
    return getGrid()?.getPluginByName("filtering");
  };
  afterNextRender(() => {
    if (getGrid())
      return;
    const host = elementRef.nativeElement;
    const observer = new MutationObserver(() => {
      if (getGrid())
        observer.disconnect();
    });
    observer.observe(host, { childList: true, subtree: true });
    destroyRef.onDestroy(() => observer.disconnect());
  });
  return {
    isReady: isReady.asReadonly(),
    setFilter: (field, filter, options) => {
      const plugin = getPlugin();
      if (!plugin) {
        console.warn(`[tbw-grid:filtering] FilteringPlugin not found.

  → Enable filtering on the grid:
    <tbw-grid [filtering]="true" />`);
        return;
      }
      plugin.setFilter(field, filter, options);
    },
    getFilter: (field) => getPlugin()?.getFilter(field),
    getFilters: () => getPlugin()?.getFilters() ?? [],
    setFilterModel: (filters, options) => {
      const plugin = getPlugin();
      if (!plugin) {
        console.warn(`[tbw-grid:filtering] FilteringPlugin not found.

  → Enable filtering on the grid:
    <tbw-grid [filtering]="true" />`);
        return;
      }
      plugin.setFilterModel(filters, options);
    },
    clearAllFilters: (options) => {
      const plugin = getPlugin();
      if (!plugin) {
        console.warn(`[tbw-grid:filtering] FilteringPlugin not found.

  → Enable filtering on the grid:
    <tbw-grid [filtering]="true" />`);
        return;
      }
      plugin.clearAllFilters(options);
    },
    clearFieldFilter: (field, options) => {
      const plugin = getPlugin();
      if (!plugin) {
        console.warn(`[tbw-grid:filtering] FilteringPlugin not found.

  → Enable filtering on the grid:
    <tbw-grid [filtering]="true" />`);
        return;
      }
      plugin.clearFieldFilter(field, options);
    },
    isFieldFiltered: (field) => getPlugin()?.isFieldFiltered(field) ?? false,
    getFilteredRowCount: () => getPlugin()?.getFilteredRowCount() ?? 0,
    getUniqueValues: (field) => getPlugin()?.getUniqueValues(field) ?? [],
    getStaleFilters: () => getPlugin()?.getStaleFilters() ?? [],
    getBlankMode: (field) => getPlugin()?.getBlankMode(field) ?? "all",
    toggleBlankFilter: (field, mode) => {
      const plugin = getPlugin();
      if (!plugin) {
        console.warn(`[tbw-grid:filtering] FilteringPlugin not found.

  → Enable filtering on the grid:
    <tbw-grid [filtering]="true" />`);
        return;
      }
      plugin.toggleBlankFilter(field, mode);
    }
  };
}
export {
  injectGridFiltering
};
//# sourceMappingURL=@toolbox-web_grid-angular_features_filtering.js.map
