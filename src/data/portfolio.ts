// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no need to touch the components.
// ─────────────────────────────────────────────────────────────

export type SkillId =
  | "react"
  | "typescript"
  | "javascript"
  | "html"
  | "css"
  | "redux"
  | "antd"
  | "tailwind"
  | "python"
  | "flask"
  | "restapi"
  | "graphql"
  | "sqlalchemy"
  | "postgresql"
  | "mysql"
  | "sqlite"
  | "ml"
  | "pandas"
  | "numpy"
  | "sklearn"
  | "tensorflow"
  | "keras"
  | "jupyter"
  | "dataviz"
  | "plotly"
  | "git"
  | "github"
  | "gcp"
  | "docker"
  | "linux"
  | "postman"
  | "pytest"
  | "agile"
  | "jira"
  | "uiux"
  | "figma"
  | "wordpress";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  /** Live demo or repo link */
  link: string;
}

export interface Experience {
  /** Shown as a tag on the card */
  kind: "full-time" | "internship";
  role: string;
  company: string;
  /** Optional: leave out to hide the date beside the timeline */
  period?: string;
  /** One-line description shown under the company name */
  summary?: string;
  /** Bullet points describing what you did */
  points: string[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  /** Small "available" pill in the hero; remove to hide it */
  availability?: string;
  about: string;
  location: string;
  githubUsername: string;
  email: string;
  /**
   * WhatsApp number with country code, digits only or with spaces/+, e.g. "+91 98765 43210".
   * A wa.me link also works. Leave "" to hide every WhatsApp button.
   */
  whatsapp: string;
  /** Pre-filled first message when someone opens the WhatsApp chat */
  whatsappMessage: string;
  linkedin: string;
  /** Full profile URLs; leave "" to hide */
  leetcode: string;
  hackerrank: string;
  /** Put your resume at public/resume.pdf */
  resumeUrl: string;
  education: {
    degree: string;
    /** Field of study, shown as its own line */
    specialisation: string;
    school: string;
    /** Numeric score shown big, e.g. "9.2" */
    cgpa: string;
    /** Scale the CGPA is out of */
    cgpaScale: string;
    /** Optional, e.g. "2021 – 2025"; leave "" to hide */
    period: string;
    /** Optional short highlights (coursework, awards); leave [] to hide */
    highlights: string[];
  };
}

export const profile: Profile = {
  name: "Devika C.",
  title: "Associate Software Engineer",
  tagline:
    "Building scalable web apps with React.js, JavaScript and Python, with a strong interest in AI & Machine Learning.",
  availability: "Open to Global & Remote Opportunities",
  about:
    "B.Tech graduate and Associate Software Engineer focused on building clean, user-centric and scalable web applications. I’m especially drawn to Artificial Intelligence and Machine Learning: turning data into models that make products smarter, from recommendation systems to predictive analytics.",
  location: "Bengaluru, India",
  githubUsername: "Devika-C003",
  email: "devika.c008@gmail.com",
  whatsapp: "", // TODO: add your number with country code, e.g. "+91 98765 43210"
  whatsappMessage: "Hi Devika, I saw your portfolio and would like to connect.",
  linkedin: "https://www.linkedin.com/in/devika-c-it",
  leetcode: "https://leetcode.com/u/Devika_C003/",
  hackerrank: "", // TODO: e.g. "https://www.hackerrank.com/profile/your_username"
  resumeUrl: "/resume.pdf",
  education: {
    degree: "Bachelor of Technology (B.Tech)",
    specialisation: "Digital Transformation",
    school: "Atria University, Bengaluru",
    cgpa: "9.2",
    cgpaScale: "10",
    period: "", // e.g. "2021 – 2025"
    highlights: [], // e.g. ["Machine Learning", "Data Analytics", "Cloud Computing"]
  },
};

export const githubUrl = `https://github.com/${profile.githubUsername}`;

/** Click-to-chat WhatsApp link, or null when no number is set */
export const whatsappUrl: string | null = (() => {
  const w = profile.whatsapp.trim();
  if (!w) return null;
  if (/^https?:\/\//.test(w)) return w;
  const digits = w.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(profile.whatsappMessage)}` : null;
})();

/** AI & ML interests, shown prominently in the About section */
export const aiInterests: { title: string; text: string; icon: "brain" | "network" | "sparkles" | "chart" }[] = [
  {
    title: "Machine Learning",
    text: "Supervised & unsupervised models: regression, classification, clustering.",
    icon: "brain",
  },
  {
    title: "Deep Learning",
    text: "Neural networks with TensorFlow & Keras for vision and sequence data.",
    icon: "network",
  },
  {
    title: "Generative AI & LLMs",
    text: "Building apps on top of large language models and AI APIs.",
    icon: "sparkles",
  },
  {
    title: "Recommenders & Predictive Analytics",
    text: "Recommendation systems and forecasting that turn data into decisions.",
    icon: "chart",
  },
];

/** Shown in the strip under the hero */
export const highlightStack: SkillId[] = ["react", "javascript", "python", "ml", "gcp"];

export interface SkillGroup {
  title: string;
  items: SkillId[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["react", "typescript", "javascript", "html", "css", "redux", "antd", "tailwind"],
  },
  {
    title: "Backend",
    items: ["python", "flask", "restapi", "graphql", "sqlalchemy"],
  },
  {
    title: "Databases",
    items: ["postgresql", "mysql", "sqlite"],
  },
  {
    title: "Machine Learning & Data",
    items: ["ml", "pandas", "numpy", "sklearn", "tensorflow", "keras", "jupyter", "dataviz", "plotly"],
  },
  {
    title: "Cloud, DevOps & Tools",
    items: ["git", "github", "gcp", "docker", "linux", "postman", "pytest", "agile", "jira"],
  },
  {
    title: "Design & CMS",
    items: ["uiux", "figma", "wordpress"],
  },
];

/** ML models / techniques shown as chips under the skills grid */
export const mlModels: string[] = [
  "Linear Regression",
  "Logistic Regression",
  "Decision Trees",
  "Random Forest",
  "XGBoost",
  "K-Nearest Neighbours",
  "Support Vector Machines",
  "Naive Bayes",
  "K-Means Clustering",
  "PCA",
  "Neural Networks (ANN)",
  "CNN",
  "Time-Series Forecasting",
  "Collaborative Filtering",
  "Content-Based Recommendation",
  "Hybrid Recommender Systems",
];

export const projects: Project[] = [
  {
    title: "E-Commerce Web Application",
    description: "Responsive shopping platform with product, cart and order workflows.",
    tags: ["React", "JavaScript", "REST API", "CSS"],
    featured: true,
    link: githubUrl, // TODO: point to the project repo or live demo
  },
];

/** GitHub repos to leave out of "All Projects on GitHub" (exact repo names, case-insensitive) */
export const hiddenRepos: string[] = ["API", "LandingPage", "Portfolio_website", "RestAPI", "CRUD_OPERATIONS"];

// Work experience and internships. Newest first.
export const experience: Experience[] = [
  {
    kind: "full-time",
    role: "Software Engineer",
    company: "CrisprBits Pvt Ltd · Bengaluru",
    period: "Jan 2026 – Present",
    summary: "Working on PathCrisp, a production molecular diagnostics platform.",
    points: [
      "Develop and maintain REST APIs and backend services in Python (Flask), SQLAlchemy and PostgreSQL, including analytics modules built from scratch for AMR Carba and AMR ESBL tests.",
      "Built and fixed data parsing pipelines for lab instruments (BioRad, Rotor-Gene Q), resolving column-mapping bugs that caused downstream analytics errors.",
      "Developed dual-format PDF and HTML reports with PyMuPDF, and debugged cross-stack defects across Flask and React.js to restore report generation and PDF viewing.",
      "Wrote testing checklists for four diagnostic modules, extended the automation test suite, and audited the Docker/GCP stack for gaps in report persistence.",
    ],
  },
  {
    kind: "internship",
    role: "Frontend Developer Intern",
    company: "ZatoOrigin Pvt Ltd",
    period: "Feb 2025 – Nov 2025",
    points: [
      "Built responsive UI screens with React.js and Ant Design using reusable, component-based architecture.",
      "Integrated REST APIs with the frontend, improving data flow efficiency by 40% and reducing bug reports through better error handling.",
    ],
  },
  {
    kind: "internship",
    role: "WordPress Developer Intern",
    company: "Xtransmatrix Consulting Pvt Ltd",
    period: "Apr 2024 – Dec 2024",
    points: [
      "Designed and customised WordPress sites to client branding and functional specifications; managed plugins, page-speed optimisation and SEO settings.",
    ],
  },
  {
    kind: "internship",
    role: "ReactJS Developer Intern",
    company: "Tif Labs Pvt Ltd",
    period: "Mar 2023 – Jul 2023",
    points: [
      "Participated in code reviews to improve code quality, resolve bugs and enhance performance; documented API integrations and component logic.",
    ],
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
] as const;
