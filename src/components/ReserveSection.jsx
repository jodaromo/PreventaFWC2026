import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Phone, CheckCircle, AlertCircle, Loader2, RefreshCw,
  MapPin, Gift, CreditCard, Calendar, Truck
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';
import { getAssetPath } from '../utils/assets';

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxSr-KnzROWmdhHSCEjLGVUKojaTwgShiEx0viKdBZDqfT3RtJK323IrVSDBqSVDrgOMw/exec';

// Format currency in Colombian pesos
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Get pasta blanda product info for free gift display
const PASTA_BLANDA_PRODUCT = products.find(p => p.id === 3);
const PASTA_BLANDA_PRICE = PASTA_BLANDA_PRODUCT?.price || 12990;

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
  const [selectedPlan, setSelectedPlan] = useState('flexible'); // 'flexible' (4 payments) or 'rapido' (2 payments)

  // Get selected products from cart prop
  const selectedProducts = products
    .filter(p => cart[p.id] > 0)
    .map(p => ({ ...p, quantity: cart[p.id] }));

  // Check if any products are selected
  const hasProducts = selectedProducts.length > 0;

  // Calculate free albums: 1 free Pasta Blanda per every 2 Cajas
  const boxQuantity = cart[1] || 0;
  const freeAlbumCount = Math.floor(boxQuantity / 2);
  const qualifiesForGift = freeAlbumCount > 0;

  // Calculate totals
  const calculateTotals = () => {
    // Sum of all purchased products
    const productsTotal = selectedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

    // Free albums value (for display purposes - they're free so don't add to total)
    const freeAlbumsValue = freeAlbumCount * PASTA_BLANDA_PRICE;

    // Total to pay is just the products (free albums are... free)
    const totalToPay = productsTotal;

    return {
      productsTotal,
      freeAlbumsValue,
      totalToPay,
      // Payment plans based on total
      flexiblePayment: Math.ceil(totalToPay / 4), // 4 payments
      rapidoPayment: Math.ceil(totalToPay / 2),   // 2 payments
    };
  };

  const totals = calculateTotals();

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
        regaloPastaBlanda: freeAlbumCount, // Number of free albums (1 per 2 boxes)
        totalPagar: totals.totalToPay,
        planPago: selectedPlan === 'flexible' ? '4 cuotas' : '2 cuotas',
        cuotaMensual: selectedPlan === 'flexible' ? totals.flexiblePayment : totals.rapidoPayment,
        direccion: formData.direccion.trim(),
        ciudad: formData.ciudad.trim(),
      };

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

        {/* Main Layout: Form + Summary Side by Side */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">

          {/* Left Column: Contact Form (3/5 width) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
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
                    {/* Personal Info Section */}
                    <div className="space-y-4">
                      <h3 className={`font-semibold text-sm flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
                        <User className="w-4 h-4 text-maple" />
                        Información de Contacto
                      </h3>

                      {/* Nombre Field */}
                      <div>
                        <div className="relative">
                          <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-500' : 'text-warm-gray'}`} />
                          <input
                            type="text"
                            value={formData.nombre}
                            onChange={(e) => handleInputChange('nombre', e.target.value)}
                            placeholder="Tu nombre completo"
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
                    </div>

                    {/* Delivery Section */}
                    <div className="space-y-4 pt-2">
                      <h3 className={`font-semibold text-sm flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
                        <Truck className="w-4 h-4 text-maple" />
                        Dirección de Entrega
                      </h3>

                      {/* Dirección Field */}
                      <div>
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

                      {/* Delivery Timeline Info */}
                      <div className={`flex items-start gap-3 p-3 rounded-xl text-sm ${isDark ? 'bg-dark-surface' : 'bg-warm-cream-light/80'}`}>
                        <Calendar className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                            Entrega: Primera semana de Mayo 2026
                          </p>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            Coincide con el lanzamiento oficial en Colombia
                          </p>
                        </div>
                      </div>
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
                        'Confirmar Reserva'
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
                                {formatCurrency(product.price * product.quantity)}
                              </span>
                            </div>
                          ))}
                          {/* Show gift in success summary */}
                          {qualifiesForGift && (
                            <div className="flex items-center justify-between text-sm">
                              <span className={isDark ? 'text-emerald-300' : 'text-emerald-700'}>
                                +{freeAlbumCount} Álbum{freeAlbumCount > 1 ? 'es' : ''} Pasta Blanda
                              </span>
                              <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                GRATIS
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={`border-t mt-3 pt-3 ${isDark ? 'border-dark-border' : 'border-warm-tan/30'}`}>
                          <div className="flex justify-between items-center">
                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-warm-brown'}`}>Total:</span>
                            <span className="font-bold text-maple">{formatCurrency(totals.totalToPay)}</span>
                          </div>
                          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            Plan: {selectedPlan === 'flexible' ? '4 cuotas' : '2 cuotas'} de {formatCurrency(selectedPlan === 'flexible' ? totals.flexiblePayment : totals.rapidoPayment)}
                          </p>
                          <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
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

          {/* Right Column: Order Summary + Payment Plans (2/5 width) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Order Summary Card */}
            <div className={`rounded-2xl p-5 shadow-lg ${isDark ? 'bg-dark-bg-card' : 'bg-white'}`}>
              <h3 className={`font-semibold text-sm mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                <CreditCard className="w-4 h-4 text-maple" />
                Resumen del Pedido
              </h3>

              {hasProducts ? (
                <div className="space-y-3">
                  {/* Product List */}
                  {selectedProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={scrollToProducts}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 group
                        ${isDark
                          ? 'bg-dark-surface border-dark-border hover:border-maple/50'
                          : 'bg-warm-cream-light/50 border-warm-tan/30 hover:border-maple/50'
                        }
                      `}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white">
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
                          {product.quantity} × {product.priceFormatted}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                          {formatCurrency(product.price * product.quantity)}
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
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 border-dashed
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
                            {freeAlbumCount} Álbum{freeAlbumCount > 1 ? 'es' : ''} Pasta Blanda
                          </p>
                          <p className={`text-xs ${isDark ? 'text-emerald-400/70' : 'text-emerald-600/80'}`}>
                            Regalo por {boxQuantity} Cajas (1 c/2)
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-lg font-bold text-xs flex-shrink-0
                          ${isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}
                        `}>
                          GRATIS
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Subtotal / Total */}
                  <div className={`border-t pt-3 mt-3 ${isDark ? 'border-dark-border' : 'border-warm-tan/30'}`}>
                    {qualifiesForGift && (
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                          Valor del regalo:
                        </span>
                        <span className={`text-xs line-through ${isDark ? 'text-gray-500' : 'text-warm-gray/70'}`}>
                          {formatCurrency(totals.freeAlbumsValue)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        Total a Pagar:
                      </span>
                      <span className="font-bold text-xl text-maple">
                        {formatCurrency(totals.totalToPay)}
                      </span>
                    </div>
                  </div>

                  {/* Add more button */}
                  <button
                    type="button"
                    onClick={scrollToProducts}
                    className={`w-full py-2 text-sm font-medium rounded-lg transition-colors
                      ${isDark
                        ? 'text-maple hover:bg-maple/10'
                        : 'text-maple hover:bg-maple/5'
                      }
                    `}
                  >
                    + Agregar más productos
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={scrollToProducts}
                  className={`w-full p-6 rounded-xl border-2 border-dashed text-center transition-all duration-200
                    ${isDark
                      ? 'border-dark-border hover:border-maple/50 text-gray-400 hover:text-maple'
                      : 'border-warm-tan/50 hover:border-maple/50 text-warm-gray hover:text-maple'
                    }
                  `}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="font-medium">Carrito vacío</p>
                  <p className="text-xs opacity-75 mt-1">Haz clic para seleccionar productos</p>
                </button>
              )}
            </div>

            {/* Payment Plans Card - Always visible */}
            <div className={`rounded-2xl p-5 shadow-lg ${isDark ? 'bg-dark-bg-card' : 'bg-white'}`}>
              <h3 className={`font-semibold text-sm mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                <Calendar className="w-4 h-4 text-maple" />
                Plan de Pago
              </h3>

              <div className="space-y-3">
                {/* Plan Flexible (4 payments) */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan('flexible')}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200
                    ${selectedPlan === 'flexible'
                      ? isDark
                        ? 'border-maple bg-maple/10'
                        : 'border-maple bg-maple/5'
                      : isDark
                        ? 'border-dark-border hover:border-maple/50 bg-dark-surface'
                        : 'border-warm-tan/40 hover:border-maple/50 bg-warm-cream-light/50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${selectedPlan === 'flexible'
                          ? 'border-maple bg-maple'
                          : isDark ? 'border-gray-600' : 'border-warm-tan'
                        }
                      `}>
                        {selectedPlan === 'flexible' && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        Plan Flexible
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-maple/20 text-maple' : 'bg-maple/10 text-maple'}`}>
                      4 cuotas
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-maple">
                    {hasProducts ? formatCurrency(totals.flexiblePayment) : '$130.000'}
                    <span className={`text-xs font-normal ml-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>/ mes</span>
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                    Feb, Mar, Abr, May — primeros 5 días
                  </p>
                </button>

                {/* Plan Rápido (2 payments) */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan('rapido')}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200
                    ${selectedPlan === 'rapido'
                      ? isDark
                        ? 'border-maple bg-maple/10'
                        : 'border-maple bg-maple/5'
                      : isDark
                        ? 'border-dark-border hover:border-maple/50 bg-dark-surface'
                        : 'border-warm-tan/40 hover:border-maple/50 bg-warm-cream-light/50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${selectedPlan === 'rapido'
                          ? 'border-maple bg-maple'
                          : isDark ? 'border-gray-600' : 'border-warm-tan'
                        }
                      `}>
                        {selectedPlan === 'rapido' && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        Plan Rápido
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-maple/20 text-maple' : 'bg-maple/10 text-maple'}`}>
                      2 cuotas
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-maple">
                    {hasProducts ? formatCurrency(totals.rapidoPayment) : '$260.000'}
                    <span className={`text-xs font-normal ml-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>/ mes</span>
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                    Febrero y Abril — primeros 5 días
                  </p>
                </button>
              </div>

              {/* Payment info note */}
              <p className={`text-xs mt-4 ${isDark ? 'text-gray-500' : 'text-warm-gray/70'}`}>
                * El costo del envío es adicional y se coordina al momento de la entrega.
              </p>
            </div>

            {/* Promo Tip - Shows when close to unlocking gift */}
            {boxQuantity === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-4 border-2 border-dashed
                  ${isDark
                    ? 'bg-amber-900/20 border-amber-500/40'
                    : 'bg-amber-50 border-amber-400/50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <Gift className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  <div>
                    <p className={`font-medium text-sm ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                      ¡Estás a 1 caja de un regalo!
                    </p>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-amber-400/70' : 'text-amber-600/80'}`}>
                      Agrega otra Caja Display y recibe 1 Álbum Pasta Blanda gratis.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReserveSection;
