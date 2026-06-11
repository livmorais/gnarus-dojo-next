# DS Agent Guide

This guide defines the standard for evolving components in `src/components/ds` and their showcase pages.

## Required Structure

- Component: `src/components/ds/<component>.tsx` (or a folder when it grows).
- Use a single file for simple components.
- Use a folder when:
  - the component has subcomponents
  - it includes hooks, styles, or utilities
- DS index page: `src/app/product/alura/ds/page.tsx`.
- Per-component showcase page: `src/app/product/alura/ds/<component>/page.tsx`.

## Workflow For Creating/Updating DS Components

1. Create or update the component in `src/components/ds`.
2. Update the DS navigation source in `src/lib/ds-navigation.ts` to expose the showcase in the shared sidebar.
3. Create or update `src/app/product/alura/ds/<component>/page.tsx` with usage scenarios.

## Showcase Page Standard

- DS showcases now live inside a shared layout with a persistent left sidebar.
- Sidebar navigation is the source of truth for DS discovery; do not recreate local indexes inside showcase pages.
- Keep page header and descriptive text left-aligned, following the content column start.
- Sidebar should stay visually darker and simpler than the content area.
- Sidebar links should be text-first, low-ornament, and easy to scan.
- Keep showcases clean, without unnecessary framing around examples.
- At minimum, each showcase must demonstrate:
  - default state
  - disabled state
  - rounded variation (when supported)
  - API variations (variants, sizes, composition when available)
  - baseline accessibility (`aria-*`, `aria-label` for icon-only)
  - link composition with `asChild` when supported

## Styling And Composition

- Prefer compound components (`Root`, `Icon`, `Label`) when slots are needed.
- Prefer `asChild` for composition with other components (for example `Link`, `a`, `DialogTrigger`). 
- Use `cva` for variants and `cn` for class merging.
- Use existing theme tokens; avoid hardcoded values when possible.
- Ensure `cursor-pointer` on enabled interactive elements.
- Use real hover styles with pseudo-classes (`hover:*`) instead of artificial state props.
- Prefer CSS-based responsiveness (Tailwind) over JavaScript.
- Avoid using props or JS logic to control responsive behavior.
- Prefer shared DS shell/layout decisions over page-specific navigation chrome.

## Naming
- Use consistent naming for variants (`default`, `secondary`, `ghost`, etc.)

## Iconography

- In DS, use `lucide-react` as the default icon set.
- Use local SVG assets only for proprietary brand-specific icons.

## Accessibility And Semantics

- `icon-only` usage requires an `aria-label`.
- Disabled links must use `aria-disabled`, `tabIndex={-1}`, and interaction blocking.
- Disabled buttons should use native `disabled`.
- All interactive elements must be keyboard accessible
- Focus styles must be visible
- Icon-only components must always include `aria-label`

## Minimum Quality Bar

- No type, lint, or build errors.
- Showcase must be updated alongside component API changes.
