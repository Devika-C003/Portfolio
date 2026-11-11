import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** Small label in the left column, e.g. "About" */
  label: string;
  /** Optional serif heading above the content */
  title?: string;
  children: ReactNode;
}

/** Editorial section: quiet label on the left, content on the right, hairline between sections. */
export default function Section({ id, label, title, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="container section-grid reveal">
        <p className="section-label">{label}</p>
        <div className="section-body">
          {title && <h2 className="section-title">{title}</h2>}
          {children}
        </div>
      </div>
    </section>
  );
}
