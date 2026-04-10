export interface ParsedTable {
  headers: string[];
  alignments: ("left" | "center" | "right" | null)[];
  rows: string[][];
}

/** DOM element augmented with mutable table-position data. */
export interface TableDOMElement extends HTMLElement {
  _tableFrom: number;
  _tableTo: number;
  _tableAlignments: ParsedTable["alignments"];
}
