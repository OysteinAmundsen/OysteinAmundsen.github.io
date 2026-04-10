import { EditorView } from "@codemirror/view";

export function imageDropHandler(upload: (file: File) => Promise<string>) {
  return EditorView.domEventHandlers({
    drop(event, view) {
      const files = event.dataTransfer?.files;
      if (!files?.length) return false;
      const file = files[0];
      if (!file.type.startsWith("image/")) return false;
      event.preventDefault();
      const pos =
        view.posAtCoords({ x: event.clientX, y: event.clientY }) ??
        view.state.selection.main.head;
      upload(file).then((url) => {
        view.dispatch({ changes: { from: pos, insert: `![](${url})` } });
      });
      return true;
    },
    paste(event, view) {
      const items = event.clipboardData?.items;
      if (!items) return false;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          event.preventDefault();
          const file = item.getAsFile();
          if (!file) continue;
          const pos = view.state.selection.main.head;
          upload(file).then((url) => {
            view.dispatch({ changes: { from: pos, insert: `![](${url})` } });
          });
          return true;
        }
      }
      return false;
    },
  });
}
