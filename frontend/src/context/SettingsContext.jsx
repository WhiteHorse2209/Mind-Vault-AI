import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : {
      darkMode: true,
      journalReminders: true,
      aiAlerts: true,
      biometricLock: false,
      privacyMode: false,
      accentColor: 'blue'
    };
  });

  useEffect(() => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
    
    // Apply theme to document
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    // Apply accent color (can be used for CSS variables)
    document.documentElement.setAttribute('data-accent', settings.accentColor);
  }, [settings]);

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setAccentColor = (color) => {
    setSettings(prev => ({ ...prev, accentColor: color }));
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleSetting, setAccentColor }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
