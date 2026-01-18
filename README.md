# FIFA World Cup 2026 - Panini Presale Landing Page

Premium, Apple-inspired landing page for Panini collectibles presale (FIFA World Cup 2026) built for **Collect Point**.

## Features

- **Apple-inspired design** with whitespace-driven layouts
- **Dark/Light theme toggle** - Full theme support throughout
- **Framer Motion animations** - scroll reveals, hover states, micro-interactions, 3D card tilts
- **Interactive mascot carousel** - Swipe gestures, device orientation tilt on mobile
- **Extra Stickers modal** - Showcases rare holographic card variants
- **Payment plan calculator** - Shows installment options for products
- **Free album promo** - Automatic gift banners based on cart quantity
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
    price: 519990,
    priceFormatted: "$519.990",
    image: "/images/product-box.png",
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
│   ├── Hero.jsx            # Hero section with mascots and countdown
│   ├── MascotSection.jsx   # Interactive 3D mascot carousel
│   ├── ProductCard.jsx     # Product card with Extra Stickers modal
│   ├── ProductGrid.jsx     # Product grid with gift banners
│   ├── StatsBar.jsx        # Animated stats counter
│   ├── ReserveSection.jsx  # Reservation form section
│   ├── ContactSection.jsx  # Contact/social links section
│   └── Footer.jsx          # Footer with logos
├── context/
│   └── ThemeContext.jsx    # Dark/light theme provider
├── hooks/
│   └── useScrollReveal.js  # Custom scroll animation hook
├── utils/
│   └── assets.js           # Asset path helper for dev/prod
├── data/
│   └── products.js         # Product & config data
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
└── index.css               # Global styles + Tailwind
```

## Image Assets

All images follow a semantic naming convention in `public/images/`:

### Naming Convention

| Prefix | Purpose | Examples |
|--------|---------|----------|
| `bg-*` | Background images | `bg-stadium-light.jpg`, `bg-stickers-dark.jpg` |
| `card-*` | Extra sticker variants | `card-extra-blue.jpg`, `card-extra-gold.jpg` |
| `logo-*` | Brand logos | `logo-collectpoint.jpg`, `logo-fifa-worldcup.png` |
| `mascots-*` | Mascot images | `mascots-group.png`, `Maple.avif` |
| `product-*` | Product images | `product-box.png`, `product-album.png` |
| `promo-*` | Promotional banners | `promo-banner.png` |
| `qr-*` | Social media QR codes | `qr-whatsapp.png`, `qr-instagram.png` |

### Full Image List

```
public/images/
├── Backgrounds
│   ├── bg-ball-texture-dark.jpg    # Football texture (dark theme)
│   ├── bg-ball-texture-light.jpg   # Football texture (light theme)
│   ├── bg-collector-hands.jpg      # Stats bar background
│   ├── bg-stadium-dark.jpg         # Stadium at night (dark hero)
│   ├── bg-stadium-light.jpg        # Stadium with sunlight (light hero)
│   ├── bg-stickers-dark.jpg        # Stickers on dark (dark products)
│   └── bg-vintage-stickers-light.jpg # Vintage stickers (light products)
├── Cards (Extra Stickers)
│   ├── card-extra-blue.jpg         # Blue holographic variant
│   ├── card-extra-gold.jpg         # Gold holographic variant
│   ├── card-extra-green.jpg        # Green holographic variant
│   └── card-extra-red.jpg          # Red holographic variant
├── Logos
│   ├── logo-collectpoint.jpg       # Collect Point logo
│   ├── logo-fifa-2026.jpg          # FIFA 2026 logo
│   ├── logo-fifa-worldcup.png      # FIFA World Cup logo
│   └── panini-logo.svg             # Panini logo
├── Mascots
│   ├── Maple.avif                  # Canada mascot
│   ├── Zayu.avif                   # Mexico mascot
│   ├── Clutch.avif                 # USA mascot
│   ├── mascots-group.png           # All three mascots
│   └── mascots-group-alt.png       # Alternate group image
├── Products
│   ├── product-album.png           # Album (pasta dura/blanda)
│   ├── product-box.png             # Display box
│   └── product-pack-individual.png # Individual sticker pack
├── Promo
│   ├── promo-banner.png            # Promotional banner
│   └── promo-presale-status.png    # Presale status graphic
└── QR Codes
    ├── qr-facebook.png             # Facebook QR
    ├── qr-instagram.png            # Instagram QR
    ├── qr-tiktok.png               # TikTok QR
    └── qr-whatsapp.png             # WhatsApp QR
```

## Theme Colors

The project uses a warm, maple-inspired color palette defined in `tailwind.config.js`:

```javascript
colors: {
  'maple': '#C75B2C',           // Primary brand color
  'maple-dark': '#A34820',      // Darker variant
  'maple-light': '#E07B4C',     // Lighter variant
  'warm-cream': '#FAF7F2',      // Light background
  'warm-brown': '#3D2B1F',      // Dark text
  'warm-tan': '#D4C4B0',        // Borders/accents
  'zayu': '#16A34A',            // Mexico mascot green
  'clutch': '#3B82F6',          // USA mascot blue
  // Dark theme
  'dark-bg': '#0a0a0a',
  'dark-surface': '#1a1a1a',
  'dark-border': '#2a2a2a',
}
```

## Deployment

The `dist/` folder contains the production build. Deploy to any static hosting:

- **GitHub Pages**: Configured via `vite.config.js` with base path
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **Any CDN/Server**: Upload `dist/` contents

### GitHub Pages Deployment

```bash
npm run build
npm run deploy  # Uses gh-pages package
```

## Key Components

### MascotSection
- 3D tilt effect on center card (mouse + device orientation)
- Swipe gestures for carousel navigation
- Modal with mascot stories, stadiums, and maps links

### ProductCard
- Payment plan calculator (3, 6, 12 months)
- Extra Stickers badge with modal popup
- Quantity selector with gift promo banners

### ThemeContext
- Persists theme preference to localStorage
- Smooth transitions between themes
- Respects system preference on first load

---

Built with precision. Every pixel matters.
