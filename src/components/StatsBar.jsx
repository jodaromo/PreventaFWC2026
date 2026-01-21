import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { stats } from '../data/products';
import { useTheme } from '../context/ThemeContext';
import { img } from '../utils/assets';

// Pastel colors for each stat
const statColors = [
  'text-[#E07B4C]',      // Coral (same as maple)
  'text-[#6BCB77]',      // Pastel green
  'text-[#4ECDC4]',      // Pastel teal/blue
];

const StatItem = ({ stat, delay, isDark, colorIndex }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();
    const end = stat.number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, stat.number, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-1 ${statColors[colorIndex]}`}>
        {count}{stat.suffix}
      </div>
      <p className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300
        ${isDark ? 'text-gray-400' : 'text-warm-gray'}
      `}>
        {stat.label}
      </p>
    </motion.div>
  );
};

// Animated hero number component
const HeroNumber = ({ target }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2500; // Slightly longer for the big number
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-black leading-none
      bg-gradient-to-br from-maple via-maple-light to-[#FFD93D] bg-clip-text text-transparent
      drop-shadow-2xl"
    >
      {count}
    </span>
  );
};

const StatsBar = () => {
  const { isDark } = useTheme();

  return (
    <section className="relative pt-16 sm:pt-20 pb-10 sm:pb-12 px-6 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${img('bg-collector-hands.jpg')}')` }}
      />

      {/* Overlay for readability - adjusts based on theme */}
      <div className={`absolute inset-0 transition-colors duration-300
        ${isDark
          ? 'bg-dark-bg/85 backdrop-blur-sm'
          : 'bg-warm-cream/80 backdrop-blur-sm'
        }
      `} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Hero Number - 980 with counting animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <HeroNumber target={980} />
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 transition-colors duration-300
            ${isDark ? 'text-white' : 'text-warm-brown'}
          `}>
            Figuritas Te Esperan
          </h2>
          <p className={`text-lg transition-colors duration-300
            ${isDark ? 'text-gray-400' : 'text-warm-gray'}
          `}>
            La colección más grande en la historia del Mundial
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-8 sm:gap-12 mb-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              stat={stat}
              delay={index * 0.15}
              isDark={isDark}
              colorIndex={index % statColors.length}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-16"
        >
          {[
            { text: "Facilidades de pago", color: "text-maple" },
            { text: "Envío a todo Colombia", color: "text-zayu" },
            { text: "Entrega garantizada", color: "text-clutch" },
          ].map((item, index) => (
            <span
              key={index}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-300
                ${isDark
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/70 border-warm-tan/40'
                }
              `}
            >
              <span className={item.color}>✓</span>{' '}
              <span className={isDark ? 'text-gray-300' : 'text-warm-gray'}>{item.text}</span>
            </span>
          ))}
        </motion.div>

        {/* Bridge to Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-maple">
            ¿Listo para completarla?
          </h3>
          <p className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
            Cada coleccionista tiene su estrategia
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBar;
