# Animation System Changelog

## 2026-01-25: Unified Button Animation System

Applied the FAB menu's snappy spring animation to buttons across the interface for consistent feel.

### Created Files

- `src/utils/animations.js` - Shared animation configurations

### Animation Presets Added

```javascript
// Quick spring for button interactions
quickSpring = { type: 'spring', stiffness: 500, damping: 30, mass: 0.8 }

// Liquid spring for morphing elements
liquidSpring = { type: 'spring', stiffness: 400, damping: 25, mass: 0.8 }

// Button animations
buttonHover = { scale: 1.02 }
buttonTap = { scale: 0.97 }
ctaButtonHover = { scale: 1.02, y: -2 }
ctaButtonTap = { scale: 0.98 }
iconButtonHover = { scale: 1.1 }
iconButtonTap = { scale: 0.9 }
```

### Modified Files

1. **Hero.jsx**
   - Main CTA button: Changed from CSS transitions to `motion.button` with `ctaButtonHover/ctaButtonTap`
   - "Conoce las mascotas" link: Added `quickSpring` transition

2. **ProductCard.jsx**
   - Quantity +/- buttons: Updated to use `iconButtonHover/iconButtonTap` with `quickSpring`
   - Extra Stickers modal CTA: Changed to `motion.button` with spring animation

3. **ThemeToggle.jsx**
   - Added `quickSpring` transition for consistent feel

4. **MascotSection.jsx**
   - Navigation arrows: Added `iconButtonHover/iconButtonTap` with `quickSpring`
   - MascotCard buttons: Added `quickSpring` transition

5. **FabMenu.jsx**
   - Imported shared animations from `utils/animations.js`
   - Removed local `quickSpring` definition (now using shared)
   - Close button in expanded bubbles: Updated to use shared animations

### How to Revert

To revert these changes:

1. Delete `src/utils/animations.js`

2. In each modified file, remove the import:
   ```javascript
   import { quickSpring, ... } from '../utils/animations';
   ```

3. Replace `motion.button` with regular `<button>` elements

4. Add back CSS transitions where needed:
   ```javascript
   className="... transition-all duration-150 ease-out active:scale-[0.98] hover:scale-[1.02]"
   ```

5. In FabMenu.jsx, restore the local `quickSpring` constant:
   ```javascript
   const quickSpring = {
     type: 'spring',
     stiffness: 500,
     damping: 30,
     mass: 0.8,
   };
   ```
