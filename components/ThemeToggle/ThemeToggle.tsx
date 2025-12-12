"use client";

import { useEffect, useState } from "react";
import css from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={css.toggleContainer}
      aria-label={mounted ? `Switch to ${theme === "light" ? "dark" : "light"} mode` : "Toggle theme"}
      type="button"
      data-theme={mounted ? theme : "light"}
      suppressHydrationWarning
    >
      <span className={css.slider}>
        <span className={css.sliderCircle} />
      </span>
    </button>
  );
}
