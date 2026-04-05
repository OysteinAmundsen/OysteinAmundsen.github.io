import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, map, of, tap } from "rxjs";

export interface GiscusDiscussionStats {
  totalCommentCount: number;
  totalReplyCount: number;
  reactionCount: number;
}

interface GiscusApiResponse {
  discussion?: {
    totalCommentCount: number;
    totalReplyCount: number;
    reactionCount: number;
  };
  error?: string;
}

const GISCUS_REPO = "OysteinAmundsen/OysteinAmundsen.github.io";
const GISCUS_CATEGORY = "Announcements";

@Injectable({ providedIn: "root" })
export class GiscusService {
  private http = inject(HttpClient);
  private cache = new Map<string, GiscusDiscussionStats>();

  getDiscussionStats(term: string): Observable<GiscusDiscussionStats | null> {
    const cached = this.cache.get(term);
    if (cached) {
      return of(cached);
    }

    const url = `https://giscus.app/api/discussions`;
    const params = {
      repo: GISCUS_REPO,
      term,
      category: GISCUS_CATEGORY,
      strict: "false",
      first: "0",
    };

    return this.http.get<GiscusApiResponse>(url, { params }).pipe(
      map((res) => {
        if (res.error || !res.discussion) return null;
        return {
          totalCommentCount: res.discussion.totalCommentCount,
          totalReplyCount: res.discussion.totalReplyCount,
          reactionCount: res.discussion.reactionCount,
        };
      }),
      tap((stats) => {
        if (stats) {
          this.cache.set(term, stats);
        }
      }),
      catchError(() => of(null)),
    );
  }
}
