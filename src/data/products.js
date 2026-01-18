// Product data for FIFA World Cup 2026 Panini Collection
// Easy to edit - just update the values below

export const products = [
  {
    id: 1,
    name: "Caja Display",
    description: "728 láminas de golpe — arranca con el 74% de tu colección.",
    price: 520000,
    priceFormatted: "$520.000",
    image: "/images/product-box.png",
    specs: ["104 sobres", "728 láminas"],
    badge: "El Atajo",
    popular: true,
    disclaimer: "Imágenes de referencia. El diseño final puede variar según FIFA.",
  },
  {
    id: 2,
    name: "Álbum Pasta Dura",
    description: "Para los verdaderos coleccionistas. Tapa resistente, hecho para durar.",
    price: 69890,
    priceFormatted: "$49.890 - $69.890",
    priceRange: { min: 49890, max: 69890 },
    image: "/images/product-album.png",
    specs: ["112 páginas", "Pasta dura"],
    badge: "Popular",
    popular: true,
    disclaimer: "Imágenes de referencia. El diseño final puede variar según FIFA.",
    priceDisclaimer: true,
  },
  {
    id: 3,
    name: "Álbum Pasta Blanda",
    description: "El clásico de siempre. 112 páginas listas para tu primera figurita.",
    price: 12890,
    priceFormatted: "$12.890",
    image: "/images/product-album.png",
    specs: ["112 páginas", "Pasta blanda"],
    badge: null,
    popular: false,
    disclaimer: "Imágenes de referencia. El diseño final puede variar según FIFA.",
  },
  {
    id: 4,
    name: "Sobre Individual",
    description: "El inicio de tu camino a la gloria. 7 láminas por sobre.",
    price: 4990,
    priceFormatted: "$4.990",
    image: "/images/product-pack-individual.png",
    specs: ["7 láminas", "Edición oficial"],
    badge: null,
    popular: false,
    disclaimer: "Imágenes de referencia. El diseño final puede variar según FIFA.",
  },
];

export const stats = [
  { number: 112, label: "Páginas", suffix: "" },
  { number: 48, label: "Equipos", suffix: "" },
  { number: 7, label: "Por Sobre", suffix: "" },
];

export const socialLinks = [
  {
    name: "WhatsApp",
    icon: "whatsapp",
    url: "https://wa.me/PLACEHOLDER_NUMBER",
    qr: "/images/qr-whatsapp.png",
  },
  {
    name: "Instagram",
    icon: "instagram",
    url: "https://instagram.com/collectpoint",
    qr: "/images/qr-instagram.png",
  },
  {
    name: "Facebook",
    icon: "facebook",
    url: "https://facebook.com/collectpoint",
    qr: "/images/qr-facebook.png",
  },
  {
    name: "TikTok",
    icon: "tiktok",
    url: "https://tiktok.com/@collectpoint",
    qr: "/images/qr-tiktok.png",
  },
];

// WhatsApp configuration
// IMPORTANT: Replace with actual WhatsApp number (include country code without +)
export const WHATSAPP_NUMBER = "PLACEHOLDER_NUMBER"; // e.g., "573001234567"

export const generateWhatsAppLink = (product, userData = null) => {
  let message = `¡Hola! Me interesa:\n\n📦 ${product.name}\n💰 ${product.priceFormatted}\n\n`;

  if (userData) {
    message += `📋 Mis datos:\n`;
    message += `👤 ${userData.name}\n`;
    message += `📱 ${userData.phone}\n`;
    message += `📧 ${userData.email}\n\n`;
  }

  message += `¿Tienen disponibilidad?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Presale status
export const presaleStatus = {
  percentage: 60,
  message: "Estado de la Preventa",
  endDate: "2026-02-02",
};
