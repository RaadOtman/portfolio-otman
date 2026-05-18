import { useEffect, useRef } from "react";
import Socials from "./Socials";
import { handleGlowMove } from "../utils/mouseGlow";
import { useI18n } from "../i18n";

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useI18n();

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
          <div className="hero-left hero-panel glow-card lang-fade" key={`hero-${lang}`} onMouseMove={handleGlowMove}>

            <div className="hero-badge">
              {t.hero.badge}
            </div>

            <h1 className="hero-title">
              {t.hero.titleA}
              <span className="grad">{t.hero.titleGradA}</span>
              <br />
              {t.hero.titleB}
              <span className="grad">{t.hero.titleGradB}</span>
            </h1>

            <p className="hero-sub">
              {t.hero.sub}
            </p>

            <p className="hero-text">
              {t.hero.text}
            </p>

            <div className="hero-mini-stats">

              {t.hero.stats.map(([value, label]) => (
                <div className="hero-stat" key={`${value}-${label}`}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}

            </div>

            <div className="hero-cta">
              <a className="btn" href="#projects">
                {t.hero.primaryCta}
              </a>

              <button className="btn ghost" onClick={goContact}>
                {t.hero.secondaryCta}
              </button>

              <div className="hero-socials">
                <Socials />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">

            <div className="hero-showcase" ref={wrapRef}>

              <div className="hero-floating-card hero-tech-badge react-card float-soft">
                React
              </div>

              <div className="hero-floating-card hero-tech-badge node-card float-soft">
                Node.js
              </div>

              <div className="hero-floating-card hero-tech-badge mysql-card float-soft">
                MySQL
              </div>

              <div className="hero-image-wrap">
                <img
                  className="hero-photo hero-padex-mockup"
                  src="/img/padex-mockup.png"
                  alt="PADEX dashboard"
                />
              </div>

              <div className="hero-product-panel">
                <span>{t.hero.cockpit.label}</span>
                <strong>{t.hero.cockpit.title}</strong>
                <div className="hero-product-metrics">
                  <small>{t.hero.cockpit.metricA}</small>
                  <small>{t.hero.cockpit.metricB}</small>
                  <small>{t.hero.cockpit.metricC}</small>
                </div>
              </div>

              <div className="hero-profile-card float-soft">
                <img src="/img/otman-hero.jpg" alt={t.hero.profile.name} />
                <div>
                  <strong>{t.hero.profile.name}</strong>
                  <span>{t.hero.profile.role}</span>
                </div>
              </div>

              <div className="hero-glow"></div>

            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
