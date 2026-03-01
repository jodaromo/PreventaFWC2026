import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { useTheme } from '../context/ThemeContext';
import { img } from '../utils/assets';

const ProductGrid = ({ cart, onQuantityChange }) => {
  const { isDark } = useTheme();
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  // FREE_GIFT_DISABLED - Uncomment to re-enable free gift feature
  // const boxQuantity = cart[1] || 0;
  // const freeAlbumCount = Math.floor(boxQuantity / 2);
  // const qualifiesForGift = freeAlbumCount > 0;

  return (
    <section id="products" className={`relative pt-6 sm:pt-8 pb-10 sm:pb-12 px-4 sm:px-6 transition-colors duration-300
      ${isDark ? 'bg-dark-bg-elevated' : 'bg-warm-cream-light'}
    `}>
      {/* Panini Stickers Background Images - Switch based on theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light mode - Light stickers */}
        <div
          className={`absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat transition-opacity duration-700
            ${isDark ? 'opacity-0' : 'opacity-[0.15]'}
          `}
          style={{ backgroundImage: `url('${img('bg-vintage-stickers-light.jpg')}')` }}
        />
        {/* Dark mode - Dark stickers */}
        <div
          className={`absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat transition-opacity duration-700
            ${isDark ? 'opacity-[0.25]' : 'opacity-0'}
          `}
          style={{ backgroundImage: `url('${img('bg-stickers-dark.jpg')}')` }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Product Grid - No header, flows from StatsBar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              quantity={cart[product.id] || 0}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>

        {/* FREE_GIFT_DISABLED - Uncomment to re-enable free gift banner
        <AnimatePresence>
          {qualifiesForGift && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`mt-8 rounded-2xl p-5 sm:p-6 border-2 border-dashed
                ${isDark
                  ? 'bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 border-emerald-500/50'
                  : 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-400/60'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                  <img
                    src={img('product-album.png')}
                    alt="Álbum Pasta Blanda"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-wider
                      ${isDark ? 'text-emerald-400' : 'text-emerald-600'}
                    `}>
                      Regalo Desbloqueado
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full
                      ${isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}
                    `}>
                      GRATIS
                    </span>
                  </div>
                  <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-emerald-800'}`}>
                    +{freeAlbumCount} Álbum{freeAlbumCount > 1 ? 'es' : ''} Pasta Blanda
                  </p>
                  <p className={`text-sm ${isDark ? 'text-emerald-300/70' : 'text-emerald-600/80'}`}>
                    Por llevar {boxQuantity} Cajas Display (1 gratis cada 2 cajas)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        */}

        {/* FREE_GIFT_DISABLED - Uncomment to re-enable promo tip
        <AnimatePresence>
          {boxQuantity === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-4 rounded-xl p-4 border-2 border-dashed
                ${isDark
                  ? 'bg-maple/10 border-maple/40'
                  : 'bg-maple/5 border-maple/30'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Gift className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-maple' : 'text-maple'}`} />
                <p className={`text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                  <span className="font-semibold">¡Estás a 1 caja de un regalo!</span>
                  <span className={`ml-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                    Agrega otra Caja Display y recibe 1 Álbum Pasta Blanda gratis.
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        */}

        {/* CTA to continue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          {totalItems > 0 ? (
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-bold py-4 px-10 rounded-full shadow-lg
                hover:shadow-xl hover:scale-[1.03]
                active:scale-[0.98] transition-all duration-150 ease-out text-lg
                bg-maple text-white hover:bg-maple-dark
                shadow-maple/25 hover:shadow-maple/40"
            >
              Reservar {totalItems} {totalItems === 1 ? 'producto' : 'productos'} →
            </button>
          ) : (
            <p className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
              Selecciona al menos un producto para continuar
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
