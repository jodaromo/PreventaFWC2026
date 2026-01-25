import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate, useAnimation } from 'framer-motion';
import { Minus, Plus, Sparkles, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getAssetPath, img } from '../utils/assets';


// Static scarcity counter (placeholder)
const SCARCITY_COUNT = 2;

// Messi variant cards data - using cropped clean images
const variantCards = [
  { id: 'bronze', name: 'Bronze', image: 'BronzeVariant_clean.png', glow: 'rgba(180, 83, 9, 0.5)' },
  { id: 'silver', name: 'Silver', image: 'SilverVariant_clean.png', glow: 'rgba(156, 163, 175, 0.6)' },
  { id: 'gold', name: 'Gold', image: 'GoldVariant_clean.png', glow: 'rgba(251, 191, 36, 0.6)' },
  { id: 'base', name: 'Base', image: 'RedVariant_clean.png', glow: 'rgba(239, 68, 68, 0.5)' },
];

// Card back image
const CARD_BACK = 'CardBack.png';

// Fan arrangement calculations - shared between closed and open states
const getFanLayout = (index, totalCards, scale = 1) => {
  const fanAngle = 40; // Total spread angle
  const angleStep = fanAngle / (totalCards - 1);
  const rotation = -fanAngle / 2 + index * angleStep;

  // Center cards are higher (parabolic curve) - outer cards drop down
  const centerIndex = (totalCards - 1) / 2;
  const distanceFromCenter = Math.abs(index - centerIndex);
  const verticalOffset = distanceFromCenter * distanceFromCenter * 12 * scale; // More pronounced parabola

  const horizontalOffset = (index - centerIndex) * 60 * scale; // Wider spread

  return { rotation, horizontalOffset, verticalOffset };
};

