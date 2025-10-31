import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  const goContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.querySelector<HTMLElement>("#contact");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    const form = section.querySelector(".contact-form");
    if (form) {
      form.classList.add("highlight");
      setTimeout(() => form.classList.remove("highlight"), 2000);
    }
    setOpen(false);
  };

  return (
    <nav className="nav" aria-label="Navegación principal">
      <div className="container nav-inner">
        {/* Marca izquierda */}
        <a href="#top" className="brand" aria-label="Ir al inicio">
          <span className="brand-text">Otman</span>
          <span className="brand-dot">dev.</span>
        </a>

        {/* Hamburguesa */}
        <button
          className="menu-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
          type="button"
        >
          <span className={`bar ${open ? "open" : ""}`}></span>
          <span className={`bar ${open ? "open" : ""}`}></span>
          <span className={`bar ${open ? "open" : ""}`}></span>
        </button>

        {/* Derecha */}
        <div id="primary-navigation" className={`nav-right ${open ? "show" : ""}`}>
          <button className="btn btn-nav" onClick={scrollTop} type="button">Inicio</button>
          <ul className="nav-links" onClick={() => setOpen(false)}>
            <li><a className="nav-link" href="#about">Sobre mí</a></li>
            <li><a className="nav-link" href="#projects">Proyectos</a></li>
            <li><a className="nav-link" href="#skills">Skills</a></li>
            <li><a className="nav-link" href="#contact" onClick={goContact}>Contacto</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}