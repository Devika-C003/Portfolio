import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          Designed &amp; developed by <strong>{profile.name}</strong>
        </p>
        <p className="muted">
          {profile.location} · © {new Date().getFullYear()}
        </p>
        <a href="#top" className="text-link">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
