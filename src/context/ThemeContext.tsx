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
    id: "terracotta",
    name: "Terracotta Red",
    color: "#D17A67",
    hover: "#E39782",
    soft: "rgba(209, 122, 103, 0.18)",
  },
  {
    id: "emerald",
    name: "Emerald Mint",
    color: "#10B981",
    hover: "#34D399",
    soft: "rgba(16, 185, 129, 0.18)",
  },
  {
    id: "violet",
    name: "Royal Violet",
    color: "#8B5CF6",
    hover: "#A78BFA",
    soft: "rgba(139, 92, 246, 0.18)",
  },
  {
    id: "cyan",
    name: "Cyber Cyan",
    color: "#06B6D4",
    hover: "#38BDF8",
    soft: "rgba(6, 182, 212, 0.18)",
  },
  {
    id: "amber",
    name: "Electric Amber",
    color: "#F59E0B",
    hover: "#FBBF24",
    soft: "rgba(245, 158, 11, 0.18)",
  },
  {
    id: "rose",
    name: "Rose Pink",
    color: "#EC4899",
    hover: "#F472B6",
    soft: "rgba(236, 72, 153, 0.18)",
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
      root.style.setProperty("--canvas-bg", "#F8F9FA");
      root.style.setProperty("--surface-bg", "#FFFFFF");
      root.style.setProperty("--surface-muted", "#F1F5F9");
      root.style.setProperty("--border-color", "#E2E8F0");
      root.style.setProperty("--text-main", "#0F172A");
      root.style.setProperty("--text-muted", "#64748B");
    } else {
      root.style.setProperty("--canvas-bg", "#181A18");
      root.style.setProperty("--surface-bg", "#222522");
      root.style.setProperty("--surface-muted", "#2C302C");
      root.style.setProperty("--border-color", "#3B403B");
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
