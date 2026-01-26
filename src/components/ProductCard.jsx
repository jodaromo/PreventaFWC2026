import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Sparkles, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { img } from '../utils/assets';
import { quickSpring, iconButtonHover, iconButtonTap } from '../utils/animations';

// Calculate fan layout for mini cards on the button
const getFanLayout = (index, total, fanSpread = 0.2) => {
  const centerIndex = (total - 1) / 2;
  const offsetFromCenter = index - centerIndex;
  const rotation = offsetFromCenter * (15 * fanSpread);
  const horizontalOffset = offsetFromCenter * (12 * fanSpread);
  const verticalOffset = Math.abs(offsetFromCenter) * (3 * fanSpread);
  return { rotation, horizontalOffset, verticalOffset };
};

// Variant cards data - using Qatar 2022 reference images
const variantCards = [
  { id: 'bronze', name: 'Bronze', image: 'BronzeVariant_clean.png', glow: 'rgba(180, 83, 9, 0.5)', glowIntense: 'rgba(180, 83, 9, 0.8)' },
  { id: 'silver', name: 'Silver', image: 'SilverVariant_clean.png', glow: 'rgba(156, 163, 175, 0.6)', glowIntense: 'rgba(156, 163, 175, 0.9)' },
  { id: 'gold', name: 'Gold', image: 'GoldVariant_clean.png', glow: 'rgba(251, 191, 36, 0.6)', glowIntense: 'rgba(251, 191, 36, 0.9)' },
  { id: 'base', name: 'Base', image: 'RedVariant_clean.png', glow: 'rgba(239, 68, 68, 0.5)', glowIntense: 'rgba(239, 68, 68, 0.8)' },
];

// iOS 26.3 style spring for app-open animation - buttery smooth
const iosSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 28,
  mass: 0.8,
};

// Faster spring for the expand animation
const expandSpring = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

// Card sizes - responsive
const getCardSizes = () => {
  if (typeof window === 'undefined') return { grid: 140, expanded: 280 };
  const isMobile = window.innerWidth < 640;
  const isSmallMobile = window.innerWidth < 380;
  return {
    grid: isSmallMobile ? 110 : isMobile ? 130 : 180,
    expanded: isSmallMobile ? 240 : isMobile ? 280 : 320,
    gap: isSmallMobile ? 12 : isMobile ? 16 : 32,
  };
};

