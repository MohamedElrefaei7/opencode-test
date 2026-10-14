# AGENTS.md — Project Constraints for Calisthenics Skills & Mobility Hub

## Stack Constraints
- **HTML**: Single `index.html` — semantic, accessible, no frameworks
- **CSS**: Single `style.css` — custom properties, fluid type (`clamp()`), Grid/Flex, no preprocessors
- **JS**: Single `script.js` — vanilla ES6+, IIFE, no bundler, no dependencies
- **No CDN, no npm packages, no external fonts** — system font stack only
- **No build step** — files served directly

## Design System (Enforced via CSS Custom Properties)
| Token | Dark (Default) | Light |
|-------|----------------|-------|
| `--bg-primary` | `#0d1117` | `#ffffff` |
| `--bg-secondary` | `#161b22` | `#f6f8fa` |
| `--fg-primary` | `#e6edf3` | `#1f2328` |
| `--accent` | `#2ecc71` (forest green) | `#2ecc71` |
| `--font-mono` | `SF Mono`, `Fira Code`, `Monaco`, `Consolas`, monospace | same |
| `--font-sans` | System UI stack | same |

## Responsive Breakpoints
- **Mobile-first**: Base styles < 640px (single column)
- **Tablet**: ≥ 640px (two-column grids)
- **Desktop**: ≥ 1024px (three-column skills grid)
- Container max-width: `1200px`

## Interactions (Exactly Two)
1. **Theme Toggle**
   - Button in header (`#theme-toggle`)
   - Keyboard shortcut: `T` key (when not in input/textarea)
   - Persists to `localStorage` (`theme` key)
   - Respects `prefers-color-scheme` on first visit
   - Updates `data-theme` on `<html>`

2. **Skill Filter**
   - Four buttons: All / Beginner / Intermediate / Advanced
   - Filters `.skill-card` by `data-level` attribute
   - Updates `aria-pressed` on active button
   - No URL/hash change — pure DOM filtering

## Accessibility Requirements
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Heading hierarchy: h1 → h2 → h3
- Focus-visible outlines on all interactive elements
- `aria-label` / `aria-pressed` on icon-only and toggle buttons
- `role="group"` + `aria-label` on filter button group
- Reduced motion respected (`prefers-reduced-motion: reduce`)
- Color contrast ≥ 4.5:1 in both themes
- Keyboard operable: Tab, Enter, Space, `T` shortcut

## File Structure
```
/project-root
├── index.html      # Entry point
├── style.css       # All styles
├── script.js       # All interactions
├── README.md       # Run instructions
├── AGENTS.md       # This file
└── .gitignore      # Standard ignores
```

## Forbidden Patterns
- ❌ `class="container mx-auto px-4"` (utility frameworks)
- ❌ `@import` or `@tailwind`
- ❌ `import` / `export` in JS (no modules — single file)
- ❌ `fetch`, `XMLHttpRequest`, or external API calls
- ❌ `localStorage` for anything except `theme`
- ❌ Inline `style="..."` or `onclick="..."`
- ❌ `!important` in CSS (except override utilities)

## Code Style
- CSS: Block comments for sections, alphabetical properties within rules
- JS: `const` by default, `let` for mutation, arrow functions, early returns
- HTML: 2-space indent, double quotes, boolean attrs minimized (`disabled` not `disabled="true"`)

## Browser Support Target
- Last 2 versions of Chrome, Firefox, Safari, Edge
- No IE11, no polyfills needed
- Features used: CSS Grid, Flexbox, Custom Properties, `clamp()`, `matchMedia`, `localStorage`