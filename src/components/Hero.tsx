import { useEffect, useRef } from "react";
import Socials from "./Socials";

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  // Scroll al contacto con highlight (como antes)
  const goContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const section = document.querySelector<HTMLElement>("#contact");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    const form = section.querySelector(".contact-form");
    if (form) {
      form.classList.add("highlight");
      setTimeout(() => form.classList.remove("highlight"), 2000);
    }
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    const photo = photoRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const shine = shineRef.current;
    if (!wrap || !card || !photo || !ring || !dot || !shine) return;

    let hovering = false;

    const onMove = (e: MouseEvent) => {
      if (!hovering) return;
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const midX = r.width / 2;
      const midY = r.height / 2;

      // normalizados (-1 a 1)
      const nx = (x - midX) / midX;
      const ny = (y - midY) / midY;

      // tilt
      const rotX = (-ny * 10); // grados
      const rotY = (nx * 12);

      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      // Parallax en Z
      photo.style.transform = `translateZ(40px)`;
      ring.style.transform = `translateZ(20px) rotate(8deg)`;
      dot.style.transform = `translateZ(60px)`;

      // Shine que sigue al cursor
      shine.style.opacity = "1";
      shine.style.background = `radial-gradient(240px 240px at ${x}px ${y}px, rgba(255,255,255,.18), transparent 60%)`;
    };

    const onEnter = () => {
      hovering = true;
      wrap.classList.add("is-hover");
    };

    const onLeave = () => {
      hovering = false;
      wrap.classList.remove("is-hover");
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      photo.style.transform = `translateZ(0)`;
      ring.style.transform = `translateZ(0) rotate(8deg)`;
      dot.style.transform = `translateZ(0)`;
      shine.style.opacity = "0";
    };

    // Desactivar en móvil / reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduce) return;

    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header id="top" className="hero hero-2col">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-left card-glass">
            <span className="badge">Desarrollador Web Junior</span>
            <h1 className="hero-title">
              Hola, soy <span className="grad">Otman Raad</span>
            </h1>
            <p className="hero-sub">
              Construyo interfaces limpias y APIs sencillas con <b>HTML • CSS • JavaScript • React • PHP/Node • MySQL</b>.
              Me enfoco en <i>accesibilidad</i>, <i>rendimiento</i> y buenas prácticas.
            </p>
            <div className="hero-cta">
              <a className="btn" href="#projects">🚀 Ver proyectos</a>
              <button className="btn ghost" onClick={goContact}>📬 Contacto</button>
              <div className="hero-socials"><Socials /></div>
            </div>
          </div>

          {/* FOTO INTERACTIVA */}
          <div className="hero-right">
            <div className="hero-photo-wrap interactive" ref={wrapRef}>
              <div className="hero-3d" ref={cardRef}>
                <img
                  className="hero-photo"
                  ref={photoRef}
                  src="/img/otman-hero.jpg"
                  alt="Otman — foto perfil"
                />
                <div className="hero-ring" ref={ringRef}></div>
                <div className="hero-dot" ref={dotRef}></div>
                <div className="hero-shine" ref={shineRef}></div>
              </div>
            </div>
          </div>
          {/* /FOTO INTERACTIVA */}
        </div>
      </div>
    </header>
  );
}