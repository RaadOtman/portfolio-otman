// src/components/About.tsx
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
import { FiCheckCircle, FiCode, FiDownload, FiExternalLink, FiUser } from "react-icons/fi";

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
          <h2 className="about-title">Conóceme un poco más</h2>
          <p className="about-intro">
            Soy un desarrollador web apasionado por la tecnología y la creación de soluciones
            digitales que aporten valor real. A lo largo de mi formación en{" "}
            <b>Desarrollo de Aplicaciones Web (DAW)</b>, he trabajado con lenguajes y herramientas
            como <b>HTML, CSS, JavaScript, React, PHP, Node.js y MySQL</b>, desarrollando tanto la
            parte visual como la lógica y la persistencia de datos de diferentes proyectos. Mi
            experiencia previa como <b>gerente en restauración moderna</b> me ha permitido adquirir
            competencias clave como la gestión de equipos, la organización, la toma de decisiones y
            la orientación a resultados, habilidades que aplico ahora al desarrollo web con un
            enfoque profesional y responsable. Busco mi{" "}
            <b>primera oportunidad laboral como Desarrollador Web Junior</b>, en un entorno donde
            pueda seguir creciendo, aprender de otros profesionales y contribuir al desarrollo de
            proyectos reales que marquen la diferencia.
          </p>
        </div>

        <div className="about-grid">
          {/* Foto y tags */}
          <aside className="about-photo-card reveal">
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
          <article className="about-content reveal">
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
                <div className="stat-num">1+</div>
                <div className="stat-label">Años de experiencia</div>
              </div>
              <div className="stat">
                <div className="stat-num">1+</div>
                <div className="stat-label">Proyectos web</div>
              </div>
              <div className="stat">
                <div className="stat-num">∞</div>
                <div className="stat-label">Ganas de aprender</div>
              </div>
            </div>

            {/* Botones de CV */}
            <div className="about-ctas">
            <div className="about-ctas">
  <a
    className="btn ghost"
    href="/otman-raad-cv.pdf"
    target="_blank"
    rel="noopener noreferrer"
  >
    Ver CV
  </a>

  <a
    className="btn btn-cv"
    href="/otman-raad-cv.pdf"
    download="Otman-Raad-CV.pdf"
  >
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