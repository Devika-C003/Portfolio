import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { githubUrl, highlightStack, profile } from "../data/portfolio";
import Avatar from "./Avatar";
import { skillMeta } from "./icons";

export default function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <p className="eyebrow">{profile.title}</p>
          <h1 className="hero-title">
            Hi, I’m <span className="gradient-text">{first} {rest.join(" ")}</span>
          </h1>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-pills">
            {profile.availability && (
              <p className="availability">
                <span className="availability-dot" aria-hidden="true" />
                {profile.availability}
              </p>
            )}
            <a href="#about" className="ai-pill">
              <LuSparkles aria-hidden="true" /> Exploring AI &amp; ML
            </a>
          </div>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects <FiArrowUpRight />
            </a>
            <a href={profile.resumeUrl} className="btn btn-outline" download>
              <FiDownload /> Resume
            </a>
          </div>
          <div className="code-profiles">
            <span className="muted small">Find me on</span>
            <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
              <SiGithub />
            </a>
            {profile.leetcode && (
              <a href={profile.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode" title="LeetCode" className="lc">
                <SiLeetcode />
              </a>
            )}
          </div>
        </div>

        <Avatar />
      </div>

      <div className="container">
        <ul className="stack-strip">
          {highlightStack.map((id) => {
            const { Icon, label } = skillMeta[id];
            return (
              <li key={id}>
                <Icon className="stack-icon" aria-hidden="true" />
                <span>{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
