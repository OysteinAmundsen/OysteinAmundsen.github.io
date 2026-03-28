import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/feed/feed.component").then((m) => m.FeedComponent),
  },
  {
    path: "article/:slug",
    loadComponent: () =>
      import("./pages/article/article.component").then(
        (m) => m.ArticleComponent,
      ),
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./pages/admin/admin-layout.component").then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./pages/admin/articles/admin-articles.component").then(
            (m) => m.AdminArticlesComponent,
          ),
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import("./pages/admin/editor/admin-editor.component").then(
            (m) => m.AdminEditorComponent,
          ),
      },
      {
        path: "new",
        loadComponent: () =>
          import("./pages/admin/editor/admin-editor.component").then(
            (m) => m.AdminEditorComponent,
          ),
      },
    ],
  },
];
