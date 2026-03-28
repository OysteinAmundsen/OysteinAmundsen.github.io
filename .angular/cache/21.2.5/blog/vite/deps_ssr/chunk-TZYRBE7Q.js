import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  __spreadProps,
  __spreadValues
} from "./chunk-6DU2HRTW.js";

// node_modules/@toolbox-web/grid/index.js
function e(e3, t3) {
  const o2 = e3.querySelector?.(".tbw-sr-only");
  o2 && (o2.textContent = "", requestAnimationFrame(() => {
    o2.textContent = t3;
  }));
}
var t = { STRETCH: "stretch", FIXED: "fixed" };
var o = { mode: "reduced-motion", duration: 200, easing: "ease-out" };
var i = '<svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>';
var n = { expand: "▶", collapse: "▼", sortAsc: "▲", sortDesc: "▼", sortNone: "⇅", submenuArrow: "▶", dragHandle: "⋮⋮", toolPanel: "☰", filter: i, filterActive: i, print: "🖨️" };
function r(e3, t3) {
  return `[tbw-grid${e3 ? `#${e3}` : ""}${t3 ? `:${t3}` : ""}]`;
}
var s = "TBW041";
var l = "TBW061";
var a = "TBW062";
function C(e3, t3, o2, i3) {
  return `${r(o2, i3)} ${e3}: ${t3}

  → More info: ${(function(e4) {
    return `https://toolboxjs.com/grid/errors#${e4.toLowerCase()}`;
  })(e3)}`;
}
function _(e3, t3, o2, i3) {
  throw new Error(C(e3, t3, o2, i3));
}
function y(e3, t3, o2, i3) {
  console.warn(C(e3, t3, o2, i3));
}
function R(e3, t3, o2, i3) {
  console.debug(C(e3, t3, o2, i3));
}
function S(e3, t3, o2, i3) {
  console.error(C(e3, t3, o2, i3));
}
function E(e3, t3) {
  if (!(e3 && e3.length || t3 && t3.length)) return [];
  if (!e3 || !e3.length) return t3 || [];
  if (!t3 || !t3.length) return e3;
  const o2 = {};
  t3.forEach((e4) => {
    const t4 = o2[e4.field];
    if (t4) {
      e4.header && !t4.header && (t4.header = e4.header), e4.type && !t4.type && (t4.type = e4.type), e4.sortable && (t4.sortable = true), e4.editable && (t4.editable = true), e4.resizable && (t4.resizable = true), null != e4.width && null == t4.width && (t4.width = e4.width), null != e4.minWidth && null == t4.minWidth && (t4.minWidth = e4.minWidth), e4.__viewTemplate && (t4.__viewTemplate = e4.__viewTemplate), e4.__editorTemplate && (t4.__editorTemplate = e4.__editorTemplate), e4.__headerTemplate && (t4.__headerTemplate = e4.__headerTemplate);
      const o3 = e4.renderer || e4.viewRenderer, i4 = t4.renderer || t4.viewRenderer;
      o3 && !i4 && (t4.viewRenderer = o3, e4.renderer && (t4.renderer = o3)), e4.editor && !t4.editor && (t4.editor = e4.editor);
    } else o2[e4.field] = __spreadValues({}, e4);
  });
  const i3 = e3.map((e4) => {
    const t4 = o2[e4.field];
    if (!t4) return e4;
    const i4 = __spreadValues({}, e4);
    t4.header && !i4.header && (i4.header = t4.header), t4.type && !i4.type && (i4.type = t4.type), i4.sortable = e4.sortable || t4.sortable, true !== e4.resizable && true !== t4.resizable || (i4.resizable = true), i4.editable = e4.editable || t4.editable, null != t4.width && null == i4.width && (i4.width = t4.width), null != t4.minWidth && null == i4.minWidth && (i4.minWidth = t4.minWidth), t4.__viewTemplate && (i4.__viewTemplate = t4.__viewTemplate), t4.__editorTemplate && (i4.__editorTemplate = t4.__editorTemplate), t4.__headerTemplate && (i4.__headerTemplate = t4.__headerTemplate);
    const n3 = t4.renderer || t4.viewRenderer, r3 = i4.renderer || i4.viewRenderer;
    return n3 && !r3 && (i4.viewRenderer = n3, t4.renderer && (i4.renderer = n3)), t4.editor && !i4.editor && (i4.editor = t4.editor), delete o2[e4.field], i4;
  });
  return Object.keys(o2).forEach((e4) => i3.push(o2[e4])), i3;
}
function x(e3, t3) {
  try {
    e3.part?.add?.(t3);
  } catch {
  }
  const o2 = e3.getAttribute("part");
  o2 ? o2.split(/\s+/).includes(t3) || e3.setAttribute("part", o2 + " " + t3) : e3.setAttribute("part", t3);
}
function A(e3) {
  const o2 = e3.effectiveConfig?.fitMode || e3.fitMode || t.STRETCH;
  if (o2 !== t.STRETCH && o2 !== t.FIXED) return;
  if (e3.__didInitialAutoSize) return;
  if (!e3.isConnected) return;
  const i3 = Array.from(e3._headerRowEl?.children || []);
  if (!i3.length) return;
  let n3 = false;
  e3._visibleColumns.forEach((t3, o3) => {
    if (t3.width) return;
    const r3 = i3[o3];
    let s3 = r3 ? r3.scrollWidth : 0;
    for (const i4 of e3._rowPool) {
      const e4 = i4.children[o3];
      if (e4) {
        const t4 = e4.scrollWidth;
        t4 > s3 && (s3 = t4);
      }
    }
    s3 > 0 && (t3.width = s3 + 2, t3.__autoSized = true, n3 = true);
  }), n3 && P(e3), e3.__didInitialAutoSize = true;
}
var T = /^(?:\d+(?:\.\d+)?(?:px|%|fr|em|rem|ch|vw|vh|vmin|vmax)|calc\(.+\)|min-content|max-content|minmax\(.+\)|fit-content\(.+\)|auto)$/i;
function H(e3, t3) {
  return "number" == typeof e3 ? `${e3}px` : (T.test(e3) || y("TBW050", `Column '${t3 ?? "?"}' has an invalid CSS width value: '${e3}'. Expected a number (px) or a valid CSS unit string (e.g. '30%', '2fr', 'calc(...)').`), e3);
}
function P(e3) {
  const o2 = e3.effectiveConfig?.fitMode || e3.fitMode || t.STRETCH;
  e3._gridTemplate = o2 === t.STRETCH ? e3._visibleColumns.map((e4) => {
    if (null != e4.width) return H(e4.width, e4.field);
    const t3 = e4.minWidth;
    return null != t3 ? `minmax(${t3}px, 1fr)` : "1fr";
  }).join(" ").trim() : e3._visibleColumns.map((e4) => null != e4.width ? H(e4.width, e4.field) : "max-content").join(" "), e3.style.setProperty("--tbw-column-template", e3._gridTemplate);
}
var M = /{{\s*([^}]+)\s*}}/g;
var L = "__DG_EMPTY__";
var O = /^[\w$. '?+\-*/%:()!<>=,&|]+$/;
var D = /__(proto|defineGetter|defineSetter)|constructor|window|globalThis|global|process|Function|import|eval|Reflect|Proxy|Error|arguments|document|location|cookie|localStorage|sessionStorage|indexedDB|fetch|XMLHttpRequest|WebSocket|Worker|SharedWorker|ServiceWorker|opener|parent|top|frames|self|this\b/;
var I = /* @__PURE__ */ new Set(["script", "iframe", "object", "embed", "form", "input", "button", "textarea", "select", "link", "meta", "base", "style", "template", "slot", "portal", "frame", "frameset", "applet", "noscript", "noembed", "plaintext", "xmp", "listing"]);
var k = /^on\w+$/i;
var z = /* @__PURE__ */ new Set(["href", "src", "action", "formaction", "data", "srcdoc", "xlink:href", "poster", "srcset"]);
var q = /^\s*(javascript|vbscript|data|blob):/i;
function N(e3) {
  if (!e3 || "string" != typeof e3) return "";
  if (-1 === e3.indexOf("<")) return e3;
  const t3 = document.createElement("template");
  return t3.innerHTML = e3, (function(e4) {
    const t4 = [], o2 = e4.querySelectorAll("*");
    for (const i3 of o2) {
      const e5 = i3.tagName.toLowerCase();
      if (I.has(e5)) {
        t4.push(i3);
        continue;
      }
      if ("svg" === e5 || "http://www.w3.org/2000/svg" === i3.namespaceURI) {
        if (Array.from(i3.attributes).some((e6) => k.test(e6.name) || "href" === e6.name || "xlink:href" === e6.name)) {
          t4.push(i3);
          continue;
        }
      }
      const o3 = [];
      for (const t5 of i3.attributes) {
        const e6 = t5.name.toLowerCase();
        k.test(e6) ? o3.push(t5.name) : (z.has(e6) && q.test(t5.value) || "style" === e6 && /expression\s*\(|javascript:|behavior\s*:/i.test(t5.value)) && o3.push(t5.name);
      }
      o3.forEach((e6) => i3.removeAttribute(e6));
    }
    t4.forEach((e5) => e5.remove());
  })(t3.content), t3.innerHTML;
}
function W(e3, t3) {
  if (!e3 || -1 === e3.indexOf("{{")) return e3;
  const o2 = [], i3 = e3.replace(M, (e4, i4) => {
    const n4 = (function(e5, t4) {
      if (e5 = (e5 || "").trim(), !e5) return L;
      if ($.test(e5)) return L;
      if ("value" === e5) return null == t4.value ? L : String(t4.value);
      if (e5.startsWith("row.") && !/[()?]/.test(e5) && !e5.includes(":")) {
        const o4 = e5.slice(4), i5 = t4.row ? t4.row[o4] : void 0;
        return null == i5 ? L : String(i5);
      }
      if (e5.length > 80) return L;
      if (!O.test(e5) || D.test(e5)) return L;
      const o3 = e5.match(/\./g);
      if (o3 && o3.length > 1) return L;
      try {
        const o4 = new Function("value", "row", `return (${e5});`)(t4.value, t4.row), i5 = null == o4 ? "" : String(o4);
        return $.test(i5) ? L : i5 || L;
      } catch {
        return L;
      }
    })(i4, t3);
    return o2.push({ expr: i4.trim(), result: n4 }), n4;
  }), n3 = (r3 = i3) ? r3.replace(new RegExp(L, "g"), "").replace(/Reflect\.[^<>{}\s]+|\bProxy\b|ownKeys\([^)]*\)/g, "") : r3;
  var r3;
  const s3 = o2.length && o2.every((e4) => "" === e4.result || e4.result === L);
  return $.test(e3) || s3 ? "" : n3;
}
var $ = /Reflect|Proxy|ownKeys/;
function F(e3) {
  if ($.test(e3.textContent || "")) {
    for (const t3 of e3.childNodes) t3.nodeType === Node.TEXT_NODE && $.test(t3.textContent || "") && (t3.textContent = "");
    $.test(e3.textContent || "") && (e3.textContent = "");
  }
}
function B(e3) {
  const t3 = $.test(e3), o2 = (o3) => {
    if (t3) return "";
    return W(e3, o3);
  };
  return o2.__blocked = t3, o2;
}
function V(e3, t3) {
  return null == e3 && null == t3 ? 0 : null == e3 ? -1 : null == t3 || e3 > t3 ? 1 : e3 < t3 ? -1 : 0;
}
function U(e3, t3, o2) {
  const i3 = o2.find((e4) => e4.field === t3.field), n3 = i3?.sortComparator ?? V, { field: r3, direction: s3 } = t3;
  return [...e3].sort((e4, t4) => n3(e4[r3], t4[r3], e4, t4) * s3);
}
function G(t3, o2, i3, n3) {
  t3._rows = o2, t3.__rowRenderEpoch++, t3._rowPool.forEach((e3) => e3.__epoch = -1), ee(t3), t3.refreshVirtualWindow(true), t3.dispatchEvent(new CustomEvent("sort-change", { detail: { field: i3.field, direction: n3 } })), e(t3, `Sorted by ${i3.header ?? i3.field}, ${1 === n3 ? "ascending" : "descending"}`), t3.requestStateChange?.();
}
function j(t3, o2) {
  if (t3._sortState && t3._sortState.field === o2.field) if (1 === t3._sortState.direction) X(t3, o2, -1);
  else {
    t3._sortState = null, t3.__rowRenderEpoch++, t3._rowPool.forEach((e3) => e3.__epoch = -1), t3._rows = t3.__originalOrder.slice(), ee(t3);
    const i3 = t3._headerRowEl?.querySelectorAll('[role="columnheader"].sortable');
    i3?.forEach((e3) => {
      e3.getAttribute("aria-sort") && ("ascending" !== e3.getAttribute("aria-sort") && "descending" !== e3.getAttribute("aria-sort") || t3._sortState) || e3.setAttribute("aria-sort", "none");
    }), t3.refreshVirtualWindow(true), t3.dispatchEvent(new CustomEvent("sort-change", { detail: { field: o2.field, direction: 0 } })), e(t3, "Sort cleared"), t3.requestStateChange?.();
  }
  else t3._sortState || (t3.__originalOrder = t3._rows.slice()), X(t3, o2, 1);
}
function X(e3, t3, o2) {
  e3._sortState = { field: t3.field, direction: o2 };
  const i3 = { field: t3.field, direction: o2 }, n3 = e3._columns, r3 = (e3.effectiveConfig?.sortHandler ?? U)(e3._rows, i3, n3);
  r3 && "function" == typeof r3.then ? r3.then((i4) => {
    G(e3, i4, t3, o2);
  }) : G(e3, r3, t3, o2);
}
function Y(e3, t3) {
  return false !== e3.effectiveConfig?.sortable && true === t3.sortable;
}
function K(e3, t3) {
  return false !== e3.effectiveConfig?.resizable && false !== t3.resizable;
}
function Z(e3, t3) {
  const o2 = document.createElement("span");
  x(o2, "sort-indicator");
  const i3 = e3._sortState?.field === t3.field ? e3._sortState.direction : 0, r3 = __spreadValues(__spreadValues({}, n), e3.icons);
  return (function(e4, t4) {
    "string" == typeof t4 ? e4.textContent = t4 : t4 instanceof HTMLElement && (e4.innerHTML = "", e4.appendChild(t4.cloneNode(true)));
  })(o2, 1 === i3 ? r3.sortAsc : -1 === i3 ? r3.sortDesc : r3.sortNone), o2;
}
function Q(e3, t3, o2) {
  const i3 = document.createElement("div");
  return i3.className = "resize-handle", i3.setAttribute("aria-hidden", "true"), i3.addEventListener("mousedown", (i4) => {
    i4.stopPropagation(), i4.preventDefault(), e3._resizeController.start(i4, t3, o2);
  }), i3.addEventListener("dblclick", (o3) => {
    o3.stopPropagation(), o3.preventDefault(), e3._resizeController.resetColumn(t3);
  }), i3;
}
function J(e3, t3, o2, i3) {
  i3.classList.add("sortable"), i3.tabIndex = 0;
  const n3 = e3._sortState?.field === t3.field ? e3._sortState.direction : 0;
  i3.setAttribute("aria-sort", 0 === n3 ? "none" : 1 === n3 ? "ascending" : "descending"), i3.addEventListener("click", (o3) => {
    e3._resizeController?.isResizing || e3._dispatchHeaderClick?.(o3, t3, i3) || j(e3, t3);
  }), i3.addEventListener("keydown", (o3) => {
    if ("Enter" === o3.key || " " === o3.key) {
      if (o3.preventDefault(), e3._dispatchHeaderClick?.(o3, t3, i3)) return;
      j(e3, t3);
    }
  });
}
function ee(e3) {
  e3._headerRowEl = e3.findHeaderRow();
  const t3 = e3._headerRowEl;
  t3 && (t3.innerHTML = "", e3._visibleColumns.forEach((o2, i3) => {
    const n3 = document.createElement("div");
    n3.className = "cell", x(n3, "header-cell"), n3.setAttribute("role", "columnheader"), n3.setAttribute("aria-colindex", String(i3 + 1)), n3.setAttribute("data-field", o2.field), n3.setAttribute("data-col", String(i3)), o2.type && n3.setAttribute("data-type", o2.type);
    const r3 = o2.header ?? o2.field, s3 = e3._sortState?.field === o2.field ? e3._sortState.direction : 0, l3 = 1 === s3 ? "asc" : -1 === s3 ? "desc" : null;
    if (o2.headerRenderer) {
      const t4 = { column: o2, value: r3, sortState: l3, filterActive: false, cellEl: n3, renderSortIcon: () => Y(e3, o2) ? Z(e3, o2) : null, renderFilterButton: () => null }, s4 = o2.headerRenderer(t4);
      !(function(e4, t5) {
        if (null != t5) if ("string" == typeof t5) {
          const o3 = document.createElement("span");
          for (o3.innerHTML = N(t5); o3.firstChild; ) e4.appendChild(o3.firstChild);
        } else t5 instanceof Node && e4.appendChild(t5);
      })(n3, s4), Y(e3, o2) && J(e3, o2, 0, n3), K(e3, o2) && (n3.classList.add("resizable"), n3.appendChild(Q(e3, i3, n3)));
    } else if (o2.headerLabelRenderer) {
      const t4 = { column: o2, value: r3 }, s4 = o2.headerLabelRenderer(t4), l4 = document.createElement("span");
      null == s4 ? l4.textContent = r3 : "string" == typeof s4 ? l4.innerHTML = N(s4) : s4 instanceof Node && l4.appendChild(s4), n3.appendChild(l4), Y(e3, o2) && (J(e3, o2, 0, n3), n3.appendChild(Z(e3, o2))), K(e3, o2) && (n3.classList.add("resizable"), n3.appendChild(Q(e3, i3, n3)));
    } else if (o2.__headerTemplate) Array.from(o2.__headerTemplate.childNodes).forEach((e4) => n3.appendChild(e4.cloneNode(true))), Y(e3, o2) && (J(e3, o2, 0, n3), n3.appendChild(Z(e3, o2))), K(e3, o2) && (n3.classList.add("resizable"), n3.appendChild(Q(e3, i3, n3)));
    else {
      const t4 = document.createElement("span");
      t4.textContent = r3, n3.appendChild(t4), Y(e3, o2) && (J(e3, o2, 0, n3), n3.appendChild(Z(e3, o2))), K(e3, o2) && (n3.classList.add("resizable"), n3.appendChild(Q(e3, i3, n3)));
    }
    t3.appendChild(n3);
  }), t3.querySelectorAll(".cell.sortable").forEach((e4) => {
    e4.getAttribute("aria-sort") || e4.setAttribute("aria-sort", "none");
  }), t3.children.length > 0 ? (t3.setAttribute("role", "row"), t3.setAttribute("aria-rowindex", "1")) : (t3.removeAttribute("role"), t3.removeAttribute("aria-rowindex")));
}
function te(e3, t3) {
  const o2 = e3[0] || {}, i3 = Object.keys(o2).map((e4) => {
    const t4 = o2[e4], i4 = null == (n4 = t4) ? "string" : "number" == typeof n4 ? "number" : "boolean" == typeof n4 ? "boolean" : n4 instanceof Date || "string" == typeof n4 && /\d{4}-\d{2}-\d{2}/.test(n4) && !isNaN(Date.parse(n4)) ? "date" : "string";
    var n4;
    return { field: e4, header: e4.charAt(0).toUpperCase() + e4.slice(1), type: i4 };
  }), n3 = {};
  return i3.forEach((e4) => {
    n3[e4.field] = e4.type || "string";
  }), { columns: i3, typeMap: n3 };
}
var oe;
var ie = ((oe = ie || {})[oe.STYLE = 1] = "STYLE", oe[oe.VIRTUALIZATION = 2] = "VIRTUALIZATION", oe[oe.HEADER = 3] = "HEADER", oe[oe.ROWS = 4] = "ROWS", oe[oe.COLUMNS = 5] = "COLUMNS", oe[oe.FULL = 6] = "FULL", oe);
var ne = class {
  #e;
  #t = 0;
  #o = 0;
  #i = null;
  #n = null;
  #r = null;
  #s = false;
  constructor(e3) {
    this.#e = e3;
  }
  requestPhase(e3, t3) {
    e3 > this.#t && (this.#t = e3), 0 === this.#o && (this.#l(), this.#o = requestAnimationFrame(() => this.#a()));
  }
  whenReady() {
    return this.#i ? this.#i : Promise.resolve();
  }
  setInitialReadyResolver(e3) {
    this.#r = e3;
  }
  cancel() {
    0 !== this.#o && (cancelAnimationFrame(this.#o), this.#o = 0), this.#t = 0, this.#n && (this.#n(), this.#n = null, this.#i = null);
  }
  get isPending() {
    return 0 !== this.#t;
  }
  get pendingPhase() {
    return this.#t;
  }
  #l() {
    this.#i || (this.#i = new Promise((e3) => {
      this.#n = e3;
    }));
  }
  #a() {
    if (this.#o = 0, !this.#e._schedulerIsConnected) return this.#t = 0, void (this.#n && (this.#n(), this.#n = null, this.#i = null));
    const e3 = this.#t;
    this.#t = 0, e3 >= 5 && this.#e._schedulerMergeConfig(), e3 >= 4 && this.#e._schedulerProcessRows(), e3 >= 5 && (this.#e._schedulerProcessColumns(), this.#e._schedulerUpdateTemplate()), e3 >= 3 && this.#e._schedulerRenderHeader(), e3 >= 2 && this.#e.refreshVirtualWindow(true, true), e3 >= 1 && this.#e._schedulerAfterRender(), !this.#s && this.#r && (this.#s = true, this.#r()), this.#n && (this.#n(), this.#n = null, this.#i = null);
  }
};
var re = class {
  #c;
  #d;
  #h;
  #u;
  #g;
  #f = {};
  #p = {};
  #w = true;
  #b = [];
  #m;
  #v;
  #C;
  #_;
  #e;
  #y;
  constructor(e3) {
    this.#e = e3;
  }
  get original() {
    return this.#f;
  }
  get effective() {
    return this.#p;
  }
  get columns() {
    return this.#p.columns ?? [];
  }
  set columns(e3) {
    this.#p.columns = e3;
  }
  get lightDomColumnsCache() {
    return this.#u;
  }
  set lightDomColumnsCache(e3) {
    this.#u = e3;
  }
  get originalColumnNodes() {
    return this.#g;
  }
  set originalColumnNodes(e3) {
    this.#g = e3;
  }
  get lightDomTitle() {
    return this.#y;
  }
  set lightDomTitle(e3) {
    this.#y = e3;
  }
  get initialColumnState() {
    return this.#_;
  }
  set initialColumnState(e3) {
    this.#_ = e3;
  }
  get sourcesChanged() {
    return this.#w;
  }
  markSourcesChanged() {
    this.#w = true;
  }
  setGridConfig(e3) {
    this.#c = e3, this.#w = true, this.#u = void 0;
  }
  getGridConfig() {
    return this.#c;
  }
  setColumns(e3) {
    this.#d = e3, this.#w = true;
  }
  getColumns() {
    return this.#d;
  }
  setFitMode(e3) {
    this.#h = e3, this.#w = true;
  }
  getFitMode() {
    return this.#h;
  }
  merge() {
    const e3 = (this.#p.columns?.length ?? 0) > 0;
    if (!this.#w && e3) return;
    const t3 = this.#R();
    this.#w = false, this.#f = t3, Object.freeze(this.#f), this.#f.columns && Object.freeze(this.#f.columns), this.#p = this.#S(this.#f), this.#E();
  }
  #S(e3) {
    const t3 = __spreadValues({}, e3);
    return e3.columns && (t3.columns = e3.columns.map((e4) => __spreadValues({}, e4))), e3.shell && (t3.shell = __spreadProps(__spreadValues({}, e3.shell), { header: e3.shell.header ? __spreadValues({}, e3.shell.header) : void 0, toolPanel: e3.shell.toolPanel ? __spreadValues({}, e3.shell.toolPanel) : void 0, toolPanels: e3.shell.toolPanels?.map((e4) => __spreadValues({}, e4)), headerContents: e3.shell.headerContents?.map((e4) => __spreadValues({}, e4)) })), t3;
  }
  #E() {
    const e3 = this.#p;
    if (this.#x(), "number" == typeof e3.rowHeight && e3.rowHeight > 0 && (this.#e._virtualization.rowHeight = e3.rowHeight), "fixed" === e3.fitMode) {
      this.columns.forEach((e4) => {
        null == e4.width && (e4.width = 80);
      });
    }
    this.#e._applyAnimationConfig(e3);
  }
  #x() {
    const e3 = this.#p.typeDefaults;
    if (!e3) return;
    const t3 = this.columns;
    for (const o2 of t3) {
      if (!o2.type) continue;
      const t4 = e3[o2.type];
      t4 && (o2.renderer || o2.viewRenderer || !t4.renderer || (o2.renderer = t4.renderer), !o2.format && t4.format && (o2.format = t4.format), !o2.editor && t4.editor && (o2.editor = t4.editor), !o2.editorParams && t4.editorParams && (o2.editorParams = t4.editorParams));
    }
  }
  #R() {
    const e3 = this.#c ? __spreadValues({}, this.#c) : {}, t3 = Array.isArray(e3.columns) ? [...e3.columns] : [], o2 = (this.#u ?? []).map((e4) => __spreadValues({}, e4));
    let i3 = E(t3, o2);
    this.#d && this.#d.length && (i3 = E(this.#d, o2));
    const n3 = this.#e.sourceRows;
    if (0 === i3.length && n3.length) {
      i3 = te(n3).columns;
    }
    return i3.length && (i3.forEach((e4) => {
      void 0 === e4.sortable && (e4.sortable = true), void 0 === e4.resizable && (e4.resizable = true), void 0 === e4.__originalWidth && "number" == typeof e4.width && (e4.__originalWidth = e4.width);
    }), i3.forEach((e4) => {
      e4.__viewTemplate && !e4.__compiledView && (e4.__compiledView = B(e4.__viewTemplate.innerHTML)), e4.__editorTemplate && !e4.__compiledEditor && (e4.__compiledEditor = B(e4.__editorTemplate.innerHTML));
    }), e3.columns = i3), this.#h && (e3.fitMode = this.#h), e3.fitMode || (e3.fitMode = "stretch"), this.#A(e3), e3.columnState && !this.#_ && (this.#_ = e3.columnState), e3;
  }
  #A(e3) {
    e3.shell = e3.shell ? __spreadValues({}, e3.shell) : {}, e3.shell.header = e3.shell.header ? __spreadValues({}, e3.shell.header) : {};
    const t3 = this.#e._shellState.lightDomTitle;
    t3 && (this.#y = t3), this.#y && !e3.shell.header.title && (e3.shell.header.title = this.#y);
    const o2 = this.#e._shellState.lightDomHeaderContent;
    o2?.length > 0 && (e3.shell.header.lightDomContent = o2), this.#e._shellState.hasToolButtonsContainer && (e3.shell.header.hasToolButtonsContainer = true);
    const i3 = this.#e._shellState.toolPanels;
    if (i3.size > 0) {
      const t4 = Array.from(i3.values());
      t4.sort((e4, t5) => (e4.order ?? 100) - (t5.order ?? 100)), e3.shell.toolPanels = t4;
    }
    const n3 = this.#e._shellState.headerContents;
    if (n3.size > 0) {
      const t4 = Array.from(n3.values());
      t4.sort((e4, t5) => (e4.order ?? 100) - (t5.order ?? 100)), e3.shell.headerContents = t4;
    }
    const r3 = this.#e._shellState.toolbarContents, s3 = Array.from(r3.values()), l3 = this.#c?.shell?.header?.toolbarContents ?? [], a3 = new Set(l3.map((e4) => e4.id)), c2 = [...l3];
    for (const d2 of s3) a3.has(d2.id) || c2.push(d2);
    c2.sort((e4, t4) => (e4.order ?? 0) - (t4.order ?? 0)), e3.shell.header.toolbarContents = c2;
  }
  collectState(e3) {
    const t3 = this.columns, o2 = this.#T();
    return { columns: t3.map((t4, i3) => {
      const n3 = { field: t4.field, order: i3, visible: !t4.hidden }, r3 = t4;
      void 0 !== r3.__renderedWidth ? n3.width = r3.__renderedWidth : void 0 !== t4.width && (n3.width = "string" == typeof t4.width ? parseFloat(t4.width) : t4.width);
      const s3 = o2.get(t4.field);
      s3 && (n3.sort = s3);
      for (const o3 of e3) if (o3.getColumnState) {
        const e4 = o3.getColumnState(t4.field);
        e4 && Object.assign(n3, e4);
      }
      return n3;
    }) };
  }
  applyState(e3, t3) {
    if (!e3.columns || 0 === e3.columns.length) return;
    const o2 = this.columns, i3 = new Map(e3.columns.map((e4) => [e4.field, e4])), n3 = o2.map((e4) => {
      const t4 = i3.get(e4.field);
      if (!t4) return e4;
      const o3 = __spreadValues({}, e4);
      return void 0 !== t4.width && (o3.width = t4.width, o3.__renderedWidth = t4.width), void 0 !== t4.visible && (o3.hidden = !t4.visible), o3;
    });
    n3.sort((e4, t4) => (i3.get(e4.field)?.order ?? 1 / 0) - (i3.get(t4.field)?.order ?? 1 / 0)), this.columns = n3;
    const r3 = e3.columns.filter((e4) => void 0 !== e4.sort).sort((e4, t4) => (e4.sort?.priority ?? 0) - (t4.sort?.priority ?? 0));
    if (r3.length > 0) {
      const e4 = r3[0];
      e4.sort && (this.#e._sortState = { field: e4.field, direction: "asc" === e4.sort.direction ? 1 : -1 });
    } else this.#e._sortState = null;
    for (const s3 of t3) if (s3.applyColumnState) for (const t4 of e3.columns) s3.applyColumnState(t4.field, t4);
  }
  resetState(e3) {
    this.#_ = void 0, this.#e._sortState = null, this.#p = this.#S(this.#f), this.#E();
    for (const t3 of e3) if (t3.applyColumnState) for (const e4 of this.columns) t3.applyColumnState(e4.field, { field: e4.field, order: 0, visible: true });
    this.requestStateChange(e3);
  }
  #T() {
    const e3 = /* @__PURE__ */ new Map(), t3 = this.#e._sortState;
    return t3 && e3.set(t3.field, { direction: 1 === t3.direction ? "asc" : "desc", priority: 0 }), e3;
  }
  requestStateChange(e3) {
    this.#v && clearTimeout(this.#v), this.#v = setTimeout(() => {
      this.#v = void 0;
      const t3 = this.collectState(e3);
      this.#e._emit("column-state-change", t3);
    }, 100);
  }
  setColumnVisible(e3, t3) {
    const o2 = this.columns, i3 = o2.find((t4) => t4.field === e3);
    if (!i3) return false;
    if (!t3 && i3.lockVisible) return false;
    if (!t3) {
      if (0 === o2.filter((t4) => !t4.hidden && t4.field !== e3).length) return false;
    }
    return !!i3.hidden != !t3 && (i3.hidden = !t3, this.#e._emit("column-visibility", { field: e3, visible: t3, visibleColumns: o2.filter((e4) => !e4.hidden).map((e4) => e4.field) }), this.#e._clearRowPool(), this.#e._setup(), true);
  }
  toggleColumnVisibility(e3) {
    const t3 = this.columns.find((t4) => t4.field === e3);
    return !!t3 && this.setColumnVisible(e3, !!t3.hidden);
  }
  isColumnVisible(e3) {
    const t3 = this.columns.find((t4) => t4.field === e3);
    return !!t3 && !t3.hidden;
  }
  showAllColumns() {
    const e3 = this.columns;
    e3.some((e4) => e4.hidden) && (e3.forEach((e4) => e4.hidden = false), this.#e._emit("column-visibility", { visibleColumns: e3.map((e4) => e4.field) }), this.#e._clearRowPool(), this.#e._setup());
  }
  getAllColumns() {
    return this.columns.map((e3) => ({ field: e3.field, header: e3.header || e3.field, visible: !e3.hidden, lockVisible: e3.lockVisible, utility: true === e3.meta?.utility }));
  }
  getColumnOrder() {
    return this.columns.map((e3) => e3.field);
  }
  setColumnOrder(e3) {
    if (!e3.length) return;
    const t3 = new Map(this.columns.map((e4) => [e4.field, e4])), o2 = [];
    for (const i3 of e3) {
      const e4 = t3.get(i3);
      e4 && (o2.push(e4), t3.delete(i3));
    }
    for (const i3 of t3.values()) o2.push(i3);
    this.columns = o2, ee(this.#e), P(this.#e), this.#e._requestSchedulerPhase(ie.VIRTUALIZATION, "configManager");
  }
  parseLightDomColumns(e3) {
    this.#u || (this.#g = Array.from(e3.querySelectorAll("tbw-grid-column")), this.#u = this.#g.length ? (function(e4) {
      return Array.from(e4.querySelectorAll("tbw-grid-column")).map((e5) => {
        const t3 = e5.getAttribute("field") || "";
        if (!t3) return null;
        const o2 = e5.getAttribute("type") || void 0, i3 = { field: t3, type: o2 && (/* @__PURE__ */ new Set(["number", "string", "date", "boolean", "select"])).has(o2) ? o2 : void 0, header: e5.getAttribute("header") || void 0, sortable: e5.hasAttribute("sortable"), editable: e5.hasAttribute("editable") }, n3 = e5.getAttribute("width");
        if (n3) {
          const e6 = parseFloat(n3);
          !isNaN(e6) && /^\d+(\.\d+)?$/.test(n3.trim()) ? i3.width = e6 : i3.width = n3;
        }
        const r3 = e5.getAttribute("minWidth") || e5.getAttribute("min-width");
        if (r3) {
          const e6 = parseFloat(r3);
          isNaN(e6) || (i3.minWidth = e6);
        }
        e5.hasAttribute("resizable") && (i3.resizable = true), e5.hasAttribute("sizable") && (i3.resizable = true);
        const s3 = e5.getAttribute("editor"), l3 = e5.getAttribute("renderer");
        s3 && (i3.__editorName = s3), l3 && (i3.__rendererName = l3);
        const a3 = e5.getAttribute("options");
        a3 && (i3.options = a3.split(",").map((e6) => {
          const [t4, o3] = e6.includes(":") ? e6.split(":") : [e6.trim(), e6.trim()];
          return { value: t4.trim(), label: o3?.trim() || t4.trim() };
        }));
        const c2 = e5.querySelector("tbw-grid-column-view"), d2 = e5.querySelector("tbw-grid-column-editor"), h = e5.querySelector("tbw-grid-column-header");
        c2 && (i3.__viewTemplate = c2), d2 && (i3.__editorTemplate = d2), h && (i3.__headerTemplate = h);
        const u2 = globalThis.DataGridElement, g = u2?.getAdapters?.() ?? [], f2 = c2 ?? e5, p = g.find((e6) => e6.canHandle(f2));
        if (p) {
          const e6 = p.createRenderer(f2);
          e6 && (i3.viewRenderer = e6);
        }
        const w2 = d2 ?? e5, b = g.find((e6) => e6.canHandle(w2));
        if (b) {
          const e6 = b.createEditor(w2);
          e6 && (i3.editor = e6);
        }
        return i3;
      }).filter((e5) => !!e5);
    })(e3) : []);
  }
  clearLightDomCache() {
    this.#u = void 0;
  }
  #H = /* @__PURE__ */ new Map();
  registerLightDomHandler(e3, t3) {
    this.#H.set(e3.toLowerCase(), t3);
  }
  unregisterLightDomHandler(e3) {
    this.#H.delete(e3.toLowerCase());
  }
  observeLightDOM(e3) {
    this.#m && this.#m.disconnect();
    const t3 = /* @__PURE__ */ new Set(), o2 = () => {
      this.#C = void 0;
      for (const e4 of t3) {
        const t4 = this.#H.get(e4);
        t4?.();
      }
      t3.clear();
    };
    this.#m = new MutationObserver((e4) => {
      for (const o3 of e4) {
        for (const e5 of o3.addedNodes) {
          if (e5.nodeType !== Node.ELEMENT_NODE) continue;
          const o4 = e5.tagName.toLowerCase();
          this.#H.has(o4) && t3.add(o4);
        }
        if ("attributes" === o3.type && o3.target.nodeType === Node.ELEMENT_NODE) {
          const e5 = o3.target.tagName.toLowerCase();
          this.#H.has(e5) && t3.add(e5);
        }
      }
      t3.size > 0 && !this.#C && (this.#C = setTimeout(o2, 0));
    }), this.#m.observe(e3, { childList: true, subtree: true, attributes: true, attributeFilter: ["title", "field", "header", "width", "hidden", "id", "icon", "tooltip", "order"] });
  }
  onChange(e3) {
    this.#b.push(e3);
  }
  notifyChange() {
    for (const e3 of this.#b) e3();
  }
  dispose() {
    this.#m?.disconnect(), this.#b = [], this.#v && clearTimeout(this.#v), this.#C && (clearTimeout(this.#C), this.#C = void 0);
  }
};
function se() {
  if ("undefined" != typeof window && window.location) {
    const e3 = window.location.hostname;
    if ("localhost" === e3 || "127.0.0.1" === e3 || "::1" === e3) return true;
  }
  return "undefined" != typeof process && "production" !== process.env?.NODE_ENV;
}
function le(e3) {
  return `<span role="checkbox" aria-checked="${e3}" aria-label="${e3}">${e3 ? "&#x1F5F9;" : "&#9744;"}</span>`;
}
function ae(e3) {
  if (null == e3 || "" === e3) return "";
  if (e3 instanceof Date) return isNaN(e3.getTime()) ? "" : e3.toLocaleDateString();
  if ("number" == typeof e3 || "string" == typeof e3) {
    const t3 = new Date(e3);
    return isNaN(t3.getTime()) ? "" : t3.toLocaleDateString();
  }
  return "";
}
function ce(e3) {
  if (!e3) return -1;
  const t3 = e3.getAttribute("data-row");
  if (t3) return parseInt(t3, 10);
  const o2 = e3.closest(".data-grid-row");
  if (!o2) return -1;
  const i3 = o2.parentElement;
  if (!i3) return -1;
  const n3 = i3.querySelectorAll(":scope > .data-grid-row");
  for (let r3 = 0; r3 < n3.length; r3++) if (n3[r3] === o2) return r3;
  return -1;
}
function de(e3) {
  e3 && e3.querySelectorAll(".cell-focus").forEach((e4) => e4.classList.remove("cell-focus"));
}
function he(e3) {
  try {
    if ("rtl" === getComputedStyle(e3).direction) return "rtl";
  } catch {
  }
  try {
    const t3 = e3.closest?.("[dir]")?.getAttribute("dir");
    if ("rtl" === t3) return "rtl";
  } catch {
  }
  return "ltr";
}
function ue(e3) {
  return "rtl" === he(e3);
}
function fe(e3, t3) {
  const o2 = t3.renderer || t3.viewRenderer;
  if (o2) return o2;
  if (!t3.type) return;
  const i3 = e3.__frameworkAdapter;
  if (i3?.getTypeDefault) {
    const e4 = i3.getTypeDefault(t3.type);
    if (e4?.renderer) return e4.renderer;
  }
}
function pe(e3, t3) {
  if (t3.format) return t3.format;
  if (!t3.type) return;
  const o2 = e3.__frameworkAdapter;
  if (o2?.getTypeDefault) {
    const e4 = o2.getTypeDefault(t3.type);
    if (e4?.format) return e4.format;
  }
}
var we = 'input,select,textarea,[contenteditable="true"],[contenteditable=""],[tabindex]:not([tabindex="-1"])';
function be(e3) {
  return (e3.__editingCellCount ?? 0) > 0;
}
function me(e3) {
  e3.__editingCellCount = 0, e3.removeAttribute("data-has-editing");
  e3.querySelectorAll(".cell.editing").forEach((e4) => e4.classList.remove("editing"));
}
var ve = document.createElement("template");
ve.innerHTML = '<div class="cell" role="gridcell" part="cell"></div>';
var Ce = document.createElement("template");
function _e() {
  return ve.content.firstElementChild.cloneNode(true);
}
function ye() {
  return Ce.content.firstElementChild.cloneNode(true);
}
function Re(e3) {
  e3.__cellDisplayCache = void 0, e3.__cellCacheEpoch = void 0, e3.__hasSpecialColumns = void 0;
}
function Se(e3, t3, o2, i3) {
  const n3 = t3.children, r3 = e3._visibleColumns, s3 = r3.length, c2 = n3.length, d2 = s3 < c2 ? s3 : c2, h = e3._focusRow, u2 = e3._focusCol, g = e3._hasAfterCellRenderHook?.() ?? false;
  let f2 = e3.__hasSpecialColumns;
  if (void 0 === f2) {
    f2 = false;
    const t4 = e3.__frameworkAdapter;
    for (let e4 = 0; e4 < s3; e4++) {
      const o3 = r3[e4];
      if (o3.__viewTemplate || o3.__compiledView || o3.renderer || o3.viewRenderer || o3.externalView || o3.format || o3.cellClass || "date" === o3.type || "boolean" === o3.type || o3.type && t4?.getTypeDefault?.(o3.type)?.renderer || o3.type && t4?.getTypeDefault?.(o3.type)?.format) {
        f2 = true;
        break;
      }
    }
    e3.__hasSpecialColumns = f2;
  }
  const p = String(i3);
  if (f2) {
    for (let s4 = 0; s4 < d2; s4++) {
      if (r3[s4].externalView) {
        if (!n3[s4].querySelector("[data-external-view]")) return void Ee(e3, t3, o2, i3);
      }
    }
    for (let s4 = 0; s4 < d2; s4++) {
      const c3 = r3[s4], d3 = n3[s4];
      d3.getAttribute("data-row") !== p && d3.setAttribute("data-row", p);
      const f3 = d3.classList.contains("editing");
      if (!f3) {
        const e4 = h === i3 && u2 === s4;
        e4 !== d3.classList.contains("cell-focus") && (d3.classList.toggle("cell-focus", e4), d3.setAttribute("aria-selected", String(e4)));
      }
      const b = c3.cellClass;
      if (b) {
        const t4 = d3.getAttribute("data-dynamic-classes");
        t4 && t4.split(" ").forEach((e4) => e4 && d3.classList.remove(e4));
        try {
          const e4 = b(o2[c3.field], o2, c3), t5 = "string" == typeof e4 ? e4.split(/\s+/) : e4;
          if (t5 && t5.length > 0) {
            const e5 = t5.filter((e6) => e6 && "string" == typeof e6);
            e5.forEach((e6) => d3.classList.add(e6)), d3.setAttribute("data-dynamic-classes", e5.join(" "));
          } else d3.removeAttribute("data-dynamic-classes");
        } catch (w2) {
          y(l, `cellClass callback error for column '${c3.field}': ${w2}`, e3.id), d3.removeAttribute("data-dynamic-classes");
        }
      }
      if (f3) continue;
      const m = fe(e3, c3);
      if (m) {
        const n4 = o2[c3.field], r4 = m({ row: o2, value: n4, field: c3.field, column: c3, cellEl: d3 });
        "string" == typeof r4 ? (e3.__frameworkAdapter?.releaseCell?.(d3), d3.innerHTML = N(r4)) : r4 instanceof Node ? r4.parentElement !== d3 && (e3.__frameworkAdapter?.releaseCell?.(d3), d3.innerHTML = "", d3.appendChild(r4)) : null == r4 && (e3.__frameworkAdapter?.releaseCell?.(d3), d3.textContent = null == n4 ? "" : String(n4)), g && e3._afterCellRender?.({ row: o2, rowIndex: i3, column: c3, colIndex: s4, value: n4, cellElement: d3, rowElement: t3 });
        continue;
      }
      if (c3.__compiledView) {
        const n4 = o2[c3.field], r4 = c3.__compiledView({ row: o2, value: n4, field: c3.field, column: c3 });
        c3.__compiledView.__blocked ? d3.textContent = "" : (d3.firstElementChild && e3.__frameworkAdapter?.releaseCell?.(d3), d3.innerHTML = N(r4), F(d3)), g && e3._afterCellRender?.({ row: o2, rowIndex: i3, column: c3, colIndex: s4, value: n4, cellElement: d3, rowElement: t3 });
        continue;
      }
      if (c3.__viewTemplate) {
        const n4 = o2[c3.field], r4 = c3.__viewTemplate.innerHTML;
        /Reflect\.|\bProxy\b|ownKeys\(/.test(r4) ? d3.textContent = "" : (d3.firstElementChild && e3.__frameworkAdapter?.releaseCell?.(d3), d3.innerHTML = N(W(r4, { row: o2, value: n4 })), F(d3)), g && e3._afterCellRender?.({ row: o2, rowIndex: i3, column: c3, colIndex: s4, value: n4, cellElement: d3, rowElement: t3 });
        continue;
      }
      if (c3.externalView) continue;
      const v = o2[c3.field];
      let C2;
      d3.firstElementChild && e3.__frameworkAdapter?.releaseCell?.(d3);
      const _2 = pe(e3, c3);
      if (_2) {
        try {
          const e4 = _2(v, o2);
          C2 = null == e4 ? "" : String(e4);
        } catch (w2) {
          y(a, `Format error in column '${c3.field}': ${w2}`, e3.id), C2 = null == v ? "" : String(v);
        }
        d3.textContent = C2;
      } else "date" === c3.type ? (C2 = ae(v), d3.textContent = C2) : "boolean" === c3.type ? d3.innerHTML = le(!!v) : (C2 = null == v ? "" : String(v), d3.textContent = C2);
      g && e3._afterCellRender?.({ row: o2, rowIndex: i3, column: c3, colIndex: s4, value: v, cellElement: d3, rowElement: t3 });
    }
  } else for (let l3 = 0; l3 < d2; l3++) {
    const s4 = n3[l3];
    if (s4.classList.contains("editing")) continue;
    s4.firstElementChild && e3.__frameworkAdapter?.releaseCell?.(s4);
    const a3 = r3[l3], c3 = o2[a3.field];
    s4.textContent = null == c3 ? "" : String(c3), s4.getAttribute("data-row") !== p && s4.setAttribute("data-row", p);
    const d3 = h === i3 && u2 === l3;
    d3 !== s4.classList.contains("cell-focus") && (s4.classList.toggle("cell-focus", d3), s4.setAttribute("aria-selected", String(d3))), g && e3._afterCellRender?.({ row: o2, rowIndex: i3, column: a3, colIndex: l3, value: c3, cellElement: s4, rowElement: t3 });
  }
}
function Ee(e3, t3, o2, i3) {
  t3.classList.remove("tbw-row-loading"), t3.removeAttribute("aria-busy");
  const n3 = e3.__frameworkAdapter;
  if (n3?.releaseCell) {
    const e4 = t3.children;
    for (let t4 = e4.length - 1; t4 >= 0; t4--) n3.releaseCell(e4[t4]);
  }
  t3.innerHTML = "";
  const r3 = e3._visibleColumns, s3 = r3.length, c2 = e3._focusRow, d2 = e3._focusCol, h = e3._hasAfterCellRenderHook?.() ?? false, u2 = document.createDocumentFragment();
  for (let f2 = 0; f2 < s3; f2++) {
    const n4 = r3[f2], s4 = _e();
    s4.setAttribute("aria-colindex", String(f2 + 1)), s4.setAttribute("data-col", String(f2)), s4.setAttribute("data-row", String(i3)), s4.setAttribute("data-field", n4.field), s4.setAttribute("data-header", n4.header ?? n4.field), n4.type && s4.setAttribute("data-type", n4.type);
    let p = o2[n4.field];
    const w2 = pe(e3, n4);
    if (w2) try {
      p = w2(p, o2);
    } catch (g) {
      y(a, `Format error in column '${n4.field}': ${g}`, e3.id);
    }
    const b = n4.__compiledView, m = n4.__viewTemplate, v = fe(e3, n4), C2 = n4.externalView;
    let _2 = false;
    if (v) {
      const e4 = v({ row: o2, value: p, field: n4.field, column: n4, cellEl: s4 });
      "string" == typeof e4 ? (s4.innerHTML = N(e4), _2 = true) : e4 instanceof Node ? e4.parentElement !== s4 && (s4.textContent = "", s4.appendChild(e4)) : null == e4 && (s4.textContent = null == p ? "" : String(p));
    } else if (C2) {
      const t4 = C2, i4 = document.createElement("div");
      i4.setAttribute("data-external-view", ""), i4.setAttribute("data-field", n4.field), s4.appendChild(i4);
      const r4 = { row: o2, value: p, field: n4.field, column: n4 };
      if (t4.mount) try {
        t4.mount({ placeholder: i4, context: r4, spec: t4 });
      } catch (g) {
        y("TBW063", `External view mount error for column '${n4.field}': ${g}`, e3.id);
      }
      else queueMicrotask(() => {
        try {
          e3.dispatchEvent(new CustomEvent("mount-external-view", { bubbles: true, composed: true, detail: { placeholder: i4, spec: t4, context: r4 } }));
        } catch (g) {
          y("TBW064", `External view event dispatch error for column '${n4.field}': ${g}`, e3.id);
        }
      });
      i4.setAttribute("data-mounted", "");
    } else if (b) {
      const e4 = b({ row: o2, value: p, field: n4.field, column: n4 }), t4 = b.__blocked;
      s4.innerHTML = t4 ? "" : N(e4), _2 = true, t4 && (s4.textContent = "", s4.setAttribute("data-blocked-template", ""));
    } else if (m) {
      const e4 = m.innerHTML;
      /Reflect\.|\bProxy\b|ownKeys\(/.test(e4) ? (s4.textContent = "", s4.setAttribute("data-blocked-template", "")) : (s4.innerHTML = N(W(e4, { row: o2, value: p })), _2 = true);
    } else w2 ? s4.textContent = null == p ? "" : String(p) : "date" === n4.type ? s4.textContent = ae(p) : "boolean" === n4.type ? s4.innerHTML = le(!!p) : s4.textContent = null == p ? "" : String(p);
    if (_2) {
      F(s4);
      const e4 = s4.textContent || "";
      /Proxy|Reflect\.ownKeys/.test(e4) && (s4.textContent = e4.replace(/Proxy|Reflect\.ownKeys/g, "").trim(), /Proxy|Reflect\.ownKeys/.test(s4.textContent || "") && (s4.textContent = ""));
    }
    s4.hasAttribute("data-blocked-template") && (s4.textContent || "").trim().length && (s4.textContent = "");
    ("function" == typeof n4.editable ? n4.editable(o2) : n4.editable) ? s4.tabIndex = 0 : "boolean" === n4.type && (s4.hasAttribute("tabindex") || (s4.tabIndex = 0)), c2 === i3 && d2 === f2 ? (s4.classList.add("cell-focus"), s4.setAttribute("aria-selected", "true")) : s4.setAttribute("aria-selected", "false");
    const R2 = n4.cellClass;
    if (R2) try {
      const e4 = R2(o2[n4.field], o2, n4), t4 = "string" == typeof e4 ? e4.split(/\s+/) : e4;
      if (t4 && t4.length > 0) {
        let e5 = "";
        for (const o3 of t4) o3 && "string" == typeof o3 && (s4.classList.add(o3), e5 += (e5 ? " " : "") + o3);
        s4.setAttribute("data-dynamic-classes", e5);
      }
    } catch (g) {
      y(l, `cellClass callback error for column '${n4.field}': ${g}`, e3.id);
    }
    h && e3._afterCellRender?.({ row: o2, rowIndex: i3, column: n4, colIndex: f2, value: p, cellElement: s4, rowElement: t3 }), u2.appendChild(s4);
  }
  t3.appendChild(u2);
}
function xe(e3, t3, o2) {
  if (t3.target?.closest(".resize-handle")) return;
  const i3 = ce(o2.querySelector(".cell[data-row]"));
  if (i3 < 0) return;
  const n3 = e3._rows[i3];
  if (!n3) return;
  if (e3._dispatchRowClick?.(t3, i3, n3, o2)) return;
  const r3 = t3.target?.closest(".cell[data-col]");
  if (r3) {
    const o3 = Number(r3.getAttribute("data-col"));
    if (!isNaN(o3)) {
      if (e3._dispatchCellClick?.(t3, i3, o3, r3)) return;
      const n4 = e3._focusRow !== i3 || e3._focusCol !== o3;
      if (e3._focusRow = i3, e3._focusCol = o3, r3.classList.contains("editing")) {
        n4 && (de(e3._bodyEl ?? e3), r3.classList.add("cell-focus"));
        const o4 = t3.target, i4 = r3.contains(o4) && o4.matches(we) ? o4 : r3.querySelector(we);
        try {
          i4?.focus({ preventScroll: true });
        } catch {
        }
        return;
      }
      Ae(e3);
    }
  }
}
function Ae(e3, t3) {
  if (e3._virtualization?.enabled) {
    const { rowHeight: t4, container: o3, viewportEl: i4 } = e3._virtualization, n4 = o3, r4 = i4?.clientHeight ?? n4?.clientHeight ?? 0;
    if (n4 && r4 > 0) {
      const o4 = e3._focusRow * t4;
      o4 < n4.scrollTop ? n4.scrollTop = o4 : o4 + t4 > n4.scrollTop + r4 && (n4.scrollTop = o4 - r4 + t4);
    }
  }
  const o2 = void 0 !== e3._activeEditRows && -1 !== e3._activeEditRows || !!e3._isGridEditMode;
  o2 || e3.refreshVirtualWindow(false), de(e3._bodyEl), Array.from(e3._bodyEl.querySelectorAll('[aria-selected="true"]')).forEach((e4) => {
    e4.setAttribute("aria-selected", "false");
  });
  const i3 = e3._focusRow, n3 = e3._virtualization.start ?? 0, r3 = e3._virtualization.end ?? e3._rows.length;
  if (i3 >= n3 && i3 < r3) {
    const r4 = e3._bodyEl.querySelectorAll(".data-grid-row")[i3 - n3];
    let s3 = r4?.children[e3._focusCol];
    if (s3 && s3.classList?.contains("cell") || (s3 = r4?.querySelector(`.cell[data-col="${e3._focusCol}"]`) ?? r4?.querySelector(".cell[data-col]")), s3) {
      s3.classList.add("cell-focus"), s3.setAttribute("aria-selected", "true");
      const i4 = e3.querySelector(".tbw-scroll-area");
      if (i4 && s3 && (!o2 || t3?.forceHorizontalScroll)) if (t3?.forceScrollLeft) i4.scrollLeft = 0;
      else if (t3?.forceScrollRight) i4.scrollLeft = i4.scrollWidth - i4.clientWidth;
      else {
        const t4 = e3._getHorizontalScrollOffsets?.(r4 ?? void 0, s3) ?? { left: 0, right: 0 };
        if (!t4.skipScroll) {
          const e4 = s3.getBoundingClientRect(), o3 = i4.getBoundingClientRect(), n4 = e4.left - o3.left + i4.scrollLeft, r5 = n4 + e4.width, l3 = i4.scrollLeft + t4.left, a3 = i4.scrollLeft + i4.clientWidth - t4.right;
          n4 < l3 ? i4.scrollLeft = n4 - t4.left : r5 > a3 && (i4.scrollLeft = r5 - i4.clientWidth + t4.right);
        }
      }
      if (o2 && s3.classList.contains("editing")) {
        const e4 = s3.querySelector(we);
        if (e4 && document.activeElement !== e4) try {
          e4.focus({ preventScroll: true });
        } catch {
        }
      } else if (o2 && !s3.contains(document.activeElement)) {
        s3.hasAttribute("tabindex") || s3.setAttribute("tabindex", "-1");
        try {
          s3.focus({ preventScroll: true });
        } catch {
        }
      } else o2 || document.activeElement !== e3 && e3.focus({ preventScroll: true });
    }
  }
}
Ce.innerHTML = '<div class="data-grid-row" role="row" part="row"></div>';
var Te = /* @__PURE__ */ new WeakMap();
function He(e3, t3) {
  const o2 = ce(t3), i3 = (function(e4) {
    if (!e4) return -1;
    const t4 = e4.getAttribute("data-col");
    return t4 ? parseInt(t4, 10) : -1;
  })(t3);
  if (o2 < 0 || i3 < 0) return;
  e3._focusRow = o2, e3._focusCol = i3, de(e3._bodyEl), t3.classList.add("cell-focus"), t3.setAttribute("aria-selected", "true");
  const n3 = t3.closest("tbw-grid");
  n3 && document.activeElement !== n3 && n3.focus({ preventScroll: true });
}
function Pe(e3, t3, o2, i3) {
  let n3 = null;
  const r3 = o2.composedPath?.();
  if (n3 = r3 && r3.length > 0 ? r3[0] : o2.target, n3 && !t3.contains(n3)) {
    const e4 = document.elementFromPoint(o2.clientX, o2.clientY);
    e4 && (n3 = e4);
  }
  const s3 = n3?.closest?.("[data-col]"), l3 = n3?.closest?.(".data-grid-row"), a3 = n3?.closest?.(".header-row");
  let c2, d2, h, u2, g, f2;
  return s3 && (c2 = parseInt(s3.getAttribute("data-row") ?? "-1", 10), d2 = parseInt(s3.getAttribute("data-col") ?? "-1", 10), c2 >= 0 && d2 >= 0 && (h = e3._rows[c2], f2 = e3._visibleColumns[d2], u2 = f2?.field, g = h && u2 ? h[u2] : void 0)), { type: i3, row: h, rowIndex: void 0 !== c2 && c2 >= 0 ? c2 : void 0, colIndex: void 0 !== d2 && d2 >= 0 ? d2 : void 0, field: u2, value: g, column: f2, originalEvent: o2, cellElement: s3 ?? void 0, rowElement: l3 ?? void 0, isHeader: !!a3, cell: void 0 !== c2 && void 0 !== d2 && c2 >= 0 && d2 >= 0 ? { row: c2, col: d2 } : void 0 };
}
function Me(e3, t3, o2, i3) {
  t3.addEventListener("keydown", (t4) => (function(e4, t5) {
    if (e4._dispatchKeyDown?.(t5)) return;
    const o3 = e4._rows.length - 1, i4 = e4._visibleColumns.length - 1, n3 = void 0 !== e4._activeEditRows && -1 !== e4._activeEditRows, r3 = e4._visibleColumns[e4._focusCol], s3 = r3?.type, l3 = t5.composedPath?.() ?? [], a3 = l3.length ? l3[0] : t5.target, c2 = (e5) => {
      if (!e5) return false;
      const t6 = e5.tagName;
      return "INPUT" === t6 || "SELECT" === t6 || "TEXTAREA" === t6 || !!e5.isContentEditable;
    };
    if ((!c2(a3) || "Home" !== t5.key && "End" !== t5.key) && !(c2(a3) && ("ArrowUp" === t5.key || "ArrowDown" === t5.key) && "INPUT" === a3.tagName && "number" === a3.type || c2(a3) && ("ArrowLeft" === t5.key || "ArrowRight" === t5.key) || c2(a3) && ("Enter" === t5.key || "Escape" === t5.key) || n3 && "select" === s3 && ("ArrowDown" === t5.key || "ArrowUp" === t5.key))) {
      switch (t5.key) {
        case "Tab":
          return t5.preventDefault(), t5.shiftKey ? e4._focusCol > 0 ? e4._focusCol -= 1 : e4._focusRow > 0 && ("function" == typeof e4.commitActiveRowEdit && e4._activeEditRows === e4._focusRow && e4.commitActiveRowEdit(), e4._focusRow -= 1, e4._focusCol = i4) : e4._focusCol < i4 ? e4._focusCol += 1 : ("function" == typeof e4.commitActiveRowEdit && e4.commitActiveRowEdit(), e4._focusRow < o3 && (e4._focusRow += 1, e4._focusCol = 0)), void Ae(e4);
        case "ArrowDown":
          n3 && "function" == typeof e4.commitActiveRowEdit && e4.commitActiveRowEdit(), e4._focusRow = Math.min(o3, e4._focusRow + 1), t5.preventDefault();
          break;
        case "ArrowUp":
          n3 && "function" == typeof e4.commitActiveRowEdit && e4.commitActiveRowEdit(), e4._focusRow = Math.max(0, e4._focusRow - 1), t5.preventDefault();
          break;
        case "ArrowRight": {
          const o4 = ue(e4);
          e4._focusCol = o4 ? Math.max(0, e4._focusCol - 1) : Math.min(i4, e4._focusCol + 1), t5.preventDefault();
          break;
        }
        case "ArrowLeft": {
          const o4 = ue(e4);
          e4._focusCol = o4 ? Math.min(i4, e4._focusCol + 1) : Math.max(0, e4._focusCol - 1), t5.preventDefault();
          break;
        }
        case "Home":
          return t5.ctrlKey || t5.metaKey ? (n3 && "function" == typeof e4.commitActiveRowEdit && e4.commitActiveRowEdit(), e4._focusRow = 0, e4._focusCol = 0) : e4._focusCol = 0, t5.preventDefault(), void Ae(e4, { forceScrollLeft: true });
        case "End":
          return t5.ctrlKey || t5.metaKey ? (n3 && "function" == typeof e4.commitActiveRowEdit && e4.commitActiveRowEdit(), e4._focusRow = o3, e4._focusCol = i4) : e4._focusCol = i4, t5.preventDefault(), void Ae(e4, { forceScrollRight: true });
        case "PageDown":
          e4._focusRow = Math.min(o3, e4._focusRow + 20), t5.preventDefault();
          break;
        case "PageUp":
          e4._focusRow = Math.max(0, e4._focusRow - 20), t5.preventDefault();
          break;
        case "Enter": {
          const o4 = e4._focusRow, i5 = e4._focusCol, n4 = e4._visibleColumns[i5], r4 = e4._rows[o4], s4 = n4?.field ?? "", l4 = s4 && r4 ? r4[s4] : void 0, a4 = e4.querySelector(`[data-row="${o4}"][data-col="${i5}"]`), c3 = new CustomEvent("cell-activate", { cancelable: true, detail: { rowIndex: o4, colIndex: i5, column: n4, field: s4, value: l4, row: r4, cellEl: a4, trigger: "keyboard", originalEvent: t5 } });
          e4.dispatchEvent(c3);
          const d2 = new CustomEvent("activate-cell", { cancelable: true, detail: { row: o4, col: i5 } });
          if (e4.dispatchEvent(d2), c3.defaultPrevented || d2.defaultPrevented) return void t5.preventDefault();
          break;
        }
        default:
          return;
      }
      Ae(e4);
    }
  })(e3, t4), { signal: i3 }), o2.addEventListener("mousedown", (t4) => (function(e4, t5, o3) {
    const i4 = Pe(e4, t5, o3, "mousedown");
    e4._dispatchCellMouseDown?.(i4) && Te.set(e4, true);
  })(e3, o2, t4), { signal: i3 }), document.addEventListener("mousemove", (t4) => (function(e4, t5, o3) {
    if (!Te.get(e4)) return;
    const i4 = Pe(e4, t5, o3, "mousemove");
    e4._dispatchCellMouseMove?.(i4);
  })(e3, o2, t4), { signal: i3 }), document.addEventListener("mouseup", (t4) => (function(e4, t5, o3) {
    if (!Te.get(e4)) return;
    const i4 = Pe(e4, t5, o3, "mouseup");
    e4._dispatchCellMouseUp?.(i4), Te.set(e4, false);
  })(e3, o2, t4), { signal: i3 });
}
var Le;
function Oe(e3) {
  Le = e3;
}
var De = class {
  #e;
  #P = /* @__PURE__ */ new Set();
  #M = /* @__PURE__ */ new Map();
  constructor(e3) {
    this.#e = e3;
  }
  focusCell(e3, t3) {
    const o2 = this.#e, i3 = o2._rows.length - 1;
    if (i3 < 0) return;
    let n3;
    if ("string" == typeof t3) {
      if (n3 = o2._visibleColumns.findIndex((e4) => e4.field === t3), n3 < 0) return;
    } else n3 = t3;
    const r3 = o2._visibleColumns.length - 1;
    r3 < 0 || (o2._focusRow = Math.max(0, Math.min(e3, i3)), o2._focusCol = Math.max(0, Math.min(n3, r3)), Ae(o2));
  }
  get focusedCell() {
    const e3 = this.#e;
    if (0 === e3._rows.length || 0 === e3._visibleColumns.length) return null;
    const t3 = e3._visibleColumns[e3._focusCol];
    return { rowIndex: e3._focusRow, colIndex: e3._focusCol, field: t3?.field ?? "" };
  }
  scrollToRow(e3, t3) {
    const o2 = this.#e._virtualization;
    if (!o2.enabled) return;
    const i3 = o2.container;
    if (!i3) return;
    const n3 = this.#e._rows.length;
    if (0 === n3) return;
    const r3 = Math.max(0, Math.min(e3, n3 - 1)), s3 = t3?.align ?? "nearest", l3 = t3?.behavior ?? "instant";
    let a3, c2;
    const d2 = o2.positionCache;
    o2.variableHeights && d2 && d2.length > r3 ? (a3 = d2[r3].offset, c2 = d2[r3].height) : (a3 = r3 * o2.rowHeight, c2 = o2.rowHeight);
    const h = o2.viewportEl?.clientHeight ?? i3.clientHeight ?? 0;
    if (h <= 0) return;
    const u2 = i3.scrollTop, g = a3 + c2, f2 = u2 + h;
    let p;
    switch (s3) {
      case "start":
        p = a3;
        break;
      case "center":
        p = a3 - h / 2 + c2 / 2;
        break;
      case "end":
        p = g - h;
        break;
      default:
        if (a3 >= u2 && g <= f2) return;
        p = a3 < u2 ? a3 : g - h;
    }
    p = Math.max(0, p), "smooth" === l3 ? i3.scrollTo({ top: p, behavior: "smooth" }) : i3.scrollTop = p;
  }
  scrollToRowById(e3, t3) {
    const o2 = this.#e._getRowEntry(e3);
    o2 && this.scrollToRow(o2.index, t3);
  }
  registerExternalFocusContainer(e3) {
    if (this.#P.has(e3)) return;
    this.#P.add(e3);
    const t3 = new AbortController(), o2 = t3.signal, i3 = this.#e;
    e3.addEventListener("focusin", () => {
      i3.dataset.hasFocus = "";
    }, { signal: o2 }), e3.addEventListener("focusout", (e4) => {
      const t4 = e4.relatedTarget;
      t4 && this.containsFocus(t4) || delete i3.dataset.hasFocus;
    }, { signal: o2 }), this.#M.set(e3, () => t3.abort());
  }
  unregisterExternalFocusContainer(e3) {
    this.#P.delete(e3);
    const t3 = this.#M.get(e3);
    t3 && (t3(), this.#M.delete(e3));
  }
  containsFocus(e3) {
    const t3 = e3 ?? document.activeElement;
    return !!t3 && (!!this.#e.contains(t3) || this.isInExternalFocusContainer(t3));
  }
  isInExternalFocusContainer(e3) {
    for (const t3 of this.#P) if (t3.contains(e3)) return true;
    return false;
  }
  destroy() {
    for (const e3 of this.#M.values()) e3();
    this.#M.clear(), this.#P.clear();
  }
};
var Ie = "function" == typeof requestIdleCallback;
function ke(e3) {
  Ie ? cancelIdleCallback(e3) : clearTimeout(e3);
}
function ze(e3, t3) {
  if (t3) {
    const o2 = t3({ size: e3 });
    if ("string" == typeof o2) {
      const e4 = document.createElement("div");
      return e4.innerHTML = o2, e4;
    }
    return o2;
  }
  return (function(e4) {
    const t4 = document.createElement("div");
    return t4.className = `tbw-spinner tbw-spinner--${e4}`, t4.setAttribute("role", "progressbar"), t4.setAttribute("aria-label", "Loading"), t4;
  })(e3);
}
function qe(e3) {
  let t3 = null, o2 = null, i3 = null, n3 = null;
  const r3 = (i4) => {
    if (!t3) return;
    const n4 = i4.clientX - t3.startX, r4 = Math.max(40, t3.startWidth + n4), s4 = e3._visibleColumns[t3.colIndex];
    s4.width = r4, s4.__userResized = true, s4.__renderedWidth = r4, null == o2 && (o2 = requestAnimationFrame(() => {
      o2 = null, e3.updateTemplate?.();
    })), e3.dispatchEvent(new CustomEvent("column-resize", { detail: { field: s4.field, width: r4 } }));
  };
  let s3 = false;
  const l3 = () => {
    const o3 = null !== t3;
    o3 && (s3 = true, requestAnimationFrame(() => {
      s3 = false;
    })), window.removeEventListener("mousemove", r3), window.removeEventListener("mouseup", l3), null !== i3 && (document.documentElement.style.cursor = i3, i3 = null), null !== n3 && (document.body.style.userSelect = n3, n3 = null), t3 = null, o3 && e3.requestStateChange && e3.requestStateChange();
  };
  return { get isResizing() {
    return null !== t3 || s3;
  }, start(o3, s4, a3) {
    o3.preventDefault();
    const c2 = e3._headerRowEl ?? e3.findHeaderRow?.();
    c2 && (function(t4, o4) {
      const i4 = o4.querySelectorAll(".cell");
      for (let n4 = 0; n4 < e3._visibleColumns.length; n4++) {
        if (n4 === t4) continue;
        const o5 = e3._visibleColumns[n4];
        if (null == o5.width && !o5.__userResized) {
          const e4 = i4[n4], t5 = e4?.getBoundingClientRect().width;
          t5 && (o5.width = Math.round(t5), o5.__userResized = true, o5.__renderedWidth = o5.width);
        }
      }
    })(s4, c2);
    const d2 = e3._visibleColumns[s4], h = "number" == typeof d2?.width ? d2.width : void 0, u2 = d2?.__renderedWidth ?? h ?? a3.getBoundingClientRect().width;
    t3 = { startX: o3.clientX, colIndex: s4, startWidth: u2 }, window.addEventListener("mousemove", r3), window.addEventListener("mouseup", l3), null === i3 && (i3 = document.documentElement.style.cursor), document.documentElement.style.cursor = "e-resize", null === n3 && (n3 = document.body.style.userSelect), document.body.style.userSelect = "none";
  }, resetColumn(t4) {
    const o3 = e3._visibleColumns[t4];
    o3 && (o3.__userResized = false, o3.__renderedWidth = void 0, o3.width = o3.__originalWidth, e3.updateTemplate?.(), e3.requestStateChange?.(), e3.dispatchEvent(new CustomEvent("column-resize-reset", { detail: { field: o3.field, width: o3.width } })));
  }, dispose() {
    l3();
  } };
}
var Ne = "data-animating";
var We = { change: "--tbw-row-change-duration", insert: "--tbw-row-insert-duration", remove: "--tbw-row-remove-duration" };
var $e = { change: 500, insert: 300, remove: 200 };
function Fe(e3, t3) {
  const o2 = We[t3], i3 = getComputedStyle(e3).getPropertyValue(o2);
  if (i3) {
    const e4 = (function(e5) {
      const t4 = e5.trim().toLowerCase();
      return t4.endsWith("ms") ? parseFloat(t4) : t4.endsWith("s") ? 1e3 * parseFloat(t4) : parseFloat(t4);
    })(i3);
    if (!isNaN(e4) && e4 > 0) return e4;
  }
  return $e[t3];
}
function Be(e3, t3, o2) {
  if (t3 < 0) return Promise.resolve(false);
  const i3 = e3.findRenderedRowElement?.(t3);
  return i3 ? new Promise((e4) => {
    !(function(e5, t4, o3) {
      e5.removeAttribute(Ne), e5.offsetWidth, e5.setAttribute(Ne, t4);
      const i4 = Fe(e5, t4);
      setTimeout(() => {
        "remove" !== t4 && e5.removeAttribute(Ne), o3?.();
      }, i4);
    })(i3, o2, () => e4(true));
  }) : Promise.resolve(false);
}
function Ve(e3, t3) {
  if (t3) return t3(e3);
  const o2 = e3;
  return "id" in o2 && null != o2.id ? String(o2.id) : "_id" in o2 && null != o2._id ? String(o2._id) : void 0;
}
function Ue(e3, t3, o2) {
  const i3 = Ve(e3, o2);
  return void 0 === i3 && _("TBW040", 'Cannot determine row ID. Configure getRowId in gridConfig or ensure rows have an "id" property.', t3), i3;
}
var Ge = class {
  #e;
  constructor(e3) {
    this.#e = e3;
  }
  resolveRowId(e3) {
    return Ue(e3, this.#e.id, this.#e.effectiveConfig?.getRowId);
  }
  getRow(e3) {
    return this.#e._getRowEntry(e3)?.row;
  }
  getRowEntry(e3) {
    return this.#e._getRowEntry(e3);
  }
  updateRow(e3, t3, o2 = "api") {
    const i3 = this.#e, n3 = i3._getRowEntry(e3);
    n3 || _(s, `Row with ID "${e3}" not found. Ensure the row exists and getRowId is correctly configured.`, i3.id);
    const { row: r3, index: l3 } = n3, a3 = [];
    for (const [s3, c2] of Object.entries(t3)) {
      const e4 = r3[s3];
      e4 !== c2 && (a3.push({ field: s3, oldValue: e4, newValue: c2 }), r3[s3] = c2);
    }
    for (const { field: s3, oldValue: c2, newValue: d2 } of a3) i3.dispatchEvent(new CustomEvent("cell-change", { detail: { row: r3, rowId: e3, rowIndex: l3, field: s3, oldValue: c2, newValue: d2, changes: t3, source: o2 }, bubbles: true, composed: true }));
    a3.length > 0 && (Re(i3), i3._requestSchedulerPhase(ie.VIRTUALIZATION, "updateRow"), i3._emitDataChange());
  }
  updateRows(e3, t3 = "api") {
    const o2 = this.#e;
    let i3 = false;
    for (const { id: n3, changes: r3 } of e3) {
      const e4 = o2._getRowEntry(n3);
      e4 || _(s, `Row with ID "${n3}" not found. Ensure the row exists and getRowId is correctly configured.`, o2.id);
      const { row: l3, index: a3 } = e4;
      for (const [s3, c2] of Object.entries(r3)) {
        const e5 = l3[s3];
        e5 !== c2 && (i3 = true, l3[s3] = c2, o2.dispatchEvent(new CustomEvent("cell-change", { detail: { row: l3, rowId: n3, rowIndex: a3, field: s3, oldValue: e5, newValue: c2, changes: r3, source: t3 }, bubbles: true, composed: true })));
      }
    }
    i3 && (Re(o2), o2._requestSchedulerPhase(ie.VIRTUALIZATION, "updateRows"), o2._emitDataChange());
  }
  async insertRow(e3, t3, o2 = true) {
    const i3 = this.#e, n3 = Math.max(0, Math.min(e3, i3._rows.length));
    i3.sourceRows = [...i3.sourceRows, t3];
    const r3 = [...i3._rows];
    r3.splice(n3, 0, t3), i3._rows = r3, i3._sortState && (i3.__originalOrder = [...i3.__originalOrder, t3]), Re(i3), i3._rebuildRowIdMap(), i3.__rowRenderEpoch++;
    for (const s3 of i3._rowPool) s3.__epoch = -1;
    i3.refreshVirtualWindow(true), i3._emitPluginEvent("row-inserted", { row: t3, index: n3 }), i3._emitDataChange(), o2 && (await new Promise((e4) => requestAnimationFrame(() => e4())), await Be(i3, n3, "insert"));
  }
  async removeRow(e3, t3 = true) {
    const o2 = this.#e, i3 = o2._rows[e3];
    if (!i3) return;
    t3 && await Be(o2, e3, "remove");
    const n3 = o2._rows.indexOf(i3);
    if (n3 < 0) return i3;
    const r3 = [...o2._rows];
    r3.splice(n3, 1), o2._rows = r3;
    const s3 = o2.sourceRows.indexOf(i3);
    if (s3 >= 0) {
      const e4 = [...o2.sourceRows];
      e4.splice(s3, 1), o2.sourceRows = e4;
    }
    if (o2._sortState) {
      const e4 = o2.__originalOrder.indexOf(i3);
      if (e4 >= 0) {
        const t4 = [...o2.__originalOrder];
        t4.splice(e4, 1), o2.__originalOrder = t4;
      }
    }
    Re(o2), o2._rebuildRowIdMap(), o2.__rowRenderEpoch++;
    for (const l3 of o2._rowPool) l3.__epoch = -1;
    return o2.refreshVirtualWindow(true), o2._emitDataChange(), t3 && requestAnimationFrame(() => {
      o2.querySelectorAll('[data-animating="remove"]').forEach((e4) => {
        e4.removeAttribute("data-animating");
      });
    }), i3;
  }
  async applyTransaction(e3, t3 = true) {
    const o2 = this.#e, i3 = { added: [], updated: [], removed: [] };
    if (e3.remove?.length) for (const { id: l3 } of e3.remove) {
      const e4 = o2._getRowEntry(l3);
      if (!e4) continue;
      const { row: n4 } = e4;
      if (t3) {
        const e5 = o2._rows.indexOf(n4);
        e5 >= 0 && await Be(o2, e5, "remove");
      }
      const r4 = o2._rows.indexOf(n4);
      if (r4 < 0) {
        i3.removed.push(n4);
        continue;
      }
      const s4 = [...o2._rows];
      s4.splice(r4, 1), o2._rows = s4;
      const a3 = o2.sourceRows.indexOf(n4);
      if (a3 >= 0) {
        const e5 = [...o2.sourceRows];
        e5.splice(a3, 1), o2.sourceRows = e5;
      }
      if (o2._sortState) {
        const e5 = o2.__originalOrder.indexOf(n4);
        if (e5 >= 0) {
          const t4 = [...o2.__originalOrder];
          t4.splice(e5, 1), o2.__originalOrder = t4;
        }
      }
      i3.removed.push(n4);
    }
    const n3 = new Set(e3.remove?.map((e4) => e4.id));
    if (e3.update?.length) for (const { id: l3, changes: a3 } of e3.update) {
      if (n3.has(l3)) continue;
      const e4 = o2._getRowEntry(l3);
      if (!e4) continue;
      const { row: t4, index: r4 } = e4;
      let s4 = false;
      for (const [i4, n4] of Object.entries(a3)) {
        const e5 = t4[i4];
        e5 !== n4 && (s4 = true, t4[i4] = n4, o2.dispatchEvent(new CustomEvent("cell-change", { detail: { row: t4, rowId: l3, rowIndex: r4, field: i4, oldValue: e5, newValue: n4, changes: a3, source: "api" }, bubbles: true, composed: true })));
      }
      s4 && i3.updated.push(t4);
    }
    if (e3.add?.length) for (const l3 of e3.add) {
      o2.sourceRows = [...o2.sourceRows, l3];
      const e4 = [...o2._rows];
      e4.push(l3), o2._rows = e4, o2._sortState && (o2.__originalOrder = [...o2.__originalOrder, l3]), i3.added.push(l3);
    }
    const r3 = i3.added.length > 0 || i3.removed.length > 0, s3 = i3.updated.length > 0;
    if (r3) {
      Re(o2), o2._rebuildRowIdMap(), o2.__rowRenderEpoch++;
      for (const e4 of o2._rowPool) e4.__epoch = -1;
      o2.refreshVirtualWindow(true);
    } else s3 && (Re(o2), o2._requestSchedulerPhase(ie.VIRTUALIZATION, "applyTransaction"));
    if ((r3 || s3) && o2._emitDataChange(), t3 && i3.added.length > 0) {
      await new Promise((e4) => requestAnimationFrame(() => e4()));
      for (const e4 of i3.added) {
        const t4 = o2._rows.indexOf(e4);
        t4 >= 0 && await Be(o2, t4, "insert");
      }
    }
    if (t3 && i3.updated.length > 0) for (const l3 of i3.updated) {
      const e4 = o2._rows.indexOf(l3);
      e4 >= 0 && await Be(o2, e4, "change");
    }
    return t3 && i3.removed.length > 0 && requestAnimationFrame(() => {
      o2.querySelectorAll('[data-animating="remove"]').forEach((e4) => {
        e4.removeAttribute("data-animating");
      });
    }), i3;
  }
  #L = null;
  #O = [];
  #D = null;
  applyTransactionAsync(e3) {
    return this.#L || (this.#L = { add: [], update: [], remove: [] }), e3.add && this.#L.add.push(...e3.add), e3.update && this.#L.update.push(...e3.update), e3.remove && this.#L.remove.push(...e3.remove), new Promise((e4) => {
      this.#O.push(e4), null === this.#D && (this.#D = requestAnimationFrame(() => {
        this.#D = null;
        const e5 = this.#L, t3 = this.#O;
        this.#L = null, this.#O = [], this.applyTransaction(e5, false).then((e6) => {
          for (const o2 of t3) o2(e6);
        });
      }));
    });
  }
};
function je(e3, t3, o2) {
  const i3 = document.createElement(e3);
  if (t3) for (const n3 in t3) {
    const e4 = t3[n3];
    null != e4 && i3.setAttribute(n3, e4);
  }
  return i3;
}
function Xe(e3, t3) {
  const o2 = document.createElement("div");
  if (e3 && (o2.className = e3), t3) for (const i3 in t3) {
    const e4 = t3[i3];
    null != e4 && o2.setAttribute(i3, e4);
  }
  return o2;
}
function Ye(e3, t3, o2) {
  const i3 = document.createElement("button");
  if (e3 && (i3.className = e3), t3) for (const n3 in t3) {
    const e4 = t3[n3];
    null != e4 && i3.setAttribute(n3, e4);
  }
  return i3;
}
var Ke = document.createElement("template");
function Ze() {
  return Ke.content.cloneNode(true);
}
function Qe(e3) {
  const t3 = document.createDocumentFragment(), o2 = Xe(e3.hasShell ? "tbw-grid-root has-shell" : "tbw-grid-root");
  if (e3.hasShell && e3.shellHeader && e3.shellBody) o2.appendChild(e3.shellHeader), o2.appendChild(e3.shellBody);
  else {
    const e4 = Xe("tbw-grid-content");
    e4.appendChild(Ze()), o2.appendChild(e4);
  }
  return t3.appendChild(o2), t3;
}
function Je(e3) {
  return e3 ? "string" == typeof e3 ? e3 : e3.outerHTML : "";
}
function et(e3) {
  return !!e3?.header?.title || (!!e3?.header?.toolbarContents?.length || (!!e3?.toolPanels?.length || (!!e3?.headerContents?.length || (!!e3?.header?.lightDomContent?.length || !!e3?.header?.hasToolButtonsContainer))));
}
function tt(e3, t3) {
  const o2 = e3.querySelector("tbw-grid-header");
  if (!o2) return;
  if (!t3.lightDomTitle) {
    const e4 = o2.getAttribute("title");
    e4 && (t3.lightDomTitle = e4);
  }
  const i3 = o2.querySelectorAll("tbw-grid-header-content");
  i3.length > 0 && 0 === t3.lightDomHeaderContent.length && (t3.lightDomHeaderContent = Array.from(i3)), o2.style.display = "none";
}
function ot(e3, t3, o2) {
  const i3 = e3.querySelector(":scope > tbw-grid-tool-buttons");
  if (!i3) return;
  t3.hasToolButtonsContainer = true;
  const n3 = "light-dom-toolbar-content";
  if (t3.lightDomToolbarContentIds.has(n3)) return;
  const r3 = { id: n3, order: 0, render: (e4) => {
    for (; i3.firstChild; ) e4.appendChild(i3.firstChild);
    return () => {
      for (; e4.firstChild; ) i3.appendChild(e4.firstChild);
    };
  } };
  t3.toolbarContents.set(n3, r3), t3.lightDomToolbarContentIds.add(n3), i3.style.display = "none";
}
function it(e3, t3, o2) {
  e3.querySelectorAll(":scope > tbw-grid-tool-panel").forEach((e4) => {
    const i3 = e4, n3 = i3.getAttribute("id"), r3 = i3.getAttribute("title");
    if (!n3 || !r3) return void y("TBW070", `Tool panel missing required id or title attribute: id="${n3 ?? ""}", title="${r3 ?? ""}"`);
    const s3 = i3.getAttribute("icon") ?? void 0, l3 = i3.getAttribute("tooltip") ?? void 0, a3 = parseInt(i3.getAttribute("order") ?? "100", 10);
    let c2;
    const d2 = o2?.(i3);
    if (d2) c2 = d2;
    else {
      const e5 = i3.innerHTML.trim();
      c2 = (t4) => {
        const o3 = document.createElement("div");
        return o3.innerHTML = e5, t4.appendChild(o3), () => o3.remove();
      };
    }
    const h = t3.toolPanels.get(n3);
    if (h) {
      if (d2) {
        h.render = c2, h.order = a3, h.icon = s3, h.tooltip = l3;
        const e5 = t3.panelCleanups.get(n3);
        e5 && (e5(), t3.panelCleanups.delete(n3));
      }
      return;
    }
    const u2 = { id: n3, title: r3, icon: s3, tooltip: l3, order: a3, render: c2 };
    t3.toolPanels.set(n3, u2), t3.lightDomToolPanelIds.add(n3), i3.style.display = "none";
  });
}
function nt(e3, t3, o2) {
  const i3 = t3?.header?.toolbarContents ?? [], n3 = [...o2.toolbarContents.values()], r3 = new Set(i3.map((e4) => e4.id)), s3 = [...i3];
  for (const l3 of n3) r3.has(l3.id) || s3.push(l3);
  for (const l3 of s3) {
    if (o2.toolbarContentCleanups.has(l3.id)) continue;
    if (!l3.render) continue;
    const t4 = e3.querySelector(`[data-toolbar-content="${l3.id}"]`);
    if (!t4) continue;
    const i4 = l3.render(t4);
    i4 && o2.toolbarContentCleanups.set(l3.id, i4);
  }
}
function rt(e3, t3) {
  const o2 = t3.lightDomHeaderContent.length > 0 && !t3.lightDomContentMoved, i3 = t3.headerContents.size > 0;
  if (!o2 && !i3) return;
  const n3 = e3.querySelector(".tbw-shell-content");
  if (!n3) return;
  if (o2) {
    for (const e4 of t3.lightDomHeaderContent) e4.style.display = "", n3.appendChild(e4);
    t3.lightDomContentMoved = true;
  }
  const r3 = [...t3.headerContents.values()].sort((e4, t4) => (e4.order ?? 100) - (t4.order ?? 100));
  for (const s3 of r3) {
    const e4 = t3.headerContentCleanups.get(s3.id);
    e4 && (e4(), t3.headerContentCleanups.delete(s3.id));
    let o3 = n3.querySelector(`[data-header-content="${s3.id}"]`);
    o3 || (o3 = document.createElement("div"), o3.setAttribute("data-header-content", s3.id), n3.appendChild(o3));
    const i4 = s3.render(o3);
    i4 && t3.headerContentCleanups.set(s3.id, i4);
  }
}
function st(e3, t3, o2) {
  if (t3.isPanelOpen) for (const [i3, n3] of t3.toolPanels) {
    const o3 = t3.expandedSections.has(i3), r3 = e3.querySelector(`[data-section="${i3}"]`), s3 = r3?.querySelector(".tbw-accordion-content");
    if (!r3 || !s3) continue;
    r3.classList.toggle("expanded", o3);
    const l3 = r3.querySelector(".tbw-accordion-header");
    if (l3 && l3.setAttribute("aria-expanded", String(o3)), o3) {
      if (0 === s3.children.length) {
        const e4 = n3.render(s3);
        e4 && t3.panelCleanups.set(i3, e4);
      }
    } else {
      const e4 = t3.panelCleanups.get(i3);
      e4 && (e4(), t3.panelCleanups.delete(i3)), s3.innerHTML = "";
    }
  }
}
function lt(e3, t3) {
  const o2 = e3.querySelector("[data-panel-toggle]");
  o2 && (o2.classList.toggle("active", t3.isPanelOpen), o2.setAttribute("aria-pressed", String(t3.isPanelOpen)));
}
function at(e3, t3) {
  const o2 = e3.querySelector(".tbw-tool-panel");
  o2 && (o2.classList.toggle("open", t3.isPanelOpen), t3.isPanelOpen || (o2.style.width = ""));
}
function ct(e3) {
  for (const t3 of e3.toolbarContentCleanups.values()) t3();
  e3.toolbarContentCleanups.clear();
  for (const t3 of e3.panelCleanups.values()) t3();
  e3.panelCleanups.clear();
  for (const t3 of e3.headerContentCleanups.values()) t3();
  e3.headerContentCleanups.clear(), e3.lightDomContentMoved = false;
}
function dt(e3, t3, o2) {
  const i3 = e3.querySelector(`[data-section="${t3}"]`);
  i3 && i3.classList.toggle("expanded", o2);
}
function ht(e3, t3, o2, i3) {
  const r3 = et(t3), s3 = [], l3 = ["tbw-grid-header", "tbw-grid-tool-buttons", "tbw-grid-tool-panel", "tbw-grid-column", "tbw-grid-detail", "tbw-grid-responsive-card"];
  for (const n3 of l3) {
    e3.querySelectorAll(`:scope > ${n3}`).forEach((e4) => s3.push(e4));
  }
  e3.replaceChildren();
  for (const n3 of s3) e3.appendChild(n3);
  if (r3) {
    const r4 = Je(i3?.toolPanel ?? n.toolPanel), s4 = Je(i3?.expand ?? n.expand);
    Je(i3?.collapse ?? n.collapse);
    const l4 = [...t3?.header?.toolbarContents ?? []].sort((e4, t4) => (e4.order ?? 0) - (t4.order ?? 0)), a3 = [...t3?.toolPanels ?? []].sort((e4, t4) => (e4.order ?? 100) - (t4.order ?? 100)), c2 = { title: t3?.header?.title ?? void 0, hasPanels: a3.length > 0, isPanelOpen: o2.isPanelOpen, toolPanelIcon: r4, configButtons: l4.map((e4) => ({ id: e4.id, hasElement: false, hasRender: !!e4.render })), apiButtons: [] }, d2 = { position: t3?.toolPanel?.position ?? "right", isPanelOpen: o2.isPanelOpen, expandIcon: s4, panels: a3.map((e4) => ({ id: e4.id, title: e4.title, icon: Je(e4.icon), isExpanded: o2.expandedSections.has(e4.id) })) }, h = Qe({ hasShell: true, shellHeader: (function(e4) {
      const t4 = Xe("tbw-shell-header", { part: "shell-header", role: "presentation" });
      if (e4.title) {
        const o4 = Xe("tbw-shell-title");
        o4.textContent = e4.title, t4.appendChild(o4);
      }
      const o3 = Xe("tbw-shell-content", { part: "shell-content", role: "presentation", "data-light-dom-header-content": "" });
      t4.appendChild(o3);
      const i4 = Xe("tbw-shell-toolbar", { part: "shell-toolbar", role: "presentation" });
      for (const n3 of e4.configButtons) n3.hasRender && i4.appendChild(Xe("tbw-toolbar-content-slot", { "data-toolbar-content": n3.id }));
      for (const n3 of e4.apiButtons) n3.hasRender && i4.appendChild(Xe("tbw-toolbar-content-slot", { "data-toolbar-content": n3.id }));
      if ((e4.configButtons.some((e5) => e5.hasRender) || e4.apiButtons.some((e5) => e5.hasRender)) && e4.hasPanels && i4.appendChild(Xe("tbw-toolbar-separator")), e4.hasPanels) {
        const t5 = Ye(e4.isPanelOpen ? "tbw-toolbar-btn active" : "tbw-toolbar-btn", { "data-panel-toggle": "", title: "Settings", "aria-label": "Toggle settings panel", "aria-pressed": String(e4.isPanelOpen), "aria-controls": "tbw-tool-panel" });
        t5.innerHTML = e4.toolPanelIcon, i4.appendChild(t5);
      }
      return t4.appendChild(i4), t4;
    })(c2), shellBody: (function(e4) {
      const t4 = Xe("tbw-shell-body"), o3 = e4.panels.length > 0, i4 = 1 === e4.panels.length, n3 = Xe("tbw-grid-content");
      n3.appendChild(Ze());
      let r5 = null;
      if (o3) {
        r5 = je("aside", { class: e4.isPanelOpen ? "tbw-tool-panel open" : "tbw-tool-panel", part: "tool-panel", "data-position": e4.position, role: "presentation", id: "tbw-tool-panel" });
        const t5 = "left" === e4.position ? "right" : "left";
        r5.appendChild(Xe("tbw-tool-panel-resize", { "data-resize-handle": "", "data-handle-position": t5, "aria-hidden": "true" }));
        const o4 = Xe("tbw-tool-panel-content", { role: "presentation" }), n4 = Xe("tbw-accordion");
        for (const r6 of e4.panels) {
          const t6 = Xe(`tbw-accordion-section${r6.isExpanded ? " expanded" : ""}${i4 ? " single" : ""}`, { "data-section": r6.id }), o5 = Ye("tbw-accordion-header", { "aria-expanded": String(r6.isExpanded), "aria-controls": `tbw-section-${r6.id}` });
          if (i4 && o5.setAttribute("aria-disabled", "true"), r6.icon) {
            const e5 = je("span", { class: "tbw-accordion-icon" });
            e5.innerHTML = r6.icon, o5.appendChild(e5);
          }
          const s5 = je("span", { class: "tbw-accordion-title" });
          if (s5.textContent = r6.title, o5.appendChild(s5), !i4) {
            const t7 = je("span", { class: "tbw-accordion-chevron" });
            t7.innerHTML = e4.expandIcon, o5.appendChild(t7);
          }
          t6.appendChild(o5), t6.appendChild(Xe("tbw-accordion-content", { id: `tbw-section-${r6.id}`, role: "presentation" })), n4.appendChild(t6);
        }
        o4.appendChild(n4), r5.appendChild(o4);
      }
      return "left" === e4.position && r5 ? (t4.appendChild(r5), t4.appendChild(n3)) : (t4.appendChild(n3), r5 && t4.appendChild(r5)), t4;
    })(d2) });
    e3.appendChild(h);
  } else {
    const t4 = Qe({ hasShell: false });
    e3.appendChild(t4);
  }
  return r3;
}
Ke.innerHTML = '\n  <div class="tbw-scroll-area">\n    <div class="rows-body-wrapper">\n      <div class="rows-body" role="grid">\n        <div class="header" role="rowgroup">\n          <div class="header-row" role="row" part="header-row"></div>\n        </div>\n        <div class="rows-container" role="presentation">\n          <div class="rows-viewport" role="presentation">\n            <div class="rows"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="faux-vscroll">\n    <div class="faux-vscroll-spacer"></div>\n  </div>\n  <div class="tbw-sr-only" aria-live="polite" aria-atomic="true"></div>\n';
var ut = "tbw-grid-styles";
var gt = "";
var ft = /* @__PURE__ */ new Map();
function pt() {
  const e3 = (function() {
    let e4 = document.getElementById(ut);
    return e4 || (e4 = document.createElement("style"), e4.id = ut, e4.setAttribute("data-tbw-grid", "true"), document.head.appendChild(e4)), e4;
  })(), t3 = Array.from(ft.values()).join("\n");
  e3.textContent = `${gt}

