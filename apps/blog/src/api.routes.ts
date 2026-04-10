import { Router } from "express";
import { execSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { basename, extname, resolve } from "node:path";

const dataFile = resolve(process.cwd(), "data/articles.json");
const indexFile = resolve(process.cwd(), "data/articles-index.json");
const publicFolder = resolve(process.cwd(), "apps/blog/public");
const imageDir = resolve(publicFolder, "images/articles");

// ── Data helpers ───────────────────────────────────────────

function readArticles() {
  if (!existsSync(dataFile)) {
    return [];
  }
  return JSON.parse(readFileSync(dataFile, "utf-8"));
}

function writeArticles(articles: unknown[]) {
  writeFileSync(dataFile, JSON.stringify(articles, null, 2), "utf-8");
  const index = (articles as Record<string, unknown>[]).map(
    ({ content, ...meta }) => meta,
  );
  writeFileSync(indexFile, JSON.stringify(index, null, 2) + "\n", "utf-8");
}

/** Remove images in imageDir that are not referenced by any article. */
function cleanupOrphanedImages() {
  if (!existsSync(imageDir)) return [];
  const articles = readArticles() as {
    coverImage?: string;
    content?: string;
  }[];
  const referenced = new Set<string>();
  const imgPattern = /\/images\/articles\/([^\s"')]+)/g;
  for (const article of articles) {
    if (article.coverImage) {
      for (const m of article.coverImage.matchAll(imgPattern))
        referenced.add(m[1]);
    }
    if (article.content) {
      for (const m of article.content.matchAll(imgPattern))
        referenced.add(m[1]);
    }
  }
  const removed: string[] = [];
  for (const file of readdirSync(imageDir)) {
    if (!referenced.has(file)) {
      unlinkSync(resolve(imageDir, file));
      removed.push(file);
    }
  }
  return removed;
}

// ── Routes ─────────────────────────────────────────────────

export const apiRouter = Router();

apiRouter.get("/articles", (_req, res) => {
  res.json(readArticles());
});

apiRouter.post("/articles", (req, res) => {
  const articles = readArticles();
  const now = new Date().toISOString();
  const id = `art-${Date.now()}`;
  const article = { ...req.body, id, createdAt: now, updatedAt: now };
  articles.push(article);
  writeArticles(articles);
  res.status(201).json(article);
});

apiRouter.put("/articles/:id", (req, res) => {
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

apiRouter.delete("/articles/:id", (req, res) => {
  let articles = readArticles();
  articles = articles.filter((a: { id: string }) => a.id !== req.params["id"]);
  writeArticles(articles);
  res.status(204).end();
});

apiRouter.post("/upload-image", (req, res) => {
  const { filename, data } = req.body as { filename?: string; data?: string };
  if (!filename || !data) {
    res.status(400).json({ error: "filename and data are required" });
    return;
  }

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

  mkdirSync(imageDir, { recursive: true });

  const base64 = data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");
  const destPath = resolve(imageDir, uniqueName);

  if (!destPath.startsWith(imageDir)) {
    res.status(400).json({ error: "Invalid filename" });
    return;
  }

  writeFileSync(destPath, buffer);
  cleanupOrphanedImages();
  res.status(201).json({ url: `/images/articles/${uniqueName}` });
});

apiRouter.post("/git/commit-and-push", (req, res) => {
  const { message } = req.body as { message?: string };
  if (!message) {
    res.status(400).json({ error: "commit message is required" });
    return;
  }

  const cwd = process.cwd();
  try {
    execSync("git add data/ apps/blog/public/images/articles/", {
      cwd,
      stdio: "pipe",
    });

    // Check if there are staged changes
    const status = execSync("git diff --cached --stat", {
      cwd,
      encoding: "utf-8",
    }).trim();
    if (!status) {
      res.json({ committed: false, message: "No changes to commit" });
      return;
    }

    execSync(`git commit -m ${JSON.stringify(message)}`, {
      cwd,
      stdio: "pipe",
    });
    execSync("git push", { cwd, stdio: "pipe" });

    res.json({ committed: true, message: "Changes committed and pushed" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: `Git operation failed: ${msg}` });
  }
});
