import { DatePipe, NgOptimizedImage } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { ArticleIndex, ArticleService, SeoService } from "@blog/shared";

const PAGE_SIZE = 12;

@Component({
  selector: "app-feed",
  imports: [DatePipe, NgOptimizedImage],
  templateUrl: "./feed.component.html",
  styleUrl: "./feed.component.scss",
})
export class FeedComponent {
  private articleService = inject(ArticleService);
  private seoService = inject(SeoService);

  readonly articles = signal<ArticleIndex[]>([]);
  readonly activeTag = signal("");
  readonly searchQuery = signal("");
  readonly page = signal(1);

  readonly allTags = computed(() => {
    const tagSet = new Set<string>();
    this.articles().forEach((a) => a.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  });

  readonly filteredArticles = computed(() => {
    const tag = this.activeTag();
    const query = this.searchQuery().toLowerCase().trim();
    let results = this.articles();

    if (tag) {
      results = results.filter((a) => a.tags.includes(tag));
    }
    if (query) {
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.tags.some((t) => t.toLowerCase().includes(query)),
      );
    }
    return results;
  });

  readonly pagedArticles = computed(() =>
    this.filteredArticles().slice(0, this.page() * PAGE_SIZE),
  );

  readonly hasMore = computed(
    () => this.pagedArticles().length < this.filteredArticles().length,
  );

  constructor() {
    this.seoService.setPageMeta({ url: "/" });

    this.articleService.getPublishedIndex().subscribe((articles) => {
      this.articles.set(
        articles.sort(
          (a, b) =>
            new Date(b.publishedAt ?? b.createdAt).getTime() -
            new Date(a.publishedAt ?? a.createdAt).getTime(),
        ),
      );
    });
  }

  filterByTag(tag: string) {
    this.activeTag.set(this.activeTag() === tag ? "" : tag);
    this.page.set(1);
  }

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.page.set(1);
  }

  loadMore() {
    this.page.update((p) => p + 1);
  }
}