/* Plugin Styles */
${t3}`;
}
async function wt(e3) {
  if (gt) return;
  if ("string" == typeof e3 && e3.length > 0) return gt = e3, void pt();
  await new Promise((e4) => setTimeout(e4, 50));
  const t3 = (function() {
    try {
      for (const e4 of Array.from(document.styleSheets)) try {
        const t4 = Array.from(e4.cssRules || []).map((e5) => e5.cssText).join("\n");
        if (t4.includes(".tbw-grid-root") && t4.includes("tbw-grid")) return t4;
      } catch {
        continue;
      }
    } catch (e4) {
      y("TBW120", `Failed to extract grid.css from document stylesheets: ${e4}`);
    }
    return null;
  })();
  t3 ? (gt = t3, pt()) : "undefined" != typeof process && "test" === process.env?.NODE_ENV || y("TBW121", `Could not find grid.css in document.styleSheets. Grid styling will not work. Available stylesheets: ${Array.from(document.styleSheets).map((e4) => e4.href || "(inline)").join(", ")}`);
}
function bt(e3) {
  e3.startY = null, e3.startX = null, e3.lastY = null, e3.lastX = null, e3.lastTime = null, e3.locked = false;
}
function mt(e3) {
  e3.momentumRaf && (cancelAnimationFrame(e3.momentumRaf), e3.momentumRaf = 0);
}
function vt(e3, t3) {
  (Math.abs(e3.velocityY) > 0.1 || Math.abs(e3.velocityX) > 0.1) && (function(e4, t4) {
    const o2 = 0.95, i3 = 0.01, n3 = () => {
      e4.velocityY *= o2, e4.velocityX *= o2;
      const r3 = 16 * e4.velocityY, s3 = 16 * e4.velocityX;
      Math.abs(e4.velocityY) > i3 && (t4.fauxScrollbar.scrollTop += r3), Math.abs(e4.velocityX) > i3 && t4.scrollArea && (t4.scrollArea.scrollLeft += s3), Math.abs(e4.velocityY) > i3 || Math.abs(e4.velocityX) > i3 ? e4.momentumRaf = requestAnimationFrame(n3) : e4.momentumRaf = 0;
    };
    e4.momentumRaf = requestAnimationFrame(n3);
  })(e3, t3), bt(e3);
}
function Ct(e3, t3, o2, i3) {
  e3.addEventListener("pointerdown", (o3) => {
    "touch" === o3.pointerType && null === t3.activePointerId && (t3.activePointerId = o3.pointerId, e3.setPointerCapture(o3.pointerId), (function(e4, t4, o4) {
      mt(o4), o4.startY = t4, o4.startX = e4, o4.lastY = t4, o4.lastX = e4, o4.lastTime = performance.now(), o4.velocityY = 0, o4.velocityX = 0, o4.locked = false;
    })(o3.clientX, o3.clientY, t3));
  }, { passive: true, signal: i3 }), e3.addEventListener("pointermove", (e4) => {
    if (e4.pointerId !== t3.activePointerId) return;
    const i4 = (function(e5, t4, o3, i5) {
      if (null === o3.lastY || null === o3.lastX) return false;
      const n3 = performance.now(), r3 = o3.lastY - t4, s3 = o3.lastX - e5;
      if (null !== o3.lastTime) {
        const e6 = n3 - o3.lastTime;
        e6 > 0 && (o3.velocityY = r3 / e6, o3.velocityX = s3 / e6);
      }
      if (o3.lastY = t4, o3.lastX = e5, o3.lastTime = n3, o3.locked) return i5.fauxScrollbar.scrollTop += r3, i5.scrollArea && (i5.scrollArea.scrollLeft += s3), true;
      const l3 = null !== o3.startY ? Math.abs(o3.startY - t4) : 0, a3 = null !== o3.startX ? Math.abs(o3.startX - e5) : 0;
      if (l3 < 3 && a3 < 3) return false;
      const c2 = l3 >= a3, { scrollHeight: d2, clientHeight: h } = i5.fauxScrollbar, u2 = d2 - h > 0;
      let g = false;
      if (i5.scrollArea) {
        const { scrollWidth: e6, clientWidth: t5 } = i5.scrollArea;
        g = e6 - t5 > 0;
      }
      return !!(c2 && u2 || !c2 && g) && (o3.locked = true, i5.fauxScrollbar.scrollTop += r3, i5.scrollArea && (i5.scrollArea.scrollLeft += s3), true);
    })(e4.clientX, e4.clientY, t3, o2);
    i4 && e4.preventDefault();
  }, { passive: false, signal: i3 }), e3.addEventListener("pointerup", (e4) => {
    e4.pointerId === t3.activePointerId && (t3.activePointerId = null, vt(t3, o2));
  }, { passive: true, signal: i3 }), e3.addEventListener("pointercancel", (e4) => {
    e4.pointerId === t3.activePointerId && (t3.activePointerId = null, bt(t3));
  }, { passive: true, signal: i3 }), e3.addEventListener("lostpointercapture", (e4) => {
    e4.pointerId === t3.activePointerId && (t3.activePointerId = null, bt(t3));
  }, { passive: true, signal: i3 });
}
var _t = [{ property: "editable", pluginName: "editing", level: "column", description: 'the "editable" column property', isUsed: (e3) => true === e3 || "function" == typeof e3 }, { property: "editor", pluginName: "editing", level: "column", description: 'the "editor" column property' }, { property: "editorParams", pluginName: "editing", level: "column", description: 'the "editorParams" column property' }, { property: "group", pluginName: "groupingColumns", level: "column", description: 'the "group" column property' }, { property: "pinned", pluginName: "pinnedColumns", level: "column", description: 'the "pinned" column property', isUsed: (e3) => "left" === e3 || "right" === e3 || "start" === e3 || "end" === e3 }, { property: "sticky", pluginName: "pinnedColumns", level: "column", description: 'the "sticky" column property (deprecated, use "pinned")', isUsed: (e3) => "left" === e3 || "right" === e3 || "start" === e3 || "end" === e3 }];
var yt = [{ property: "rowEditable", pluginName: "editing", level: "config", description: 'the "rowEditable" config property', isUsed: (e3) => "function" == typeof e3 }, { property: "columnGroups", pluginName: "groupingColumns", level: "config", description: 'the "columnGroups" config property', isUsed: (e3) => Array.isArray(e3) && e3.length > 0 }];
function Rt(e3) {
  return `import { ${St(e3)}Plugin } from '@toolbox-web/grid/plugins/${t3 = e3, t3.replace(/[A-Z]/g, (e4) => `-${e4.toLowerCase()}`)}';`;
  var t3;
}
function St(e3) {
  return e3.charAt(0).toUpperCase() + e3.slice(1);
}
function Et(e3, t3) {
  return e3.some((e4) => e4.name === t3);
}
function xt(e3, t3) {
  return e3 && "object" == typeof e3 ? "__rowCacheKey" in e3 ? e3.__rowCacheKey : "rowId" in e3 && null != e3.rowId ? `id:${e3.rowId}` : t3 ? `id:${t3(e3)}` : e3 : e3;
}
function At(e3, t3, o2) {
  const i3 = xt(t3, o2);
  return "string" == typeof i3 ? e3.byKey.get(i3) : i3 && "object" == typeof i3 ? e3.byRef.get(i3) : void 0;
}
function Tt(e3, t3, o2) {
  if (t3 < 0 || t3 >= e3.length) return;
  const i3 = e3[t3], n3 = o2 - i3.height;
  if (0 !== n3) {
    i3.height = o2, i3.measured = true;
    for (let o3 = t3 + 1; o3 < e3.length; o3++) e3[o3].offset += n3;
  }
}
function Ht(e3, t3) {
  if (0 === e3.length) return -1;
  if (t3 <= 0) return 0;
  let o2 = 0, i3 = e3.length - 1;
  for (; o2 <= i3; ) {
    const n3 = Math.floor((o2 + i3) / 2), r3 = e3[n3], s3 = r3.offset + r3.height;
    if (t3 < r3.offset) i3 = n3 - 1;
    else {
      if (!(t3 >= s3)) return n3;
      o2 = n3 + 1;
    }
  }
  return Math.max(0, Math.min(o2, e3.length - 1));
}
function Pt(e3, t3) {
  const { positionCache: o2, heightCache: i3, rows: n3, start: r3, end: s3, getPluginHeight: l3, getRowId: a3 } = e3;
  let c2 = false;
  t3.forEach((e4) => {
    const t4 = e4.dataset.rowIndex;
    if (!t4) return;
    const d3 = parseInt(t4, 10);
    if (d3 < r3 || d3 >= s3 || d3 >= n3.length) return;
    const h2 = n3[d3], u2 = l3?.(h2, d3);
    if (void 0 !== u2) {
      const e5 = o2[d3];
      return void ((!e5.measured || Math.abs(e5.height - u2) > 1) && (Tt(o2, d3, u2), c2 = true));
    }
    const g = e4.offsetHeight;
    if (g > 0) {
      const e5 = o2[d3];
      (!e5.measured || Math.abs(e5.height - g) > 1) && (Tt(o2, d3, g), (function(e6, t5, o3, i4) {
        const n4 = xt(t5, i4);
        "string" == typeof n4 ? e6.byKey.set(n4, o3) : n4 && "object" == typeof n4 && e6.byRef.set(n4, o3);
      })(i3, h2, g, a3), c2 = true);
    }
  });
  const d2 = c2 ? (function(e4) {
    let t4 = 0;
    for (const o3 of e4) o3.measured && t4++;
    return t4;
  })(o2) : 0, h = c2 ? (function(e4, t4) {
    let o3 = 0, i4 = 0;
    for (const n4 of e4) n4.measured && (o3 += n4.height, i4++);
    return i4 > 0 ? o3 / i4 : t4;
  })(o2, e3.defaultHeight) : 0;
  return { hasChanges: c2, measuredCount: d2, averageHeight: h };
}
var Ot = class {
  #e;
  state;
  constructor(e3, t3) {
    this.#e = e3, this.state = __spreadValues({ enabled: true, rowHeight: 28, bypassThreshold: 24, start: 0, end: 0, container: null, viewportEl: null, totalHeightEl: null, positionCache: null, heightCache: { byKey: /* @__PURE__ */ new Map(), byRef: /* @__PURE__ */ new WeakMap() }, averageHeight: 28, measuredCount: 0, variableHeights: false, cachedViewportHeight: 0, cachedFauxHeight: 0, cachedScrollAreaHeight: 0, scrollAreaEl: null }, t3);
  }
  updateCachedGeometry() {
    const e3 = this.state, t3 = e3.container, o2 = e3.viewportEl ?? t3;
    o2 && (e3.cachedViewportHeight = o2.clientHeight), t3 && (e3.cachedFauxHeight = t3.clientHeight);
    const i3 = e3.scrollAreaEl;
    i3 && (e3.cachedScrollAreaHeight = i3.clientHeight);
  }
  calculateTotalSpacerHeight(e3, t3 = false) {
    const o2 = this.state;
    let i3, n3, r3;
    if (t3) {
      const e4 = o2.container ?? this.#e._hostElement, t4 = o2.viewportEl ?? e4, s4 = o2.scrollAreaEl;
      i3 = e4?.clientHeight ?? 0, n3 = t4?.clientHeight ?? 0, r3 = s4 ? s4.clientHeight : i3, o2.cachedFauxHeight = i3, o2.cachedViewportHeight = n3, o2.cachedScrollAreaHeight = r3;
    } else i3 = o2.cachedFauxHeight, n3 = o2.cachedViewportHeight, r3 = o2.cachedScrollAreaHeight || i3;
    const s3 = r3 - n3, l3 = Math.max(0, i3 - r3);
    let a3, c2 = 0;
    return o2.variableHeights && o2.positionCache ? a3 = (function(e4) {
      if (0 === e4.length) return 0;
      const t4 = e4[e4.length - 1];
      return t4.offset + t4.height;
    })(o2.positionCache) : (a3 = e3 * o2.rowHeight, c2 = this.#e._getPluginExtraHeight()), a3 + s3 + c2 + l3;
  }
  initializePositionCache() {
    const e3 = this.state;
    if (!e3.variableHeights) return;
    const t3 = this.#e, o2 = t3._rows, i3 = e3.rowHeight || 28, n3 = t3.effectiveConfig?.rowHeight, r3 = t3.effectiveConfig?.getRowId, s3 = r3 ? (e4) => r3(e4) : void 0;
    e3.positionCache = (function(e4, t4, o3, i4, n4) {
      const r4 = new Array(e4.length);
      let s4 = 0;
      for (let l4 = 0; l4 < e4.length; l4++) {
        const a3 = e4[l4];
        let c2 = n4?.(a3, l4), d2 = void 0 !== c2;
        void 0 === c2 && (c2 = At(t4, a3, i4.rowId), d2 = void 0 !== c2), void 0 === c2 && (c2 = o3, d2 = false), r4[l4] = { offset: s4, height: c2, measured: d2 }, s4 += c2;
      }
      return r4;
    })(o2, e3.heightCache, i3, { rowId: s3 }, (e4, o3) => {
      const i4 = t3._getPluginRowHeight(e4, o3);
      if (void 0 !== i4) return i4;
      if (n3) {
        const t4 = n3(e4, o3);
        if (void 0 !== t4 && t4 > 0) return t4;
      }
    });
    const l3 = (function(e4, t4, o3, i4) {
      let n4 = 0, r4 = 0;
      for (let s4 = 0; s4 < e4.length; s4++) {
        const o4 = e4[s4];
        if (o4.measured) {
          const e5 = i4?.(t4[s4], s4);
          void 0 === e5 && (r4 += o4.height, n4++);
        }
      }
      return { measuredCount: n4, averageHeight: n4 > 0 ? r4 / n4 : o3 };
    })(e3.positionCache, o2, i3, (e4, o3) => t3._getPluginRowHeight(e4, o3));
    e3.measuredCount = l3.measuredCount, l3.measuredCount > 0 && (e3.averageHeight = l3.averageHeight);
  }
  invalidateRowHeight(e3, t3) {
    const o2 = this.state;
    if (!o2.variableHeights) return;
    if (!o2.positionCache) return;
    const i3 = this.#e._rows;
    if (e3 < 0 || e3 >= i3.length) return;
    const n3 = i3[e3];
    let r3 = t3;
    void 0 === r3 && (r3 = this.#e._getPluginRowHeight(n3, e3)), void 0 === r3 && (r3 = o2.rowHeight);
    const s3 = o2.positionCache[e3];
    if (s3 && !(Math.abs(s3.height - r3) < 1) && (Tt(o2.positionCache, e3, r3), o2.totalHeightEl)) {
      const e4 = this.calculateTotalSpacerHeight(i3.length);
      o2.totalHeightEl.style.height = `${e4}px`;
    }
  }
  measureRenderedRowHeights(e3, t3) {
    const o2 = this.state;
    if (!o2.variableHeights) return;
    if (!o2.positionCache) return;
    const i3 = this.#e, n3 = i3._bodyEl;
    if (!n3) return;
    const r3 = n3.querySelectorAll(".data-grid-row"), s3 = i3.effectiveConfig?.getRowId, l3 = i3._rows, a3 = Pt({ positionCache: o2.positionCache, heightCache: o2.heightCache, rows: l3, defaultHeight: o2.rowHeight, start: e3, end: t3, getPluginHeight: (e4, t4) => i3._getPluginRowHeight(e4, t4), getRowId: s3 ? (e4) => s3(e4) : void 0 }, r3);
    if (a3.hasChanges && (o2.measuredCount = a3.measuredCount, o2.averageHeight = a3.averageHeight, o2.totalHeightEl)) {
      const e4 = this.calculateTotalSpacerHeight(l3.length);
      o2.totalHeightEl.style.height = `${e4}px`;
    }
  }
  refreshVirtualWindow(e3 = false, t3 = false) {
    const o2 = this.state, i3 = this.#e, n3 = i3._bodyEl;
    if (!n3) return false;
    const r3 = i3._rows.length;
    if (!o2.enabled) return i3._renderVisibleRows(0, r3), t3 || i3._afterPluginRender(), true;
    if (r3 <= o2.bypassThreshold) return o2.start = 0, o2.end = r3, e3 && (n3.style.transform = "translateY(0px)"), i3._renderVisibleRows(0, r3, i3.__rowRenderEpoch), e3 && o2.variableHeights && this.initializePositionCache(), e3 && o2.totalHeightEl && (o2.totalHeightEl.style.height = `${this.calculateTotalSpacerHeight(r3, true)}px`), i3._updateAriaCounts(r3, i3._visibleColumns.length), t3 || i3._afterPluginRender(), true;
    const s3 = o2.container, l3 = o2.viewportEl ?? s3, a3 = e3 ? o2.cachedViewportHeight = l3.clientHeight : o2.cachedViewportHeight || (o2.cachedViewportHeight = l3.clientHeight), c2 = o2.rowHeight, d2 = s3.scrollTop;
    let h;
    e3 && o2.variableHeights && this.initializePositionCache();
    const u2 = o2.positionCache;
    if (o2.variableHeights && u2 && u2.length > 0) h = Ht(u2, d2), -1 === h && (h = 0);
    else {
      h = Math.floor(d2 / c2);
      let e4 = 0;
      const t4 = 10;
      for (; e4 < t4; ) {
        const t5 = i3._getPluginExtraHeightBefore(h), o3 = Math.floor((d2 - t5) / c2);
        if (o3 >= h || o3 < 0) break;
        h = o3, e4++;
      }
    }
    h -= h % 2, h < 0 && (h = 0);
    const g = i3._adjustPluginVirtualStart(h, d2, c2);
    let f2;
    if (void 0 !== g && g < h && (h = g, h -= h % 2, h < 0 && (h = 0)), o2.variableHeights && u2 && u2.length > 0) {
      const e4 = a3 + 3 * c2;
      let t4 = 0;
      for (f2 = h; f2 < r3 && t4 < e4; ) t4 += u2[f2].height, f2++;
      const o3 = Math.ceil(a3 / c2) + 3;
      f2 - h < o3 && (f2 = Math.min(h + o3, r3));
    } else {
      f2 = h + (Math.ceil(a3 / c2) + 3);
    }
    f2 > r3 && (f2 = r3);
    const p = o2.start, w2 = o2.end;
    if (!e3 && h === p && f2 === w2) return false;
    o2.start = h, o2.end = f2;
    const b = e3 ? o2.cachedFauxHeight = s3.clientHeight : o2.cachedFauxHeight || (o2.cachedFauxHeight = s3.clientHeight);
    if (e3) {
      const e4 = o2.scrollAreaEl;
      e4 && (o2.cachedScrollAreaHeight = e4.clientHeight);
    }
    if (0 === b && a3 > 0) return i3._requestSchedulerPhase(ie.VIRTUALIZATION, "stale-refs-retry"), false;
    if (e3 && o2.totalHeightEl) {
      const e4 = this.calculateTotalSpacerHeight(r3);
      o2.totalHeightEl.style.height = `${e4}px`;
    }
    let m;
    if (o2.variableHeights && u2 && u2[h]) m = u2[h].offset;
    else {
      m = h * c2 + i3._getPluginExtraHeightBefore(h);
    }
    const v = -(d2 - m);
    return n3.style.transform = `translateY(${v}px)`, i3._renderVisibleRows(h, f2, i3.__rowRenderEpoch), e3 && o2.variableHeights && this.measureRenderedRowHeights(h, f2), i3._updateAriaCounts(r3, i3._visibleColumns.length), e3 && !t3 && (i3._afterPluginRender(), queueMicrotask(() => {
      if (!o2.totalHeightEl) return;
      const e4 = this.calculateTotalSpacerHeight(r3);
      0 === o2.cachedFauxHeight && o2.cachedViewportHeight > 0 || (o2.totalHeightEl.style.height = `${e4}px`);
    })), true;
  }
};
var Dt = class _Dt {
  constructor(e3) {
    this.grid = e3;
  }
  plugins = [];
  getPlugins() {
    return this.plugins;
  }
  pluginMap = /* @__PURE__ */ new Map();
  cellRenderers = /* @__PURE__ */ new Map();
  headerRenderers = /* @__PURE__ */ new Map();
  cellEditors = /* @__PURE__ */ new Map();
  _hasAfterCellRender = false;
  _hasAfterRowRender = false;
  eventListeners = /* @__PURE__ */ new Map();
  queryHandlers = /* @__PURE__ */ new Map();
  static deprecationWarned = /* @__PURE__ */ new WeakSet();
  attachAll(e3) {
    for (const t3 of e3) this.attach(t3);
  }
  attach(e3) {
    if ((function(e4, t3, o2) {
      const i3 = e4.name, n3 = e4.constructor.dependencies ?? [];
      for (const r3 of n3) {
        const e5 = r3.name, n4 = r3.required ?? true, s3 = r3.reason;
        if (!t3.some((t4) => t4.name === e5)) {
          const t4 = s3 ?? `${St(i3)}Plugin requires ${St(e5)}Plugin`, r4 = Rt(e5);
          n4 ? _("TBW020", `Plugin dependency error:

