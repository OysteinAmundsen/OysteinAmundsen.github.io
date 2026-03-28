import { DOCUMENT } from "@angular/common";
import {
  afterNextRender,
  Component,
  inject,
  isDevMode,
  signal,
} from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";

type Theme = "system" | "light" | "dark";

@Component({
  imports: [RouterModule, RouterLink],
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  private document = inject(DOCUMENT);

  readonly showAdmin = isDevMode();
  readonly year = new Date().getFullYear();
  readonly theme = signal<Theme>("system");

  readonly themeIcon = () => {
    switch (this.theme()) {
      case "light":
        return "light_mode";
      case "dark":
        return "dark_mode";
      default:
        return "contrast";
    }
  };

  constructor() {
    afterNextRender(() => {
      const saved = (localStorage.getItem("theme") as Theme) || "system";
      this.theme.set(saved);
      this.applyTheme(saved);
    });
  }

  toggleTheme() {
    const next: Theme =
      this.theme() === "system"
        ? "light"
        : this.theme() === "light"
          ? "dark"
          : "system";
    this.theme.set(next);
    this.applyTheme(next);
  }

  private applyTheme(theme: Theme) {
    const root = this.document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }
}
