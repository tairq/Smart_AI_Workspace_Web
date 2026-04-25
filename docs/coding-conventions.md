# Coding Conventions & Styling

## Coding Conventions

- **Components**: PascalCase filenames, named exports for UI/shared/section components; default exports only for Next.js pages and layouts
- **Utilities/hooks**: camelCase filenames (`useCountUp.ts`)
- **Styles**: Tailwind utility classes; use `cn()` from `@/lib/utils` for conditional classes
- **Imports**: `@/` alias for `src/`
- **Types**: Co-locate with module; shared types in `src/types/`

## Design Tokens (Tailwind custom colors)

Defined in `globals.css` via `@theme inline`. Don't substitute with raw hex values:

| Token | Hex |
|---|---|
| `electric-blue` | `#0066FF` |
| `accent-cyan` | `#00D4FF` |
| `navy` | `#0B1426` |
| `navy-light` | `#0F1B2E` |
| `charcoal` | `#1A2332` |
| `pure-white` | `#FFFFFF` |
| `off-white` | `#F1F5F9` |
| `light-gray` | `#CBD5E0` |
| `muted` | `#94A3B8` |

## CSS Utility Classes

Defined in `globals.css` — use these instead of inline styles:

- `gradient-mesh` — hero/section gradient mesh background (radial gradients via pseudo-elements)
- `glass` — semi-transparent dark panel with `backdrop-filter: blur(16px)` and subtle cyan border
- `glass-strong` — heavier blur/opacity variant of `glass`
- `text-gradient` — cyan-to-blue gradient text (uses `-webkit-background-clip`)
- `glow-cyan` / `glow-blue` — box-shadow glow effects for cards/elements
- `dot-grid` — radial dot-pattern background (32px grid)
- `animate-marquee` — infinite horizontal scroll at 30s (used in SocialProof ticker)
- `grain` — noise texture overlay (applied to `<body>`)
