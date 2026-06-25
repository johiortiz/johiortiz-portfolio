import { useState, useEffect } from "react";
import perfilPhoto from "@/imports/perfilphoto.png";
import { motion, AnimatePresence } from "motion/react";
import Skills from "./components/Skills";
import {
  ArrowUpRight, Menu, X, Github, Instagram, Linkedin, Mail,
  ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, Globe, Code2
} from "lucide-react";

type Category = "all" | "dev" | "design" | "illustration" | "photo";
type Page = "home" | "projects";

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, "all">;
  tag: string;
  image: string;
  images: string[];
  year: string;
  description: string;
  longDescription: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  role: string;
}

const ROLES = ["Fullstack Developer", "Graphic Designer", "Illustrator", "Photographer"];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Archi Studio",
    category: "dev",
    tag: "Web App",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=800&fit=crop&auto=format",
    ],
    year: "2024",
    description: "Architecture firm platform with 3D visualization tools",
    longDescription: "A full-stack web platform for an architecture studio that combines portfolio management with real-time 3D visualization. Clients can explore floor plans, request revisions, and sign off on designs — all within a single interface. Built with React, Three.js, and a Node.js backend with WebSocket-driven collaboration.",
    stack: ["React", "Three.js", "Node.js", "PostgreSQL", "WebSockets", "Tailwind"],
    role: "Fullstack Developer",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    id: 2,
    title: "Bloom Brand",
    category: "design",
    tag: "Brand Identity",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1586495777744-4e6ffeef8041?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=800&fit=crop&auto=format",
    ],
    year: "2024",
    description: "Full brand system for a sustainable cosmetics line",
    longDescription: "Complete visual identity for a new generation sustainable cosmetics brand. From logotype and color system to packaging design, art direction for campaigns, and a full brand guidelines document. The system reflects the brand's commitment to clean ingredients through a warm, botanical visual language.",
    stack: ["Figma", "Illustrator", "Photoshop", "After Effects"],
    role: "Brand Designer",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Nocturnal Series",
    category: "illustration",
    tag: "Editorial",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=1200&h=800&fit=crop&auto=format",
    ],
    year: "2023",
    description: "12-piece illustration series for a literary magazine",
    longDescription: "A series of twelve editorial illustrations commissioned by a literary magazine exploring themes of memory and solitude. Each piece pairs a short story with a full-page illustration using a limited palette of deep indigo, ochre, and raw white. The series was later exhibited at a cultural space in Madrid.",
    stack: ["Procreate", "Photoshop", "Illustrator"],
    role: "Illustrator",
    liveUrl: "#",
  },
  {
    id: 4,
    title: "Urban Fragments",
    category: "photo",
    tag: "Photography",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop&auto=format",
    ],
    year: "2024",
    description: "Street photography documenting metropolitan loneliness",
    longDescription: "A documentary photography project that captures the quiet spaces between moments in a large city. Shot over eighteen months across Madrid, Barcelona, and Lisbon, the series uses available light and tight compositions to frame the emotional distance that can exist in the most populated places on earth.",
    stack: ["Sony A7IV", "Lightroom", "Capture One"],
    role: "Photographer",
    liveUrl: "#",
  },
  {
    id: 5,
    title: "Orbis Dashboard",
    category: "dev",
    tag: "SaaS",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop&auto=format",
    ],
    year: "2023",
    description: "Analytics platform for creative agencies",
    longDescription: "A SaaS analytics platform built specifically for creative agencies to track project profitability, team capacity, and client retention. Features real-time dashboards, automated reporting, and integrations with tools like Notion, Harvest, and Slack. Grew to 200+ agency users within 6 months of launch.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts", "Stripe"],
    role: "Fullstack Developer",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    id: 6,
    title: "Solstice Poster",
    category: "design",
    tag: "Print",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1615022630427-a1d81d0d52d2?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop&auto=format",
    ],
    year: "2023",
    description: "Limited edition poster series for a music festival",
    longDescription: "A three-poster limited edition series for Solstice, an electronic music festival in Valencia. Each poster corresponds to one night of the festival and uses a typographic system that transforms into a visual score. Printed offset in three Pantone colors on uncoated stock, edition of 500.",
    stack: ["Illustrator", "Figma", "Photoshop"],
    role: "Graphic Designer",
    liveUrl: "#",
  },
  {
    id: 7,
    title: "Quiet Hours",
    category: "photo",
    tag: "Documentary",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&auto=format",
    ],
    year: "2024",
    description: "Documentary series on vanishing crafts",
    longDescription: "An ongoing documentary project portraying the last practitioners of traditional crafts across rural Spain. The photographs are accompanied by recorded oral histories and will be published as a photobook in 2025. Currently at 34 portraits across 11 trades in 8 provinces.",
    stack: ["Fujifilm GFX100", "Lightroom", "Capture One"],
    role: "Photographer & Art Director",
    liveUrl: "#",
  },
  {
    id: 8,
    title: "Mycelium",
    category: "illustration",
    tag: "Digital Art",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=1200&h=800&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&h=800&fit=crop&auto=format",
    ],
    year: "2024",
    description: "Generative organic illustration system",
    longDescription: "A system of generative digital illustrations exploring the visual language of fungi and root networks. Each piece is produced by combining hand-drawn elements with algorithmic processes written in p5.js. The series includes 40 unique pieces and was released as a limited NFT collection.",
    stack: ["Procreate", "p5.js", "Photoshop"],
    role: "Illustrator & Creative Coder",
    liveUrl: "#",
  },
];

