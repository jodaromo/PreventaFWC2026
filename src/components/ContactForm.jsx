import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { products } from '../data/products';

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzVxAr5Kbgf5qrOYirg2P6_J9sIKSHkylP1wfBUmf8zQdTXsK0uqnW-LJ7TLDhbWptqg/exec';

const ContactForm = ({ cart }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error

  // Get selected products with quantities
  const selectedProducts = products
    .filter(p => cart[p.id] > 0)
    .map(p => ({ ...p, quantity: cart[p.id] }));

  const hasProducts = selectedProducts.length > 0;

  // Format products for display and submission
  const formatProductsSummary = () => {
    return selectedProducts
      .map(p => `${p.quantity}x ${p.name}`)
      .join(', ');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^[0-9+\s()-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Ingresa un número válido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitStatus('loading');

    try {
      // Prepare products string for Google Sheets
      const productsDetail = selectedProducts
        .map(p => `${p.quantity}x ${p.name} (${p.priceFormatted})`)
        .join(' | ');

      // Prepare data for Google Sheets
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        product: productsDetail,
        productPrice: '', // Price is included in product string
      };

      // Send to Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
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
    setFormData({ name: '', phone: '', email: '' });
    setSubmitStatus('idle');
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 bg-warm-brown">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="headline-section text-warm-cream mb-4">
            Completa tu Reserva
          </h2>
          <p className="subhead text-warm-gray-light">
            {hasProducts
              ? formatProductsSummary()
              : 'Selecciona productos arriba para continuar'
            }
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-warm-brown-light squircle-lg p-8 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {/* Form State: Idle or Loading */}
            {(submitStatus === 'idle' || submitStatus === 'loading') && (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Name Field */}
                <div>
                  <label className="block text-warm-cream/80 text-sm font-medium mb-2">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray pointer-events-none" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tu nombre"
                      disabled={submitStatus === 'loading'}
                      className={`w-full pl-12 pr-4 py-4 bg-warm-brown border-2 border-warm-gray/30 rounded-xl text-warm-cream placeholder-warm-gray
                        focus:outline-none focus:border-warm-cta
                        ${errors.name ? 'border-warm-coral focus:border-warm-coral' : ''}
                        ${submitStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
                        transition-colors duration-200
                      `}
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-warm-coral text-sm flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-warm-cream/80 text-sm font-medium mb-2">
                    Número de teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray pointer-events-none" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="300 123 4567"
                      disabled={submitStatus === 'loading'}
                      className={`w-full pl-12 pr-4 py-4 bg-warm-brown border-2 border-warm-gray/30 rounded-xl text-warm-cream placeholder-warm-gray
                        focus:outline-none focus:border-warm-cta
                        ${errors.phone ? 'border-warm-coral focus:border-warm-coral' : ''}
                        ${submitStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
                        transition-colors duration-200
                      `}
                    />
                  </div>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-warm-coral text-sm flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-warm-cream/80 text-sm font-medium mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray pointer-events-none" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="tu@email.com"
                      disabled={submitStatus === 'loading'}
                      className={`w-full pl-12 pr-4 py-4 bg-warm-brown border-2 border-warm-gray/30 rounded-xl text-warm-cream placeholder-warm-gray
                        focus:outline-none focus:border-warm-cta
                        ${errors.email ? 'border-warm-coral focus:border-warm-coral' : ''}
                        ${submitStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
                        transition-colors duration-200
                      `}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-warm-coral text-sm flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!hasProducts || submitStatus === 'loading'}
                  className={`w-full py-4 font-semibold rounded-xl transition-all duration-150 ease-out flex items-center justify-center gap-2
                    ${hasProducts && submitStatus !== 'loading'
                      ? 'bg-warm-cta text-white shadow-lg shadow-warm-cta/25 hover:bg-warm-cta-hover hover:shadow-xl hover:shadow-warm-cta/35 hover:scale-[1.02] active:scale-[0.98]'
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
                  <p className="text-center text-warm-gray text-sm">
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
                className="text-center py-8"
              >
                <motion.div
                  className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </motion.div>

                <h3 className="text-2xl font-bold text-warm-cream mb-4">
                  ¡Reserva Recibida!
                </h3>

                <p className="text-warm-gray-light text-lg leading-relaxed mb-8">
                  Te contactaremos en las próximas{' '}
                  <span className="text-warm-cta font-semibold">12 horas hábiles</span>{' '}
                  para discutir precios, entrega y método de pago.
                </p>

                {/* Selected Products Summary */}
                {selectedProducts.length > 0 && (
                  <div className="bg-warm-brown squircle p-5 mb-8 text-left">
                    <p className="text-warm-gray text-sm mb-3">Tu reserva:</p>
                    <div className="space-y-3">
                      {selectedProducts.map(p => (
                        <div key={p.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-warm-cta/20 squircle-sm flex items-center justify-center">
                              <span className="text-warm-cta font-bold text-sm">{p.quantity}</span>
                            </div>
                            <span className="text-warm-cream font-medium">{p.name}</span>
                          </div>
                          <span className="text-warm-cta font-semibold">{p.priceFormatted}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info Submitted */}
                <div className="bg-warm-brown/50 squircle p-4 mb-6 text-left text-sm">
                  <p className="text-warm-gray mb-2">Datos enviados:</p>
                  <p className="text-warm-cream">{formData.name}</p>
                  <p className="text-warm-cream/70">{formData.phone}</p>
                  <p className="text-warm-cream/70">{formData.email}</p>
                </div>

                {/* New Reservation Button */}
                <button
                  onClick={handleNewReservation}
                  className="text-warm-gray text-sm hover:text-warm-cream transition-colors flex items-center gap-2 mx-auto"
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
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-warm-coral/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-warm-coral" />
                </div>

                <h3 className="text-xl font-bold text-warm-cream mb-2">
                  Error al enviar
                </h3>

                <p className="text-warm-gray mb-8">
                  Hubo un problema al procesar tu reserva. Por favor intenta de nuevo.
                </p>

                {/* Retry Button */}
                <button
                  onClick={handleRetry}
                  className="bg-warm-cta text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-warm-cta/25 hover:bg-warm-cta-hover hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 mx-auto"
                >
                  <RefreshCw className="w-5 h-5" />
                  Intentar de nuevo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Privacy note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-warm-gray text-xs mt-6"
        >
          Tus datos solo se usan para contactarte sobre tu pedido.
          No compartimos información con terceros.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactForm;