${t4}.

  → Add the plugin to your gridConfig.plugins array BEFORE ${St(i3)}Plugin:
    ${r4}
    plugins: [new ${St(e5)}Plugin(), new ${St(i3)}Plugin()]`, o2) : R("TBW021", `${St(i3)}Plugin: Optional "${e5}" plugin not found. Some features may be unavailable.`, o2);
        }
      }
    })(e3, this.plugins, this.grid.getAttribute("id") ?? void 0), this.pluginMap.set(e3.constructor, e3), this.plugins.push(e3), e3.cellRenderers) for (const [t3, o2] of Object.entries(e3.cellRenderers)) this.cellRenderers.set(t3, o2);
    if (e3.headerRenderers) for (const [t3, o2] of Object.entries(e3.headerRenderers)) this.headerRenderers.set(t3, o2);
    if (e3.cellEditors) for (const [t3, o2] of Object.entries(e3.cellEditors)) this.cellEditors.set(t3, o2);
    this.registerQueryHandlers(e3), this.warnDeprecatedHooks(e3), e3.attach(this.grid), this.#I();
    for (const t3 of this.plugins) t3 !== e3 && t3.onPluginAttached && t3.onPluginAttached(e3.name, e3);
  }
  registerQueryHandlers(e3) {
    const t3 = e3.constructor.manifest;
    if (t3?.queries) for (const o2 of t3.queries) {
      let t4 = this.queryHandlers.get(o2.type);
      t4 || (t4 = /* @__PURE__ */ new Set(), this.queryHandlers.set(o2.type, t4)), t4.add(e3);
    }
  }
  warnDeprecatedHooks(e3) {
    const t3 = e3.constructor;
    if (_Dt.deprecationWarned.has(t3)) return;
    if (!se()) return;
    const o2 = "function" == typeof e3.getExtraHeight || "function" == typeof e3.getExtraHeightBefore, i3 = "function" == typeof e3.getRowHeight;
    o2 && !i3 && (_Dt.deprecationWarned.add(t3), y("TBW023", `"${e3.name}" uses getExtraHeight() / getExtraHeightBefore() which are deprecated and will be removed in v2.0.
  → Migrate to getRowHeight(row, index) for better variable row height support.`, this.grid.getAttribute("id") ?? void 0));
  }
  unregisterQueryHandlers(e3) {
    for (const [t3, o2] of this.queryHandlers) o2.delete(e3), 0 === o2.size && this.queryHandlers.delete(t3);
  }
  detachAll() {
    for (const e3 of this.plugins) for (const t3 of this.plugins) t3 !== e3 && t3.onPluginDetached && t3.onPluginDetached(e3.name);
    for (let e3 = this.plugins.length - 1; e3 >= 0; e3--) {
      const t3 = this.plugins[e3];
      this.unsubscribeAll(t3), this.unregisterQueryHandlers(t3), t3.detach();
    }
    this.plugins = [], this.pluginMap.clear(), this.cellRenderers.clear(), this.headerRenderers.clear(), this.cellEditors.clear(), this.eventListeners.clear(), this.queryHandlers.clear(), this._hasAfterCellRender = false, this._hasAfterRowRender = false;
  }
  getPlugin(e3) {
    return this.pluginMap.get(e3);
  }
  getPluginByName(e3) {
    return this.plugins.find((t3) => t3.name === e3 || t3.aliases?.includes(e3));
  }
  hasPlugin(e3) {
    return this.pluginMap.has(e3);
  }
  getAll() {
    return this.plugins;
  }
  getRegisteredPluginNames() {
    return this.plugins.map((e3) => e3.name);
  }
  getCellRenderer(e3) {
    return this.cellRenderers.get(e3);
  }
  getHeaderRenderer(e3) {
    return this.headerRenderers.get(e3);
  }
  getCellEditor(e3) {
    return this.cellEditors.get(e3);
  }
  getPluginStyles() {
    return this.plugins.filter((e3) => e3.styles).map((e3) => ({ name: e3.name, styles: e3.styles }));
  }
  processRows(e3) {
    let t3 = [...e3];
    for (const o2 of this.plugins) o2.processRows && (t3 = o2.processRows(t3));
    return t3;
  }
  processColumns(e3) {
    let t3 = [...e3];
    for (const o2 of this.plugins) o2.processColumns && (t3 = o2.processColumns(t3));
    return t3;
  }
  beforeRender() {
    for (const e3 of this.plugins) e3.beforeRender?.();
  }
  afterRender() {
    for (const e3 of this.plugins) e3.afterRender?.();
  }
  afterCellRender(e3) {
    for (const t3 of this.plugins) t3.afterCellRender?.(e3);
  }
  hasAfterCellRenderHook() {
    return this._hasAfterCellRender;
  }
  afterRowRender(e3) {
    for (const t3 of this.plugins) t3.afterRowRender?.(e3);
  }
  hasAfterRowRenderHook() {
    return this._hasAfterRowRender;
  }
  #I() {
    this._hasAfterCellRender = this.plugins.some((e3) => "function" == typeof e3.afterCellRender), this._hasAfterRowRender = this.plugins.some((e3) => "function" == typeof e3.afterRowRender);
  }
  onScrollRender() {
    for (const e3 of this.plugins) e3.onScrollRender?.();
  }
  getExtraHeight() {
    let e3 = 0;
    for (const t3 of this.plugins) "function" == typeof t3.getExtraHeight && (e3 += t3.getExtraHeight());
    return e3;
  }
  hasExtraHeight() {
    for (const e3 of this.plugins) if ("function" == typeof e3.getExtraHeight && e3.getExtraHeight() > 0) return true;
    return false;
  }
  getExtraHeightBefore(e3) {
    let t3 = 0;
    for (const o2 of this.plugins) "function" == typeof o2.getExtraHeightBefore && (t3 += o2.getExtraHeightBefore(e3));
    return t3;
  }
  getRowHeight(e3, t3) {
    for (const o2 of this.plugins) if ("function" == typeof o2.getRowHeight) {
      const i3 = o2.getRowHeight(e3, t3);
      if (void 0 !== i3) return i3;
    }
  }
  hasRowHeightPlugin() {
    for (const e3 of this.plugins) if ("function" == typeof e3.getRowHeight) return true;
    return false;
  }
  adjustVirtualStart(e3, t3, o2) {
    let i3 = e3;
    for (const n3 of this.plugins) if ("function" == typeof n3.adjustVirtualStart) {
      const r3 = n3.adjustVirtualStart(e3, t3, o2);
      r3 < i3 && (i3 = r3);
    }
    return i3;
  }
  renderRow(e3, t3, o2) {
    for (const i3 of this.plugins) if (i3.renderRow?.(e3, t3, o2)) return true;
    return false;
  }
  queryPlugins(e3) {
    const t3 = [], o2 = this.queryHandlers.get(e3.type);
    if (o2 && o2.size > 0) {
      for (const i3 of o2) {
        const o3 = i3.handleQuery?.(e3) ?? i3.onPluginQuery?.(e3);
        void 0 !== o3 && t3.push(o3);
      }
      return t3;
    }
    for (const i3 of this.plugins) {
      const o3 = i3.handleQuery?.(e3) ?? i3.onPluginQuery?.(e3);
      void 0 !== o3 && t3.push(o3);
    }
    return t3;
  }
  subscribe(e3, t3, o2) {
    let i3 = this.eventListeners.get(t3);
    i3 || (i3 = /* @__PURE__ */ new Map(), this.eventListeners.set(t3, i3)), i3.set(e3, o2);
  }
  unsubscribe(e3, t3) {
    const o2 = this.eventListeners.get(t3);
    o2 && (o2.delete(e3), 0 === o2.size && this.eventListeners.delete(t3));
  }
  unsubscribeAll(e3) {
    for (const [t3, o2] of this.eventListeners) o2.delete(e3), 0 === o2.size && this.eventListeners.delete(t3);
  }
  emitPluginEvent(e3, t3) {
    const o2 = this.eventListeners.get(e3);
    if (o2) for (const n3 of o2.values()) try {
      n3(t3);
    } catch (i3) {
      S("TBW024", `Error in plugin event handler for "${e3}": ${i3}`, this.grid.getAttribute("id") ?? void 0);
    }
  }
  onKeyDown(e3) {
    for (const t3 of this.plugins) if (t3.onKeyDown?.(e3)) return true;
    return false;
  }
  onCellClick(e3) {
    for (const t3 of this.plugins) if (t3.onCellClick?.(e3)) return true;
    return false;
  }
  onRowClick(e3) {
    for (const t3 of this.plugins) if (t3.onRowClick?.(e3)) return true;
    return false;
  }
  onHeaderClick(e3) {
    for (const t3 of this.plugins) if (t3.onHeaderClick?.(e3)) return true;
    return false;
  }
  onScroll(e3) {
    for (const t3 of this.plugins) t3.onScroll?.(e3);
  }
  onCellMouseDown(e3) {
    for (const t3 of this.plugins) if (t3.onCellMouseDown?.(e3)) return true;
    return false;
  }
  onCellMouseMove(e3) {
    for (const t3 of this.plugins) if (t3.onCellMouseMove?.(e3)) return true;
    return false;
  }
  onCellMouseUp(e3) {
    for (const t3 of this.plugins) if (t3.onCellMouseUp?.(e3)) return true;
    return false;
  }
  getHorizontalScrollOffsets(e3, t3) {
    let o2 = 0, i3 = 0, n3 = false;
    for (const r3 of this.plugins) {
      const s3 = r3.getHorizontalScrollOffsets?.(e3, t3);
      s3 && (o2 += s3.left, i3 += s3.right, s3.skipScroll && (n3 = true));
    }
    return { left: o2, right: i3, skipScroll: n3 };
  }
  getToolPanels() {
    const e3 = [];
    for (const t3 of this.plugins) {
      const o2 = t3.getToolPanel?.();
      o2 && e3.push({ plugin: t3, panel: o2 });
    }
    return e3.sort((e4, t3) => (e4.panel.order ?? 0) - (t3.panel.order ?? 0));
  }
  getHeaderContents() {
    const e3 = [];
    for (const t3 of this.plugins) {
      const o2 = t3.getHeaderContent?.();
      o2 && e3.push({ plugin: t3, content: o2 });
    }
    return e3.sort((e4, t3) => (e4.content.order ?? 0) - (t3.content.order ?? 0));
  }
};
var It = class _It extends HTMLElement {
  static tagName = "tbw-grid";
  static version = "1.28.1";
  static #k = 0;
  static adapters = [];
  static registerAdapter(e3) {
    this.adapters.push(e3);
  }
  static getAdapters() {
    return this.adapters;
  }
  static clearAdapters() {
    this.adapters = [];
  }
  static get observedAttributes() {
    return ["rows", "columns", "grid-config", "fit-mode", "loading"];
  }
  get #z() {
    return this;
  }
  #q = false;
  #i;
  #n;
  #N = [];
  get #p() {
    return this.#W?.effective ?? {};
  }
  #$ = false;
  #F = false;
  #B = { rows: false, columns: false, gridConfig: false, fitMode: false };
  #V;
  #U = 0;
  #G = null;
  #j = false;
  #X = false;
  #Y = 0;
  #K;
  #Z = { startY: null, startX: null, lastY: null, lastX: null, lastTime: null, velocityY: 0, velocityX: 0, momentumRaf: 0, locked: false, activePointerId: null };
  #Q;
  #J;
  #ee;
  #te;
  #oe = { scrollTop: 0, scrollLeft: 0, scrollHeight: 0, scrollWidth: 0, clientHeight: 0, clientWidth: 0 };
  #ie;
  #ne;
  #re;
  #se;
  #le;
  #ae;
  get _pluginManager() {
    return this.#ie;
  }
  #ce = false;
  #de;
  #he;
  #_;
  #W;
  #ue = /* @__PURE__ */ (function() {
    return { toolPanels: /* @__PURE__ */ new Map(), headerContents: /* @__PURE__ */ new Map(), toolbarContents: /* @__PURE__ */ new Map(), hasToolButtonsContainer: false, lightDomHeaderContent: [], lightDomTitle: null, lightDomToolPanelIds: /* @__PURE__ */ new Set(), lightDomToolbarContentIds: /* @__PURE__ */ new Set(), apiToolPanelIds: /* @__PURE__ */ new Set(), apiHeaderContentIds: /* @__PURE__ */ new Set(), isPanelOpen: false, expandedSections: /* @__PURE__ */ new Set(), headerContentCleanups: /* @__PURE__ */ new Map(), panelCleanups: /* @__PURE__ */ new Map(), toolbarContentCleanups: /* @__PURE__ */ new Map(), lightDomContentMoved: false };
  })();
  #ge;
  #fe;
  #pe;
  #we = false;
  #be = /* @__PURE__ */ new Set();
  #me = /* @__PURE__ */ new Map();
  #ve;
  #Ce = /* @__PURE__ */ new Map();
  _rows = [];
  #_e = [];
  get _columns() {
    return this.#p.columns ?? [];
  }
  set _columns(e3) {
    this.#p.columns = e3, this.#ye = void 0;
  }
  #ye;
  get _visibleColumns() {
    return this.#ye ??= this._columns.filter((e3) => !e3.hidden);
  }
  _headerRowEl;
  _bodyEl;
  _rowPool = [];
  _resizeController;
  get _virtualization() {
    return this.#se.state;
  }
  set _virtualization(e3) {
    Object.assign(this.#se.state, e3);
  }
  _focusRow = 0;
  _focusCol = 0;
  _restoreFocusAfterRender = false;
  _sortState = null;
  _gridTemplate = "";
  __rowRenderEpoch = 0;
  __didInitialAutoSize = false;
  get __lightDomColumnsCache() {
    return this.#W?.lightDomColumnsCache;
  }
  set __lightDomColumnsCache(e3) {
    this.#W && (this.#W.lightDomColumnsCache = e3);
  }
  get __originalColumnNodes() {
    return this.#W?.originalColumnNodes;
  }
  set __originalColumnNodes(e3) {
    this.#W && (this.#W.originalColumnNodes = e3);
  }
  __originalOrder = [];
  __frameworkAdapter;
  __rowsBodyEl = null;
  get rows() {
    return this._rows;
  }
  set rows(e3) {
    const t3 = this.#N;
    this.#N = e3, t3 !== e3 && this.#Re("rows");
  }
  get sourceRows() {
    return this.#N;
  }
  set sourceRows(e3) {
    this.#N = e3;
  }
  get columns() {
    return [...this._columns];
  }
  set columns(e3) {
    const t3 = this.#W?.getColumns();
    this.#W?.setColumns(e3), t3 !== e3 && this.#Re("columns");
  }
  get gridConfig() {
    return this.#p;
  }
  set gridConfig(e3) {
    e3 && this.__frameworkAdapter?.processConfig && (e3 = this.__frameworkAdapter.processConfig(e3));
    const t3 = this.#W?.getGridConfig();
    this.#W?.setGridConfig(e3), t3 !== e3 && (this.#W.clearLightDomCache(), this.#Re("gridConfig"));
  }
  get fitMode() {
    return this.#p.fitMode ?? "stretch";
  }
  set fitMode(e3) {
    const t3 = this.#W?.getFitMode();
    this.#W?.setFitMode(e3), t3 !== e3 && this.#Re("fitMode");
  }
  get loading() {
    return this.#we;
  }
  set loading(e3) {
    const t3 = this.#we;
    this.#we = e3, e3 ? this.setAttribute("loading", "") : this.removeAttribute("loading"), t3 !== e3 && this.#Se();
  }
  setRowLoading(e3, t3) {
    const o2 = this.#be.has(e3);
    t3 ? this.#be.add(e3) : this.#be.delete(e3), o2 !== t3 && this.#Ee(e3, t3);
  }
  setCellLoading(e3, t3, o2) {
    let i3 = this.#me.get(e3);
    const n3 = i3?.has(t3) ?? false;
    o2 ? (i3 || (i3 = /* @__PURE__ */ new Set(), this.#me.set(e3, i3)), i3.add(t3)) : (i3?.delete(t3), 0 === i3?.size && this.#me.delete(e3)), n3 !== o2 && this.#xe(e3, t3, o2);
  }
  isRowLoading(e3) {
    return this.#be.has(e3);
  }
  isCellLoading(e3, t3) {
    return this.#me.get(e3)?.has(t3) ?? false;
  }
  clearAllLoading() {
    this.loading = false;
    for (const e3 of this.#be) this.#Ee(e3, false);
    this.#be.clear();
    for (const [e3, t3] of this.#me) for (const o2 of t3) this.#xe(e3, o2, false);
    this.#me.clear();
  }
  get effectiveConfig() {
    return this.#p;
  }
  get disconnectSignal() {
    return this.#Q || (this.#Q = new AbortController()), this.#Q.signal;
  }
  constructor() {
    super(), this.#Ae(), this.#i = new Promise((e3) => this.#n = e3), this.#se = new Ot(this), this.#le = new De(this), this.#ae = new Ge(this), this.#V = new ne(this), this.#V.setInitialReadyResolver(() => this.#n?.()), this.#ge = /* @__PURE__ */ (function(e3, t3) {
      let o2 = false;
      const i3 = { get isInitialized() {
        return o2;
      }, setInitialized(e4) {
        o2 = e4;
      }, get isPanelOpen() {
        return e3.isPanelOpen;
      }, get activePanel() {
        return e3.isPanelOpen && e3.expandedSections.size > 0 ? [...e3.expandedSections][0] : null;
      }, get expandedSections() {
        return [...e3.expandedSections];
      }, openToolPanel() {
        if (e3.isPanelOpen) return;
        if (0 === e3.toolPanels.size) return void y("TBW071", "No tool panels registered", t3.id);
        if (e3.isPanelOpen = true, 0 === e3.expandedSections.size && e3.toolPanels.size > 0) {
          const t4 = [...e3.toolPanels.values()].sort((e4, t5) => (e4.order ?? 100) - (t5.order ?? 100))[0];
          t4 && e3.expandedSections.add(t4.id);
        }
        const o3 = t3._renderRoot;
        lt(o3, e3), at(o3, e3), st(o3, e3, t3._accordionIcons), t3._emit("tool-panel-open", { sections: i3.expandedSections });
      }, closeToolPanel() {
        if (!e3.isPanelOpen) return;
        for (const t4 of e3.panelCleanups.values()) t4();
        e3.panelCleanups.clear();
        for (const t4 of e3.toolPanels.values()) t4.onClose?.();
        e3.isPanelOpen = false;
        const o3 = t3._renderRoot;
        lt(o3, e3), at(o3, e3), t3._emit("tool-panel-close", {});
      }, toggleToolPanel() {
        e3.isPanelOpen ? i3.closeToolPanel() : i3.openToolPanel();
      }, toggleToolPanelSection(o3) {
        const i4 = e3.toolPanels.get(o3);
        if (!i4) return void y("TBW072", `Tool panel section "${o3}" not found`, t3.id);
        if (1 === e3.toolPanels.size) return;
        const n3 = t3._renderRoot, r3 = e3.expandedSections.has(o3);
        if (r3) {
          const t4 = e3.panelCleanups.get(o3);
          t4 && (t4(), e3.panelCleanups.delete(o3)), i4.onClose?.(), e3.expandedSections.delete(o3), dt(n3, o3, false);
        } else {
          for (const [t4, i5] of e3.toolPanels) if (t4 !== o3 && e3.expandedSections.has(t4)) {
            const o4 = e3.panelCleanups.get(t4);
            o4 && (o4(), e3.panelCleanups.delete(t4)), i5.onClose?.(), e3.expandedSections.delete(t4), dt(n3, t4, false);
            const r4 = n3.querySelector(`[data-section="${t4}"] .tbw-accordion-content`);
            r4 && (r4.innerHTML = "");
          }
          e3.expandedSections.add(o3), dt(n3, o3, true), (function(e4, t4, o4) {
            const i5 = t4.toolPanels.get(o4);
            if (!i5?.render) return;
            const n4 = e4.querySelector(`[data-section="${o4}"] .tbw-accordion-content`);
            if (!n4) return;
            const r4 = i5.render(n4);
            r4 && t4.panelCleanups.set(o4, r4);
          })(n3, e3, o3);
        }
        t3._emit("tool-panel-section-toggle", { id: o3, expanded: !r3 });
      }, getToolPanels: () => [...e3.toolPanels.values()], registerToolPanel(i4) {
        e3.toolPanels.has(i4.id) ? y("TBW073", `Tool panel "${i4.id}" already registered`, t3.id) : (e3.toolPanels.set(i4.id, i4), o2 && t3.refreshShellHeader?.());
      }, unregisterToolPanel(i4) {
        if (e3.expandedSections.has(i4)) {
          const t4 = e3.panelCleanups.get(i4);
          t4 && (t4(), e3.panelCleanups.delete(i4)), e3.expandedSections.delete(i4);
        }
        e3.toolPanels.delete(i4), o2 && t3.refreshShellHeader?.();
      }, getHeaderContents: () => [...e3.headerContents.values()], registerHeaderContent(i4) {
        e3.headerContents.has(i4.id) ? y("TBW074", `Header content "${i4.id}" already registered`, t3.id) : (e3.headerContents.set(i4.id, i4), o2 && rt(t3._renderRoot, e3));
      }, unregisterHeaderContent(o3) {
        const i4 = e3.headerContentCleanups.get(o3);
        i4 && (i4(), e3.headerContentCleanups.delete(o3));
        const n3 = e3.headerContents.get(o3);
        n3?.onDestroy?.(), e3.headerContents.delete(o3);
        const r3 = t3._renderRoot.querySelector(`[data-header-content="${o3}"]`);
        r3?.remove();
      }, getToolbarContents: () => [...e3.toolbarContents.values()].sort((e4, t4) => (e4.order ?? 0) - (t4.order ?? 0)), registerToolbarContent(i4) {
        e3.toolbarContents.has(i4.id) ? y("TBW075", `Toolbar content "${i4.id}" already registered`, t3.id) : (e3.toolbarContents.set(i4.id, i4), o2 && t3.refreshShellHeader?.());
      }, unregisterToolbarContent(i4) {
        const n3 = e3.toolbarContentCleanups.get(i4);
        n3 && (n3(), e3.toolbarContentCleanups.delete(i4));
        const r3 = e3.toolbarContents.get(i4);
        r3?.onDestroy && r3.onDestroy(), e3.toolbarContents.delete(i4), o2 && t3.refreshShellHeader?.();
      } };
      return i3;
    })(this.#ue, this), this.#W = new re(this);
  }
  async #Ae() {
    await wt('@layer tbw-base, tbw-plugins, tbw-theme;\n\n@layer tbw-base{tbw-grid{--tbw-base-icon-size: 1em;--tbw-base-radius: .25em;--tbw-font-size: 1em;--tbw-font-size-sm: .9285em;--tbw-font-size-xs: .7857em;--tbw-font-size-2xs: .7142em;--tbw-spacing-xs: .25em;--tbw-spacing-sm: .375em;--tbw-spacing-md: .5em;--tbw-spacing-lg: .75em;--tbw-spacing-xl: 1em;--tbw-icon-size: var(--tbw-base-icon-size);--tbw-icon-size-sm: .875em;--tbw-checkbox-size: var(--tbw-base-icon-size);--tbw-toggle-size: 1.25em;--tbw-border-radius: var(--tbw-base-radius);--tbw-color-bg: transparent;--tbw-color-panel-bg: light-dark(#eeeeee, #222222);--tbw-color-fg: light-dark(#222222, #eeeeee);--tbw-color-fg-muted: light-dark(#555555, #aaaaaa);--tbw-color-accent: light-dark(#3b82f6, #3b82f6);--tbw-color-accent-fg: light-dark(#ffffff, #000000);--tbw-color-success: light-dark(hsl(122, 39%, 40%), hsl(122, 39%, 49%));--tbw-color-warning: light-dark(hsl(38, 92%, 50%), hsl(38, 92%, 50%));--tbw-color-error: light-dark(hsl(0, 65%, 51%), hsl(0, 65%, 55%));--tbw-color-danger: var(--tbw-color-error);--tbw-color-selection: light-dark(#fff7d6, #333333);--tbw-color-row-alt: var(--tbw-color-bg);--tbw-color-row-hover: light-dark(#f0f6ff, #1c1c1c);--tbw-color-header-bg: color-mix(in hsl, var(--tbw-color-panel-bg) 85%, var(--tbw-color-fg));--tbw-color-header-fg: color-mix(in hsl, var(--tbw-color-fg) 75%, var(--tbw-color-panel-bg));--tbw-color-border: light-dark(#d0d0d4, #454545);--tbw-color-border-strong: light-dark(#777777, #666666);--tbw-color-border-cell: var(--tbw-color-border);--tbw-color-border-header: var(--tbw-color-border);--tbw-color-shadow: light-dark(rgba(0, 0, 0, .1), rgba(0, 0, 0, .3));--tbw-font-family: inherit;--tbw-font-size-header: var(--tbw-font-size);--tbw-font-weight-header: bold;--tbw-cell-padding-header: var(--tbw-spacing-xs) var(--tbw-spacing-md);--tbw-cell-padding-v: var(--tbw-spacing-xs);--tbw-cell-padding-h: var(--tbw-spacing-md);--tbw-cell-padding: var(--tbw-cell-padding-v) var(--tbw-cell-padding-h);--tbw-cell-padding-input: var(--tbw-spacing-xs) var(--tbw-spacing-sm);--tbw-row-height: 1.75em;--tbw-header-height: 1.875em;--tbw-cell-white-space: nowrap;--tbw-border-width: 1px;--tbw-border-style: solid;--tbw-border-input: var(--tbw-border-width) var(--tbw-border-style) var(--tbw-color-border-strong);--tbw-border-header: var(--tbw-border-width) var(--tbw-border-style) var(--tbw-color-border-header);--tbw-row-divider: var(--tbw-border-width) var(--tbw-border-style) var(--tbw-color-border-cell);--tbw-row-hover-outline: 0;--tbw-color-active-row-bg: var(--tbw-color-selection);--tbw-active-row-outline: 0;--tbw-focus-outline-width: 2px;--tbw-focus-outline: var(--tbw-focus-outline-width) var(--tbw-border-style) var(--tbw-color-accent);--tbw-focus-outline-offset: -2px;--tbw-focus-background: rgba(from var(--tbw-color-accent) r g b / 12%);--tbw-range-border-color: var(--tbw-color-accent);--tbw-range-selection-bg: rgba(from var(--tbw-range-border-color) r g b / 12%);--tbw-resize-handle-width: 2px;--tbw-resize-handle-color: transparent;--tbw-resize-handle-color-hover: var(--tbw-color-accent);--tbw-resize-handle-border-radius: 0;--tbw-resize-indicator-width: 2px;--tbw-resize-indicator-color: var(--tbw-color-accent);--tbw-resize-indicator-opacity: .6;--tbw-transition-duration: .12s;--tbw-transition-ease: ease;--tbw-animation-duration: .2s;--tbw-animation-easing: ease-out;--tbw-animation-enabled: 1;--tbw-row-change-duration: .5s;--tbw-row-insert-duration: .3s;--tbw-row-remove-duration: .2s;--tbw-row-change-color: rgba(from var(--tbw-color-accent) r g b / 25%);--tbw-sort-indicator-color: var(--tbw-color-fg-muted);--tbw-sort-indicator-active-color: var(--tbw-color-accent);--tbw-sort-indicator-display: inline-flex;--tbw-sort-indicator-visibility: visible;--tbw-header-text-transform: none;--tbw-header-letter-spacing: normal;--tbw-color-header-separator: var(--tbw-color-border-cell);--tbw-density-scale: 1;--tbw-shell-header-height: 2.75em;--tbw-shell-header-bg: var(--tbw-color-panel-bg);--tbw-shell-header-border: var(--tbw-color-border);--tbw-shell-title-font-size: var(--tbw-font-size);--tbw-shell-title-font-weight: 600;--tbw-tool-panel-width: 17.5em;--tbw-tool-panel-bg: var(--tbw-color-panel-bg);--tbw-tool-panel-border: var(--tbw-color-border);--tbw-tool-panel-header-height: 2.5em;--tbw-tool-panel-transition: var(--tbw-animation-duration) var(--tbw-animation-easing);--tbw-toolbar-button-size: 2em;--tbw-toolbar-button-gap: var(--tbw-spacing-xs);--tbw-panel-padding: var(--tbw-spacing-lg);--tbw-panel-gap: var(--tbw-spacing-md);--tbw-menu-item-padding: var(--tbw-spacing-sm) var(--tbw-spacing-lg);--tbw-menu-item-gap: var(--tbw-spacing-md);--tbw-menu-min-width: 10rem;--tbw-button-padding: var(--tbw-spacing-sm) var(--tbw-spacing-lg);--tbw-button-padding-sm: var(--tbw-spacing-xs) var(--tbw-spacing-md);--tbw-input-height: var(--tbw-row-height);--tbw-input-padding: 0 var(--tbw-spacing-md);--tbw-detail-padding: var(--tbw-spacing-xl);--tbw-detail-max-height: 31.25rem;--tbw-indicator-size: var(--tbw-spacing-sm)}}\n@layer tbw-base{tbw-grid{color-scheme:inherit;position:relative;display:block;width:100%;height:100%;min-height:0;contain:content;font-family:var(--tbw-font-family);font-size:var(--tbw-font-size);font-feature-settings:"tnum","lnum";background:var(--tbw-color-bg);color:var(--tbw-color-fg);border:1px solid var(--tbw-color-border);border-radius:var(--tbw-border-radius);overflow:clip;outline:none;&,*{box-sizing:border-box}.tbw-grid-root{position:relative;display:flex;flex-direction:column;height:100%;&.has-shell{display:flex;flex-direction:column;height:100%}&:has(.selected){user-select:none}}.rows-body-wrapper{flex:1;min-height:0;display:flex;flex-direction:row;width:100%;min-width:fit-content}.rows-body{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:visible}.rows-container{display:flex;flex-direction:row;flex:1;min-height:0;overflow:visible}.rows-viewport{flex:1;min-width:0;position:relative;display:block;overflow:clip;touch-action:none;.rows{position:absolute;top:0;left:0;min-width:100%;will-change:transform;z-index:var(--tbw-z-layer-rows, 1)}}.faux-vscroll{position:sticky;inset-inline-end:0;flex-shrink:0;width:auto;overflow-y:auto;overflow-x:hidden;z-index:var(--tbw-z-layer-header, 30);touch-action:none}.faux-vscroll-spacer{width:1px}.tbw-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}&[data-has-focus]{.cell-focus,.row-focus{outline:var(--tbw-focus-outline);outline-offset:var(--tbw-focus-outline-offset)}}.sticky-left,.sticky-right{position:sticky;z-index:25}.sticky-left{box-shadow:1px 0 0 var(--tbw-color-border)}.sticky-right{box-shadow:-1px 0 0 var(--tbw-color-border)}}}\n@layer tbw-base{tbw-grid{.header{display:block;flex-shrink:0;z-index:var(--tbw-z-layer-header, 30);background:var(--tbw-color-header-bg);overflow:visible}.header-group-row{display:grid;grid-template-columns:var(--tbw-column-template);background:var(--tbw-color-header-bg);z-index:var(--tbw-z-layer-header, 30)}.header-group-cell{display:flex;align-items:center;justify-content:flex-start;padding:var(--tbw-cell-padding-header, 2px 8px);color:var(--tbw-color-header-group-fg, var(--tbw-color-header-fg));font-weight:var(--tbw-font-weight-header-group, var(--tbw-font-weight-header));justify-content:var(--tbw-align-header-group, var(--tbw-align-header, flex-start));&:not(:last-child){border-right:2px solid var(--tbw-color-border)}}.header-row{display:grid;grid-template-columns:var(--tbw-column-template);color:var(--tbw-color-header-fg);font-size:var(--tbw-font-size-header);min-height:var(--tbw-header-height);border-bottom:var(--tbw-border-header);z-index:var(--tbw-z-layer-header, 30);text-transform:var(--tbw-header-text-transform);letter-spacing:var(--tbw-header-letter-spacing);>.cell{display:flex;align-items:center;gap:4px;padding:var(--tbw-cell-padding-header, 2px 8px);background-color:var(--tbw-color-header-bg);font-weight:var(--tbw-font-weight-header);border-right:1px solid var(--tbw-color-border-cell);overflow:visible;min-width:0;>span:first-child{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:inherit}>span[part~=sort-indicator]{flex-shrink:0;opacity:.6;color:var(--tbw-sort-indicator-color);display:var(--tbw-sort-indicator-display, inline-flex);visibility:var(--tbw-sort-indicator-visibility, visible);transition:opacity .15s,visibility 0s,display 0s allow-discrete;transition-behavior:allow-discrete}&:hover>span[part~=sort-indicator]{display:inline-flex;visibility:visible}&[aria-sort=ascending]>span[part~=sort-indicator],&[aria-sort=descending]>span[part~=sort-indicator]{display:inline-flex;visibility:visible;opacity:1;color:var(--tbw-sort-indicator-active-color)}&:last-child{border-right:0;.resize-handle{right:0;width:calc(var(--tbw-resize-hit-area, 18px) / 2)}}&.grouped.group-end:not(:last-child){border-right:2px solid var(--tbw-color-border)}&.resizable{position:relative}&.sticky-left,&.sticky-right{background:var(--tbw-color-header-bg);z-index:35}}}.header-group-row>.header-group-cell{&.sticky-left,&.sticky-right{background:var(--tbw-color-header-bg);z-index:35}}.sortable{cursor:pointer;user-select:none}.resize-handle{position:absolute;top:0;right:calc(var(--tbw-resize-hit-area, 18px) / -2);width:var(--tbw-resize-hit-area, 18px);height:100%;cursor:e-resize;user-select:none;touch-action:none;z-index:20;background:transparent;&:before{content:"";position:absolute;top:0;left:50%;transform:translate(-50%);width:var(--tbw-resize-handle-width);height:100%;background:var(--tbw-resize-handle-color);border-radius:var(--tbw-resize-handle-border-radius);transition:background .12s ease}&:after{content:"";position:absolute;top:100%;left:50%;transform:translate(-50%);width:var(--tbw-resize-handle-width);height:0;background:var(--tbw-resize-indicator-color, var(--tbw-color-accent));opacity:0;pointer-events:none;transition:opacity .12s ease,height 0s .12s;z-index:1000}&:hover{&:before{background:var(--tbw-resize-handle-color-hover)}&:after{height:100vh;opacity:var(--tbw-resize-indicator-opacity, .6);transition:opacity .12s ease,height 0s}}}}}\n@layer tbw-base{tbw-grid{.data-grid-row{display:grid;grid-template-columns:var(--tbw-column-template);contain:layout style;&:nth-child(2n){background:var(--tbw-color-row-alt)}&:hover{background:var(--tbw-color-row-hover)}>.cell{display:block;padding:var(--tbw-cell-padding, 2px 8px);border-bottom:var(--tbw-row-divider);min-height:var(--tbw-row-height);align-content:center;border-right:1px solid var(--tbw-color-border-cell);overflow:hidden;min-width:0;white-space:var(--tbw-cell-white-space, nowrap);text-overflow:ellipsis;>*{overflow:hidden;text-overflow:ellipsis;white-space:inherit;min-width:0}&:last-child{border-right:0}&[data-type=boolean]{text-align:center;input[type=checkbox]{margin:0;width:var(--tbw-checkbox-size);height:var(--tbw-checkbox-size);vertical-align:middle}}&.selected:focus-visible,&:focus-visible:not(.cell-focus){outline:none}&.sticky-left,&.sticky-right{background:var(--tbw-color-panel-bg)}}}.selecting .data-grid-row>.cell{user-select:none}}}\n@layer tbw-base{tbw-grid{.tbw-shell-header{display:flex;align-items:center;gap:8px;min-height:var(--tbw-shell-header-height);padding:0 8px;background:var(--tbw-shell-header-bg);border-bottom:1px solid var(--tbw-shell-header-border);flex-shrink:0}.tbw-shell-title{font-size:var(--tbw-shell-title-font-size);font-weight:var(--tbw-shell-title-font-weight);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tbw-shell-content{flex:1;display:flex;align-items:center;gap:12px;min-width:0;overflow:hidden}.tbw-shell-toolbar{display:flex;align-items:center;gap:var(--tbw-toolbar-button-gap);flex-shrink:0}.tbw-toolbar-btn{display:inline-flex;align-items:center;justify-content:center;width:var(--tbw-toolbar-button-size);height:var(--tbw-toolbar-button-size);padding:0;border:1px solid transparent;border-radius:var(--tbw-border-radius);background:transparent;color:var(--tbw-color-fg);cursor:pointer;font-size:16px;transition:background var(--tbw-transition-duration) var(--tbw-transition-ease),border-color var(--tbw-transition-duration) var(--tbw-transition-ease);&:hover{background:var(--tbw-color-row-hover)}&:focus-visible{outline:var(--tbw-focus-outline);outline-offset:var(--tbw-focus-outline-offset)}&.active{background:var(--tbw-focus-background);border-color:var(--tbw-color-accent)}&:disabled{opacity:.5;cursor:not-allowed}}.tbw-toolbar-separator{width:1px;height:20px;background:var(--tbw-color-border);margin:0 4px}.tbw-shell-body{position:relative;display:flex;flex:1;min-height:0;overflow:visible}.tbw-grid-content{flex:1;min-width:0;min-height:0;display:flex;flex-direction:row;overflow:hidden;touch-action:none}.tbw-scroll-area{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow-x:auto;overflow-y:hidden;overflow-anchor:none}}}\n@layer tbw-base{tbw-grid{.tbw-tool-panel{position:absolute;top:0;bottom:0;right:0;width:0;overflow:hidden;background:var(--tbw-tool-panel-bg);border-left:1px solid var(--tbw-tool-panel-border);transition:width var(--tbw-tool-panel-transition);display:flex;flex-direction:column;z-index:var(--tbw-z-layer-toolpanel, 31);box-shadow:-2px 0 8px var(--tbw-color-shadow);&[data-position=left]{right:auto;left:0;border-left:none;border-right:1px solid var(--tbw-tool-panel-border);box-shadow:2px 0 8px var(--tbw-color-shadow)}&.open{width:var(--tbw-tool-panel-width)}}.tbw-tool-panel-resize{position:absolute;top:0;bottom:0;width:6px;cursor:col-resize;background:transparent;z-index:10;transition:background var(--tbw-transition-duration) var(--tbw-transition-ease);&[data-handle-position=left]{left:0}&[data-handle-position=right]{right:0}&:hover,&.resizing{background:var(--tbw-color-accent)}}.tbw-tool-panel-header{display:flex;align-items:center;justify-content:space-between;min-height:var(--tbw-tool-panel-header-height);padding:0 12px;border-bottom:1px solid var(--tbw-tool-panel-border);flex-shrink:0}.tbw-tool-panel-title{font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tbw-tool-panel-close{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:none;border-radius:var(--tbw-border-radius);background:transparent;color:var(--tbw-color-fg-muted);cursor:pointer;font-size:14px;&:hover{background:var(--tbw-color-row-hover);color:var(--tbw-color-fg)}}.tbw-tool-panel-content{flex:1;overflow:auto}.tbw-accordion{display:flex;flex-direction:column;gap:0}.tbw-accordion-section{border-bottom:1px solid var(--tbw-tool-panel-border);&:last-child{border-bottom:none}&.single .tbw-accordion-header{cursor:default;&:hover{background:transparent}}&.expanded{.tbw-accordion-chevron{transform:rotate(90deg)}.tbw-accordion-content{display:block}}}.tbw-accordion-header{display:flex;align-items:center;gap:8px;width:100%;padding:10px 12px;border:none;background:transparent;color:var(--tbw-color-fg);font-size:13px;font-weight:600;text-align:start;cursor:pointer;user-select:none;&:hover{background:var(--tbw-color-row-hover)}}.tbw-accordion-chevron{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;font-size:10px;color:var(--tbw-color-fg-muted);transition:transform .15s ease;flex-shrink:0}.tbw-accordion-icon{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;font-size:14px;flex-shrink:0}.tbw-accordion-title{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tbw-accordion-content{display:none}}}\n@layer tbw-base{.tbw-loading-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:light-dark(rgba(255,255,255,.7),rgba(0,0,0,.5));z-index:1000;pointer-events:all;animation:tbw-fade-in .15s ease-out}.tbw-spinner{--tbw-spinner-size: 48px;--tbw-spinner-border-width: 3px;--tbw-spinner-color: var(--tbw-color-accent);--tbw-spinner-track-color: var(--tbw-color-border);width:var(--tbw-spinner-size);height:var(--tbw-spinner-size);border:var(--tbw-spinner-border-width) solid var(--tbw-spinner-track-color);border-top-color:var(--tbw-spinner-color);border-radius:50%;animation:tbw-spin .8s linear infinite}.tbw-spinner--large{--tbw-spinner-size: min(48px, calc(100% - 16px) )}.tbw-spinner--small{--tbw-spinner-size: calc(var(--tbw-row-height, 28px) * .6);--tbw-spinner-border-width: 2px}.data-grid-row.tbw-row-loading{position:relative;pointer-events:none}.tbw-row-loading-overlay{position:absolute;inset:0;background:light-dark(rgba(255,255,255,.7),rgba(0,0,0,.5));z-index:26;animation:tbw-fade-in .15s ease-out;pointer-events:none;display:flex;align-items:center}.tbw-row-loading-spinner{--_spinner-size: calc(var(--tbw-row-height, 28px) * .6);margin-left:var(--tbw-spacing-md);width:var(--_spinner-size);height:var(--_spinner-size);border:2px solid var(--tbw-spinner-track-color, var(--tbw-color-border));border-top-color:var(--tbw-spinner-color, var(--tbw-color-accent));border-radius:50%;animation:tbw-spin .8s linear infinite}.cell.tbw-cell-loading{position:relative;pointer-events:none;&:before{content:"";position:absolute;inset:0;background:light-dark(rgba(255,255,255,.7),rgba(0,0,0,.5));z-index:26;animation:tbw-fade-in .15s ease-out}&:after{--_spinner-size: calc(var(--tbw-row-height, 28px) * .5);content:"";position:absolute;left:var(--tbw-spacing-sm);top:0;bottom:0;margin:auto 0;width:var(--_spinner-size);height:var(--_spinner-size);border:2px solid var(--tbw-spinner-track-color, var(--tbw-color-border));border-top-color:var(--tbw-spinner-color, var(--tbw-color-accent));border-radius:50%;animation:tbw-spin .8s linear infinite;z-index:27}}}\n@layer tbw-base{tbw-grid{.tbw-expanding{animation:tbw-expand var(--tbw-animation-duration) var(--tbw-animation-easing) forwards;overflow:hidden}.tbw-collapsing{animation:tbw-collapse var(--tbw-animation-duration) var(--tbw-animation-easing) forwards;overflow:hidden}&[data-animation-mode=off]{--tbw-animation-enabled: 0;--tbw-animation-duration: 0ms;.data-grid-row[data-animating]{animation:none}}}tbw-grid .data-grid-row[data-animating=change]{animation:tbw-row-change var(--tbw-row-change-duration) ease-out}tbw-grid .data-grid-row[data-animating=insert]{animation:tbw-row-insert var(--tbw-row-insert-duration) ease-out;will-change:max-height,opacity}tbw-grid .data-grid-row[data-animating=remove]{animation:tbw-row-remove var(--tbw-row-remove-duration) ease-out forwards;will-change:max-height,opacity,transform;pointer-events:none}}@keyframes tbw-expand{0%{opacity:0;max-height:0;transform:translateY(-8px)}to{opacity:1;max-height:500px;transform:translateY(0)}}@keyframes tbw-collapse{0%{opacity:1;max-height:500px;transform:translateY(0)}to{opacity:0;max-height:0;transform:translateY(-8px)}}@keyframes tbw-row-change{0%{background-color:transparent}20%{background-color:var(--tbw-row-change-color)}to{background-color:transparent}}@keyframes tbw-row-insert{0%{opacity:0;max-height:0;overflow:hidden}to{opacity:1;max-height:var(--tbw-row-height, 28px);overflow:hidden}}@keyframes tbw-row-remove{0%{opacity:1;transform:translateY(0);max-height:var(--tbw-row-height, 28px)}to{opacity:0;max-height:0;transform:translateY(-8px)}}@keyframes tbw-spin{to{transform:rotate(360deg)}}@keyframes tbw-fade-in{0%{opacity:0}to{opacity:1}}\n@layer tbw-base{@media(forced-colors:active){tbw-grid{--tbw-color-border: CanvasText;--tbw-color-border-strong: CanvasText;--tbw-color-border-cell: CanvasText;--tbw-color-border-header: CanvasText;--tbw-color-fg: CanvasText;--tbw-color-bg: Canvas;--tbw-color-panel-bg: Canvas;--tbw-color-header-bg: Canvas;--tbw-color-header-fg: CanvasText;--tbw-color-accent: Highlight;--tbw-color-accent-fg: HighlightText;--tbw-color-selection: Highlight;--tbw-color-row-hover: Highlight;--tbw-focus-outline: 2px solid Highlight;--tbw-range-border-color: Highlight;.cell:focus,.cell.active-cell{outline:2px solid Highlight!important;outline-offset:-2px}.data-grid-row[aria-selected=true]{background:Highlight!important;color:HighlightText!important}}}@media(prefers-reduced-motion:reduce){tbw-grid[data-animation-mode=reduced-motion]{--tbw-animation-enabled: 0;--tbw-animation-duration: 0ms;.data-grid-row[data-animating]{animation:none}}}}\n');
  }
  getPlugin(e3) {
    return this.#ie?.getPlugin(e3);
  }
  getPluginByName(e3) {
    return this.#ie?.getPluginByName(e3);
  }
  requestRender() {
    this.#V.requestPhase(ie.ROWS, "plugin:requestRender");
  }
  requestColumnsRender() {
    this.#V.requestPhase(ie.COLUMNS, "plugin:requestColumnsRender");
  }
  requestRenderWithFocus() {
    this._restoreFocusAfterRender = true, this.#V.requestPhase(ie.ROWS, "plugin:requestRenderWithFocus");
  }
  updateTemplate() {
    P(this);
  }
  requestAfterRender() {
    this.#V.requestPhase(ie.STYLE, "plugin:requestAfterRender");
  }
  requestVirtualRefresh() {
    this._virtualization.start = -1, this.refreshVirtualWindow(false);
  }
  #Te() {
    this.#ie = new Dt(this);
    const e3 = this.#p?.plugins, t3 = Array.isArray(e3) ? e3 : [], o2 = this.#p?.features;
    let i3 = [];
    o2 && Le && (i3 = Le(o2));
    const n3 = i3.length > 0 ? [...i3, ...t3] : t3;
    this.#ie.attachAll(n3);
  }
  #He() {
    !(function(e3) {
      let t3 = false;
      for (const { name: o2, styles: i3 } of e3) ft.has(o2) || (ft.set(o2, i3), t3 = true);
      t3 && pt();
    })(this.#ie?.getPluginStyles() ?? []);
  }
  #Pe() {
    const e3 = this.#p?.plugins, t3 = Array.isArray(e3) ? e3 : [], o2 = this.#p?.features ?? void 0, i3 = o2 !== this.#re;
    if ((this.#ne === t3 || void 0 !== this.#ne && this.#ne.length === t3.length && this.#ne.every((e4, o3) => e4 === t3[o3])) && !i3) return void (this.#ne = t3);
    this.#ie && this.#ie.detachAll();
    for (const r3 of this.#ue.toolPanels.keys()) {
      const e4 = this.#ue.lightDomToolPanelIds.has(r3), t4 = this.#ue.apiToolPanelIds.has(r3);
      if (!e4 && !t4) {
        const e5 = this.#ue.panelCleanups.get(r3);
        e5 && (e5(), this.#ue.panelCleanups.delete(r3)), this.#ue.toolPanels.delete(r3);
      }
    }
    for (const r3 of this.#ue.headerContents.keys()) {
      if (this.#ue.apiHeaderContentIds.has(r3)) continue;
      const e4 = this.#ue.headerContentCleanups.get(r3);
      e4 && (e4(), this.#ue.headerContentCleanups.delete(r3)), this.#ue.headerContents.delete(r3);
    }
    this.#Te(), this.#He(), this.#ne = t3, this.#re = o2, this.#Me(), this.#Le();
    const n3 = this.#j;
    if (this.#j = this.#ie?.getAll().some((e4) => e4.onScroll) ?? false, !n3 && this.#j) {
      const e4 = this.#z.querySelector(".tbw-grid-content") ?? this.#z.querySelector(".tbw-grid-root");
      this.#Oe(e4);
    }
  }
  #De() {
    this.#ie?.detachAll();
  }
  #Le() {
    if (!this.#ie) return;
    const e3 = this.#ie.getToolPanels();
    for (const { panel: o2 } of e3) this.#ue.toolPanels.has(o2.id) || this.#ue.toolPanels.set(o2.id, o2);
    const t3 = this.#ie.getHeaderContents();
    for (const { content: o2 } of t3) this.#ue.headerContents.has(o2.id) || this.#ue.headerContents.set(o2.id, o2);
  }
  #Ie() {
    const e3 = _It.getAdapters();
    if (0 === e3.length && !this.__frameworkAdapter) return;
    const t3 = this.__frameworkAdapter;
    return (o2) => {
      if (t3?.createToolPanelRenderer) {
        const e4 = t3.createToolPanelRenderer(o2);
        if (e4) return e4;
      }
      for (const t4 of e3) if (t4.createToolPanelRenderer) {
        const e4 = t4.createToolPanelRenderer(o2);
        if (e4) return e4;
      }
    };
  }
  connectedCallback() {
    this.hasAttribute("tabindex") || (this.tabIndex = 0), this.hasAttribute("version") || this.setAttribute("version", _It.version), this.id || (this.id = "tbw-grid-" + ++_It.#k), this._rows = Array.isArray(this.#N) ? [...this.#N] : [], this.#Q && (this.#Q.abort(), this.#ce = false), this.#Q = new AbortController(), this.#te && (ke(this.#te), this.#te = void 0), this.#ke(), this.#W.parseLightDomColumns(this), this.#W.merge(), this.#Te();
    const e3 = this.#p?.plugins;
    var t3, o2;
    this.#ne = Array.isArray(e3) ? e3 : [], this.#re = this.#p?.features ?? void 0, this.#Le(), this.#q || (this.#ze(), this.#He(), this.#q = true), this.#qe(), this.#te = (t3 = () => {
      this.#Ne();
    }, o2 = { timeout: 100 }, Ie ? requestIdleCallback(t3, o2) : window.setTimeout(() => {
      const e4 = Date.now();
      t3({ didTimeout: false, timeRemaining: () => Math.max(0, 50 - (Date.now() - e4)) });
    }, 1));
  }
  disconnectedCallback() {
    this.#te && (ke(this.#te), this.#te = void 0), this.#Y && (clearTimeout(this.#Y), this.#Y = 0), this.#De(), (function(e3) {
      for (const t3 of e3.headerContentCleanups.values()) t3();
      e3.headerContentCleanups.clear();
      for (const t3 of e3.panelCleanups.values()) t3();
      e3.panelCleanups.clear();
      for (const t3 of e3.toolbarContentCleanups.values()) t3();
      e3.toolbarContentCleanups.clear();
      for (const t3 of e3.toolbarContents.values()) t3.onDestroy?.();
      if (e3.isPanelOpen) for (const t3 of e3.expandedSections) {
        const o2 = e3.toolPanels.get(t3);
        o2?.onClose?.();
      }
      e3.isPanelOpen = false, e3.expandedSections.clear(), e3.toolPanels.clear(), e3.headerContents.clear(), e3.toolbarContents.clear(), e3.lightDomHeaderContent = [], e3.lightDomToolPanelIds.clear(), e3.lightDomToolbarContentIds.clear(), e3.lightDomContentMoved = false;
    })(this.#ue), this.#ge.setInitialized(false), this.#fe?.(), this.#fe = void 0, this.#pe?.(), this.#pe = void 0, mt(this.#Z), this.#Q && (this.#Q.abort(), this.#Q = void 0), this.#de?.abort(), this.#de = void 0, this.#ce = false, this._resizeController && this._resizeController.dispose(), this.#J && (this.#J.disconnect(), this.#J = void 0), this.#ee && (this.#ee.disconnect(), this.#ee = void 0, this.#We = false), Re(this), this.#$e.clear(), this._virtualization.heightCache?.byKey.clear(), this.#ne = void 0, this.#re = void 0;
    for (const e3 of this._rowPool) e3.remove();
    this._rowPool.length = 0, this.__rowsBodyEl = null, this.#$ = false;
  }
  attributeChangedCallback(e3, t3, o2) {
    if ("loading" === e3) {
      const e4 = null !== o2 && "false" !== o2;
      return void (this.loading !== e4 && (this.loading = e4));
    }
    if (t3 !== o2 && o2 && "null" !== o2 && "undefined" !== o2) if ("rows" === e3 || "columns" === e3 || "grid-config" === e3) try {
      const t4 = JSON.parse(o2);
      "rows" === e3 ? this.rows = t4 : "columns" === e3 ? this.columns = t4 : "grid-config" === e3 && (this.gridConfig = t4);
    } catch {
      y("TBW130", `Invalid JSON for '${e3}' attribute: ${o2}`, this.id);
    }
    else "fit-mode" === e3 && (this.fitMode = o2);
  }
  #qe() {
    const e3 = this.#z.querySelector(".tbw-grid-content") ?? this.#z.querySelector(".tbw-grid-root");
    if (this._headerRowEl = e3?.querySelector(".header-row"), this._virtualization.totalHeightEl = e3?.querySelector(".faux-vscroll-spacer"), this._virtualization.viewportEl = e3?.querySelector(".rows-viewport"), this._bodyEl = e3?.querySelector(".rows"), this.__rowsBodyEl = e3?.querySelector(".rows-body"), this.#ge.isInitialized) {
      rt(this.#z, this.#ue), nt(this.#z, this.#p?.shell, this.#ue);
      const e4 = this.#p?.shell?.toolPanel?.defaultOpen;
      e4 && this.#ue.toolPanels.has(e4) && (this.openToolPanel(), this.#ue.expandedSections.add(e4)), this.#ue.isPanelOpen && (at(this.#z, this.#ue), st(this.#z, this.#ue, (this.#p, this.#p)), lt(this.#z, this.#ue));
    }
    if (this.setAttribute("data-upgraded", ""), this.#$ = true, this._resizeController = qe(this), this.#Fe(), this.#Oe(e3), this.#ce) return;
    this.#ce = true;
    const t3 = this.disconnectSignal;
    Me(this, this, this.#z, t3), this.#Me(), queueMicrotask(() => this.#Be()), this.#V.requestPhase(ie.FULL, "afterConnect");
  }
  #Me() {
    const e3 = this.#p.rowHeight, t3 = this.#ie.hasRowHeightPlugin();
    "function" == typeof e3 || t3 ? this._virtualization.variableHeights || (this._virtualization.variableHeights = true, this._virtualization.rowHeight = "number" == typeof e3 && e3 > 0 ? e3 : this._virtualization.rowHeight || 28, this.#se.initializePositionCache(), "function" != typeof e3 && (this.#X = true)) : !t3 && "function" != typeof e3 && this._virtualization.variableHeights ? (this._virtualization.variableHeights = false, this._virtualization.positionCache = null) : "number" == typeof e3 && e3 > 0 ? (this._virtualization.rowHeight = e3, this._virtualization.variableHeights = false) : requestAnimationFrame(() => this.#Ve());
  }
  #Ve() {
    if (this.#ie.hasExtraHeight()) return;
    const e3 = this._bodyEl?.querySelector(".data-grid-row");
    if (!e3) return;
    if (e3.style.getPropertyValue("--tbw-row-height")) return;
    const t3 = this.#Ue(), o2 = e3.querySelectorAll(".cell");
    let i3 = 0;
    o2.forEach((e4) => {
      const t4 = e4.offsetHeight;
      t4 > i3 && (i3 = t4);
    });
    const n3 = e3.getBoundingClientRect(), r3 = Math.max(n3.height, i3), s3 = this._virtualization.rowHeight, l3 = t3 > 0 && Math.abs(t3 - s3) > 1;
    (l3 || r3 > 0 && r3 - s3 > 1) && (this._virtualization.rowHeight = l3 ? Math.max(t3, r3) : r3, this.#V.requestPhase(ie.VIRTUALIZATION, "measureRowHeight"));
  }
  #Ue() {
    const e3 = getComputedStyle(this).getPropertyValue("--tbw-row-height").trim();
    if (!e3) return 0;
    if (e3.endsWith("px")) return parseFloat(e3) || 0;
    const t3 = this._bodyEl?.querySelector('.data-grid-row:not([style*="--tbw-row-height"]) > .cell');
    if (!t3) return 0;
    const o2 = parseFloat(getComputedStyle(t3).minHeight);
    return o2 > 0 ? o2 : 0;
  }
  #Ge() {
    const e3 = this._bodyEl?.querySelector(".data-grid-row");
    if (!e3) return;
    const t3 = e3.querySelectorAll(".cell");
    let o2 = 0;
    t3.forEach((e4) => {
      const t4 = e4.offsetHeight;
      t4 > o2 && (o2 = t4);
    });
    const i3 = e3.getBoundingClientRect(), n3 = Math.max(i3.height, o2);
    if (n3 > 0) {
      if (Math.abs(n3 - this._virtualization.rowHeight) > 1 && (this._virtualization.rowHeight = n3), this.#se.initializePositionCache(), this._virtualization.totalHeightEl) {
        const e4 = this.#se.calculateTotalSpacerHeight(this._rows.length);
        this._virtualization.totalHeightEl.style.height = `${e4}px`;
      }
    }
  }
  #Oe(e3) {
    this.#de?.abort(), this.#de = new AbortController();
    const t3 = this.#de.signal, o2 = e3?.querySelector(".faux-vscroll"), i3 = e3?.querySelector(".rows");
    if (this._virtualization.container = o2 ?? this, this.#j = this.#ie?.getAll().some((e4) => e4.onScroll) ?? false, o2 && i3) {
      o2.addEventListener("scroll", () => {
        if (!this._virtualization.enabled && !this.#j) return;
        const e5 = o2.scrollTop, t4 = this._virtualization.rowHeight;
        if (this._rows.length <= this._virtualization.bypassThreshold) i3.style.transform = `translateY(${-e5}px)`;
        else {
          const o3 = this._virtualization.positionCache;
          let n5, r5;
          if (this._virtualization.variableHeights && o3 && o3.length > 0) {
            n5 = Ht(o3, e5), -1 === n5 && (n5 = 0);
            const i4 = n5 - n5 % 2;
            r5 = o3[i4]?.offset ?? i4 * t4;
          } else {
            n5 = Math.floor(e5 / t4);
            r5 = (n5 - n5 % 2) * t4;
          }
          const s4 = -(e5 - r5);
          i3.style.transform = `translateY(${s4}px)`;
        }
        this.#G = e5, this.#U || (this.#U = requestAnimationFrame(() => {
          this.#U = 0, null !== this.#G && (this.#je(this.#G), this.#G = null);
        }));
      }, { passive: true, signal: t3 });
      const e4 = this.#z.querySelector(".tbw-scroll-area");
      this.#he = e4, this._virtualization.scrollAreaEl = e4, e4 && this.#j && e4.addEventListener("scroll", () => {
        const t4 = this.#oe;
        t4.scrollTop = o2.scrollTop, t4.scrollLeft = e4.scrollLeft, t4.scrollHeight = o2.scrollHeight, t4.scrollWidth = e4.scrollWidth, t4.clientHeight = o2.clientHeight, t4.clientWidth = e4.clientWidth, this.#ie?.onScroll(t4);
      }, { passive: true, signal: t3 });
      const n4 = this.#z.querySelector(".tbw-grid-content"), r4 = this.#he;
      n4 && (n4.addEventListener("wheel", (e5) => {
        try {
          if (n4.querySelector("select:open")) return;
        } catch {
        }
        const t4 = e5.shiftKey || Math.abs(e5.deltaX) > Math.abs(e5.deltaY);
        if (t4 && r4) {
          const t5 = e5.shiftKey ? e5.deltaY : e5.deltaX, { scrollLeft: o3, scrollWidth: i4, clientWidth: n5 } = r4;
          (t5 > 0 && o3 < i4 - n5 || t5 < 0 && o3 > 0) && (e5.preventDefault(), r4.scrollLeft += t5);
        } else if (!t4) {
          const { scrollTop: t5, scrollHeight: i4, clientHeight: n5 } = o2;
          (e5.deltaY > 0 && t5 < i4 - n5 || e5.deltaY < 0 && t5 > 0) && (e5.preventDefault(), o2.scrollTop += e5.deltaY);
        }
      }, { passive: false, signal: t3 }), Ct(n4, this.#Z, { fauxScrollbar: o2, scrollArea: r4 }, t3));
    }
    var n3, r3, s3;
    this._bodyEl && (n3 = this, r3 = this._bodyEl, s3 = t3, r3.addEventListener("mousedown", (e4) => {
      const t4 = e4.target.closest(".cell[data-col]");
      if (!t4) return;
      if (t4.classList.contains("editing")) return;
      const o3 = e4.target;
      o3.draggable || o3.closest('[draggable="true"]') || e4.preventDefault(), He(n3, t4);
    }, { signal: s3 }), r3.addEventListener("click", (e4) => {
      const t4 = e4.target.closest(".data-grid-row");
      if (t4 && xe(n3, e4, t4), !document.activeElement?.closest(".cell.editing")) {
        const t5 = e4.target.closest("tbw-grid");
        t5 && t5.focus({ preventScroll: true });
      }
    }, { signal: s3 }), r3.addEventListener("dblclick", (e4) => {
      const t4 = e4.target.closest(".data-grid-row");
      t4 && xe(n3, e4, t4);
    }, { signal: s3 })), this.#J?.disconnect(), this._virtualization.viewportEl && (this.#J = new ResizeObserver(() => {
      this.#Xe(), this.#V.requestPhase(ie.VIRTUALIZATION, "resize-observer");
    }), this.#J.observe(this._virtualization.viewportEl)), this.#z.addEventListener("focusin", () => {
      this.dataset.hasFocus = "";
    }, { signal: t3 }), this.#z.addEventListener("focusout", (e4) => {
      const t4 = e4.relatedTarget;
      t4 && (this.#z.contains(t4) || this.#le.isInExternalFocusContainer(t4)) || delete this.dataset.hasFocus;
    }, { signal: t3 });
  }
  #We = false;
  #Ye() {
    if (this.#We) return;
    const e3 = this._bodyEl?.querySelector(".data-grid-row");
    e3 && (this.#We = true, this.#ee?.disconnect(), this.#ee = new ResizeObserver(() => {
      this.#Ve();
    }), this.#ee.observe(e3));
  }
  addEventListener(e3, t3, o2) {
    super.addEventListener(e3, t3, o2);
  }
  removeEventListener(e3, t3, o2) {
    super.removeEventListener(e3, t3, o2);
  }
  on(e3, t3) {
    const o2 = (e4) => {
      t3(e4.detail, e4);
    };
    return this.addEventListener(e3, o2), () => this.removeEventListener(e3, o2);
  }
  #Ke(e3, t3) {
    this.dispatchEvent(new CustomEvent(e3, { detail: t3, bubbles: true, composed: true }));
  }
  _emitDataChange() {
    this.#Ke("data-change", { rowCount: this._rows.length, sourceRowCount: this.#N.length });
  }
  #Be() {
    const e3 = this._bodyEl?.querySelectorAll(".data-grid-row");
    e3?.forEach((e4, t3) => {
      const o2 = t3 === this._focusRow;
      e4.setAttribute("aria-selected", String(o2)), e4.querySelectorAll(".cell").forEach((e5, t4) => {
        e5.setAttribute("aria-selected", String(o2 && t4 === this._focusCol));
      });
    });
  }
  #Re(e3) {
    this.#B[e3] = true, this.#F || (this.#F = true, queueMicrotask(() => this.#Ze()));
  }
  #Ze() {
    if (!this.#F || !this.#$) return void (this.#F = false);
    const e3 = this.#B;
    if (this.#F = false, this.#B = { rows: false, columns: false, gridConfig: false, fitMode: false }, e3.gridConfig) return this.#Qe(), void (e3.rows && this.#Je());
    e3.columns && this.#et(), e3.rows && this.#Je(), e3.fitMode && this.#tt();
  }
  #Je() {
    this._rows = Array.isArray(this.#N) ? [...this.#N] : [], this._rebuildRowIdMap(), this.#V.requestPhase(ie.ROWS, "applyRowsUpdate");
  }
  _rebuildRowIdMap() {
    this.#Ce.clear();
    const e3 = this.#p.getRowId;
    this._rows.forEach((t3, o2) => {
      const i3 = Ve(t3, e3);
      void 0 !== i3 && this.#Ce.set(i3, { row: t3, index: o2 });
    });
  }
  #et() {
    Re(this), this.#W.merge(), this.#Fe();
  }
  #tt() {
    this.#W.merge();
    "fixed" === this.#p.fitMode ? (this.__didInitialAutoSize = false, A(this)) : (this._columns.forEach((e3) => {
      !e3.__userResized && e3.__autoSized && delete e3.width;
    }), P(this));
  }
  #Qe() {
    tt(this, this.#ue), ot(this, this.#ue);
    const e3 = !!this.#z.querySelector(".has-shell"), t3 = !!this.#z.querySelector(".tbw-tool-panel"), o2 = this.#z.querySelectorAll(".tbw-accordion-section").length, i3 = this.#z.querySelector(".tbw-tool-panel")?.dataset.position ?? "right";
    this.#W.parseLightDomColumns(this), this.#W.merge(), this.#Pe(), this.#Me(), it(this, this.#ue, this.#Ie()), this.#W.markSourcesChanged(), this.#W.merge();
    const n3 = et(this.#p?.shell), r3 = (this.#p?.shell?.toolPanels?.length ?? 0) > 0, s3 = this.#p?.shell?.toolPanels?.length ?? 0, l3 = this.#p?.shell?.toolPanel?.position ?? "right";
    if (e3 !== n3 || !t3 && r3 || t3 && s3 !== o2 || t3 && i3 !== l3) return ct(this.#ue), this.#ze(), this.#He(), this.#qe(), void this._rebuildRowIdMap();
    e3 && this.#ot(), this._rebuildRowIdMap(), this.#V.requestPhase(ie.COLUMNS, "applyGridConfigUpdate");
  }
  #ot() {
    const e3 = this.#z.querySelector(".tbw-shell-header");
    if (!e3) return;
    const t3 = this.#p.shell?.header?.title ?? this.#ue.lightDomTitle;
    let o2 = e3.querySelector(".tbw-shell-title");
    t3 ? (o2 || (o2 = document.createElement("h2"), o2.className = "tbw-shell-title", o2.setAttribute("part", "shell-title"), e3.insertBefore(o2, e3.firstChild)), o2.textContent = t3) : o2 && o2.remove();
  }
  #it() {
    if (this.__rowRenderEpoch++, this.#ie) {
      const e3 = this.#_e.length > 0 ? this.#_e : this._columns, t3 = e3.filter((e4) => !e4.hidden), o2 = e3.filter((e4) => e4.hidden), i3 = this.#ie.processColumns([...t3]);
      if (i3 !== t3) {
        const n3 = new Set(i3.map((e4) => e4.field));
        !t3.some((e4) => n3.has(e4.field)) && i3.length > 0 ? this._columns = [...i3, ...o2] : this._columns = this.#nt(e3, i3, o2);
      } else this._columns = [...e3];
    }
  }
  #nt(e3, t3, o2) {
    if (0 === o2.length) return t3;
    const i3 = /* @__PURE__ */ new Map();
    for (const l3 of t3) i3.set(l3.field, l3);
    const n3 = new Set(e3.map((e4) => e4.field)), r3 = [];
    for (const l3 of t3) n3.has(l3.field) || r3.push(l3);
    const s3 = [];
    for (const l3 of e3) {
      const e4 = i3.get(l3.field);
      e4 ? s3.push(e4) : l3.hidden && s3.push(l3);
    }
    return s3.push(...r3), s3;
  }
  #rt() {
    Re(this);
    const e3 = (function(e4, t4) {
      if (!e4._sortState) return t4;
      e4.__originalOrder = [...t4];
      const o2 = (e4.effectiveConfig?.sortHandler ?? U)(t4, e4._sortState, e4._columns);
      return o2 && "function" == typeof o2.then ? t4 : o2;
    })(this, Array.isArray(this.#N) ? [...this.#N] : []), t3 = this.#ie?.processRows(e3) ?? e3;
    this._rows = t3, this._rebuildRowIdMap(), this._virtualization.variableHeights && this.#se.initializePositionCache(), this._emitDataChange();
  }
  #st(e3) {
    const t3 = __spreadValues(__spreadValues({}, o), e3.animation), i3 = t3.mode ?? "reduced-motion";
    let n3 = 1;
    false === i3 || "off" === i3 ? n3 = 0 : true !== i3 && "on" !== i3 || (n3 = 1), this.style.setProperty("--tbw-animation-duration", `${t3.duration}ms`), this.style.setProperty("--tbw-animation-easing", t3.easing ?? "ease-out"), this.style.setProperty("--tbw-animation-enabled", String(n3)), this.dataset.animationMode = "boolean" == typeof i3 ? i3 ? "on" : "off" : i3;
  }
  _renderVisibleRows(e3, t3, o2 = this.__rowRenderEpoch) {
    if (this.#K || (this.#K = (e4, t4, o3) => this.#ie?.renderRow(e4, t4, o3) ?? false), (function(e4, t4, o3, i3, n3) {
      const r3 = Math.max(0, o3 - t4), s3 = e4._bodyEl, l3 = e4._visibleColumns, a3 = l3.length;
      let c2 = e4.__cachedHeaderRowCount;
      for (void 0 === c2 && (c2 = e4.querySelector(".header-group-row") ? 2 : 1, e4.__cachedHeaderRowCount = c2); e4._rowPool.length < r3; ) {
        const t5 = ye();
        e4._rowPool.push(t5);
      }
      if (e4._rowPool.length > r3) {
        for (let t5 = r3; t5 < e4._rowPool.length; t5++) {
          const o4 = e4._rowPool[t5];
          o4.parentNode === s3 && o4.remove();
        }
        e4._rowPool.length = r3;
      }
      const d2 = n3 && false !== e4.__hasRenderRowPlugins, h = e4._hasAfterRowRenderHook?.() ?? false, u2 = e4._virtualization?.variableHeights && "function" == typeof e4.effectiveConfig?.rowHeight ? e4.effectiveConfig.rowHeight : null;
      for (let f2 = 0; f2 < r3; f2++) {
        const o4 = t4 + f2, r4 = e4._rows[o4], p = e4._rowPool[f2];
        if (p.setAttribute("aria-rowindex", String(o4 + c2 + 1)), d2 && n3(r4, p, o4)) {
          p.__epoch = i3, p.__rowDataRef = r4, p.parentNode !== s3 && s3.appendChild(p);
          continue;
        }
        const w2 = p.__epoch, b = p.__rowDataRef;
        let m = p.children.length;
        m > a3 && p.lastElementChild?.classList.contains("tbw-row-loading-overlay") && m--;
        const v = w2 === i3 && m === a3, C2 = b !== r4, _2 = !!e4._isGridEditMode;
        let R2 = false;
        if (v && C2) {
          for (let e5 = 0; e5 < a3; e5++) if (l3[e5].externalView && !p.querySelector(`.cell[data-col="${e5}"] [data-external-view]`)) {
            R2 = true;
            break;
          }
        }
        if (!v || R2) {
          const t5 = be(p), n4 = _2 && !C2 || e4._activeEditRows === o4;
          t5 && !n4 ? (p.__isCustomRow && (p.className = "data-grid-row", p.setAttribute("role", "row"), p.__isCustomRow = false), me(p), Ee(e4, p, r4, o4), p.__epoch = i3, p.__rowDataRef = r4) : t5 && n4 ? (Se(e4, p, r4, o4), p.__rowDataRef = r4) : (p.__isCustomRow && (p.className = "data-grid-row", p.setAttribute("role", "row"), p.__isCustomRow = false), Ee(e4, p, r4, o4), p.__epoch = i3, p.__rowDataRef = r4);
        } else if (C2) {
          const t5 = be(p), n4 = e4._activeEditRows === o4;
          t5 && !n4 ? (me(p), Ee(e4, p, r4, o4), p.__epoch = i3, p.__rowDataRef = r4) : (Se(e4, p, r4, o4), p.__rowDataRef = r4);
        } else {
          const t5 = be(p), n4 = _2 || e4._activeEditRows === o4;
          t5 && !n4 ? (me(p), Ee(e4, p, r4, o4), p.__epoch = i3, p.__rowDataRef = r4) : Se(e4, p, r4, o4);
        }
        let S2 = false;
        const E2 = e4._changedRowIdSet;
        if (E2 && E2.size > 0) try {
          const t5 = e4.getRowId?.(r4);
          t5 && (S2 = E2.has(t5));
        } catch {
        }
        S2 !== p.classList.contains("changed") && p.classList.toggle("changed", S2);
        const x2 = e4.effectiveConfig?.rowClass;
        if (x2) {
          const t5 = p.getAttribute("data-dynamic-classes");
          t5 && t5.split(" ").forEach((e5) => e5 && p.classList.remove(e5));
          try {
            const e5 = x2(r4), t6 = "string" == typeof e5 ? e5.split(/\s+/) : e5;
            if (t6 && t6.length > 0) {
              let e6 = "";
              for (const o5 of t6) o5 && "string" == typeof o5 && (p.classList.add(o5), e6 += (e6 ? " " : "") + o5);
              p.setAttribute("data-dynamic-classes", e6);
            } else p.removeAttribute("data-dynamic-classes");
          } catch (g) {
            y("TBW060", `rowClass callback error: ${g}`, e4.id), p.removeAttribute("data-dynamic-classes");
          }
        }
        if (u2) {
          const e5 = u2(r4, o4);
          void 0 !== e5 && e5 > 0 ? p.style.setProperty("--tbw-row-height", `${e5}px`) : p.style.removeProperty("--tbw-row-height");
        }
        h && e4._afterRowRender?.({ row: r4, rowIndex: o4, rowElement: p }), p.parentNode !== s3 && s3.appendChild(p);
      }
    })(this, e3, t3, o2, this.#K), this.#be.size > 0) for (const i3 of this.#be) this.#Ee(i3, true);
  }
  #lt = { rowCount: -1, colCount: -1, ariaLabel: void 0, ariaDescribedBy: void 0 };
  _updateAriaCounts(e3, t3) {
    !(function(e4, t4, o2, i3, n3) {
      if (i3 === e4.rowCount && n3 === e4.colCount) return false;
      const r3 = e4.rowCount;
      e4.rowCount = i3, e4.colCount = n3, t4 && (t4.setAttribute("aria-rowcount", String(i3)), t4.setAttribute("aria-colcount", String(n3))), i3 !== r3 && o2 && (i3 > 0 ? o2.setAttribute("role", "rowgroup") : o2.removeAttribute("role"));
    })(this.#lt, this.__rowsBodyEl, this._bodyEl, e3, t3);
  }
  _requestSchedulerPhase(e3, t3) {
    this.#V.requestPhase(e3, t3);
  }
  _getPluginExtraHeight() {
    return this.#ie?.getExtraHeight() ?? 0;
  }
  _getPluginRowHeight(e3, t3) {
    return this.#ie?.getRowHeight?.(e3, t3);
  }
  _getPluginExtraHeightBefore(e3) {
    return this.#ie?.getExtraHeightBefore?.(e3) ?? 0;
  }
  _adjustPluginVirtualStart(e3, t3, o2) {
    return this.#ie?.adjustVirtualStart(e3, t3, o2);
  }
  _afterPluginRender() {
    this.#ie?.afterRender();
  }
  _emitPluginEvent(e3, t3) {
    this.#ie?.emitPluginEvent(e3, t3);
  }
  _schedulerMergeConfig() {
    this.#W.parseLightDomColumns(this), this.#W.merge(), this.#Pe(), (function(e3, t3, o2) {
      const i3 = _t, n3 = yt, r3 = /* @__PURE__ */ new Map();
      function s3(e4, t4, o3, i4, n4 = false) {
        r3.has(e4) || r3.set(e4, { description: t4, importHint: o3, fields: [], isConfigProperty: n4 });
        const s4 = r3.get(e4);
        s4.fields.includes(i4) || s4.fields.push(i4);
      }
      for (const a3 of n3) {
        const o3 = e3[a3.property];
        (a3.isUsed ? a3.isUsed(o3) : void 0 !== o3) && !Et(t3, a3.pluginName) && s3(a3.pluginName, a3.description, Rt(a3.pluginName), a3.property, true);
      }
      const l3 = e3.columns;
      if (l3 && l3.length > 0) for (const a3 of l3) for (const e4 of i3) {
        const o3 = a3[e4.property];
        if ((e4.isUsed ? e4.isUsed(o3) : void 0 !== o3) && !Et(t3, e4.pluginName)) {
          const t4 = a3.field || "<unknown>";
          s3(e4.pluginName, e4.description, Rt(e4.pluginName), t4);
        }
      }
      if (r3.size > 0) {
        const e4 = [];
        for (const [t4, { description: o3, importHint: i4, fields: n4, isConfigProperty: s4 }] of r3) if (s4) e4.push(`Config uses ${o3}, but the required plugin is not loaded.
  → Add the plugin to your gridConfig.plugins array:
    ${i4}
    plugins: [new ${St(t4)}Plugin(), ...]`);
        else {
          const r4 = n4.slice(0, 3).join(", ") + (n4.length > 3 ? `, ... (${n4.length} total)` : "");
          e4.push(`Column(s) [${r4}] use ${o3}, but the required plugin is not loaded.
  → Add the plugin to your gridConfig.plugins array:
    ${i4}
    plugins: [new ${St(t4)}Plugin(), ...]`);
        }
        _([...r3.values()].some((e5) => e5.isConfigProperty) ? "TBW002" : "TBW001", `Configuration error:

