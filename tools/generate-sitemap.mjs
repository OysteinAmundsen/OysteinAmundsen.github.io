/**
 * Generates a sitemap index with chunked sitemaps from published articles.
 *
 * Output:
 *   apps/blog/public/sitemap-index.xml  (index pointing to chunks)
 *   apps/blog/public/sitemap_0.xml      (first ≤ MAX_URLS_PER_SITEMAP URLs)
 *   apps/blog/public/sitemap_1.xml      (next chunk, if needed)
 *   …
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
const MAX_URLS_PER_SITEMAP = 5000;

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

// Remove old sitemap chunk files
for (const file of readdirSync(publicDir)) {
  if (/^sitemap(_\d+)?\.xml$/.test(file)) {
    unlinkSync(resolve(publicDir, file));
  }
}

// Split URLs into chunks and write each as sitemap_N.xml
const chunks = [];
for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
  chunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
}

const now = new Date().toISOString().split("T")[0];

for (let i = 0; i < chunks.length; i++) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks[i]
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
  writeFileSync(resolve(publicDir, `sitemap_${i}.xml`), xml);
}

// Write sitemap index
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks
  .map(
    (_, i) => `  <sitemap>
    <loc>${SITE_URL}/sitemap_${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;
writeFileSync(resolve(publicDir, "sitemap-index.xml"), indexXml);

console.log(
  `Generated sitemap-index.xml → ${chunks.length} chunk(s) (${urls.length} URLs: 1 homepage + ${published.length} articles)`,
);
