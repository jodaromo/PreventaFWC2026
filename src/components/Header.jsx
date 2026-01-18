import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { img } from '../utils/assets';

// Sun Icon for Light Mode
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// Moon Icon for Dark Mode
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [switching, setSwitching] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    setSwitching(true);
    toggleTheme();
    setTimeout(() => setSwitching(false), 500);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        {/* Theme Toggle - Left side */}
        <button
          onClick={handleToggle}
          className={`theme-toggle ${switching ? 'switching' : ''} ${
            isDark
              ? 'bg-dark-bg-card text-zayu-gold hover:bg-dark-surface'
              : 'bg-white/90 text-warm-cta hover:bg-warm-cream-dark'
          } shadow-lg backdrop-blur-md`}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Collect Point Logo - Right side (Circle to Pill transition) */}
        <a
          href="#"
          className={`flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
            scrolled
              ? isDark
                ? 'bg-dark-bg-card/95 backdrop-blur-md px-4 py-2 rounded-full border border-dark-border'
                : 'bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-warm-tan/30'
              : 'rounded-full'
          }`}
        >
          <img
            src={img('COLLECTPOINTLOGO.jpg')}
            alt="Collect Point"
            className="w-10 h-10 object-cover rounded-full flex-shrink-0"
          />
          {/* Text appears on scroll */}
          <span
            className={`font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
              isDark ? 'text-white' : 'text-warm-brown'
            } ${scrolled ? 'opacity-100 max-w-[120px]' : 'opacity-0 max-w-0'}`}
          >
            Collect Point
          </span>
        </a>
      </div>
    </header>
  );
};

export default Header;
