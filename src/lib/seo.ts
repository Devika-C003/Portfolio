import { experience, githubUrl, profile } from "@/data/portfolio";

/** Public URL of the site (used for canonical links, sitemap and social previews). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://devikac-portfolio.vercel.app").replace(/\/$/, "");

const current = experience[0];

/** schema.org Person data so search engines understand who the site is about. */
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: SITE_URL,
  image: `${SITE_URL}/devika.jpg`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  worksFor: current ? { "@type": "Organization", name: current.company.split("·")[0].replace(/Pvt Ltd/i, "").trim() } : undefined,
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school.split(",")[0] },
  knowsAbout: ["Python", "Flask", "React", "REST APIs", "PostgreSQL", "Machine Learning"],
  sameAs: [githubUrl, profile.linkedin, profile.leetcode].filter(Boolean),
};
