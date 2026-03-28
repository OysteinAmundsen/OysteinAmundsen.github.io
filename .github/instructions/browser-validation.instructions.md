---
description: >-
  Use when validating changes in the browser, checking rendered output,
  taking screenshots, inspecting DOM elements, debugging layout or styling,
  running Lighthouse audits, verifying visual correctness of pages,
  reproducing bugs, investigating reported issues, or debugging runtime behavior.
  ALWAYS use this when the user reports a bug — reproduce it in the browser first.
applyTo: "**/*.html,**/*.scss,**/*.ts"
---

# Browser Validation & Bug Reproduction

This project uses Chrome DevTools MCP (via `chrome-devtools-mcp`) to validate rendered pages in a real browser. Use this to verify visual output, inspect DOM, check console errors, run audits, and **reproduce bugs before fixing them**.

## Dev Server

The dev server may already be running. **Before starting a new server, try navigating to the page first.** Use `mcp_chrome-devtoo_navigate_page` to open a URL (default: `http://localhost:4200`). If that fails (page not reachable), start the dev server:

```
npx nx serve blog
```

Run this as a **background process** so it doesn't block your workflow.

## Available MCP Tools

### Navigation & Pages

| Tool                              | Purpose                              |
| --------------------------------- | ------------------------------------ |
| `mcp_chrome-devtoo_navigate_page` | Navigate to a URL                    |
| `mcp_chrome-devtoo_new_page`      | Open a new browser tab               |
| `mcp_chrome-devtoo_list_pages`    | List all open pages/tabs             |
| `mcp_chrome-devtoo_select_page`   | Switch to a specific tab             |
| `mcp_chrome-devtoo_close_page`    | Close a tab                          |
| `mcp_chrome-devtoo_resize_page`   | Resize viewport (responsive testing) |
| `mcp_chrome-devtoo_emulate`       | Emulate a device                     |

### Interaction

| Tool                              | Purpose                                |
| --------------------------------- | -------------------------------------- |
| `mcp_chrome-devtoo_click`         | Click an element                       |
| `mcp_chrome-devtoo_hover`         | Hover over an element                  |
| `mcp_chrome-devtoo_fill`          | Fill an input field                    |
| `mcp_chrome-devtoo_fill_form`     | Fill multiple form fields              |
| `mcp_chrome-devtoo_type_text`     | Type text                              |
| `mcp_chrome-devtoo_press_key`     | Press a keyboard key                   |
| `mcp_chrome-devtoo_drag`          | Drag an element                        |
| `mcp_chrome-devtoo_upload_file`   | Upload a file                          |
| `mcp_chrome-devtoo_handle_dialog` | Handle a dialog (alert, confirm, etc.) |

### Inspection & Debugging

| Tool                                      | Purpose                            |
| ----------------------------------------- | ---------------------------------- |
| `mcp_chrome-devtoo_take_screenshot`       | Take a screenshot of the page      |
| `mcp_chrome-devtoo_take_snapshot`         | Take a DOM snapshot                |
| `mcp_chrome-devtoo_evaluate_script`       | Run JavaScript in the page context |
| `mcp_chrome-devtoo_get_console_message`   | Get a specific console message     |
| `mcp_chrome-devtoo_list_console_messages` | List all console messages          |
| `mcp_chrome-devtoo_wait_for`              | Wait for an element or condition   |

### Network & Performance

| Tool                                            | Purpose                      |
| ----------------------------------------------- | ---------------------------- |
| `mcp_chrome-devtoo_list_network_requests`       | List network requests        |
| `mcp_chrome-devtoo_get_network_request`         | Get details of a request     |
| `mcp_chrome-devtoo_performance_start_trace`     | Start a performance trace    |
| `mcp_chrome-devtoo_performance_stop_trace`      | Stop and get trace results   |
| `mcp_chrome-devtoo_performance_analyze_insight` | Analyze performance insights |
| `mcp_chrome-devtoo_lighthouse_audit`            | Run a Lighthouse audit       |
| `mcp_chrome-devtoo_take_memory_snapshot`        | Take a memory snapshot       |

## Bug Reproduction Workflow

When a bug is reported, **always reproduce it in the browser before attempting a fix**:

1. **Ensure the app is accessible** — try navigating to the relevant page. If unreachable, start the dev server as a background process.
2. **Navigate to the affected page** — go to the route where the bug was reported.
3. **Take a "before" screenshot** — capture the current state with `mcp_chrome-devtoo_take_screenshot`.
4. **Check console for errors** — use `mcp_chrome-devtoo_list_console_messages` to find exceptions, warnings, or failed requests.
5. **Reproduce the bug** — follow the user's reproduction steps using click/fill/type/navigate tools.
6. **Inspect the DOM** — use `mcp_chrome-devtoo_take_snapshot` or `mcp_chrome-devtoo_evaluate_script` to examine the state of relevant elements.
7. **Check network requests** — use `mcp_chrome-devtoo_list_network_requests` if the bug involves data loading or API calls.
8. **Document findings** — summarize what was observed before proceeding to fix.
9. **Verify the fix** — after applying changes, repeat steps 2–6 to confirm the bug is resolved. Take an "after" screenshot.

## Validation Workflow

1. **Check if server is running** — navigate to `http://localhost:4200`. If it fails, start `npx nx serve blog` as a background process and wait for it to be ready.
2. **Navigate to the target page** — use the app's route (e.g., `http://localhost:4200/article/my-slug`).
3. **Take a screenshot** — use `mcp_chrome-devtoo_take_screenshot` to visually verify the rendered page.
4. **Check for errors** — use `mcp_chrome-devtoo_list_console_messages` to look for runtime errors or warnings.
5. **Inspect elements** — use `mcp_chrome-devtoo_take_snapshot` or `mcp_chrome-devtoo_evaluate_script` to inspect DOM structure, computed styles, or data bindings.
6. **Test interactions** — use click/fill/type tools to test interactive elements (forms, navigation, grid actions).
7. **Run audit** — use `mcp_chrome-devtoo_lighthouse_audit` for performance, accessibility, and SEO checks.

## Key Rules

- **When a bug is reported, reproduce it in the browser first** — do not jump straight to code changes.
- **Always try navigating first** before starting a dev server — it may already be running.
- Start the dev server as a **background process** if you need to launch it.
- The app runs on `http://localhost:4200` by default.
- Chrome must be running with `--remote-debugging-port=9222` for DevTools MCP to connect.
- Use screenshots to verify visual changes after modifying styles or templates.
- Check console messages after navigation to catch runtime errors early.
- After fixing a bug, **always verify the fix in the browser** before declaring it resolved.

## App Routes

| Route                 | Page                    |
| --------------------- | ----------------------- |
| `/`                   | Article feed            |
| `/article/:slug`      | Single article view     |
| `/admin`              | Admin layout (redirect) |
| `/admin/articles`     | Article list (grid)     |
| `/admin/articles/:id` | Article editor          |
