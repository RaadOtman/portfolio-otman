// src/components/Skills.tsx
import { useEffect } from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact,
  FaPhp, FaNodeJs, FaDatabase, FaGitAlt, FaLinux, FaDocker
} from "react-icons/fa";
import { FiTool } from "react-icons/fi";

type Skill = { label: string; level: number; icon?: JSX.Element };

const frontend: Skill[] = [
  { label: "HTML5",      level: 90, icon: <FaHtml5 color="#E34F26" /> },
  { label: "CSS3",       level: 85, icon: <FaCss3Alt color="#1572B6" /> },
  { label: "JavaScript", level: 80, icon: <FaJs color="#F7DF1E" /> },
  { label: "React",      level: 75, icon: <FaReact color="#61DAFB" /> },
];

const backend: Skill[] = [
  { label: "Node.js", level: 70, icon: <FaNodeJs color="#68A063" /> },
  { label: "PHP",     level: 65, icon: <FaPhp color="#777BB4" /> },
  { label: "MySQL",   level: 75, icon: <FaDatabase /> },
];

const toolChips = [
  { label: "Git",   icon: <FaGitAlt color="#F05032" /> },
  { label: "Linux", icon: <FaLinux /> },
  { label: "Docker (básico)", icon: <FaDocker color="#2496ED" /> },
];

export default function Skills() {
  // Reveal-on-scroll para animar barras y tarjetas
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("#skills .reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Encabezado */}
        <div className="skills-head">
          <span className="overline">Skills</span>
          <h2 className="skills-title">Tecnologías y herramientas</h2>
          <p className="skills-intro">
            Stack principal para front-end y back-end. Barras de nivel orientativas (siempre aprendiendo).
          </p>
        </div>

        {/* Grid principal */}
        <div className="skills-grid">
          {/* FRONTEND */}
          <article className="skill-card reveal">
            <header className="skill-card-head">
              <div className="pill grad">Frontend</div>
              <p>Interfaces limpias, semántica, accesibilidad y rendimiento.</p>
            </header>

            {/* Barras */}
            <ul className="meter-list">
              {frontend.map((s) => (
                <li key={s.label}>
                  <div className="meter-row">
                    <div className="meter-left">
                      <span className="meter-ico">{s.icon}</span>
                      <span className="meter-label">{s.label}</span>
                    </div>
                    <span className="meter-val">{s.level}%</span>
                  </div>
                  <div
                    className="meter-bar"
                    role="progressbar"
                    aria-valuenow={s.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span className="meter-fill" style={{ ['--w' as any]: `${s.level}%` }} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Chips con iconos */}
            <div className="chips" style={{ marginTop: 12 }}>
              <span className="chip"><FaHtml5 color="#E34F26" /> HTML5</span>
              <span className="chip"><FaCss3Alt color="#1572B6" /> CSS3</span>
              <span className="chip"><FaJs color="#F7DF1E" /> JavaScript</span>
              <span className="chip"><FaReact color="#61DAFB" /> React</span>
              <span className="chip">Responsive</span>
              <span className="chip">A11y</span>
            </div>
          </article>

          {/* BACKEND & DB */}
          <article className="skill-card reveal">
            <header className="skill-card-head">
              <div className="pill grad">Backend & DB</div>
              <p>APIs REST y persistencia de datos con SQL.</p>
            </header>

            {/* Barras */}
            <ul className="meter-list">
              {backend.map((s) => (
                <li key={s.label}>
                  <div className="meter-row">
                    <div className="meter-left">
                      <span className="meter-ico">{s.icon}</span>
                      <span className="meter-label">{s.label}</span>
                    </div>
                    <span className="meter-val">{s.level}%</span>
                  </div>
                  <div
                    className="meter-bar"
                    role="progressbar"
                    aria-valuenow={s.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span className="meter-fill" style={{ ['--w' as any]: `${s.level}%` }} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Chips con iconos */}
            <div className="chips" style={{ marginTop: 12 }}>
              <span className="chip"><FaNodeJs color="#68A063" /> Node.js</span>
              <span className="chip"><FaPhp color="#777BB4" /> PHP</span>
              <span className="chip"><FaDatabase /> MySQL</span>
              <span className="chip">REST</span>
              <span className="chip">CRUD</span>
              <span className="chip">Auth básica</span>
            </div>
          </article>
        </div>

        {/* HERRAMIENTAS */}
        <div className="tools-card card reveal">
          <div className="tools-head">
            <div className="pill soft"><FiTool /> Herramientas</div>
            <p>Entorno de trabajo y utilidades del día a día.</p>
          </div>
          <div className="tools-grid">
            {toolChips.map((t) => (
              <div key={t.label} className="tool-item">
                <span className="tool-ico">{t.icon}</span>
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}