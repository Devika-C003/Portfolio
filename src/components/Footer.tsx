import { FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { githubUrl, profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="container footer">
      <div className="footer-brand">
        <span className="footer-credit">
          Designed &amp; developed by <strong>{profile.name}</strong>
        </span>
        <span className="muted small">© {new Date().getFullYear()} · All rights reserved</span>
      </div>
      <div className="footer-links">
        <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
          <SiGithub />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        {profile.leetcode && (
          <a href={profile.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">
            <SiLeetcode />
          </a>
        )}
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <FiMail />
        </a>
        <span className="footer-sep" />
        <span className="footer-loc">
          <FiMapPin aria-hidden="true" /> {profile.location}
        </span>
      </div>
    </footer>
  );
}
