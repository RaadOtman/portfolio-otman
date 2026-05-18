import type { ReactNode } from "react";
import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "es" | "en";

const STORAGE_KEY = "portfolio-lang";

const dictionary = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      stack: "Stack",
      contact: "Contacto",
      toggleLabel: "Cambiar idioma",
    },
    hero: {
      badge: "Frontend Engineer Junior",
      titleA: "Diseño y construyo",
      titleGradA: " interfaces SaaS",
      titleB: "con lógica",
      titleGradB: " de producto",
      sub: "React · TypeScript · APIs REST · MySQL · UX/UI",
      text: "Transformo ideas en aplicaciones claras, rápidas y cuidadas. Trabajo desde la interfaz hasta la lógica que hace que el producto funcione.",
      primaryCta: "Ver proyectos",
      secondaryCta: "Contactar",
      stats: [
        ["4+", "Proyectos reales"],
        ["SaaS", "PADEX como TFG"],
        ["Producto", "UI + lógica"],
      ],
      cockpit: {
        label: "Product cockpit",
        title: "PADEX Platform",
        metricA: "Reservas",
        metricB: "Admin",
        metricC: "API",
      },
      profile: {
        name: "Otman Raad",
        role: "Frontend Engineer Junior",
      },
    },
    about: {
      overline: "Sobre mí",
      title: "Código claro, criterio visual y ganas de crecer",
      introA: "Soy Otman Raad, desarrollador junior formado en DAW. Me gusta convertir problemas reales en interfaces simples, útiles y bien terminadas.",
      introB: "He construido PADEX, Futbol Web App y sitios para clientes reales. Busco crecer en equipo, aportar pronto y aprender con ritmo profesional.",
      subtitle: "Desarrollador Web Junior",
      body: "Trabajo con atención al detalle, código ordenado y una visión práctica del producto.",
      bullets: [
        "Interfaces responsive con foco en usabilidad",
        "Componentes dinámicos con React",
        "Back-end en PHP o Node.js",
        "Modelado y gestión de bases de datos",
        "Git, GitHub y flujo de trabajo ordenado",
      ],
      stats: [
        ["3", "Proyectos principales"],
        ["Full Stack", "Frontend + Backend"],
        ["React", "Stack principal"],
      ],
      cvView: "Ver CV",
      cvDownload: "Descargar CV",
      timeline: [
        ["2025", "Finalizando DAW", "Grado Superior en Desarrollo de Aplicaciones Web."],
        ["2024", "Proyectos personales", "Portfolio profesional, aplicaciones web y primeros proyectos serios con React."],
        ["2019 - 2025", "Gestión y liderazgo", "Experiencia coordinando equipos, resolviendo incidencias y trabajando bajo presión."],
      ],
    },
    stack: {
      overline: "Stack & Workflow",
      title: "Stack técnico y forma de trabajar",
      intro: "Uso herramientas modernas para montar interfaces, APIs, bases de datos y despliegues. Priorizo estructura, mantenibilidad y una experiencia final cuidada.",
      cards: [
        ["Frontend", "Interfaces modernas, responsive, accesibles y pensadas para producto."],
        ["Backend & APIs", "Endpoints, autenticación, validaciones y lógica de aplicación."],
        ["Bases de datos", "Modelado, relaciones, consultas y persistencia de datos."],
        ["Entornos y plataformas", "Herramientas usadas en proyectos, prácticas y despliegues."],
      ],
      workflowTitle: "Workflow de desarrollo",
      workflowText: "Trabajo con control de versiones, ramas claras y herramientas que ayudan a mantener el proyecto organizado.",
      timeline: [
        ["Actualidad", "Portfolio y proyectos reales", "PADEX, Futbol Web App, peluquería web y mejoras continuas del portfolio."],
        ["DAW", "Desarrollo de Aplicaciones Web", "Frontend, backend, bases de datos, despliegues y documentación técnica."],
        ["Extra", "Entornos profesionales", "Moodle, DataFlex, MySQL, XAMPP, Apache, GitFlow y herramientas de empresa."],
      ],
    },
    projects: {
      overline: "Featured Work",
      title: "Aplicaciones reales con estética de producto",
      intro: "Proyectos donde combino interfaz, lógica, datos y diseño para acercarme a cómo se construye software en un entorno profesional.",
      featuredLabel: "Producto principal · TFG DAW",
      featuredTitle: "PADEX — Plataforma SaaS de reservas deportivas",
      featuredText: "PADEX centraliza reservas, pistas, usuarios y administración para clubes deportivos. Es mi proyecto más completo: interfaz moderna, API REST, autenticación y base de datos relacional trabajando juntas.",
      featuredBadges: ["SaaS", "Dashboard", "API REST", "MySQL"],
      metrics: [
        ["4", "Módulos clave"],
        ["JWT", "Auth protegida"],
        ["Admin", "Panel de gestión"],
      ],
      architectureTitle: "Arquitectura",
      architectureItems: ["React UI", "Express API", "MySQL DB"],
      highlights: [
        ["Auth", "JWT y rutas protegidas"],
        ["Admin", "Panel de gestión"],
        ["Reservas", "Control de pistas y horarios"],
        ["DB", "MySQL relacional"],
      ],
      code: "Ver código",
      demo: "Ver demo",
      othersOverline: "Otros proyectos",
      othersTitle: "Más trabajos que completan mi perfil",
      all: "Todos",
      search: "Buscar por texto o tecnología...",
      clear: "Limpiar",
      noResultsTitle: "Sin resultados",
      noResultsText: "No hay proyectos que coincidan con ese filtro.",
      viewSite: "Ver sitio",
      categories: {
        Frontend: "Frontend",
        "Full Stack": "Full Stack",
        Otro: "Otro",
      },
      items: {
        padex: {
          title: "PADEX — Plataforma de reservas deportivas",
          desc: "Aplicación full stack para gestionar reservas de pistas de pádel, clubes, usuarios y administración.",
        },
        "futbol-web-app": {
          title: "Futbol Web App",
          desc: "Aplicación de gestión deportiva en entorno enterprise con DataFlex y MySQL.",
        },
        "peluqueria-web": {
          title: "Peluquería Web",
          desc: "Sitio moderno para una peluquería, con enfoque visual, experiencia móvil y contacto directo.",
        },
        portfolio: {
          title: "Portfolio Personal — Otmandev",
          desc: "Portfolio con React, TypeScript y Vite para presentar proyectos, stack y evolución profesional.",
        },
      },
    },
    contact: {
      overline: "Contacto",
      title: "Hablemos",
      intro: "Cuéntame qué necesitas o escríbeme para colaborar. Respondo lo antes posible.",
      email: "Email",
      phone: "Teléfono",
      location: "Ubicación",
      socials: "Redes",
      available: "Disponible para trabajar",
      name: "Nombre",
      subject: "Asunto (opcional)",
      message: "Mensaje",
      privacy: "He leído y acepto la política de privacidad.",
      privacyPrefix: "He leído y acepto la",
      privacyLink: "política de privacidad",
      send: "Enviar",
      sending: "Enviando...",
      sentTitle: "Mensaje enviado",
      sentText: "Gracias por contactarme. Te responderé lo antes posible.",
      sendAnother: "Enviar otro",
      errorTitle: "Ups, algo falló",
      errorFallback: "Inténtalo de nuevo en unos minutos.",
      back: "Volver al formulario",
      network: "Error de red. Comprueba tu conexión e inténtalo de nuevo.",
      submitError: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
    },
    footer: {
      text: "Portfolio personal enfocado en interfaces modernas, producto digital y aplicaciones full stack.",
      role: "Full Stack Developer Junior",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      stack: "Stack",
      contact: "Contact",
      toggleLabel: "Change language",
    },
    hero: {
      badge: "Junior Frontend Engineer",
      titleA: "I design and build",
      titleGradA: " SaaS interfaces",
      titleB: "with a",
      titleGradB: " product mindset",
      sub: "React · TypeScript · REST APIs · MySQL · UX/UI",
      text: "I turn ideas into clear, fast and polished applications, connecting the interface with the logic that makes the product work.",
      primaryCta: "View projects",
      secondaryCta: "Contact",
      stats: [
        ["4+", "Real projects"],
        ["SaaS", "PADEX final project"],
        ["Product", "UI + logic"],
      ],
      cockpit: {
        label: "Product cockpit",
        title: "PADEX Platform",
        metricA: "Bookings",
        metricB: "Admin",
        metricC: "API",
      },
      profile: {
        name: "Otman Raad",
        role: "Junior Frontend Engineer",
      },
    },
    about: {
      overline: "About me",
      title: "Clear code, sharp UI taste and room to grow",
      introA: "I'm Otman Raad, a junior developer trained in web application development. I like turning real problems into simple, useful and polished interfaces.",
      introB: "I've built PADEX, Futbol Web App and client-oriented websites. I'm looking to grow with a team, contribute early and learn at a professional pace.",
      subtitle: "Junior Web Developer",
      body: "I work with attention to detail, organized code and a practical product view.",
      bullets: [
        "Responsive interfaces focused on usability",
        "Dynamic components with React",
        "Back-end with PHP or Node.js",
        "Database modeling and management",
        "Git, GitHub and organized workflows",
      ],
      stats: [
        ["3", "Main projects"],
        ["Full Stack", "Frontend + Backend"],
        ["React", "Main stack"],
      ],
      cvView: "View CV",
      cvDownload: "Download CV",
      timeline: [
        ["2025", "Finishing DAW", "Higher Degree in Web Application Development."],
        ["2024", "Personal projects", "Professional portfolio, web apps and first serious React projects."],
        ["2019 - 2025", "Management and leadership", "Experience coordinating teams, solving issues and working under pressure."],
      ],
    },
    stack: {
      overline: "Stack & Workflow",
      title: "Technical stack and how I work",
      intro: "I use modern tools to build interfaces, APIs, databases and deployments. I care about structure, maintainability and a polished final experience.",
      cards: [
        ["Frontend", "Modern, responsive and accessible interfaces designed around product use."],
        ["Backend & APIs", "Endpoints, authentication, validation and application logic."],
        ["Databases", "Modeling, relationships, queries and data persistence."],
        ["Tools & platforms", "Tools used in projects, internships and deployments."],
      ],
      workflowTitle: "Development workflow",
      workflowText: "I work with version control, clear branches and tools that keep the project organized.",
      timeline: [
        ["Now", "Portfolio and real projects", "PADEX, Futbol Web App, hair salon website and continuous portfolio improvements."],
        ["DAW", "Web Application Development", "Frontend, backend, databases, deployments and technical documentation."],
        ["Extra", "Professional environments", "Moodle, DataFlex, MySQL, XAMPP, Apache, GitFlow and company-oriented tools."],
      ],
    },
    projects: {
      overline: "Featured Work",
      title: "Real apps with a product feel",
      intro: "Projects where I combine interface, logic, data and design to get closer to how software is built in a professional environment.",
      featuredLabel: "Main product · DAW final project",
      featuredTitle: "PADEX — Sports booking SaaS platform",
      featuredText: "PADEX centralizes bookings, courts, users and administration for sports clubs. It is my most complete project: modern UI, REST API, authentication and a relational database working together.",
      featuredBadges: ["SaaS", "Dashboard", "REST API", "MySQL"],
      metrics: [
        ["4", "Key modules"],
        ["JWT", "Protected auth"],
        ["Admin", "Management panel"],
      ],
      architectureTitle: "Architecture",
      architectureItems: ["React UI", "Express API", "MySQL DB"],
      highlights: [
        ["Auth", "JWT and protected routes"],
        ["Admin", "Management panel"],
        ["Bookings", "Court and schedule control"],
        ["DB", "Relational MySQL"],
      ],
      code: "View code",
      demo: "View demo",
      othersOverline: "Other projects",
      othersTitle: "More work that rounds out my profile",
      all: "All",
      search: "Search by text or technology...",
      clear: "Clear",
      noResultsTitle: "No results",
      noResultsText: "No projects match that filter.",
      viewSite: "View site",
      categories: {
        Frontend: "Frontend",
        "Full Stack": "Full Stack",
        Otro: "Other",
      },
      items: {
        padex: {
          title: "PADEX — Sports booking platform",
          desc: "Full stack app to manage padel court bookings, clubs, users and administration.",
        },
        "futbol-web-app": {
          title: "Football Web App",
          desc: "Sports management app built in an enterprise environment with DataFlex and MySQL.",
        },
        "peluqueria-web": {
          title: "Hair Salon Website",
          desc: "Modern website for a hair salon, focused on visuals, mobile experience and direct contact.",
        },
        portfolio: {
          title: "Personal Portfolio — Otmandev",
          desc: "Portfolio built with React, TypeScript and Vite to present projects, stack and growth.",
        },
      },
    },
    contact: {
      overline: "Contact",
      title: "Let's talk",
      intro: "Tell me what you need or reach out to collaborate. I reply as soon as possible.",
      email: "Email",
      phone: "Phone",
      location: "Location",
      socials: "Socials",
      available: "Open to work",
      name: "Name",
      subject: "Subject (optional)",
      message: "Message",
      privacy: "I have read and accept the privacy policy.",
      privacyPrefix: "I have read and accept the",
      privacyLink: "privacy policy",
      send: "Send",
      sending: "Sending...",
      sentTitle: "Message sent",
      sentText: "Thanks for reaching out. I will reply as soon as possible.",
      sendAnother: "Send another",
      errorTitle: "Something went wrong",
      errorFallback: "Try again in a few minutes.",
      back: "Back to form",
      network: "Network error. Check your connection and try again.",
      submitError: "The message could not be sent. Please try again.",
    },
    footer: {
      text: "Personal portfolio focused on modern interfaces, digital product and full stack applications.",
      role: "Junior Full Stack Developer",
    },
  },
} as const;

type Copy = (typeof dictionary)[Lang];

const I18nContext = createContext<{
  lang: Lang;
  t: Copy;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
} | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "es";
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "es";
  });

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    window.localStorage.setItem(STORAGE_KEY, nextLang);
  };

  const value = useMemo(
    () => ({
      lang,
      t: dictionary[lang],
      setLang,
      toggleLang: () => setLang(lang === "es" ? "en" : "es"),
    }),
    [lang]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return createElement(I18nContext.Provider, { value }, children);
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
