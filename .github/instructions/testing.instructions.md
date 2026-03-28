---
description: "Use when writing tests, creating test files, mocking services, testing components, testing services, or working with TestBed, Vitest, or spec files."
applyTo: "**/*.spec.ts,**/*.test.ts"
---

# Testing Guidelines

## Framework

This project uses **Vitest** with `@angular/build:unit-test` executor via Nx.

- Run tests: `npx nx test blog`
- Run single file: `npx nx test blog --testFile=path/to/file.spec.ts`
- Test files live next to the code they test: `example.component.ts` → `example.component.spec.ts`

## Test File Structure

```typescript
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { describe, it, expect, beforeEach, vi, type Mocked } from "vitest";
import { ExampleComponent } from "./example.component";

describe("ExampleComponent", () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
```

## Testing Components

### Basic Component Test

```typescript
it("should display the title", async () => {
  const el: HTMLElement = fixture.nativeElement;
  expect(el.querySelector("h1")?.textContent).toContain("Expected Title");
});
```

### Setting Inputs

Use `fixture.componentRef.setInput()` for signal-based inputs:

```typescript
beforeEach(async () => {
  fixture = TestBed.createComponent(ArticleComponent);
  component = fixture.componentInstance;
  fixture.componentRef.setInput("slug", "test-article");
  await fixture.whenStable();
});
```

### Simulating User Input

```typescript
it("should update on user input", async () => {
  const input: HTMLInputElement = fixture.nativeElement.querySelector("input")!;
  input.value = "new value";
  input.dispatchEvent(new Event("input"));
  await fixture.whenStable();
  expect(component.name()).toBe("new value");
});
```

### Testing Click Events

```typescript
it("should handle click", async () => {
  const button: HTMLButtonElement =
    fixture.nativeElement.querySelector("button")!;
  button.click();
  await fixture.whenStable();
  expect(component.isOpen()).toBe(true);
});
```

## Testing Services

### Simple Service

```typescript
import { TestBed } from "@angular/core/testing";
import { describe, it, expect, beforeEach } from "vitest";
import { ArticleService } from "./article.service";

describe("ArticleService", () => {
  let service: ArticleService;

  beforeEach(() => {
    service = TestBed.inject(ArticleService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
```

### Mocking HTTP with HttpTestingController

```typescript
import { provideHttpClient } from "@angular/common/http";
import {
  provideHttpClientTesting,
  HttpTestingController,
} from "@angular/common/http/testing";

describe("ArticleService", () => {
  let service: ArticleService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ArticleService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it("should fetch articles", async () => {
    const mockArticles = [{ id: 1, title: "Test", status: "published" }];
    const result$ = service.getPublishedArticles();
    const promise = firstValueFrom(result$);

    const req = httpTesting.expectOne("/data/articles.json");
    expect(req.request.method).toBe("GET");
    req.flush(mockArticles);

    const articles = await promise;
    expect(articles).toHaveLength(1);
  });

  afterEach(() => {
    httpTesting.verify();
  });
});
```

## Mocking Dependencies

### Stubbing a Service

```typescript
import { vi, type Mocked } from "vitest";

const articleServiceStub: Mocked<ArticleService> = {
  getPublishedArticles: vi.fn(),
  getArticleBySlug: vi.fn(),
};

beforeEach(() => {
  articleServiceStub.getPublishedArticles.mockReturnValue(of(mockArticles));

  TestBed.configureTestingModule({
    imports: [FeedComponent],
    providers: [{ provide: ArticleService, useValue: articleServiceStub }],
  });
});
```

### Spying on Methods

```typescript
it("should call service with correct slug", () => {
  articleServiceStub.getArticleBySlug.mockReturnValue(of(mockArticle));
  fixture.componentRef.setInput("slug", "my-article");
  expect(articleServiceStub.getArticleBySlug).toHaveBeenCalledWith(
    "my-article",
  );
});
```

## Testing with Routing

```typescript
import { provideRouter } from "@angular/router";
import { RouterTestingHarness } from "@angular/router/testing";

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([{ path: "article/:slug", component: ArticleComponent }]),
    ],
  });
});

it("should navigate to article", async () => {
  const harness = await RouterTestingHarness.create();
  const component = await harness.navigateByUrl(
    "/article/test-slug",
    ArticleComponent,
  );
  expect(component.slug()).toBe("test-slug");
});
```

## Key Vitest APIs

| API                       | Purpose                               |
| ------------------------- | ------------------------------------- |
| `vi.fn()`                 | Create a mock function                |
| `vi.spyOn(obj, "method")` | Spy on an existing method             |
| `vi.useFakeTimers()`      | Mock timers for time-dependent code   |
| `vi.useRealTimers()`      | Restore real timers                   |
| `vi.mocked(fn)`           | Get typed mock from a function        |
| `type Mocked<T>`          | Type utility for fully-mocked objects |

## Key TestBed APIs

| API                                            | Purpose                               |
| ---------------------------------------------- | ------------------------------------- |
| `TestBed.configureTestingModule({...})`        | Configure test module                 |
| `TestBed.createComponent(Component)`           | Create component fixture              |
| `TestBed.inject(Service)`                      | Get service from test injector        |
| `TestBed.overrideComponent(Comp, {...})`       | Override component metadata           |
| `fixture.componentRef.setInput("name", value)` | Set signal-based input                |
| `fixture.whenStable()`                         | Wait for async operations to complete |
| `fixture.nativeElement`                        | Access DOM element                    |
| `fixture.debugElement`                         | Access DebugElement for testing       |

## Best Practices

1. **Test file placement**: Same directory as the code under test
2. **Naming**: `*.spec.ts` suffix (e.g., `feed.component.spec.ts`)
3. **Use `await fixture.whenStable()`** instead of `fixture.detectChanges()` for signal-based components
4. **Mock external dependencies** — stub services, use `HttpTestingController` for HTTP
5. **Test behavior, not implementation** — assert on DOM output and observable side effects
6. **One assertion per test** when practical — makes failures easy to diagnose
7. **Use `vi.fn()` for mocks** — Vitest's built-in mock functions with type safety
8. **Clean up** — call `httpTesting.verify()` in `afterEach` for HTTP tests
