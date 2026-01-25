import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { img } from '../utils/assets';
import {
  X, Share2, MessageCircle,
  Instagram, Facebook, Mail, ExternalLink
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

// Curved text label that arcs below the bubble - matches the bubble's spherical curve
const CurvedLabel = ({ label, isDark, isActive }) => {
  const id = `curve-${label.replace(/\s/g, '-')}`;

  return (
    <svg
      width="80"
      height="28"
      viewBox="0 0 80 28"
      className="pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Circular arc curving downward - starts at y=2 to be tight to bubble */}
        <path
          id={id}
          d="M 8,2 A 32,32 0 0,0 72,2"
          fill="none"
        />
      </defs>
      <text
        className={`font-semibold uppercase
          ${isActive
            ? 'fill-white'
            : isDark
              ? 'fill-gray-400'
              : 'fill-warm-gray'
          }
        `}
        style={{
          fontSize: '9px',
          letterSpacing: '0.22em',
        }}
      >
        <textPath
          href={`#${id}`}
          startOffset="50%"
          textAnchor="middle"
        >
          {label}
        </textPath>
      </text>
    </svg>
  );
};

// Expanding Bubble Menu Item - iOS 26 liquid glass morphing
const BubbleItem = ({ item, index, total, isOpen, isDark, onClick, isActive, expandedContent }) => {
  const spacing = 72;

  // iOS 26 liquid spring
  const liquidSpring = {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  };

  // Morphing spring - snappy for liquid feel
  const morphSpring = {
    type: 'spring',
    stiffness: 500,
    damping: 35,
    mass: 0.8,
  };

  // Expanded height (fixed value to avoid 'auto' glitch)
  // Social: 400px for 2x2 QR grid + header (QRs need more space)
  // Contact: 180px for WhatsApp + Email (2 items) + header
  const expandedHeight = item.id === 'social' ? 400 : 180;

  return (
    <motion.div
      className="absolute top-0 right-0"
      initial={{
        scale: 0,
        x: 0,
        opacity: 0,
        filter: 'blur(8px)',
      }}
      animate={isOpen ? {
        scale: 1,
        x: -((index + 1) * spacing),
        opacity: 1,
        filter: 'blur(0px)',
      } : {
        scale: 0,
        x: 0,
        opacity: 0,
        filter: 'blur(8px)',
      }}
      transition={{
        ...liquidSpring,
        delay: isOpen ? index * 0.06 : (total - index - 1) * 0.04,
        filter: { duration: 0.15 },
      }}
      style={{ zIndex: isActive ? 50 : 1 }}
    >
      {/* The morphing bubble container */}
      <motion.div
        onClick={!isActive ? onClick : undefined}
        animate={{
          width: isActive ? 280 : 48,
          height: isActive ? expandedHeight : 48,
          borderRadius: 24,
        }}
        transition={morphSpring}
        className={`relative overflow-hidden cursor-pointer
          ${isActive
            ? isDark
              ? 'bg-dark-bg-card/95 backdrop-blur-xl border border-white/10'
              : 'glass-prominent'
            : isDark
              ? 'bg-dark-bg-card/90 backdrop-blur-xl border border-white/10'
              : 'glass'
          }
        `}
        style={{
          boxShadow: isActive
            ? isDark
              ? '0 20px 50px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 20px 50px -10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)'
            : isDark
              ? '0 8px 32px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 8px 32px -4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        {/* Collapsed state - icon */}
        <motion.div
          animate={{
            opacity: isActive ? 0 : 1,
            scale: isActive ? 0.5 : 1,
          }}
          transition={{ duration: 0.15 }}
          className={`absolute inset-0 w-12 h-12 grid place-items-center
            ${isDark ? 'text-gray-300 hover:text-white' : 'text-warm-gray hover:text-warm-brown'}
          `}
          style={{ pointerEvents: isActive ? 'none' : 'auto' }}
        >
          <item.icon className="w-5 h-5" strokeWidth={2} />
        </motion.div>

        {/* Expanded state - content */}
        <motion.div
          animate={{
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="p-4"
          style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        >
          {/* Header with close */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                <item.icon className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-warm-gray'}`} strokeWidth={2} />
              </div>
              <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                {item.title}
              </span>
            </div>
            <motion.button
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-1.5 rounded-full ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-black/5 text-warm-gray'}`}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
          {/* Dynamic content */}
          {expandedContent}
        </motion.div>
      </motion.div>

      {/* Label - instantly hidden when expanded (no animation to prevent drift) */}
      {!isActive && (
        <div
          className="absolute pointer-events-none overflow-visible"
          style={{ top: 35, left: 24, transform: 'translateX(-50%)' }}
        >
          <CurvedLabel
            label={item.label}
            isDark={isDark}
            isActive={false}
          />
        </div>
      )}
    </motion.div>
  );
};

const FabMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const { isDark } = useTheme();
  const menuRef = useRef(null);

  // Contact info
  const whatsappNumber = '+57 300 123 4567';
  const whatsappLink = 'https://wa.me/573001234567';
  const email = 'info@collectpoint.co';

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

  const handleSocialClick = () => {
    setActiveCard(activeCard === 'social' ? null : 'social');
  };

  const handleContactClick = () => {
    setActiveCard(activeCard === 'contact' ? null : 'contact');
  };

  const socialItems = [
    { id: 'instagram', name: 'Instagram', qr: 'qr-instagram.png', icon: Instagram },
    { id: 'facebook', name: 'Facebook', qr: 'qr-facebook.png', icon: Facebook },
    { id: 'tiktok', name: 'TikTok', qr: 'qr-tiktok.png', icon: TikTokIcon },
    { id: 'whatsapp', name: 'WhatsApp', qr: 'qr-whatsapp.png', icon: WhatsAppIcon },
  ];

  // Social content for expanded bubble - no stagger, loads as one unit
  const SocialContent = (
    <div className="grid grid-cols-2 gap-2">
      {socialItems.map((social) => (
        <div
          key={social.id}
          className={`p-2 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} cursor-pointer transition-colors`}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <social.icon className={`w-3 h-3 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`} />
            <span className={`text-[10px] font-medium ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
              {social.name}
            </span>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-white">
            <img src={img(social.qr)} alt={`QR ${social.name}`} className="w-full h-full object-cover" />
          </div>
        </div>
      ))}
    </div>
  );

  // Contact content for expanded bubble - no stagger, loads as one unit
  const ContactContent = (
    <div className="space-y-2">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#25d366] text-white hover:bg-[#20bd5a] transition-colors"
      >
        <WhatsAppIcon className="w-5 h-5" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-xs">WhatsApp</p>
          <p className="text-[10px] text-white/75 truncate">{whatsappNumber}</p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
      </a>
      <a
        href={`mailto:${email}`}
        className={`flex items-center gap-2.5 p-2.5 rounded-xl transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
      >
        <Mail className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`} />
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-xs ${isDark ? 'text-gray-200' : 'text-warm-brown'}`}>Email</p>
          <p className={`text-[10px] truncate ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>{email}</p>
        </div>
      </a>
    </div>
  );

  const menuItems = [
    {
      id: 'social',
      icon: Share2,
      label: 'Redes',
      title: 'Redes',
      onClick: handleSocialClick,
      isActive: activeCard === 'social',
      content: SocialContent,
    },
    {
      id: 'contact',
      icon: MessageCircle,
      label: 'Contacto',
      title: 'Contacto',
      onClick: handleContactClick,
      isActive: activeCard === 'contact',
      content: ContactContent,
    },
  ];

  const quickSpring = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
    mass: 0.8,
  };

  return (
    <div ref={menuRef} className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
      {/* Liquid Glass Container - bubbles flow left from here */}
      <div className="relative">
        {/* Bubble Menu Items - positioned absolutely, flow LEFT */}
        {menuItems.map((item, index) => (
          <BubbleItem
            key={item.id}
            item={item}
            index={index}
            total={menuItems.length}
            isOpen={isOpen}
            isDark={isDark}
            onClick={item.onClick}
            isActive={item.isActive}
            expandedContent={item.content}
          />
        ))}

        {/* Main FAB Button */}
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
          scale: 1.06,
          boxShadow: isDark
            ? '0 24px 48px -8px rgba(0,0,0,0.55), 0 12px 24px -4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 24px 48px -8px rgba(0,0,0,0.18), 0 12px 24px -4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)'
        }}
        whileTap={{ scale: 0.94 }}
        transition={quickSpring}
        className={`relative w-12 h-12 flex items-center justify-center cursor-pointer rounded-full will-change-transform transform-gpu
          ${isDark
            ? 'bg-dark-bg-card/95 backdrop-blur-glass border border-dark-border/50'
            : 'glass'
          }
        `}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`} />
            </motion.div>
          ) : (
            <motion.img
              key="logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              src={img('logo-collectpoint.jpg')}
              alt="Collect Point"
              className="w-10 h-10 object-cover rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Menu label - only when closed */}
      {!isOpen && (
        <div
          className="absolute pointer-events-none left-1/2 -translate-x-1/2 overflow-visible"
          style={{ top: 35 }}
        >
          <CurvedLabel
            label="Menu"
            isDark={isDark}
            isActive={false}
          />
        </div>
      )}
      </div>

    </div>
  );
};

export default FabMenu;
