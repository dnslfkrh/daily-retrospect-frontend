"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeHeader = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const themeColor = resolvedTheme === "dark" ? "#111827" : "#ffffff";
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'theme-color';
      newMeta.content = themeColor;
      document.head.appendChild(newMeta);
    }
  }, [resolvedTheme]);

  return null;
};

export default ThemeHeader;