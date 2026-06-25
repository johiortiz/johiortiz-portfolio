import { motion } from "motion/react";
import { Braces, Palette, PencilLine } from "lucide-react";

const SKILL_GROUPS = [
  {
    discipline: "Development",
    icon: Braces,
    description: "Construyo interfaces y lógica de producto con foco en rendimiento, escalabilidad y experiencia limpia.",
    items: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Node.js / Express", level: 84 },
      { name: "PostgreSQL", level: 78 },
      { name: "Docker", level: 72 },
      { name: "REST & GraphQL", level: 80 },
    ],
  },
  {
    discipline: "Design",
    icon: Palette,
    description: "Diseño sistemas visuales con intención: identidad, interfaz, composición, ritmo y dirección estética.",
    items: [
      { name: "Brand Identity", level: 90 },
      { name: "UI/UX", level: 86 },
      { name: "Motion Design", level: 73 },
      { name: "Typography", level: 88 },
      { name: "Print", level: 76 },
      { name: "Figma / Illustrator", level: 91 },
    ],
  },
  {
    discipline: "Illustration",
    icon: PencilLine,
    description: "Trabajo la ilustración como lenguaje narrativo, mezclando sensibilidad editorial con acabado digital.",
    items: [
      { name: "Digital Illustration", level: 87 },
      { name: "Editorial Art", level: 81 },
      { name: "Character Design", level: 70 },
      { name: "Concept Art", level: 68 },
      { name: "Procreate", level: 90 },
      { name: "Vector Art", level: 79 },
    ],
  },
];

const TOOLS = [
  "React", "Next.js", "TypeScript", "Node.js", "Express",
  "PostgreSQL", "Docker", "GraphQL", "Figma", "Illustrator",
  "Photoshop", "Lightroom", "Procreate", "Tailwind",
];

function SkillMeter({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="font-['DM_Mono'] text-[11px] text-foreground/80">{name}</span>
        <span className="font-['DM_Mono'] text-[10px] tracking-widest text-accent/70">{level}%</span>
      </div>
      <div className="h-2 w-full bg-background overflow-hidden" style={{ border: "1px solid rgba(0,245,255,0.15)" }}>
        <motion.div
          className="h-full origin-left"
          style={{ background: "linear-gradient(90deg, #00f5ff, #ff2d78)", imageRendering: "pixelated" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="px-8 md:px-16 py-32 md:py-48" style={{ borderTop: "2px solid rgba(0,245,255,0.1)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 md:mb-20 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-4">
            &gt; Expertise
          </div>
          <h2
            className="font-['Press_Start_2P'] text-2xl md:text-4xl text-foreground"
            style={{ lineHeight: "1.6", textShadow: "0 0 30px rgba(0,245,255,0.3)" }}
          >
            Skills &amp;
            <br />
            <span className="text-accent">Disciplines</span>
          </h2>
          <p className="mt-6 font-['DM_Mono'] text-xs text-muted-foreground max-w-2xl" style={{ lineHeight: "2.2" }}>
            No veo las skills como herramientas sueltas, sino como disciplinas que se cruzan. Código, criterio visual y sensibilidad narrativa.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "2px", background: "rgba(0,245,255,0.08)" }}
        >
          {SKILL_GROUPS.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.article
                key={group.discipline}
                className="bg-background p-8 md:p-10 group hover:bg-card transition-colors duration-300"
                style={{ borderTop: index < 2 ? "none" : undefined }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div>
                    <div className="mb-4 text-accent/50 group-hover:text-accent transition-colors duration-300">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3
                      className="font-['Press_Start_2P'] text-base md:text-lg text-foreground group-hover:text-accent transition-colors duration-300"
                      style={{ lineHeight: "1.6" }}
                    >
                      {group.discipline}
                    </h3>
                  </div>
                  <span className="font-['DM_Mono'] text-[10px] tracking-[0.3em] uppercase text-accent/40">
                    0{index + 1}
                  </span>
                </div>

                <p className="font-['DM_Mono'] text-[11px] text-muted-foreground mb-8 max-w-md" style={{ lineHeight: "2" }}>
                  {group.description}
                </p>

                <div className="space-y-5">
                  {group.items.map((item) => (
                    <SkillMeter key={item.name} name={item.name} level={item.level} />
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16">
          <motion.div
            className="overflow-hidden py-5"
            style={{ borderTop: "1px solid rgba(0,245,255,0.15)", borderBottom: "1px solid rgba(0,245,255,0.15)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex gap-10 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(2)].flatMap((_, round) =>
                TOOLS.map((tool) => (
                  <span
                    key={`${tool}-${round}`}
                    className="font-['DM_Mono'] text-xs tracking-widest uppercase"
                    style={{ color: "rgba(0,245,255,0.4)" }}
                  >
                    {tool} <span style={{ color: "#ff2d78" }}>✦</span>
                  </span>
                ))
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}