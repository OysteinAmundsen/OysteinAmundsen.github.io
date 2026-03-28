---
description: "Use when writing Angular components, services, templates, routing, signals, dependency injection, SSR, or any Angular-specific code. Covers Angular 21+ patterns, standalone components, new control flow, and reactive signals."
applyTo: "**/*.ts,**/*.html,**/*.scss"
---

# Angular Development Guidelines

> Reference: [Angular Docs](https://angular.dev/llms.txt) · [Full Context](https://angular.dev/assets/context/llms-full.txt)

## Project Conventions

This is an Angular 21+ project using Nx monorepo. All components are **standalone** (no NgModules).

- **Component prefix**: `app` (kebab-case selectors: `app-feed`, `app-header`)
- **Dependency injection**: Use `inject()` function, not constructor injection
- **State management**: Angular Signals (`signal()`, `computed()`, `effect()`)
- **Inputs**: Use `input()` / `input.required<T>()` (signal-based)
- **Outputs**: Use `output<T>()`
- **Control flow**: New syntax (`@if`, `@for`, `@switch`) — never use `*ngIf` / `*ngFor`
- **Styling**: SCSS with CSS custom properties, scoped per component
- **SSR**: Static pre-rendering via `@angular/ssr`
- **Build**: `@angular/build:application` with Nx

## Component Pattern

```typescript
import {
  Component,
  inject,
  signal,
  computed,
  input,
  effect,
} from "@angular/core";

@Component({
  selector: "app-example",
  imports: [
    /* only what's needed */
  ],
  templateUrl: "./example.component.html",
  styleUrl: "./example.component.scss",
})
export class ExampleComponent {
  // 1. Injected dependencies
  private someService = inject(SomeService);

  // 2. Inputs
  readonly id = input.required<string>();

  // 3. Signals for state
  readonly data = signal<Data | null>(null);

  // 4. Computed values
  readonly derivedValue = computed(() => this.data()?.name ?? "");

  // 5. Effects for reactive data fetching
  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        this.someService.getById(id).subscribe((result) => {
          this.data.set(result);
        });
      }
    });
  }
}
```

## Service Pattern

```typescript
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class DataService {
  private http = inject(HttpClient);

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>("/api/data");
  }
}
```

## Template Patterns

### Control Flow

```html
@if (isLoading()) {
<app-spinner />
} @else { @for (item of items(); track item.id; let first = $first) {
<div [class.featured]="first">{{ item.name }}</div>
} @empty {
<p>No items found.</p>
} }
```

### Property Binding & Events

```html
<button [disabled]="!isValid()" (click)="save()">Save</button>
<input [value]="name()" (input)="updateName($event)" />
```

## Routing

Routes use lazy loading with `loadComponent`:

```typescript
export const appRoutes: Route[] = [
  {
    path: "",
    loadComponent: () => import("./pages/home").then((m) => m.HomeComponent),
  },
  {
    path: "detail/:slug",
    loadComponent: () =>
      import("./pages/detail").then((m) => m.DetailComponent),
  },
];
```

Route parameters are accessed via `input.required<string>()` with `withComponentInputBinding()`.

## Signals Quick Reference

| API                            | Purpose                          |
| ------------------------------ | -------------------------------- |
| `signal(value)`                | Writable reactive state          |
| `computed(() => ...)`          | Derived read-only state          |
| `effect(() => ...)`            | Side effects when signals change |
| `input()` / `input.required()` | Signal-based component inputs    |
| `output()`                     | Component output events          |
| `model()`                      | Two-way bindable signal          |
| `linkedSignal()`               | State linked to other signals    |
| `toSignal(obs$)`               | Convert Observable to Signal     |
| `toObservable(sig)`            | Convert Signal to Observable     |

## Key Rules

1. **Never use NgModules** — all components are standalone with `imports: [...]`
2. **Never use `*ngIf` / `*ngFor`** — use `@if` / `@for` control flow
3. **Never use constructor injection** — use `inject()` function
4. **Prefer signals over plain properties** for reactive state
5. **Use `track` in `@for` blocks** — required for performance (`track item.id`)
6. **Mark template-only members `protected`** — public members define component API
7. **Mark signal properties `readonly`** — prevents accidental reassignment
8. **Use `effect()` for data fetching** triggered by signal changes
9. **Shared code goes in `libs/shared`** — import via `@blog/shared`
10. **SSR compatibility** — avoid direct DOM access; use `afterNextRender()` for browser-only code
