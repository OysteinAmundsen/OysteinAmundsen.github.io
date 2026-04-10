// @vitest-environment jsdom
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { afterEach, describe, expect, it } from "vitest";

import {
  toggleBold,
  toggleInlineCode,
  toggleItalic,
  toggleStrikethrough,
} from "./toolbar";

describe("toolbar formatting commands", () => {
  let parent: HTMLDivElement;
  let view: EditorView;

  function createView(
    doc: string,
    selection?: { anchor: number; head?: number },
  ) {
    parent = document.createElement("div");
    document.body.appendChild(parent);
    const state = EditorState.create({
      doc,
      selection: selection ?? { anchor: 0 },
    });
    view = new EditorView({ state, parent });
    return view;
  }

  afterEach(() => {
    view?.destroy();
    parent?.remove();
  });

  describe("toggleBold", () => {
    it("should insert bold placeholder when no selection", () => {
      createView("hello ", { anchor: 6 });
      toggleBold(view);
      expect(view.state.doc.toString()).toBe("hello **bold text**");
    });

    it("should wrap selected text with **", () => {
      createView("hello world", { anchor: 6, head: 11 });
      toggleBold(view);
      expect(view.state.doc.toString()).toBe("hello **world**");
    });

    it("should select the wrapped text", () => {
      createView("hello world", { anchor: 6, head: 11 });
      toggleBold(view);
      const sel = view.state.selection.main;
      expect(view.state.sliceDoc(sel.from, sel.to)).toBe("world");
    });
  });

  describe("toggleItalic", () => {
    it("should insert italic placeholder when no selection", () => {
      createView("", { anchor: 0 });
      toggleItalic(view);
      expect(view.state.doc.toString()).toBe("*italic text*");
    });

    it("should wrap selected text with *", () => {
      createView("some text", { anchor: 5, head: 9 });
      toggleItalic(view);
      expect(view.state.doc.toString()).toBe("some *text*");
    });
  });

  describe("toggleStrikethrough", () => {
    it("should insert strikethrough placeholder when no selection", () => {
      createView("", { anchor: 0 });
      toggleStrikethrough(view);
      expect(view.state.doc.toString()).toBe("~~strikethrough text~~");
    });

    it("should wrap selected text with ~~", () => {
      createView("remove this", { anchor: 7, head: 11 });
      toggleStrikethrough(view);
      expect(view.state.doc.toString()).toBe("remove ~~this~~");
    });
  });

  describe("toggleInlineCode", () => {
    it("should insert code placeholder when no selection", () => {
      createView("", { anchor: 0 });
      toggleInlineCode(view);
      expect(view.state.doc.toString()).toBe("`code`");
    });

    it("should wrap selected text with backticks", () => {
      createView("use myFunc here", { anchor: 4, head: 10 });
      toggleInlineCode(view);
      expect(view.state.doc.toString()).toBe("use `myFunc` here");
    });
  });
});
