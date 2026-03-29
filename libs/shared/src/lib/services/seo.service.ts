import { DOCUMENT } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Article } from "../models/article.model";

const SITE_NAME = "OysteinAmundsen";
const SITE_URL = "https://oysteinamundsen.github.io";
const DEFAULT_DESCRIPTION =
  "Transmissions on frontend engineering, system architectures, and high-performance web design.";

export interface PageMeta {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

@Injectable({ providedIn: "root" })
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private document = inject(DOCUMENT);

  setPageMeta(options: PageMeta): void {
    const fullTitle = options.title
      ? `${options.title} | ${SITE_NAME}`
      : SITE_NAME;
    const description = options.description ?? DEFAULT_DESCRIPTION;
    const url = options.url ? `${SITE_URL}${options.url}` : SITE_URL;
    const type = options.type ?? "website";

    // Clean up previous article-specific meta & structured data
    this.removeArticleMeta();
    this.removeJsonLd();

    this.titleService.setTitle(fullTitle);
    this.meta.updateTag({ name: "description", content: description });

    // Open Graph
    this.meta.updateTag({ property: "og:title", content: fullTitle });
    this.meta.updateTag({ property: "og:description", content: description });
    this.meta.updateTag({ property: "og:url", content: url });
    this.meta.updateTag({ property: "og:type", content: type });
    this.meta.updateTag({ property: "og:site_name", content: SITE_NAME });

    if (options.image) {
      const imageUrl = options.image.startsWith("http")
        ? options.image
        : `${SITE_URL}${options.image}`;
      this.meta.updateTag({ property: "og:image", content: imageUrl });
      this.meta.updateTag({ name: "twitter:image", content: imageUrl });
    } else {
      this.meta.removeTag("property='og:image'");
      this.meta.removeTag("name='twitter:image'");
    }

    // Twitter Card
    this.meta.updateTag({
      name: "twitter:card",
      content: options.image ? "summary_large_image" : "summary",
    });
    this.meta.updateTag({ name: "twitter:title", content: fullTitle });
    this.meta.updateTag({
      name: "twitter:description",
      content: description,
    });

    // Canonical URL
    this.updateCanonical(url);
  }

  setArticleMeta(article: Article): void {
    this.setPageMeta({
      title: article.title,
      description: article.excerpt,
      url: `/article/${article.slug}`,
      image: article.coverImage,
      type: "article",
    });

    // Article-specific Open Graph
    if (article.publishedAt) {
      this.meta.updateTag({
        property: "article:published_time",
        content: article.publishedAt,
      });
    }
    if (article.updatedAt) {
      this.meta.updateTag({
        property: "article:modified_time",
        content: article.updatedAt,
      });
    }
    this.meta.updateTag({
      property: "article:author",
      content: article.author,
    });
    article.tags.forEach((tag) => {
      this.meta.addTag({ property: "article:tag", content: tag });
    });

    // JSON-LD structured data
    this.setJsonLd({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      image: article.coverImage
        ? article.coverImage.startsWith("http")
          ? article.coverImage
          : `${SITE_URL}${article.coverImage}`
        : undefined,
      author: { "@type": "Person", name: article.author },
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      url: `${SITE_URL}/article/${article.slug}`,
      publisher: { "@type": "Organization", name: SITE_NAME },
      keywords: article.tags.join(", "),
    });
  }

  private updateCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>(
      "link[rel='canonical']",
    );
    if (!link) {
      link = this.document.createElement("link");
      link.setAttribute("rel", "canonical");
      this.document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }

  private setJsonLd(schema: Record<string, unknown>): void {
    this.removeJsonLd();
    const script = this.document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  private removeJsonLd(): void {
    this.document.querySelector("script[type='application/ld+json']")?.remove();
  }

  private removeArticleMeta(): void {
    [
      "article:published_time",
      "article:modified_time",
      "article:author",
      "article:tag",
    ].forEach((prop) => {
      this.document
        .querySelectorAll(`meta[property="${prop}"]`)
        .forEach((el) => el.remove());
    });
  }
}
