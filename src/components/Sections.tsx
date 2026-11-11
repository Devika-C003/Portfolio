"use client";

import { useState, type CSSProperties } from "react";
import {
  FiArrowUpRight,
  FiStar,
  FiGitBranch,
  FiBriefcase,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
} from "react-icons/fi";
import {
  LuAward,
  LuBrainCircuit,
  LuChartLine,
  LuGraduationCap,
  LuNetwork,
  LuSchool,
  LuSparkles,
} from "react-icons/lu";
import {
  aiInterests,
  experience,
  githubUrl,
  hiddenRepos,
  mlModels,
  profile,
  projects,
  skillGroups,
} from "../data/portfolio";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { skillMeta } from "./icons";
import Section from "./Section";
import ShopPreview from "./ShopPreview";

const interestIcons = {
  brain: LuBrainCircuit,
  network: LuNetwork,
  sparkles: LuSparkles,
  chart: LuChartLine,
};

export function About() {
  return (
    <Section id="about" index={1} title="About">
      <div className="about">
        <p className="about-text">{profile.about}</p>
      </div>

      <div className="ai-focus reveal">
        <div className="ai-focus-head">
          <span className="ai-badge">
            <LuSparkles aria-hidden="true" /> Core interest
          </span>
          <h3>Artificial Intelligence &amp; Machine Learning</h3>
          <p className="muted">
            Beyond web development, this is what I’m most excited about and actively growing in.
          </p>
        </div>
        <ul className="ai-grid stagger">
          {aiInterests.map((it, i) => {
            const Icon = interestIcons[it.icon];
            return (
              <li key={it.title} className="ai-card" style={{ "--i": i } as CSSProperties}>
                <Icon className="ai-icon" aria-hidden="true" />
                <strong>{it.title}</strong>
                <span className="muted">{it.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

export function Education() {
  const { degree, specialisation, school, cgpa, cgpaScale, period, highlights } = profile.education;
  const pct = Math.min(100, (parseFloat(cgpa) / parseFloat(cgpaScale)) * 100) || 0;

  return (
    <Section id="education" index={2} title="Education">
      <article className="edu-feature">
        <div className="edu-main">
          <span className="edu-cap" aria-hidden="true">
            <LuGraduationCap />
          </span>
          <div>
            {period && <p className="eyebrow">{period}</p>}
            <h3>{degree}</h3>
            <p className="edu-spec">{specialisation}</p>
            <p className="edu-school">
              <LuSchool aria-hidden="true" /> {school}
            </p>
            {highlights.length > 0 && (
              <ul className="tags edu-tags">
                {highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="edu-score" style={{ "--pct": pct } as CSSProperties}>
          <div className="edu-ring">
            <span className="edu-cgpa">{cgpa}</span>
            <span className="edu-scale">/ {cgpaScale}</span>
          </div>
          <span className="edu-score-label">
            <LuAward aria-hidden="true" /> CGPA
          </span>
        </div>
      </article>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" index={3} title="Skills">
      <div className="skill-groups">
        {skillGroups.map((group) => (
          <div key={group.title} className="skill-group reveal">
            <h3 className="skill-group-title">{group.title}</h3>
            <ul className="skills-grid stagger">
              {group.items.map((id, i) => {
                const { Icon, label, color } = skillMeta[id];
                return (
                  <li key={id} className="card skill" style={{ "--i": i } as CSSProperties}>
                    <Icon style={{ color }} className="skill-icon" aria-hidden="true" />
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="skill-group reveal">
          <h3 className="skill-group-title">ML Models</h3>
          <ul className="tags model-tags stagger">
            {mlModels.map((m, i) => (
              <li key={m} style={{ "--i": i } as CSSProperties}>
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

const PAGE_SIZE = 6;

/** "my-cool_repo-" → "my cool repo" */
const prettyName = (name: string) => name.replace(/[-_]+/g, " ").trim();

function GithubRepos() {
  const { repos: allRepos, loading, error } = useGithubRepos(profile.githubUsername);
  const hidden = new Set(hiddenRepos.map((n) => n.toLowerCase()));
  const repos = allRepos.filter((r) => !hidden.has(r.name.toLowerCase()));
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = repos.slice(0, visible);
  const hasMore = visible < repos.length;

  const showLess = () => {
    setVisible(PAGE_SIZE);
    document.getElementById("github-projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="repos" id="github-projects">
      <div className="repos-head">
        <h3>
          All Projects on GitHub
          {!loading && !error && <span className="repos-count">{repos.length}</span>}
        </h3>
        <a href={githubUrl} target="_blank" rel="noreferrer" className="link">
          @{profile.githubUsername} <FiArrowUpRight />
        </a>
      </div>

      {error ? (
        <p className="muted repos-error">
          Couldn’t load projects from GitHub right now.{" "}
          <a href={`${githubUrl}?tab=repositories`} target="_blank" rel="noreferrer" className="link">
            See them on GitHub <FiArrowUpRight />
          </a>
        </p>
      ) : (
        <>
          <div className="repos-grid">
            {loading
              ? Array.from({ length: 3 }, (_, i) => <div key={i} className="card repo skeleton" />)
              : shown.map((r, i) => (
                  <article
                    key={r.id}
                    className="card repo repo-enter"
                    style={{ "--i": i % PAGE_SIZE } as CSSProperties}
                  >
                    <div className="repo-title">
                      <a href={r.html_url} target="_blank" rel="noreferrer" className="repo-link">
                        {prettyName(r.name)}
                      </a>
                      <FiArrowUpRight aria-hidden="true" />
                    </div>
                    <p className="muted">{r.description ?? "No description provided."}</p>
                    <div className="repo-meta">
                      {r.language && <span className="lang">{r.language}</span>}
                      <span>
                        <FiStar /> {r.stargazers_count}
                      </span>
                      <span>
                        <FiGitBranch /> {r.forks_count}
                      </span>
                      {r.homepage && (
                        <a href={r.homepage} target="_blank" rel="noreferrer" className="repo-demo">
                          <FiExternalLink /> Live
                        </a>
                      )}
                    </div>
                  </article>
                ))}
          </div>

          {!loading && repos.length > PAGE_SIZE && (
            <div className="repos-more">
              <span className="muted small">
                Showing {shown.length} of {repos.length}
              </span>
              {hasMore ? (
                <button className="btn btn-outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  View more <FiChevronDown />
                </button>
              ) : (
                <button className="btn btn-outline" onClick={showLess}>
                  Show less <FiChevronUp />
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p !== featured);

  return (
    <Section id="projects" index={4} title="Projects">
      {featured && (
        <article className="card project-featured">
          <div className="project-visual">
            <ShopPreview />
          </div>
          <div className="project-info">
            <p className="eyebrow accent">Featured</p>
            <h3>{featured.title}</h3>
            <p className="muted">{featured.description}</p>
            <div className="project-footer">
              <ul className="tags">
                {featured.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a
                href={featured.link}
                target="_blank"
                rel="noreferrer"
                className="icon-btn"
                aria-label={`Open ${featured.title}`}
              >
                <FiArrowUpRight />
              </a>
            </div>
          </div>
        </article>
      )}

      {others.length > 0 && (
        <div className="repos-grid">
          {others.map((p) => (
            <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className="card repo">
              <div className="repo-title">
                <span>{p.title}</span>
                <FiArrowUpRight />
              </div>
              <p className="muted">{p.description}</p>
              <ul className="tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      )}

      <GithubRepos />
    </Section>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" index={5} title="Work Experience" kicker="What I have done so far" stacked>
      <ol className="vtimeline">
        {experience.map((e, i) => (
          <li key={e.role + e.company} className={`reveal ${i % 2 === 0 ? "left" : "right"}`}>
            <span className={`vt-node ${e.kind}`} aria-hidden="true">
              {e.kind === "internship" ? <LuGraduationCap /> : <FiBriefcase />}
            </span>
            {e.period && <span className="vt-date">{e.period}</span>}
            <article className={`vt-card ${e.kind}`}>
              <span className={`vt-badge ${e.kind}`}>
                {e.kind === "internship" ? "Internship" : "Full-time"}
              </span>
              <h3>{e.role}</h3>
              <p className="vt-company">{e.company}</p>
              {e.summary && <p className="vt-summary">{e.summary}</p>}
              <ul>
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
