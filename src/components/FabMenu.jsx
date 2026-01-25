import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { img } from '../utils/assets';
import {
  X, Sun, Moon, Share2, MessageCircle,
  Instagram, Facebook, Phone, Mail, ExternalLink
} from 'lucide-react';

// TikTok icon (not in lucide)
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// WhatsApp icon
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FabMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [switching, setSwitching] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const menuRef = useRef(null);

  // Contact info
  const whatsappNumber = '+57 300 123 4567';
  const whatsappLink = 'https://wa.me/573001234567';
  const email = 'info@collectpoint.co';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
        setActiveCard(null);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveCard(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleThemeToggle = () => {
    setSwitching(true);
    toggleTheme();
    setTimeout(() => setSwitching(false), 400);
  };

  const handleSocialClick = () => {
    setActiveCard(activeCard === 'social' ? null : 'social');
  };

  const handleContactClick = () => {
    setActiveCard(activeCard === 'contact' ? null : 'contact');
  };

  const menuItems = [
    {
      id: 'theme',
      icon: isDark ? Sun : Moon,
      label: isDark ? 'Claro' : 'Oscuro',
      onClick: handleThemeToggle,
    },
    {
      id: 'social',
      icon: Share2,
      label: 'Redes',
      onClick: handleSocialClick,
      isActive: activeCard === 'social',
    },
    {
      id: 'contact',
      icon: MessageCircle,
      label: 'Contacto',
      onClick: handleContactClick,
      isActive: activeCard === 'contact',
    },
  ];

  const socialItems = [
    { id: 'instagram', name: 'Instagram', qr: 'qr-instagram.png', icon: Instagram },
    { id: 'facebook', name: 'Facebook', qr: 'qr-facebook.png', icon: Facebook },
    { id: 'tiktok', name: 'TikTok', qr: 'qr-tiktok.png', icon: TikTokIcon },
    { id: 'whatsapp', name: 'WhatsApp', qr: 'qr-whatsapp.png', icon: WhatsAppIcon },
  ];

  const quickSpring = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
    mass: 0.8,
  };

  const smoothSpring = {
    type: 'spring',
    stiffness: 400,
    damping: 28,
    mass: 0.9,
  };

  // Determine if pill should be expanded
  const isExpanded = scrolled || isOpen;

  return (
    <div ref={menuRef} className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
      {/* Main FAB Button (Pill) */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setActiveCard(null);
        }}
        initial={false}
        animate={{
          boxShadow: isOpen
            ? isDark
              ? '0 20px 40px -8px rgba(0,0,0,0.5), 0 8px 16px -4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 20px 40px -8px rgba(0,0,0,0.15), 0 8px 16px -4px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)'
            : isDark
              ? '0 10px 30px -6px rgba(0,0,0,0.4), 0 4px 12px -2px rgba(0,0,0,0.2)'
              : '0 10px 30px -6px rgba(0,0,0,0.1), 0 4px 12px -2px rgba(0,0,0,0.05)',
        }}
        whileHover={{
          scale: 1.04,
          boxShadow: isDark
            ? '0 24px 48px -8px rgba(0,0,0,0.55), 0 12px 24px -4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 24px 48px -8px rgba(0,0,0,0.18), 0 12px 24px -4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)'
        }}
        whileTap={{ scale: 0.96 }}
        transition={quickSpring}
        className={`relative flex items-center gap-2 overflow-hidden cursor-pointer rounded-full backdrop-blur-md will-change-transform transform-gpu
          transition-[padding,background-color] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isExpanded
            ? isDark
              ? 'bg-dark-bg-card/95 pl-1 pr-3 py-1'
              : 'bg-white/95 pl-1 pr-3 py-1'
            : isDark
              ? 'bg-dark-bg-card/60 p-1'
              : 'bg-white/60 p-1'
          }
        `}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        {/* Logo */}
        <div className="relative flex-shrink-0 will-change-transform transform-gpu">
          <img
            src={img('logo-collectpoint.jpg')}
            alt="Collect Point"
            className="w-10 h-10 object-cover rounded-full will-change-transform transform-gpu"
            style={{
              boxShadow: isDark
                ? '0 4px 12px -2px rgba(0,0,0,0.4)'
                : '0 4px 12px -2px rgba(0,0,0,0.15)'
            }}
          />
        </div>

        {/* Text or Close icon */}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, scale: 0.8, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.8, width: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center justify-center overflow-hidden"
            >
              <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`} />
            </motion.div>
          ) : scrolled ? (
            <motion.span
              key="text"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className={`font-semibold text-sm whitespace-nowrap overflow-hidden
                ${isDark ? 'text-white' : 'text-warm-brown'}
              `}
            >
              Collect Point
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              boxShadow: isDark
                ? '0 25px 50px -12px rgba(0,0,0,0.5), 0 12px 24px -8px rgba(0,0,0,0.3)'
                : '0 25px 50px -12px rgba(0,0,0,0.15), 0 12px 24px -8px rgba(0,0,0,0.08)'
            }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={quickSpring}
            className={`absolute top-full right-0 mt-3 rounded-2xl overflow-hidden
              ${isDark
                ? 'bg-dark-bg-card/98 backdrop-blur-xl border border-dark-border/50'
                : 'bg-white/98 backdrop-blur-xl border border-warm-tan/20'
              }
            `}
          >
            <div className="p-2 flex flex-col gap-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    ...quickSpring,
                    delay: index * 0.03,
                  }}
                  onClick={item.onClick}
                  whileHover={{
                    scale: 1.02,
                    x: -3,
                    boxShadow: isDark
                      ? 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 4px 12px -2px rgba(0,0,0,0.3)'
                      : 'inset 0 0 0 1px rgba(0,0,0,0.03), 0 4px 12px -2px rgba(0,0,0,0.08)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl min-w-[140px] transition-colors
                    ${item.isActive
                      ? isDark
                        ? 'bg-maple/20 text-maple shadow-inner'
                        : 'bg-maple/10 text-maple shadow-inner'
                      : isDark
                        ? 'text-gray-300 hover:bg-dark-surface/80 hover:text-white'
                        : 'text-warm-gray hover:bg-warm-cream-light/80 hover:text-warm-brown'
                    }
                  `}
                >
                  <motion.div
                    animate={item.id === 'theme' && switching ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className={`p-1.5 rounded-lg ${
                      item.isActive
                        ? 'bg-maple/20'
                        : isDark ? 'bg-dark-surface/50' : 'bg-warm-tan/10'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                  </motion.div>
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cards */}
      <AnimatePresence>
        {activeCard === 'social' && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.92 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              boxShadow: isDark
                ? '0 32px 64px -16px rgba(0,0,0,0.5), 0 16px 32px -8px rgba(0,0,0,0.3)'
                : '0 32px 64px -16px rgba(0,0,0,0.15), 0 16px 32px -8px rgba(0,0,0,0.08)'
            }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={smoothSpring}
            className={`absolute top-full right-0 w-72 sm:w-80 rounded-2xl overflow-hidden
              ${isDark ? 'bg-dark-bg-card border border-dark-border/50' : 'bg-white border border-warm-tan/20'}
            `}
            style={{ marginTop: isOpen ? '148px' : '12px' }}
          >
            {/* Header */}
            <div className={`p-4 border-b ${isDark ? 'border-dark-border/50' : 'border-warm-tan/15'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`p-2.5 rounded-xl ${isDark ? 'bg-maple/20' : 'bg-maple/10'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      boxShadow: isDark
                        ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px -2px rgba(224,123,76,0.3)'
                        : 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px -2px rgba(224,123,76,0.2)'
                    }}
                  >
                    <Share2 className="w-4 h-4 text-maple" />
                  </motion.div>
                  <div>
                    <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                      Síguenos
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>
                      Escanea el código QR
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setActiveCard(null)}
                  whileHover={{ scale: 1.1, backgroundColor: isDark ? 'rgba(50,56,63,0.8)' : 'rgba(0,0,0,0.05)' }}
                  whileTap={{ scale: 0.9 }}
                  transition={quickSpring}
                  className={`p-2 rounded-xl transition-colors
                    ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-warm-gray hover:text-warm-brown'}
                  `}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* QR Grid */}
            <div className="p-3 grid grid-cols-2 gap-2.5">
              {socialItems.map((social, index) => (
                <motion.div
                  key={social.id}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    ...smoothSpring,
                    delay: index * 0.04,
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: isDark
                      ? '0 8px 24px -4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
                      : '0 8px 24px -4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`group p-3 rounded-xl cursor-pointer transition-colors
                    ${isDark
                      ? 'bg-dark-surface/60 hover:bg-dark-surface'
                      : 'bg-warm-cream-light/40 hover:bg-warm-cream-light/80'
                    }
                  `}
                  style={{
                    boxShadow: isDark
                      ? 'inset 0 1px 0 rgba(255,255,255,0.02), 0 2px 8px -2px rgba(0,0,0,0.2)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px -2px rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <social.icon className={`w-3.5 h-3.5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`} />
                    <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
                      {social.name}
                    </span>
                  </div>
                  <div
                    className="relative aspect-square rounded-lg overflow-hidden bg-white"
                    style={{
                      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06), 0 2px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  >
                    <img
                      src={img(social.qr)}
                      alt={`QR ${social.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeCard === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.92 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              boxShadow: isDark
                ? '0 32px 64px -16px rgba(0,0,0,0.5), 0 16px 32px -8px rgba(0,0,0,0.3)'
                : '0 32px 64px -16px rgba(0,0,0,0.15), 0 16px 32px -8px rgba(0,0,0,0.08)'
            }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={smoothSpring}
            className={`absolute top-full right-0 w-72 rounded-2xl overflow-hidden
              ${isDark ? 'bg-dark-bg-card border border-dark-border/50' : 'bg-white border border-warm-tan/20'}
            `}
            style={{ marginTop: isOpen ? '148px' : '12px' }}
          >
            {/* Header with Logo */}
            <div className={`p-4 border-b ${isDark ? 'border-dark-border/50' : 'border-warm-tan/15'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      boxShadow: isDark
                        ? '0 4px 12px -2px rgba(0,0,0,0.4)'
                        : '0 4px 12px -2px rgba(0,0,0,0.12)'
                    }}
                    className="rounded-xl overflow-hidden"
                  >
                    <img
                      src={img('logo-collectpoint.jpg')}
                      alt="Collect Point"
                      className="w-11 h-11 object-cover"
                    />
                  </motion.div>
                  <div>
                    <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                      Collect Point
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>
                      Contáctanos
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setActiveCard(null)}
                  whileHover={{ scale: 1.1, backgroundColor: isDark ? 'rgba(50,56,63,0.8)' : 'rgba(0,0,0,0.05)' }}
                  whileTap={{ scale: 0.9 }}
                  transition={quickSpring}
                  className={`p-2 rounded-xl transition-colors
                    ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-warm-gray hover:text-warm-brown'}
                  `}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Contact Options */}
            <div className="p-3 space-y-2">
              {/* WhatsApp - Primary CTA */}
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...smoothSpring, delay: 0.03 }}
                whileHover={{
                  scale: 1.02,
                  x: -3,
                  boxShadow: '0 12px 28px -6px rgba(37,211,102,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#25d366] text-white group"
                style={{
                  boxShadow: '0 6px 20px -4px rgba(37,211,102,0.35), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <div
                  className="p-2 bg-white/20 rounded-lg"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">WhatsApp</p>
                  <p className="text-xs text-white/75 truncate">{whatsappNumber}</p>
                </div>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </motion.a>

              {/* Phone */}
              <motion.a
                href={`tel:${whatsappNumber.replace(/\s/g, '')}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...smoothSpring, delay: 0.06 }}
                whileHover={{
                  scale: 1.02,
                  x: -3,
                  boxShadow: isDark
                    ? 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 6px 16px -4px rgba(0,0,0,0.3)'
                    : 'inset 0 0 0 1px rgba(0,0,0,0.03), 0 6px 16px -4px rgba(0,0,0,0.1)'
                }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 p-3.5 rounded-xl group
                  ${isDark
                    ? 'bg-dark-surface/60 hover:bg-dark-surface'
                    : 'bg-warm-cream-light/40 hover:bg-warm-cream-light/80'
                  }
                `}
                style={{
                  boxShadow: isDark
                    ? 'inset 0 1px 0 rgba(255,255,255,0.02), 0 2px 8px -2px rgba(0,0,0,0.15)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px -2px rgba(0,0,0,0.04)'
                }}
              >
                <div className={`p-2 rounded-lg ${isDark ? 'bg-dark-border/50' : 'bg-warm-tan/15'}`}>
                  <Phone className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-warm-brown'}`}>Llamar</p>
                  <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>{whatsappNumber}</p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href={`mailto:${email}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...smoothSpring, delay: 0.09 }}
                whileHover={{
                  scale: 1.02,
                  x: -3,
                  boxShadow: isDark
                    ? 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 6px 16px -4px rgba(0,0,0,0.3)'
                    : 'inset 0 0 0 1px rgba(0,0,0,0.03), 0 6px 16px -4px rgba(0,0,0,0.1)'
                }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 p-3.5 rounded-xl group
                  ${isDark
                    ? 'bg-dark-surface/60 hover:bg-dark-surface'
                    : 'bg-warm-cream-light/40 hover:bg-warm-cream-light/80'
                  }
                `}
                style={{
                  boxShadow: isDark
                    ? 'inset 0 1px 0 rgba(255,255,255,0.02), 0 2px 8px -2px rgba(0,0,0,0.15)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px -2px rgba(0,0,0,0.04)'
                }}
              >
                <div className={`p-2 rounded-lg ${isDark ? 'bg-dark-border/50' : 'bg-warm-tan/15'}`}>
                  <Mail className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-warm-brown'}`}>Email</p>
                  <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>{email}</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FabMenu;
