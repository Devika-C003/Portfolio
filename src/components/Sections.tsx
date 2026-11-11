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
  notes,
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
        <figure className="about-photo">
          <img src="/devika.jpg" alt="Portrait of Devika C." width={535} height={511} loading="lazy" />
        </figure>
        <div className="about-text">
          <h3 className="about-heading">A little about me</h3>
          {profile.about.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>

      <div className="ai-focus reveal">
        <div className="ai-focus-head">
          <span className="ai-badge">
            <LuSparkles aria-hidden="true" /> Currently exploring
          </span>
          <h3>AI &amp; Machine Learning</h3>
          <p className="muted">What I’ve built so far, and what I’m learning next.</p>
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
    <Section id="skills" index={3} title="Tech Stack">
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
          More on GitHub
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

function CaseStudy({ p }: { p: (typeof projects)[number] }) {
  const rows: [string, string | undefined][] = [
    ["The problem", p.problem],
    ["What I built", p.built],
    ["Key decision", p.decisions],
    ["The challenge", p.challenge],
    ["Result", p.result],
  ];
  const shown = rows.filter(([, v]) => v);
  if (!shown.length) return null;
  return (
    <dl className="case">
      {shown.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
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
            <p className="eyebrow accent">Case study</p>
            <h3>{featured.title}</h3>
            <p className="muted">{featured.description}</p>
            <CaseStudy p={featured} />
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
        <div className="case-grid">
          {others.map((p) => {
            const external = p.link.startsWith("http");
            return (
              <article key={p.title} className="card case-card">
                <p className="eyebrow accent">Case study</p>
                <h3>{p.title}</h3>
                <p className="muted">{p.description}</p>
                <CaseStudy p={p} />
                {p.note && <p className="case-note">{p.note}</p>}
                <div className="project-footer">
                  <ul className="tags">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a
                    href={p.link}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="link"
                  >
                    {external ? "View code" : "See experience"} <FiArrowUpRight />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <GithubRepos />
    </Section>
  );
}

export function Notes() {
  const published = notes.filter((n) => n.published);
  if (!published.length) return null;
  return (
    <Section id="notes" index={6} title="Engineering Notes" kicker="Things I learned the hard way" stacked>
      <ul className="notes">
        {published.map((n) => (
          <li key={n.title}>
            <a href={n.link ?? "#"} target="_blank" rel="noreferrer" className="note">
              <span className="note-date">{n.date}</span>
              <span className="note-title">{n.title}</span>
              <span className="muted">{n.summary}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" index={5} title="Experience" kicker="Shipping code since 2023" stacked>
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
              {e.story && <p className="vt-story">{e.story}</p>}
              {e.story && <p className="vt-label">Technical contributions</p>}
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
