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

export { marked };