// Extra Stickers Modal - 2x2 Grid with iOS app-opening expand
const ExtraStickersModal = ({ isOpen, onClose }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [spinRotation, setSpinRotation] = useState(0);
  const [expandedCardPos, setExpandedCardPos] = useState(null); // Starting position for expanded card
  const [closingCardId, setClosingCardId] = useState(null); // Track which card is animating back
  const [cardSizes, setCardSizes] = useState(getCardSizes());
  const spinAnimationRef = useRef(null);
  const currentVelocityRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const clickCountRef = useRef(0);
  const containerRef = useRef(null);
  const cardRefs = useRef({});

  // Update card sizes on resize
  useEffect(() => {
    const handleResize = () => setCardSizes(getCardSizes());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedCard(null);
      setSpinRotation(0);
      if (spinAnimationRef.current) {
        cancelAnimationFrame(spinAnimationRef.current);
      }
    }
  }, [isOpen]);

  // Handle spin with momentum decay
  const handleSpin = () => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;
    lastClickTimeRef.current = now;

    if (timeSinceLastClick < 250) {
      clickCountRef.current++;
      currentVelocityRef.current += 300 + (clickCountRef.current * 150);
      currentVelocityRef.current = Math.min(currentVelocityRef.current, 3000);
    } else {
      clickCountRef.current = 1;
      currentVelocityRef.current = Math.max(currentVelocityRef.current + 350, 400);
    }

    if (spinAnimationRef.current) {
      cancelAnimationFrame(spinAnimationRef.current);
    }

    const animate = () => {
      if (Math.abs(currentVelocityRef.current) < 3) {
        currentVelocityRef.current = 0;
        return;
      }
      setSpinRotation(prev => prev + currentVelocityRef.current * 0.016);
      currentVelocityRef.current *= 0.965;
      spinAnimationRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  // Handle card selection - opens to center
  const handleSelectCard = (cardId) => {
    // Capture the card's current position before selecting
    const cardEl = cardRefs.current[cardId];
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect();
      // Store position to animate FROM - this is used by the expanded card portal
      setExpandedCardPos({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
    setSelectedCard(cardId);
    setSpinRotation(0);
    if (spinAnimationRef.current) {
      cancelAnimationFrame(spinAnimationRef.current);
    }
  };

  // Close expanded card (click outside)
  const handleCloseExpanded = () => {
    // Mark which card is closing - keep its grid version hidden until animation completes
    setClosingCardId(selectedCard);
    setSelectedCard(null);
    setSpinRotation(0);
    if (spinAnimationRef.current) {
      cancelAnimationFrame(spinAnimationRef.current);
    }
  };

  // Called when exit animation completes
  const handleExitComplete = () => {
    setClosingCardId(null);
  };

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - darker when card is expanded */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={selectedCard ? handleCloseExpanded : onClose}
            className="fixed inset-0 z-[9998]"
            style={{
              background: selectedCard
                ? 'rgba(0, 0, 0, 0.97)'
                : 'linear-gradient(135deg, rgba(10, 10, 15, 0.96) 0%, rgba(20, 15, 30, 0.96) 100%)',
              backdropFilter: 'blur(24px)',
            }}
          />

          {/* Main Container */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-hidden"
            onClick={selectedCard ? handleCloseExpanded : undefined}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ ...iosSpring, delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                selectedCard ? handleCloseExpanded() : onClose();
              }}
              whileHover={iconButtonHover}
              whileTap={iconButtonTap}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-[10001]
                bg-white/10 hover:bg-white/20 text-white/80 hover:text-white
                backdrop-blur-xl border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Content Layout - vertical on mobile, horizontal on desktop */}
            <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-12 h-full">

              {/* Left: Cards Area - SINGLE set of cards that animate in place */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...iosSpring, delay: 0.05 }}
                className="relative flex-shrink-0"
              >
                {/* Grid container - stays in place */}
                <div
                  className="grid grid-cols-2"
                  style={{ gap: cardSizes.gap }}
                >
                  {variantCards.map((variant) => {
                    const isThisSelected = selectedCard === variant.id;
                    const isAnySelected = selectedCard !== null;
                    const isThisClosing = closingCardId === variant.id;

                    // Determine opacity: hidden if selected OR if this card is animating back
                    const shouldHide = isThisSelected || isThisClosing;

                    return (
                      <div
                        key={variant.id}
                        className="relative"
                        ref={el => cardRefs.current[variant.id] = el}
                        style={{
                          // Fixed size container - never changes, keeps grid stable
                          width: cardSizes.grid,
                          height: cardSizes.grid * 1.4, // Approximate aspect ratio
                        }}
                      >
                        {/* Grid card - hidden when this card is selected OR animating back */}
                        <motion.div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isAnySelected && !closingCardId) {
                              handleSelectCard(variant.id);
                            }
                          }}
                          initial={false}
                          animate={{
                            opacity: shouldHide ? 0 : (isAnySelected ? 0.4 : 1),
                            scale: isAnySelected && !isThisSelected ? 0.92 : 1,
                            filter: isAnySelected && !isThisSelected ? 'blur(2px)' : 'blur(0px)',
                          }}
                          transition={{
                            opacity: { duration: 0.15, ease: 'easeOut' },
                            scale: iosSpring,
                            filter: { duration: 0.2 },
                          }}
                          className="absolute top-0 left-0 cursor-pointer select-none"
                          style={{
                            width: cardSizes.grid,
                            perspective: '1200px',
                            pointerEvents: (isAnySelected || closingCardId) ? 'none' : 'auto',
                          }}
                        >
                          <motion.div
                            className="relative rounded-2xl overflow-hidden"
                            whileHover={{ scale: 1.06, y: -10 }}
                            whileTap={{ scale: 0.97 }}
                            transition={iosSpring}
                            style={{
                              transformStyle: 'preserve-3d',
                              boxShadow: `0 30px 60px -15px ${variant.glow}, 0 15px 30px -10px rgba(0,0,0,0.4)`,
                            }}
                          >
                            <img
                              src={img(variant.image)}
                              alt={`${variant.name} Variant`}
                              className="w-full h-auto object-contain pointer-events-none select-none"
                              draggable={false}
                            />
                            {/* Glare overlay */}
                            <div
                              className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay rounded-2xl"
                              style={{
                                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.15) 40%, rgba(255, 255, 255, 0) 70%)',
                                opacity: 0.9,
                              }}
                            />
                          </motion.div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>

                {/* Expanded card - separate from grid, animates from captured position */}
                <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
                  {selectedCard && expandedCardPos && (() => {
                    const variant = variantCards.find(v => v.id === selectedCard);
                    if (!variant) return null;

                    // Calculate center position using responsive sizes
                    const centerX = typeof window !== 'undefined' ? (window.innerWidth - cardSizes.expanded) / 2 : 0;
                    const centerY = typeof window !== 'undefined' ? (window.innerHeight - cardSizes.expanded * 1.5) / 2 : 0;

                    return (
                      <motion.div
                        key={`expanded-${variant.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpin();
                        }}
                        initial={{
                          position: 'fixed',
                          top: expandedCardPos.top,
                          left: expandedCardPos.left,
                          width: cardSizes.grid,
                          scale: 1,
                          opacity: 1,
                          zIndex: 10000,
                        }}
                        animate={{
                          top: centerY,
                          left: centerX,
                          width: cardSizes.expanded,
                          scale: 1,
                          opacity: 1,
                        }}
                        exit={{
                          top: expandedCardPos.top,
                          left: expandedCardPos.left,
                          width: cardSizes.grid,
                          scale: 1,
                          opacity: 1,
                        }}
                        transition={expandSpring}
                        className="cursor-pointer select-none"
                        style={{
                          perspective: '1200px',
                        }}
                      >
                        <motion.div
                          className="relative rounded-2xl overflow-hidden"
                          initial={{
                            rotateY: 0,
                            boxShadow: `0 30px 60px -15px ${variant.glow}, 0 15px 30px -10px rgba(0,0,0,0.4)`,
                          }}
                          animate={{
                            rotateY: spinRotation,
                            boxShadow: `0 60px 120px -20px ${variant.glowIntense}, 0 40px 80px -20px rgba(0,0,0,0.6)`,
                          }}
                          exit={{
                            rotateY: 0,
                            boxShadow: `0 30px 60px -15px ${variant.glow}, 0 15px 30px -10px rgba(0,0,0,0.4)`,
                          }}
                          transition={expandSpring}
                          style={{
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          <img
                            src={img(variant.image)}
                            alt={`${variant.name} Variant`}
                            className="w-full h-auto object-contain pointer-events-none select-none"
                            draggable={false}
                          />
                          {/* Glare overlay */}
                          <div
                            className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay rounded-2xl"
                            style={{
                              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.15) 40%, rgba(255, 255, 255, 0) 70%)',
                              opacity: 0.9,
                            }}
                          />
                        </motion.div>

                        {/* Card name label */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: 0.15 }}
                          className="text-center mt-5"
                        >
                          <p className="text-2xl font-semibold text-white">
                            {variant.name}
                          </p>
                          <p className="text-sm text-white/50 mt-1">
                            Toca para girar
                          </p>
                        </motion.div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </motion.div>

              {/* Right: Modern Info Panel - fades when card expanded */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: selectedCard ? 0 : 1,
                  y: selectedCard ? 10 : 0,
                  scale: selectedCard ? 0.95 : 1,
                }}
                transition={iosSpring}
                className="flex-1 max-w-sm w-full"
                style={{ pointerEvents: selectedCard ? 'none' : 'auto' }}
              >
                {/* Glass card container - more compact on mobile */}
                <div className="relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Gradient accent line */}
                  <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-px bg-gradient-to-r from-transparent via-maple/50 to-transparent" />

                  {/* Mobile: Horizontal layout for badge + title */}
                  <div className="flex flex-col sm:block">
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(207,92,54,0.15) 0%, rgba(207,92,54,0.08) 100%)',
                        border: '1px solid rgba(207,92,54,0.25)',
                      }}
                    >
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-maple" />
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-maple">Ultra Raro</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 tracking-tight"
                    >
                      Extra Stickers<span className="text-white/30">*</span>
                    </motion.h3>
                  </div>

                  {/* Description - hidden on very small screens */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="hidden sm:block text-white/50 text-sm leading-relaxed mb-4 lg:mb-6"
                  >
                    Variantes especiales con acabados únicos —{' '}
                    <span className="font-bold" style={{ color: '#CD7F32' }}>Bronze</span>,{' '}
                    <span className="font-bold" style={{ color: '#C0C0C0' }}>Silver</span>,{' '}
                    <span className="font-bold" style={{ color: '#FFD700' }}>Gold</span> y{' '}
                    <span className="font-bold" style={{ color: '#FF4444' }}>Base</span>.
                  </motion.p>

                  {/* Stats row - inline on mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex gap-2 sm:gap-3 mb-3 sm:mb-6"
                  >
                    <div className="flex-1 text-center py-2 sm:py-3 rounded-xl sm:rounded-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <p className="text-base sm:text-xl font-bold text-white">1:100</p>
                      <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/35 mt-0.5">Probabilidad</p>
                    </div>
                    <div className="flex-1 text-center py-2 sm:py-3 rounded-xl sm:rounded-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <p className="text-base sm:text-xl font-bold text-white">80</p>
                      <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/35 mt-0.5">Variantes</p>
                    </div>
                  </motion.div>

                  {/* Hint text - smaller on mobile */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[10px] sm:text-[11px] text-white/25 mb-3 sm:mb-5 text-center"
                  >
                    Toca una carta para verla de cerca
                  </motion.p>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    onClick={onClose}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm text-white relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #CF5C36 0%, #b84d2d 100%)',
                      boxShadow: '0 10px 30px -5px rgba(207,92,54,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                  >
                    <span className="relative z-10">¡Quiero encontrar uno!</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>

                  {/* Reference disclaimer - minimalist under button */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[9px] text-white/30 text-center mt-3"
                  >
                    *Imágenes de referencia FIFA Qatar 2022
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

const ProductCard = ({ product, index, quantity, onQuantityChange }) => {
  const { isDark } = useTheme();
  const isSelected = quantity > 0;
  const [showExtraStickersModal, setShowExtraStickersModal] = useState(false);

  // Check if this is the Caja Display (product id 1)
  const isCajaDisplay = product.id === 1;
  // Check if product has price disclaimer (unconfirmed price)
  const hasPriceDisclaimer = product.priceDisclaimer;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`relative rounded-2xl overflow-hidden
          ${isDark
            ? isSelected
              ? 'bg-dark-bg-card border-2 border-maple shadow-xl shadow-maple/20'
              : 'bg-dark-bg-card border border-dark-border shadow-lg'
            : isSelected
              ? 'glass-card border-2 border-maple shadow-xl shadow-maple/20'
              : 'glass-card'
          }`}
      >
        {/* Badge - with dark background for contrast */}
        {product.badge && (
          <div className="absolute top-4 right-4 z-10">
            <span className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-lg border
              ${product.badge === 'Popular'
                ? 'bg-maple text-white border-maple-dark'
                : ''}
              ${product.badge === 'El Atajo'
                ? 'bg-maple text-white border-maple-dark'
                : ''}
            `}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Quantity indicator when selected */}
        {isSelected && (
          <div className="absolute top-4 left-4 z-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-maple">
              <span className="font-bold text-sm text-white">{quantity}</span>
            </div>
          </div>
        )}

        {/* Product Image or Video */}
        <div className={`relative h-52 sm:h-60 flex items-center justify-center p-5 overflow-hidden
          ${isDark
            ? 'bg-gradient-to-b from-dark-bg-elevated to-dark-bg-card'
            : 'bg-gradient-to-b from-white/40 to-white/20'
          }
        `}>
          <div
            className="relative transition-transform duration-300 ease-out hover:scale-105"
            style={{ willChange: 'transform' }}
          >
            <img
              src={img(product.image)}
              alt={product.name}
              className={`h-36 sm:h-44 w-auto object-contain ${product.rotating ? 'animate-rotate-y' : ''}`}
              draggable={false}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                imageRendering: '-webkit-optimize-contrast',
                WebkitTransform: 'translateZ(0) scale(1.0)',
                transform: 'translateZ(0) scale(1.0)',
                filter: 'blur(0)',
                WebkitFilter: 'blur(0)',
              }}
            />
          </div>

          {/* Reference disclaimer - bottom left of image */}
          <span className={`absolute bottom-3 left-3 text-[9px] z-10             ${isDark ? 'text-gray-500' : 'text-warm-gray/60'}
          `}>
            *Imagen de referencia
          </span>

          {/* Quantity Controls - Bottom right of image */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(product.id, quantity - 1);
              }}
              disabled={quantity === 0}
              whileHover={quantity > 0 ? iconButtonHover : {}}
              whileTap={quantity > 0 ? iconButtonTap : {}}
              transition={quickSpring}
              className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md
                ${quantity === 0
                  ? isDark
                    ? 'bg-dark-surface/80 text-gray-500 cursor-not-allowed'
                    : 'bg-white/80 text-warm-gray cursor-not-allowed'
                  : isDark
                    ? 'bg-dark-surface text-white hover:bg-dark-border'
                    : 'bg-white text-warm-brown hover:bg-warm-cream-dark'
                }
              `}
            >
              <Minus className="w-3.5 h-3.5" />
            </motion.button>

            <span
              className={`w-5 text-center font-bold text-base tabular-nums
                ${isDark ? 'text-white drop-shadow-lg' : 'text-warm-brown drop-shadow-sm'}
              `}
            >
              {quantity}
            </span>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(product.id, quantity + 1);
              }}
              whileHover={iconButtonHover}
              whileTap={iconButtonTap}
              transition={quickSpring}
              className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg
                bg-maple text-white hover:bg-maple-dark"
            >
              <Plus className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="relative px-5 pt-3 pb-5 flex flex-col">
          {/* Title + Price block */}
          <div className="mb-3">
            {/* Title row with Extra Stickers button */}
            <div className="relative">
              <h3 className={`text-xl sm:text-2xl font-bold leading-tight                 ${isDark ? 'text-white' : 'text-warm-brown'}
              `}>
                {product.name}
              </h3>

              {/* Extra Stickers Badge - Only for Caja Display - Fanned cards matching modal layout */}
              {isCajaDisplay && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExtraStickersModal(true);
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="absolute -top-2 -right-2 p-2 flex flex-col items-center cursor-pointer z-10 select-none group"
                >
                  {/* Fanned cards - moved down 15px */}
                  <div className="relative w-20 h-16 flex items-start justify-center" style={{ marginTop: '15px' }}>
                    {variantCards.map((variant, index) => {
                      const { rotation, horizontalOffset, verticalOffset } = getFanLayout(index, variantCards.length, 0.2);

                      return (
                        <img
                          key={variant.id}
                          src={img(variant.image)}
                          alt={variant.name}
                          className="absolute w-7 h-auto rounded-[2px] select-none transition-transform duration-200"
                          draggable={false}
                          style={{
                            top: `${verticalOffset}px`,
                            left: `50%`,
                            marginLeft: `${horizontalOffset - 14}px`,
                            filter: `drop-shadow(0 3px 5px rgba(0,0,0,0.5))`,
                            transform: `rotate(${rotation}deg)`,
                            transformOrigin: 'top center',
                            zIndex: index + 1,
                          }}
                        />
                      );
                    })}
                  </div>
                  {/* Text appears only on hover */}
                  <span className={`flex flex-col items-center -mt-3.5 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top pointer-events-none px-1.5 py-0.5 rounded ${isDark ? '' : 'bg-white/60 backdrop-blur-sm'}`}>
                    <span className="text-[7px] font-extrabold tracking-wider leading-tight gradient-text-animated">
                      Extra
                    </span>
                    <span className="text-[7px] font-extrabold tracking-wider leading-tight gradient-text-animated-delay">
                      Stickers
                    </span>
                  </span>
                </motion.button>
              )}
            </div>

            {/* Price - secondary to title */}
            <p className={`text-lg sm:text-xl font-semibold mt-3 mb-1               ${isDark ? 'text-gray-200' : 'text-warm-brown/80'}
            `}>
              {product.priceFormatted}
            </p>

            {/* Price disclaimer marquee */}
            {hasPriceDisclaimer && (
              <div className="mt-1.5 overflow-hidden">
                <div className="marquee-container py-0.5">
                  <div className="marquee-track">
                    <span className={`text-[9px] font-medium ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                      Precio no confirmado — se cobra el mayor hasta confirmación
                    </span>
                    <span className={`text-[9px] mx-6 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}></span>
                    <span className={`text-[9px] font-medium ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                      Precio no confirmado — se cobra el mayor hasta confirmación
                    </span>
                    <span className={`text-[9px] mx-6 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}></span>
                  </div>
                  <div className="marquee-track" aria-hidden="true">
                    <span className={`text-[9px] font-medium ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                      Precio no confirmado — se cobra el mayor hasta confirmación
                    </span>
                    <span className={`text-[9px] mx-6 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}></span>
                    <span className={`text-[9px] font-medium ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                      Precio no confirmado — se cobra el mayor hasta confirmación
                    </span>
                    <span className={`text-[9px] mx-6 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <p className={`text-sm mb-3 leading-relaxed             ${isDark ? 'text-gray-400' : 'text-warm-gray'}
          `}>
            {product.description}
          </p>

          {/* Specs pills */}
          <div className="flex flex-wrap gap-1.5">
            {product.specs.map((spec, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 text-[11px] font-medium rounded-full                   ${isDark
                    ? 'bg-dark-surface text-gray-400'
                    : 'glass-pill text-warm-gray'
                  }
                `}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Extra Stickers Modal */}
      <ExtraStickersModal
        isOpen={showExtraStickersModal}
        onClose={() => setShowExtraStickersModal(false)}
      />
    </>
  );
};

export default ProductCard;
