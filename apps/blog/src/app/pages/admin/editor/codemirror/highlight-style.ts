import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

/** Syntax-highlight style for fenced code blocks, matching the prose theme. */
export const codeHighlightStyle = HighlightStyle.define([
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
