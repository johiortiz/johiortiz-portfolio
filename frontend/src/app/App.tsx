import { useState, useEffect, useRef } from "react";
import perfilPhoto from "@/imports/perfilphoto.png";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, Github, Instagram, Linkedin, Mail, ExternalLink } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
type Category = "all" | "dev" | "design" | "illustration" | "photo";

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, "all">;
  tag: string;
  image: string;
  year: string;
  description: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const ROLES = ["Fullstack Developer", "Graphic Designer", "Illustrator", "Photographer"];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Archi Studio",
    category: "dev",
    tag: "Web App",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop&auto=format",
    year: "2024",
    description: "Architecture firm platform with 3D visualization tools",
  },
  {
    id: 2,
    title: "Bloom Brand",
    category: "design",
    tag: "Brand Identity",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
    year: "2024",
    description: "Full brand system for a sustainable cosmetics line",
  },
  {
    id: 3,
    title: "Nocturnal Series",
    category: "illustration",
    tag: "Editorial",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=600&fit=crop&auto=format",
    year: "2023",
    description: "12-piece illustration series for a literary magazine",
  },
  {
    id: 4,
    title: "Urban Fragments",
    category: "photo",
    tag: "Photography",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&auto=format",
    year: "2024",
    description: "Street photography documenting metropolitan loneliness",
  },
  {
    id: 5,
    title: "Orbis Dashboard",
    category: "dev",
    tag: "SaaS",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format",
    year: "2023",
    description: "Analytics platform for creative agencies",
  },
  {
    id: 6,
    title: "Solstice Poster",
    category: "design",
    tag: "Print",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop&auto=format",
    year: "2023",
    description: "Limited edition poster for a music festival",
  },
  {
    id: 7,
    title: "Quiet Hours",
    category: "photo",
    tag: "Documentary",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop&auto=format",
    year: "2024",
    description: "Documentary series on vanishing crafts",
  },
  {
    id: 8,
    title: "Mycelium",
    category: "illustration",
    tag: "Digital Art",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&h=600&fit=crop&auto=format",
    year: "2024",
    description: "Generative organic illustration system",
  },
];

const SKILLS = [
  {
    discipline: "Development",
    icon: "{ }",
    items: ["React / Next.js", "Node.js / Express", "TypeScript", "PostgreSQL", "Docker", "REST & GraphQL"],
  },
  {
    discipline: "Design",
    icon: "◈",
    items: ["Brand Identity", "UI/UX", "Motion Design", "Typography", "Print", "Figma / Illustrator"],
  },
  {
    discipline: "Illustration",
    icon: "✦",
    items: ["Digital Illustration", "Editorial Art", "Character Design", "Concept Art", "Procreate", "Vector Art"],
  },
  {
    discipline: "Photography",
    icon: "⊙",
    items: ["Documentary", "Street", "Portrait", "Product", "Lightroom", "Studio Lighting"],
  },
];

