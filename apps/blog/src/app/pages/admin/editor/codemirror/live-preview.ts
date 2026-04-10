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

// ── Simple widgets ────────────────────────────────────────────────────────────

class HrWidget extends WidgetType {
  override toDOM(): HTMLElement {
    const hr = document.createElement("hr");
    hr.className = "cm-hr-widget";
    return hr;
  }
  override eq(): boolean {
    return true; // All HR widgets are identical — avoid unnecessary DOM rebuilds
  }
}

class CodeLangWidget extends WidgetType {
  constructor(private lang: string) {
    super();
  }
  override toDOM(): HTMLElement {
    const span = document.createElement("span");
    span.className = "cm-code-lang-badge";
    span.textContent = this.lang;
    return span;
  }
  override eq(other: CodeLangWidget): boolean {
    return this.lang === other.lang;
  }
}

class ImageWidget extends WidgetType {
  constructor(
    private alt: string,
    private url: string,
    private pos: number,
  ) {
    super();
  }
  override toDOM(view: EditorView): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "cm-image-widget";
    const img = document.createElement("img");
    img.src = this.url;
    img.alt = this.alt;
    img.loading = "lazy";
    wrapper.appendChild(img);
    // On click, place cursor on the image line so the widget
    // switches back to raw markdown for editing.
    wrapper.addEventListener("mousedown", (e) => {
      e.preventDefault();
      view.dispatch({ selection: { anchor: this.pos } });
      view.focus();
    });
    return wrapper;
  }
  override eq(other: ImageWidget): boolean {
    return this.alt === other.alt && this.url === other.url;
  }
}

// ── Decoration builder ────────────────────────────────────────────────────────