// ZoomedCard component with 3D tilt and glow effect for the spinning card
// Now receives initial position from the fanned card to animate FROM that position
const ZoomedCard = ({ selectedCard, selectedIndex, spinRotation, onClose, onSpin, isDark }) => {
  const cardRef = useRef(null);
  const variant = variantCards.find(v => v.id === selectedCard);

  // Calculate the starting position based on the fan layout
  const { rotation: startRotation, horizontalOffset, verticalOffset } = getFanLayout(selectedIndex, variantCards.length, 1);

  // Mouse position for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 400, damping: 30 });

  // Tilt transforms - combined with spin rotation
  const tiltX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const tiltY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  // Glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.25) 35%, rgba(255, 255, 255, 0) 70%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!variant) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-30 flex items-center justify-center select-none"
      onClick={onClose}
    >
      <motion.div
        ref={cardRef}
        className="cursor-pointer select-none"
        initial={{
          x: horizontalOffset,
          y: verticalOffset + 20,
          rotate: startRotation,
          scale: 0.5, // Starting at fanned card size relative to zoomed
          width: '150px',
        }}
        animate={{
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          width: '300px', // 50% bigger than before (was 240px max)
        }}
        exit={{
          x: horizontalOffset,
          y: verticalOffset + 20,
          rotate: startRotation,
          scale: 0.5,
          width: '150px',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ perspective: '1200px' }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onSpin();
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={(e) => e.preventDefault()}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="relative rounded-xl overflow-hidden select-none"
          style={{
            rotateX: tiltX,
            rotateY: spinRotation + tiltY.get(),
            transformStyle: 'preserve-3d',
            boxShadow: `0 35px 70px -15px ${variant.glow}, 0 20px 40px -10px rgba(0,0,0,0.5)`,
          }}
        >
          <img
            src={img(variant.image)}
            alt="Selected Card"
            className="w-full h-auto object-contain pointer-events-none select-none"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
          {/* Dynamic glare overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay rounded-xl"
            style={{ background: glareBackground, opacity: 0.95 }}
          />
        </motion.div>
        <p className={`text-center mt-3 text-xs select-none ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
          Toca rápido para girar más fuerte
        </p>
      </motion.div>
    </motion.div>
  );
};

// Individual Variant Card with 3D tilt effect and spin capability
const VariantCard = ({ variant, isDark, isSelected, onSelect, isZoomed, onSpin }) => {
  const cardRef = useRef(null);
  const controls = useAnimation();
  const spinVelocity = useRef(0);
  const lastClickTime = useRef(0);
  const spinAnimationRef = useRef(null);

  // Current rotation for spinning
  const [currentRotation, setCurrentRotation] = useState(0);

  // 3D tilt effect (only when not zoomed)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const rotateDepth = isZoomed ? 8 : 12;
  const tiltRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
  const tiltRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);

  // Glare effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0) 70%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current || isZoomed) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Handle click - select or spin
  const handleClick = (e) => {
    e.stopPropagation();

    if (!isZoomed) {
      // Select this card
      onSelect(variant.id);
    } else {
      // Spin the card with momentum
      const now = Date.now();
      const timeSinceLastClick = now - lastClickTime.current;
      lastClickTime.current = now;

      // Build up velocity with rapid clicks
      if (timeSinceLastClick < 300) {
        spinVelocity.current = Math.min(spinVelocity.current + 400, 2000);
      } else {
        spinVelocity.current = 400;
      }

      onSpin(spinVelocity.current);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`cursor-pointer select-none ${isZoomed ? 'w-[220px] sm:w-[280px]' : 'w-[100px] sm:w-[130px]'}`}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={!isZoomed ? { scale: 1.08, zIndex: 20 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative rounded-lg overflow-hidden"
        style={{
          rotateX: isZoomed ? 0 : tiltRotateX,
          rotateY: isZoomed ? currentRotation : tiltRotateY,
          transformStyle: 'preserve-3d',
          boxShadow: `0 20px 40px -10px ${variant.glow}, 0 10px 20px -5px rgba(0,0,0,0.3)`,
        }}
        animate={controls}
      >
        {/* Card image */}
        <img
          src={img(variant.image)}
          alt={`Messi ${variant.name} Variant`}
          className="w-full h-auto object-contain pointer-events-none"
          draggable={false}
        />

        {/* Glare overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay rounded-lg"
          style={{ background: glareBackground, opacity: 0.9 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Extra Stickers Modal Component - Uses Portal to render at document root
const ExtraStickersModal = ({ isOpen, onClose, isDark }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [spinRotation, setSpinRotation] = useState(0);
  const spinAnimationRef = useRef(null);
  const currentVelocityRef = useRef(0);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedCard(null);
      setSelectedIndex(-1);
      setSpinRotation(0);
      if (spinAnimationRef.current) {
        cancelAnimationFrame(spinAnimationRef.current);
      }
    }
  }, [isOpen]);

  // Track rapid clicks for spin acceleration
  const lastClickTimeRef = useRef(0);
  const clickCountRef = useRef(0);

  // Handle spin with momentum decay
  const handleSpin = () => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;
    lastClickTimeRef.current = now;

    // Build velocity with rapid clicks
    if (timeSinceLastClick < 250) {
      clickCountRef.current++;
      currentVelocityRef.current += 300 + (clickCountRef.current * 150); // Accelerate more with each rapid click
      currentVelocityRef.current = Math.min(currentVelocityRef.current, 3000); // Cap velocity
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

      setSpinRotation(prev => prev + currentVelocityRef.current * 0.016); // ~60fps
      currentVelocityRef.current *= 0.965; // Friction decay - slightly slower deceleration

      spinAnimationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  // Handle card selection - now also tracks index for animation
  const handleSelectCard = (cardId, index) => {
    if (selectedCard === cardId) {
      setSelectedCard(null);
      setSelectedIndex(-1);
      setSpinRotation(0);
      if (spinAnimationRef.current) {
        cancelAnimationFrame(spinAnimationRef.current);
      }
    } else {
      setSelectedCard(cardId);
      setSelectedIndex(index);
      setSpinRotation(0);
    }
  };

  // Handle backdrop click
  const handleBackdropClick = () => {
    if (selectedCard) {
      setSelectedCard(null);
      setSelectedIndex(-1);
      setSpinRotation(0);
      if (spinAnimationRef.current) {
        cancelAnimationFrame(spinAnimationRef.current);
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className={`fixed inset-0 backdrop-blur-md z-[9999] ${isDark ? 'bg-black/85' : 'bg-black/70'}`}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-[700px]" onClick={(e) => e.stopPropagation()}>
              {/* Themed modal */}
              <div className={`rounded-3xl overflow-hidden shadow-2xl ${
                isDark
                  ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border border-white/10'
                  : 'bg-gradient-to-b from-white to-gray-50 border border-warm-tan/30'
              }`}>

                {/* Header */}
                <div className={`relative px-6 pt-5 pb-4 border-b ${isDark ? 'border-white/10' : 'border-warm-tan/20'}`}>
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors
                      ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}
                  >
                    <X className={`w-4 h-4 ${isDark ? 'text-white/70' : 'text-warm-brown'}`} />
                  </button>

                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-maple/20 border border-maple/30">
                      <Sparkles className="w-3 h-3 text-maple" />
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-maple">Ultra Raro</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                    Extra Stickers
                  </h3>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                    Las láminas más codiciadas del álbum — Variantes exclusivas de Messi
                  </p>
                </div>

                {/* Cards Display - Fanned hand arrangement */}
                <div className="relative py-4 px-4 flex justify-center items-start min-h-[380px] select-none">
                  {/* Zoomed card overlay with tilt and glow */}
                  <AnimatePresence>
                    {selectedCard && (
                      <ZoomedCard
                        selectedCard={selectedCard}
                        selectedIndex={selectedIndex}
                        spinRotation={spinRotation}
                        onClose={() => handleSelectCard(null, -1)}
                        onSpin={handleSpin}
                        isDark={isDark}
                      />
                    )}
                  </AnimatePresence>

                  {/* Fanned cards arrangement - positioned from top */}
                  <div
                    className="relative flex items-start justify-center select-none"
                    style={{ perspective: '1000px', height: '340px', paddingTop: '20px' }}
                  >
                    {variantCards.map((variant, index) => {
                      const { rotation, horizontalOffset, verticalOffset } = getFanLayout(index, variantCards.length, 1);
                      const isThisCardSelected = selectedCard === variant.id;

                      return (
                        <motion.div
                          key={variant.id}
                          initial={{ opacity: 0, y: 50, rotate: 0 }}
                          animate={{
                            opacity: isThisCardSelected ? 0 : (selectedCard ? 0.3 : 1),
                            y: verticalOffset,
                            rotate: rotation,
                            x: horizontalOffset,
                            scale: isThisCardSelected ? 0.8 : 1,
                          }}
                          transition={{
                            delay: isThisCardSelected ? 0 : index * 0.08,
                            type: "spring",
                            stiffness: 300,
                            damping: 22
                          }}
                          whileHover={!selectedCard ? {
                            y: verticalOffset - 20,
                            transition: { type: "spring", stiffness: 400, damping: 20 }
                          } : {}}
                          className={`absolute select-none ${selectedCard ? 'pointer-events-none' : 'cursor-pointer'}`}
                          style={{
                            transformOrigin: 'bottom center',
                            zIndex: index + 1,
                          }}
                          onClick={() => handleSelectCard(variant.id, index)}
                        >
                          <motion.div
                            className="relative rounded-lg overflow-hidden w-[120px] sm:w-[150px]"
                            style={{
                              boxShadow: `0 20px 40px -10px ${variant.glow}, 0 10px 20px -5px rgba(0,0,0,0.3)`,
                            }}
                          >
                            <img
                              src={img(variant.image)}
                              alt={`Messi ${variant.name} Variant`}
                              className="w-full h-auto object-contain pointer-events-none select-none"
                              draggable={false}
                              onDragStart={(e) => e.preventDefault()}
                            />
                            {/* Static glare overlay */}
                            <div
                              className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay rounded-lg"
                              style={{
                                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 40%, rgba(255, 255, 255, 0) 70%)',
                                opacity: 0.8
                              }}
                            />
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Stats row */}
                <div className={`px-6 pb-6`}>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className={`text-center p-3 rounded-xl ${
                      isDark ? 'bg-white/5' : 'bg-warm-cream'
                    }`}>
                      <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-warm-brown'}`}>1:100</p>
                      <p className={`text-[10px] uppercase ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>Probabilidad</p>
                    </div>
                    <div className={`text-center p-3 rounded-xl ${
                      isDark ? 'bg-white/5' : 'bg-warm-cream'
                    }`}>
                      <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-warm-brown'}`}>80</p>
                      <p className={`text-[10px] uppercase ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>Total</p>
                    </div>
                    <div className={`text-center p-3 rounded-xl ${
                      isDark ? 'bg-maple/10' : 'bg-maple/10'
                    }`}>
                      <p className={`text-xl font-bold scarcity-glow ${
                        isDark ? 'text-maple' : 'text-maple'
                      }`}>{SCARCITY_COUNT}</p>
                      <p className={`text-[10px] uppercase ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>Encontrados</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={onClose}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]
                      bg-maple text-white hover:bg-maple-dark shadow-lg shadow-maple/20"
                  >
                    ¡Quiero encontrar uno!
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Use portal to render at document body level, avoiding transform issues
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
        className={`relative rounded-2xl overflow-hidden border-2 transition-colors duration-300
          ${isDark
            ? isSelected
              ? 'bg-dark-bg-card border-maple shadow-xl shadow-maple/20'
              : 'bg-dark-bg-card border-dark-border shadow-lg'
            : isSelected
              ? 'bg-white border-maple shadow-xl shadow-maple/20'
              : 'bg-white border-warm-tan/30 shadow-lg'
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

        {/* Product Image */}
        <div className={`relative h-52 sm:h-60 flex items-center justify-center p-5 overflow-hidden transition-colors duration-300
          ${isDark
            ? 'bg-gradient-to-b from-dark-bg-elevated to-dark-bg-card'
            : 'bg-gradient-to-b from-warm-cream to-warm-cream-light'
          }
        `}>
          <div className="relative transition-transform duration-300 ease-out hover:scale-105">
            <img
              src={getAssetPath(product.image)}
              alt={product.name}
              className="h-36 sm:h-44 w-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Reference disclaimer - bottom left of image */}
          <span className={`absolute bottom-3 left-3 text-[9px] z-10 transition-colors duration-300
            ${isDark ? 'text-gray-500' : 'text-warm-gray/60'}
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
              whileTap={quantity > 0 ? { scale: 0.85 } : {}}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
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
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
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
              <h3 className={`text-xl sm:text-2xl font-bold leading-tight transition-colors duration-300
                ${isDark ? 'text-white' : 'text-warm-brown'}
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
                  className="absolute top-0 right-0 flex flex-col items-center cursor-pointer z-10 select-none group"
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
                  {/* Text appears only on hover - moved up 10px (from -mt-1 to -mt-3.5) */}
                  <span className="flex flex-col items-center -mt-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
            <p className={`text-lg sm:text-xl font-semibold mt-3 mb-1 transition-colors duration-300
              ${isDark ? 'text-gray-200' : 'text-warm-brown/80'}
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
          <p className={`text-sm mb-3 leading-relaxed transition-colors duration-300
            ${isDark ? 'text-gray-400' : 'text-warm-gray'}
          `}>
            {product.description}
          </p>

          {/* Specs pills */}
          <div className="flex flex-wrap gap-1.5">
            {product.specs.map((spec, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 text-[11px] font-medium rounded-full transition-colors duration-300
                  ${isDark
                    ? 'bg-dark-surface text-gray-400'
                    : 'bg-warm-cream text-warm-gray'
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
        isDark={isDark}
      />
    </>
  );
};

export default ProductCard;
