import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from "@angular/ssr/node";
import express from "express";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, "../browser");

const app = express();
const angularApp = new AngularNodeAppEngine();

// ── Admin API routes (local dev only) ──────────────────────
const dataFile = resolve(process.cwd(), "data/articles.json");
const indexFile = resolve(process.cwd(), "data/articles-index.json");

function readArticles() {
  if (!existsSync(dataFile)) {
    return [];
  }
  return JSON.parse(readFileSync(dataFile, "utf-8"));
}

function writeArticles(articles: unknown[]) {
  writeFileSync(dataFile, JSON.stringify(articles, null, 2), "utf-8");
  // Regenerate the lightweight index (strips the content field)
  const index = (articles as Record<string, unknown>[]).map(
    ({ content, ...meta }) => meta,
  );
  writeFileSync(indexFile, JSON.stringify(index, null, 2) + "\n", "utf-8");
}

app.use(express.json({ limit: "10mb" }));

app.get("/api/articles", (_req, res) => {
  res.json(readArticles());
});

app.post("/api/articles", (req, res) => {
  const articles = readArticles();
  const now = new Date().toISOString();
  const id = `art-${Date.now()}`;
  const article = { ...req.body, id, createdAt: now, updatedAt: now };
  articles.push(article);
  writeArticles(articles);
  res.status(201).json(article);
});

app.put("/api/articles/:id", (req, res) => {
  const articles = readArticles();
  const idx = articles.findIndex(
    (a: { id: string }) => a.id === req.params["id"],
  );
  if (idx === -1) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  articles[idx] = {
    ...articles[idx],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  writeArticles(articles);
  res.json(articles[idx]);
});

app.delete("/api/articles/:id", (req, res) => {
  let articles = readArticles();
  articles = articles.filter((a: { id: string }) => a.id !== req.params["id"]);
  writeArticles(articles);
  res.status(204).end();
});

// ── Image upload (local dev only) ──────────────────────────
const publicFolder = resolve(process.cwd(), "apps/blog/public");
const imageDir = resolve(publicFolder, "images/articles");

app.post("/api/upload-image", (req, res) => {
  const { filename, data } = req.body as { filename?: string; data?: string };
  if (!filename || !data) {
    res.status(400).json({ error: "filename and data are required" });
    return;
  }

  // Validate and sanitise the filename
  const ext = extname(filename).toLowerCase();
  const allowedExts = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"];
  if (!allowedExts.includes(ext)) {
    res.status(400).json({ error: `Unsupported image type: ${ext}` });
    return;
  }

  const safeName = basename(filename)
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .toLowerCase();
  const uniqueName = `${Date.now()}-${safeName}`;

  // Ensure directory exists
  mkdirSync(imageDir, { recursive: true });

  // Strip data-URL prefix if present and write binary
  const base64 = data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");
  const destPath = resolve(imageDir, uniqueName);

  // Verify resolved path is inside imageDir (path-traversal guard)
  if (!destPath.startsWith(imageDir)) {
    res.status(400).json({ error: "Invalid filename" });
    return;
  }

  writeFileSync(destPath, buffer);
  res.status(201).json({ url: `/images/articles/${uniqueName}` });
});

// ── Static files ───────────────────────────────────────────
// Serve uploaded images from the source public folder (dev)
app.use(
  express.static(publicFolder, {
    maxAge: 0,
    index: false,
    redirect: false,
  }),
);
app.use(
  express.static(browserDistFolder, {
    maxAge: "1y",
    index: false,
    redirect: false,
  }),
);

// ── Angular SSR ────────────────────────────────────────────
app.use("/**", (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env["PORT"] || 4200;
  app.listen(port, () => {
    console.log(`Blog server listening on http://localhost:${port}`);
    console.log(`Admin panel: http://localhost:${port}/admin`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
