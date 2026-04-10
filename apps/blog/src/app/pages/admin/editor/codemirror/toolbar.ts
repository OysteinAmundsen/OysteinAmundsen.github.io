import { EditorView } from "@codemirror/view";

import { serializeTable } from "./table/table-parser";
import { focusBodyRow } from "./table/table-widget";
import type { ParsedTable } from "./table/table.model";

// ── Formatting commands ───────────────────────────────────────────────────────

/** Wrap selection with prefix/suffix, or insert placeholder if no selection. */
function wrapSelection(
  view: EditorView,
  prefix: string,
  suffix: string,
  placeholder: string,
) {
  const { from, to } = view.state.selection.main;
  const selected = view.state.sliceDoc(from, to);
  const text = selected || placeholder;
  view.dispatch({
    changes: { from, to, insert: prefix + text + suffix },
    selection: {
      anchor: from + prefix.length,
      head: from + prefix.length + text.length,
    },
  });
  view.focus();
}

export function toggleBold(view: EditorView) {
  wrapSelection(view, "**", "**", "bold text");
  return true;
}

export function toggleItalic(view: EditorView) {
  wrapSelection(view, "*", "*", "italic text");
  return true;
}

export function toggleStrikethrough(view: EditorView) {
  wrapSelection(view, "~~", "~~", "strikethrough text");
  return true;
}

export function toggleInlineCode(view: EditorView) {
  wrapSelection(view, "`", "`", "code");
  return true;
}

function insertLink(view: EditorView) {
  const { from, to } = view.state.selection.main;
  const selected = view.state.sliceDoc(from, to);
  const text = selected || "link text";
  const md = `[${text}](url)`;
  view.dispatch({
    changes: { from, to, insert: md },
    // Select "url" so user can type the URL immediately
    selection: {
      anchor: from + text.length + 3,
      head: from + text.length + 6,
    },
  });
  view.focus();
}

// ── Insert commands ───────────────────────────────────────────────────────────

function insertTable(view: EditorView) {
  const pos = view.state.selection.main.head;
  const line = view.state.doc.lineAt(pos);
  const prefix = line.text.trim() ? "\n\n" : line.from === pos ? "" : "\n";
  const table: ParsedTable = {
    headers: ["Header 1", "Header 2"],
    alignments: [null, null],
    rows: [["", ""]],
  };
  const md = prefix + serializeTable(table) + "\n";
  const tableStart = pos + prefix.length;
  view.dispatch({
    changes: { from: pos, insert: md },
    selection: { anchor: tableStart },
  });
  focusBodyRow(view, tableStart, 0);
}

export function insertImage(
  view: EditorView,
  uploadFn?: (file: File) => Promise<string>,
) {
  if (!uploadFn) {
    // Fallback: insert placeholder markdown
    const pos = view.state.selection.main.head;
    const md = "![alt text](url)";
    view.dispatch({
      changes: { from: pos, insert: md },
      selection: { anchor: pos + 2, head: pos + 10 },
    });
    view.focus();
    return;
  }

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;
    const pos = view.state.selection.main.head;
    // Insert placeholder while uploading
    const placeholder = `![Uploading ${file.name}...]()`;
    view.dispatch({
      changes: { from: pos, insert: placeholder },
    });
    uploadFn(file).then((url) => {
      // Find and replace placeholder with final markdown
      const doc = view.state.doc.toString();
      const idx = doc.indexOf(placeholder);
      if (idx >= 0) {
        const final = `![${file.name}](${url})`;
        view.dispatch({
          changes: { from: idx, to: idx + placeholder.length, insert: final },
        });
      }
    });
    view.focus();
  });
  input.click();
}

function insertList(view: EditorView, ordered: boolean) {
  const pos = view.state.selection.main.head;
  const line = view.state.doc.lineAt(pos);
  const prefix = line.text.trim() ? "\n" : "";
  const bullet = ordered ? "1. " : "- ";
  view.dispatch({
    changes: { from: pos, insert: prefix + bullet },
    selection: { anchor: pos + prefix.length + bullet.length },
  });
  view.focus();
}

function insertBlockquote(view: EditorView) {
  const pos = view.state.selection.main.head;
  const line = view.state.doc.lineAt(pos);
  const prefix = line.text.trim() ? "\n" : "";
  view.dispatch({
    changes: { from: pos, insert: prefix + "> " },
    selection: { anchor: pos + prefix.length + 2 },
  });
  view.focus();
}

function insertCodeBlock(view: EditorView) {
  const pos = view.state.selection.main.head;
  const line = view.state.doc.lineAt(pos);
  const prefix = line.text.trim() ? "\n\n" : "";
  const md = prefix + "```\n\n```\n";
  view.dispatch({
    changes: { from: pos, insert: md },
    selection: { anchor: pos + prefix.length + 4 },
  });
  view.focus();
}

function insertHorizontalRule(view: EditorView) {
  const pos = view.state.selection.main.head;
  const line = view.state.doc.lineAt(pos);
  const prefix = line.text.trim() ? "\n\n" : "";
  view.dispatch({
    changes: { from: pos, insert: prefix + "---\n" },
    selection: { anchor: pos + prefix.length + 4 },
  });
  view.focus();
}

// ── Toolbar button definitions ────────────────────────────────────────────────

export interface ToolbarItem {
  icon: string;
  title: string;
  action: (view: EditorView) => void;
  needsUpload?: boolean;
  separator?: false;
}

export interface ToolbarSeparator {
  separator: true;
}

export type ToolbarEntry = ToolbarItem | ToolbarSeparator;

export const toolbarItems: ToolbarEntry[] = [
  { icon: "format_bold", title: "Bold (Ctrl+B)", action: toggleBold },
  { icon: "format_italic", title: "Italic (Ctrl+I)", action: toggleItalic },
  {
    icon: "strikethrough_s",
    title: "Strikethrough",
    action: toggleStrikethrough,
  },
  { icon: "code", title: "Inline code", action: toggleInlineCode },
  { icon: "link", title: "Link", action: insertLink },
  { separator: true },
  {
    icon: "image",
    title: "Image",
    action: (v) => insertImage(v),
    needsUpload: true,
  },
  { icon: "table_chart", title: "Table", action: insertTable },
  {
    icon: "format_list_bulleted",
    title: "Bullet list",
    action: (v) => insertList(v, false),
  },
  {
    icon: "format_list_numbered",
    title: "Numbered list",
    action: (v) => insertList(v, true),
  },
  { icon: "format_quote", title: "Blockquote", action: insertBlockquote },
  { icon: "data_object", title: "Code block", action: insertCodeBlock },
  {
    icon: "horizontal_rule",
    title: "Horizontal rule",
    action: insertHorizontalRule,
  },
];

// createToolbar removed — toolbar is now rendered via Angular template
