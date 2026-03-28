---
description: >-
  Use when validating UI against the design system, checking design consistency,
  generating or editing screens with Stitch, working with design tokens, or
  reviewing visual output for correctness.
applyTo: "**/*.html,**/*.scss,**/*.ts"
---

# Stitch Design System Validation

This project uses [Stitch](https://stitch.googleapis.com) (via MCP) to manage and validate against a design system. Use Stitch tools to ensure UI consistency and generate screens that match design specs.

## Available MCP Tools

| Tool                                   | Purpose                                      |
| -------------------------------------- | -------------------------------------------- |
| `mcp_stitch_list_design_systems`       | List all design systems                      |
| `mcp_stitch_create_design_system`      | Create a new design system                   |
| `mcp_stitch_update_design_system`      | Update an existing design system             |
| `mcp_stitch_apply_design_system`       | Apply a design system to a project or screen |
| `mcp_stitch_list_projects`             | List all Stitch projects                     |
| `mcp_stitch_get_project`               | Get details of a specific project            |
| `mcp_stitch_create_project`            | Create a new Stitch project                  |
| `mcp_stitch_list_screens`              | List screens in a project                    |
| `mcp_stitch_get_screen`                | Get details/code of a specific screen        |
| `mcp_stitch_edit_screens`              | Edit existing screens                        |
| `mcp_stitch_generate_screen_from_text` | Generate a screen from a text description    |
| `mcp_stitch_generate_variants`         | Generate variants of a screen                |

## Validation Workflow

1. **Discover the design system** — call `mcp_stitch_list_design_systems` and `mcp_stitch_list_projects` to find the relevant project and design system.
2. **Get current screens** — call `mcp_stitch_list_screens` then `mcp_stitch_get_screen` to review existing screen definitions.
3. **Compare against implementation** — read the Angular component template and styles, then compare with the Stitch screen definition for consistency (colors, spacing, layout, typography).
4. **Apply fixes** — if the implementation diverges from the design system, update the component styles/template to match. Use `mcp_stitch_apply_design_system` if regenerating.
5. **Generate new screens** — when building new UI, use `mcp_stitch_generate_screen_from_text` with a clear description and apply the design system.

## Key Rules

- Always discover existing design systems and projects before creating new ones.
- Use `mcp_stitch_get_screen` to review the generated code before applying it — never blindly overwrite components.
- The project uses SCSS with CSS custom properties for theming. Ensure any Stitch-generated styles integrate with the existing token system in `styles.scss`.
- Design tokens in this project follow a dark terminal aesthetic (cyan, neon green, blue). Stitch output may need adaptation to match.
