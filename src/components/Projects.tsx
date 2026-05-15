
import { useEffect, useMemo, useState } from "react";

type Project = {
  id: string;
  title: string;
  desc: string;
  img: string;
  category: "Frontend" | "Full Stack" | "Otro";
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
  featured?: boolean;
};


const ALL_PROJECTS: Project[] = [
  {
    id: "padex",
    title: "PADEX — Plataforma de reservas deportivas",
    desc:
      "Aplicación full stack para la gestión y reserva de pistas de pádel. Incluye autenticación, panel de administración, gestión de clubes, usuarios, pistas y reservas.",
    img: "/img/padex.jpg",
    category: "Full Stack",
    tech: ["React", "TypeScript", "Node.js", "Express", "MySQL", "JWT"],
    liveUrl: "#",
    codeUrl: "https://github.com/RaadOtman/proyecto-fin-grado",
    featured: true,
  },
  {
    id: "futbol-web-app",
    title: "Futbol Web App",
    desc:
      "Aplicación de gestión deportiva desarrollada en un entorno enterprise con DataFlex y MySQL. Permite gestionar equipos, jugadores, entrenadores y datos relacionados.",
    img: "/img/futbol-webapp.jpg",
    category: "Otro",
    tech: ["DataFlex", "MySQL", "WebApp", "CRUD", "Dashboard"],
    liveUrl: "#",
    codeUrl: "https://github.com/RaadOtman/futbol-web-app/tree/develop",
  },
  {
    id: "peluqueria-web",
    title: "Peluquería Web",
    desc:
      "Sitio web moderno para una peluquería, enfocado en diseño visual, experiencia móvil, presentación de servicios y contacto directo con el cliente.",
    img: "/img/peluqueria.jpg",
    category: "Frontend",
    tech: ["React", "Vite", "CSS", "Responsive", "UX/UI"],
    liveUrl: "https://mansour-tan.vercel.app/",
    codeUrl: "https://github.com/RaadOtman/peluqueria-web",
  },
  {
    id: "portfolio",
    title: "Portfolio Personal — Otmandev",
    desc:
      "Mi portfolio personal desarrollado con React, TypeScript y Vite, donde presento mis proyectos, tecnologías y evolución como desarrollador web.",
    img: "/img/port.jpg",
    category: "Frontend",
    tech: ["React", "TypeScript", "Vite", "CSS"],
    liveUrl: "/",
    codeUrl: "#",
  },
];
const CATEGORIES = ["Todos", "Frontend", "Full Stack", "Otro"] as const;

export default function Projects() {
  const [activeCat, setActiveCat] = useState<typeof CATEGORIES[number]>("Todos");
  const [q, setQ] = useState("");

  
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("#projects .reveal"));
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

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return ALL_PROJECTS.filter((p) => {
      const matchCat = activeCat === "Todos" ? true : p.category === activeCat;
      const matchText =
        text.length === 0
          ? true
          : [p.title, p.desc, p.tech.join(" ")].some((s) => s.toLowerCase().includes(text));
      return matchCat && matchText;
    });
  }, [activeCat, q]);

  
  const counts = useMemo(() => {
    const map: Record<typeof CATEGORIES[number], number> = {
      Todos: ALL_PROJECTS.length,
      Frontend: ALL_PROJECTS.filter((p) => p.category === "Frontend").length,
      "Full Stack": ALL_PROJECTS.filter((p) => p.category === "Full Stack").length,
      Otro: ALL_PROJECTS.filter((p) => p.category === "Otro").length,
    };
    return map;
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Header */}
        <div className="projects-head">
          <span className="overline">Featured Work</span>
          <h2 className="projects-title">
                Aplicaciones reales, diseño moderno y desarrollo full stack
          </h2>
          <p className="projects-intro">
            Una selección de proyectos donde combino desarrollo web, bases de datos, interfaces modernas y aplicaciones de gestión reales.
          </p>
        </div>

      
        <div className="filter-bar">
          <div className="filter-left">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${activeCat === cat ? "active" : ""}`}
                onClick={() => setActiveCat(cat)}
                aria-pressed={activeCat === cat}
              >
                {cat}
                <span className="chip-count">{counts[cat]}</span>
              </button>
            ))}
          </div>

          <div className="filter-right">
            <div className="search-wrap">
              <span className="search-ico" aria-hidden>
        
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm8.707 12.293-3.387-3.387A7.963 7.963 0 0 1 10 18a8 8 0 1 1 6.32-12.872l3.387 3.387a1 1 0 0 1 0 1.414l-1 1a1 1 0 0 1-1.414 0z" />
                </svg>
              </span>
              <input
                className="search-input"
                placeholder="Buscar por texto o tecnología…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            {q && (
              <button className="filter-chip clear" onClick={() => setQ("")} aria-label="Limpiar búsqueda">
                
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z"/>
                </svg>
                Limpiar
              </button>
            )}
          </div>
        </div>

       
        {filtered.length === 0 ? (
          
          <div className="card reveal" style={{ marginTop: 16, textAlign: "center", padding: 24 }}>
            <h3 style={{ marginTop: 0 }}>Próximamente</h3>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>
              Aún no hay proyectos que coincidan con el filtro/búsqueda.
            </p>
            <p style={{ color: "var(--muted)" }}>Vuelve pronto, iré publicando más trabajos.</p>
          </div>
        ) : (
          <div className="projects-grid modern-grid">
            {filtered.map((p) => (
             <article key={p.id}  className={`project-card reveal ${p.featured ? "featured-project" : ""}`}>
                <div className="project-media">
                  <img
                    className="project-img"
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                  />
                  <div className="project-media-glow" aria-hidden />
                </div>

                <div className="project-body">
                  <div className="project-title-row">
                    <h3 className="project-title">{p.title}</h3>
                    {p.featured && (
                      <span className="tag">Destacado</span>
                    )}
                  </div>
                  <p className="project-desc">{p.desc}</p>

                  <div className="project-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {p.liveUrl && (
                      <a className="btn" href={p.liveUrl} target="_blank" rel="noreferrer">
                        Ver sitio
                      </a>
                    )}
                    {p.codeUrl && (
                      <a className="btn ghost" href={p.codeUrl} target="_blank" rel="noreferrer">
                        Código
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}