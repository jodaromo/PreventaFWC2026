# FIFA World Cup 2026 - Panini Presale Landing Page

Premium, Apple-inspired landing page for Panini collectibles presale (FIFA World Cup 2026) built for **Collect Point**.

## Features

- **Apple-inspired design** with whitespace-driven layouts
- **Dark/Light theme toggle** - Full theme support throughout
- **Framer Motion animations** - scroll reveals, hover states, micro-interactions, 3D card tilts
- **Interactive mascot carousel** - Swipe gestures, device orientation tilt on mobile
- **Extra Stickers modal** - Showcases rare variant cards (Bronze, Silver, Gold, Red Messi)
- **GPU-optimized images** - Crisp rendering on hover/transform
- **Form with validation** - Collects name, phone, email before WhatsApp
- **WhatsApp integration** - Pre-filled messages with user data
- **Mobile responsive** - Works on all screen sizes
- **Animated counters** - Stats bar with counting animation

## Tech Stack

- React 18 (Vite)
- Tailwind CSS 3.4
- Framer Motion
- Lucide React (icons)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

### WhatsApp Number

Edit `src/data/products.js` and replace the placeholder:

```javascript
export const WHATSAPP_NUMBER = "573001234567"; // Your number with country code
```

### Products

All products are defined in `src/data/products.js`:

```javascript
export const products = [
  {
    id: 1,
    name: "Caja Display",
    description: "...",
    price: 520000,
    priceFormatted: "$520.000",
    image: "/images/BoxHighQuality.png",
    specs: ["104 sobres", "728 láminas"],
    badge: "El Atajo",
    // ... other fields
  },
  // ... more products
];
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Fixed header with theme toggle
│   ├── Hero.jsx            # Hero section with countdown
│   ├── MascotSection.jsx   # Interactive 3D mascot carousel
│   ├── ProductCard.jsx     # Product card + Extra Stickers modal
│   ├── ProductGrid.jsx     # Product grid container
│   ├── StatsBar.jsx        # Animated stats counter
│   ├── ReserveSection.jsx  # Reservation form section
│   ├── FabMenu.jsx         # Floating action button menu
│   └── Footer.jsx          # Footer with logos
├── context/
│   └── ThemeContext.jsx    # Dark/light theme provider
├── hooks/
│   └── useScrollReveal.js  # Custom scroll animation hook
├── utils/
│   └── assets.js           # Asset path helper (getAssetPath, img)
├── data/
│   ├── products.js         # Product & config data
│   └── colombiaLocations.js # City/department data
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
└── index.css               # Global styles + Tailwind
```

## Image Assets

Located in `public/images/`:

### Product Images (High Quality, Transparent)
| File | Usage |
|------|-------|
| `BoxHighQuality.png` | Caja Display product |
| `AlbumHighQuality.png` | Album (Pasta Dura/Blanda) |
| `CardPackageHighQuality.png` | Sobre Individual |

### Extra Sticker Variants
| File | Usage |
|------|-------|
| `BronzeVariant_clean.png` | Bronze Messi card |
| `SilverVariant_clean.png` | Silver Messi card |
| `GoldVariant_clean.png` | Gold Messi card |
| `RedVariant_clean.png` | Red Messi card |
| `CardBack.png` | Card back design |

### Mascots
| File | Usage |
|------|-------|
| `Zayu.avif` | Mexico mascot (Jaguar) |
| `Clutch.avif` | USA mascot (Eagle) |

### Logos & QR
Located in `public/images/` with prefixes `logo-*`, `qr-*`

## Color Palette

### Light Mode
```
Background:      #FAFAFA (warm-cream)
Card:            #FFFFFF (white)
Text Primary:    #171717 (warm-brown)
Text Secondary:  #737373 (warm-gray)
Border:          #E5E5E5 (warm-tan)
Accent:          #E07B4C (maple)
```

### Dark Mode
```
Background:      #1A1D21 (dark-bg)
Card:            #2A2F38 (dark-bg-card)
Elevated:        #242830 (dark-bg-elevated)
Text Primary:    #F5F5F7 (white)
Text Muted:      #A8ADB5 (dark-text-muted)
Border:          #3D444D (dark-border)
Accent:          #E07B4C (maple)
```

### Brand Colors
```
maple:           #E07B4C (primary accent)
maple-dark:      #C96A3D (hover state)
zayu:            #17A2B8 (teal - Mexico mascot)
clutch:          #4361EE (blue - USA mascot)
whatsapp:        #25D366
```

Full color definitions in `tailwind.config.js`

## Animation Reference

### Framer Motion Springs
```jsx
// Standard
{ type: "spring", stiffness: 400, damping: 26 }

// Snappy (cards)
{ type: "spring", stiffness: 400, damping: 28 }
```

### Tailwind Animations
- `animate-fade-in` - Fade in 0.6s
- `animate-slide-up` - Slide up + fade 0.6s
- `animate-float` - Floating 6s infinite
- `animate-theme-spin` - Theme toggle 0.5s

## Skill Reference

A detailed codebase skill is available at `../fifa2026-skill/` with:
- Complete file index
- Color reference (light/dark)
- Animation configs
- Component patterns
- Common issues & fixes

## Deployment

The `dist/` folder contains the production build. Deploy to any static hosting:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Configure base path in `vite.config.js`

---

Built with precision. Every pixel matters.
