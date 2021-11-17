import { createContext, useEffect, useState } from "react";
import { THEMES } from "../enumerations";

const initialSettings = {
  theme: THEMES.LIGHT,
};

const storage = {
  initialize: () => {
    let settings = { ...initialSettings };

    // Browser Settings
    const browserIsDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (browserIsDarkMode) settings.theme = THEMES.DARK;

    // User Settings
    try {
      const storedSettings = window.localStorage.getItem("settings");
      if (storedSettings) settings = JSON.parse(storedSettings);
    } catch (err) {
      console.error(err);
    }

    return settings;
  },
  save: (settings) => {
    window.localStorage.setItem("settings", JSON.stringify(settings));
  },
};

export const SettingsContext = createContext({
  ...initialSettings,
  save: () => {},
});

export function SettingsProvider(props) {
  const { children } = props;
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const initializedSettings = storage.initialize();
    setSettings({ ...initializedSettings });
  }, []);

  const save = (updatedSettings) => {
    const newSettings = { ...settings, ...updatedSettings };
    setSettings(newSettings);
    storage.save(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ ...settings, save }}>
      {children}
    </SettingsContext.Provider>
  );
}
