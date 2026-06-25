import { motion } from "motion/react";
import { Braces, Palette, PencilLine, Camera } from "lucide-react";

const SKILL_GROUPS = [
  {
    discipline: "Development",
    icon: Braces,
    description:
      "Construyo interfaces y lógica de producto con foco en rendimiento, escalabilidad y una experiencia limpia.",
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
    description:
      "Diseño sistemas visuales con intención: identidad, interfaz, composición, ritmo y dirección estética.",
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
    description:
      "Trabajo la ilustración como lenguaje narrativo, mezclando sensibilidad editorial con acabado digital.",
    items: [
      { name: "Digital Illustration", level: 87 },
      { name: "Editorial Art", level: 81 },
      { name: "Character Design", level: 70 },
      { name: "Concept Art", level: 68 },
      { name: "Procreate", level: 90 },
      { name: "Vector Art", level: 79 },
    ],
  },
  {
    discipline: "Photography",
    icon: Camera,
    description:
      "Uso la fotografía para capturar atmósferas, tensión visual y momentos con intención documental.",
    items: [
      { name: "Documentary", level: 84 },
      { name: "Street", level: 82 },
      { name: "Portrait", level: 78 },
      { name: "Product", level: 69 },
      { name: "Lightroom", level: 88 },
      { name: "Studio Lighting", level: 67 },
    ],
  },
];

const TOOLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Docker",
  "GraphQL",
  "Figma",
  "Illustrator",
  "Photoshop",
  "Lightroom",
  "Procreate",
  "Tailwind",
];

function SkillMeter({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="font-['Inter'] text-xs font-light text-foreground/85">
          {name}
        </span>
        <span className="font-['DM_Mono'] text-[10px] tracking-widest text-muted-foreground">
          {level}%
        </span>
      </div>

      <div className="h-px w-full bg-border overflow-hidden">
        <motion.div
          className="h-full bg-accent origin-left"
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
    <section
      id="skills"
      className="px-8 md:px-16 py-32 md:py-48 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 md:mb-20 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-['DM_Mono'] text-xs text-accent tracking-[0.4em] uppercase mb-4">
            Expertise
          </div>

          <h2 className="font-['DM_Serif_Display'] text-4xl md:text-6xl text-foreground leading-[0.95]">
            Skills with taste,
            <br />
            structure and intent.
          </h2>

          <p className="mt-6 font-['Inter'] text-sm font-light text-muted-foreground leading-relaxed max-w-2xl">
            No veo las skills como una lista de herramientas sueltas, sino como
            disciplinas que se cruzan entre sí. Mi forma de trabajar mezcla
            código, criterio visual y sensibilidad narrativa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {SKILL_GROUPS.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.discipline}
                className="bg-background p-8 md:p-10 group hover:bg-card transition-colors duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div>
                    <div className="mb-4 text-accent/50 group-hover:text-accent transition-colors duration-300">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>

                    <h3 className="font-['DM_Serif_Display'] text-2xl md:text-3xl text-foreground">
                      {group.discipline}
                    </h3>
                  </div>

                  <span className="font-['DM_Mono'] text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>

                <p className="font-['Inter'] text-sm font-light text-muted-foreground leading-relaxed mb-8 max-w-md">
                  {group.description}
                </p>

                <div className="space-y-5">
                  {group.items.map((item) => (
                    <SkillMeter
                      key={item.name}
                      name={item.name}
                      level={item.level}
                    />
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <motion.div
            className="border border-border p-8 md:p-10 bg-card/40"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-['DM_Mono'] text-[10px] tracking-[0.35em] uppercase text-accent mb-5">
              Approach
            </div>

            <p className="font-['DM_Serif_Display'] text-2xl md:text-3xl text-foreground leading-tight mb-4">
              I don&apos;t just use tools. I build a way of thinking with them.
            </p>

            <p className="font-['Inter'] text-sm font-light text-muted-foreground leading-relaxed max-w-xl">
              Cuando programo, pienso en claridad, mantenibilidad y ritmo
              visual. Cuando diseño, pienso en jerarquía, tensión y legibilidad.
              Esa mezcla hace que mis proyectos no se queden solo en “funciona”
              o “se ve bonito”, sino en algo más completo.
            </p>
          </motion.div>

          <motion.div
            className="border-y border-border py-5 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
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
                    className="font-['DM_Mono'] text-sm tracking-widest uppercase text-muted-foreground/55"
                  >
                    {tool} <span className="text-accent/40">✦</span>
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