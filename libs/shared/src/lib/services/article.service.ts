import { HttpClient } from "@angular/common/http";
import { Injectable, inject, isDevMode } from "@angular/core";
import { Observable, map } from "rxjs";
import { Article, ArticleIndex } from "../models/article.model";

/**
 * In dev (`nx serve`), drafts are visible alongside published articles so
 * authors can preview unpublished content on localhost. Production builds
 * (deployed to GitHub Pages) keep drafts hidden — only `status === "published"`
 * articles are listed or resolvable by slug.
 */
function isVisible(status: string): boolean {
  return status === "published" || isDevMode();
}

@Injectable({ providedIn: "root" })
export class ArticleService {
  private http = inject(HttpClient);

  /** Lightweight index for feed/listing — no content field. */
  getPublishedIndex(): Observable<ArticleIndex[]> {
    return this.http
      .get<ArticleIndex[]>("/data/articles-index.json")
      .pipe(map((articles) => articles.filter((a) => isVisible(a.status))));
  }

  getPublishedArticles(): Observable<Article[]> {
    return this.http
      .get<Article[]>("/data/articles.json")
      .pipe(map((articles) => articles.filter((a) => isVisible(a.status))));
  }

  getArticleBySlug(slug: string): Observable<Article | undefined> {
    return this.http
      .get<Article[]>("/data/articles.json")
      .pipe(
        map((articles) =>
          articles.find((a) => a.slug === slug && isVisible(a.status)),
        ),
      );
  }

  /** Admin-only: returns all articles via the local dev API */
  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("/api/articles");
  }

  saveArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`/api/articles/${article.id}`, article);
  }

  createArticle(article: Omit<Article, "id">): Observable<Article> {
    return this.http.post<Article>("/api/articles", article);
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`/api/articles/${id}`);
  }

  commitAndPush(
    message: string,
  ): Observable<{ committed: boolean; message: string }> {
    return this.http.post<{ committed: boolean; message: string }>(
      "/api/git/commit-and-push",
      { message },
    );
  }

  uploadImage(file: File): Observable<{ url: string }> {
    return new Observable((subscriber) => {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result as string;
        this.http
          .post<{ url: string }>("/api/upload-image", {
            filename: file.name,
            data,
          })
          .subscribe(subscriber);
      };
      reader.onerror = () => subscriber.error(reader.error);
      reader.readAsDataURL(file);
    });
  }
}
