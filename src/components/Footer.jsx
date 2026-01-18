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
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">

            {/* Left: Trust signals - Panini + FIFA logos */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={img('panini-logo.svg')}
                  alt="Panini"
                  className="h-8 rounded"
                />
                <div className={`w-px h-8 ${isDark ? 'bg-dark-border' : 'bg-warm-gray/30'}`} />
                <img
                  src={img('logo-fifa-worldcup.png')}
                  alt="FIFA World Cup 2026"
                  className="h-12"
                />
              </div>
              <p className={`text-sm text-center md:text-left transition-colors duration-300
                ${isDark ? 'text-gray-400' : 'text-warm-brown'}
              `}>
                <span className="text-zayu">✓</span> Distribuidor autorizado Panini
              </p>
            </div>

            {/* Center: Navigation links */}
            <div className="flex justify-center">
              <nav className="flex items-center gap-8 text-sm">
                <a
                  href="#products"
                  className={`transition-colors duration-200
                    ${isDark
                      ? 'text-gray-400 hover:text-maple'
                      : 'text-warm-gray hover:text-maple'
                    }
                  `}
                >
                  Productos
                </a>
                <a
                  href="#contact"
                  className={`transition-colors duration-200
                    ${isDark
                      ? 'text-gray-400 hover:text-maple'
                      : 'text-warm-gray hover:text-maple'
                    }
                  `}
                >
                  Contacto
                </a>
              </nav>
            </div>

            {/* Right: Legal/copyright */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <p className={`text-xs leading-relaxed transition-colors duration-300
                ${isDark ? 'text-gray-400' : 'text-warm-gray'}
              `}>
                © {currentYear} Collect Point.
                <br />
                Todos los derechos reservados.
              </p>
              <p className={`text-xs mt-2 leading-relaxed transition-colors duration-300
                ${isDark ? 'text-gray-500' : 'text-warm-gray'}
              `}>
                FIFA World Cup 2026™ y Panini®
                <br />
                son marcas registradas.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
