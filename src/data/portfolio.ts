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
  | "wordpress"
  | "recsys";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  /** Repo or live demo link */
  link: string;
  /** Short case-study sections; leave any out to hide it */
  problem?: string;
  built?: string;
  decisions?: string;
  challenge?: string;
  /** Measured outcome; only fill in with real, verifiable numbers */
  result?: string;
  /** Small note shown under the case study, e.g. confidentiality */
  note?: string;
}

export interface Note {
  title: string;
  /** e.g. "Nov 2026" */
  date: string;
  summary: string;
  /** Link to the full post (Medium, Hashnode, LinkedIn article, or a page on this site) */
  link?: string;
  /** Only published notes appear on the site */
  published: boolean;
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
  /** A short first-person paragraph on why the work mattered */
  story?: string;
  /** Bullet points describing what you did */
  points: string[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  /** Short paragraph under the hero headline */
  intro: string;
  /** Small "available" pill in the hero; remove to hide it */
  availability?: string;
  /** About section, one string per paragraph */
  about: string[];
  location: string;
  githubUsername: string;
  email: string;
  linkedin: string;
  /** Full profile URL; leave "" to hide */
  leetcode: string;
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
  title: "Software Engineer",
  tagline: "I build software that solves real problems.",
  intro:
    "I work with Python, React and data-driven applications, currently building software for molecular diagnostics, and exploring how machine learning can make everyday tools smarter.",
  availability: "Open to remote & global roles",
  about: [
    "I like understanding how things work, and then figuring out how to make them better.",
    "I started on the frontend: React screens as an intern in 2023, then WordPress sites for real clients, then a product team where I wired up APIs and learned how much good error handling matters. Each step pulled me further down the stack, into APIs, data pipelines and, now, software for diagnostic labs.",
    "That’s where I learned that small details matter. One fix I’m proud of: tracing a column-mapping bug in lab-instrument data that was quietly breaking the analytics further down the line.",
    "Outside work, I build things to learn: an air-quality model that predicts carbon monoxide levels, and a recommendation engine that compares three ways of suggesting products.",
  ],
  location: "Bengaluru, India",
  githubUsername: "Devika-C003",
  email: "devika.c008@gmail.com",
  linkedin: "https://www.linkedin.com/in/devika-c-it",
  leetcode: "https://leetcode.com/u/Devika_C003/",
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


/** What I'm exploring in AI & ML (About section). Keep this to things you can talk about. */
export const aiInterests: { title: string; text: string; icon: "brain" | "network" | "sparkles" | "chart" }[] = [
  {
    title: "Recommendation systems",
    text: "Built content-based, collaborative and hybrid recommenders in my e-commerce recommendation project.",
    icon: "chart",
  },
  {
    title: "Predictive modelling",
    text: "Compared six regression models to predict CO levels; tuned XGBoost scored R² 0.94.",
    icon: "brain",
  },
  {
    title: "Deep learning",
    text: "Learning neural networks with TensorFlow, starting from the fundamentals.",
    icon: "network",
  },
  {
    title: "LLM-powered tools",
    text: "Curious about practical, everyday uses of large language models.",
    icon: "sparkles",
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
    title: "Used at work every day",
    items: ["python", "flask", "sqlalchemy", "postgresql", "restapi", "react", "docker", "gcp"],
  },
  {
    title: "Used in projects & internships",
    items: ["javascript", "html", "css", "antd", "graphql", "wordpress", "git"],
  },
  {
    title: "Currently exploring",
    items: ["ml", "sklearn", "pandas", "jupyter", "recsys", "tensorflow"],
  },
];

/** Where each skill was actually used, shown under the skill name */
export const skillEvidence: Partial<Record<SkillId, string>> = {
  python: "CrisprBits · Air Quality",
  flask: "CrisprBits · Recommender",
  sqlalchemy: "CrisprBits",
  postgresql: "CrisprBits",
  restapi: "CrisprBits · ZatoOrigin",
  react: "ZatoOrigin · Tif Labs",
  docker: "CrisprBits",
  gcp: "CrisprBits",
  javascript: "Shopverse · Event Mgmt",
  html: "Event Mgmt",
  css: "Shopverse",
  antd: "ZatoOrigin",
  graphql: "Event Mgmt",
  wordpress: "Xtransmatrix",
  git: "All projects",
  ml: "Air Quality · Recommender",
  sklearn: "Air Quality",
  pandas: "Air Quality",
  jupyter: "Air Quality · Recommender",
  recsys: "Recommender",
  tensorflow: "Learning now",
};


export const projects: Project[] = [
  {
    title: "Shopverse: E-Commerce Web App",
    description:
      "A responsive storefront with product browsing, a cart and an order flow. The preview here is fully interactive.",
    tags: ["React", "JavaScript", "REST API", "CSS"],
    featured: true,
    link: githubUrl, // TODO: point to the Shopverse repo or live demo
    problem: "Shoppers expect to browse, filter and check out smoothly on any screen size.",
    built: "The React front end: product listing, category filters, cart state and the checkout flow, wired to REST APIs.",
    decisions: "Kept cart state in one place so counts, totals and buttons always stay in sync across components.",
  },
  {
    title: "Predicting Air Pollution (CO Levels)",
    description:
      "A machine learning study that predicts carbon monoxide levels from air-quality sensor data, served through a small Streamlit app.",
    tags: ["Python", "XGBoost", "scikit-learn", "Streamlit"],
    link: "https://github.com/Devika-C003/Airquality_Analysis",
    problem: "Accurate CO forecasts help city planners and environmental agencies act before pollution becomes a health risk.",
    built: "Cleaned and explored the sensor data in Jupyter, trained six regression models, and wrapped the best one in a Streamlit app for live predictions.",
    decisions: "Compared Linear, Ridge, Lasso, Polynomial, SVR and XGBoost side by side, then tuned XGBoost with 5-fold GridSearchCV.",
    result: "Tuned XGBoost reached R² 0.94 (MSE 0.135), ahead of the linear baselines at about 0.92.",
  },
  {
    title: "E-Commerce Recommendation Engine",
    description:
      "An online store that suggests products in real time, comparing content-based, collaborative-filtering and hybrid recommendation approaches.",
    tags: ["Python", "Flask", "Machine Learning", "Jupyter"],
    link: "https://github.com/Devika-C003/Ecommerce_Recommendation",
    problem: "Generic product lists don’t help shoppers find what they actually want.",
    built: "A Flask back end serving recommendations from models prototyped in Jupyter notebooks, with an HTML/CSS/JavaScript front end.",
    decisions: "Implemented three approaches side by side to compare when each one works best.",
    // TODO: add evaluation metrics you measured, e.g. precision@k, to `result`
  },
  {
    title: "Making lab-instrument data trustworthy",
    description: "An engineering case study from my work on PathCrisp, a molecular diagnostics platform at CrisprBits.",
    tags: ["Python", "Flask", "Data pipelines", "Debugging"],
    link: "#experience",
    problem: "Results exported by lab instruments (BioRad, Rotor-Gene Q) were being mis-mapped, causing errors further down the analytics.",
    built: "Investigated and fixed the parsing pipelines, correcting the column mapping so downstream analytics received clean data.",
    challenge: "Tracing a wrong result back through several layers to the exact point where the data went wrong.",
    note: "Shared at a high level only; no confidential details.",
  },
  {
    title: "Event Management System",
    description: "A web app with separate admin and user dashboards for creating, browsing and registering for events, backed by GraphQL.",
    tags: ["JavaScript", "GraphQL", "HTML", "CSS"],
    link: "https://github.com/Devika-C003/Event_Mangement",
    problem: "Admins need to manage events while attendees just want to find and register for them, so one screen doesn’t fit both.",
    built: "Role-based dashboards: admins create and delete events in a table view; users browse event cards, register and cancel registrations.",
    decisions: "Used GraphQL queries and mutations through fetch() so each screen requests only the data it needs.",
    challenge: "Showing the right dashboard after login. I stored the role on sign-in and rendered the matching view from it.",
  },
];

/** Short engineering write-ups. Only `published: true` notes are shown. */
export const notes: Note[] = [
  {
    title: "What I learned debugging instrument data",
    date: "",
    summary: "How a small column-mapping bug can quietly break diagnostics analytics, and how I tracked it down.",
    published: false, // TODO: write it, add a link, then set to true
  },
  {
    title: "My first recommendation model, explained simply",
    date: "",
    summary: "Content-based vs collaborative filtering, with what surprised me when I compared them.",
    published: false,
  },
];

/** GitHub repos to leave out of "All Projects on GitHub" (exact repo names, case-insensitive) */
export const hiddenRepos: string[] = ["API", "LandingPage", "Portfolio_website", "RestAPI", "CRUD_OPERATIONS", "Ecommerce_Recommendation", "Portfolio", "Airquality_Analysis", "Event_Mangement"];

// Work experience and internships. Newest first.
export const experience: Experience[] = [
  {
    kind: "full-time",
    role: "Software Engineer",
    company: "CrisprBits Pvt Ltd · Bengaluru",
    period: "Jan 2026 – Present",
    summary: "Working on PathCrisp, a production molecular diagnostics platform.",
    story:
      "One of the most interesting parts of my work is building software that supports molecular diagnostics. Working on backend APIs, instrument data processing and diagnostic reports has taught me how much accuracy, reliable data handling and careful debugging matter when software is part of a scientific workflow.",
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
    story:
      "My first long stint in a product team. I learned to build interfaces that stay maintainable as an app grows, and how much good error handling improves the experience for users.",
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
