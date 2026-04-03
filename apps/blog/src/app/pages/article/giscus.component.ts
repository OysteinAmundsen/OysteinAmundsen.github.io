import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
} from "@angular/core";

@Component({
  selector: "app-giscus",
  template: `<div class="giscus-container"></div>`,
  styles: `
    :host {
      display: block;
      padding: var(--spacing-24) 0;
    }
  `,
})
export class GiscusComponent {
  private el = inject(ElementRef);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  readonly term = input.required<string>();

  constructor() {
    effect(() => {
      const term = this.term();
      if (!term || !isPlatformBrowser(this.platformId)) return;
      this.loadGiscus(term);
    });

    // React to theme changes
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const observer = new MutationObserver(() => this.syncTheme());
        observer.observe(this.document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });
        return () => observer.disconnect();
      });
    }
  }

  private loadGiscus(term: string) {
    const container = (this.el.nativeElement as HTMLElement).querySelector(
      ".giscus-container",
    );
    if (!container) return;

    // Clear previous instance
    container.innerHTML = "";

    const script = this.document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute(
      "data-repo",
      "OysteinAmundsen/OysteinAmundsen.github.io",
    );
    script.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnk2MDgzOTAwMw==");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOA6BUW84C5-Va");
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", term);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", this.getGiscusTheme());
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    container.appendChild(script);
  }

  private syncTheme() {
    const iframe = (this.el.nativeElement as HTMLElement).querySelector(
      "iframe.giscus-frame",
    ) as HTMLIFrameElement | null;
    if (!iframe?.contentWindow) return;

    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: this.getGiscusTheme() } } },
      "https://giscus.app",
    );
  }

  private getGiscusTheme(): string {
    const attr = this.document.documentElement.getAttribute("data-theme");
    if (attr === "light") return "light";
    if (attr === "dark") return "dark_dimmed";
    // System preference
    return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark_dimmed"
      : "light";
  }
}
