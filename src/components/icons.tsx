import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiAntdesign,
  SiRedux,
  SiTailwindcss,
  SiPython,
  SiFlask,
  SiGraphql,
  SiSqlalchemy,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiTensorflow,
  SiKeras,
  SiJupyter,
  SiPlotly,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiDocker,
  SiLinux,
  SiPostman,
  SiPytest,
  SiJira,
  SiFigma,
  SiWordpress,
} from "react-icons/si";
import { FiPenTool } from "react-icons/fi";
import { LuBrainCircuit, LuChartBar, LuNetwork, LuWorkflow } from "react-icons/lu";
import type { SkillId } from "../data/portfolio";

interface SkillMeta {
  label: string;
  Icon: IconType;
  /** Icon colour; mid-tone brand colours so they read on light and dark themes.
   *  Use "currentColor" to follow the theme's text colour. */
  color: string;
}

export const skillMeta: Record<SkillId, SkillMeta> = {
  // Frontend
  react: { label: "React", Icon: SiReact, color: "#149eca" },
  typescript: { label: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
  javascript: { label: "JavaScript", Icon: SiJavascript, color: "#d4b106" },
  html: { label: "HTML", Icon: SiHtml5, color: "#e34f26" },
  css: { label: "CSS", Icon: SiCss, color: "#1572b6" },
  redux: { label: "Redux", Icon: SiRedux, color: "#764abc" },
  antd: { label: "Ant Design", Icon: SiAntdesign, color: "#1677ff" },
  tailwind: { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#0ea5e9" },
  // Backend
  python: { label: "Python", Icon: SiPython, color: "#3776ab" },
  flask: { label: "Flask", Icon: SiFlask, color: "currentColor" },
  restapi: { label: "REST APIs", Icon: LuNetwork, color: "#2a7f7a" },
  graphql: { label: "GraphQL", Icon: SiGraphql, color: "#e10098" },
  sqlalchemy: { label: "SQLAlchemy", Icon: SiSqlalchemy, color: "#d71f00" },
  // Databases
  postgresql: { label: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
  mysql: { label: "MySQL", Icon: SiMysql, color: "#00758f" },
  sqlite: { label: "SQLite", Icon: SiSqlite, color: "#0f80cc" },
  // Machine learning & data
  ml: { label: "Machine Learning", Icon: LuBrainCircuit, color: "#8e44ad" },
  pandas: { label: "Pandas", Icon: SiPandas, color: "#e70488" },
  numpy: { label: "NumPy", Icon: SiNumpy, color: "#4dabcf" },
  sklearn: { label: "scikit-learn", Icon: SiScikitlearn, color: "#f7931e" },
  tensorflow: { label: "TensorFlow", Icon: SiTensorflow, color: "#ff6f00" },
  keras: { label: "Keras", Icon: SiKeras, color: "#d00000" },
  jupyter: { label: "Jupyter", Icon: SiJupyter, color: "#f37626" },
  dataviz: { label: "Data Visualisation", Icon: LuChartBar, color: "#5b6ee1" },
  plotly: { label: "Plotly", Icon: SiPlotly, color: "#636efa" },
  // Cloud, DevOps & tools
  git: { label: "Git", Icon: SiGit, color: "#f05032" },
  github: { label: "GitHub", Icon: SiGithub, color: "currentColor" },
  gcp: { label: "GCP", Icon: SiGooglecloud, color: "#4285f4" },
  docker: { label: "Docker", Icon: SiDocker, color: "#2496ed" },
  linux: { label: "Linux", Icon: SiLinux, color: "currentColor" },
  postman: { label: "Postman", Icon: SiPostman, color: "#ff6c37" },
  pytest: { label: "Pytest", Icon: SiPytest, color: "#0a9edc" },
  agile: { label: "Agile / Scrum", Icon: LuWorkflow, color: "#2a7f7a" },
  jira: { label: "Jira", Icon: SiJira, color: "#0052cc" },
  // Design & CMS
  uiux: { label: "UI/UX", Icon: FiPenTool, color: "#c2185b" },
  figma: { label: "Figma", Icon: SiFigma, color: "#f24e1e" },
  wordpress: { label: "WordPress", Icon: SiWordpress, color: "#21759b" },
};
