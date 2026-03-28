import { RenderMode, ServerRoute } from "@angular/ssr";
import articles from "../../../../data/articles.json";

export const serverRoutes: ServerRoute[] = [
  {
    path: "",
    renderMode: RenderMode.Prerender,
  },
  {
    path: "article/:slug",
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return (articles as { slug: string; status: string }[])
        .filter((a) => a.status === "published")
        .map((a) => ({ slug: a.slug }));
    },
  },
  {
    path: "admin/**",
    renderMode: RenderMode.Client,
  },
];
