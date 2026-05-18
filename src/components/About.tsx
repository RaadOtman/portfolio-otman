// src/components/About.tsx
import cvUrl from "@/assets/cv/Otman_Raad_Frontend_FullStack.pdf";
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
import { useI18n } from "../i18n";

export default function About() {
  const { t } = useI18n();

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
          <span className="overline">{t.about.overline}</span>
          <h2 className="about-title">{t.about.title}</h2>
            <p className="about-intro">
              {t.about.introA}
              <br /><br />
              {t.about.introB}
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
              <FiUser style={{ marginRight: 6 }} /> {t.about.subtitle}
            </h3>
            <p>
              {t.about.body}
            </p>

            <ul className="with-icons">
              <li>
                <FiCode className="li-ico" /> {t.about.bullets[0]}
              </li>
              <li>
                <FaReact className="li-ico" /> {t.about.bullets[1]}
              </li>
              <li>
                <FaPhp className="li-ico" /> {t.about.bullets[2]}
              </li>
              <li>
                <FaDatabase className="li-ico" /> {t.about.bullets[3]}
              </li>
              <li>
                <FaGitAlt className="li-ico" /> {t.about.bullets[4]}
              </li>
            </ul>

            {/* Estadísticas */}
            <div className="about-stats">
              {t.about.stats.map(([value, label]) => (
                <div className="stat" key={`${value}-${label}`}>
                  <div className="stat-num">{value}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* Botones de CV */}
            <div className="about-ctas">
  <a className="btn ghost" href={cvUrl} target="_blank" rel="noopener noreferrer">
    {t.about.cvView}
  </a>

  <a className="btn btn-cv" href={cvUrl} download="Otman-Raad-CV.pdf">
    {t.about.cvDownload}
  </a>
</div>

            {/* Timeline */}
            <div className="about-timeline reveal">
              {t.about.timeline.map(([period, title, note]) => (
                <div className="tl-item" key={`${period}-${title}`}>
                  <div className="tl-period">{period}</div>
                  <div className="tl-dot"></div>
                  <div className="tl-body">
                    <div className="tl-title">{title}</div>
                    <div className="tl-note">{note}</div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
