"use client";

import { useState } from "react";
import { FiArrowUpRight, FiStar } from "react-icons/fi";
import {
  aiInterests,
  dayToDay,
  experience,
  githubUrl,
  hiddenRepos,
  mlModels,
  profile,
  projects,
  shortCompany,
  skillGroups,
} from "../data/portfolio";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { skillMeta } from "./icons";
import Section from "./Section";
import ShopPreview from "./ShopPreview";

export function About() {
  return (
    <Section id="about" label="About">
      <p className="lead">{profile.about}</p>

      <div className="two-col">
        <div>
          <h3 className="col-title">Day to day</h3>
          <ul className="plain-list">
            {dayToDay.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="col-title">
            Where I’m heading <span className="accent-text">AI &amp; ML</span>
          </h3>
          <dl className="interest-list">
            {aiInterests.map((it) => (
              <div key={it.title}>
                <dt>{it.title}</dt>
                <dd>{it.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

export function Education() {
  const { degree, specialisation, school, cgpa, cgpaScale, period, highlights } = profile.education;
  return (
    <Section id="education" label="Education">
      <article className="edu">
        <div>
          <h3 className="edu-degree">{degree}</h3>
          <p className="edu-meta">
            {specialisation} · {school}
            {period && <> · {period}</>}
          </p>
          {highlights.length > 0 && <p className="edu-meta">{highlights.join(" · ")}</p>}
        </div>
        <p className="edu-score">
          <span className="edu-num">{cgpa}</span>
          <span className="edu-of">
            / {cgpaScale}
            <br />
            CGPA
          </span>
        </p>
      </article>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" label="Toolkit">
      <div className="toolkit">
        {skillGroups.map((g) => (
          <div key={g.title}>
            <h3 className="col-title">{g.title}</h3>
            <p className="toolkit-items">{g.items.map((id) => skillMeta[id].label).join(", ")}</p>
          </div>
        ))}
        <div>
          <h3 className="col-title">ML techniques</h3>
          <p className="toolkit-items">{mlModels.join(", ")}</p>
        </div>
      </div>
    </Section>
  );
}

const PAGE_SIZE = 6;
const prettyName = (name: string) => name.replace(/[-_]+/g, " ").trim();

function GithubRepos() {
  const { repos: allRepos, loading, error } = useGithubRepos(profile.githubUsername);
  const hidden = new Set(hiddenRepos.map((n) => n.toLowerCase()));
  const repos = allRepos.filter((r) => !hidden.has(r.name.toLowerCase()));
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = repos.slice(0, visible);

  return (
    <div className="repos" id="github-projects">
      <div className="repos-head">
        <h3 className="col-title">More on GitHub</h3>
        <a href={githubUrl} target="_blank" rel="noreferrer" className="text-link">
          @{profile.githubUsername} <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>

      {error ? (
        <p className="muted">
          GitHub isn’t responding right now.{" "}
          <a href={`${githubUrl}?tab=repositories`} target="_blank" rel="noreferrer" className="text-link">
            Browse my repositories <FiArrowUpRight aria-hidden="true" />
          </a>
        </p>
      ) : (
        <>
          <ul className="repo-list">
            {loading
              ? Array.from({ length: 3 }, (_, i) => <li key={i} className="repo-row skeleton" />)
              : shown.map((r) => (
                  <li key={r.id} className="repo-row">
                    <a href={r.html_url} target="_blank" rel="noreferrer" className="repo-link">
                      <span className="repo-name">{prettyName(r.name)}</span>
                      <span className="repo-desc">{r.description ?? ""}</span>
                      <span className="repo-meta">
                        {r.language && <span>{r.language}</span>}
                        {r.stargazers_count > 0 && (
                          <span>
                            <FiStar aria-hidden="true" /> {r.stargazers_count}
                          </span>
                        )}
                        <FiArrowUpRight className="repo-arrow" aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
          </ul>

          {!loading && repos.length > PAGE_SIZE && (
            <button
              className="btn btn-ghost repos-more"
              onClick={() =>
                visible < repos.length
                  ? setVisible((v) => v + PAGE_SIZE)
                  : (setVisible(PAGE_SIZE),
                    document.getElementById("github-projects")?.scrollIntoView({ behavior: "smooth" }))
              }
            >
              {visible < repos.length ? `Show more (${repos.length - visible})` : "Show less"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];

  return (
    <Section id="work" label="Selected work">
      {featured && (
        <article className="feature">
          <div className="feature-visual">
            <ShopPreview />
          </div>
          <div className="feature-info">
            <h3 className="feature-title">{featured.title}</h3>
            <p>{featured.description}</p>
            <p className="feature-tags">{featured.tags.join(" · ")}</p>
            <a href={featured.link} target="_blank" rel="noreferrer" className="text-link">
              View the code <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </article>
      )}
      <GithubRepos />
    </Section>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" label="Experience">
      <ol className="jobs">
        {experience.map((e) => (
          <li key={e.role + e.company} className="job">
            <div className="job-when">
              <span>{e.period}</span>
              <span className="job-kind">{e.kind === "internship" ? "Internship" : "Full-time"}</span>
            </div>
            <div className="job-what">
              <h3 className="job-role">
                {e.role} <span className="job-at">at {shortCompany(e.company)}</span>
              </h3>
              {e.summary && <p className="job-summary">{e.summary}</p>}
              <ul className="plain-list">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
