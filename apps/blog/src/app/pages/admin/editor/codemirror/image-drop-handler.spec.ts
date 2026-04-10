// @vitest-environment jsdom
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { afterEach, describe, expect, it, vi } from "vitest";

import { imageDropHandler } from "./image-drop-handler";

function createView(
  doc: string,
  uploadFn: (file: File) => Promise<string>,
  selection?: { anchor: number },
) {
  const parent = document.createElement("div");
  document.body.appendChild(parent);
  const state = EditorState.create({
    doc,
    selection: selection ?? { anchor: 0 },
    extensions: [imageDropHandler(uploadFn)],
  });
  const view = new EditorView({ state, parent });
  return { view, parent };
}

/** Create a minimal drop event with a fake file list. */
function createDropEvent(files: File[]): DragEvent {
  const event = new Event("drop", {
    bubbles: true,
    cancelable: true,
  }) as DragEvent;
  Object.defineProperty(event, "dataTransfer", {
    value: {
      files: Object.assign(files, {
        length: files.length,
        item: (i: number) => files[i],
      }),
      getData: () => "",
      setData: () => {
        /* noop mock */
      },
    },
  });
  Object.defineProperty(event, "clientX", { value: 0 });
  Object.defineProperty(event, "clientY", { value: 0 });
  return event;
}

/** Create a minimal paste event with fake clipboard items. */
function createPasteEvent(file: File): ClipboardEvent {
  const event = new Event("paste", {
    bubbles: true,
    cancelable: true,
  }) as ClipboardEvent;
  Object.defineProperty(event, "clipboardData", {
    value: {
      items: [
        {
          type: file.type,
          getAsFile: () => file,
        },
      ],
    },
  });
  return event;
}

describe("imageDropHandler", () => {
  let view: EditorView;
  let parent: HTMLDivElement;

  afterEach(() => {
    view?.destroy();
    parent?.remove();
  });

  describe("drop", () => {
    it("should call upload and insert image markdown on drop of image file", async () => {
      const url = "https://example.com/img.png";
      const uploadFn = vi.fn().mockResolvedValue(url);
      ({ view, parent } = createView("hello", uploadFn, { anchor: 5 }));

      const file = new File(["data"], "test.png", { type: "image/png" });
      const dropEvent = createDropEvent([file]);
      view.dom.querySelector(".cm-content")!.dispatchEvent(dropEvent);

      await vi.waitFor(() => {
        expect(uploadFn).toHaveBeenCalledWith(file);
      });

      await vi.waitFor(() => {
        expect(view.state.doc.toString()).toContain(`![](${url})`);
      });
    });

    it("should ignore non-image files on drop", () => {
      const uploadFn = vi.fn();
      ({ view, parent } = createView("hello", uploadFn));

      const file = new File(["data"], "test.txt", { type: "text/plain" });
      const dropEvent = createDropEvent([file]);
      view.dom.querySelector(".cm-content")!.dispatchEvent(dropEvent);

      expect(uploadFn).not.toHaveBeenCalled();
    });

    it("should ignore drop events with no files", () => {
      const uploadFn = vi.fn();
      ({ view, parent } = createView("hello", uploadFn));

      const dropEvent = createDropEvent([]);
      view.dom.querySelector(".cm-content")!.dispatchEvent(dropEvent);

      expect(uploadFn).not.toHaveBeenCalled();
    });
  });

  describe("paste", () => {
    it("should call upload and insert image markdown on paste of image", async () => {
      const url = "https://example.com/pasted.png";
      const uploadFn = vi.fn().mockResolvedValue(url);
      ({ view, parent } = createView("", uploadFn));

      const file = new File(["data"], "pasted.png", { type: "image/png" });
      const pasteEvent = createPasteEvent(file);
      view.dom.querySelector(".cm-content")!.dispatchEvent(pasteEvent);

      await vi.waitFor(() => {
        expect(uploadFn).toHaveBeenCalledWith(file);
      });

      await vi.waitFor(() => {
        expect(view.state.doc.toString()).toContain(`![](${url})`);
      });
    });
  });
});
