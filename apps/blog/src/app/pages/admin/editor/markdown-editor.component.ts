import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  input,
  model,
  OnDestroy,
  output,
  signal,
  untracked,
  viewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from "@codemirror/lang-markdown";
import { syntaxHighlighting } from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import { EditorState } from "@codemirror/state";
import { drawSelection, EditorView, keymap } from "@codemirror/view";
import { GFM } from "@lezer/markdown";

import { codeHighlightStyle } from "./codemirror/highlight-style";
import { imageDropHandler } from "./codemirror/image-drop-handler";
import { imageReplaceButton } from "./codemirror/image-replace-button";
import { listKeydownHandler } from "./codemirror/list-handlers";
import { livePreview } from "./codemirror/live-preview";
import {
  tableAutoComplete,
  tableDecorations,
  tableNavKeymap,
} from "./codemirror/table/table-decorations";
import {
  insertImage,
  toggleBold,
  toggleInlineCode,
  toggleItalic,
  toggleStrikethrough,
  toolbarItems,
  type ToolbarEntry,
} from "./codemirror/toolbar";

// ── Component ─────────────────────────────────────────────────────────────────
@Component({
  selector: "app-markdown-editor",
  templateUrl: "./markdown-editor.component.html",
  styleUrls: ["./markdown-editor.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MarkdownEditorComponent implements OnDestroy {
  readonly value = input<string>("");
  readonly valueChange = output<string>();
  readonly imageUpload = input<(file: File) => Promise<string>>();
  readonly markdownMode = model(false);

  protected readonly toolbarItems = toolbarItems;

  private readonly editorHost =
    viewChild<ElementRef<HTMLElement>>("editorHost");

  private view: EditorView | null = null;
  private lastSyncedValue = "";
  private readonly ready = signal(false);
  private readonly browserReady = signal(false);

  constructor() {
    // Mark browser as ready after first render
    afterNextRender(() => this.browserReady.set(true));

    // Sync external value changes into the editor
    effect(() => {
      const val = this.value();
      const isReady = this.ready();
      if (this.view && isReady && val !== this.lastSyncedValue) {
        this.lastSyncedValue = val;
        this.view.dispatch({
          changes: { from: 0, to: this.view.state.doc.length, insert: val },
        });
      }
    });

    // Create / destroy the CM editor when mode or browser-ready changes
    effect(() => {
      const isMarkdown = this.markdownMode();
      const isBrowser = this.browserReady();
      const host = this.editorHost();
      const val = this.value();
      if (!isBrowser) return;

      if (isMarkdown) {
        // Switching to code mode — destroy CM view
        if (this.view) {
          this.lastSyncedValue = this.view.state.doc.toString();
          this.view.destroy();
          this.view = null;
          this.ready.set(false);
        }
      } else if (!this.view && host?.nativeElement && val) {
        // WYSIWYG mode — host is in the DOM and content is loaded.
        // Use rAF so the browser finishes layout before CM measures cursor positions.
        requestAnimationFrame(() => {
          if (!this.view) untracked(() => this.initEditor());
        });
      }
    });
  }

  protected toggleMode(event: MouseEvent): void {
    event.preventDefault();
    this.markdownMode.set(!this.markdownMode());
  }

  /** Handle toolbar button clicks. Uses mousedown + preventDefault to keep editor focus. */
  protected onToolbarAction(event: MouseEvent, item: ToolbarEntry): void {
    event.preventDefault();
    if (item.separator) return;
    if (item.needsUpload) {
      if (this.view) insertImage(this.view, this.imageUpload());
    } else if (this.view) {
      item.action(this.view);
    }
  }

  protected onCodeInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.lastSyncedValue = value;
    this.valueChange.emit(value);
  }

  private initEditor(): void {
    const host = this.editorHost()?.nativeElement;
    if (!host) return;
    const uploadFn = this.imageUpload();

    const extensions = [
      markdown({
        base: markdownLanguage,
        codeLanguages: languages,
        extensions: GFM,
      }),
      syntaxHighlighting(codeHighlightStyle),
      livePreview,
      tableDecorations,
      tableNavKeymap,
      keymap.of([
        { key: "Mod-b", run: toggleBold },
        { key: "Mod-i", run: toggleItalic },
        { key: "Mod-Shift-x", run: toggleStrikethrough },
        { key: "Mod-e", run: toggleInlineCode },
        ...markdownKeymap,
        indentWithTab,
        ...defaultKeymap,
        ...historyKeymap,
      ]),
      history(),
      drawSelection(),
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (update.docChanged && this.ready()) {
          const doc = update.state.doc.toString();
          this.lastSyncedValue = doc;
          this.valueChange.emit(doc);
        }
      }),
      // Keep cursor visible below the fixed site-header + sticky toolbar.
      // Only fires when edit focus is inside the editor (not on load/scroll).
      EditorView.updateListener.of((update) => {
        if (!update.selectionSet) return;
        requestAnimationFrame(() => {
          if (!update.view.hasFocus) return;
          const head = update.state.selection.main.head;
          const coords = update.view.coordsAtPos(head);
          if (!coords) return;
          const toolbar = update.view.dom
            .closest("app-markdown-editor")
            ?.querySelector<HTMLElement>(".cm-toolbar");
          const stickyBottom = toolbar
            ? toolbar.getBoundingClientRect().bottom
            : 84;
          if (coords.top < stickyBottom) {
            window.scrollBy({
              top: coords.top - stickyBottom,
              behavior: "instant",
            });
          }
        });
      }),
      tableAutoComplete,
    ];

    if (uploadFn) {
      extensions.push(imageDropHandler(uploadFn));
      extensions.push(imageReplaceButton(uploadFn));
    }

    this.view = new EditorView({
      state: EditorState.create({ doc: this.value(), extensions }),
      parent: host,
    });

    // Capture-phase keyboard handler — fires before CodeMirror's keymap dispatch.
    this.view.dom.addEventListener(
      "keydown",
      (e) => {
        if (this.view) listKeydownHandler(e, this.view);
      },
      { capture: true },
    );

    this.lastSyncedValue = this.value();
    this.ready.set(true);
  }

  ngOnDestroy() {
    this.view?.destroy();
  }
}
