# FIFA World Cup 2026 - Panini Presale Landing Page

Premium, Apple-inspired landing page for Panini collectibles presale (FIFA World Cup 2026) built for **Collect Point**.

## Features

- **Apple-inspired design** with whitespace-driven layouts
- **iOS 26-style rounded corners** (squircle approximation)
- **Framer Motion animations** - scroll reveals, hover states, micro-interactions
- **Dark/light duality** - Hero section dark, content sections light
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
    name: "Álbum Pasta Blanda",
    description: "...",
    price: 12900,
    priceFormatted: "$12.900 COP",
    // ... other fields
  },
  // ... more products
];
```

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx           # Hero section with animated logo
│   ├── MascotSection.jsx  # Maple, Zayu, Clutch section
│   ├── ProductCard.jsx    # Individual product card
│   ├── ProductGrid.jsx    # Product grid layout
│   ├── StatsBar.jsx       # Animated stats counter
│   ├── ContactForm.jsx    # Form with validation
│   ├── WhatsAppButton.jsx # Floating WhatsApp button
│   └── Footer.jsx         # Footer
├── hooks/
│   └── useScrollReveal.js # Custom scroll animation hook
├── data/
│   └── products.js        # Product & config data
├── App.jsx                # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles + Tailwind
```

## Deployment

The `dist/` folder contains the production build. Deploy to any static hosting:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` package
- **Any CDN/Server**: Upload `dist/` contents

## iOS 26 Rounded Corners

This project uses CSS approximations of iOS 26's "continuous corners" (squircle):

```css
.squircle { border-radius: 24px; }
.squircle-sm { border-radius: 16px; }
.squircle-lg { border-radius: 32px; }
.squircle-xl { border-radius: 40px; }
```

## Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'fifa-black': '#0a0a0a',
  'fifa-gold': '#c9a227',
  'panini-red': '#e31837',
  // ...
}
```

---

Built with precision. Every pixel matters.
