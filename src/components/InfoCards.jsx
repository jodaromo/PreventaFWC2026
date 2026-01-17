import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, CreditCard, Gift, Calendar } from 'lucide-react';

const infoSections = [
  {
    id: 'extra-stickers',
    icon: Sparkles,
    title: '¿Serás Uno de los Afortunados?',
    subtitle: 'Los "Extra Stickers" Panini',
    color: 'from-amber-500 to-orange-500',
    content: (
      <div className="space-y-4">
        <p className="text-warm-gray">
          En cada caja encontrarás <span className="font-semibold text-warm-brown">1 Extra Sticker</span> (1 cada 100 sobres).
        </p>
        <ul className="space-y-2 text-warm-gray">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">★</span>
            <span>20 jugadores legendarios y rookies</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">★</span>
            <span>Cada jugador tiene 4 variaciones de color</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">★</span>
            <span><span className="font-semibold text-warm-brown">80 láminas ultra-raras</span> que solo los mejores coleccionistas tendrán</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'payment-plans',
    icon: CreditCard,
    title: 'Planes de Pago',
    subtitle: 'Te lo ponemos fácil',
    color: 'from-emerald-500 to-teal-500',
    content: (
      <div className="space-y-6">
        <p className="text-warm-gray text-sm">
          Sabemos que la colección más grande de la historia requiere una inversión, por eso te ofrecemos:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Plan Flexible */}
          <div className="bg-warm-cream rounded-xl p-4 border border-warm-tan/50">
            <p className="font-bold text-warm-brown mb-1">Plan Flexible</p>
            <p className="text-2xl font-bold text-emerald-600 mb-2">4 × $130.000</p>
            <p className="text-warm-gray text-sm">
              Primeros 5 días de cada mes, desde Febrero. Entrega con última cuota (Abril/Mayo).
            </p>
          </div>
          {/* Plan Rápido */}
          <div className="bg-warm-cream rounded-xl p-4 border border-warm-tan/50">
            <p className="font-bold text-warm-brown mb-1">Plan Rápido</p>
            <p className="text-2xl font-bold text-emerald-600 mb-2">2 × $260.000</p>
            <p className="text-warm-gray text-sm">
              Primeros 5 días de Febrero y Abril.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'promo',
    icon: Gift,
    title: 'Promo: 2 Cajas',
    subtitle: 'Regalo especial',
    color: 'from-warm-cta to-warm-coral',
    highlight: true,
    content: (
      <div className="space-y-4">
        <p className="text-warm-gray">
          Lleva <span className="font-bold text-warm-brown">2 Cajas de 104 sobres</span> (contado o financiadas) y te regalamos:
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-warm-cream rounded-lg p-3">
            <span className="text-emerald-500 text-xl">✓</span>
            <span className="font-semibold text-warm-brown">1 Álbum Pasta Blanda GRATIS</span>
          </div>
          <div className="flex items-center gap-3 bg-warm-cream rounded-lg p-3">
            <span className="text-emerald-500 text-xl">✓</span>
            <span className="font-semibold text-warm-brown">Prioridad de Envío</span>
          </div>
        </div>
        <p className="text-warm-gray text-xs mt-4">
          *El costo del envío es adicional. Norte de Bogotá: entrega coordinada disponible.
        </p>
      </div>
    ),
  },
  {
    id: 'timeline',
    icon: Calendar,
    title: 'Cronograma',
    subtitle: 'Fechas clave',
    color: 'from-blue-500 to-indigo-500',
    content: (
      <div className="space-y-4">
        <p className="font-semibold text-warm-brown mb-4">¡Sé el primero en empezar a pegar láminas!</p>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span>🚚</span>
            </div>
            <div>
              <p className="font-semibold text-warm-brown text-sm">Última semana de Abril 2026</p>
              <p className="text-warm-gray text-sm">Recepción en bodega y alistamiento</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span>🇨🇴</span>
            </div>
            <div>
              <p className="font-semibold text-warm-brown text-sm">Primera semana de Mayo 2026</p>
              <p className="text-warm-gray text-sm">Lanzamiento oficial en Colombia + despachos</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <span>🚀</span>
            </div>
            <div>
              <p className="font-semibold text-warm-brown text-sm">Tu Ventaja</p>
              <p className="text-warm-gray text-sm">Mientras otros hacen filas, tú ya tendrás tu colección en camino</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const InfoCard = ({ section, isOpen, onToggle }) => {
  const Icon = section.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
        isOpen ? 'border-warm-cta shadow-xl' : 'border-warm-tan/30 shadow-md hover:shadow-lg hover:border-warm-tan/60'
      } ${section.highlight && !isOpen ? 'ring-2 ring-warm-cta/20' : ''}`}
    >
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center gap-4 text-left"
      >
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-warm-brown text-lg truncate">{section.title}</h3>
          <p className="text-warm-gray text-sm">{section.subtitle}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-6 h-6 text-warm-gray" />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="border-t border-warm-tan/30 pt-5">
                {section.content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InfoCards = () => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-20 px-6 bg-warm-cream">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-warm-brown mb-2">
            Todo lo que Necesitas Saber
          </h2>
          <p className="text-warm-gray">
            Toca cada tarjeta para ver más detalles
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {infoSections.map((section, index) => (
            <InfoCard
              key={section.id}
              section={section}
              isOpen={openId === section.id}
              onToggle={() => handleToggle(section.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
