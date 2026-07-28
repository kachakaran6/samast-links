import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "dark" | "light";

export type AccentPreset = {
  id: string;
  name: string;
  color: string;
  hover: string;
  soft: string;
};

export const ACCENT_PRESETS: AccentPreset[] = [
  {
    id: "oxide",
    name: "Oxide (Default)",
    color: "#B85C4D",
    hover: "#984638",
    soft: "rgba(184, 92, 77, 0.18)",
  },
  {
    id: "moss",
    name: "Moss",
    color: "#587D5B",
    hover: "#3F6443",
    soft: "rgba(88, 125, 91, 0.18)",
  },
  {
    id: "ochre",
    name: "Ochre",
    color: "#A97122",
    hover: "#895815",
    soft: "rgba(169, 113, 34, 0.18)",
  },
  {
    id: "ink",
    name: "Ink",
    color: "#3E5145",
    hover: "#2C3B31",
    soft: "rgba(62, 81, 69, 0.18)",
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  accent: AccentPreset;
  setAccent: (accent: AccentPreset) => void;
  accentPresets: AccentPreset[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("lm_theme");
    return (saved as ThemeMode) || "dark";
  });

  const [accent, setAccentState] = useState<AccentPreset>(() => {
    const savedId = localStorage.getItem("lm_accent_id");
    const found = ACCENT_PRESETS.find((p) => p.id === savedId);
    return found || ACCENT_PRESETS[0];
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("lm_theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const setAccent = (newAccent: AccentPreset) => {
    setAccentState(newAccent);
    localStorage.setItem("lm_accent_id", newAccent.id);
  };

  // Apply CSS class & CSS custom properties to html element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    if (theme === "light") {
      root.style.setProperty("--canvas-bg", "#F7F4EE");
      root.style.setProperty("--surface-bg", "#FFFCF6");
      root.style.setProperty("--surface-muted", "#EEEAE1");
      root.style.setProperty("--border-color", "#DCD7CE");
      root.style.setProperty("--text-main", "#242824");
      root.style.setProperty("--text-muted", "#626861");
    } else {
      root.style.setProperty("--canvas-bg", "#181A18");
      root.style.setProperty("--surface-bg", "#222522");
      root.style.setProperty("--surface-muted", "#2C302C");
      root.style.setProperty("--border-color", "#3A3E3A");
      root.style.setProperty("--text-main", "#F4F0E8");
      root.style.setProperty("--text-muted", "#B5BAB2");
    }

    // Set accent color custom properties
    root.style.setProperty("--accent-color", accent.color);
    root.style.setProperty("--accent-hover", accent.hover);
    root.style.setProperty("--accent-soft", accent.soft);
  }, [theme, accent]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        accent,
        setAccent,
        accentPresets: ACCENT_PRESETS,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
