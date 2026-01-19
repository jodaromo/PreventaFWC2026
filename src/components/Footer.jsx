import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { img } from '../utils/assets';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-12 sm:py-16 px-6 border-t transition-colors duration-300
      ${isDark
        ? 'bg-dark-bg-elevated border-dark-border'
        : 'bg-warm-cream border-warm-tan'
      }
    `}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Main footer content - Centered layout */}
          <div className="flex flex-col items-center gap-6">

            {/* Logos side by side */}
            <div className="flex items-center gap-6">
              <img
                src={img('panini-logo.svg')}
                alt="Panini"
                className="h-10 rounded"
              />
              <div className={`w-px h-12 ${isDark ? 'bg-dark-border' : 'bg-warm-gray/30'}`} />
              <img
                src={img('logo-fifa-worldcup.png')}
                alt="FIFA World Cup 2026"
                className="h-16"
              />
            </div>

            {/* Text below logos */}
            <div className="text-center">
              <p className={`text-sm transition-colors duration-300
                ${isDark ? 'text-gray-400' : 'text-warm-brown'}
              `}>
                <span className="text-zayu">✓</span> Distribuidor autorizado Panini
              </p>
              <p className={`text-xs mt-2 transition-colors duration-300
                ${isDark ? 'text-gray-500' : 'text-warm-gray'}
              `}>
                © {currentYear} Collect Point · FIFA World Cup 2026™ y Panini® son marcas registradas
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
