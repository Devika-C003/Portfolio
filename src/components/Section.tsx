import type { CSSProperties, ReactNode } from "react";

interface SectionProps {
  id: string;
  index: number;
  title: string;
  /** Small uppercase line above the title (used in stacked layout) */
  kicker?: string;
  /** Put the label above the content instead of beside it */
  stacked?: boolean;
  children: ReactNode;
}

/** Numbered section: label on the left (or on top when stacked), content beside/below */
export default function Section({ id, index, title, kicker, stacked, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className={`container section-grid ${stacked ? "stacked" : ""}`}>
        <div className="section-label reveal">
          <span className="section-num">
            {String(index).padStart(2, "0")}
            <span className="section-line" />
            {kicker && <span className="section-kicker">{kicker}</span>}
          </span>
          <h2>{title}</h2>
        </div>
        <div className="section-body reveal" style={{ "--i": 1 } as CSSProperties}>{children}</div>
      </div>
    </section>
  );
}
