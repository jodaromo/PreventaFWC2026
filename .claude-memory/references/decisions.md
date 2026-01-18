# Architecture Decisions - FIFA 2026 Landing Page

## Decision Log

### 2026-01-18: Initial Architecture Documentation

---

## Technology Choices

### React + Vite (vs Next.js)
**Decision**: Use React with Vite instead of Next.js
**Reason**: Static site deployment to GitHub Pages; no server-side rendering needed; faster dev experience
**Trade-offs**: No SSR benefits, but page is client-rendered anyway

### Tailwind CSS (vs CSS Modules/Styled Components)
**Decision**: Tailwind with extensive customization
**Reason**: Rapid prototyping; consistent design system; dark mode support
**Implementation**: Extended theme in `tailwind.config.js` with custom colors, animations, shadows

### Framer Motion (vs CSS Animations)
**Decision**: Framer Motion for all complex animations
**Reason**: Gesture support (drag, tap); exit animations; spring physics; viewport detection
**Use CSS for**: Simple transitions (color, opacity); hover states without complex physics

### Google Apps Script (vs Backend API)
**Decision**: Direct submission to Google Sheets via Apps Script
**Reason**: No backend infrastructure needed; instant spreadsheet access; free
**Trade-offs**: No-cors mode required; limited error handling; rate limits

---

## Design Decisions

### Snap Scroll Sections
**Decision**: Full-height sections with mandatory snap scrolling
**Reason**: App-like feel; clear section boundaries; mobile-friendly
**Implementation**: `scroll-snap-type: y mandatory` on html, `min-height: 100dvh` on sections

### Dark Mode First
**Decision**: System preference detection with manual override
**Reason**: Modern users expect dark mode; respects accessibility preferences
**Implementation**: `ThemeContext` with localStorage persistence; `dark:` Tailwind variants

### Maple as Primary Accent
**Decision**: Coral-orange (#E07B4C) as primary CTA color
**Reason**: Warm, inviting; stands out from FIFA blue; accessible contrast ratios
**Usage**: All primary CTAs, progress bars, selected states

### iOS-Style Squircles
**Decision**: Large border-radius (16-40px) for all containers
**Reason**: Modern, friendly aesthetic; matches iOS design language
**Implementation**: Custom `.squircle` utility classes; `rounded-2xl` Tailwind

---

## Component Architecture

### Single Page Application
**Decision**: All sections in one route
**Reason**: Smooth scroll experience; no route-based loading; simpler state management
**Sections**: Hero → Mascots → Stats → Products → Reserve → Footer

### Cart State in App.jsx
**Decision**: Lift cart state to top-level App component
**Reason**: Multiple components need cart access (ProductGrid, ReserveSection)
**Pattern**: `const [cart, setCart] = useState({})` with prop drilling

### Merged ReserveSection
**Decision**: Combine form and info cards into single component
**Reason**: Better user flow; related content together; reduced component count
**Previous**: Separate `ContactForm.jsx` and `InfoCards.jsx`

### Theme Context
**Decision**: React Context for theme state
**Reason**: Deeply nested components need theme access; avoids prop drilling
**Pattern**: `useTheme()` hook returns `{ isDark, toggleTheme }`

---

## Performance Decisions

### Viewport-Once Animations
**Decision**: Most animations trigger once, not on every scroll
**Reason**: Prevents distracting repeat animations; better performance
**Implementation**: `viewport={{ once: true }}` in Framer Motion

### Lazy Animation Staggering
**Decision**: Stagger delays based on index (0.1s per item)
**Reason**: Creates cascade effect without blocking render
**Max delay**: ~0.4s to prevent feeling slow

### Image Optimization
**Decision**: Use AVIF for mascot images, PNG for products
**Reason**: AVIF for photos (smaller); PNG for transparent product shots
**Implementation**: `img()` helper resolves correct path

---

## State Management

### No Redux/Zustand
**Decision**: useState + Context only
**Reason**: App complexity doesn't warrant global state library
**Pattern**: Local state for UI; Context for theme; prop drilling for cart

### Form Validation
**Decision**: Custom validation with immediate feedback
**Reason**: Simple requirements; no complex async validation
**Implementation**: `validateForm()` returns boolean, sets `errors` state

---

## Deployment

### GitHub Pages
**Decision**: Deploy to GitHub Pages with Actions
**Reason**: Free hosting; automatic deploys; custom domain support
**Implementation**: `vite.config.js` base URL; `.github/workflows/deploy.yml`

### Asset Paths
**Decision**: Use `getAssetPath()` / `img()` helpers
**Reason**: Base URL differs between dev and production
**Pattern**: `img('filename.png')` → `/fifa2026-landing/images/filename.png`

---

## Future Considerations

### Payment Integration
**Status**: Not implemented
**Consideration**: Stripe or MercadoPago for Colombian market
**Blocker**: Business decision pending

### i18n
**Status**: Not implemented
**Consideration**: Spanish only for now; English possible later
**Pattern**: Would use react-i18next if needed

### Analytics
**Status**: Not implemented
**Consideration**: Google Analytics or Plausible
**Implementation**: Would add to `index.html`
