import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Mascot color mapping for dynamic text colors
const mascotTextColors = {
  maple: 'text-maple',      // Canada Red #B91C1C
  zayu: 'text-zayu',        // Mexico Green #006847
  clutch: 'text-clutch',    // USA Navy #1E3A8A
};

// Mascot data with full stories and stadiums
const mascots = [
  {
    id: 'maple',
    name: 'Maple',
    country: 'Canadá',
    image: '/images/Maple.avif',
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
    image: '/images/Zayu.avif',
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
    image: '/images/Clutch.avif',
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
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
        {/* Scrollable container with hidden scrollbar */}
        <div
          className="max-h-[85vh] overflow-y-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {/* Hero Header */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${mascot.image})` }}
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

const MascotSection = () => {
  const [activeMascot, setActiveMascot] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDark } = useTheme();
  const carouselRef = useRef(null);

  const nextMascot = () => {
    setCurrentIndex((prev) => (prev + 1) % mascots.length);
  };

  const prevMascot = () => {
    setCurrentIndex((prev) => (prev - 1 + mascots.length) % mascots.length);
  };

  // Handle scroll wheel
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      nextMascot();
    } else {
      prevMascot();
    }
  };

  return (
    <>
      <section id="mascotas" className={`relative flex-1 flex items-center py-16 sm:py-24 px-6 overflow-hidden transition-colors duration-300
        ${isDark
          ? 'bg-gradient-to-b from-dark-bg to-dark-bg-elevated'
          : 'bg-gradient-to-b from-warm-cream to-warm-cream-light'
        }
      `}>
        {/* Soccer Ball Background Images - Switch based on theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Light mode - Light leather ball */}
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700
              ${isDark ? 'opacity-0' : 'opacity-[0.15]'}
            `}
            style={{ backgroundImage: "url('/images/unnamed-3.jpg')" }}
          />
          {/* Dark mode - Dark dramatic ball */}
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700
              ${isDark ? 'opacity-[0.25]' : 'opacity-0'}
            `}
            style={{ backgroundImage: "url('/images/unnamed-6.jpg')" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Stacked Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1"
            >
              <div
                ref={carouselRef}
                onWheel={handleWheel}
                className="relative flex flex-col items-center"
              >
                {/* Stacked cards container */}
                <div className="relative w-[340px] sm:w-[400px] h-[380px] sm:h-[430px] flex items-center justify-center">
                  {mascots.map((mascot, index) => {
                    // Calculate circular offset (-1, 0, 1) wrapping around
                    let offset = index - currentIndex;
                    if (offset > 1) offset = offset - 3;
                    if (offset < -1) offset = offset + 3;

                    const isActive = offset === 0;
                    const isLeft = offset === -1;
                    const isRight = offset === 1;

                    return (
                      <motion.button
                        key={mascot.id}
                        onClick={() => {
                          if (isActive) {
                            setActiveMascot(mascot);
                          } else {
                            setCurrentIndex(index);
                          }
                        }}
                        className="absolute w-[240px] sm:w-[280px] h-[340px] sm:h-[390px] focus:outline-none"
                        animate={{
                          x: isActive ? 0 : isLeft ? -60 : 60,
                          scale: isActive ? 1 : 0.85,
                          zIndex: isActive ? 30 : 10,
                          opacity: isActive ? 1 : 0.5,
                        }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      >
                        <div className={`relative rounded-3xl overflow-hidden h-full w-full shadow-xl
                          ${isActive ? 'shadow-2xl' : 'shadow-lg'}
                          ${isDark ? 'ring-1 ring-white/10' : 'ring-1 ring-black/5'}
                        `}>
                          {/* Mascot Image */}
                          <img
                            src={mascot.image}
                            alt={mascot.name}
                            className="w-full h-full object-cover"
                          />

                          {/* Gradient overlay */}
                          <div className={`absolute inset-0
                            ${isActive
                              ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'
                              : 'bg-black/40'
                            }
                          `} />

                          {/* Flag - top right (active only) */}
                          {isActive && (
                            <div className="absolute top-4 right-4">
                              <span className="text-3xl drop-shadow-lg">{mascot.flag}</span>
                            </div>
                          )}

                          {/* Content at bottom (active only) */}
                          {isActive && (
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-white">{mascot.name}</h3>
                              <p className="text-white/80 text-sm font-medium">{mascot.animal}</p>
                              <p className="text-white/60 text-sm">{mascot.country} • {mascot.stadiums.length} estadios</p>
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Dots indicator */}
                <div className="flex gap-2 mt-4">
                  {mascots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300
                        ${index === currentIndex
                          ? 'bg-maple w-5'
                          : `w-1.5 ${isDark ? 'bg-white/30 hover:bg-white/50' : 'bg-warm-brown/30 hover:bg-warm-brown/50'}`
                        }
                      `}
                    />
                  ))}
                </div>
              </div>
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
                <div className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-default
                  ${isDark
                    ? 'bg-dark-surface/50 border-dark-border hover:border-maple/50 hover:bg-dark-surface'
                    : 'bg-white/60 border-warm-tan/30 hover:border-maple/50 hover:shadow-lg'
                  }
                `}>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl sm:text-4xl">🏟️</div>
                    <div className="flex-1 text-center">
                      <div className={`font-fifa text-2xl sm:text-3xl font-normal ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        16
                      </div>
                      <div className={`text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                        Estadios
                      </div>
                    </div>
                  </div>
                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-maple group-hover:w-1/2 transition-all duration-300 rounded-full" />
                </div>

                {/* Countries */}
                <div className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-default
                  ${isDark
                    ? 'bg-dark-surface/50 border-dark-border hover:border-amber-500/50 hover:bg-dark-surface'
                    : 'bg-white/60 border-warm-tan/30 hover:border-amber-500/50 hover:shadow-lg'
                  }
                `}>
                  <div className="flex items-center gap-3">
                    {/* Flags in triad/triangle format */}
                    <div className="flex flex-col items-center">
                      <span className="text-lg sm:text-xl leading-none">🇲🇽</span>
                      <div className="flex gap-0.5 -mt-0.5">
                        <span className="text-lg sm:text-xl leading-none">🇨🇦</span>
                        <span className="text-lg sm:text-xl leading-none">🇺🇸</span>
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className={`font-fifa text-2xl sm:text-3xl font-normal ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        3
                      </div>
                      <div className={`text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                        Países
                      </div>
                    </div>
                  </div>
                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 group-hover:w-1/2 transition-all duration-300 rounded-full" />
                </div>

                {/* Matches */}
                <div className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-default
                  ${isDark
                    ? 'bg-dark-surface/50 border-dark-border hover:border-indigo-500/50 hover:bg-dark-surface'
                    : 'bg-white/60 border-warm-tan/30 hover:border-indigo-500/50 hover:shadow-lg'
                  }
                `}>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl sm:text-4xl">⚽</div>
                    <div className="flex-1 text-center">
                      <div className={`font-fifa text-2xl sm:text-3xl font-normal ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        104
                      </div>
                      <div className={`text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
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
