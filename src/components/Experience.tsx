// src/components/Experience.tsx
import { useEffect } from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp, FaNodeJs, FaDatabase,
  FaGitAlt, FaGithub, FaLinux, FaDocker
} from "react-icons/fa";
import { FiTool, FiBriefcase, FiCode, FiLayers, FiServer, FiTrendingUp } from "react-icons/fi";

export default function Experience() {
  // Reveal on scroll con fallback (mismo patrón que About/Contact)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("#experience .reveal"));
    if (els.length === 0) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target as Element);
        }
      });
    }, { threshold: 0.18 });

    const checkNow = () => {
      const vh = window.innerHeight || 800;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9) {
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    };

    els.forEach((el) => io.observe(el));
    checkNow();
    const onScroll = () => checkNow();
    const onResize = () => checkNow();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Cabecera */}
        <div className="reveal">
          <span className="overline">Experiencia</span>
          <h2 className="skills-title">Experiencia como Desarrollador Web</h2>
          <p className="skills-intro">
            Experiencia práctica construyendo interfaces con <b>HTML, CSS, JavaScript, React</b> y
            APIs con <b>Node.js/PHP</b> y <b>MySQL</b>; control de versiones con <b>Git/GitHub</b>,
            despliegues en <b>Vercel</b> y buenas prácticas de accesibilidad y rendimiento.
          </p>
        </div>

        {/* Matriz de tecnologías clave */}
        <div className="skills-grid" style={{ marginTop: 20 }}>
          {/* Frontend */}
          <article className="skill-card reveal">
            <header className="skill-card-head">
              <div className="pill grad"><FiLayers /> Frontend</div>
              <p>UI/UX, semántica, responsive y accesibilidad.</p>
            </header>
            <div className="chips">
              <span className="chip"><FaHtml5 color="#E34F26" /> HTML5</span>
              <span className="chip"><FaCss3Alt color="#1572B6" /> CSS3</span>
              <span className="chip"><FaJs color="#F7DF1E" /> JavaScript</span>
              <span className="chip"><FaReact color="#61DAFB" /> React</span>
              <span className="chip">SPA · Vite</span>
              <span className="chip">A11y</span>
              <span className="chip">Performance</span>
            </div>
          </article>

          {/* Backend */}
          <article className="skill-card reveal">
            <header className="skill-card-head">
              <div className="pill grad"><FiServer /> Backend & Datos</div>
              <p>APIs REST, autenticación básica y persistencia.</p>
            </header>
            <div className="chips">
              <span className="chip"><FaNodeJs color="#68A063" /> Node.js</span>
              <span className="chip"><FaPhp color="#777BB4" /> PHP</span>
              <span className="chip"><FaDatabase /> MySQL</span>
              <span className="chip">REST</span>
              <span className="chip">CRUD</span>
              <span className="chip">Validaciones</span>
            </div>
          </article>
        </div>

        {/* Herramientas & DevOps */}
        <div className="tools-card card reveal" style={{ marginTop: 20 }}>
          <div className="tools-head">
            <div className="pill soft"><FiTool /> Herramientas</div>
            <p>Workflow diario y despliegues.</p>
          </div>
          <div className="tools-grid">
            <div className="tool-item"><span className="tool-ico"><FaGitAlt color="#F05032" /></span>Git</div>
            <div className="tool-item"><span className="tool-ico"><FaGithub /></span>GitHub</div>
            <div className="tool-item"><span className="tool-ico"><FaLinux /></span>Linux (básico)</div>
            <div className="tool-item"><span className="tool-ico"><FaDocker color="#2496ED" /></span>Docker (básico)</div>
            <div className="tool-item">Vercel</div>
            <div className="tool-item">VS Code</div>
          </div>
        </div>

        {/* Experiencia / Logros en formato tarjetas */}
        <div className="projects-grid" style={{ marginTop: 22 }}>
          {/* Portfolio */}
          <article className="project-card reveal">
            <div className="project-body">
              <div className="project-title-row">
                <h3 className="project-title"><FiBriefcase style={{marginRight:8}} /> Portfolio Profesional</h3>
                <span className="tag">Frontend</span>
              </div>
              <p className="project-desc">
                Sitio personal con <b>React + TypeScript + Vite</b>, UI moderna (glassmorphism), animaciones reveal,
                sección <b>About</b> con iconos, <b>Skills</b> con barras, <b>Projects</b> filtrables y <b>Contact</b> con Formspree.
                CV visible/descargable y despliegue en Vercel.
              </p>
              <div className="project-tech">
                {["React","TypeScript","Vite","CSS","Formspree","Vercel"].map(t=>(
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </article>

          {/* Prácticas DAW / Proyectos académicos */}
          <article className="project-card reveal">
            <div className="project-body">
              <div className="project-title-row">
                <h3 className="project-title"><FiCode style={{marginRight:8}} /> Proyectos DAW</h3>
                <span className="tag">Full Stack</span>
              </div>
              <p className="project-desc">
                Ejercicios y casos prácticos con <b>HTML/CSS/JS</b>, <b>PHP/Node.js</b> y <b>MySQL</b>:
                CRUD, validaciones, autenticación básica, consultas SQL y buenas prácticas de estructura.
              </p>
              <div className="project-tech">
                {["HTML","CSS","JS","PHP","Node.js","MySQL","Git"].map(t=>(
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </article>

          {/* Hitos personales */}
          <article className="project-card reveal">
            <div className="project-body">
              <div className="project-title-row">
                <h3 className="project-title"><FiTrendingUp style={{marginRight:8}} /> Hitos y Aprendizajes</h3>
                <span className="tag">Grow</span>
              </div>
              <p className="project-desc">
                Mejora continua en accesibilidad, rendimiento, responsive design y pruebas manuales.
                Uso de GitFlow, PRs y despliegos previos de verificación (Vercel Preview).
              </p>
              <div className="project-tech">
                {["A11y","Performance","Responsive","GitFlow","Code Review"].map(t=>(
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </article>
        </div>

        {/* Mini timeline (resumen cronológico) */}
        <div className="about-timeline reveal" style={{ marginTop: 22 }}>
          <div className="tl-item">
            <div className="tl-period">2025</div>
            <div className="tl-dot"></div>
            <div className="tl-body">
              <div className="tl-title">Portfolio profesional en producción</div>
              <div className="tl-note">Stack: React + TS + Vite · Vercel · Formspree</div>
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-period">2024</div>
            <div className="tl-dot"></div>
            <div className="tl-body">
              <div className="tl-title">Proyectos DAW y prácticas full stack</div>
              <div className="tl-note">CRUD, auth básica, SQL, buenas prácticas</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}