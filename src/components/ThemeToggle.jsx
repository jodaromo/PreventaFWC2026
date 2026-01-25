import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Sun rays configuration
  const sunRays = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    rotation: i * 45,
  }));

  return (
    <motion.button
      onClick={handleClick}
      initial={false}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed top-4 left-4 sm:top-6 sm:left-6 z-50 w-11 h-11 rounded-full flex items-center justify-center
        transition-all duration-300 cursor-pointer
        ${isDark
          ? 'bg-dark-bg-card/90 hover:bg-dark-bg-card border border-dark-border/50 backdrop-blur-glass'
          : 'glass hover:bg-white/90'
        }
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            // Moon icon with rotation animation
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{
                opacity: 1,
                rotate: isAnimating ? 360 : 0,
                scale: 1
              }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                rotate: { duration: 0.5, ease: "easeInOut" }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-yellow-300"
                style={{ filter: 'drop-shadow(0 0 4px rgba(253, 224, 71, 0.5))' }}
              >
                <motion.path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </svg>
              {/* Moon craters for extra detail */}
              <motion.div
                className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-yellow-200/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              <motion.div
                className="absolute bottom-2 right-2.5 w-0.5 h-0.5 rounded-full bg-yellow-200/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              />
            </motion.div>
          ) : (
            // Sun icon with spinning rays
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{
                opacity: 1,
                rotate: isAnimating ? 360 : 0,
                scale: 1
              }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                rotate: { duration: 0.5, ease: "easeInOut" }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Sun core */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-amber-400"
                style={{
                  boxShadow: '0 0 8px 2px rgba(251, 191, 36, 0.5), 0 0 16px 4px rgba(251, 191, 36, 0.3)'
                }}
                animate={isAnimating ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Sun rays - individual animated rays */}
              {sunRays.map((ray, index) => (
                <motion.div
                  key={ray.id}
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{ transform: `rotate(${ray.rotation}deg)` }}
                >
                  <motion.div
                    className="absolute bg-amber-400 rounded-full"
                    style={{
                      width: '2px',
                      height: '4px',
                      top: '1px',
                      boxShadow: '0 0 4px 1px rgba(251, 191, 36, 0.4)',
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{
                      opacity: 1,
                      scaleY: isAnimating ? [1, 1.5, 1] : 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: isAnimating ? index * 0.03 : 0,
                      ease: "easeOut"
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
