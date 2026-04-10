import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from "@angular/ssr/node";
import express from "express";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { apiRouter } from "./api.routes";

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, "../browser");
const publicFolder = resolve(process.cwd(), "apps/blog/public");

const app = express();
const angularApp = new AngularNodeAppEngine();

// ── Admin API (local dev only) ─────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use("/api", apiRouter);

// ── Static files ───────────────────────────────────────────
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
