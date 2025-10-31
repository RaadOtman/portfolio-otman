export type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    title: "Gestor de Tareas",
    description: "CRUD de tareas con login, filtros y estados. Stack: React + Node + MySQL.",
    tech: ["React","Node","MySQL","REST"],
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/tuuser/todo-app",
    demo: "#"
  },
  {
    title: "Ecommerce Demo",
    description: "Catálogo, carrito y checkout simulado. Stack: React + Stripe (modo test).",
    tech: ["React","Stripe","Frontend"],
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/tuuser/shop-demo",
    demo: "#"
  },
  {
    title: "API de Padel",
    description: "API REST para reservas de pistas. Documentada con Swagger.",
    tech: ["Node","Express","Swagger","APIs","Backend"],
    image: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/tuuser/padel-api",
    demo: "#"
  }
];