import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.title}`,
  description: `${profile.name}, ${profile.title} in Bengaluru. Full-stack developer (React, Python, Flask) exploring AI & Machine Learning.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: restores the saved colour theme (no flash) and
// flags that JS is available so scroll-reveal styles can kick in.
const themeScript = `
document.documentElement.classList.add("js");
try {
  var t = localStorage.getItem("theme");
  if (t) document.documentElement.dataset.theme = t;
} catch (e) {}
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
