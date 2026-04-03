import { DatePipe, UpperCasePipe } from "@angular/common";
import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";
import { Article, ArticleService, SeoService, marked } from "@blog/shared";
import { GiscusComponent } from "./giscus.component";

@Component({
  selector: "app-article",
  imports: [DatePipe, UpperCasePipe, GiscusComponent],
  templateUrl: "./article.component.html",
  styleUrl: "./article.component.scss",
})
export class ArticleComponent {
  private articleService = inject(ArticleService);
  private seoService = inject(SeoService);

  readonly slug = input.required<string>();
  readonly article = signal<Article | null>(null);
  readonly renderedContent = computed(() => {
    const a = this.article();
    return a ? (marked.parse(a.content) as string) : "";
  });

  constructor() {
    effect(() => {
      const slug = this.slug();
      if (slug) {
        this.articleService.getArticleBySlug(slug).subscribe((article) => {
          if (article) {
            this.article.set(article);
            this.seoService.setArticleMeta(article);
          }
        });
      }
    });
  }
}
