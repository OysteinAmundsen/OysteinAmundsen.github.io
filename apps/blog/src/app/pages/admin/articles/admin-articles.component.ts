import { Component, computed, effect, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Article, ArticleService, ArticleStatus } from "@blog/shared";
import type { ColumnConfig, GridConfig } from "@toolbox-web/grid-angular";
import { Grid } from "@toolbox-web/grid-angular";
import "@toolbox-web/grid-angular/features/filtering";
import { injectGridFiltering } from "@toolbox-web/grid-angular/features/filtering";
import "@toolbox-web/grid-angular/features/pinned-rows";

@Component({
  selector: "app-admin-articles",
  imports: [Grid],
  templateUrl: "./admin-articles.component.html",
  styleUrl: "./admin-articles.component.scss",
})
export class AdminArticlesComponent {
  private articleService = inject(ArticleService);
  private router = inject(Router);
  private filtering = injectGridFiltering();

  private allArticles = signal<Article[]>([]);
  readonly statusFilter = signal<ArticleStatus | "all">("all");
  readonly searchQuery = signal("");

  readonly articles = computed(() => {
    let results = this.allArticles();
    const query = this.searchQuery().toLowerCase();
    if (query) {
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.id.toLowerCase().includes(query) ||
          a.author.toLowerCase().includes(query),
      );
    }
    return results;
  });

  readonly totalCount = computed(() => this.allArticles().length);
  readonly publishedCount = computed(
    () => this.allArticles().filter((a) => a.status === "published").length,
  );
  readonly draftCount = computed(
    () => this.allArticles().filter((a) => a.status === "draft").length,
  );
  readonly archivedCount = computed(
    () => this.allArticles().filter((a) => a.status === "archived").length,
  );

  columns: ColumnConfig<Article>[] = [
    {
      field: "title",
      header: "Article Title",
      sortable: true,
      filterable: true,
      renderer: (ctx) => {
        const row = ctx.row as Article;
        const wrapper = document.createElement("div");
        wrapper.className = "cell-article-title";

        if (row.coverImage) {
          const img = document.createElement("img");
          img.className = "cell-article-thumb";
          img.src = row.coverImage;
          img.alt = "";
          wrapper.appendChild(img);
        } else {
          const placeholder = document.createElement("div");
          placeholder.className = "cell-article-thumb-placeholder";
          wrapper.appendChild(placeholder);
        }

        const info = document.createElement("div");
        info.className = "cell-article-info";

        const title = document.createElement("span");
        title.className = "cell-title-text";
        title.textContent = row.title;
        info.appendChild(title);

        const id = document.createElement("span");
        id.className = "cell-article-id";
        id.textContent = `ID: #${row.id}`;
        info.appendChild(id);

        wrapper.appendChild(info);
        return wrapper;
      },
    },
    {
      field: "status",
      header: "Status",
      width: 120,
      sortable: true,
      filterable: true,
      renderer: (ctx) => {
        const span = document.createElement("span");
        span.className = `status-badge status-${ctx.value}`;
        span.textContent =
          (ctx.value as string).charAt(0).toUpperCase() +
          (ctx.value as string).slice(1);
        return span;
      },
    },
    {
      field: "createdAt",
      header: "Created",
      width: 130,
      sortable: true,
      format: (value) =>
        value ? new Date(value).toISOString().slice(0, 10) : "—",
    },
    {
      field: "updatedAt",
      header: "Modified",
      width: 120,
      sortable: true,
      format: (value) => {
        const date = new Date(value);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffH = Math.floor(diffMs / 3600000);
        if (diffH < 1) return "Just now";
        if (diffH < 24) return `${diffH}h ago`;
        const diffD = Math.floor(diffH / 24);
        return `${diffD}d ago`;
      },
    },
    {
      field: "id",
      header: "Operations",
      width: 120,
      sortable: false,
      renderer: (ctx) => {
        const container = document.createElement("div");
        container.className = "cell-operations";

        const editBtn = document.createElement("button");
        editBtn.className = "op-btn";
        editBtn.title = "Edit";
        editBtn.innerHTML = '<span class="material-icons">edit</span>';
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.onRowClick({ row: ctx.row as Article });
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "op-btn op-btn--danger";
        deleteBtn.title = "Delete";
        deleteBtn.innerHTML = '<span class="material-icons">delete</span>';
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.deleteArticle(ctx.row as Article);
        });

        container.appendChild(editBtn);
        container.appendChild(deleteBtn);
        return container;
      },
    },
  ];

  gridConfig: GridConfig<Article> = {
    columns: this.columns,
    icons: {
      filter: '<span class="material-symbols-outlined">filter_alt</span>',
      filterActive: '<span class="material-symbols-outlined">filter_alt</span>',
    },
    features: {
      filtering: true,
      pinnedRows: {
        showRowCount: true,
        showFilteredCount: true,
      },
    },
  };

  constructor() {
    this.loadArticles();

    effect(() => {
      const status = this.statusFilter();
      if (!this.filtering.isReady()) return;

      if (status === "all") {
        this.filtering.clearFieldFilter("status");
      } else {
        this.filtering.setFilter("status", {
          type: "text",
          operator: "equals",
          value: status,
        });
      }
    });
  }

  loadArticles() {
    this.articleService.getAllArticles().subscribe((articles) => {
      this.allArticles.set(articles);
    });
  }

  onRowClick(detail: { row: Article }) {
    this.router.navigate(["/admin/edit", detail.row.id]);
  }

  newArticle() {
    this.router.navigate(["/admin/new"]);
  }

  deleteArticle(article: Article) {
    if (confirm(`Delete "${article.title}"?`)) {
      this.articleService.deleteArticle(article.id).subscribe(() => {
        this.loadArticles();
      });
    }
  }

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  cycleStatusFilter() {
    const order: (ArticleStatus | "all")[] = [
      "all",
      "published",
      "draft",
      "archived",
    ];
    const current = this.statusFilter();
    const next = order[(order.indexOf(current) + 1) % order.length];
    this.statusFilter.set(next);
  }

  readonly statusFilterLabel = computed(() => {
    const s = this.statusFilter();
    return s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1);
  });
}
