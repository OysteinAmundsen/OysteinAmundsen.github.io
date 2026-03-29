import { NgOptimizedImage } from "@angular/common";
import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
import { Router } from "@angular/router";
import { Article, ArticleService, ArticleStatus } from "@blog/shared";
import { MilkdownEditorComponent } from "./milkdown-editor.component";

const WORDS_PER_MINUTE = 200;
const EXCERPT_MAX_LENGTH = 200;

interface ArticleFormModel {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: string;
  author: string;
}

@Component({
  selector: "app-admin-editor",
  imports: [FormField, NgOptimizedImage, MilkdownEditorComponent],
  templateUrl: "./admin-editor.component.html",
  styleUrl: "./admin-editor.component.scss",
})
export class AdminEditorComponent {
  private articleService = inject(ArticleService);
  private router = inject(Router);

  readonly id = input<string>();
  readonly isNew = computed(() => !this.id());

  readonly formModel = signal<ArticleFormModel>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    status: "draft",
    author: "Øystein Amundsen",
  });

  readonly articleForm = form(this.formModel);
  readonly tags = signal<string[]>([]);

  // Auto-calculated read time
  readonly readTime = computed(() => {
    const words = this.formModel()
      .content.trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
    return `${minutes} min`;
  });

  // Auto-generated excerpt from first paragraph
  readonly autoExcerpt = computed(() => {
    const content = this.formModel().content;
    if (!content) return "";
    // Find first non-empty, non-heading paragraph
    const lines = content.split("\n");
    let paragraph = "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("```"))
        continue;
      paragraph = trimmed;
      break;
    }
    // Strip markdown formatting
    const plain = paragraph
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1");
    return plain.length > EXCERPT_MAX_LENGTH
      ? plain.slice(0, EXCERPT_MAX_LENGTH).replace(/\s\S*$/, "") + "…"
      : plain;
  });

  // Auto-generated slug from title
  readonly autoSlug = computed(() => {
    const title = this.formModel().title;
    if (!title) return "";
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  });

  readonly uploading = signal(false);
  readonly suggestedTags = signal<string[]>([]);
  readonly suggestingTags = signal(false);
  readonly generatingExcerpt = signal(false);
  protected readonly excerptOverridden = signal(false);

  private originalArticle = signal<Article | null>(null);

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        this.articleService.getAllArticles().subscribe((articles) => {
          const found = articles.find((a) => a.id === id);
          if (found) {
            this.originalArticle.set(found);
            this.formModel.set({
              title: found.title,
              slug: found.slug,
              excerpt: found.excerpt,
              content: found.content,
              coverImage: found.coverImage,
              status: found.status,
              author: found.author,
            });
            this.tags.set([...found.tags]);
            // If article had a custom excerpt, mark as overridden
            if (found.excerpt) {
              this.excerptOverridden.set(true);
            }
          }
        });
      }
    });

    // Sync auto-excerpt into form when not overridden
    effect(() => {
      const excerpt = this.autoExcerpt();
      if (!this.excerptOverridden()) {
        this.articleForm.excerpt().value.set(excerpt);
      }
    });
  }

  onContentChange(markdown: string) {
    this.articleForm.content().value.set(markdown);
  }

  // Excerpt override management
  onExcerptInput() {
    const current = this.formModel().excerpt;
    this.excerptOverridden.set(current.length > 0);
  }

  async generateExcerpt() {
    const content = this.formModel().content;
    if (!content.trim()) return;

    if (!("Summarizer" in window)) {
      // Fallback: use auto-excerpt from first paragraph
      this.excerptOverridden.set(false);
      return;
    }

    this.generatingExcerpt.set(true);
    try {
      const summarizer = await (window as any).Summarizer.create({
        type: "teaser",
        format: "plain-text",
        length: "short",
        outputLanguage: "en",
      });
      const result = await summarizer.summarize(content);
      summarizer.destroy?.();
      if (result?.trim()) {
        this.articleForm.excerpt().value.set(result.trim());
        this.excerptOverridden.set(true);
      }
    } catch {
      // Fallback to auto-excerpt
      this.excerptOverridden.set(false);
    } finally {
      this.generatingExcerpt.set(false);
    }
  }

  addTag(input: HTMLInputElement) {
    const tag = input.value.trim();
    if (tag && !this.tags().includes(tag)) {
      this.tags.update((tags) => [...tags, tag]);
    }
    input.value = "";
  }

  removeTag(tag: string) {
    this.tags.update((tags) => tags.filter((t) => t !== tag));
  }

  addSuggestedTag(tag: string) {
    if (!this.tags().includes(tag)) {
      this.tags.update((tags) => [...tags, tag]);
    }
    this.suggestedTags.update((tags) => tags.filter((t) => t !== tag));
  }

  // AI-powered tag suggestions using Chrome's built-in Summarizer API
  async suggestTags() {
    const content = this.formModel().content;
    if (!content.trim()) return;

    // Check for Summarizer API availability
    if (!("Summarizer" in window)) {
      this.fallbackTagSuggestion(content);
      return;
    }

    this.suggestingTags.set(true);
    try {
      const summarizer = await (window as any).Summarizer.create({
        type: "key-points",
        format: "plain-text",
        length: "short",
        outputLanguage: "en",
      });
      const result = await summarizer.summarize(content, {
        context:
          "Extract 3-5 single-word or two-word topic tags for this technical article. Return only the tags.",
      });
      summarizer.destroy?.();
      const tags = this.parseTagsFromAI(result);
      this.suggestedTags.set(tags.filter((t) => !this.tags().includes(t)));
    } catch {
      this.fallbackTagSuggestion(content);
    } finally {
      this.suggestingTags.set(false);
    }
  }

  private fallbackTagSuggestion(content: string) {
    // Simple keyword frequency extraction as fallback
    const words = content
      .toLowerCase()
      .replace(/[^a-z\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 4);
    const freq = new Map<string, number>();
    const stopwords = new Set([
      "about",
      "above",
      "after",
      "again",
      "which",
      "while",
      "where",
      "their",
      "there",
      "these",
      "those",
      "could",
      "would",
      "should",
      "other",
      "being",
      "every",
      "using",
      "between",
      "through",
      "before",
      "during",
      "without",
    ]);
    for (const w of words) {
      if (!stopwords.has(w)) {
        freq.set(w, (freq.get(w) ?? 0) + 1);
      }
    }
    const sorted = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([w]) => w);
    this.suggestedTags.set(sorted.filter((t) => !this.tags().includes(t)));
  }

  private parseTagsFromAI(text: string): string[] {
    return text
      .split(/[\n,•\-]+/)
      .map((t) =>
        t
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, ""),
      )
      .filter((t) => t.length > 1 && t.length < 30)
      .slice(0, 5);
  }

  private buildArticle(): Article {
    const formData = this.formModel();
    const orig = this.originalArticle();
    return {
      id: orig?.id ?? "",
      ...formData,
      slug: this.autoSlug(),
      readTime: this.readTime(),
      status: formData.status as ArticleStatus,
      tags: this.tags(),
      createdAt: orig?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: orig?.publishedAt ?? null,
    };
  }

  save() {
    const article = this.buildArticle();
    if (this.isNew()) {
      this.articleService.createArticle(article).subscribe(() => {
        this.router.navigate(["/admin"]);
      });
    } else {
      this.articleService.saveArticle(article).subscribe(() => {
        this.router.navigate(["/admin"]);
      });
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.uploading.set(true);
    this.articleService.uploadImage(file).subscribe({
      next: ({ url }) => {
        this.articleForm.coverImage().value.set(url);
        this.uploading.set(false);
      },
      error: () => this.uploading.set(false),
    });
  }

  removeCoverImage() {
    this.articleForm.coverImage().value.set("");
  }

  publish() {
    this.articleForm.status().value.set("published");
    this.save();
  }

  cancel() {
    this.router.navigate(["/admin"]);
  }
}
