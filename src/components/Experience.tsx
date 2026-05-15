// src/components/Experience.tsx
import { useEffect } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPhp,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaLinux,
  FaDocker,
} from "react-icons/fa";
import {
  FiTool,
  FiCode,
  FiLayers,
  FiServer,
  FiDatabase,
  FiGitBranch,
  FiGlobe,
  FiBookOpen,
} from "react-icons/fi";
import { handleGlowMove } from "../utils/mouseGlow";

export default function Experience() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("#experience .reveal"));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target as Element);
          }
        });
      },
      { threshold: 0.18 }
    );

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
        <div className="reveal">
          <span className="overline">Stack & Workflow</span>

          <h2 className="skills-title">
            Tecnologías que uso para construir productos web
          </h2>

          <p className="skills-intro">
            Trabajo con frontend, backend, bases de datos y herramientas de despliegue para crear
            aplicaciones completas. Mi objetivo no es solo que una web funcione, sino que tenga una
            buena estructura, sea mantenible y transmita una experiencia visual cuidada.
          </p>
        </div>

        <div className="skills-grid" style={{ marginTop: 24 }}>
          <article className="skill-card glow-card reveal" onMouseMove={handleGlowMove}>
            <header className="skill-card-head">
              <div className="pill grad">
                <FiLayers /> Frontend
              </div>
              <p>Interfaces modernas, responsive, accesibilidad y experiencia de usuario.</p>
            </header>

            <div className="chips">
              <span className="chip"><FaHtml5 color="#E34F26" /> HTML5</span>
              <span className="chip"><FaCss3Alt color="#1572B6" /> CSS3</span>
              <span className="chip"><FaJs color="#F7DF1E" /> JavaScript</span>
              <span className="chip"><FaReact color="#61DAFB" /> React</span>
              <span className="chip">TypeScript</span>
              <span className="chip">Vite</span>
              <span className="chip">Responsive Design</span>
              <span className="chip">UX/UI</span>
            </div>
          </article>

          <article className="skill-card glow-card reveal" onMouseMove={handleGlowMove}>
            <header className="skill-card-head">
              <div className="pill grad">
                <FiServer /> Backend & APIs
              </div>
              <p>APIs, autenticación, validaciones y lógica de aplicación.</p>
            </header>

            <div className="chips">
              <span className="chip"><FaNodeJs color="#68A063" /> Node.js</span>
              <span className="chip">Express</span>
              <span className="chip"><FaPhp color="#777BB4" /> PHP</span>
              <span className="chip">REST API</span>
              <span className="chip">JWT</span>
              <span className="chip">Validaciones</span>
              <span className="chip">CRUD</span>
            </div>
          </article>

          <article className="skill-card glow-card reveal" onMouseMove={handleGlowMove}>
            <header className="skill-card-head">
              <div className="pill grad">
                <FiDatabase /> Bases de datos
              </div>
              <p>Modelado, relaciones, consultas y persistencia de datos.</p>
            </header>

            <div className="chips">
              <span className="chip"><FaDatabase /> MySQL</span>
              <span className="chip">MariaDB</span>
              <span className="chip">MySQL Workbench</span>
              <span className="chip">SQL</span>
              <span className="chip">Relaciones</span>
              <span className="chip">Triggers</span>
              <span className="chip">Procedimientos</span>
            </div>
          </article>

          <article className="skill-card glow-card reveal" onMouseMove={handleGlowMove}>
            <header className="skill-card-head">
              <div className="pill grad">
                <FiTool /> Entornos y plataformas
              </div>
              <p>Herramientas que he usado en proyectos, prácticas y despliegues.</p>
            </header>

            <div className="chips">
              <span className="chip">VS Code</span>
              <span className="chip">Vercel</span>
              <span className="chip">Render</span>
              <span className="chip">Postman</span>
              <span className="chip">Thunder Client</span>
              <span className="chip">XAMPP</span>
              <span className="chip">Apache</span>
              <span className="chip">Moodle</span>
              <span className="chip">DataFlex</span>
            </div>
          </article>
        </div>

        <div className="tools-card card glow-card reveal" style={{ marginTop: 24 }} onMouseMove={handleGlowMove}>
          <div className="tools-head">
            <div className="pill soft">
              <FiGitBranch /> Workflow de desarrollo
            </div>
            <p>
              Control de versiones, organización del proyecto y herramientas que utilizo para
              trabajar de forma más profesional.
            </p>
          </div>

          <div className="tools-grid">
            <div className="tool-item">
              <span className="tool-ico"><FaGitAlt color="#F05032" /></span>
              Git · control de versiones
            </div>

            <div className="tool-item">
              <span className="tool-ico"><FaGithub /></span>
              GitHub · repositorios
            </div>

            <div className="tool-item">
              <span className="tool-ico"><FiGitBranch /></span>
              GitFlow · ramas y features
            </div>

            <div className="tool-item">
              <span className="tool-ico"><FiGlobe /></span>
              Vercel · despliegue frontend
            </div>

            <div className="tool-item">
              <span className="tool-ico"><FiServer /></span>
              Render · backend/API
            </div>

            <div className="tool-item">
              <span className="tool-ico"><FaLinux /></span>
              Linux / terminal
            </div>

            <div className="tool-item">
              <span className="tool-ico"><FaDocker color="#2496ED" /></span>
              Docker · básico
            </div>

            <div className="tool-item">
              <span className="tool-ico"><FiBookOpen /></span>
              Moodle · LMS y plugins
            </div>

            <div className="tool-item">
              <span className="tool-ico"><FiCode /></span>
              DataFlex · WebApp
            </div>
          </div>
        </div>

        <div className="about-timeline reveal" style={{ marginTop: 24 }}>
          <div className="tl-item">
            <div className="tl-period">Actualidad</div>
            <div className="tl-dot"></div>
            <div className="tl-body">
              <div className="tl-title">Portfolio y proyectos full stack</div>
              <div className="tl-note">
                PADEX, Futbol Web App, peluquería web y mejoras continuas del portfolio personal.
              </div>
            </div>
          </div>

          <div className="tl-item">
            <div className="tl-period">DAW</div>
            <div className="tl-dot"></div>
            <div className="tl-body">
              <div className="tl-title">Desarrollo de Aplicaciones Web</div>
              <div className="tl-note">
                Frontend, backend, bases de datos, despliegues, documentación técnica y proyectos
                prácticos.
              </div>
            </div>
          </div>

          <div className="tl-item">
            <div className="tl-period">Extra</div>
            <div className="tl-dot"></div>
            <div className="tl-body">
              <div className="tl-title">Exploración de entornos profesionales</div>
              <div className="tl-note">
                Moodle, DataFlex, MySQL, XAMPP, Apache, GitFlow y herramientas usadas en contextos
                más cercanos a empresa.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
