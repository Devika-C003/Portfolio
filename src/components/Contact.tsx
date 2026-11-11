import { FiArrowUpRight } from "react-icons/fi";
import { githubUrl, profile } from "@/data/portfolio";
import ContactForm from "./ContactForm";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" label="Contact">
      <div className="contact">
        <div className="contact-intro">
          <h2 className="contact-title">
            Have a role, a project or an idea worth building? <em>Let’s talk.</em>
          </h2>
          <p className="muted">
            I’m open to full-time roles and interesting collaborations, and always happy to talk about AI. I
            usually reply within a day or two.
          </p>
          <a href={`mailto:${profile.email}`} className="contact-email">
            {profile.email}
          </a>
          <ul className="hero-links">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <FiArrowUpRight aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                GitHub <FiArrowUpRight aria-hidden="true" />
              </a>
            </li>
            {profile.leetcode && (
              <li>
                <a href={profile.leetcode} target="_blank" rel="noreferrer">
                  LeetCode <FiArrowUpRight aria-hidden="true" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
