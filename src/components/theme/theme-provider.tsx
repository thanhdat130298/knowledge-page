"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "kf-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      const initial = stored === "dark" || stored === "light" ? stored : "light";
      setThemeState(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
      document.documentElement.dataset.theme = initial;
      setMounted(true);
    });
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    window.localStorage.setItem(STORAGE_KEY, t);
    document.cookie = `${STORAGE_KEY}=${t};path=/;max-age=31536000;samesite=lax`;
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.dataset.theme = t;
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{ theme: "light", setTheme, toggleTheme }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
