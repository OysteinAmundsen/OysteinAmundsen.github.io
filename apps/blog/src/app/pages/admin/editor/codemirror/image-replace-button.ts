import { syntaxTree } from "@codemirror/language";
import { type Range } from "@codemirror/state";
import {
  Decoration,
  type DecorationSet,
  EditorView,
  ViewPlugin,
  type ViewUpdate,
  WidgetType,
} from "@codemirror/view";

// ── Widget ────────────────────────────────────────────────────────────────────

class ImageReplaceWidget extends WidgetType {
  constructor(
    private imageFrom: number,
    private imageTo: number,
    private alt: string,
    private uploadFn: (file: File) => Promise<string>,
  ) {
    super();
  }

  override toDOM(view: EditorView): HTMLElement {
    const btn = document.createElement("button");
    btn.className = "cm-image-replace-btn";
    btn.type = "button";
    btn.title = "Replace image";
    btn.innerHTML = `<span class="material-icons">upload</span>`;
    btn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.addEventListener("change", () => {
        const file = input.files?.[0];
        if (!file) return;
        // Show uploading state
        btn.classList.add("cm-image-replace-uploading");
        this.uploadFn(file).then((url) => {
          const newMd = `![${this.alt}](${url})`;
          view.dispatch({
            changes: {
              from: this.imageFrom,
              to: this.imageTo,
              insert: newMd,
            },
          });
        });
      });
      input.click();
    });
    return btn;
  }

  override eq(other: ImageReplaceWidget): boolean {
    return this.imageFrom === other.imageFrom && this.imageTo === other.imageTo;
  }
}

// ── Decoration builder ────────────────────────────────────────────────────────

function buildDecorations(
  view: EditorView,
  uploadFn: (file: File) => Promise<string>,
): DecorationSet {
  const { state } = view;
  const tree = syntaxTree(state);
  const decorations: Range<Decoration>[] = [];

  const activeLines = new Set<number>();
  for (const range of state.selection.ranges) {
    const start = state.doc.lineAt(range.from).number;
    const end = state.doc.lineAt(range.to).number;
    for (let i = start; i <= end; i++) activeLines.add(i);
  }

  tree.iterate({
    enter(node) {
      if (node.type.name !== "Image") return;
      const { from, to } = node;
      const lineNo = state.doc.lineAt(from).number;
      if (!activeLines.has(lineNo)) return;

      const text = state.sliceDoc(from, to);
      const match = /^!\[([^\]]*)\]\(([^)]*)\)$/.exec(text);
      if (!match) return;
      const [, alt] = match;

      decorations.push(
        Decoration.widget({
          widget: new ImageReplaceWidget(from, to, alt, uploadFn),
          side: 1,
        }).range(to),
      );
    },
  });

  return Decoration.set(decorations, true);
}

// ── Extension factory ─────────────────────────────────────────────────────────

export function imageReplaceButton(uploadFn: (file: File) => Promise<string>) {
  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;
      constructor(view: EditorView) {
        this.decorations = buildDecorations(view, uploadFn);
      }
      update(update: ViewUpdate) {
        if (
          update.docChanged ||
          update.viewportChanged ||
          update.selectionSet
        ) {
          this.decorations = buildDecorations(update.view, uploadFn);
        }
      }
    },
    { decorations: (v) => v.decorations },
  );
}
