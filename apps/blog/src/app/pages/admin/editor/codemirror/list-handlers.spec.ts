// @vitest-environment jsdom
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { afterEach, describe, expect, it } from "vitest";

import { listKeydownHandler } from "./list-handlers";

function createView(
  doc: string,
  selection?: { anchor: number; head?: number },
) {
  const parent = document.createElement("div");
  document.body.appendChild(parent);
  const state = EditorState.create({
    doc,
    selection: selection ?? { anchor: 0 },
  });
  const view = new EditorView({ state, parent });
  return { view, parent };
}

function fireKey(
  view: EditorView,
  key: string,
  opts: Partial<KeyboardEventInit> = {},
) {
  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
    ...opts,
  });
  listKeydownHandler(event, view);
  return event;
}

describe("listKeydownHandler", () => {
  let view: EditorView;
  let parent: HTMLDivElement;

  afterEach(() => {
    view?.destroy();
    parent?.remove();
  });

  describe("Enter on empty list item", () => {
    it("should clear an empty bullet item", () => {
      ({ view, parent } = createView("- item\n- ", { anchor: 9 }));
      const event = fireKey(view, "Enter");
      expect(event.defaultPrevented).toBe(true);
      expect(view.state.doc.toString()).toBe("- item\n");
    });

    it("should clear an empty numbered item", () => {
      ({ view, parent } = createView("1. first\n2. ", { anchor: 12 }));
      const event = fireKey(view, "Enter");
      expect(event.defaultPrevented).toBe(true);
      expect(view.state.doc.toString()).toBe("1. first\n");
    });

    it("should NOT intercept Enter on non-empty list item", () => {
      ({ view, parent } = createView("- item", { anchor: 6 }));
      const event = fireKey(view, "Enter");
      expect(event.defaultPrevented).toBe(false);
      expect(view.state.doc.toString()).toBe("- item");
    });

    it("should NOT intercept Enter with Shift held", () => {
      ({ view, parent } = createView("- ", { anchor: 2 }));
      const event = fireKey(view, "Enter", { shiftKey: true });
      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe("Tab indent/outdent list items", () => {
    it("should indent a bullet item", () => {
      ({ view, parent } = createView("- item", { anchor: 6 }));
      const event = fireKey(view, "Tab");
      expect(event.defaultPrevented).toBe(true);
      expect(view.state.doc.toString()).toBe("    - item");
    });

    it("should outdent an indented bullet item with Shift+Tab", () => {
      ({ view, parent } = createView("    - item", { anchor: 10 }));
      const event = fireKey(view, "Tab", { shiftKey: true });
      expect(event.defaultPrevented).toBe(true);
      expect(view.state.doc.toString()).toBe("- item");
    });

    it("should NOT outdent a non-indented item", () => {
      ({ view, parent } = createView("- item", { anchor: 6 }));
      const event = fireKey(view, "Tab", { shiftKey: true });
      expect(event.defaultPrevented).toBe(false);
    });

    it("should NOT intercept Tab on non-list lines", () => {
      ({ view, parent } = createView("plain text", { anchor: 5 }));
      const event = fireKey(view, "Tab");
      expect(event.defaultPrevented).toBe(false);
    });

    it("should indent ordered list items", () => {
      ({ view, parent } = createView("1. item", { anchor: 7 }));
      const event = fireKey(view, "Tab");
      expect(event.defaultPrevented).toBe(true);
      expect(view.state.doc.toString()).toMatch(/^\s+\d+\. item$/);
    });
  });
});
