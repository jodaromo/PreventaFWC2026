# FabMenu Changelog

## Issues to Fix
1. **White border on logo** - `ring-2 ring-white/10` on line 182 creates unwanted border
2. **Image quality loss during animation** - scale transforms cause blur, need `will-change` and `transform-gpu`
3. **Pill animation not smooth enough** - needs better easing and timing

## Working State Reference
The pill should:
- Be just the logo when at top of page (not scrolled, not open)
- Show "Collect Point" text when scrolled
- Show X icon when open
- Transitions should be butter smooth with no bumps

## Key Lines to Watch
- Line 156-164: Pill className with padding/bg transitions
- Line 179-183: Logo image with ring border (REMOVE ring-2 ring-white/10)
- Line 187-213: AnimatePresence for text/icon swap

## Animation Config
- Use CSS `transition-all duration-300` for size/padding changes
- Use Framer Motion only for opacity/scale of content inside
- Avoid Framer Motion `layout` prop - breaks things badly
- Image scaling: add `will-change-transform` to prevent blur

## Fixes Applied
- [x] Remove ring-2 ring-white/10 from logo (was causing white border)
- [x] Add will-change-transform and transform-gpu to logo (prevents blur during scale)
- [x] Add will-change-transform transform-gpu to pill button
- [x] Removed border classes from pill (was border-dark-border/50, border-warm-tan/20, border-transparent)
- [x] Changed transition to only animate padding and background-color (not all properties)
- [x] Extended duration to 350ms
- [x] Changed easing to cubic-bezier(0.4,0,0.2,1) - standard Material Design easing
