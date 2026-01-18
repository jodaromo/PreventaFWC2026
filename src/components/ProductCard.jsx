import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Sparkles, X, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getAssetPath, img } from '../utils/assets';


// Static scarcity counter (placeholder)
const SCARCITY_COUNT = 2;

// Extra Stickers Modal Component - Uses Portal to render at document root
const ExtraStickersModal = ({ isOpen, onClose, isDark }) => {
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
            onClick={onClose}
            className={`fixed inset-0 backdrop-blur-sm z-[9999] ${isDark ? 'bg-black/70' : 'bg-black/50'}`}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-[360px]" onClick={(e) => e.stopPropagation()}>
              {/* Themed modal */}
              <div className={`rounded-2xl overflow-hidden shadow-2xl ${
                isDark
                  ? 'bg-[#1a1a1a] border border-white/10'
                  : 'bg-white border border-warm-tan/30'
              }`}>

                {/* Hero section with card image */}
                <div className={`relative h-48 flex items-center justify-center overflow-hidden ${
                  isDark ? 'bg-black' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                }`}>
                  {/* Card image - centered and properly sized */}
                  <img
                    src={img('card-extra-blue.jpg')}
                    alt="Extra Sticker Blue"
                    className="h-44 w-auto object-contain"
                  />

                  {/* Gradient fade at bottom */}
                  <div className={`absolute bottom-0 left-0 right-0 h-20 ${
                    isDark
                      ? 'bg-gradient-to-t from-[#1a1a1a] to-transparent'
                      : 'bg-gradient-to-t from-white to-transparent'
                  }`} />

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-white/10 hover:bg-white/20"
                  >
                    <X className="w-4 h-4 text-white/70" />
                  </button>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-maple/20 border border-maple/30 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-maple" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-maple">Ultra Raro</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                    Extra Stickers
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                    Las láminas más codiciadas del álbum
                  </p>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className={`text-center p-2.5 rounded-xl ${
                      isDark ? 'bg-white/5' : 'bg-warm-cream'
                    }`}>
                      <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-warm-brown'}`}>1:100</p>
                      <p className={`text-[10px] uppercase ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>Probabilidad</p>
                    </div>
                    <div className={`text-center p-2.5 rounded-xl ${
                      isDark ? 'bg-white/5' : 'bg-warm-cream'
                    }`}>
                      <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-warm-brown'}`}>80</p>
                      <p className={`text-[10px] uppercase ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>Total</p>
                    </div>
                    <div className={`text-center p-2.5 rounded-xl ${
                      isDark ? 'bg-maple/10' : 'bg-maple/10'
                    }`}>
                      <p className={`text-lg font-bold scarcity-glow ${
                        isDark ? 'text-maple' : 'text-maple'
                      }`}>{SCARCITY_COUNT}</p>
                      <p className={`text-[10px] uppercase ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>Encontrados</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]
                      bg-maple text-white hover:bg-maple-dark"
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
                ? 'bg-warm-brown text-white border-warm-brown'
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

        {/* Reference disclaimer - absolute top left of card */}
        <span className={`absolute top-2 left-3 text-[9px] z-20 transition-colors duration-300
          ${isDark ? 'text-gray-500' : 'text-warm-gray/60'}
        `}>
          *Imagen de referencia
        </span>

        {/* Product Image */}
        <div className={`relative h-52 sm:h-60 flex items-center justify-center p-5 overflow-hidden group transition-colors duration-300
          ${isDark
            ? 'bg-gradient-to-b from-dark-bg-elevated to-dark-bg-card'
            : 'bg-gradient-to-b from-warm-cream to-warm-cream-light'
          }
        `}>
          <div className="relative transition-transform duration-300 ease-out group-hover:scale-105">
            <img
              src={getAssetPath(product.image)}
              alt={product.name}
              className="h-36 sm:h-44 w-auto object-contain drop-shadow-lg"
            />
          </div>

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
        <div className="relative p-5 flex flex-col">
          {/* Title + Price block */}
          <div className="mb-3">
            {/* Title row with Extra Stickers button */}
            <div className="flex items-center gap-2">
              <h3 className={`text-xl sm:text-2xl font-bold leading-tight transition-colors duration-300
                ${isDark ? 'text-white' : 'text-warm-brown'}
              `}>
                {product.name}
              </h3>

              {/* Extra Stickers Badge - Only for Caja Display */}
              {isCajaDisplay && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExtraStickersModal(true);
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex flex-col items-center cursor-pointer ml-2"
                >
                  <img
                    src={img('card-extra-blue.jpg')}
                    alt="Extra Sticker"
                    className="w-auto h-10 object-contain drop-shadow-lg -rotate-6 -mb-1"
                    style={{ mixBlendMode: isDark ? 'lighten' : 'multiply' }}
                  />
                  <span className={`text-[8px] font-semibold leading-tight text-center transition-colors
                    ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-warm-gray hover:text-warm-brown'}
                  `}>
                    Extra Stickers
                  </span>
                </motion.button>
              )}
            </div>

            {/* Price - secondary to title */}
            <p className={`text-lg sm:text-xl font-semibold mt-2 transition-colors duration-300
              ${isDark ? 'text-gray-200' : 'text-warm-brown/80'}
            `}>
              {product.priceFormatted}
            </p>

            {/* Price disclaimer marquee - glassmorphism style */}
            {hasPriceDisclaimer && (
              <div className={`mt-1.5 overflow-hidden rounded backdrop-blur-sm border ${
                isDark
                  ? 'bg-white/5 border-white/10'
                  : 'bg-black/5 border-black/10'
              }`}>
                <div className="marquee-container py-0.5">
                  <div className="marquee-track">
                    <span className={`text-[9px] font-medium ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
                      ⚡ Precio no confirmado — se cobra el mayor hasta confirmación
                    </span>
                    <span className={`text-[9px] mx-3 ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>•</span>
                    <span className={`text-[9px] font-medium ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
                      ⚡ Precio no confirmado — se cobra el mayor hasta confirmación
                    </span>
                    <span className={`text-[9px] mx-3 ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>•</span>
                  </div>
                  <div className="marquee-track" aria-hidden="true">
                    <span className={`text-[9px] font-medium ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
                      ⚡ Precio no confirmado — se cobra el mayor hasta confirmación
                    </span>
                    <span className={`text-[9px] mx-3 ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>•</span>
                    <span className={`text-[9px] font-medium ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
                      ⚡ Precio no confirmado — se cobra el mayor hasta confirmación
                    </span>
                    <span className={`text-[9px] mx-3 ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>•</span>
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
