import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { experience, githubUrl, profile, shortCompany } from "../data/portfolio";
import Avatar from "./Avatar";

export default function Hero() {
  const current = experience[0];
  const company = current ? shortCompany(current.company) : "";
  const { degree, school, cgpa, cgpaScale } = profile.education;
  const shortDegree = degree.match(/\(([^)]+)\)/)?.[1] ?? degree;

  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="kicker">
            {profile.title} · {profile.location}
          </p>
          <h1 className="hero-title">
            Engineering reliable software today. Building <em>intelligent</em>, AI-powered products tomorrow.
          </h1>
          <p className="hero-lede">
            I’m Devika, a software engineer at {company}, where I build the backend, data pipelines and
            reports behind a production molecular diagnostics platform. Outside the day job, I’m going deep on
            machine learning.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              See my work
            </a>
            <a href={profile.resumeUrl} className="text-link" download>
              Download résumé <FiArrowDown aria-hidden="true" />
            </a>
          </div>

          <ul className="hero-links">
            <li>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                GitHub <FiArrowUpRight aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <FiArrowUpRight aria-hidden="true" />
              </a>
            </li>
            {profile.leetcode && (
              <li>
                <a href={profile.leetcode} target="_blank" rel="noreferrer">
                  LeetCode <FiArrowUpRight aria-hidden="true" />
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
          </ul>
        </div>

        <Avatar />
      </div>

      <div className="container">
        <dl className="hero-facts">
          <div>
            <dt>Now</dt>
            <dd>
              {current?.role}, {company}
            </dd>
          </div>
          <div>
            <dt>Studied</dt>
            <dd>
              {shortDegree}, {school.split(",")[0]} · <strong>{cgpa}</strong>/{cgpaScale} CGPA
            </dd>
          </div>
          <div>
            <dt>Open to</dt>
            <dd>{profile.availability}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
