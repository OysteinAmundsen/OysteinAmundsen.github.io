import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  template: `
    <footer class="site-footer">
      <div class="footer-inner">
        <span class="footer-brand">
          <span class="material-icons">terminal</span>
          Synthetic Editorial
        </span>
        <span class="footer-copy"
          >&copy; {{ year }} Synthetic Editorial // Built for Precision</span
        >
      </div>
    </footer>
  `,
  styles: `
    .site-footer {
      border-top: 1px solid var(--ghost-border);
    }
    .footer-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-16);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--spacing-8);
    }
    .footer-brand {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
      font-family: var(--font-headline);
      font-size: 0.875rem;
      color: var(--on-surface-variant);
      .material-icons {
        font-size: 1rem;
        color: var(--primary);
      }
    }
    .footer-copy {
      font-family: var(--font-label);
      font-size: 0.75rem;
      color: var(--on-surface-variant);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
