import { useEffect, useRef } from "react";
import Socials from "./Socials";
import { handleGlowMove } from "../utils/mouseGlow";

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const goContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const section = document.querySelector<HTMLElement>("#contact");

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const wrap = wrapRef.current;

    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let hovering = false;

    const onMove = (e: MouseEvent) => {
      if (!hovering) return;

      const rect = wrap.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 8;

      wrap.style.transform = `
        perspective(1400px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    };

    const onEnter = () => {
      hovering = true;
    };

    const onLeave = () => {
      hovering = false;

      wrap.style.transform = `
        perspective(1400px)
        rotateX(0deg)
        rotateY(0deg)
      `;
    };

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) return;

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header id="top" className="hero hero-premium">
      <div className="container">
        <div className="hero-grid">

          {/* LEFT */}
          <div className="hero-left hero-panel glow-card" onMouseMove={handleGlowMove}>

            <div className="hero-badge">
              Full Stack Developer Junior
            </div>

            <h1 className="hero-title">
              Desarrollo aplicaciones web
              <span className="grad"> modernas</span>
              <br />
              con enfoque
              <span className="grad"> full stack</span>
            </h1>

            <p className="hero-sub">
              React · TypeScript · Node.js · MySQL · APIs REST · UX/UI
            </p>

            <p className="hero-text">
              Desarrollo proyectos reales centrados en experiencia de usuario,
              arquitectura limpia y diseño moderno. Actualmente construyendo
              plataformas como PADEX y aplicaciones de gestión completas.
            </p>

            <div className="hero-mini-stats">

              <div className="hero-stat">
                <strong>4+</strong>
                <span>Proyectos reales</span>
              </div>

              <div className="hero-stat">
                <strong>Full Stack</strong>
                <span>Frontend + Backend</span>
              </div>

              <div className="hero-stat">
                <strong>TFG SaaS</strong>
                <span>PADEX Platform</span>
              </div>

            </div>

            <div className="hero-cta">
              <a className="btn" href="#projects">
                Ver proyectos
              </a>

              <button className="btn ghost" onClick={goContact}>
                Contactar
              </button>

              <div className="hero-socials">
                <Socials />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">

            <div className="hero-showcase" ref={wrapRef}>

              <div className="hero-floating-card react-card float-soft">
                React
              </div>

              <div className="hero-floating-card node-card float-soft">
                Node.js
              </div>

              <div className="hero-floating-card mysql-card float-soft">
                MySQL
              </div>

              <div className="hero-image-wrap">
                <img
                  className="hero-photo"
                  src="/img/otman-hero.jpg"
                  alt="Otman Raad"
                />
              </div>

              <div className="hero-glow"></div>

            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
