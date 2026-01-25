import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { presaleStatus } from '../data/products';
import { img } from '../utils/assets';
import { quickSpring, ctaButtonHover, ctaButtonTap } from '../utils/animations';

// Custom organic float animation - more natural than CSS keyframes
const floatVariants = {
  animate: {
    y: [0, -12, 0, -8, 0],
    rotate: [0, 0.5, 0, -0.3, 0],
    transition: {
      duration: 6,
      ease: [0.45, 0.05, 0.55, 0.95], // Custom bezier for organic feel
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// Smooth progress bar easing - starts slow, accelerates, then eases out
const progressBarEasing = [0.34, 1.56, 0.64, 1]; // Slight overshoot for satisfying feel

// Calculate dynamic presale percentage and days left based on presaleStatus from products.js
const getPresaleData = () => {
  // Get today's date at midnight (Colombia UTC-5)
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

  // Parse end date as UTC midnight
  const [year, month, day] = presaleStatus.endDate.split('-').map(Number);
  const endDateUTC = new Date(Date.UTC(year, month - 1, day));

  // Calculate days left (difference in days between dates at midnight)
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = endDateUTC - todayUTC;
  const daysLeft = Math.max(0, Math.round(diffMs / msPerDay));

  // Presale period: 22 days total (Jan 17 to Feb 8)
  // Day 0 (Jan 17): 22 days left, 60%
  // Day 22 (Feb 8): 0 days left, 100%
  const totalDays = 22;
  const startPercent = presaleStatus.percentage; // 60%
  const endPercent = 100;
  const percentRange = endPercent - startPercent; // 40%

  // Days elapsed = total days - days left
  const daysElapsed = totalDays - daysLeft;

  // Calculate percentage: start + (elapsed days * percent per day)
  const percentPerDay = percentRange / totalDays; // 2.5% per day
  const currentPercent = Math.round(startPercent + (daysElapsed * percentPerDay));

  return {
    percentage: Math.min(100, Math.max(startPercent, currentPercent)),
    daysLeft: daysLeft
  };
};

const Hero = () => {
  const { isDark } = useTheme();
  const presaleData = getPresaleData();

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMascots = () => {
    document.getElementById('mascotas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`relative h-full min-h-screen flex items-center overflow-hidden px-6 py-20 lg:py-0 transition-colors duration-300
      ${isDark ? 'bg-dark-bg' : 'bg-warm-cream'}
    `}>
      {/* Stadium Background Images - Switch based on theme */}
      {/* Container extends below viewport to hide watermark, then gets clipped */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light mode - Sunny stadium - positioned to crop bottom 10% */}
        <div
          className={`absolute inset-x-0 top-0 bottom-[-10%] bg-cover bg-top bg-no-repeat transition-opacity duration-700
            ${isDark ? 'opacity-0' : 'opacity-100'}
          `}
          style={{ backgroundImage: `url('${img('bg-stadium-light.jpg')}')` }}
        />
        {/* Dark mode - Night stadium - positioned to crop bottom 10% */}
        <div
          className={`absolute inset-x-0 top-0 bottom-[-10%] bg-cover bg-top bg-no-repeat transition-opacity duration-700
            ${isDark ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ backgroundImage: `url('${img('bg-stadium-dark.jpg')}')` }}
        />
        {/* Overlay for text readability */}
        <div
          className={`absolute inset-0 transition-colors duration-300
            ${isDark
              ? 'bg-gradient-to-r from-dark-bg/90 via-dark-bg/60 to-dark-bg/30'
              : 'bg-gradient-to-r from-warm-cream/90 via-warm-cream/65 to-warm-cream/40'
            }
          `}
        />
      </div>

      {/* Subtle gradient orbs - mascot colors in both modes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Maple RED (Canada) */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-maple/10 blur-[120px] animate-pulse"
          style={{ top: '10%', left: '-5%', animationDuration: '8s' }}
        />
        {/* Zayu GREEN (Mexico) */}
        <div
          className="absolute w-[350px] h-[350px] rounded-full bg-zayu/10 blur-[100px] animate-pulse"
          style={{ bottom: '15%', right: '5%', animationDuration: '10s', animationDelay: '2s' }}
        />
        {/* Clutch NAVY (USA) */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-clutch/5 blur-[100px] animate-pulse"
          style={{ top: '50%', right: '20%', animationDuration: '12s', animationDelay: '4s' }}
        />
      </div>

      {/* Main content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* LEFT SIDE - Text Content (7 cols) */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            {/* Content container with FIFA logo on right */}
            <div className="flex items-stretch gap-6 sm:gap-8">
              {/* Left column: Text + Hook + Button */}
              <div className="flex-1 max-w-[520px]">
                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className={`text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight transition-colors duration-300
                    ${isDark ? 'text-white' : 'text-warm-brown'}
                  `}>
                    La Colección
                    <br />
                    <span className="text-maple">Más Grande</span>{' '}
                    <span className={`text-3xl sm:text-4xl md:text-5xl font-semibold ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>de</span>
                  </h1>
                  {/* Panini Logo - full width of container */}
                  <motion.img
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    src={img('panini-logo.svg')}
                    alt="Panini"
                    className="w-full h-auto mt-3 drop-shadow-md"
                  />
                </motion.div>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`text-lg sm:text-xl mb-8 mt-6 leading-relaxed transition-colors duration-300
                    ${isDark ? 'text-gray-300' : 'text-warm-gray'}
                  `}
                >
                  48 selecciones, 980 figuritas y la edición de lujo que todo coleccionista necesita. La historia del fútbol en tus manos.
                </motion.p>

                {/* URGENCY CARD - Full width */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-full"
                >
                  <div className={`rounded-2xl p-5 sm:p-6 border backdrop-blur-sm transition-all duration-300
                    ${isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/70 border-warm-tan/40 shadow-lg'
                    }
                  `}>
                    {/* Top row: Percentage + Closing countdown */}
                    <div className="flex items-center justify-between mb-3">
                      {/* Percentage with "reservado" below */}
                      <div className="flex flex-col">
                        <span className="text-3xl sm:text-4xl font-bold text-maple leading-none">
                          {presaleData.percentage}%
                        </span>
                        <span className={`text-xs font-medium mt-0.5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                          reservado
                        </span>
                      </div>
                      {/* Days countdown badge - two lines with rotating hourglass */}
                      <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2
                        ${presaleData.daysLeft <= 5
                          ? 'bg-red-500/20 text-red-500'
                          : isDark
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-amber-500/20 text-amber-600'
                        }
                      `}>
                        <motion.span
                          className="text-sm inline-block origin-center"
                          animate={{ rotate: [0, 180, 180, 360, 360] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.15, 0.5, 0.65, 1]
                          }}
                        >
                          ⏳
                        </motion.span>
                        <div className="flex flex-col leading-tight">
                          <span className="font-extrabold">{presaleData.daysLeft} días</span>
                          <span className="font-medium opacity-80">para cierre</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className={`w-full h-3 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-warm-tan/50'}`}>
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-maple to-maple-light"
                        initial={{ width: 0, opacity: 0.7 }}
                        animate={{ width: `${presaleData.percentage}%`, opacity: 1 }}
                        transition={{
                          duration: 1.4,
                          delay: 0.7,
                          ease: progressBarEasing,
                          opacity: { duration: 0.3 }
                        }}
                      />
                    </div>

                    {/* Scarcity message */}
                    <p className={`text-sm mt-3 ${isDark ? 'text-gray-500' : 'text-warm-gray/70'}`}>
                      🔥 <span className="font-medium">{100 - presaleData.percentage}% disponible</span> — Los primeros aseguran precio de preventa
                    </p>
                  </div>
                </motion.div>

                {/* CTA Button - Matches hook card width */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="mt-6 w-full"
                >
                  <motion.button
                    onClick={scrollToProducts}
                    whileHover={ctaButtonHover}
                    whileTap={ctaButtonTap}
                    transition={quickSpring}
                    className="w-full font-bold py-5 px-10 rounded-full shadow-lg
                      bg-maple text-white text-xl
                      shadow-maple/25 hover:bg-maple-dark hover:shadow-maple/40 hover:shadow-xl"
                  >
                    Ver productos y reservar
                  </motion.button>
                </motion.div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE - Mascots (5 cols) - 25% bigger */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex items-center justify-center lg:justify-end lg:pr-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              {/* Background glow - mascot colors */}
              <div className="absolute inset-0 blur-3xl rounded-full -z-10 scale-110 bg-gradient-to-br from-maple/20 via-zayu/15 to-clutch/10" />

              {/* Mascots Image - 40% bigger */}
              <motion.img
                src={img('mascots-group.png')}
                alt="Mascotas FIFA World Cup 2026 - Maple, Zayu y Clutch"
                className="h-[25rem] sm:h-[34rem] md:h-[36rem] lg:h-[40rem] w-auto object-contain drop-shadow-2xl"
                variants={floatVariants}
                animate="animate"
              />

              {/* Soft floating accents - mascot colors */}
              <div
                className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-maple/15 blur-2xl animate-pulse"
                style={{ animationDuration: '3s' }}
              />
              <div
                className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-zayu/20 blur-2xl animate-pulse"
                style={{ animationDuration: '4s', animationDelay: '1s' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* FIFA Logo + Mascot link - Bottom right corner (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="hidden sm:flex absolute bottom-6 right-8 lg:right-12 flex-col items-end gap-3"
      >
        {/* FIFA World Cup Logo */}
        <img
          src={img('logo-fifa-worldcup.png')}
          alt="FIFA World Cup 2026"
          className="h-20 md:h-28 lg:h-32 w-auto drop-shadow-lg"
        />

        {/* Mascot link */}
        <motion.button
          onClick={scrollToMascots}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={quickSpring}
          className={`text-sm flex items-center gap-1.5 group
            ${isDark ? 'text-gray-400 hover:text-white' : 'text-warm-gray hover:text-warm-brown'}
          `}
        >
          <span className="relative">
            Conoce las mascotas
            <span className={`absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-200
              ${isDark ? 'bg-white' : 'bg-warm-brown'}
            `} />
          </span>
          <span className="text-base transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </motion.button>
      </motion.div>

      {/* Scroll indicator - Bottom center with organic bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          className={`w-6 h-10 border-2 rounded-full flex items-start justify-center p-2
            ${isDark ? 'border-white/20' : 'border-warm-brown/20'}
          `}
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 2,
            ease: [0.45, 0, 0.55, 1], // Smooth in-out
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <motion.div
            className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/40' : 'bg-warm-brown/40'}`}
            animate={{
              y: [0, 12, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              ease: [0.45, 0, 0.55, 1],
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
