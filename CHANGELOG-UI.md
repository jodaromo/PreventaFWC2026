# UI Changelog - FIFA 2026 Landing Page

This file tracks all UI/styling changes with reversion instructions.

---

## [2026-01-25] iOS 26.3 Glassmorphism Update

### Overview
Adding sophisticated frosted glass effects to light mode, inspired by iOS 26.3 aesthetics. Goal: elegant, mature frostiness without being aggressive or childish.

### Files Modified

---

### Change 1: Added iOS 26.3 Glassmorphism System to index.css
**File:** `src/index.css` (lines 391-580)
**Description:** Added comprehensive glass utility classes:
- `.glass` - Base frosted panel (16px blur, 72% white, warm shadows)
- `.glass-subtle` - Lighter frost for large surfaces (12px blur, 55% white)
- `.glass-prominent` - Stronger frost for floating elements (20px blur, 85% white)
- `.glass-card` - For product cards with hover states
- `.glass-input` - For form fields with focus states
- `.glass-pill` - For badges and small elements
- `.glass-overlay` - For modal backgrounds (24px blur)
- `.glass-warm` - With subtle warm cream tint
**Revert:** Replace lines 391-580 with original backup above

### Change 2: Added Glass Shadow Tokens to Tailwind
**File:** `tailwind.config.js` (boxShadow section)
**Description:** Added glass-specific shadows and blur tokens
**Revert:** Remove `glass-*` entries from boxShadow and backdropBlur

### Change 3: Applied Glass to ProductCard
**File:** `src/components/ProductCard.jsx`
**Changes:**
- Main card: `bg-white border-...` → `glass-card`
- Image area: `bg-gradient-to-b from-warm-cream...` → `bg-gradient-to-b from-white/40 to-white/20`
- Spec pills: `bg-warm-cream` → `glass-pill`
- Modal backdrop: `bg-black/70 backdrop-blur-md` → `glass-overlay`
- Modal panel: `bg-gradient-to-b from-white...` → `glass-prominent`
**Revert:** Restore original className strings

### Change 4: Applied Glass to FabMenu
**File:** `src/components/FabMenu.jsx`
**Changes:**
- Main FAB button: Added `glass` / `glass-prominent` classes
- Dropdown menu: `bg-white/98 backdrop-blur-xl` → `glass-prominent`
- Social card: `bg-white border...` → `glass-prominent`
- Contact card: Same as social card
**Revert:** Restore original className strings

### Change 5: Applied Glass to ThemeToggle
**File:** `src/components/ThemeToggle.jsx`
**Changes:** Replaced inline styles with `glass` class for light mode
**Revert:** Restore original className and style prop

### Change 6: Applied Glass to ReserveSection
**File:** `src/components/ReserveSection.jsx`
**Changes:** Main form card `bg-white shadow-xl` → `glass-card`
**Revert:** Restore original className

### Change 11: iOS 26 Liquid Glass FAB Menu (v4 - Horizontal Expansion)
**File:** `src/components/FabMenu.jsx`
**Description:** iOS 26-inspired liquid glass FAB with bubbles flowing LEFT like liquid droplets separating
**Inspiration:** Apple iOS 26 Liquid Glass design language - "takes inspiration from optical properties of glass and fluidity of liquid to create lightweight, dynamic material"
**Key Behavior:**
- Bubbles expand HORIZONTALLY to the LEFT (not vertically)
- "Liquid separating" effect - bubbles emerge from main FAB like droplets
- Blur transition during expansion creates morphing/fluid feel
- Bouncy spring animation matches iOS 26's organic motion
**Changes:**
- Bubbles now use `x: -((index + 1) * spacing)` for left expansion
- Added blur filter animation (8px → 0px) for liquid morphing effect
- iOS 26 "bouncy" spring: stiffness 400, damping 25, mass 0.8
- Bubbles positioned absolutely relative to main FAB
- Enhanced backdrop-filter with saturate(180%) for liquid glass depth
- Container restructured: bubbles render BEFORE main FAB in DOM
**Curved Text (from v3):**
- `CurvedLabel` component using SVG `<textPath>`
- Text radius: 30px (sits outside 24px bubble)
- 7px font, bold, uppercase, 0.12em letter-spacing
- Centered on bottom arc of each bubble
**Animation Details:**
- Horizontal spacing: 60px between bubbles
- Liquid spring: stiffness 400, damping 25, mass 0.8
- Staggered delay: 60ms opening, 40ms closing (reverse order)
- Blur transition: 150ms for smooth liquid morphing
- Labels fade in with 120ms additional delay
**Revert:**
- Replace FabMenu.jsx with previous version from git history

