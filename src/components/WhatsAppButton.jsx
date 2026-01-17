import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

const WhatsAppButton = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "¡Hola! Me interesa la preventa del álbum FIFA World Cup 2026. ¿Me pueden dar más información?"
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <motion.button
      onClick={openWhatsApp}
      className="whatsapp-float"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />

      {/* Pulse effect */}
      <motion.span
        className="absolute inset-0 bg-whatsapp rounded-full"
        animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.button>
  );
};

export default WhatsAppButton;
