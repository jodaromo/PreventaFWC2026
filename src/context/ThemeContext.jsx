import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

// Determine theme based on local time: dark 6pm-6am, light 6am-6pm
const getTimeBasedTheme = () => {
  const hour = new Date().getHours();
  // Dark mode: 18:00 (6pm) to 05:59 (before 6am)
  // Light mode: 06:00 (6am) to 17:59 (before 6pm)
  return (hour >= 18 || hour < 6) ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check if user manually set a preference
    const stored = localStorage.getItem('collectpoint-theme-manual');
    if (stored) {
      return stored;
    }
    // Otherwise use local time-based default
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
