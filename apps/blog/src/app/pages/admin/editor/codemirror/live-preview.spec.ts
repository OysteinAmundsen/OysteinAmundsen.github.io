// @vitest-environment jsdom
import { markdown } from "@codemirror/lang-markdown";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { GFM } from "@lezer/markdown";
import { afterEach, describe, expect, it } from "vitest";

import { livePreview } from "./live-preview";

/**
 * Helper to create an EditorView with the markdown parser and
 * the live-preview plugin, placing the cursor at a given position.
 */
function createView(
  doc: string,
  selection?: { anchor: number; head?: number },
): { view: EditorView; parent: HTMLDivElement } {
  const parent = document.createElement("div");
  document.body.appendChild(parent);

  // Minimal highlight style so the syntax tree parses correctly
  const minimalHighlight = syntaxHighlighting(
    HighlightStyle.define([{ tag: tags.content, color: "inherit" }]),
  );

  const state = EditorState.create({
    doc,
    selection: selection ?? { anchor: 0 },
    extensions: [
      markdown({ extensions: [GFM] }),
      minimalHighlight,
      livePreview,
    ],
  });
  const view = new EditorView({ state, parent });
  return { view, parent };
}

function cleanUp(view: EditorView, parent: HTMLDivElement) {
  view.destroy();
  parent.remove();
}

describe("livePreview plugin", () => {
  let view: EditorView;
  let parent: HTMLDivElement;

  afterEach(() => {
    cleanUp(view, parent);
  });

  describe("horizontal rule", () => {
    it("should render an hr widget when cursor is not on the line", () => {
      ({ view, parent } = createView("some text\n\n---\n\nmore text", {
        anchor: 0,
      }));
      const hr = parent.querySelector(".cm-hr-widget");
      expect(hr).not.toBeNull();
      expect(hr!.tagName).toBe("HR");
    });

    it("should NOT render hr widget when cursor IS on the hr line", () => {
      // Cursor on the --- itself
      ({ view, parent } = createView("some text\n\n---\n\nmore text", {
        anchor: 12,
      }));
      const hr = parent.querySelector(".cm-hr-widget");
      expect(hr).toBeNull();
    });
  });

  describe("bold emphasis", () => {
    it("should hide ** markers when cursor is away", () => {
      ({ view, parent } = createView("**bold text**\n\nanother line", {
        anchor: 20,
      }));
      // The markers should be replaced (hidden)
      const textContent = parent.querySelector(".cm-line")?.textContent ?? "";
      expect(textContent).not.toContain("**");
      expect(textContent).toContain("bold text");
    });

    it("should show ** markers when cursor is on the bold line", () => {
      ({ view, parent } = createView("**bold text**", { anchor: 5 }));
      const textContent = parent.querySelector(".cm-line")?.textContent ?? "";
      expect(textContent).toContain("**");
    });
  });

  describe("inline code", () => {
    it("should apply cm-inline-code class", () => {
      ({ view, parent } = createView("Use `code` here", { anchor: 0 }));
      const codeEl = parent.querySelector(".cm-inline-code");
      expect(codeEl).not.toBeNull();
    });
  });

  describe("strikethrough", () => {
    it("should apply cm-strikethrough class for ~~text~~", () => {
      ({ view, parent } = createView("~~deleted~~\n\nother", { anchor: 15 }));
      const el = parent.querySelector(".cm-strikethrough");
      expect(el).not.toBeNull();
    });

    it("should hide ~~ markers when cursor is away", () => {
      ({ view, parent } = createView("~~deleted~~\n\nother", { anchor: 15 }));
      const firstLine = parent.querySelector(".cm-line")?.textContent ?? "";
      expect(firstLine).not.toContain("~~");
      expect(firstLine).toContain("deleted");
    });
  });

  describe("headings", () => {
    it("should add heading class to heading lines", () => {
      ({ view, parent } = createView("# My Title\n\nparagraph", {
        anchor: 15,
      }));
      const headingLine = parent.querySelector(".cm-heading-1");
      expect(headingLine).not.toBeNull();
    });

    it("should hide # marker when cursor is away", () => {
      ({ view, parent } = createView("# Title\n\nparagraph", { anchor: 12 }));
      const firstLine = parent.querySelector(".cm-heading")?.textContent ?? "";
      expect(firstLine).not.toContain("#");
      expect(firstLine).toContain("Title");
    });

    it("should show # marker when cursor is on heading line", () => {
      ({ view, parent } = createView("# Title", { anchor: 3 }));
      const firstLine = parent.querySelector(".cm-heading")?.textContent ?? "";
      expect(firstLine).toContain("#");
    });
  });

  describe("blockquotes", () => {
    it("should add blockquote class to quoted lines", () => {
      ({ view, parent } = createView("> quoted\n\nnormal", { anchor: 12 }));
      const quoteLine = parent.querySelector(".cm-blockquote");
      expect(quoteLine).not.toBeNull();
    });
  });

  describe("links", () => {
    it("should apply cm-link-text class", () => {
      ({ view, parent } = createView("[text](url)\n\nother", { anchor: 15 }));
      const linkEl = parent.querySelector(".cm-link-text");
      expect(linkEl).not.toBeNull();
    });

    it("should hide URL when cursor is away from link", () => {
      ({ view, parent } = createView("[text](url)\n\nother", { anchor: 15 }));
      const firstLine = parent.querySelector(".cm-line")?.textContent ?? "";
      expect(firstLine).toContain("text");
      expect(firstLine).not.toContain("url");
    });
  });

  describe("images", () => {
    it("should render image widget when cursor is away", () => {
      ({ view, parent } = createView(
        "![alt](https://example.com/img.png)\n\nother",
        { anchor: 40 },
      ));
      const imgWidget = parent.querySelector(".cm-image-widget");
      expect(imgWidget).not.toBeNull();
      const img = imgWidget?.querySelector("img");
      expect(img).not.toBeNull();
      expect(img!.src).toContain("example.com/img.png");
      expect(img!.alt).toBe("alt");
    });

    it("should show raw markdown when cursor is on image line", () => {
      ({ view, parent } = createView("![alt](https://example.com/img.png)", {
        anchor: 5,
      }));
      const imgWidget = parent.querySelector(".cm-image-widget");
      expect(imgWidget).toBeNull();
      const textContent = parent.querySelector(".cm-line")?.textContent ?? "";
      expect(textContent).toContain("![alt]");
    });
  });
});
