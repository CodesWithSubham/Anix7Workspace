// components/ThemeAdder.js

"use client";

import { useEffect } from "react";

export default function ThemeAdder() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    let mode = localStorage.getItem("themeMode");
    let isSystem = mode === "system";

    // If no preference saved, use system preference
    if (!mode) {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      mode = systemPrefersDark ? "dark" : "light";
      isSystem = true;
      localStorage.setItem("themeMode", "system");
    } else if (isSystem) {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      mode = systemPrefersDark ? "dark" : "light";
    }

    root.classList.toggle("dark", mode === "dark");
    root.classList.toggle("system", isSystem);

    const colorClass = localStorage.getItem("themeColor");
    if (colorClass) {
      // Remove old theme color classes
      root.classList.remove(...(root.className.match(/theme\d+/g) || []));
      root.classList.add(colorClass);
    }

    // Wait for DOM updates before accessing computed styles
    setTimeout(() => {
      const rootStyles = getComputedStyle(document.documentElement);
      const themeColor = rootStyles.getPropertyValue("--themeC")?.trim();

      if (themeColor) {
        let themeMeta = document.querySelector<HTMLMetaElement>("meta[name='theme-color']");
        if (!themeMeta) {
          themeMeta = document.createElement("meta");
          themeMeta.name = "theme-color";
          document.head.appendChild(themeMeta);
        }
        themeMeta.setAttribute("content", themeColor);
      }
    }, 0);
  }, []);

  return null;
}
