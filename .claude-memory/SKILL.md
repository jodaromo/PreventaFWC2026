---
name: claude-memory
description: Self-managing memory and knowledge system for the FIFA 2026 Panini Landing Page codebase. Use this skill when needing to understand, reference, update, or extend the project. This skill provides project context, architecture decisions, design patterns, component relationships, and maintains persistent knowledge across sessions. Triggers on questions about the codebase structure, design decisions, how components work, where to find specific functionality, or when making modifications that need contextual awareness.
---

# Claude Memory - FIFA 2026 Landing Page

This skill enables Claude to self-manage, edit, modify, and save information about this codebase. It serves as a living knowledge base that grows with the project.

## Quick Reference

### Project Structure
```
fifa2026-landing/
├── src/
│   ├── App.jsx                    # Main app with cart state, snap-scroll sections
│   ├── main.jsx                   # React entry point
│   ├── index.css                  # Global styles, CSS utilities, theme classes
│   ├── App.css                    # Component-specific styles (minimal)
│   ├── components/
│   │   ├── Header.jsx             # Fixed header, theme toggle, logo pill transition
│   │   ├── Hero.jsx               # Hero section with mascots, urgency panel
│   │   ├── MascotSection.jsx      # Interactive mascot carousel with modals
│   │   ├── StatsBar.jsx           # Animated statistics with counting
│   │   ├── ProductGrid.jsx        # Product display with gift banner
│   │   ├── ProductCard.jsx        # Individual product with quantity controls
│   │   ├── ReserveSection.jsx     # Form + accordion info cards
│   │   ├── ContactForm.jsx        # (Legacy - merged into ReserveSection)
│   │   ├── InfoCards.jsx          # (Legacy - merged into ReserveSection)
│   │   ├── Footer.jsx             # Trust signals, navigation, copyright
│   │   └── WhatsAppButton.jsx     # Floating WhatsApp CTA
│   ├── context/
│   │   └── ThemeContext.jsx       # Dark/light mode with system preference
│   ├── data/
│   │   └── products.js            # Products, stats, social links, config
│   ├── hooks/
│   │   └── useScrollReveal.js     # Intersection Observer hooks
│   └── utils/
│       └── assets.js              # Asset path helpers for GitHub Pages
├── tailwind.config.js             # Extended theme with custom colors/animations
├── index.html                     # HTML template
└── public/images/                 # Static assets
```

### Core Technologies
- **React 18** with Vite bundler
- **Tailwind CSS** with extensive custom theme
- **Framer Motion** for animations
- **Lucide React** for icons
- **Google Apps Script** for form submission

### Theme System
```javascript
// Access theme anywhere
import { useTheme } from '../context/ThemeContext';
const { isDark, toggleTheme } = useTheme();
```

### Color Palette
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| maple | #E07B4C | #E07B4C | Primary CTA, accents |
| warm-cream | #FAFAFA | #1A1D21 | Background |
| warm-brown | #171717 | #F5F5F7 | Primary text |
| zayu | #17A2B8 | #17A2B8 | Mexico mascot accent |
| clutch | #4361EE | #4361EE | USA mascot accent |

## How to Use This Memory

### Reading Project Knowledge
```bash
# Check current memory state
cat .claude-memory/references/decisions.md
cat .claude-memory/references/patterns.md
cat .claude-memory/references/todos.md
```

### Updating Memory

When you learn something new about the project, update the appropriate reference file:

1. **Architecture decisions** → `references/decisions.md`
2. **Reusable patterns** → `references/patterns.md`
3. **Pending work** → `references/todos.md`
4. **Bug fixes/gotchas** → `references/gotchas.md`

### Memory Update Protocol

When making changes to the codebase:

1. **Before changes**: Read relevant reference files
2. **After changes**: Update reference files with:
   - What was changed
   - Why it was changed
   - Any patterns discovered
   - Any gotchas encountered

## Key Design Patterns

See `references/patterns.md` for full details. Quick summary:

### Animation Pattern
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### Theme-Aware Styling
```jsx
className={`${isDark ? 'bg-dark-bg-card text-white' : 'bg-white text-warm-brown'}`}
```

### Spring Animations (buttery feel)
```jsx
const cardSpring = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 0.5,
};
```

## Critical Files to Know

| File | Responsibility |
|------|----------------|
| `tailwind.config.js` | All custom colors, animations, shadows |
| `index.css` | Global CSS utilities, theme transitions |
| `products.js` | Product data, presale config, social links |
| `ThemeContext.jsx` | Dark mode state, localStorage persistence |

## Form Submission Flow

1. User fills form in `ReserveSection.jsx`
2. Data sent to Google Apps Script endpoint
3. Script adds row to Google Sheets
4. Success/error state shown to user

## Deployment

- GitHub Pages with Actions workflow
- Base URL configured in `vite.config.js`
- Assets need `img()` helper for correct paths

## Memory Maintenance

This skill and its references should be updated when:
- New components are added
- Design patterns change
- Dependencies are updated
- Bugs are fixed
- New features are implemented

To add a new reference file:
```bash
# Create new reference
touch .claude-memory/references/[topic].md
# Update this SKILL.md to document the new reference
```