function buildDecorations(view: EditorView): DecorationSet {
  const { state } = view;
  const tree = syntaxTree(state);
  const decorations: Range<Decoration>[] = [];

  // Determine which lines have a cursor/selection
  const activeLines = new Set<number>();
  for (const range of state.selection.ranges) {
    const start = state.doc.lineAt(range.from).number;
    const end = state.doc.lineAt(range.to).number;
    for (let i = start; i <= end; i++) activeLines.add(i);
  }

  const isActive = (pos: number): boolean => {
    if (pos < 0 || pos > state.doc.length) return false;
    return activeLines.has(state.doc.lineAt(pos).number);
  };

  // Check if any cursor is inside a fenced code block
  const isInsideCodeBlock = (blockFrom: number, blockTo: number): boolean => {
    for (const range of state.selection.ranges) {
      if (range.from >= blockFrom && range.to <= blockTo) return true;
      // Cursor on the fence lines themselves
      const cursorLine = state.doc.lineAt(range.head).number;
      const blockStartLine = state.doc.lineAt(blockFrom).number;
      const blockEndLine = state.doc.lineAt(
        Math.min(blockTo, state.doc.length),
      ).number;
      if (cursorLine >= blockStartLine && cursorLine <= blockEndLine)
        return true;
    }
    return false;
  };

  const headingLines = new Set<number>();
  const quoteLines = new Set<number>();
  const codeBlockLines = new Set<number>();

  tree.iterate({
    enter(node): false | void {
      const { from, to } = node;

      // ── Tables (GFM) — handled by separate StateField ──
      if (node.type.name === "Table") {
        return false;
      }

      // ── Fenced code blocks ──
      if (node.type.name === "FencedCode") {
        const active = isInsideCodeBlock(from, to);
        const startLine = state.doc.lineAt(from).number;
        const endLine = state.doc.lineAt(Math.min(to, state.doc.length)).number;

        // Mark all lines inside the code block for background styling
        for (let i = startLine; i <= endLine; i++) {
          codeBlockLines.add(i);
          // Add background to content lines (not fence lines when hidden)
          if (!active || (i > startLine && i < endLine)) {
            decorations.push(
              Decoration.line({ class: "cm-codeblock-line" }).range(
                state.doc.line(i).from,
              ),
            );
          }
          if (active && (i === startLine || i === endLine)) {
            decorations.push(
              Decoration.line({ class: "cm-codeblock-fence-line" }).range(
                state.doc.line(i).from,
              ),
            );
          }
        }

        if (!active) {
          // Extract language from the opening fence
          const openingLine = state.doc.line(startLine);
          const langMatch = /^```(\w+)?/.exec(openingLine.text);
          const lang = langMatch?.[1] ?? "";

          // Hide the opening fence line content, show badge instead
          decorations.push(
            Decoration.replace({
              widget: lang ? new CodeLangWidget(lang) : undefined,
            }).range(openingLine.from, openingLine.to),
          );

          // Hide the closing fence line
          const closingLine = state.doc.line(endLine);
          decorations.push(
            Decoration.replace({}).range(closingLine.from, closingLine.to),
          );
        }

        return false;
      }

      if (node.type.name === "CodeBlock") {
        return false;
      }

      switch (node.type.name) {
        // ── Headings ──
        case "ATXHeading1":
        case "ATXHeading2":
        case "ATXHeading3":
        case "ATXHeading4":
        case "ATXHeading5":
        case "ATXHeading6":
        case "SetextHeading1":
        case "SetextHeading2": {
          const level = /\d/.exec(node.type.name)?.[0] ?? "1";
          const lineNo = state.doc.lineAt(from).number;
          if (!headingLines.has(lineNo)) {
            headingLines.add(lineNo);
            decorations.push(
              Decoration.line({
                class: `cm-heading cm-heading-${level}`,
              }).range(state.doc.lineAt(from).from),
            );
          }
          break;
        }

        case "HeaderMark": {
          if (!isActive(from)) {
            let end = to;
            // Also hide the trailing space after #
            if (
              end < state.doc.length &&
              state.doc.sliceString(end, end + 1) === " "
            ) {
              end++;
            }
            decorations.push(Decoration.replace({}).range(from, end));
          } else {
            decorations.push(
              Decoration.mark({
                class: "cm-formatting cm-formatting-header",
              }).range(from, to),
            );
          }
          break;
        }

        // ── Bold ──
        case "StrongEmphasis": {
          decorations.push(
            Decoration.mark({ class: "cm-strong" }).range(from, to),
          );
          break;
        }

        // ── Italic ──
        case "Emphasis": {
          decorations.push(Decoration.mark({ class: "cm-em" }).range(from, to));
          break;
        }

        // ── Emphasis marks (*, **, _, __) ──
        case "EmphasisMark": {
          if (!isActive(from)) {
            decorations.push(Decoration.replace({}).range(from, to));
          } else {
            decorations.push(
              Decoration.mark({ class: "cm-formatting" }).range(from, to),
            );
          }
          break;
        }

        // ── Inline code ──
        case "InlineCode": {
          decorations.push(
            Decoration.mark({ class: "cm-inline-code" }).range(from, to),
          );
          break;
        }

        case "CodeMark": {
          if (!isActive(from)) {
            decorations.push(Decoration.replace({}).range(from, to));
          } else {
            decorations.push(
              Decoration.mark({ class: "cm-formatting" }).range(from, to),
            );
          }
          break;
        }

        // ── Links ──
        case "Link": {
          decorations.push(
            Decoration.mark({ class: "cm-link-text" }).range(from, to),
          );
          break;
        }

        case "LinkMark": {
          if (!isActive(from)) {
            decorations.push(Decoration.replace({}).range(from, to));
          } else {
            decorations.push(
              Decoration.mark({ class: "cm-formatting" }).range(from, to),
            );
          }
          break;
        }

        case "URL": {
          if (!isActive(from)) {
            decorations.push(Decoration.replace({}).range(from, to));
          } else {
            decorations.push(
              Decoration.mark({ class: "cm-formatting cm-url" }).range(
                from,
                to,
              ),
            );
          }
          break;
        }

        // ── Images ──
        case "Image": {
          if (!isActive(from)) {
            // Extract alt text and URL from the markdown ![alt](url)
            const text = state.sliceDoc(from, to);
            const match = /^!\[([^\]]*)\]\(([^)]*)\)$/.exec(text);
            if (match) {
              const [, alt, url] = match;
              decorations.push(
                Decoration.replace({
                  widget: new ImageWidget(alt, url, from),
                }).range(from, to),
              );
            }
          }
          break;
        }

        // ── Blockquotes ──
        case "Blockquote": {
          const startLine = state.doc.lineAt(from).number;
          const endLine = state.doc.lineAt(
            Math.min(to, state.doc.length),
          ).number;
          for (let i = startLine; i <= endLine; i++) {
            if (!quoteLines.has(i)) {
              quoteLines.add(i);
              decorations.push(
                Decoration.line({ class: "cm-blockquote" }).range(
                  state.doc.line(i).from,
                ),
              );
            }
          }
          break;
        }

        case "QuoteMark": {
          if (!isActive(from)) {
            let end = to;
            if (
              end < state.doc.length &&
              state.doc.sliceString(end, end + 1) === " "
            ) {
              end++;
            }
            decorations.push(Decoration.replace({}).range(from, end));
          } else {
            decorations.push(
              Decoration.mark({
                class: "cm-formatting cm-formatting-quote",
              }).range(from, to),
            );
          }
          break;
        }

        // ── Horizontal rule ──
        case "HorizontalRule": {
          if (!isActive(from)) {
            decorations.push(
              Decoration.replace({ widget: new HrWidget() }).range(from, to),
            );
          }
          break;
        }

        // ── Strikethrough (GFM) ──
        case "Strikethrough": {
          decorations.push(
            Decoration.mark({ class: "cm-strikethrough" }).range(from, to),
          );
          break;
        }

        case "StrikethroughMark": {
          if (!isActive(from)) {
            decorations.push(Decoration.replace({}).range(from, to));
          } else {
            decorations.push(
              Decoration.mark({ class: "cm-formatting" }).range(from, to),
            );
          }
          break;
        }
      }
    },
  });

  return Decoration.set(decorations, true);
}

// ── ViewPlugin ────────────────────────────────────────────────────────────────

export const livePreview = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = buildDecorations(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged || update.selectionSet) {
        this.decorations = buildDecorations(update.view);
      }
    }
  },
  { decorations: (v) => v.decorations },
);
