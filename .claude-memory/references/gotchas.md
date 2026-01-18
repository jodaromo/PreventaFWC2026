# Gotchas & Bug Fixes - FIFA 2026 Landing Page

## CSS Gotchas

### 1. Snap Scroll + Modal Conflict
**Problem**: Modal opens but page keeps snap scrolling
**Solution**: Lock body scroll when modal opens
```jsx
useEffect(() => {
  document.body.style.overflow = 'hidden';
  return () => { document.body.style.overflow = originalStyle; };
}, []);
```

### 2. Dynamic Viewport Height
**Problem**: `100vh` includes mobile browser chrome
**Solution**: Use `100dvh` (dynamic viewport height)
```css
min-height: 100vh;
min-height: 100dvh; /* Fallback for older browsers */
```

### 3. Webkit Backdrop Blur
**Problem**: `backdrop-filter` not working on Safari
**Solution**: Always include webkit prefix
```css
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

### 4. Input Autofill Styles
**Problem**: Browser autofill overrides custom input styles
**Solution**: Use `appearance: none` and custom background
```css
-webkit-appearance: none;
appearance: none;
```

---

## React Gotchas

### 1. Framer Motion Exit Animations
**Problem**: Exit animations not playing
**Solution**: Wrap in `<AnimatePresence>` with `mode="wait"`
```jsx
<AnimatePresence mode="wait">
  {condition && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

### 2. useInView Double Firing
**Problem**: Animation triggers multiple times
**Solution**: Set `once: true` in viewport options
```jsx
const isInView = useInView(ref, { once: true, margin: "-100px" });
```

### 3. State Updates After Unmount
**Problem**: Memory leak warning on async operations
**Solution**: Check mounted state or use cleanup
```jsx
useEffect(() => {
  let mounted = true;
  asyncOp().then(data => { if (mounted) setState(data); });
  return () => { mounted = false; };
}, []);
```

---

## Framer Motion Gotchas

### 1. Drag + Click Conflict
**Problem**: Click fires after drag ends
**Solution**: Track drag state and prevent click
```jsx
const [isDragging, setIsDragging] = useState(false);
onDragStart={() => setIsDragging(true)}
onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
onClick={() => !isDragging && handleClick()}
```

### 2. Layout Animations Jank
**Problem**: Layout animations cause page jitter
**Solution**: Use `layoutId` for shared element transitions
```jsx
<motion.div layoutId="unique-id">
```

### 3. Wheel Event Prevention
**Problem**: Carousel wheel scrolls whole page
**Solution**: Use non-passive wheel listener
```jsx
useEffect(() => {
  const handleWheel = (e) => { e.preventDefault(); /* ... */ };
  el.addEventListener('wheel', handleWheel, { passive: false });
  return () => el.removeEventListener('wheel', handleWheel);
}, []);
```

---

## Tailwind Gotchas

### 1. Dynamic Class Names
**Problem**: Tailwind purges dynamic class names
**Solution**: Use complete class names, not string interpolation
```jsx
// BAD
className={`bg-${color}-500`}

// GOOD
className={color === 'red' ? 'bg-red-500' : 'bg-blue-500'}
```

### 2. Dark Mode Not Applying
**Problem**: Dark classes not working
**Solution**: Ensure `darkMode: 'class'` in config and `dark` class on html
```jsx
// ThemeContext.jsx
document.documentElement.classList.add('dark');
```

### 3. Custom Animation Delay
**Problem**: `animation-delay-X` classes don't exist
**Solution**: Use inline style for delays
```jsx
style={{ animationDelay: `${index * 0.1}s` }}
```

---

## Form Submission Gotchas

### 1. CORS with Google Apps Script
**Problem**: CORS error on form submission
**Solution**: Use `mode: 'no-cors'` (can't read response)
```jsx
await fetch(URL, {
  method: 'POST',
  mode: 'no-cors',
  body: JSON.stringify(data),
});
```

### 2. JSON Content-Type
**Problem**: Apps Script not parsing JSON
**Solution**: Send as `text/plain`
```jsx
headers: { 'Content-Type': 'text/plain;charset=utf-8' }
```

---

## Asset Path Gotchas

### 1. GitHub Pages Base URL
**Problem**: Assets 404 on GitHub Pages
**Solution**: Use `import.meta.env.BASE_URL` helper
```jsx
export const img = (filename) => `${import.meta.env.BASE_URL}images/${filename}`;
```

### 2. Public vs Src Assets
**Problem**: Confusion about where to put images
**Solution**:
- `public/images/` → Static, copied as-is, use `img()` helper
- `src/assets/` → Bundled, use `import`

---

## Mobile Gotchas

### 1. Touch Scroll Blocking
**Problem**: Carousel blocks page scroll
**Solution**: Use `touchAction: 'pan-y'` to allow vertical scroll
```jsx
style={{ touchAction: 'pan-y' }}
```

### 2. Input Zoom on iOS
**Problem**: iOS zooms on input focus if font < 16px
**Solution**: Ensure inputs have `font-size: 1rem` (16px)

### 3. Safe Area Insets
**Problem**: Content hidden behind notch/home indicator
**Solution**: Use CSS env() for safe areas
```css
padding-bottom: env(safe-area-inset-bottom);
```