// ─── Cursor ──────────────────────────────────────────────────────────────────
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!t.closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-accent pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: pos.x - 6, y: pos.y - 6 }}
        transition={{ type: "spring", stiffness: 800, damping: 40 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent/40 pointer-events-none z-[9998]"
        animate={{
          x: pos.x - (hovered ? 28 : 20),
          y: pos.y - (hovered ? 28 : 20),
          width: hovered ? 56 : 40,
          height: hovered ? 56 : 40,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />
    </>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Work", "About", "Skills", "Contact"];

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          background: scrolled ? "rgba(7,7,10,0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(240,237,230,0.06)" : "none",
        }}
      >
        <button
          onClick={() => scrollTo("hero")}
          className="font-['DM_Serif_Display'] text-xl text-foreground tracking-tight"
        >
          JO<span className="text-accent">.</span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="font-['Inter'] text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-widest uppercase"
            >
              {l}
            </button>
          ))}
        </div>

        <a
          href="mailto:hello@yourdomain.com"
          className="hidden md:flex items-center gap-2 font-['DM_Mono'] text-xs text-accent border border-accent/30 px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          data-hover="true"
        >
          Available for work <ArrowUpRight size={12} />
        </a>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          data-hover="true"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l}
                onClick={() => scrollTo(l)}
                className="font-['DM_Serif_Display'] text-5xl text-foreground hover:text-accent transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {l}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 overflow-hidden"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e8a020 0%, transparent 70%)" }}
      />

      {/* Year marker */}
      <motion.div
        className="absolute top-8 right-8 md:right-16 font-['DM_Mono'] text-xs text-muted-foreground tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
      </motion.div>

      {/* Vertical label */}
      <motion.div
        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 font-['DM_Mono'] text-[10px] text-muted-foreground tracking-[0.3em] uppercase"
        style={{ writingMode: "vertical-rl" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Scroll to explore
      </motion.div>

      <div className="max-w-7xl">
        <motion.div
          className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Portfolio — Multidisciplinary Creative
        </motion.div>

        <motion.h1
          className="font-['DM_Serif_Display'] text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] text-foreground mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          JOHI<br />
          <span className="text-accent">ORTIZ</span>
        </motion.h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-10 h-px bg-accent" />
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                className="font-['Inter'] text-lg md:text-xl font-light text-muted-foreground"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            className="max-w-sm font-['Inter'] text-sm font-light text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Crafting digital experiences at the intersection of code and art.
            Based in Madrid — available worldwide.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-8 md:left-16 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="w-px h-12 bg-muted-foreground/30 origin-top"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <span className="font-['DM_Mono'] text-[10px] text-muted-foreground tracking-widest uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="px-8 md:px-16 py-32 md:py-48 border-t border-border">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
          ref={ref}
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative overflow-hidden aspect-[4/5] bg-card">
            <img
              src={perfilPhoto}
              alt="Portrait"
              className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-accent/30 pointer-events-none" />
          <div className="absolute -top-4 -left-4 w-16 h-16 border border-border pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-6">
            About
          </div>
          <h2 className="font-['DM_Serif_Display'] text-4xl md:text-5xl text-foreground leading-tight mb-8">
            I build things that<br />
            <em>look good</em> and<br />
            work even better.
          </h2>
          <div className="space-y-4 font-['Inter'] text-sm font-light text-muted-foreground leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus minus eius voluptatem rem quaerat 
              asperiores praesentium deleniti unde laudantium! Iure consequatur magni, mollitia repellendus aperiam 
              necessitatibus velit eos voluptatum earum!
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam nihil distinctio aperiam officia laborum
              nostrum laboriosam recusandae saepe necessitatibus voluptates! Consectetur commodi hic nesciunt error ut
              odio quos quaerat odit!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, sed?
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 pt-10 border-t border-border">
            {[
              { num: "8+", label: "Years" },
              { num: "60+", label: "Projects" },
              { num: "4", label: "Disciplines" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-['DM_Serif_Display'] text-3xl text-accent">{s.num}</div>
                <div className="font-['DM_Mono'] text-xs text-muted-foreground tracking-widest uppercase mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────────
function Work() {
  const [active, setActive] = useState<Category>("all");
  const [hovered, setHovered] = useState<number | null>(null);

  const cats: { key: Category; label: string }[] = [
    { key: "all", label: "All" },
    { key: "dev", label: "Dev" },
    { key: "design", label: "Design" },
    { key: "illustration", label: "Illustration" },
    { key: "photo", label: "Photo" },
  ];

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="work" className="px-8 md:px-16 py-32 md:py-48 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-4">
              Selected Work
            </div>
            <h2 className="font-['DM_Serif_Display'] text-4xl md:text-6xl text-foreground">
              Projects
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {cats.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`font-['DM_Mono'] text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                  active === c.key
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                }`}
                data-hover="true"
              >
                {c.label}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border"
          layout
        >
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative bg-background overflow-hidden aspect-[4/3] cursor-pointer"
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                data-hover="true"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/60 transition-all duration-500" />

                {/* Default label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-0 group-hover:translate-y-full transition-transform duration-500">
                  <div className="font-['DM_Mono'] text-[10px] text-muted-foreground tracking-widest uppercase mb-1">
                    {project.tag} — {project.year}
                  </div>
                  <div className="font-['DM_Serif_Display'] text-xl text-foreground">
                    {project.title}
                  </div>
                </div>

                {/* Hover reveal */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-['DM_Mono'] text-[10px] text-accent tracking-widest uppercase border border-accent/30 px-2 py-1">
                      {project.tag}
                    </span>
                    <ExternalLink size={14} className="text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-['DM_Serif_Display'] text-2xl text-foreground mb-2">
                      {project.title}
                    </div>
                    <p className="font-['Inter'] text-xs font-light text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="px-8 md:px-16 py-32 md:py-48 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-4">
            Expertise
          </div>
          <h2 className="font-['DM_Serif_Display'] text-4xl md:text-6xl text-foreground">
            What I do
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.discipline}
              className="bg-background p-8 group hover:bg-card transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="font-['DM_Serif_Display'] text-4xl text-accent/40 group-hover:text-accent transition-colors duration-300 mb-6">
                {skill.icon}
              </div>
              <div className="font-['DM_Serif_Display'] text-xl text-foreground mb-6">
                {skill.discipline}
              </div>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li
                    key={item}
                    className="font-['Inter'] text-xs font-light text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden border-y border-border py-5">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(2)].map((_, ri) =>
              ["React", "TypeScript", "Node.js", "Figma", "Illustrator", "Lightroom", "Procreate", "PostgreSQL", "Docker", "Next.js", "GraphQL", "Photoshop"].map((t) => (
                <span
                  key={`${t}-${ri}`}
                  className="font-['DM_Mono'] text-sm text-muted-foreground/50 tracking-widest uppercase"
                >
                  {t} <span className="text-accent/40">✦</span>
                </span>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="px-8 md:px-16 py-32 md:py-48 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-6">
            Get in touch
          </div>
          <h2 className="font-['DM_Serif_Display'] text-5xl md:text-7xl text-foreground leading-tight mb-10">
            Let"s create<br />
            something<br />
            <em className="text-accent">extraordinary.</em>
          </h2>
          <p className="font-['Inter'] text-sm font-light text-muted-foreground leading-relaxed mb-12 max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dicta ut nam qui exercitationem assumenda molestiae voluptates laudantium, vero unde?
          </p>

          <a
            href="mailto:hello@yourdomain.com"
            className="inline-flex items-center gap-4 group"
            data-hover="true"
          >
            <span className="font-['DM_Serif_Display'] text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors duration-300">
              hello@yourdomain.com
            </span>
            <ArrowUpRight
              size={24}
              className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            />
          </a>
        </motion.div>

        <motion.div
          className="mt-24 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="font-['DM_Mono'] text-xs text-muted-foreground">
            © 2026 — Johi Ortiz. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            {[
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Instagram, label: "Instagram", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Mail, label: "Email", href: "mailto:hello@yourdomain.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
                data-hover="true"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
