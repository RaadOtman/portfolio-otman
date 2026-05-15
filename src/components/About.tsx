// src/components/About.tsx
import cvUrl from "@/assets/cv/otman-raad-cv.pdf";
import { useEffect } from "react";
import {
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import { FiCode, FiUser } from "react-icons/fi";
import { handleGlowMove } from "../utils/mouseGlow";

export default function About() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("#about .reveal"));
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
    <section id="about" className="section about">
      <div className="container">
        {/* Encabezado */}
        <div className="reveal">
          <span className="overline">Sobre mí</span>
          <h2 className="about-title">Desarrollo web con mentalidad de producto</h2>
            <p className="about-intro">
              Soy Otman Raad, desarrollador web junior formado en Desarrollo de Aplicaciones Web. Me centro en crear aplicaciones claras, funcionales y con una experiencia visual cuidada, combinando frontend, backend y bases de datos.
              <br /><br />
              Actualmente trabajo con React, TypeScript, Node.js y MySQL, y estoy construyendo proyectos como PADEX, Futbol Web App y sitios web orientados a clientes reales. Mi objetivo es seguir creciendo como desarrollador, aportar desde el primer día y aprender dentro de un equipo profesional.
          </p>
        </div>

        <div className="about-grid">
          {/* Foto y tags */}
          <aside className="about-photo-card glow-card reveal" onMouseMove={handleGlowMove}>
            <div className="about-photo-wrap">
              <img
                className="about-photo"
                src="/img/sobre-mi.jpg"
                alt="Otman Raad Aoulad Bouchaib"
              />
              <div className="about-ring"></div>
              <div className="about-dot"></div>
            </div>

            <div className="about-tags">
              <span className="tag">
                <FaHtml5 color="#E34F26" /> HTML5
              </span>
              <span className="tag">
                <FaCss3Alt color="#1572B6" /> CSS3
              </span>
              <span className="tag">
                <FaJs color="#F7DF1E" /> JavaScript
              </span>
              <span className="tag">
                <FaReact color="#61DAFB" /> React
              </span>
              <span className="tag">
                <FaPhp color="#777BB4" /> PHP
              </span>
              <span className="tag">
                <FaDatabase /> MySQL
              </span>
            </div>
          </aside>

          {/* Texto y botones */}
          <article className="about-content glow-card reveal" onMouseMove={handleGlowMove}>
            <h3 className="about-subtitle">
              <FiUser style={{ marginRight: 6 }} /> Desarrollador Web Junior
            </h3>
            <p>
              Actualmente me especializo en la creación de aplicaciones web con enfoque full stack.
              Me gusta mantener un código limpio, organizado y fácil de mantener.
            </p>

            <ul className="with-icons">
              <li>
                <FiCode className="li-ico" /> Diseño y desarrollo de sitios web responsive
              </li>
              <li>
                <FaReact className="li-ico" /> Interfaces dinámicas con React
              </li>
              <li>
                <FaPhp className="li-ico" /> Back-end en PHP o Node.js
              </li>
              <li>
                <FaDatabase className="li-ico" /> Modelado y gestión de bases de datos MySQL
              </li>
              <li>
                <FaGitAlt className="li-ico" /> Control de versiones con Git y GitHub
              </li>
            </ul>

            {/* Estadísticas */}
            <div className="about-stats">
             <div className="stat">
              <div className="stat-num">3</div>
              <div className="stat-label">Proyectos principales</div>
            </div>

              <div className="stat">
              <div className="stat-num">Full Stack</div>
               <div className="stat-label">Frontend + Backend</div>
               </div>
          <div className="stat">
            <div className="stat-num">React</div>
            <div className="stat-label">Stack principal</div>
            </div>
            </div>

            {/* Botones de CV */}
            <div className="about-ctas">
  <a className="btn ghost" href={cvUrl} target="_blank" rel="noopener noreferrer">
    Ver CV
  </a>

  <a className="btn btn-cv" href={cvUrl} download="Otman-Raad-CV.pdf">
    Descargar CV
  </a>
</div>

            {/* Timeline */}
            <div className="about-timeline reveal">
              <div className="tl-item">
                <div className="tl-period">2025</div>
                <div className="tl-dot"></div>
                <div className="tl-body">
                  <div className="tl-title">Finalizando DAW</div>
                  <div className="tl-note">Grado Superior en Desarrollo de Aplicaciones Web.</div>
                </div>
              </div>

              <div className="tl-item">
                <div className="tl-period">2024</div>
                <div className="tl-dot"></div>
                <div className="tl-body">
                  <div className="tl-title">Proyectos personales</div>
                  <div className="tl-note">
                    Aplicaciones web, portfolio profesional y primeros trabajos en React.
                  </div>
                </div>
              </div>

              <div className="tl-item">
                <div className="tl-period">2019 – 2025</div>
                <div className="tl-dot"></div>
                <div className="tl-body">
                  <div className="tl-title">Gerente de restauración moderna</div>
                  <div className="tl-note">
                    Dirección y gestión de equipos en entornos de alta exigencia. Desarrollo de
                    habilidades en liderazgo, planificación, organización y resolución de
                    incidencias, que hoy aplico al trabajo en equipo y a la gestión de proyectos
                    web.
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