// ─── Pixel decorations ────────────────────────────────────────────────────────
function PixelCorner({ className }: { className?: string }) {
  return (
    <div className={`absolute w-3 h-3 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='4' height='4' fill='%2300f5ff'/%3E%3Crect x='4' y='0' width='4' height='4' fill='%2300f5ff'/%3E%3Crect x='0' y='4' width='4' height='4' fill='%2300f5ff'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

function ScanLines() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.03]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.15) 2px, rgba(0,245,255,0.15) 4px)",
      }}
    />
  );
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
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
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{ x: pos.x - 8, y: pos.y - 8 }}
        transition={{ type: "spring", stiffness: 800, damping: 40 }}
        style={{
          width: hovered ? 20 : 16,
          height: hovered ? 20 : 16,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='6' y='0' width='4' height='4' fill='%2300f5ff'/%3E%3Crect x='4' y='4' width='8' height='4' fill='%2300f5ff'/%3E%3Crect x='2' y='8' width='12' height='4' fill='%2300f5ff'/%3E%3Crect x='0' y='12' width='4' height='4' fill='%2300f5ff'/%3E%3Crect x='12' y='12' width='4' height='4' fill='%2300f5ff'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          imageRendering: "pixelated",
        }}
      />
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    if (page !== "home") {
      onNavigate("home");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = ["About", "Skills", "Contact"];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          backdropFilter: scrolled ? "blur(12px)" : "none",
          background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
          borderBottom: scrolled ? "2px solid rgba(0,245,255,0.2)" : "none",
          imageRendering: "pixelated",
        }}
      >
        <button
          onClick={() => onNavigate("home")}
          className="font-['Press_Start_2P'] text-sm text-foreground tracking-tight hover:text-accent transition-colors"
          style={{ textShadow: "0 0 10px rgba(0,245,255,0.6)" }}
        >
          JO<span className="text-accent">.</span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => onNavigate("projects")}
            className={`font-['DM_Mono'] text-xs tracking-widest uppercase transition-colors duration-300 ${page === "projects" ? "text-accent" : "text-muted-foreground hover:text-accent"}`}
          >
            Work
          </button>
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className="font-['DM_Mono'] text-xs text-muted-foreground hover:text-accent transition-colors duration-300 tracking-widest uppercase"
            >
              {l}
            </button>
          ))}
        </div>

        <a
          href="mailto:ortizvallejosjohi@gmail.com"
          className="hidden md:flex items-center gap-2 font-['DM_Mono'] text-xs text-accent px-4 py-2 transition-all duration-300 hover:bg-accent hover:text-background"
          style={{ border: "2px solid rgba(0,245,255,0.5)", boxShadow: "0 0 12px rgba(0,245,255,0.2)", imageRendering: "pixelated" }}
          data-hover="true"
        >
          Available <ArrowUpRight size={12} />
        </a>

        <button className="md:hidden text-accent" onClick={() => setOpen(!open)} data-hover="true">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              onClick={() => { setOpen(false); onNavigate("projects"); }}
              className="font-['Press_Start_2P'] text-2xl text-foreground hover:text-accent transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Work
            </motion.button>
            {links.map((l, i) => (
              <motion.button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="font-['Press_Start_2P'] text-2xl text-foreground hover:text-accent transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + 1) * 0.07 }}
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

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setImgIdx((i) => (i + 1) % project.images.length);
      if (e.key === "ArrowLeft") setImgIdx((i) => (i - 1 + project.images.length) % project.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, project.images.length]);

  const catColor: Record<string, string> = {
    dev: "#00f5ff",
    design: "#ff2d78",
    illustration: "#ffe600",
    photo: "#a855f7",
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-background/85 backdrop-blur-2xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div
        className="relative w-full md:w-[90vw] max-w-6xl max-h-[92vh] md:max-h-[88vh] bg-card overflow-hidden flex flex-col md:flex-row"
        style={{ border: "2px solid rgba(0,245,255,0.3)", boxShadow: "0 0 40px rgba(0,245,255,0.1), inset 0 0 40px rgba(0,0,0,0.4)" }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
      >
        <div className="relative w-full md:w-3/5 bg-muted flex-shrink-0 overflow-hidden" style={{ minHeight: "280px", maxHeight: "60vw" }}>
          <div className="absolute top-0 left-0 right-0 z-10 bg-[#0a0a0f] px-4 py-3 flex items-center gap-3" style={{ borderBottom: "2px solid rgba(0,245,255,0.15)" }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-[#ff2d78]" style={{ imageRendering: "pixelated" }} />
              <div className="w-3 h-3 bg-[#ffe600]" style={{ imageRendering: "pixelated" }} />
              <div className="w-3 h-3 bg-[#00f5ff]" style={{ imageRendering: "pixelated" }} />
            </div>
            <div className="flex-1 bg-background/60 px-3 py-1 flex items-center gap-2" style={{ border: "1px solid rgba(0,245,255,0.15)" }}>
              <Globe size={10} className="text-muted-foreground" />
              <span className="font-['DM_Mono'] text-[10px] text-muted-foreground truncate">
                {project.liveUrl !== "#" ? project.liveUrl : `johiortiz.dev/${project.title.toLowerCase().replace(/\s/g, "-")}`}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.img
              key={imgIdx}
              src={project.images[imgIdx]}
              alt={`${project.title} preview ${imgIdx + 1}`}
              className="w-full h-full object-cover"
              style={{ marginTop: "40px", height: "calc(100% - 40px)", filter: "saturate(1.1) brightness(0.9)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {project.images.length > 1 && (
            <>
              <button
                onClick={() => setImgIdx((i) => (i - 1 + project.images.length) % project.images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 mt-5 w-9 h-9 bg-background/80 flex items-center justify-center text-accent hover:bg-accent hover:text-background transition-all"
                style={{ border: "2px solid rgba(0,245,255,0.4)" }}
                data-hover="true"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setImgIdx((i) => (i + 1) % project.images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-5 w-9 h-9 bg-background/80 flex items-center justify-center text-accent hover:bg-accent hover:text-background transition-all"
                style={{ border: "2px solid rgba(0,245,255,0.4)" }}
                data-hover="true"
              >
                <ChevronRight size={16} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className="transition-all duration-300"
                    style={{
                      width: i === imgIdx ? 16 : 8,
                      height: 8,
                      background: i === imgIdx ? "#00f5ff" : "rgba(0,245,255,0.3)",
                      imageRendering: "pixelated",
                    }}
                    data-hover="true"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto p-8 md:p-10 scrollbar-hide">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="font-['DM_Mono'] text-[10px] tracking-widest uppercase px-2 py-1"
                  style={{ color: catColor[project.category], border: `1px solid ${catColor[project.category]}60` }}
                >
                  {project.tag}
                </span>
                <span className="font-['DM_Mono'] text-[10px] text-muted-foreground tracking-widest">
                  {project.year}
                </span>
              </div>
              <h2 className="font-['Press_Start_2P'] text-xl md:text-2xl text-foreground leading-tight" style={{ textShadow: "0 0 20px rgba(0,245,255,0.3)" }}>
                {project.title}
              </h2>
              <p className="font-['DM_Mono'] text-xs text-muted-foreground mt-3 tracking-wider">
                {project.role}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-accent transition-all"
              style={{ border: "2px solid rgba(0,245,255,0.2)" }}
              data-hover="true"
            >
              <X size={16} />
            </button>
          </div>

          <p className="font-['DM_Mono'] text-xs text-muted-foreground leading-relaxed mb-8" style={{ lineHeight: "2" }}>
            {project.longDescription}
          </p>

          <div className="mb-8">
            <div className="font-['DM_Mono'] text-[10px] text-accent tracking-widest uppercase mb-3">
              &gt; Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-['DM_Mono'] text-xs text-foreground/70 px-3 py-1 hover:text-accent transition-all"
                  style={{ border: "1px solid rgba(0,245,255,0.2)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 flex gap-4" style={{ borderTop: "1px solid rgba(0,245,255,0.15)" }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="flex items-center gap-2 font-['DM_Mono'] text-xs text-accent px-5 py-2.5 hover:bg-accent hover:text-background transition-all duration-300"
                style={{ border: "2px solid rgba(0,245,255,0.5)" }}
                data-hover="true"
              >
                <Globe size={12} /> Live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                className="flex items-center gap-2 font-['DM_Mono'] text-xs text-foreground px-5 py-2.5 hover:border-accent/40 transition-all duration-300"
                style={{ border: "1px solid rgba(0,245,255,0.2)" }}
                data-hover="true"
              >
                <Code2 size={12} /> Repo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Projects Page ────────────────────────────────────────────────────────────
function ProjectsPage({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState<Category>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const cats: { key: Category; label: string; count: number }[] = [
    { key: "all", label: "All", count: PROJECTS.length },
    { key: "dev", label: "Dev", count: PROJECTS.filter((p) => p.category === "dev").length },
    { key: "design", label: "Design", count: PROJECTS.filter((p) => p.category === "design").length },
    { key: "illustration", label: "Illus.", count: PROJECTS.filter((p) => p.category === "illustration").length },
    { key: "photo", label: "Photo", count: PROJECTS.filter((p) => p.category === "photo").length },
  ];

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-8 md:px-16 pt-32 pb-16" style={{ borderBottom: "2px solid rgba(0,245,255,0.15)" }}>
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-['DM_Mono'] text-xs text-muted-foreground hover:text-accent transition-colors mb-10 group"
            data-hover="true"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-4">
                &gt; Selected_Work
              </div>
              <h1
                className="font-['Press_Start_2P'] text-3xl md:text-5xl text-foreground"
                style={{ textShadow: "0 0 30px rgba(0,245,255,0.4)" }}
              >
                Projects
              </h1>
            </div>
            <p className="max-w-xs font-['DM_Mono'] text-xs text-muted-foreground leading-relaxed" style={{ lineHeight: "2" }}>
              A curated selection across dev, design, illustration, and photography.
            </p>
          </div>
        </div>
      </div>

      <div className="sticky top-[73px] z-30 bg-background/90 backdrop-blur-xl" style={{ borderBottom: "2px solid rgba(0,245,255,0.15)" }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex gap-0 overflow-x-auto scrollbar-hide">
          {cats.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`flex items-center gap-2 px-5 py-4 font-['DM_Mono'] text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                active === c.key ? "text-accent" : "text-muted-foreground hover:text-accent"
              }`}
              style={{ borderBottom: active === c.key ? "2px solid #00f5ff" : "2px solid transparent" }}
              data-hover="true"
            >
              {c.label}
              <span className={`text-[10px] ${active === c.key ? "text-accent/60" : "text-muted-foreground/40"}`}>
                {c.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "2px", background: "rgba(0,245,255,0.08)" }}
          layout
        >
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group relative bg-background overflow-hidden cursor-pointer"
                onClick={() => setSelected(project)}
                data-hover="true"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "saturate(0.8) brightness(0.8)" }}
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-background/50 transition-all duration-500" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(0,245,255,0.05)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-accent flex items-center justify-center" style={{ imageRendering: "pixelated" }}>
                      <ExternalLink size={18} className="text-background" />
                    </div>
                  </div>
                </div>

                <div className="p-6" style={{ borderTop: "1px solid rgba(0,245,255,0.1)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-['DM_Mono'] text-[10px] text-accent/70 tracking-widest uppercase">
                      {project.tag}
                    </span>
                    <span className="font-['DM_Mono'] text-[10px] text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="font-['Press_Start_2P'] text-sm text-foreground group-hover:text-accent transition-colors duration-300 leading-relaxed">
                    {project.title}
                  </h3>
                  <p className="font-['DM_Mono'] text-[10px] text-muted-foreground mt-3 leading-relaxed line-clamp-2" style={{ lineHeight: "1.8" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.stack.slice(0, 3).map((s) => (
                      <span key={s} className="font-['DM_Mono'] text-[10px] text-muted-foreground/60 px-2 py-0.5" style={{ border: "1px solid rgba(0,245,255,0.15)" }}>
                        {s}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="font-['DM_Mono'] text-[10px] text-muted-foreground/40 px-2 py-0.5">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onProjectsClick }: { onProjectsClick: () => void }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% 60%, rgba(0,245,255,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 20%, rgba(255,45,120,0.04) 0%, transparent 60%)
          `,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <PixelCorner className="top-24 left-8 md:left-16" />
      <PixelCorner className="top-24 right-8 md:right-16" style={{ transform: "scaleX(-1)" }} />

      <div className="max-w-7xl">
        <motion.div
          className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          &gt; Portfolio_v2.0 — Multidisciplinary
        </motion.div>

        <motion.h1
          className="font-['Press_Start_2P'] text-[clamp(2rem,6vw,5.5rem)] leading-[1.2] text-foreground mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ textShadow: "0 0 40px rgba(0,245,255,0.3), 4px 4px 0px rgba(255,45,120,0.2)" }}
        >
          Johi
          <br />
          <span className="text-accent" style={{ textShadow: "0 0 40px rgba(0,245,255,0.6), 4px 4px 0px rgba(255,45,120,0.3)" }}>
            Ortiz
          </span>
        </motion.h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div className="flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <div className="w-6 h-0.5 bg-accent" style={{ boxShadow: "0 0 8px #00f5ff" }} />
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                className="font-['DM_Mono'] text-sm md:text-base text-muted-foreground"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
            <span
              className="font-['DM_Mono'] text-accent text-lg"
              style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s", textShadow: "0 0 8px #00f5ff" }}
            >
              _
            </span>
          </motion.div>

          <motion.button
            onClick={onProjectsClick}
            className="flex items-center gap-3 group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            data-hover="true"
          >
            <span className="font-['DM_Mono'] text-xs text-muted-foreground tracking-widest uppercase group-hover:text-accent transition-colors">
              View_all_work
            </span>
            <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-8 left-8 md:left-16 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="w-px h-12 origin-top"
            style={{ background: "rgba(0,245,255,0.4)" }}
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <span className="font-['DM_Mono'] text-[10px] text-muted-foreground tracking-widest uppercase">Scroll_down</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="px-8 md:px-16 py-32 md:py-48" style={{ borderTop: "2px solid rgba(0,245,255,0.1)" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative overflow-hidden aspect-[4/5] bg-card" style={{ border: "2px solid rgba(0,245,255,0.2)" }}>
            <img
              src={perfilPhoto}
              alt="Portrait"
              className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700"
              style={{ filter: "saturate(0.7) contrast(1.1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.05) 0%, transparent 50%)" }}
            />
          </div>
          <div className="absolute -bottom-3 -right-3 w-20 h-20" style={{ border: "2px solid rgba(255,45,120,0.3)" }} />
          <div className="absolute -top-3 -left-3 w-14 h-14" style={{ border: "2px solid rgba(0,245,255,0.2)" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-6">&gt; About</div>
          <h2
            className="font-['Press_Start_2P'] text-2xl md:text-3xl text-foreground leading-tight mb-8"
            style={{ lineHeight: "1.6", textShadow: "0 0 20px rgba(0,245,255,0.2)" }}
          >
            I build things
            <br />
            <span className="text-accent">that work</span>
            <br />& look great.
          </h2>
          <div className="space-y-4 font-['DM_Mono'] text-xs text-muted-foreground" style={{ lineHeight: "2.2" }}>
            <p>Multidisciplinary creative with experience across software development, visual design, illustration, and photography.</p>
            <p>My work lives at the intersection of technical precision and artistic intuition.</p>
            <p>I believe the best digital experiences are built by people who understand both the code and the canvas.</p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 pt-10" style={{ borderTop: "1px solid rgba(0,245,255,0.15)" }}>
            {[{ num: "3+", label: "Years" }, { num: "20+", label: "Projects" }, { num: "4", label: "Disciplines" }].map((s) => (
              <div key={s.label}>
                <div className="font-['Press_Start_2P'] text-2xl text-accent" style={{ textShadow: "0 0 12px rgba(0,245,255,0.5)" }}>
                  {s.num}
                </div>
                <div className="font-['DM_Mono'] text-[10px] text-muted-foreground tracking-widest uppercase mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="px-8 md:px-16 py-32 md:py-48" style={{ borderTop: "2px solid rgba(0,245,255,0.1)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-6">&gt; Get_in_touch</div>
          <h2
            className="font-['Press_Start_2P'] text-3xl md:text-5xl text-foreground leading-tight mb-10"
            style={{ lineHeight: "1.6", textShadow: "0 0 30px rgba(0,245,255,0.3)" }}
          >
            Let&apos;s build
            <br />
            something
            <br />
            <span className="text-accent" style={{ textShadow: "0 0 30px rgba(0,245,255,0.6)" }}>
              epic.
            </span>
          </h2>
          <p className="font-['DM_Mono'] text-xs text-muted-foreground leading-relaxed mb-12 max-w-lg" style={{ lineHeight: "2.2" }}>
            Open to freelance projects, collaborations, and full-time opportunities. If you have an idea — big or small — let&apos;s talk.
          </p>
          <a
            href="mailto:ortizvallejosjohi@gmail.com"
            className="inline-flex items-center gap-4 group"
            data-hover="true"
          >
            <span
              className="font-['DM_Mono'] text-lg md:text-xl text-foreground group-hover:text-accent transition-colors duration-300"
              style={{ textShadow: "0 0 10px rgba(0,245,255,0.1)" }}
            >
              ortizvallejosjohi@gmail.com
            </span>
            <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </a>
        </motion.div>

        <motion.div
          className="mt-24 pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          style={{ borderTop: "1px solid rgba(0,245,255,0.1)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="font-['DM_Mono'] text-[10px] text-muted-foreground">
            © 2026 — Johi Ortiz. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {[
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Instagram, label: "Instagram", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Mail, label: "Email", href: "mailto:ortizvallejosjohi@gmail.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="text-muted-foreground hover:text-accent transition-colors duration-300" data-hover="true">
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
  const [page, setPage] = useState<Page>("home");

  const navigateTo = (p: Page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(p);
  };

  return (
    <div className="bg-background text-foreground min-h-screen" style={{ fontFamily: "DM Mono, monospace", cursor: "none" }}>
      <ScanLines />
      <Cursor />
      <Nav page={page} onNavigate={navigateTo} />

      <AnimatePresence mode="wait">
        {page === "home" ? (
          <motion.main key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Hero onProjectsClick={() => navigateTo("projects")} />
            <About />
            <Skills />
            <Contact />
          </motion.main>
        ) : (
          <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProjectsPage onBack={() => navigateTo("home")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}