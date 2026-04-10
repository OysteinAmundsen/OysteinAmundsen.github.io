import { describe, expect, it } from "vitest";

import { parseMarkdownTable, serializeTable } from "./table-parser";
import type { ParsedTable } from "./table.model";

describe("parseMarkdownTable", () => {
  it("should parse a basic 2-column table", () => {
    const md = ["| A | B |", "| - | - |", "| 1 | 2 |"].join("\n");

    const result = parseMarkdownTable(md);
    expect(result).toEqual({
      headers: ["A", "B"],
      alignments: [null, null],
      rows: [["1", "2"]],
    });
  });

  it("should parse a table with multiple rows", () => {
    const md = [
      "| Name  | Age |",
      "| ----- | --- |",
      "| Alice | 30  |",
      "| Bob   | 25  |",
    ].join("\n");

    const result = parseMarkdownTable(md);
    expect(result).not.toBeNull();
    expect(result!.headers).toEqual(["Name", "Age"]);
    expect(result!.rows).toHaveLength(2);
    expect(result!.rows[0]).toEqual(["Alice", "30"]);
    expect(result!.rows[1]).toEqual(["Bob", "25"]);
  });

  it("should detect left alignment", () => {
    const md = ["| A |", "| :- |", "| x |"].join("\n");

    const result = parseMarkdownTable(md);
    expect(result).not.toBeNull();
    expect(result!.alignments).toEqual(["left"]);
  });

  it("should detect right alignment", () => {
    const md = ["| A |", "| -: |", "| x |"].join("\n");

    const result = parseMarkdownTable(md);
    expect(result).not.toBeNull();
    expect(result!.alignments).toEqual(["right"]);
  });

  it("should detect center alignment", () => {
    const md = ["| A |", "| :-: |", "| x |"].join("\n");

    const result = parseMarkdownTable(md);
    expect(result).not.toBeNull();
    expect(result!.alignments).toEqual(["center"]);
  });

  it("should detect mixed alignments", () => {
    const md = [
      "| Left | Center | Right | None |",
      "| :--- | :----: | ----: | ---- |",
      "| a    | b      | c     | d    |",
    ].join("\n");

    const result = parseMarkdownTable(md);
    expect(result).not.toBeNull();
    expect(result!.alignments).toEqual(["left", "center", "right", null]);
  });

  it("should return null for fewer than 2 lines", () => {
    expect(parseMarkdownTable("| A |")).toBeNull();
    expect(parseMarkdownTable("")).toBeNull();
  });

  it("should return null if lines don't start with |", () => {
    const md = ["A | B |", "| - | - |", "| 1 | 2 |"].join("\n");

    expect(parseMarkdownTable(md)).toBeNull();
  });

  it("should return null if lines don't end with |", () => {
    const md = ["| A | B", "| - | -", "| 1 | 2"].join("\n");

    expect(parseMarkdownTable(md)).toBeNull();
  });

  it("should return null if separator line is invalid", () => {
    const md = ["| A | B |", "| x | y |", "| 1 | 2 |"].join("\n");

    expect(parseMarkdownTable(md)).toBeNull();
  });

  it("should return null if column counts are inconsistent in separator", () => {
    const md = ["| A | B |", "| - | - | - |", "| 1 | 2 |"].join("\n");

    expect(parseMarkdownTable(md)).toBeNull();
  });

  it("should return null if column counts are inconsistent in rows", () => {
    const md = ["| A | B |", "| - | - |", "| 1 | 2 | 3 |"].join("\n");

    expect(parseMarkdownTable(md)).toBeNull();
  });

  it("should handle leading/trailing whitespace on lines", () => {
    const md = ["  | A | B |  ", "  | - | - |  ", "  | 1 | 2 |  "].join("\n");

    const result = parseMarkdownTable(md);
    expect(result).not.toBeNull();
    expect(result!.headers).toEqual(["A", "B"]);
  });

  it("should skip blank lines", () => {
    const md = ["| A | B |", "", "| - | - |", "", "| 1 | 2 |"].join("\n");

    // After trimming/filtering blank lines, this becomes exactly
    // | A | B | / | - | - | / | 1 | 2 | which is valid
    const result = parseMarkdownTable(md);
    expect(result).not.toBeNull();
    expect(result!.headers).toEqual(["A", "B"]);
    expect(result!.rows).toEqual([["1", "2"]]);
  });

  it("should parse a header-only table with no data rows", () => {
    const md = ["| A | B |", "| - | - |"].join("\n");

    const result = parseMarkdownTable(md);
    expect(result).not.toBeNull();
    expect(result!.headers).toEqual(["A", "B"]);
    expect(result!.rows).toEqual([]);
  });

  it("should handle cells with spaces and special characters", () => {
    const md = [
      "| Name | Description |",
      "| ---- | ----------- |",
      "| foo-bar | A *bold* item |",
    ].join("\n");

    const result = parseMarkdownTable(md);
    expect(result).not.toBeNull();
    expect(result!.rows[0]).toEqual(["foo-bar", "A *bold* item"]);
  });

  it("should handle empty cells", () => {
    const md = ["| A | B |", "| - | - |", "|   |   |"].join("\n");

    const result = parseMarkdownTable(md);
    expect(result).not.toBeNull();
    expect(result!.rows[0]).toEqual(["", ""]);
  });
});

