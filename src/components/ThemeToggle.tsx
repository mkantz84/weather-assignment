"use client";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "theme";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="fixed top-4 right-4 z-50">
      <label className="flex items-center cursor-pointer">
        <Sun className="mr-2 w-5 h-5" />
        <div
          className={`relative w-12 h-6 transition duration-200 ease-in-out ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-300"
          } rounded-full`}
          onClick={toggleTheme}
          role="switch"
          aria-checked={theme === "dark"}
          tabIndex={0}
          style={{ outline: "none" }}
        >
          <div
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
        <Moon className="ml-2 w-5 h-5" />
      </label>
    </div>
  );
}
