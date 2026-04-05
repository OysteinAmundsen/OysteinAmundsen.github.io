import { Component, effect, inject, input, signal } from "@angular/core";
import { GiscusDiscussionStats, GiscusService } from "@blog/shared";

@Component({
  selector: "app-giscus-stats",
  template: `
    @if (stats(); as s) {
      @if (s.reactionCount || s.totalCommentCount) {
        <div class="giscus-stats">
          @if (s.reactionCount) {
            <span class="stat" title="Reactions">
              <span class="material-icons">favorite</span>
              {{ s.reactionCount }}
            </span>
          }
          @if (s.totalCommentCount) {
            <span class="stat" title="Comments">
              <span class="material-icons">chat_bubble_outline</span>
              {{ s.totalCommentCount + s.totalReplyCount }}
            </span>
          }
        </div>
      }
    }
  `,
  styles: `
    .giscus-stats {
      display: flex;
      gap: var(--spacing-8);
      align-items: center;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      font-family: var(--font-label);
      font-size: 0.75rem;
      color: var(--on-surface-variant);
      letter-spacing: 0.03em;

      .material-icons {
        font-size: 0.875rem;
      }
    }
  `,
})
export class GiscusStatsComponent {
  private giscusService = inject(GiscusService);

  readonly slug = input.required<string>();
  readonly stats = signal<GiscusDiscussionStats | null>(null);

  constructor() {
    effect(() => {
      const slug = this.slug();
      if (slug) {
        this.giscusService
          .getDiscussionStats(slug)
          .subscribe((stats) => this.stats.set(stats));
      }
    });
  }
}
