import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getAssetPath } from '../utils/assets';

// Spring config for buttery hover feel
const cardSpring = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 0.5,
};

const ProductCard = ({ product, index, quantity, onQuantityChange }) => {
  const { isDark } = useTheme();
  const isSelected = quantity > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -4,
        transition: cardSpring,
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      className={`relative rounded-2xl overflow-hidden border-2 flex flex-col transition-colors duration-300
        ${isDark
          ? isSelected
            ? 'bg-dark-bg-card border-maple shadow-xl shadow-maple/20'
            : 'bg-dark-bg-card border-dark-border shadow-lg hover:shadow-xl hover:border-maple/50'
          : isSelected
            ? 'bg-white border-maple shadow-xl shadow-maple/20'
            : 'bg-white border-warm-tan/30 shadow-lg hover:shadow-xl hover:border-maple/50'
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

      {/* Product Image */}
      <div className={`relative h-44 sm:h-52 flex items-center justify-center p-4 overflow-hidden group transition-colors duration-300
        ${isDark
          ? 'bg-gradient-to-b from-dark-bg-elevated to-dark-bg-card'
          : 'bg-gradient-to-b from-warm-cream to-warm-cream-light'
        }
      `}>
        <div className="relative transition-transform duration-300 ease-out group-hover:scale-105">
          <img
            src={getAssetPath(product.image)}
            alt={product.name}
            className="h-28 sm:h-36 w-auto object-contain drop-shadow-lg"
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

          <motion.span
            key={quantity}
            initial={{ scale: 1.3, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className={`w-5 text-center font-bold text-base tabular-nums
              ${isDark ? 'text-white drop-shadow-lg' : 'text-warm-brown drop-shadow-sm'}
            `}
          >
            {quantity}
          </motion.span>

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
      <div className="flex-1 p-5 sm:p-6 flex flex-col">
        {/* Title */}
        <h3 className={`text-lg sm:text-xl font-bold mb-2 transition-colors duration-300
          ${isDark ? 'text-white' : 'text-warm-brown'}
        `}>
          {product.name}
        </h3>

        {/* Description */}
        <p className={`text-sm mb-4 leading-relaxed transition-colors duration-300
          ${isDark ? 'text-gray-300' : 'text-warm-gray'}
        `}>
          {product.description}
        </p>

        {/* Specs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.specs.map((spec, i) => (
            <span
              key={i}
              className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors duration-300
                ${isDark
                  ? 'bg-dark-surface text-gray-300'
                  : 'bg-warm-cream text-warm-gray'
                }
              `}
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Spacer to push price and controls to bottom */}
        <div className="flex-1" />

        {/* Price + Disclaimer row */}
        <div className="flex items-end justify-between gap-2">
          <p className={`text-2xl sm:text-3xl font-bold transition-colors duration-300
            ${isDark ? 'text-white' : 'text-warm-brown'}
          `}>
            {product.priceFormatted.split(' ')[0]}
          </p>

          {/* Reference image disclaimer */}
          <p className={`text-[10px] leading-tight text-right max-w-[100px] transition-colors duration-300
            ${isDark ? 'text-gray-500' : 'text-warm-gray/60'}
          `}>
            *Imagen de referencia
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
