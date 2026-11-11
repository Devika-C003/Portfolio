"use client";

import { useReveal } from "@/hooks/useReveal";

/** Mount once on the page to enable `.reveal` scroll animations. */
export default function RevealOnScroll() {
  useReveal();
  return null;
}
