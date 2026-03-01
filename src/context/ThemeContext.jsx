import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

// Get current hour in Colombia (UTC-5)
const getColombiaHour = () => {
  const now = new Date();
  // Colombia is UTC-5, getTimezoneOffset returns minutes (positive for west)
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const colombiaTime = new Date(utcTime - (5 * 60 * 60 * 1000));
  return colombiaTime.getHours();
};

// Determine theme based on Colombia time: dark 6pm-6am, light 6am-6pm
const getTimeBasedTheme = () => {
  const hour = getColombiaHour();
  // Dark mode: 18:00 (6pm) to 05:59 (before 6am)
  return (hour >= 18 || hour < 6) ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check if user manually set a preference
    const stored = localStorage.getItem('collectpoint-theme-manual');
    if (stored) {
      return stored;
    }
    // Otherwise use Colombia time-based default
    return getTimeBasedTheme();
  });

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Check time-based theme every minute (only if no manual preference)
  useEffect(() => {
    const checkTimeBasedTheme = () => {
      const hasManualPref = localStorage.getItem('collectpoint-theme-manual');
      if (!hasManualPref) {
        const timeTheme = getTimeBasedTheme();
        setTheme(timeTheme);
      }
    };

    // Check every minute for time-based theme changes
    const interval = setInterval(checkTimeBasedTheme, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      // Save manual preference when user toggles
      localStorage.setItem('collectpoint-theme-manual', newTheme);
      return newTheme;
    });
  };

  // Reset to auto (time-based) mode
  const resetToAuto = () => {
    localStorage.removeItem('collectpoint-theme-manual');
    setTheme(getTimeBasedTheme());
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    resetToAuto,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
