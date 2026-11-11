import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_TITLE = `${profile.name} | ${profile.title} | Python, React & Machine Learning`;
const SITE_DESCRIPTION =
  "Devika C. is a software engineer in Bengaluru building Python, Flask and React software for molecular diagnostics at CrisprBits, and exploring machine learning. View projects, experience and contact details.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: SITE_URL }],
  keywords: ["Devika C", "Software Engineer", "Python", "Flask", "React", "Machine Learning", "Bengaluru", "Portfolio"],
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: `${profile.name} Portfolio`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/devika.jpg", width: 600, height: 750, alt: "Portrait of Devika C." }],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/devika.jpg"],
  },
  robots: { index: true, follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
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
