import { describe, expect, it } from "vitest";

import { marked } from "@blog/shared";

describe("marked.config", () => {
  describe("strikethrough", () => {
    it("should render double-tilde as strikethrough", () => {
      const result = marked.parse("~~deleted~~");
      expect(result).toContain("<del>");
      expect(result).toContain("deleted");
      expect(result).toContain("</del>");
    });

    it("should NOT render single-tilde as strikethrough", () => {
      const result = marked.parse("~not deleted~");
      expect(result).not.toContain("<del>");
      expect(result).toContain("~not deleted~");
    });

    it("should handle strikethrough within a sentence", () => {
      const result = marked.parse("This is ~~removed~~ text");
      expect(result).toContain("<del>");
      expect(result).toContain("removed");
    });

    it("should not match triple tildes as strikethrough", () => {
      const result = marked.parse("~~~not del~~~");
      // Triple tildes are code fences, not strikethrough
      expect(result).not.toContain("<del>");
    });
  });

  describe("GFM tables", () => {
    it("should render a GFM table as HTML table", () => {
      const md = ["| A | B |", "| - | - |", "| 1 | 2 |"].join("\n");

      const result = marked.parse(md);
      expect(result).toContain("<table>");
      expect(result).toContain("<th>");
      expect(result).toContain("<td>");
    });
  });

  describe("code highlighting", () => {
    it("should add hljs classes to fenced code blocks with a known language", () => {
      const md = "```typescript\nconst x = 1;\n```";
      const result = marked.parse(md);
      expect(result).toContain("hljs");
      expect(result).toContain("language-typescript");
    });

    it("should auto-detect language when not specified", () => {
      const md = "```\nconst x = 1;\n```";
      const result = marked.parse(md);
      expect(result).toContain("hljs");
    });
  });

  describe("basic markdown", () => {
    it("should render bold text", () => {
      const result = marked.parse("**bold**");
      expect(result).toContain("<strong>bold</strong>");
    });

    it("should render italic text", () => {
      const result = marked.parse("*italic*");
      expect(result).toContain("<em>italic</em>");
    });

    it("should render links", () => {
      const result = marked.parse("[text](https://example.com)");
      expect(result).toContain('<a href="https://example.com"');
      expect(result).toContain("text</a>");
    });

    it("should render inline code", () => {
      const result = marked.parse("Use `code` here");
      expect(result).toContain("<code>code</code>");
    });
  });
});
