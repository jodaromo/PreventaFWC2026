# Design Patterns - FIFA 2026 Landing Page

## Animation Patterns

### 0. Comet Card 3D Tilt Effect (NEW)
```jsx
// Motion values for mouse tracking
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

// Spring physics for smooth interpolation
const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 30 });
const mouseYSpring = useSpring(mouseY, { stiffness: 300, damping: 30 });

// 3D rotation transforms
const rotateDepth = 12; // degrees
const tiltRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
const tiltRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);

// Glare effect
const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.15) 30%, rgba(255, 255, 255, 0) 70%)`;

// Apply to card wrapper
<motion.div
  style={{
    rotateX: tiltRotateX,
    rotateY: tiltRotateY,
    transformStyle: 'preserve-3d',
    perspective: '1000px',
  }}
>
  {children}
  {/* Glare overlay */}
  <motion.div
    className="pointer-events-none absolute inset-0 mix-blend-overlay"
    style={{ background: glareBackground, opacity: 0.8 }}
  />
</motion.div>
```
**When to use**: Premium interactive cards, hero elements, mascot cards

### 1. Scroll-Triggered Reveal
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```
**When to use**: Section headers, cards appearing on scroll

### 2. Staggered Children
```jsx
{items.map((item, index) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  />
))}
```
**When to use**: Lists, grids, multiple related items

### 3. Buttery Card Hover
```jsx
const cardSpring = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 0.5,
};

<motion.div
  whileHover={{ y: -4, transition: cardSpring }}
  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
>
```
**When to use**: Interactive cards, buttons

### 4. Organic Float
```jsx
const floatVariants = {
  animate: {
    y: [0, -12, 0, -8, 0],
    rotate: [0, 0.5, 0, -0.3, 0],
    transition: {
      duration: 6,
      ease: [0.45, 0.05, 0.55, 0.95],
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};
```
**When to use**: Hero images, floating elements

### 5. Progress Bar with Overshoot
```jsx
<motion.div
  initial={{ width: 0, opacity: 0.7 }}
  animate={{ width: `${percentage}%`, opacity: 1 }}
  transition={{
    duration: 1.4,
    delay: 0.7,
    ease: [0.34, 1.56, 0.64, 1], // Overshoot
  }}
/>
```
**When to use**: Progress indicators, loading states

### 6. Count-Up Animation
```jsx
const animate = () => {
  const elapsed = Date.now() - startTime;
  const progress = Math.min(elapsed / duration, 1);
  const easeOut = 1 - Math.pow(1 - progress, 3);
  setCount(Math.floor(end * easeOut));
  if (progress < 1) requestAnimationFrame(animate);
};
```
**When to use**: Statistics, numeric displays

### 7. Theme Toggle Spin
```jsx
@keyframes themeSpin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}
```
**When to use**: Icon transitions

## Layout Patterns

### 1. Snap Scroll Sections
```css
html {
  scroll-snap-type: y mandatory;
}
.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 100dvh;
}
```

### 2. Responsive Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

### 3. Two-Column Split
```jsx
<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
```

## Component Patterns

### 1. Theme-Aware Component
```jsx
const Component = () => {
  const { isDark } = useTheme();
  return (
    <div className={`
      ${isDark ? 'bg-dark-bg-card text-white' : 'bg-white text-warm-brown'}
      transition-colors duration-300
    `}>
  );
};
```

### 2. Accordion Card
```jsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
```

### 3. Modal with Scroll Lock
```jsx
useEffect(() => {
  document.body.style.overflow = 'hidden';
  return () => { document.body.style.overflow = originalStyle; };
}, []);
```

### 4. Conditional Badge
```jsx
{product.badge && (
  <span className={`px-3 py-1.5 text-xs font-bold rounded-full
    ${product.badge === 'Popular' ? 'bg-maple text-white' : ''}
  `}>
    {product.badge}
  </span>
)}
```

## Styling Patterns

### 1. Glass Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### 2. Gradient Text
```css
.stat-number {
  background: linear-gradient(135deg, #E07B4C 0%, #E8956A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 3. Squircle (iOS-style)
```css
.squircle { border-radius: 24px; }
.squircle-sm { border-radius: 16px; }
.squircle-lg { border-radius: 32px; }
```

### 4. Soft Shadow Hierarchy
```javascript
// tailwind.config.js
boxShadow: {
  'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
  'card-hover': '0 8px 40px rgba(0, 0, 0, 0.12)',
  'product': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
}
```

### 5. Ring Selection State
```jsx
className={`rounded-2xl border-2
  ${isSelected
    ? 'border-maple shadow-xl shadow-maple/20'
    : 'border-warm-tan/30 hover:border-maple/50'
  }
`}
```

## Form Patterns

### 1. Input with Icon
```jsx
<div className="relative">
  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
  <input className="w-full pl-12 pr-4 py-3.5 rounded-xl" />
</div>
```

### 2. Form State Machine
```javascript
const [submitStatus, setSubmitStatus] = useState('idle');
// 'idle' | 'loading' | 'success' | 'error'

<AnimatePresence mode="wait">
  {submitStatus === 'idle' && <Form />}
  {submitStatus === 'success' && <SuccessState />}
  {submitStatus === 'error' && <ErrorState />}
</AnimatePresence>
```

### 3. Validation Animation
```jsx
{errors.field && (
  <motion.p
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-red-500 text-sm"
  >
```

## Data Patterns

### 1. Cart State
```javascript
const [cart, setCart] = useState({}); // { productId: quantity }

const handleQuantityChange = (productId, quantity) => {
  setCart(prev => ({ ...prev, [productId]: Math.max(0, quantity) }));
};
```

### 2. Selected Products Filter
```javascript
const selectedProducts = products
  .filter(p => cart[p.id] > 0)
  .map(p => ({ ...p, quantity: cart[p.id] }));
```

### 3. Gift Qualification
```javascript
const boxQuantity = cart[1] || 0;
const qualifiesForGift = boxQuantity >= 2;
```
