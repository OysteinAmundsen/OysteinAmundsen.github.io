/**
 * Generates data/articles-index.json — a lightweight metadata-only version
 * of articles.json (no content field) for use in the feed/listing page.
 *
 * Run: node tools/generate-article-index.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const articlesPath = resolve(__dirname, "../data/articles.json");
const indexPath = resolve(__dirname, "../data/articles-index.json");

const articles = JSON.parse(readFileSync(articlesPath, "utf-8"));

const index = articles.map(({ content, ...meta }) => meta);

writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n");
console.log(
  `Generated ${indexPath} (${index.length} articles, no content field)`,
);