${e4.join("\n\n")}

This validation helps catch misconfigurations early. The properties listed above require their respective plugins to function.`, o2);
      }
    })(this.#p, this.#ie?.getPlugins() ?? [], this.id), (function(e3, t3) {
      const o2 = [], i3 = [];
      for (const n3 of e3) {
        const e4 = n3.constructor.manifest;
        if (e4?.configRules) for (const t4 of e4.configRules) {
          const e5 = n3.config;
          if (t4.check(e5)) {
            const e6 = `[${St(n3.name)}Plugin] Configuration warning: ${t4.message}`;
            "error" === t4.severity ? o2.push(e6) : i3.push(e6);
          }
        }
      }
      if (i3.length > 0 && se()) for (const n3 of i3) y("TBW004", n3, t3);
      o2.length > 0 && _("TBW003", `Configuration error:

${o2.join("\n\n")}`, t3);
    })(this.#ie?.getPlugins() ?? [], this.id), (function(e3, t3) {
      if (!se()) return;
      const o2 = new Set(e3.map((e4) => e4.name)), i3 = /* @__PURE__ */ new Set();
      for (const n3 of e3) {
        const e4 = n3.constructor.manifest;
        if (e4?.incompatibleWith) {
          for (const r3 of e4.incompatibleWith) if (o2.has(r3.name)) {
            const e5 = [n3.name, r3.name].sort().join("↔");
            if (i3.has(e5)) continue;
            i3.add(e5), y("TBW022", `${St(n3.name)}Plugin and ${St(r3.name)}Plugin are both loaded, but they are currently incompatible.

  → ${r3.reason}

  Consider removing one of these plugins to avoid unexpected behavior.`, t3);
          }
        }
      }
    })(this.#ie?.getPlugins() ?? [], this.id), this.#at(), this.#_e = [...this._columns];
  }
  _schedulerProcessColumns() {
    this.#it();
  }
  _schedulerProcessRows() {
    this.#rt();
  }
  _schedulerRenderHeader() {
    ee(this);
  }
  _schedulerUpdateTemplate() {
    P(this);
  }
  _schedulerAfterRender() {
    this.#ie?.afterRender(), this._virtualization.enabled && this._virtualization.totalHeightEl && queueMicrotask(() => {
      if (!this._virtualization.totalHeightEl) return;
      const e3 = this.#se.calculateTotalSpacerHeight(this._rows.length);
      this._virtualization.totalHeightEl.style.height = `${e3}px`;
    });
    "fixed" !== this.#p.fitMode || this.__didInitialAutoSize || (this.__didInitialAutoSize = true, A(this)), this._restoreFocusAfterRender && (this._restoreFocusAfterRender = false, Ae(this)), this._virtualization.enabled && !this.#We && this.#Ye(), this.#X && (this.#X = false, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.#Ge();
      });
    })), this.#we && this.#Se();
  }
  get _schedulerIsConnected() {
    return this.isConnected && this.#$;
  }
  get _hostElement() {
    return this;
  }
  get _renderRoot() {
    return this.#z;
  }
  _emit(e3, t3) {
    this.#Ke(e3, t3);
  }
  get _accordionIcons() {
    return { expand: this.#p?.icons?.expand ?? n.expand, collapse: this.#p?.icons?.collapse ?? n.collapse };
  }
  get _shellState() {
    return this.#ue;
  }
  _clearRowPool() {
    this._rowPool.length = 0, this._bodyEl && (this._bodyEl.innerHTML = ""), this.__rowRenderEpoch++;
  }
  _setup() {
    this.#Fe();
  }
  _applyAnimationConfig(e3) {
    this.#st(e3);
  }
  #at() {
    !(function(e3, t3, o2, i3) {
      if (!t3) return false;
      let n3 = false;
      const r3 = (function(e4, t4) {
        const o3 = e4?.gridAriaLabel;
        return o3 || (e4?.shell?.header?.title ?? t4?.lightDomTitle ?? void 0);
      })(o2, i3);
      r3 !== e3.ariaLabel && (e3.ariaLabel = r3, r3 ? t3.setAttribute("aria-label", r3) : t3.removeAttribute("aria-label"), n3 = true);
      const s3 = o2?.gridAriaDescribedBy;
      s3 !== e3.ariaDescribedBy && (e3.ariaDescribedBy = s3, s3 ? t3.setAttribute("aria-describedby", s3) : t3.removeAttribute("aria-describedby"), n3 = true);
    })(this.#lt, this.__rowsBodyEl, this.#p, this.#ue);
  }
  #Se() {
    const e3 = this.querySelector(".tbw-grid-root");
    var t3;
    e3 && (this.#we ? (this.#ve || (this.#ve = (function(e4) {
      const t4 = document.createElement("div");
      return t4.className = "tbw-loading-overlay", t4.setAttribute("role", "status"), t4.setAttribute("aria-live", "polite"), t4.appendChild(ze("large", e4)), t4;
    })(this.#p?.loadingRenderer)), (function(e4, t4) {
      e4.appendChild(t4);
    })(e3, this.#ve)) : (t3 = this.#ve, t3?.remove()));
  }
  #Ee(e3, t3) {
    const o2 = this.#Ce.get(e3);
    if (!o2) return;
    const i3 = this.findRenderedRowElement?.(o2.index);
    i3 && (function(e4, t4) {
      if (t4) {
        if (e4.classList.add("tbw-row-loading"), e4.setAttribute("aria-busy", "true"), !e4.querySelector(".tbw-row-loading-overlay")) {
          const t5 = document.createElement("div");
          t5.className = "tbw-row-loading-overlay", t5.setAttribute("aria-hidden", "true");
          const o3 = document.createElement("div");
          o3.className = "tbw-row-loading-spinner", t5.appendChild(o3), e4.appendChild(t5);
        }
      } else e4.classList.remove("tbw-row-loading"), e4.removeAttribute("aria-busy"), e4.querySelector(".tbw-row-loading-overlay")?.remove();
    })(i3, t3);
  }
  #xe(e3, t3, o2) {
    const i3 = this.#Ce.get(e3);
    if (!i3) return;
    const n3 = this.findRenderedRowElement?.(i3.index);
    if (!n3) return;
    const r3 = this._visibleColumns.findIndex((e4) => e4.field === t3);
    if (r3 < 0) return;
    const s3 = n3.children[r3];
    s3 && (function(e4, t4) {
      t4 ? (e4.classList.add("tbw-cell-loading"), e4.setAttribute("aria-busy", "true")) : (e4.classList.remove("tbw-cell-loading"), e4.removeAttribute("aria-busy"));
    })(s3, o2);
  }
  #Fe() {
    if (this.isConnected && this._headerRowEl && this._bodyEl) {
      if (this.#W.parseLightDomColumns(this), this.#_) {
        const e3 = this.#_;
        this.#_ = void 0, this.#W.merge();
        const t3 = this.#ie?.getAll() ?? [];
        this.#W.applyState(e3, t3);
      }
      this._bodyEl && (this._bodyEl.style.display = "", this._bodyEl.style.gridTemplateColumns = ""), this.#V.requestPhase(ie.FULL, "setup");
    }
  }
  #je(e3) {
    let t3 = 0, o2 = 0, i3 = 0, n3 = 0, r3 = 0;
    if (this.#j) {
      const e4 = this._virtualization.container, s3 = this.#he;
      t3 = s3?.scrollLeft ?? 0, o2 = e4?.scrollHeight ?? 0, i3 = s3?.scrollWidth ?? 0, n3 = e4?.clientHeight ?? 0, r3 = s3?.clientWidth ?? 0;
    }
    if (this.refreshVirtualWindow(false) && this.#ie?.onScrollRender(), this._virtualization.variableHeights && (this.#Y && clearTimeout(this.#Y), this.#Y = window.setTimeout(() => {
      this.#Y = 0, this.#se.measureRenderedRowHeights(this._virtualization.start, this._virtualization.end);
    }, 100)), this.#j) {
      const s3 = this.#oe;
      s3.scrollTop = e3, s3.scrollLeft = t3, s3.scrollHeight = o2, s3.scrollWidth = i3, s3.clientHeight = n3, s3.clientWidth = r3, this.#ie?.onScroll(s3);
    }
  }
  findHeaderRow() {
    return this.#z.querySelector(".header-row");
  }
  findRenderedRowElement(e3) {
    const t3 = this._virtualization, o2 = e3 - t3.start;
    return o2 >= 0 && o2 < this._rowPool.length && o2 < t3.end - t3.start ? this._rowPool[o2] : null;
  }
  _dispatchCellClick(e3, t3, o2, i3) {
    const n3 = this._rows[t3], r3 = this._visibleColumns[o2];
    if (!n3 || !r3) return false;
    const s3 = r3.field, l3 = n3[s3], a3 = new CustomEvent("cell-activate", { cancelable: true, bubbles: true, composed: true, detail: { rowIndex: t3, colIndex: o2, column: r3, field: s3, value: l3, row: n3, cellEl: i3, trigger: "pointer", originalEvent: e3 } });
    if (this.dispatchEvent(a3), a3.defaultPrevented) return true;
    const c2 = { row: n3, rowIndex: t3, colIndex: o2, column: r3, field: s3, value: l3, cellEl: i3, originalEvent: e3 }, d2 = this.#ie?.onCellClick(c2) ?? false;
    return this.#Ke("cell-click", c2), d2;
  }
  _dispatchRowClick(e3, t3, o2, i3) {
    if (!o2) return false;
    const n3 = { rowIndex: t3, row: o2, rowEl: i3, originalEvent: e3 }, r3 = this.#ie?.onRowClick(n3) ?? false;
    return this.#Ke("row-click", n3), r3;
  }
  _dispatchHeaderClick(e3, t3, o2) {
    if (!t3) return false;
    const i3 = { colIndex: this._columns.indexOf(t3), field: t3.field, column: t3, headerEl: o2, originalEvent: e3 };
    return this.#ie?.onHeaderClick(i3) ?? false;
  }
  _dispatchKeyDown(e3) {
    return this.#ie?.onKeyDown(e3) ?? false;
  }
  _getHorizontalScrollOffsets(e3, t3) {
    return this.#ie?.getHorizontalScrollOffsets(e3, t3) ?? { left: 0, right: 0 };
  }
  queryPlugins(e3) {
    return this.#ie?.queryPlugins(e3) ?? [];
  }
  query(e3, t3) {
    return this.#ie?.queryPlugins({ type: e3, context: t3 }) ?? [];
  }
  _dispatchCellMouseDown(e3) {
    return this.#ie?.onCellMouseDown(e3) ?? false;
  }
  _dispatchCellMouseMove(e3) {
    this.#ie?.onCellMouseMove(e3);
  }
  _dispatchCellMouseUp(e3) {
    this.#ie?.onCellMouseUp(e3);
  }
  _afterCellRender(e3) {
    this.#ie?.afterCellRender(e3);
  }
  _hasAfterCellRenderHook() {
    return this.#ie?.hasAfterCellRenderHook() ?? false;
  }
  _afterRowRender(e3) {
    this.#ie?.afterRowRender(e3);
  }
  _hasAfterRowRenderHook() {
    return this.#ie?.hasAfterRowRenderHook() ?? false;
  }
  async ready() {
    return this.#i;
  }
  async forceLayout() {
    return this.#V.requestPhase(ie.FULL, "forceLayout"), this.#V.whenReady();
  }
  async getConfig() {
    return Object.freeze(__spreadValues({}, this.#p || {}));
  }
  getRowId(e3) {
    return Ue(e3, this.id, this.#p.getRowId);
  }
  getRow(e3) {
    return this.#ae.getRow(e3);
  }
  _getRowEntry(e3) {
    return this.#Ce.get(e3);
  }
  updateRow(e3, t3, o2 = "api") {
    this.#ae.updateRow(e3, t3, o2);
  }
  updateRows(e3, t3 = "api") {
    this.#ae.updateRows(e3, t3);
  }
  animateRow(e3, t3) {
    return Be(this, e3, t3);
  }
  animateRows(e3, t3) {
    return (function(e4, t4, o2) {
      return Promise.all(t4.map((t5) => Be(e4, t5, o2))).then((e5) => e5.filter(Boolean).length);
    })(this, e3, t3);
  }
  animateRowById(e3, t3) {
    return (function(e4, t4, o2) {
      const i3 = e4._rows ?? [], n3 = e4.getRowId;
      if (!n3) return Promise.resolve(false);
      const r3 = i3.findIndex((e5) => {
        if (null == e5) return false;
        try {
          return n3(e5) === t4;
        } catch {
          return false;
        }
      });
      return r3 < 0 ? Promise.resolve(false) : Be(e4, r3, o2);
    })(this, e3, t3);
  }
  async insertRow(e3, t3, o2 = true) {
    return this.#ae.insertRow(e3, t3, o2);
  }
  async removeRow(e3, t3 = true) {
    return this.#ae.removeRow(e3, t3);
  }
  async applyTransaction(e3, t3 = true) {
    return this.#ae.applyTransaction(e3, t3);
  }
  applyTransactionAsync(e3) {
    return this.#ae.applyTransactionAsync(e3);
  }
  suspendProcessing() {
  }
  focusCell(e3, t3) {
    this.#le.focusCell(e3, t3);
  }
  get focusedCell() {
    return this.#le.focusedCell;
  }
  scrollToRow(e3, t3) {
    this.#le.scrollToRow(e3, t3);
  }
  scrollToRowById(e3, t3) {
    this.#le.scrollToRowById(e3, t3);
  }
  setColumnVisible(e3, t3) {
    const o2 = this.#W.setColumnVisible(e3, t3);
    return o2 && this.requestStateChange(), o2;
  }
  toggleColumnVisibility(e3) {
    const t3 = this.#W.toggleColumnVisibility(e3);
    return t3 && this.requestStateChange(), t3;
  }
  isColumnVisible(e3) {
    return this.#W.isColumnVisible(e3);
  }
  showAllColumns() {
    this.#W.showAllColumns(), this.requestStateChange();
  }
  getAllColumns() {
    return this.#W.getAllColumns();
  }
  setColumnOrder(e3) {
    this.#W.setColumnOrder(e3), this.requestStateChange();
  }
  getColumnOrder() {
    return this.#W.getColumnOrder();
  }
  getColumnState() {
    const e3 = this.#ie?.getAll() ?? [];
    return this.#W.collectState(e3);
  }
  set columnState(e3) {
    e3 && (this.#_ = e3, this.#W.initialColumnState = e3, this.#q && this.#ct(e3));
  }
  get columnState() {
    return this.getColumnState();
  }
  #ct(e3) {
    const t3 = this.#ie?.getAll() ?? [];
    this.#W.applyState(e3, t3), this.#Fe();
  }
  requestStateChange() {
    const e3 = this.#ie?.getAll() ?? [];
    this.#W.requestStateChange(e3);
  }
  resetColumnState() {
    this.#_ = void 0, this.__originalOrder = [];
    const e3 = this.#ie?.getAll() ?? [];
    this.#W.resetState(e3), this.#W.merge(), this.#Fe();
  }
  get isToolPanelOpen() {
    return this.#ge.isPanelOpen;
  }
  get defaultRowHeight() {
    return this._virtualization.rowHeight;
  }
  get expandedToolPanelSections() {
    return this.#ge.expandedSections;
  }
  openToolPanel() {
    this.#ge.openToolPanel();
  }
  closeToolPanel() {
    this.#ge.closeToolPanel();
  }
  toggleToolPanel() {
    this.#ge.toggleToolPanel();
  }
  toggleToolPanelSection(e3) {
    this.#ge.toggleToolPanelSection(e3);
  }
  getToolPanels() {
    return this.#ge.getToolPanels();
  }
  registerToolPanel(e3) {
    this.#ue.apiToolPanelIds.add(e3.id), this.#ge.registerToolPanel(e3);
  }
  unregisterToolPanel(e3) {
    this.#ue.apiToolPanelIds.delete(e3), this.#ge.unregisterToolPanel(e3);
  }
  getHeaderContents() {
    return this.#ge.getHeaderContents();
  }
  registerHeaderContent(e3) {
    this.#ue.apiHeaderContentIds.add(e3.id), this.#ge.registerHeaderContent(e3);
  }
  unregisterHeaderContent(e3) {
    this.#ue.apiHeaderContentIds.delete(e3), this.#ge.unregisterHeaderContent(e3);
  }
  getToolbarContents() {
    return this.#ge.getToolbarContents();
  }
  registerToolbarContent(e3) {
    this.#ge.registerToolbarContent(e3);
  }
  unregisterToolbarContent(e3) {
    this.#ge.unregisterToolbarContent(e3);
  }
  #dt = false;
  refreshShellHeader() {
    this.#dt || (this.#dt = true, queueMicrotask(() => {
      this.#dt = false, this.isConnected && (this.#ke(), this.#W.markSourcesChanged(), this.#W.merge(), ct(this.#ue), this.#ze(), this.#He(), this.#ht());
    }));
  }
  #ht() {
    const e3 = this.#z.querySelector(".tbw-grid-content") ?? this.#z.querySelector(".tbw-grid-root");
    if (this._headerRowEl = e3?.querySelector(".header-row"), this._virtualization.totalHeightEl = e3?.querySelector(".faux-vscroll-spacer"), this._virtualization.viewportEl = e3?.querySelector(".rows-viewport"), this._bodyEl = e3?.querySelector(".rows"), this.__rowsBodyEl = e3?.querySelector(".rows-body"), this.#ge.isInitialized) {
      rt(this.#z, this.#ue), nt(this.#z, this.#p?.shell, this.#ue);
      const e4 = this.#p?.shell?.toolPanel?.defaultOpen;
      e4 && this.#ue.toolPanels.has(e4) && (this.openToolPanel(), this.#ue.expandedSections.add(e4)), this.#ue.isPanelOpen && (at(this.#z, this.#ue), st(this.#z, this.#ue, (this.#p, this.#p)), lt(this.#z, this.#ue));
    }
    this._resizeController = qe(this), this.#Oe(e3), this.#V.requestPhase(ie.COLUMNS, "shellRefresh");
  }
  #$e = /* @__PURE__ */ new Map();
  registerStyles(e3, t3) {
    let o2 = this.#$e.get(e3);
    o2 || (o2 = new CSSStyleSheet(), this.#$e.set(e3, o2)), o2.replaceSync(t3), this.#ut();
  }
  unregisterStyles(e3) {
    this.#$e.delete(e3) && this.#ut();
  }
  getRegisteredStyles() {
    return Array.from(this.#$e.keys());
  }
  #ut() {
    const e3 = Array.from(this.#$e.values()), t3 = document.adoptedStyleSheets.filter((e4) => !Array.from(this.#$e.values()).includes(e4));
    document.adoptedStyleSheets = [...t3, ...e3];
  }
  registerExternalFocusContainer(e3) {
    this.#le.registerExternalFocusContainer(e3);
  }
  unregisterExternalFocusContainer(e3) {
    this.#le.unregisterExternalFocusContainer(e3);
  }
  containsFocus(e3) {
    return this.#le.containsFocus(e3);
  }
  #ke() {
    tt(this, this.#ue), ot(this, this.#ue), it(this, this.#ue, this.#Ie());
  }
  #gt() {
    const e3 = this.#z.querySelector(".tbw-shell-header");
    if (!e3) return;
    ct(this.#ue);
    const t3 = (function(e4, t4, o3 = "☰") {
      const i4 = e4?.header?.title ?? t4.lightDomTitle ?? "", n3 = !!i4, r3 = Je(o3), s3 = e4?.header?.toolbarContents ?? [], l3 = [...t4.toolbarContents.values()], a3 = new Set(s3.map((e5) => e5.id)), c2 = [...s3];
      for (const w2 of l3) a3.has(w2.id) || c2.push(w2);
      const d2 = c2.length > 0, h = t4.toolPanels.size > 0, u2 = d2 && h, g = [...c2].sort((e5, t5) => (e5.order ?? 0) - (t5.order ?? 0));
      let f2 = "";
      for (const w2 of g) f2 += `<div class="tbw-toolbar-content-slot" data-toolbar-content="${w2.id}"></div>`;
      if (u2 && (f2 += '<div class="tbw-toolbar-separator"></div>'), h) {
        const e5 = t4.isPanelOpen;
        f2 += `<button class="${e5 ? "tbw-toolbar-btn active" : "tbw-toolbar-btn"}" data-panel-toggle title="Settings" aria-label="Toggle settings panel" aria-pressed="${e5}" aria-controls="tbw-tool-panel">${r3}</button>`;
      }
      return `
    <div class="tbw-shell-header" part="shell-header" role="presentation">
      ${n3 ? `<div class="tbw-shell-title">${p = i4, p && "string" == typeof p ? p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;") : ""}</div>` : ""}
      <div class="tbw-shell-content" part="shell-content" role="presentation" data-light-dom-header-content></div>
      <div class="tbw-shell-toolbar" part="shell-toolbar" role="presentation">
        ${f2}
      </div>
    </div>
  `;
      var p;
    })(this.#p.shell, this.#ue, this.#p.icons?.toolPanel), o2 = document.createElement("div");
    o2.innerHTML = t3;
    const i3 = o2.firstElementChild;
    i3 && (e3.replaceWith(i3), this.#ft(), nt(this.#z, this.#p?.shell, this.#ue));
  }
  #Ne() {
    const e3 = () => {
      const e4 = this.#ue.lightDomTitle, t4 = this.#ue.hasToolButtonsContainer;
      this.#ke();
      const o2 = this.#ue.lightDomTitle, i3 = this.#ue.hasToolButtonsContainer;
      (o2 && !e4 || i3 && !t4) && (this.#W.markSourcesChanged(), this.#W.merge(), this.#gt());
    }, t3 = () => {
      this.__lightDomColumnsCache = void 0, this.#Fe();
    };
    this.#W.registerLightDomHandler("tbw-grid-header", e3), this.#W.registerLightDomHandler("tbw-grid-tool-buttons", e3), this.#W.registerLightDomHandler("tbw-grid-tool-panel", e3), this.#W.registerLightDomHandler("tbw-grid-column", t3), this.#W.registerLightDomHandler("tbw-grid-detail", t3), this.#W.observeLightDOM(this);
  }
  refreshColumns() {
    this.__lightDomColumnsCache = void 0, Re(this), this.#W.parseLightDomColumns(this);
    const e3 = this.#ue.lightDomTitle, t3 = this.#ue.hasToolButtonsContainer;
    this.#ke();
    const o2 = this.#ue.lightDomTitle, i3 = this.#ue.hasToolButtonsContainer;
    (o2 && !e3 || i3 && !t3) && (this.#W.markSourcesChanged(), this.#W.merge(), this.#gt()), this.#V.requestPhase(ie.COLUMNS, "refreshColumns");
  }
  #Xe() {
    this.#se.updateCachedGeometry();
  }
  refreshVirtualWindow(e3 = false, t3 = false) {
    return this.#se.refreshVirtualWindow(e3, t3);
  }
  invalidateRowHeight(e3, t3) {
    this.#se.invalidateRowHeight(e3, t3);
  }
  #ze() {
    this.#ke(), this.#W.markSourcesChanged(), this.#W.merge();
    const e3 = this.#p?.shell;
    ht(this.#z, e3, { isPanelOpen: this.#ue.isPanelOpen, expandedSections: this.#ue.expandedSections }, this.#p?.icons) && (this.#ft(), this.#ge.setInitialized(true));
  }
  #ft() {
    !(function(e3, t3, o2, i3) {
      const n3 = e3.querySelector(".tbw-shell-toolbar");
      n3 && n3.addEventListener("click", (e4) => {
        e4.target.closest("[data-panel-toggle]") && i3.onPanelToggle();
      });
      const r3 = e3.querySelector(".tbw-accordion");
      r3 && r3.addEventListener("click", (e4) => {
        const t4 = e4.target.closest(".tbw-accordion-header");
        if (t4) {
          const e5 = t4.closest("[data-section]"), o3 = e5?.getAttribute("data-section");
          o3 && i3.onSectionToggle(o3);
        }
      });
    })(this.#z, this.#p, this.#ue, { onPanelToggle: () => this.toggleToolPanel(), onSectionToggle: (e3) => this.toggleToolPanelSection(e3) }), this.#fe?.(), this.#fe = (function(e3, t3, o2) {
      const i3 = e3.querySelector(".tbw-tool-panel"), n3 = e3.querySelector("[data-resize-handle]"), r3 = e3.querySelector(".tbw-shell-body");
      if (!i3 || !n3 || !r3) return () => {
      };
      const s3 = t3?.toolPanel?.position ?? "right";
      let l3 = 0, a3 = 0, c2 = 0, d2 = false;
      const h = (e4) => {
        if (!d2) return;
        e4.preventDefault();
        const t4 = "left" === s3 ? e4.clientX - l3 : l3 - e4.clientX, o3 = Math.min(c2, Math.max(200, a3 + t4));
        i3.style.width = `${o3}px`;
      }, u2 = () => {
        if (!d2) return;
        d2 = false, n3.classList.remove("resizing"), i3.style.transition = "", document.body.style.cursor = "", document.body.style.userSelect = "";
        const e4 = i3.getBoundingClientRect().width;
        o2(e4), document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", u2);
      }, g = (e4) => {
        e4.preventDefault(), d2 = true, l3 = e4.clientX, a3 = i3.getBoundingClientRect().width, c2 = r3.getBoundingClientRect().width - 20, n3.classList.add("resizing"), i3.style.transition = "none", document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", h), document.addEventListener("mouseup", u2);
      };
      return n3.addEventListener("mousedown", g), () => {
        n3.removeEventListener("mousedown", g), document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", u2);
      };
    })(this.#z, this.#p?.shell, (e3) => {
      this.style.setProperty("--tbw-tool-panel-width", `${e3}px`);
    }), this.#pe?.(), this.#pe = (function(e3, t3, o2, i3) {
      if (!t3?.toolPanel?.closeOnClickOutside) return () => {
      };
      const n3 = (e4) => {
        if (!o2.isPanelOpen) return;
        const t4 = e4.target;
        t4 && (t4.closest(".tbw-tool-panel") || t4.closest("[data-panel-toggle]") || i3());
      };
      return e3.addEventListener("mousedown", n3), () => e3.removeEventListener("mousedown", n3);
    })(this, this.#p?.shell, this.#ue, () => this.closeToolPanel());
  }
};
customElements.get(It.tagName) || customElements.define(It.tagName, It), globalThis.DataGridElement = It;
var qt = { ROOT: "tbw-grid-root", HEADER: "header", HEADER_ROW: "header-row", HEADER_CELL: "header-cell", ROWS_VIEWPORT: "rows-viewport", ROWS_SPACER: "rows-spacer", ROWS_CONTAINER: "rows", DATA_ROW: "data-row", GROUP_ROW: "group-row", DATA_CELL: "data-cell", SELECTED: "selected", FOCUSED: "focused", EDITING: "editing", EXPANDED: "expanded", COLLAPSED: "collapsed", DRAGGING: "dragging", RESIZING: "resizing", SORTABLE: "sortable", SORTED_ASC: "sorted-asc", SORTED_DESC: "sorted-desc", HIDDEN: "hidden", STICKY_LEFT: "sticky-left", STICKY_RIGHT: "sticky-right", PINNED_TOP: "pinned-top", PINNED_BOTTOM: "pinned-bottom", TREE_TOGGLE: "tree-toggle", TREE_INDENT: "tree-indent", GROUP_TOGGLE: "group-toggle", GROUP_LABEL: "group-label", GROUP_COUNT: "group-count", RANGE_SELECTION: "range-selection", SELECTION_OVERLAY: "selection-overlay" };
var Nt = { ROW_INDEX: "data-row-index", COL_INDEX: "data-col-index", FIELD: "data-field", GROUP_KEY: "data-group-key", TREE_LEVEL: "data-tree-level", STICKY: "data-sticky" };
var Wt = { ROOT: `.${qt.ROOT}`, HEADER: `.${qt.HEADER}`, HEADER_ROW: `.${qt.HEADER_ROW}`, HEADER_CELL: `.${qt.HEADER_CELL}`, ROWS_VIEWPORT: `.${qt.ROWS_VIEWPORT}`, ROWS_CONTAINER: `.${qt.ROWS_CONTAINER}`, DATA_ROW: `.${qt.DATA_ROW}`, DATA_CELL: `.${qt.DATA_CELL}`, GROUP_ROW: `.${qt.GROUP_ROW}`, ROW_BY_INDEX: (e3) => `.${qt.DATA_ROW}[${Nt.ROW_INDEX}="${e3}"]`, CELL_BY_FIELD: (e3) => `.${qt.DATA_CELL}[${Nt.FIELD}="${e3}"]`, CELL_AT: (e3, t3) => `.${qt.DATA_ROW}[${Nt.ROW_INDEX}="${e3}"] .${qt.DATA_CELL}[${Nt.COL_INDEX}="${t3}"]`, SELECTED_ROWS: `.${qt.DATA_ROW}.${qt.SELECTED}`, EDITING_CELL: `.${qt.DATA_CELL}.${qt.EDITING}` };
var Gt = { sum: (e3, t3) => e3.reduce((e4, o2) => e4 + (Number(o2[t3]) || 0), 0), avg: (e3, t3) => {
  const o2 = e3.reduce((e4, o3) => e4 + (Number(o3[t3]) || 0), 0);
  return e3.length ? o2 / e3.length : 0;
}, count: (e3) => e3.length, min: (e3, t3) => e3.length ? Math.min(...e3.map((e4) => Number(e4[t3]) || 1 / 0)) : 0, max: (e3, t3) => e3.length ? Math.max(...e3.map((e4) => Number(e4[t3]) || -1 / 0)) : 0, first: (e3, t3) => e3[0]?.[t3], last: (e3, t3) => e3[e3.length - 1]?.[t3] };
var jt = /* @__PURE__ */ new Map();
var Xt = { register(e3, t3) {
  jt.set(e3, t3);
}, unregister(e3) {
  jt.delete(e3);
}, get(e3) {
  if (void 0 !== e3) return "function" == typeof e3 ? e3 : jt.get(e3) ?? Gt[e3];
}, run(e3, t3, o2, i3) {
  const n3 = this.get(e3);
  return n3 ? n3(t3, o2, i3) : void 0;
}, has: (e3) => jt.has(e3) || e3 in Gt, list: () => [...Object.keys(Gt), ...jt.keys()] };
var Qt = Xt.register.bind(Xt);
var Jt = Xt.unregister.bind(Xt);
var eo = Xt.get.bind(Xt);
var to = Xt.run.bind(Xt);
var oo = Xt.list.bind(Xt);

// node_modules/@toolbox-web/grid/lib/features/registry.js
function e2(o2, e3, t3, n3) {
  console.warn((function(o3, e4) {
    return `[tbw-grid] ${o3}: ${e4}

  → More info: ${(function(o4) {
      return `https://toolboxjs.com/grid/errors#${o4.toLowerCase()}`;
    })(o3)}`;
  })(o2, e3));
}
var t2 = /* @__PURE__ */ new Map();
var n2 = /* @__PURE__ */ new Set();
var r2 = () => "undefined" != typeof window && ("localhost" === window.location?.hostname || "127.0.0.1" === window.location?.hostname);
function i2(o2, n3) {
  r2() && t2.has(o2) && e2("TBW030", `Feature "${o2}" was re-registered. Previous registration overwritten.`), t2.set(o2, { factory: n3, name: o2 });
}
function s2(o2) {
  return t2.has(o2);
}
function c(o2) {
  return t2.get(o2)?.factory;
}
function f() {
  return Array.from(t2.keys());
}
var u = { undoRedo: ["editing"], clipboard: ["selection"] };
var d = { sorting: "multiSort", reorder: "reorderColumns", rowReorder: "reorderRows" };
function a2(o2, i3) {
  const s3 = t2.get(o2);
  if (s3) return s3.factory(i3);
  if (r2() && !n2.has(o2)) {
    n2.add(o2);
    const t3 = o2.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    e2("TBW031", `Feature "${o2}" is configured but not registered.
