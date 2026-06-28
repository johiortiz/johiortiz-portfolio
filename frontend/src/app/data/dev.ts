import type { Project } from "../types";

export const devProjects: Project[] = [
  {
    id: 1,
    title: "Libft",
    category: "dev",
    tag: "C Library",
    image: "/projects/dev/libft/cover.gif",
    images: ["/projects/dev/libft/cover.gif"],
    year: "2026",
    description:
      "Biblioteca propia en C con reimplementación de funciones estándar y utilidades base para futuros proyectos.",
    longDescription:
      "Libft es un proyecto de 42 centrado en construir una biblioteca personal en C a partir de la reimplementación de funciones habituales de manipulación de memoria, strings, conversión de datos y listas enlazadas. El objetivo es entender mejor los fundamentos del lenguaje, la gestión manual de memoria y crear una base reutilizable para proyectos posteriores.",
    stack: ["C", "Makefile", "Linux", "Git"],
    role: "Developer",
    repoUrl: "https://github.com/johiortiz/Libft",
  },
  {
    id: 2,
    title: "Fract-ol",
    category: "dev",
    tag: "C Graphics",
    image: "/projects/dev/fract-ol/cover.gif",
    images: ["/projects/dev/fract-ol/cover.gif"],
    year: "2026",
    description:
        "Visualizador de fractales en C con interacción por zoom, movimiento y renderizado gráfico en tiempo real.",
    longDescription:
        "Fract-ol es un proyecto de 42 centrado en programar un renderizador de fractales en C usando una librería gráfica. Permite explorar figuras matemáticas como Mandelbrot o Julia con interacción del usuario, zoom y navegación en tiempo real, reforzando conceptos de cálculo, gráficos y control de eventos.",
    stack: ["C", "MiniLibX", "Math", "Events", "Linux"],
    role: "Developer",
    repoUrl: "https://github.com/johiortiz/Fract-ol",
   },
];