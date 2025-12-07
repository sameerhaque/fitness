"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = React.useState(false);

  // Only run on client to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("fitness-theme") as "light" | "dark" | "system" | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const cycleTheme = () => {
    const themes: ("light" | "dark" | "system")[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    setTheme(nextTheme);
    localStorage.setItem("fitness-theme", nextTheme);

    // Apply theme immediately
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (nextTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(nextTheme);
    }

    // Trigger a custom event so the provider knows the theme changed
    window.dispatchEvent(new CustomEvent("theme-change", { detail: nextTheme }));
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="h-9 w-9"
      title={`Current theme: ${theme}`}
    >
      {theme === "light" && <Sun className="h-4 w-4" />}
      {theme === "dark" && <Moon className="h-4 w-4" />}
      {theme === "system" && <Monitor className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}