### Change 10: Bubble-Style FAB Menu (v3 - Curved Text) - SUPERSEDED by Change 11
**File:** `src/components/FabMenu.jsx`
**Description:** Bubble menu with text curving around each bubble's border (vertical expansion)
**Status:** Replaced by Change 11 (horizontal liquid expansion)
**Revert:**
- Replace FabMenu.jsx with previous version from git history

### Change 9: View Transitions API Theme Switch (v3)
**Files:** `src/index.css`, `src/context/ThemeContext.jsx`
**Description:** Premium theme switching using native View Transitions API
**How it works:**
1. Browser captures screenshot of current page state
2. React updates DOM synchronously via `flushSync()`
3. Browser crossfades between old screenshot and new DOM state
4. Result: All elements transition together in perfect sync
**CSS Changes:**
- Uses `::view-transition-old(root)` and `::view-transition-new(root)` pseudo-elements
- Custom fade animation: 0.35s with ease-out timing
- Respects `prefers-reduced-motion` for accessibility
**Context Changes:**
- `toggleTheme()` now uses `document.startViewTransition()`
- Uses `flushSync()` from react-dom to ensure synchronous DOM updates
- Graceful fallback for browsers without View Transitions support
- Respects reduced motion user preference
**Browser Support:**
- Chrome 111+, Edge 111+ (native)
- Safari: Requires manual flag enable
- Firefox: Coming in Firefox 144 (Oct 2025)
- Fallback: Instant switch for unsupported browsers
**Revert:**
- Remove the "VIEW TRANSITIONS API" section from index.css
- Remove flushSync import and startViewTransition logic from ThemeContext.jsx

### Change 8: Fixed Extra Stickers hover white background
**File:** `src/components/ProductCard.jsx`
**Changes:**
- Added `isolate` class to Extra Stickers button to create stacking context
- Added inline style `backdropFilter: 'none'` to prevent glass-card blur bleeding
- Added `bg-transparent` and `bg-clip-text` to hover text spans
**Revert:** Remove `isolate`, inline style, and extra classes from the button/spans

### Change 7: Applied Glass to StatsBar
**File:** `src/components/StatsBar.jsx`
**Changes:**
- Background overlay: `bg-warm-cream/80` → `bg-white/60 backdrop-blur-md`
- Trust badges: `bg-white/70 border...` → `glass-pill`
**Revert:** Restore original className strings

---

## Backup Sections

### Original index.css glass section (lines 391-409)
```css
/* Glass Effect */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.dark .glass {
  background: rgba(42, 47, 56, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-dark {
  background: rgba(29, 29, 31, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Original tailwind.config.js boxShadow section (lines 124-135)
```js
boxShadow: {
  'product': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  'product-hover': '0 35px 60px -15px rgba(0, 0, 0, 0.25)',
  'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
  'card-hover': '0 8px 40px rgba(0, 0, 0, 0.12)',
  // Dark mode shadows (with accent glow)
  'card-dark': '0 4px 20px rgba(0, 0, 0, 0.4)',
  'card-dark-hover': '0 8px 40px rgba(0, 0, 0, 0.5)',
  'glow-maple': '0 0 30px rgba(224, 123, 76, 0.3)', // Coral-orange glow
  'glow-teal': '0 0 30px rgba(23, 162, 184, 0.3)',
  'glow-gold': '0 0 30px rgba(224, 123, 76, 0.3)',
},
```

---

## Reversion Instructions

To fully revert all glassmorphism changes:

1. Replace modified files with their backup versions stored in this document
2. Or use git: `git checkout HEAD -- src/index.css src/components/...`
3. Clear browser cache and restart dev server

---

## Design Principles Applied

- **Subtle blur**: 12-20px backdrop-blur (not extreme 40px+)
- **Low opacity backgrounds**: 60-80% white with slight warmth
- **Refined borders**: 1px borders at 10-20% opacity, not harsh lines
- **Layered depth**: Multiple translucent layers create depth without heaviness
- **Warm tints**: Slight cream/warm undertones to avoid sterile "tech" feel
- **Shadow softness**: Large, diffused shadows (not sharp drop shadows)
