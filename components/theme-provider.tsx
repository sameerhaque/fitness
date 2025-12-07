"use client";

import * as React from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "fitness-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">(defaultTheme);

  React.useEffect(() => {
    const root = window.document.documentElement;

    // Get stored theme or use default
    const storedTheme = localStorage.getItem(storageKey) as "light" | "dark" | "system" | null;
    const initialTheme = storedTheme || defaultTheme;

    const applyTheme = (themeValue: "light" | "dark" | "system") => {
      root.classList.remove("light", "dark");

      if (themeValue === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(themeValue);
      }
    };

    // Apply initial theme
    setTheme(initialTheme);
    applyTheme(initialTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Listen for theme changes from ThemeToggle
    const handleThemeChange = (e: CustomEvent) => {
      setTheme(e.detail);
    };
    window.addEventListener("theme-change", handleThemeChange as EventListener);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("theme-change", handleThemeChange as EventListener);
    };
  }, [theme, defaultTheme, storageKey]);

  // Re-apply theme when it changes
  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  return <>{children}</>;
}