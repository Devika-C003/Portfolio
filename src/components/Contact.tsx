import { FiMail } from "react-icons/fi";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { githubUrl, profile } from "@/data/portfolio";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="container">
      <div className="cta contact reveal">
        <div className="contact-intro">
          <p className="cta-kicker">
            <FiMail aria-hidden="true" /> Let’s talk
          </p>
          <h2>Got an idea, a role or a problem worth solving?</h2>
          <p className="muted">
            Whether it’s a full-time role, a freelance project or a chat about AI, my inbox is open. I usually
            reply within a day or two.
          </p>
          <ul className="contact-links">
            <li>
              <a href={`mailto:${profile.email}`} className="link">
                <FiMail aria-hidden="true" /> {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="link">
                <SiGithub aria-hidden="true" /> GitHub
              </a>
            </li>
            {profile.leetcode && (
              <li>
                <a href={profile.leetcode} target="_blank" rel="noreferrer" className="link">
                  <SiLeetcode aria-hidden="true" /> LeetCode
                </a>
              </li>
            )}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
