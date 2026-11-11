"use client";

import { useEffect, useState, type CSSProperties } from "react";

/** Palettes defined in app/globals.css under [data-theme="..."] */
const themes = [
  { id: "slate", label: "Slate & navy", bg: "#f6f7f9", accent: "#1f4e79" },
  { id: "forest", label: "Forest green", bg: "#f5f7f6", accent: "#24584a" },
  { id: "charcoal", label: "Charcoal (dark)", bg: "#15191e", accent: "#5b9bd5" },
] as const;

type ThemeId = (typeof themes)[number]["id"];
const STORAGE_KEY = "theme";

const isTheme = (v: unknown): v is ThemeId => themes.some((t) => t.id === v);

export default function ThemePicker() {
  // null until mounted: the server can't know the saved theme, so we read the
  // value the inline script in layout.tsx already applied to <html>.
  const [theme, setTheme] = useState<ThemeId | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(isTheme(current) ? current : "slate");
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable (private mode) — theme still applies for this visit */
    }
  }, [theme]);

  return (
    <div className="theme-picker" role="radiogroup" aria-label="Colour theme">
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={theme === t.id}
          aria-label={t.label}
          title={t.label}
          className="theme-swatch"
          style={{ "--sw-bg": t.bg, "--sw-accent": t.accent } as CSSProperties}
          onClick={() => setTheme(t.id)}
        />
      ))}
    </div>
  );
}