Add this import to enable it:

  import '@toolbox-web/grid/features/${t3}';
`);
  }
}
function l2(o2) {
  const t3 = [], n3 = [], i3 = __spreadValues({}, o2);
  for (const [e3, r3] of Object.entries(d)) void 0 !== i3[e3] && void 0 === i3[r3] && (i3[r3] = i3[e3]), delete i3[e3];
  for (const [e3, r3] of Object.entries(i3)) void 0 !== r3 && false !== r3 && n3.push(e3);
  !(function(o3) {
    const t4 = new Set(o3);
    for (const n4 of o3) {
      const o4 = u[n4];
      if (o4) for (const i4 of o4) t4.has(i4) || r2() && e2("TBW032", `Feature "${n4}" requires "${i4}" to be enabled. Add "${i4}" to your features configuration.`);
    }
  })(n3);
  const s3 = ["selection", "editing", ...n3.filter((o3) => "selection" !== o3 && "editing" !== o3)], c2 = [...new Set(s3)].filter((o3) => n3.includes(o3));
  for (const e3 of c2) {
    const o3 = i3[e3];
    if (void 0 === o3 || false === o3) continue;
    const n4 = a2(e3, o3);
    n4 && t3.push(n4);
  }
  return t3;
}
function w() {
  t2.clear(), n2.clear();
}
Oe(l2);

export {
  It,
  i2 as i,
  s2 as s,
  c,
  f,
  a2 as a,
  w
};
//# sourceMappingURL=chunk-TZYRBE7Q.js.map
