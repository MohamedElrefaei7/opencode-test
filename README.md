# Calisthenics Skills & Mobility Hub

A single-page reference for advanced bodyweight skill progressions and their prerequisite mobility requirements. Dark technical theme with forest green accents. Zero dependencies.

## Quick Start

```bash
# From project root
npx serve .
# Or: python3 -m http.server 8000
# Or: php -S localhost:8000
```

Then open **http://localhost:3000** (or the port shown) in your browser.

## Requirements

- Any static file server (Node `serve`, Python `http.server`, PHP, Caddy, nginx, etc.)
- Modern browser (last 2 versions of Chrome, Firefox, Safari, Edge)
- No Node.js build step, no `package.json`, no `npm install`

## Project Structure

```
.
├── index.html      # Semantic HTML5 — header, two sections, footer
├── style.css       # Dark/light themes, fluid type, responsive grids
├── script.js       # Theme toggle + skill filter (vanilla ES6)
├── AGENTS.md       # Constraints for AI agents
├── README.md       # This file
└── .gitignore
```

## Features

### Theme Toggle
- **Button**: Top-right in header — click to switch dark ↔ light
- **Keyboard**: Press `T` anywhere (except in text inputs)
- **Persistence**: Choice saved to `localStorage`, survives reload
- **Default**: Respects `prefers-color-scheme` on first visit

### Skill Filter
Four buttons above the Skills section:
| Filter | Shows |
|--------|-------|
| All | All 8 skills |
| Beginner | Handstand, L-Sit, Pull-up |
| Intermediate | Muscle-up, Back Lever |
| Advanced | Front Lever, Planche, One-Arm Pull-up |

### Content
- **Skills** (8): Each with 4 progression steps, color-coded difficulty badges
- **Mobility** (8): Prerequisite tests with pass/fail criteria

## Keyboard Navigation
| Key | Action |
|-----|--------|
| `Tab` / `Shift+Tab` | Move focus |
| `Enter` / `Space` | Activate button |
| `T` | Toggle theme (global shortcut) |
| `Esc` | No special handling (browser default) |

All interactive elements have visible focus rings (`:focus-visible`).

## Customization

### Colors
Edit CSS custom properties in `style.css`:
```css
:root {
  --accent: #2ecc71;        /* Forest green — used in both themes */
  --bg-primary: #0d1117;    /* Dark background */
  --fg-primary: #e6edf3;    /* Dark text */
}
[data-theme="light"] {
  --bg-primary: #ffffff;    /* Light background */
  --fg-primary: #1f2328;    /* Light text */
}
```

### Skills / Mobility Data
Edit the `skills` and `mobilityItems` arrays in `script.js`. Each skill needs:
```js
{
  id: 'unique-id',
  name: 'Display Name',
  level: 'beginner' | 'intermediate' | 'advanced',
  description: 'One-sentence summary',
  progressions: [
    { text: 'Step description', completed: false },
    // ...
  ]
}
```

## Accessibility Checklist
- [x] Semantic heading hierarchy (h1 → h2 → h3)
- [x] Color contrast ≥ 4.5:1 in both themes
- [x] Focus visible on all interactive elements
- [x] ARIA labels on icon buttons and toggle groups
- [x] Reduced motion respected
- [x] Keyboard operable (Tab, Enter, Space, `T`)
- [x] `lang="en"` on `<html>`

## License
MIT — use freely for learning or reference.