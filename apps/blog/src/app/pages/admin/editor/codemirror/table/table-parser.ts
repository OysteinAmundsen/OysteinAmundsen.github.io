import { type ParsedTable } from "./table.model";

export function parseMarkdownTable(text: string): ParsedTable | null {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l);
  if (lines.length < 2) return null;

  // Every line must start and end with `|` to be a complete table
  for (const line of lines) {
    if (!line.startsWith("|") || !line.endsWith("|")) return null;
  }

  const parseLine = (line: string): string[] =>
    line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());

  const headers = parseLine(lines[0]);
  const sepLine = parseLine(lines[1]);

  // Validate separator line
  if (!sepLine.every((s) => /^:?-+:?$/.test(s))) return null;

  // Column counts must be consistent across all lines
  const colCount = headers.length;
  if (sepLine.length !== colCount) return null;

  const alignments = sepLine.map((s): "left" | "center" | "right" | null => {
    const left = s.startsWith(":");
    const right = s.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    if (left) return "left";
    return null;
  });

  const rows = lines.slice(2).map(parseLine);
  for (const row of rows) {
    if (row.length !== colCount) return null;
  }
  return { headers, alignments, rows };
}

export function serializeTable(table: ParsedTable): string {
  const colCount = table.headers.length;

  // Calculate column widths
  const widths = Array.from({ length: colCount }, (_, i) => {
    const headerW = table.headers[i]?.length ?? 0;
    const rowMax = Math.max(0, ...table.rows.map((r) => (r[i] ?? "").length));
    return Math.max(3, headerW, rowMax);
  });

  const pad = (
    s: string,
    w: number,
    align: "left" | "center" | "right" | null,
  ) => {
    const trimmed = s ?? "";
    const space = w - trimmed.length;
    if (space <= 0) return trimmed;
    if (align === "right") return " ".repeat(space) + trimmed;
    if (align === "center") {
      const left = Math.floor(space / 2);
      return " ".repeat(left) + trimmed + " ".repeat(space - left);
    }
    return trimmed + " ".repeat(space);
  };

  const headerLine =
    "| " +
    table.headers
      .map((h, i) => pad(h, widths[i], table.alignments[i]))
      .join(" | ") +
    " |";

  const sepCells = widths.map((w, i) => {
    const a = table.alignments[i];
    const dashes = "-".repeat(w);
    if (a === "center") return ":" + dashes.slice(1, -1) + ":";
    if (a === "right") return dashes.slice(0, -1) + ":";
    if (a === "left") return ":" + dashes.slice(1);
    return dashes;
  });
  const sepLineStr = "| " + sepCells.join(" | ") + " |";

  const rowLines = table.rows.map(
    (row) =>
      "| " +
      Array.from({ length: colCount }, (_, i) =>
        pad(row[i] ?? "", widths[i], table.alignments[i]),
      ).join(" | ") +
      " |",
  );

  return [headerLine, sepLineStr, ...rowLines].join("\n");
}
