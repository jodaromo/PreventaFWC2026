import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Phone, CheckCircle, AlertCircle, Loader2, RefreshCw,
  Sparkles, CreditCard, Gift, Calendar, MapPin, ChevronDown, Plus
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';
import { getAssetPath } from '../utils/assets';

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxwcMXQ5VFuqMB9iqV2BqlUUmt0Xx8lMOZcJgZ-gItI0RgrY3ka8ECmMMqcfRUKvlxEqg/exec';

// Info sections data generator (needs isDark for content)
const getInfoSections = (isDark) => [
  {
    id: 'extra-stickers',
    icon: Sparkles,
    title: '¿Serás Uno de los Afortunados?',
    subtitle: 'Los "Extra Stickers" Panini',
    content: (
      <div className="space-y-3">
        <p className={isDark ? 'text-gray-300' : 'text-warm-gray'}>
          Tienes <span className="font-semibold text-maple">1 chance en 100 sobres</span> de encontrar un Extra Sticker.
        </p>
        <div className="space-y-2">
          {[
            '20 jugadores legendarios y rookies',
            'Cada jugador tiene 4 variaciones de color',
            '80 láminas ultra-raras en total'
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg ${isDark ? 'bg-dark-surface' : 'bg-warm-cream-light/80'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-maple flex-shrink-0" />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-warm-gray'}`}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'payment-plans',
    icon: CreditCard,
    title: 'Planes de Pago',
    subtitle: 'Te lo ponemos fácil',
    content: (
      <div className="space-y-3">
        <div className={`rounded-xl p-4 ${isDark ? 'bg-dark-surface' : 'bg-warm-cream-light/80'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>Plan Flexible</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-maple/20 text-maple' : 'bg-maple/10 text-maple'}`}>4 cuotas</span>
          </div>
          <p className="text-xl font-bold text-maple">$130.000 <span className={`text-xs font-normal ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>/ mes</span></p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>Desde Febrero, primeros 5 días del mes</p>
        </div>
        <div className={`rounded-xl p-4 ${isDark ? 'bg-dark-surface' : 'bg-warm-cream-light/80'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>Plan Rápido</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-maple/20 text-maple' : 'bg-maple/10 text-maple'}`}>2 cuotas</span>
          </div>
          <p className="text-xl font-bold text-maple">$260.000 <span className={`text-xs font-normal ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>/ mes</span></p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>Febrero y Abril, primeros 5 días</p>
        </div>
      </div>
    ),
  },
  {
    id: 'promo',
    icon: Gift,
    title: 'Promo: 2 Cajas',
    subtitle: 'Regalo especial',
    highlight: true,
    content: (
      <div className="space-y-3">
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-warm-gray'}`}>
          Lleva <span className="font-semibold text-maple">2 Cajas de 104 sobres</span> y recibe:
        </p>
        <div className="space-y-2">
          {[
            { text: '1 Álbum Pasta Blanda GRATIS', highlight: true },
            { text: 'Prioridad de Envío', highlight: false }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-dark-surface' : 'bg-warm-cream-light/80'}`}>
              <div className="w-5 h-5 rounded-full bg-maple/20 flex items-center justify-center flex-shrink-0">
                <span className="text-maple text-xs">✓</span>
              </div>
              <span className={`text-sm ${item.highlight ? 'font-semibold' : ''} ${isDark ? 'text-white' : 'text-warm-brown'}`}>{item.text}</span>
            </div>
          ))}
        </div>
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-warm-gray/70'}`}>
          *El costo del envío es adicional.
        </p>
      </div>
    ),
  },
  {
    id: 'timeline',
    icon: Calendar,
    title: 'Cronograma',
    subtitle: 'Fechas clave',
    content: (
      <div className="space-y-0">
        {[
          { date: 'Abril 2026', label: 'Recepción en bodega', isLast: false },
          { date: 'Mayo 2026', label: 'Lanzamiento + despachos', isLast: false },
          { date: 'Tu Ventaja', label: 'Mientras otros hacen filas, tú ya tendrás tu colección', isLast: true }
        ].map((item, i) => (
          <div key={i} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-maple flex-shrink-0" />
              {!item.isLast && <div className={`w-0.5 h-full min-h-[40px] ${isDark ? 'bg-dark-border' : 'bg-warm-tan/50'}`} />}
            </div>
            {/* Content */}
            <div className="pb-4">
              <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>{item.date}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

// Expandable Info Card (accordion style) - Unified maple color scheme
const InfoCardAccordion = ({ section, isOpen, onToggle, isDark }) => {
  const Icon = section.icon;

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-200
        ${isDark
          ? isOpen
            ? 'bg-dark-bg-card ring-2 ring-maple shadow-lg shadow-maple/10'
            : 'bg-dark-bg-card ring-1 ring-dark-border hover:ring-maple/40'
          : isOpen
            ? 'bg-white ring-2 ring-maple shadow-lg shadow-maple/10'
            : 'bg-white ring-1 ring-warm-tan/40 shadow-sm hover:ring-maple/40 hover:shadow-md'
        }
      `}
    >
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center gap-4 text-left group"
      >
        {/* Modern gradient icon container */}
        <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 overflow-hidden
          ${isOpen
            ? 'bg-gradient-to-br from-maple to-maple-dark shadow-lg shadow-maple/30'
            : isDark
              ? 'bg-gradient-to-br from-dark-surface to-dark-border group-hover:from-maple/20 group-hover:to-maple/10'
              : 'bg-gradient-to-br from-warm-cream-dark to-warm-tan/50 group-hover:from-maple/15 group-hover:to-maple/5'
          }
        `}>
          {/* Subtle inner glow effect */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
            ${isOpen ? '' : 'bg-gradient-to-br from-maple/10 to-transparent'}
          `} />
          <Icon className={`w-5 h-5 relative z-10 transition-all duration-300
            ${isOpen
              ? 'text-white'
              : isDark
                ? 'text-gray-400 group-hover:text-maple'
                : 'text-warm-gray group-hover:text-maple'
            }
          `} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>{section.title}</h4>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-warm-gray/70'}`}>{section.subtitle}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200
            ${isOpen
              ? 'bg-maple/15'
              : isDark ? 'bg-dark-surface group-hover:bg-dark-border' : 'bg-warm-cream-dark group-hover:bg-warm-tan/50'
            }
          `}
        >
          <ChevronDown className={`w-4 h-4 transition-colors duration-200 ${isOpen ? 'text-maple' : isDark ? 'text-gray-500' : 'text-warm-gray/60'}`} />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReserveSection = ({ cart = {} }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    direccion: '',
    ciudad: '',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [openCardId, setOpenCardId] = useState(null);

  // Get info sections with current theme
  const infoSections = getInfoSections(isDark);

  // Get selected products from cart prop
  const selectedProducts = products
    .filter(p => cart[p.id] > 0)
    .map(p => ({ ...p, quantity: cart[p.id] }));

  // Check if any products are selected
  const hasProducts = selectedProducts.length > 0;

  // Check if user qualifies for free gift (2+ Caja Display = product ID 1)
  const boxQuantity = cart[1] || 0;
  const qualifiesForGift = boxQuantity >= 2;

  const formatProductsSummary = () => {
    return selectedProducts
      .map(p => `${p.quantity}x ${p.name}`)
      .join(', ') || 'Selecciona productos';
  };

  // Scroll to products section
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'El WhatsApp es requerido';
    } else if (!/^[0-9+\s()-]{7,15}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Ingresa un número válido';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    }

    if (!formData.ciudad.trim()) {
      newErrors.ciudad = 'La ciudad es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitStatus('loading');

    try {
      // Get individual product quantities from cart
      // Product IDs: 1=Caja Display, 2=Álbum Pasta Dura, 3=Álbum Pasta Blanda, 4=Sobre Individual
      const payload = {
        nombre: formData.nombre.trim(),
        whatsapp: formData.whatsapp.trim(),
        cajaDisplay: cart[1] || 0,
        albumPastaDura: cart[2] || 0,
        albumPastaBlanda: cart[3] || 0,
        sobreIndividual: cart[4] || 0,
        regaloGratis: qualifiesForGift ? 1 : 0, // Free gift: 1 Album Pasta Blanda if 2+ boxes
        direccion: formData.direccion.trim(),
        ciudad: formData.ciudad.trim(),
      };

      // Note: Google Apps Script Web Apps handle CORS automatically when deployed
      // as "Anyone" can access. We use redirect:follow to handle the redirect properly.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      setSubmitStatus('success');

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleRetry = () => {
    setSubmitStatus('idle');
  };

  const handleNewReservation = () => {
    setFormData({ nombre: '', whatsapp: '', direccion: '', ciudad: '' });
    setSubmitStatus('idle');
  };

  const handleCardToggle = (id) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  // Common input styles
  const inputClassName = (hasError, isDisabled) => `
    w-full pl-12 pr-4 py-3.5 border-2 rounded-xl
    focus:outline-none appearance-none
    ${isDark
      ? `bg-dark-surface border-dark-border text-dark-text placeholder-dark-text-subtle
         focus:border-maple
         ${hasError ? 'border-red-500 focus:border-red-500' : ''}`
      : `bg-white border-warm-tan/50 text-warm-brown placeholder-warm-gray
         focus:border-maple
         ${hasError ? 'border-red-400 focus:border-red-400' : ''}`
    }
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
    transition-colors duration-200
  `;

  return (
    <section id="contact" className={`py-16 sm:py-24 px-6 transition-colors duration-300
      ${isDark ? 'bg-dark-bg-elevated' : 'bg-warm-cream'}
    `}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3
            ${isDark ? 'text-white' : 'text-warm-brown'}
          `}>
            Completa tu <span className="text-maple">Reserva</span>
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-warm-gray'}>
            {hasProducts
              ? formatProductsSummary()
              : 'Completa el formulario con tus datos'
            }
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={`rounded-2xl p-6 sm:p-8 shadow-xl ${isDark ? 'bg-dark-bg-card' : 'bg-white'}`}>
              <AnimatePresence mode="wait">
                {/* Form State: Idle or Loading */}
                {(submitStatus === 'idle' || submitStatus === 'loading') && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {/* Nombre Field */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-warm-brown'}`}>
                        Nombre
                      </label>
                      <div className="relative">
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-500' : 'text-warm-gray'}`} />
                        <input
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => handleInputChange('nombre', e.target.value)}
                          placeholder="Tu nombre"
                          disabled={submitStatus === 'loading'}
                          className={inputClassName(errors.nombre, submitStatus === 'loading')}
                        />
                      </div>
                      {errors.nombre && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.nombre}
                        </motion.p>
                      )}
                    </div>

                    {/* WhatsApp Field */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-warm-brown'}`}>
                        WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-500' : 'text-warm-gray'}`} />
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                          placeholder="300 123 4567"
                          disabled={submitStatus === 'loading'}
                          className={inputClassName(errors.whatsapp, submitStatus === 'loading')}
                        />
                      </div>
                      {errors.whatsapp && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.whatsapp}
                        </motion.p>
                      )}
                    </div>

                    {/* Products Section - Read-only display from cart */}
                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-warm-cream-light border-warm-tan/30'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <label className={`block text-sm font-medium ${isDark ? 'text-gray-400' : 'text-warm-brown'}`}>
                          Productos
                        </label>
                        <button
                          type="button"
                          onClick={scrollToProducts}
                          className={`text-xs font-medium flex items-center gap-1 transition-colors
                            ${isDark ? 'text-maple hover:text-maple-light' : 'text-maple hover:text-maple-dark'}
                          `}
                        >
                          <Plus className="w-3 h-3" />
                          Agregar más
                        </button>
                      </div>

                      {hasProducts ? (
                        <div className="space-y-2">
                          {selectedProducts.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={scrollToProducts}
                              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all duration-200 group
                                ${isDark
                                  ? 'bg-dark-bg-card border-dark-border hover:border-maple/50'
                                  : 'bg-white border-warm-tan/30 hover:border-maple/50'
                                }
                              `}
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-warm-cream-light">
                                <img
                                  src={getAssetPath(product.image)}
                                  alt={product.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                                  {product.name}
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                                  {product.priceFormatted}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                                  ${isDark ? 'bg-maple/20 text-maple' : 'bg-maple/10 text-maple'}
                                `}>
                                  {product.quantity}
                                </span>
                              </div>
                            </button>
                          ))}

                          {/* Free Gift Item - Shows when 2+ boxes */}
                          <AnimatePresence>
                            {qualifiesForGift && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 border-dashed
                                  ${isDark
                                    ? 'bg-emerald-900/20 border-emerald-500/40'
                                    : 'bg-emerald-50 border-emerald-400/50'
                                  }
                                `}
                              >
                                <div className={`w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center
                                  ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}
                                `}>
                                  <Gift className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`font-medium text-sm truncate ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                                    Álbum Pasta Blanda
                                  </p>
                                  <p className={`text-xs ${isDark ? 'text-emerald-400/70' : 'text-emerald-600/80'}`}>
                                    Regalo por {boxQuantity} Cajas
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className={`px-2 py-1 rounded-lg font-bold text-xs
                                    ${isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}
                                  `}>
                                    GRATIS
                                  </span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={scrollToProducts}
                          className={`w-full p-4 rounded-lg border-2 border-dashed text-center transition-all duration-200
                            ${isDark
                              ? 'border-dark-border hover:border-maple/50 text-gray-400 hover:text-maple'
                              : 'border-warm-tan/50 hover:border-maple/50 text-warm-gray hover:text-maple'
                            }
                          `}
                        >
                          <Plus className="w-6 h-6 mx-auto mb-1 opacity-50" />
                          <p className="text-sm font-medium">Seleccionar productos</p>
                          <p className="text-xs opacity-75">Haz clic para ir a la sección de productos</p>
                        </button>
                      )}
                    </div>

                    {/* Dirección Field */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-warm-brown'}`}>
                        Dirección
                      </label>
                      <div className="relative">
                        <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-500' : 'text-warm-gray'}`} />
                        <input
                          type="text"
                          value={formData.direccion}
                          onChange={(e) => handleInputChange('direccion', e.target.value)}
                          placeholder="Calle, número, barrio"
                          disabled={submitStatus === 'loading'}
                          className={inputClassName(errors.direccion, submitStatus === 'loading')}
                        />
                      </div>
                      {errors.direccion && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.direccion}
                        </motion.p>
                      )}
                    </div>

                    {/* Ciudad Field */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-warm-brown'}`}>
                        Ciudad
                      </label>
                      <div className="relative">
                        <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-500' : 'text-warm-gray'}`} />
                        <input
                          type="text"
                          value={formData.ciudad}
                          onChange={(e) => handleInputChange('ciudad', e.target.value)}
                          placeholder="Tu ciudad"
                          disabled={submitStatus === 'loading'}
                          className={inputClassName(errors.ciudad, submitStatus === 'loading')}
                        />
                      </div>
                      {errors.ciudad && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.ciudad}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!hasProducts || submitStatus === 'loading'}
                      className={`w-full py-4 font-semibold rounded-xl transition-all duration-150 ease-out flex items-center justify-center gap-2
                        ${hasProducts && submitStatus !== 'loading'
                          ? 'bg-maple text-white shadow-lg shadow-maple/25 hover:bg-maple-dark hover:shadow-xl hover:shadow-maple/35 hover:scale-[1.02] active:scale-[0.98]'
                          : isDark
                            ? 'bg-dark-surface text-gray-500 cursor-not-allowed'
                            : 'bg-warm-gray/30 text-warm-gray cursor-not-allowed'
                        }
                      `}
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'Enviar Reserva'
                      )}
                    </button>

                    {!hasProducts && (
                      <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                        ↑ Selecciona al menos un producto primero
                      </p>
                    )}
                  </motion.form>
                )}

                {/* Success State */}
                {submitStatus === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </motion.div>

                    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                      ¡Reserva Recibida!
                    </h3>

                    <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-warm-gray'}`}>
                      Te contactaremos en las próximas{' '}
                      <span className="font-semibold text-maple">12 horas hábiles</span>.
                    </p>

                    {/* Selected Products Summary */}
                    {hasProducts && (
                      <div className={`rounded-xl p-4 mb-6 text-left ${isDark ? 'bg-dark-surface' : 'bg-warm-cream-light'}`}>
                        <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>Tu reserva:</p>
                        <div className="space-y-2">
                          {selectedProducts.map((product) => (
                            <div key={product.id} className="flex items-center justify-between text-sm">
                              <span className={isDark ? 'text-white' : 'text-warm-brown'}>
                                {product.quantity}x {product.name}
                              </span>
                              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                                {product.priceFormatted}
                              </span>
                            </div>
                          ))}
                          {/* Show gift in success summary */}
                          {qualifiesForGift && (
                            <div className="flex items-center justify-between text-sm">
                              <span className={isDark ? 'text-emerald-300' : 'text-emerald-700'}>
                                +1 Álbum Pasta Blanda
                              </span>
                              <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                GRATIS
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={`border-t mt-3 pt-3 ${isDark ? 'border-dark-border' : 'border-warm-tan/30'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            📍 {formData.direccion}, {formData.ciudad}
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleNewReservation}
                      className={`text-sm transition-colors flex items-center gap-2 mx-auto ${isDark ? 'text-gray-400 hover:text-white' : 'text-warm-gray hover:text-maple'}`}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Hacer otra reserva
                    </button>
                  </motion.div>
                )}

                {/* Error State */}
                {submitStatus === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                      <AlertCircle className="w-7 h-7 text-red-400" />
                    </div>

                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                      Error al enviar
                    </h3>

                    <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                      Hubo un problema. Por favor intenta de nuevo.
                    </p>

                    <button
                      onClick={handleRetry}
                      className="font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-150 flex items-center gap-2 mx-auto
                        bg-maple text-white shadow-maple/25 hover:bg-maple-dark hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Intentar de nuevo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Privacy note */}
            <p className={`text-center text-xs mt-4 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
              Tus datos solo se usan para contactarte sobre tu pedido.
            </p>
          </motion.div>

          {/* Right: Info Cards (Accordion Style) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
              Todo lo que Necesitas Saber
            </h3>

            <div className="space-y-3">
              {infoSections.map((section) => (
                <InfoCardAccordion
                  key={section.id}
                  section={section}
                  isOpen={openCardId === section.id}
                  onToggle={() => handleCardToggle(section.id)}
                  isDark={isDark}
                />
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReserveSection;