describe("serializeTable", () => {
  it("should serialize a basic table", () => {
    const table: ParsedTable = {
      headers: ["A", "B"],
      alignments: [null, null],
      rows: [["1", "2"]],
    };

    const result = serializeTable(table);
    const lines = result.split("\n");
    expect(lines).toHaveLength(3);
    expect(lines[0]).toMatch(/^\| A\s+\| B\s+\|$/);
    expect(lines[1]).toMatch(/^\| -+\s*\| -+\s*\|$/);
    expect(lines[2]).toMatch(/^\| 1\s+\| 2\s+\|$/);
  });

  it("should pad columns to equal width", () => {
    const table: ParsedTable = {
      headers: ["Short", "Longer Header"],
      alignments: [null, null],
      rows: [["x", "y"]],
    };

    const result = serializeTable(table);
    const lines = result.split("\n");
    // All pipe separators should be vertically aligned
    const pipePositions = (line: string) =>
      [...line].reduce<number[]>(
        (acc, c, i) => (c === "|" ? [...acc, i] : acc),
        [],
      );
    const headerPipes = pipePositions(lines[0]);
    const sepPipes = pipePositions(lines[1]);
    const rowPipes = pipePositions(lines[2]);
    expect(headerPipes).toEqual(sepPipes);
    expect(headerPipes).toEqual(rowPipes);
  });

  it("should render alignment markers in separator", () => {
    const table: ParsedTable = {
      headers: ["Left", "Center", "Right", "None"],
      alignments: ["left", "center", "right", null],
      rows: [["a", "b", "c", "d"]],
    };

    const result = serializeTable(table);
    const sepLine = result.split("\n")[1];
    const cells = sepLine
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());

    expect(cells[0]).toMatch(/^:-+$/); // left: starts with :
    expect(cells[1]).toMatch(/^:-+:$/); // center: starts and ends with :
    expect(cells[2]).toMatch(/^-+:$/); // right: ends with :
    expect(cells[3]).toMatch(/^-+$/); // none: only dashes
  });

  it("should enforce minimum column width of 3", () => {
    const table: ParsedTable = {
      headers: ["A"],
      alignments: [null],
      rows: [["B"]],
    };

    const result = serializeTable(table);
    const sepLine = result.split("\n")[1];
    const cell = sepLine.replace(/^\|/, "").replace(/\|$/, "").trim();
    expect(cell.length).toBeGreaterThanOrEqual(3);
  });

  it("should handle empty rows gracefully", () => {
    const table: ParsedTable = {
      headers: ["X"],
      alignments: [null],
      rows: [],
    };

    const result = serializeTable(table);
    const lines = result.split("\n");
    expect(lines).toHaveLength(2); // header + separator only
  });

  it("should right-align cell content when alignment is right", () => {
    const table: ParsedTable = {
      headers: ["Num"],
      alignments: ["right"],
      rows: [["42"]],
    };

    const result = serializeTable(table);
    const rowLine = result.split("\n")[2];
    // Content should be right-padded (spaces before the number)
    const cell = rowLine.replace(/^\|/, "").replace(/\|$/, "");
    expect(cell.trimEnd()).toMatch(/\s+42$/);
  });

  it("should roundtrip: parse then serialize produces valid re-parseable markdown", () => {
    const original = [
      "| Name  | Age |",
      "| ----- | --- |",
      "| Alice | 30  |",
      "| Bob   | 25  |",
    ].join("\n");

    const parsed = parseMarkdownTable(original);
    expect(parsed).not.toBeNull();

    const serialized = serializeTable(parsed!);
    const reparsed = parseMarkdownTable(serialized);
    expect(reparsed).not.toBeNull();
    expect(reparsed!.headers).toEqual(parsed!.headers);
    expect(reparsed!.rows).toEqual(parsed!.rows);
    expect(reparsed!.alignments).toEqual(parsed!.alignments);
  });
});
