# Claude Instructions for FIFA2026 Landing Page

## Project Overview

This is a React landing page for FIFA World Cup 2026 Panini collectibles presale, built for **Collect Point**. The design follows Apple-inspired aesthetics with a warm maple color palette.

## Tech Stack

- **React 18** with Vite
- **Tailwind CSS 3.4** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Key Architecture

### Theme System
- Uses `ThemeContext` for dark/light mode toggle
- All components receive `isDark` prop or use `useTheme()` hook
- Theme persists to localStorage
- Always implement both themes when adding UI elements

### Asset Handling
- Use `img()` helper from `src/utils/assets.js` for all images
- Never use raw `/images/` paths in components
- The helper handles dev vs production (GitHub Pages) paths

### Image Naming Convention
All images in `public/images/` follow semantic prefixes:

| Prefix | Purpose |
|--------|---------|
| `bg-*` | Background images |
| `card-*` | Extra sticker card variants |
| `logo-*` | Brand logos |
| `mascots-*` | Mascot images |
| `product-*` | Product images |
| `promo-*` | Promotional banners |
| `qr-*` | Social media QR codes |

### Color Palette
```
maple: #C75B2C (primary brand)
maple-dark: #A34820
maple-light: #E07B4C
warm-cream: #FAF7F2 (light bg)
warm-brown: #3D2B1F (dark text)
zayu: #16A34A (Mexico green)
clutch: #3B82F6 (USA blue)
```

## Component Patterns

### Modals
- Use React Portal (`createPortal`) for modals
- Wrap content in `AnimatePresence` for exit animations
- Always include backdrop blur and close button
- Support both dark/light themes

### Animations
- Prefer Framer Motion for complex animations
- Use CSS animations for simple effects (defined in `index.css`)
- Common patterns: `whileInView`, `whileHover`, `whileTap`

### Backgrounds
- Use `bg-fixed` class to prevent background shifting on scroll
- Light/dark backgrounds swap based on theme with opacity transitions

## Data Management

All product and configuration data lives in `src/data/products.js`:
- Products array with prices, images, specs
- Social links with QR codes
- WhatsApp configuration
- Presale status

## Common Tasks

### Adding a New Product
1. Add entry to `products` array in `src/data/products.js`
2. Add product image to `public/images/` with `product-` prefix
3. Update image reference using the new semantic name

### Adding New Images
1. Name following convention: `{category}-{description}.{ext}`
2. Place in `public/images/`
3. Reference using `img('filename.ext')` helper
4. If AI-generated, crop watermarks from bottom-right corner

### Modifying Theme Colors
1. Edit `tailwind.config.js` colors section
2. Ensure both light and dark variants exist
3. Update components using the color

## Git Workflow

- Commit messages should be descriptive
- Include `Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>` for AI commits
- Use conventional commit style when possible

## Important Files

| File | Purpose |
|------|---------|
| `src/context/ThemeContext.jsx` | Theme provider and toggle |
| `src/utils/assets.js` | Asset path helper |
| `src/data/products.js` | All product/config data |
| `tailwind.config.js` | Theme colors and extensions |
| `src/index.css` | Global styles, animations |

## Testing Locally

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run preview # Preview production build
```

## Deployment

Configured for GitHub Pages with base path in `vite.config.js`.
