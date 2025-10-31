export default function Footer() {
  return (
    <footer>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", padding: "32px 0", borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
        <small>© {new Date().getFullYear()} Otman Raad — DAW Málaga</small>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="https://github.com/tuuser" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/tuuser" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}