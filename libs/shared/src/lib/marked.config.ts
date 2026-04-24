import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);

marked.use(
  { gfm: true, breaks: false },
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  }),
);

// Require double-tilde ~~ for strikethrough (ignore single ~)
marked.use({
  tokenizer: {
    del(src: string) {
      const match = /^~~([\s\S]+?)~~(?!~)/.exec(src);
      if (match) {
        const token = {
          type: "del" as const,
          raw: match[0],
          text: match[1],
          tokens: [] as ReturnType<typeof this.lexer.inlineTokens>,
        };
        this.lexer.inlineTokens(token.text, token.tokens);
        return token;
      }
      return undefined as unknown as false;
    },
  },
});

// Download links: [text](url){download} or [text](url){download=filename.ext}
// Renders as <a href="url" download[="filename"]>text</a>.
const DOWNLOAD_LINK_RE =
  /^\[((?:\\.|[^\]\\])+?)\]\(((?:\\.|[^)\\])+?)\)\{download(?:=([^}]+))?\}/;

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

marked.use({
  extensions: [
    {
      name: "downloadLink",
      level: "inline",
      start(src: string) {
        const idx = src.indexOf("[");
        return idx < 0 ? undefined : idx;
      },
      tokenizer(src: string) {
        const match = DOWNLOAD_LINK_RE.exec(src);
        if (!match) return undefined;
        const [raw, text, href, filename] = match;
        return {
          type: "downloadLink",
          raw,
          text,
          href,
          filename: filename?.trim() ?? "",
          tokens: this.lexer.inlineTokens(text),
        };
      },
      renderer(token) {
        const inner = this.parser.parseInline(token["tokens"] ?? []);
        const href = escapeAttr(token["href"]);
        const filename = token["filename"];
        const downloadAttr = filename
          ? ` download="${escapeAttr(filename)}"`
          : " download";
        return `<a href="${href}"${downloadAttr}>${inner}</a>`;
      },
    },
  ],
});

export { marked };
