export type ArticleStatus = "draft" | "published" | "archived";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown
  coverImage: string;
  tags: string[];
  status: ArticleStatus;
  readTime: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

/** Lightweight article metadata for feed/listing — no content field. */
export type ArticleIndex = Omit<Article, "content">;
