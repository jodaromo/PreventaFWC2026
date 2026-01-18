import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate, animate } from 'framer-motion';
import { X, MapPin, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { img } from '../utils/assets';

// Mascot data with full stories and stadiums
const mascots = [
  {
    id: 'maple',
    name: 'Maple',
    country: 'Canadá',
    image: 'Maple.avif',
    flag: '🇨🇦',
    animal: 'Alce',
    color: 'from-red-500 to-red-600',
    story: 'Maple es un alce carismático que representa la majestuosidad de los bosques canadienses. Su nombre viene de la icónica hoja de maple (arce), símbolo nacional que aparece en la bandera de Canadá.',
    culture: 'El alce es uno de los animales más emblemáticos de Canadá, símbolo de la vasta naturaleza del país. Representa fuerza, gracia y la conexión profunda de los canadienses con sus bosques boreales.',
    funFact: '¡Los alces pueden nadar hasta 20km sin parar y sumergirse 6 metros de profundidad! Maple usa esas habilidades para cruzar cualquier defensa... y para encontrar el mejor poutine después del partido.',
    stadiums: [
      {
        name: 'BMO Field',
        city: 'Toronto, Ontario',
        capacity: '30,000',
        mapsUrl: 'https://maps.google.com/?q=43.6326,-79.4186',
        highlight: 'Hogar del Toronto FC',
      },
      {
        name: 'BC Place',
        city: 'Vancouver, Columbia Británica',
        capacity: '54,500',
        mapsUrl: 'https://maps.google.com/?q=49.2768,-123.1117',
        highlight: 'Techo retráctil más grande de Canadá',
      },
    ],
    calendarHighlight: 'Canadá participará en su segundo Mundial de la historia. ¡Y esta vez como anfitrión!',
    matches: '10-13 partidos de fase de grupos en sedes canadienses',
  },
  {
    id: 'zayu',
    name: 'Zayu',
    country: 'México',
    image: 'Zayu.avif',
    flag: '🇲🇽',
    animal: 'Jaguar',
    color: 'from-emerald-500 to-green-600',
    story: 'Zayu es un jaguar vibrante cuyo nombre significa "único" en lengua zapoteca. Representa la rica herencia prehispánica de México y la pasión inigualable por el fútbol.',
    culture: 'El jaguar era considerado el rey de los animales en las civilizaciones maya y azteca, símbolo de poder, valor y conexión con el mundo espiritual.',
    funFact: 'Los jaguares son los únicos grandes felinos que rugen en América. Zayu celebra cada gol con un rugido que se escucha en todo el estadio... ¡y con unos buenos tacos!',
    stadiums: [
      {
        name: 'Estadio Azteca',
        city: 'Ciudad de México',
        capacity: '87,523',
        mapsUrl: 'https://maps.google.com/?q=19.3029,-99.1505',
        highlight: '🏆 PARTIDO INAUGURAL - Único estadio con 3 mundiales',
      },
      {
        name: 'Estadio BBVA',
        city: 'Monterrey, Nuevo León',
        capacity: '53,500',
        mapsUrl: 'https://maps.google.com/?q=25.6699,-100.2446',
        highlight: 'El estadio más moderno de México',
      },
      {
        name: 'Estadio Akron',
        city: 'Guadalajara, Jalisco',
        capacity: '49,850',
        mapsUrl: 'https://maps.google.com/?q=20.6821,-103.4624',
        highlight: 'Hogar de las Chivas, diseño volcánico único',
      },
    ],
    calendarHighlight: '¡México será sede del partido inaugural el 11 de Junio 2026 en el legendario Estadio Azteca!',
    matches: '13 partidos incluyendo el histórico partido inaugural',
  },
  {
    id: 'clutch',
    name: 'Clutch',
    country: 'Estados Unidos',
    image: 'Clutch.avif',
    flag: '🇺🇸',
    animal: 'Águila Calva',
    color: 'from-blue-500 to-blue-600',
    story: 'Clutch es un águila calva dinámica que encarna el espíritu competitivo y la determinación. Su nombre significa "momento decisivo" - ese instante donde todo puede cambiar.',
    culture: 'El águila calva es el ave nacional de Estados Unidos desde 1782, simbolizando libertad, fuerza y visión. Aparece en el escudo nacional y representa los ideales del país.',
    funFact: 'Las águilas calvas pueden ver peces desde 1.5km de altura. Clutch usa esa visión para detectar jugadas de gol antes que nadie... ¡y para encontrar los mejores hot dogs del estadio!',
    stadiums: [
      {
        name: 'MetLife Stadium',
        city: 'East Rutherford, Nueva Jersey',
        capacity: '82,500',
        mapsUrl: 'https://maps.google.com/?q=40.8135,-74.0745',
        highlight: '🏆 SEDE DE LA GRAN FINAL - 19 de Julio 2026',
      },
      {
        name: 'SoFi Stadium',
        city: 'Los Ángeles, California',
        capacity: '70,240',
        mapsUrl: 'https://maps.google.com/?q=33.9535,-118.3392',
        highlight: 'El estadio más caro del mundo ($5.5 mil millones)',
      },
      {
        name: 'AT&T Stadium',
        city: 'Arlington, Texas',
        capacity: '80,000',
        mapsUrl: 'https://maps.google.com/?q=32.7473,-97.0945',
        highlight: 'Pantalla LED más grande del mundo',
      },
      {
        name: 'Hard Rock Stadium',
        city: 'Miami, Florida',
        capacity: '65,326',
        mapsUrl: 'https://maps.google.com/?q=25.9580,-80.2389',
        highlight: 'Sede del Super Bowl y F1 Miami GP',
      },
      {
        name: 'Mercedes-Benz Stadium',
        city: 'Atlanta, Georgia',
        capacity: '71,000',
        mapsUrl: 'https://maps.google.com/?q=33.7554,-84.4010',
        highlight: 'Techo retráctil en forma de cámara',
      },
      {
        name: 'NRG Stadium',
        city: 'Houston, Texas',
        capacity: '72,220',
        mapsUrl: 'https://maps.google.com/?q=29.6847,-95.4107',
        highlight: 'Primer estadio con techo retráctil en la NFL',
      },
      {
        name: "Levi's Stadium",
        city: 'Santa Clara, California',
        capacity: '68,500',
        mapsUrl: 'https://maps.google.com/?q=37.4032,-121.9698',
        highlight: 'En el corazón de Silicon Valley',
      },
      {
        name: 'Lincoln Financial Field',
        city: 'Filadelfia, Pensilvania',
        capacity: '69,176',
        mapsUrl: 'https://maps.google.com/?q=39.9008,-75.1675',
        highlight: 'Hogar de los Eagles, energía legendaria',
      },
      {
        name: 'Arrowhead Stadium',
        city: 'Kansas City, Misuri',
        capacity: '76,416',
        mapsUrl: 'https://maps.google.com/?q=39.0489,-94.4839',
        highlight: 'Los fans más ruidosos de la NFL (142.2 dB récord)',
      },
      {
        name: 'Lumen Field',
        city: 'Seattle, Washington',
        capacity: '68,740',
        mapsUrl: 'https://maps.google.com/?q=47.5952,-122.3316',
        highlight: 'Hogar de los Sounders, campeones MLS',
      },
      {
        name: 'Gillette Stadium',
        city: 'Foxborough, Massachusetts',
        capacity: '65,878',
        mapsUrl: 'https://maps.google.com/?q=42.0909,-71.2643',
        highlight: 'Cerca de Boston, sede de New England Revolution',
      },
    ],
    calendarHighlight: 'Estados Unidos albergará la mayoría de partidos incluyendo la Gran Final el 19 de Julio 2026.',
    matches: '78 partidos incluyendo cuartos, semis y la final',
  },
];

// Mascot Modal Component - Rich & Modern Design
const MascotModal = ({ mascot, onClose, isDark }) => {
  const scrollContainerRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Prevent scroll from bleeding through to page
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // If at boundaries and trying to scroll further, prevent it
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()} // Stop wheel events from reaching page
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`rounded-3xl max-w-lg w-full max-h-[85vh] shadow-2xl overflow-hidden
          ${isDark ? 'bg-dark-bg-card' : 'bg-white'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable container with scroll containment */}
        <div
          ref={scrollContainerRef}
          className="max-h-[85vh] overflow-y-auto overscroll-contain"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {/* Hero Header */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${img(mascot.image)})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Hero text */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                <span className="text-2xl">{mascot.flag}</span>
                <span className="font-medium">{mascot.country} • {mascot.animal}</span>
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight text-white">{mascot.name}</h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Story */}
            <div>
              <h4 className={`text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                📖 Su Historia
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-warm-gray'}`}>
                {mascot.story}
              </p>
            </div>

            {/* Culture */}
            <div>
              <h4 className={`text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                🌎 Significado Cultural
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-warm-gray'}`}>
                {mascot.culture}
              </p>
            </div>

            {/* Fun Fact */}
            <div>
              <h4 className={`text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                🎉 Dato Curioso
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-warm-gray'}`}>
                {mascot.funFact}
              </p>
            </div>

            {/* Calendar */}
            <div>
              <h4 className={`text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                📅 Calendario
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-warm-gray'}`}>
                {mascot.calendarHighlight}
              </p>
              <p className={`text-sm mt-1 font-medium ${isDark ? 'text-maple-light' : 'text-maple'}`}>
                ⚽ {mascot.matches}
              </p>
            </div>

            {/* Stadiums */}
            <div>
              <h4 className={`text-sm font-bold mb-3 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                🏟️ {mascot.stadiums.length} Estadios en {mascot.country}
              </h4>
              <div className="space-y-1">
                {mascot.stadiums.map((stadium, index) => (
                  <a
                    key={index}
                    href={stadium.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between py-2.5 group transition-colors
                      ${isDark ? 'hover:bg-dark-surface/50' : 'hover:bg-warm-cream/80'}
                      rounded-xl px-3 -mx-3
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-maple-light' : 'text-maple'}`} />
                      <div>
                        <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                          {stadium.name}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                          {stadium.city} • {stadium.capacity}
                        </p>
                        {stadium.highlight && (
                          <p className={`text-xs mt-0.5 font-medium ${isDark ? 'text-gray-400' : 'text-warm-brown/70'}`}>
                            {stadium.highlight}
                          </p>
                        )}
                      </div>
                    </div>
                    <ExternalLink className={`w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity
                      ${isDark ? 'text-gray-400' : 'text-warm-gray'}
                    `} />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom spacer for safe scrolling */}
            <div className="h-4" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Individual Mascot Card - Clean animated card with 3D tilt on hover + device orientation
