// @vitest-environment jsdom
import { markdown } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { GFM } from "@lezer/markdown";
import { afterEach, describe, expect, it } from "vitest";

import { tableDecorations } from "./table-decorations";

/**
 * Create a CodeMirror view with the markdown parser (GFM) and the
 * table-decorations StateField, so the Lezer parser produces Table nodes.
 */
function createView(
  doc: string,
  selection?: { anchor: number; head?: number },
): { view: EditorView; parent: HTMLDivElement } {
  const parent = document.createElement("div");
  document.body.appendChild(parent);
  const state = EditorState.create({
    doc,
    selection: selection ?? { anchor: 0 },
    extensions: [markdown({ extensions: [GFM] }), tableDecorations],
  });
  const view = new EditorView({ state, parent });
  return { view, parent };
}

describe("tableDecorations StateField", () => {
  let view: EditorView;
  let parent: HTMLDivElement;

  afterEach(() => {
    view?.destroy();
    parent?.remove();
  });

  it("should render a table widget for a valid GFM table", () => {
    const md = [
      "| A | B |",
      "| - | - |",
      "| 1 | 2 |",
      "",
      "some text after",
    ].join("\n");

    ({ view, parent } = createView(md, { anchor: md.length }));
    const widget = parent.querySelector(".cm-table-widget");
    expect(widget).not.toBeNull();
  });

  it("should NOT render widget when table is at end of doc without trailing newline", () => {
    const md = ["| A | B |", "| - | - |", "| 1 | 2 |"].join("\n");

    ({ view, parent } = createView(md, { anchor: 0 }));
    const widget = parent.querySelector(".cm-table-widget");
    expect(widget).toBeNull();
  });

  it("should render widget when table has trailing newline", () => {
    const md = ["| A | B |", "| - | - |", "| 1 | 2 |", ""].join("\n");

    ({ view, parent } = createView(md, { anchor: md.length }));
    const widget = parent.querySelector(".cm-table-widget");
    expect(widget).not.toBeNull();
  });

  it("should NOT render widget if table markdown is invalid (missing pipes)", () => {
    const md = ["A | B", "- | -", "1 | 2", "", "after"].join("\n");

    ({ view, parent } = createView(md, { anchor: md.length }));
    const widget = parent.querySelector(".cm-table-widget");
    expect(widget).toBeNull();
  });

  it("should update decorations when document changes", () => {
    // Start with text only
    ({ view, parent } = createView("hello world\n", { anchor: 0 }));
    expect(parent.querySelector(".cm-table-widget")).toBeNull();

    // Insert a valid table
    const table = "| A | B |\n| - | - |\n| 1 | 2 |\n";
    view.dispatch({
      changes: { from: view.state.doc.length, insert: table },
    });

    // Table is no longer at end-of-doc because we started with "hello world\n"
    // and the table has a trailing \n
    const widget = parent.querySelector(".cm-table-widget");
    expect(widget).not.toBeNull();
  });

  it("should render table cells with correct content", () => {
    const md = [
      "| Name  | Age |",
      "| ----- | --- |",
      "| Alice | 30  |",
      "",
      "end",
    ].join("\n");

    ({ view, parent } = createView(md, { anchor: md.length }));
    const widget = parent.querySelector(".cm-table-widget");
    expect(widget).not.toBeNull();

    const headers = widget!.querySelectorAll("th");
    // Table widget includes a drag-handle column, so there are 3 th elements
    const headerTexts = Array.from(headers).map((h) => h.textContent?.trim());
    expect(headerTexts).toContain("Name");
    expect(headerTexts).toContain("Age");

    const cells = widget!.querySelectorAll("td");
    const cellTexts = Array.from(cells).map((c) => c.textContent?.trim());
    expect(cellTexts).toContain("Alice");
    expect(cellTexts).toContain("30");
  });
});
