import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, map, of, shareReplay } from "rxjs";

export interface GiscusDiscussionStats {
  totalCommentCount: number;
  totalReplyCount: number;
  reactionCount: number;
}

interface GitHubDiscussion {
  title: string;
  comments: number;
  reactions: { total_count: number };
  category?: { name: string };
}

const GISCUS_REPO = "OysteinAmundsen/OysteinAmundsen.github.io";

@Injectable({ providedIn: "root" })
export class GiscusService {
  private http = inject(HttpClient);
  private discussions$?: Observable<Map<string, GiscusDiscussionStats>>;

  getDiscussionStats(term: string): Observable<GiscusDiscussionStats | null> {
    return this.getAllDiscussions().pipe(
      map((statsMap) => statsMap.get(term) ?? null),
      catchError(() => of(null)),
    );
  }

  private getAllDiscussions(): Observable<Map<string, GiscusDiscussionStats>> {
    if (!this.discussions$) {
      const url = `https://api.github.com/repos/${GISCUS_REPO}/discussions`;
      this.discussions$ = this.http
        .get<GitHubDiscussion[]>(url, {
          params: { per_page: "100" },
          headers: { Accept: "application/vnd.github+json" },
        })
        .pipe(
          map((discussions) => {
            const statsMap = new Map<string, GiscusDiscussionStats>();
            for (const d of discussions) {
              statsMap.set(d.title, {
                totalCommentCount: d.comments,
                totalReplyCount: 0,
                reactionCount: d.reactions.total_count,
              });
            }
            return statsMap;
          }),
          shareReplay(1),
        );
    }
    return this.discussions$;
  }
}