const MascotCard = ({
  mascot,
  position, // -1 (left), 0 (center), 1 (right)
  isDark,
  onSelect,
  onTap,
}) => {
  const cardRef = useRef(null);
  const isCenter = position === 0;

  // ========== COMET CARD 3D TILT EFFECT (Center card only) ==========
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const rotateDepth = 12;
  const tiltRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
  const tiltRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.15) 30%, rgba(255, 255, 255, 0) 70%)`;

  // ========== DEVICE ORIENTATION TILT (Mobile) ==========
  const [orientationEnabled, setOrientationEnabled] = useState(false);

  const handleOrientation = useRef((event) => {
    // beta: front-to-back tilt (-180 to 180, 0 = flat)
    // gamma: left-to-right tilt (-90 to 90, 0 = flat)
    const { beta, gamma } = event;

    if (beta === null || gamma === null) return;

    // Normalize to -0.5 to 0.5 range
    // Phone typically held at ~45-60 deg angle when viewing
    const normalizedY = Math.max(-0.5, Math.min(0.5, (beta - 50) / 60));
    const normalizedX = Math.max(-0.5, Math.min(0.5, gamma / 45));

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  }).current;

  // Request permission on card tap (iOS requires user gesture)
  const requestOrientationPermission = async () => {
    if (orientationEnabled) return;

    // iOS 13+ requires permission request from user gesture
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setOrientationEnabled(true);
          window.addEventListener('deviceorientation', handleOrientation);
        }
      } catch (err) {
        console.log('Device orientation permission denied');
      }
    } else if (window.DeviceOrientationEvent) {
      // Android and older iOS - just enable
      setOrientationEnabled(true);
      window.addEventListener('deviceorientation', handleOrientation);
    }
  };

  // Cleanup orientation listener
  useEffect(() => {
    return () => {
      if (orientationEnabled) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [orientationEnabled, handleOrientation]);

  // Auto-enable on Android (doesn't need permission)
  useEffect(() => {
    if (!isCenter) return;

    // Check if NOT iOS (doesn't have requestPermission)
    const isIOS = typeof DeviceOrientationEvent !== 'undefined' &&
                  typeof DeviceOrientationEvent.requestPermission === 'function';

    if (!isIOS && window.DeviceOrientationEvent && !orientationEnabled) {
      setOrientationEnabled(true);
      window.addEventListener('deviceorientation', handleOrientation);
    }
  }, [isCenter, orientationEnabled, handleOrientation]);

  const handleMouseMove = (e) => {
    if (!isCenter || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Card positioning based on slot
  const getCardStyle = () => {
    if (position === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 30, rotateY: 0 };
    } else if (position === -1) {
      return { x: -120, scale: 0.85, opacity: 0.7, zIndex: 20, rotateY: 15 };
    } else if (position === 1) {
      return { x: 120, scale: 0.85, opacity: 0.7, zIndex: 20, rotateY: -15 };
    }
    // Hidden cards
    return { x: position < 0 ? -200 : 200, scale: 0.7, opacity: 0, zIndex: 10, rotateY: 0 };
  };

  const cardStyle = getCardStyle();

  return (
    <motion.div
      className="absolute w-[240px] sm:w-[280px] h-[340px] sm:h-[390px]"
      style={{ perspective: '1000px' }}
      animate={cardStyle}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
        mass: 1,
      }}
    >
      <motion.button
        ref={cardRef}
        onClick={() => {
          // Request orientation permission on tap (iOS needs user gesture)
          if (isCenter) {
            requestOrientationPermission();
            onSelect();
          } else {
            onTap();
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full focus:outline-none select-none"
        style={{
          rotateX: isCenter ? tiltRotateX : 0,
          rotateY: isCenter ? tiltRotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileHover={isCenter ? { scale: 1.02 } : {}}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`relative rounded-3xl overflow-hidden h-full w-full
          ${isCenter ? 'shadow-2xl' : 'shadow-lg'}
          ${isDark ? 'ring-1 ring-white/10' : 'ring-1 ring-black/5'}
        `}>
          <img
            src={img(mascot.image)}
            alt={mascot.name}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />

          <div className={`absolute inset-0 transition-opacity duration-200
            ${isCenter
              ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'
              : 'bg-black/40'
            }
          `} />

          {/* Glare effect - center card only */}
          {isCenter && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 rounded-3xl mix-blend-overlay"
              style={{ background: glareBackground, opacity: 0.8 }}
            />
          )}

          {/* Flag */}
          <AnimatePresence>
            {isCenter && (
              <motion.div
                className="absolute top-4 right-4 z-20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-3xl drop-shadow-lg">{mascot.flag}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content */}
          <AnimatePresence>
            {isCenter && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-5 z-20"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-white">{mascot.name}</h3>
                <p className="text-white/80 text-sm font-medium">{mascot.animal}</p>
                <p className="text-white/60 text-sm">{mascot.country} • {mascot.stadiums.length} estadios</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </motion.div>
  );
};

// Fluid Carousel with swipe gestures
const MascotCarousel = ({ mascots, currentIndex, setCurrentIndex, setActiveMascot, isDark }) => {
  const containerRef = useRef(null);
  const dragX = useMotionValue(0);
  const dragXSmooth = useSpring(dragX, { stiffness: 300, damping: 30 });

  // Card width for calculating drag distance
  const CARD_WIDTH = 280;
  const SWIPE_THRESHOLD = CARD_WIDTH * 0.25;
  const VELOCITY_THRESHOLD = 300;

  const paginate = (direction) => {
    setCurrentIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return mascots.length - 1;
      if (next >= mascots.length) return 0;
      return next;
    });
  };

  // Calculate position for each card based on current index and drag
  const getPosition = (index) => {
    let diff = index - currentIndex;
    // Handle wrapping for infinite loop feel
    if (diff > mascots.length / 2) diff -= mascots.length;
    if (diff < -mascots.length / 2) diff += mascots.length;
    return diff;
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      {/* Carousel Track */}
      <motion.div
        className="relative w-[340px] sm:w-[400px] h-[380px] sm:h-[430px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDrag={(e, info) => {
          dragX.set(info.offset.x);
        }}
        onDragEnd={(e, info) => {
          const { offset, velocity } = info;

          // Determine direction based on velocity or offset
          if (Math.abs(velocity.x) > VELOCITY_THRESHOLD) {
            paginate(velocity.x > 0 ? -1 : 1);
          } else if (Math.abs(offset.x) > SWIPE_THRESHOLD) {
            paginate(offset.x > 0 ? -1 : 1);
          }

          // Reset drag position
          dragX.set(0);
        }}
        style={{ touchAction: 'pan-y' }}
      >
        {mascots.map((mascot, index) => (
          <MascotCard
            key={mascot.id}
            mascot={mascot}
            position={getPosition(index)}
            isDark={isDark}
            onSelect={() => setActiveMascot(mascot)}
            onTap={() => setCurrentIndex(index)}
          />
        ))}
      </motion.div>

      {/* Minimalist Bottom Navigation: Arrows + Dots */}
      <div className="flex items-center gap-4 mt-6">
        {/* Left Arrow */}
        <motion.button
          onClick={() => paginate(-1)}
          className={`p-1.5 transition-colors ${isDark ? 'text-white/30 hover:text-white/70' : 'text-warm-brown/30 hover:text-warm-brown/70'}`}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous mascot"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {mascots.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-300
                ${index === currentIndex
                  ? 'bg-maple w-4 h-1.5'
                  : `w-1.5 h-1.5 ${isDark ? 'bg-white/25 hover:bg-white/40' : 'bg-warm-brown/25 hover:bg-warm-brown/40'}`
                }
              `}
              aria-label={`Go to mascot ${index + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <motion.button
          onClick={() => paginate(1)}
          className={`p-1.5 transition-colors ${isDark ? 'text-white/30 hover:text-white/70' : 'text-warm-brown/30 hover:text-warm-brown/70'}`}
          whileTap={{ scale: 0.9 }}
          aria-label="Next mascot"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

const MascotSection = () => {
  const [activeMascot, setActiveMascot] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDark } = useTheme();
  const carouselRef = useRef(null);

  // Handle scroll wheel
  const wheelTimeout = useRef(null);

  const paginate = (direction) => {
    setCurrentIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return mascots.length - 1;
      if (next >= mascots.length) return 0;
      return next;
    });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (wheelTimeout.current) return;

      paginate(e.deltaY > 0 ? 1 : -1);

      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = null;
      }, 300);
    };

    carousel.addEventListener('wheel', handleWheel, { passive: false });
    return () => carousel.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <>
      <section id="mascotas" className={`relative flex-1 flex items-center py-16 sm:py-24 px-6 overflow-hidden transition-colors duration-300
        ${isDark
          ? 'bg-gradient-to-b from-dark-bg to-dark-bg-elevated'
          : 'bg-gradient-to-b from-warm-cream to-warm-cream-light'
        }
      `}>
        {/* Soccer Ball Background Images */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700
              ${isDark ? 'opacity-0' : 'opacity-[0.15]'}
            `}
            style={{ backgroundImage: `url('${img('bg-ball-texture-light.jpg')}')` }}
          />
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700
              ${isDark ? 'opacity-[0.25]' : 'opacity-0'}
            `}
            style={{ backgroundImage: `url('${img('bg-ball-texture-dark.jpg')}')` }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Carousel */}
            <motion.div
              ref={carouselRef}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1"
            >
              <MascotCarousel
                mascots={mascots}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                setActiveMascot={setActiveMascot}
                isDark={isDark}
              />
            </motion.div>

            {/* Right Side - Text Content - FIFA Inspired Design */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 relative"
            >
              {/* Decorative FIFA-style dots */}
              <div className="absolute -top-4 -right-4 flex gap-1.5 opacity-40">
                <div className="w-2 h-2 rounded-full bg-maple" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5
                  ${isDark ? 'bg-white/10 text-white/80' : 'bg-warm-brown/10 text-warm-brown'}
                `}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                MASCOTAS OFICIALES FIFA 2026
              </motion.div>

              {/* Main headline - FIFA typography */}
              <h2 className="font-fifa text-4xl sm:text-5xl lg:text-6xl font-normal tracking-wide mb-6 leading-tight">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="inline-block text-maple hover:scale-105 transition-transform cursor-default"
                  title="🇨🇦 Canadá"
                >
                  MAPLE
                </motion.span>
                <span className={`transition-colors duration-300 ${isDark ? 'text-white/40' : 'text-warm-brown/40'}`}> · </span>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="inline-block text-amber-500 hover:scale-105 transition-transform cursor-default"
                  title="🇲🇽 México"
                >
                  ZAYU
                </motion.span>
                <span className={`transition-colors duration-300 ${isDark ? 'text-white/40' : 'text-warm-brown/40'}`}> · </span>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="inline-block text-indigo-500 hover:scale-105 transition-transform cursor-default"
                  title="🇺🇸 Estados Unidos"
                >
                  CLUTCH
                </motion.span>
              </h2>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={`text-base sm:text-lg leading-relaxed mb-8 max-w-md transition-colors duration-300
                  ${isDark ? 'text-gray-300' : 'text-warm-gray'}
                `}
              >
                Por primera vez en la historia, <span className={`font-semibold ${isDark ? 'text-white' : 'text-warm-brown'}`}>tres mascotas</span> representan la pasión de tres naciones anfitrionas.
              </motion.p>

              {/* Stats Grid - Animated */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="grid grid-cols-3 gap-3 sm:gap-4"
              >
                {/* Stadiums */}
                <div className={`group relative p-3 sm:p-4 rounded-2xl border transition-all duration-300 cursor-default
                  ${isDark
                    ? 'bg-dark-surface/50 border-dark-border hover:border-maple/50 hover:bg-dark-surface'
                    : 'bg-white/60 border-warm-tan/30 hover:border-maple/50 hover:shadow-lg'
                  }
                `}>
                  <div className="flex flex-col sm:flex-row items-center sm:gap-3">
                    <div className="text-2xl sm:text-4xl mb-1 sm:mb-0">🏟️</div>
                    <div className="flex-1 text-center">
                      <div className={`font-fifa text-xl sm:text-3xl font-normal ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        16
                      </div>
                      <div className={`text-[10px] sm:text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                        Estadios
                      </div>
                    </div>
                  </div>
                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-maple group-hover:w-1/2 transition-all duration-300 rounded-full" />
                </div>

                {/* Countries */}
                <div className={`group relative p-3 sm:p-4 rounded-2xl border transition-all duration-300 cursor-default
                  ${isDark
                    ? 'bg-dark-surface/50 border-dark-border hover:border-amber-500/50 hover:bg-dark-surface'
                    : 'bg-white/60 border-warm-tan/30 hover:border-amber-500/50 hover:shadow-lg'
                  }
                `}>
                  <div className="flex flex-col sm:flex-row items-center sm:gap-3">
                    {/* Flags in triad/triangle format */}
                    <div className="flex flex-col items-center mb-1 sm:mb-0">
                      <span className="text-sm sm:text-xl leading-none">🇲🇽</span>
                      <div className="flex gap-0.5 -mt-0.5">
                        <span className="text-sm sm:text-xl leading-none">🇨🇦</span>
                        <span className="text-sm sm:text-xl leading-none">🇺🇸</span>
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className={`font-fifa text-xl sm:text-3xl font-normal ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        3
                      </div>
                      <div className={`text-[10px] sm:text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                        Países
                      </div>
                    </div>
                  </div>
                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 group-hover:w-1/2 transition-all duration-300 rounded-full" />
                </div>

                {/* Matches */}
                <div className={`group relative p-3 sm:p-4 rounded-2xl border transition-all duration-300 cursor-default
                  ${isDark
                    ? 'bg-dark-surface/50 border-dark-border hover:border-indigo-500/50 hover:bg-dark-surface'
                    : 'bg-white/60 border-warm-tan/30 hover:border-indigo-500/50 hover:shadow-lg'
                  }
                `}>
                  <div className="flex flex-col sm:flex-row items-center sm:gap-3">
                    <div className="text-2xl sm:text-4xl mb-1 sm:mb-0">⚽</div>
                    <div className="flex-1 text-center">
                      <div className={`font-fifa text-xl sm:text-3xl font-normal ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        104
                      </div>
                      <div className={`text-[10px] sm:text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                        Partidos
                      </div>
                    </div>
                  </div>
                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-500 group-hover:w-1/2 transition-all duration-300 rounded-full" />
                </div>
              </motion.div>

              {/* CTA hint */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className={`text-sm mt-6 flex items-center gap-2 transition-colors duration-300
                  ${isDark ? 'text-gray-500' : 'text-warm-gray/70'}
                `}
              >
                <span className="inline-block w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-[10px]">←</span>
                Toca una mascota para conocer su historia
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeMascot && (
          <MascotModal
            mascot={activeMascot}
            onClose={() => setActiveMascot(null)}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MascotSection;
