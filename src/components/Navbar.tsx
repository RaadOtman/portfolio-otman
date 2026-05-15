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
      <a href="#top" className="brand" aria-label="Ir al inicio" onClick={() => setOpen(false)}>
        <span className="brand-text">Otman</span>
        <span className="brand-dot">dev.</span>
      </a>

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

      <div id="primary-navigation" className={`nav-right ${open ? "show" : ""}`}>
        <ul className="nav-links">
          <li><a className="nav-link active" href="#top" onClick={() => { scrollTop(); setOpen(false); }}>Inicio</a></li>
          <li><a className="nav-link" href="#about" onClick={() => setOpen(false)}>Sobre mí</a></li>
          <li><a className="nav-link" href="#projects" onClick={() => setOpen(false)}>Proyectos</a></li>
          <li><a className="nav-link" href="#skills" onClick={() => setOpen(false)}>Skills</a></li>
          <li><a className="nav-link contact-link" href="#contact" onClick={goContact}>Contacto</a></li>
        </ul>
      </div>
    </div>
  </nav>
);
}