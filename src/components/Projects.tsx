import { useEffect, useMemo, useState } from "react";
import { handleGlowMove } from "../utils/mouseGlow";
import { useI18n } from "../i18n";

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
    img: "/img/padex-mockup.png",
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
    img: "/img/futbol-webapp-mockup.png",
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
    img: "/img/mansour-mockup.png",
    category: "Frontend",
    tech: ["React", "Vite", "CSS", "Responsive", "UX/UI"],
    liveUrl: "https://mansour-tan.vercel.app/",
    codeUrl: "https://github.com/RaadOtman/peluqueria-web",
  },
  {
    id: "portfolio",
    title: "Portfolio Personal — Otmandev",
    desc:
      "Portfolio personal desarrollado con React, TypeScript y Vite, enfocado en presentar proyectos reales, stack técnico y evolución como desarrollador web.",
    img: "/img/port-mockup.png",
    category: "Frontend",
    tech: ["React", "TypeScript", "Vite", "CSS"],
    liveUrl: "/",
    codeUrl: "#",
  },
];

const CATEGORIES = ["Todos", "Frontend", "Full Stack", "Otro"] as const;

export default function Projects() {
  const { lang, t } = useI18n();
  const [activeCat, setActiveCat] = useState<typeof CATEGORIES[number]>("Todos");
  const [q, setQ] = useState("");

  const translatedProjects = useMemo(
    () =>
      ALL_PROJECTS.map((project) => ({
        ...project,
        title: t.projects.items[project.id as keyof typeof t.projects.items].title,
        desc: t.projects.items[project.id as keyof typeof t.projects.items].desc,
      })),
    [t]
  );

  const featuredProject = useMemo(() => translatedProjects.find((p) => p.featured), [translatedProjects]);
  const normalProjects = useMemo(() => translatedProjects.filter((p) => !p.featured), [translatedProjects]);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("#projects .reveal"));
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

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();

    return normalProjects.filter((p) => {
      const matchCat = activeCat === "Todos" ? true : p.category === activeCat;

      const matchText =
        text.length === 0
          ? true
          : [p.title, p.desc, p.tech.join(" ")]
              .some((s) => s.toLowerCase().includes(text));

      return matchCat && matchText;
    });
  }, [activeCat, normalProjects, q]);

  const counts = useMemo(() => {
    const projectsForCount = normalProjects;

    return {
      Todos: projectsForCount.length,
      Frontend: projectsForCount.filter((p) => p.category === "Frontend").length,
      "Full Stack": projectsForCount.filter((p) => p.category === "Full Stack").length,
      Otro: projectsForCount.filter((p) => p.category === "Otro").length,
    };
  }, [normalProjects]);

  const categoryLabel = (cat: typeof CATEGORIES[number]) =>
    cat === "Todos" ? t.projects.all : t.projects.categories[cat];

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="projects-head reveal lang-fade" key={`projects-head-${lang}`}>
          <span className="overline">{t.projects.overline}</span>

          <h2 className="projects-title">
            {t.projects.title}
          </h2>

          <p className="projects-intro">
            {t.projects.intro}
          </p>
        </div>

        {featuredProject && (
          <article className="featured-case glow-card reveal" onMouseMove={handleGlowMove}>
            <div className="featured-case-content">
              <div className="case-topline">
                <span className="case-label">{t.projects.featuredLabel}</span>
                <div className="case-badges">
                  {t.projects.featuredBadges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
              </div>

              <h3>{t.projects.featuredTitle}</h3>

              <p>
                {t.projects.featuredText}
              </p>

              <div className="case-metrics">
                {t.projects.metrics.map(([value, label]) => (
                  <div key={`${value}-${label}`}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="case-highlights">
                {t.projects.highlights.map(([value, label]) => (
                  <div key={`${value}-${label}`}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="project-tech">
                {featuredProject.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>

              <div className="project-actions">
                {featuredProject.liveUrl && featuredProject.liveUrl !== "#" && (
                  <a className="btn" href={featuredProject.liveUrl} target="_blank" rel="noreferrer">
                    {t.projects.demo}
                  </a>
                )}

                {featuredProject.codeUrl && (
                  <a className="btn ghost" href={featuredProject.codeUrl} target="_blank" rel="noreferrer">
                    {t.projects.code}
                  </a>
                )}
              </div>
            </div>

            <div className="featured-case-media">
              <div className="case-architecture">
                <span>{t.projects.architectureTitle}</span>
                {t.projects.architectureItems.map((item) => (
                  <strong key={item}>{item}</strong>
                ))}
              </div>
              <img src={featuredProject.img} alt={featuredProject.title} loading="lazy" />
            </div>
          </article>
        )}

        <div className="projects-subhead reveal">
          <div>
            <span className="overline">{t.projects.othersOverline}</span>
            <h3>{t.projects.othersTitle}</h3>
          </div>
        </div>

        <div className="filter-bar reveal">
          <div className="filter-left">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${activeCat === cat ? "active" : ""}`}
                onClick={() => setActiveCat(cat)}
                aria-pressed={activeCat === cat}
              >
                {categoryLabel(cat)}
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
                placeholder={t.projects.search}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            {q && (
              <button className="filter-chip clear" onClick={() => setQ("")} aria-label={t.projects.clear}>
                {t.projects.clear}
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card reveal" style={{ marginTop: 16, textAlign: "center", padding: 24 }}>
            <h3 style={{ marginTop: 0 }}>{t.projects.noResultsTitle}</h3>
            <p style={{ color: "var(--muted)", marginBottom: 0 }}>
              {t.projects.noResultsText}
            </p>
          </div>
        ) : (
          <div className="projects-grid modern-grid">
            {filtered.map((p) => (
              <article key={p.id} className="project-card glow-card reveal" onMouseMove={handleGlowMove}>
                <div className="project-media">
                  <img className="project-img" src={p.img} alt={p.title} loading="lazy" />
                  <div className="project-media-glow" aria-hidden />
                </div>

                <div className="project-body">
                  <div className="project-title-row">
                    <h3 className="project-title">{p.title}</h3>
                    <span className="tag">{t.projects.categories[p.category]}</span>
                  </div>

                  <p className="project-desc">{p.desc}</p>

                  <div className="project-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {p.liveUrl && p.liveUrl !== "#" && (
                      <a className="btn" href={p.liveUrl} target="_blank" rel="noreferrer">
                        {t.projects.viewSite}
                      </a>
                    )}

                    {p.codeUrl && p.codeUrl !== "#" && (
                      <a className="btn ghost" href={p.codeUrl} target="_blank" rel="noreferrer">
                        {t.projects.code}
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
