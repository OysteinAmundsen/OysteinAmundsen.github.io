import { EditorView } from "@codemirror/view";

// ── List patterns ─────────────────────────────────────────────────────────────
const emptyListItemPattern = /^(\s*)([*+-]|\d+[.)])\s*$/;
const listLinePattern = /^(\s*)([*+-]|\d+[.]|[a-z]+[.]|[ivxlcdm]+[.])\s/i;

/**
 * Capture-phase DOM keydown handler for list-related keys.
 * Must be registered via `dom.addEventListener('keydown', ..., { capture: true })`
 * so it fires before CodeMirror's keymap dispatch.
 */
export function listKeydownHandler(event: KeyboardEvent, view: EditorView) {
  const { state } = view;
  const line = state.doc.lineAt(state.selection.main.head);

  // ── Enter: exit empty list items ──
  if (
    event.key === "Enter" &&
    !event.shiftKey &&
    !event.ctrlKey &&
    !event.metaKey
  ) {
    if (!emptyListItemPattern.test(line.text)) return;
    event.preventDefault();
    event.stopPropagation();
    view.dispatch({
      changes: { from: line.from, to: line.to, insert: "" },
      selection: { anchor: line.from },
    });
    return;
  }

  // ── Tab / Shift+Tab: indent/outdent list items ──
  if (event.key === "Tab" && !event.ctrlKey && !event.metaKey) {
    const match = listLinePattern.exec(line.text);
    if (!match) return;

    const [, indent, marker] = match;
    const outdent = event.shiftKey;

    if (outdent && indent.length === 0) return;

    const newIndent = outdent ? indent.slice(4) : indent + "    ";

    const isOrdered = /^\d+[.)]$/.test(marker);
    let newMarker = marker;
    if (isOrdered) {
      const targetIndent = newIndent;
      let nextNum = 1;
      for (let ln = line.number - 1; ln >= 1; ln--) {
        const prevLine = state.doc.line(ln);
        const prevMatch = listLinePattern.exec(prevLine.text);
        if (!prevMatch) break;
        const [, prevIndent, prevMarker] = prevMatch;
        if (prevIndent.length < targetIndent.length) break;
        if (prevIndent === targetIndent && /^\d+[.]$/.test(prevMarker)) {
          nextNum = parseInt(prevMarker, 10) + 1;
          break;
        }
      }
      newMarker = `${nextNum}.`;
    }

    const prefixEnd = line.from + indent.length + marker.length;
    event.preventDefault();
    event.stopPropagation();
    view.dispatch({
      changes: {
        from: line.from,
        to: prefixEnd,
        insert: newIndent + newMarker,
      },
      selection: {
        anchor: line.from + newIndent.length + newMarker.length + 1,
      },
    });
  }
}
