import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from "@angular/core";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { Crepe } from "@milkdown/crepe";
import { replaceAll } from "@milkdown/kit/utils";

/**
 * CodeMirror highlight style that matches the hljs token colors
 * used in the article view's .prose class (_prose.scss).
 */
const proseHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "var(--tertiary)" },
  { tag: tags.operatorKeyword, color: "var(--tertiary)" },
  { tag: tags.controlKeyword, color: "var(--tertiary)" },
  { tag: tags.definitionKeyword, color: "var(--tertiary)" },
  { tag: tags.moduleKeyword, color: "var(--tertiary)" },
  { tag: tags.tagName, color: "var(--tertiary)" },
  { tag: tags.string, color: "var(--secondary)" },
  { tag: tags.special(tags.string), color: "var(--secondary)" },
  { tag: tags.attributeName, color: "var(--secondary)" },
  { tag: tags.attributeValue, color: "var(--secondary)" },
  {
    tag: tags.comment,
    color: "var(--on-surface-variant)",
    opacity: "0.6",
    fontStyle: "italic",
  },
  {
    tag: tags.lineComment,
    color: "var(--on-surface-variant)",
    opacity: "0.6",
    fontStyle: "italic",
  },
  {
    tag: tags.blockComment,
    color: "var(--on-surface-variant)",
    opacity: "0.6",
    fontStyle: "italic",
  },
  { tag: tags.number, color: "var(--primary)" },
  { tag: tags.bool, color: "var(--primary)" },
  { tag: tags.null, color: "var(--primary)" },
  { tag: tags.function(tags.variableName), color: "var(--primary-dim)" },
  {
    tag: tags.function(tags.definition(tags.variableName)),
    color: "var(--primary-dim)",
  },
  { tag: tags.definition(tags.typeName), color: "#e5c07b" },
  { tag: tags.typeName, color: "#e5c07b" },
  { tag: tags.className, color: "#e5c07b" },
  { tag: tags.meta, color: "var(--tertiary-container)" },
  { tag: tags.variableName, color: "var(--on-surface)" },
  { tag: tags.propertyName, color: "var(--primary-dim)" },
  { tag: tags.punctuation, color: "var(--on-surface-variant)" },
  { tag: tags.operator, color: "var(--on-surface-variant)" },
  { tag: tags.self, color: "var(--tertiary)" },
  { tag: tags.regexp, color: "var(--secondary)" },
]);

@Component({
  selector: "app-milkdown-editor",
  template: `<div class="milkdown-host" #editorHost></div>`,
  styleUrls: ["./milkdown-editor.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MilkdownEditorComponent implements OnDestroy {
  readonly value = input<string>("");
  readonly valueChange = output<string>();

  private readonly editorHost =
    viewChild.required<ElementRef<HTMLElement>>("editorHost");

  private crepe: Crepe | null = null;
  private readonly crepeReady = signal(false);
  private lastSyncedValue = "";

  constructor() {
    afterNextRender(() => this.initEditor());

    // Sync external value changes into the editor
    effect(() => {
      const val = this.value();
      const ready = this.crepeReady();
      if (this.crepe && ready && val !== this.lastSyncedValue) {
        this.lastSyncedValue = val;
        this.crepe.editor.action(replaceAll(val));
      }
    });
  }

  private async initEditor() {
    const host = this.editorHost().nativeElement;

    this.crepe = new Crepe({
      root: host,
      defaultValue: this.value(),
      featureConfigs: {
        [Crepe.Feature.CodeMirror]: {
          theme: syntaxHighlighting(proseHighlightStyle),
        },
      },
    });

    this.crepe.on((listener) => {
      listener.markdownUpdated((_ctx, markdown) => {
        this.lastSyncedValue = markdown;
        this.valueChange.emit(markdown);
      });
    });

    await this.crepe.create();
    this.lastSyncedValue = this.value();
    this.crepeReady.set(true);
  }

  ngOnDestroy() {
    this.crepe?.destroy();
  }
}
