/**
 * Generates a single sitemap.xml from published articles.
 *
 * Output:
 *   apps/blog/public/sitemap.xml
 *
 * Run: node tools/generate-sitemap.mjs
 */
import { readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const articlesPath = resolve(__dirname, "../data/articles.json");
const publicDir = resolve(__dirname, "../apps/blog/public");

const SITE_URL = "https://oysteinamundsen.github.io";

const articles = JSON.parse(readFileSync(articlesPath, "utf-8"));
const published = articles.filter((a) => a.status === "published");

const urls = [
  {
    loc: SITE_URL,
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "weekly",
    priority: "1.0",
  },
  ...published.map((a) => ({
    loc: `${SITE_URL}/article/${a.slug}`,
    lastmod: (a.updatedAt || a.publishedAt || new Date().toISOString()).split(
      "T",
    )[0],
    changefreq: "monthly",
    priority: "0.8",
  })),
];

// Remove old sitemap files
for (const file of readdirSync(publicDir)) {
  if (/^sitemap[_-]?\w*\.xml$/.test(file)) {
    unlinkSync(resolve(publicDir, file));
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(resolve(publicDir, "sitemap.xml"), xml);

console.log(
  `Generated sitemap.xml (${urls.length} URLs: 1 homepage + ${published.length} articles)`,
);
