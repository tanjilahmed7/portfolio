export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
  /** Tailwind gradient stops used for the card's hover glow */
  accent: string;
  icon: "server" | "layout" | "puzzle" | "sparkles" | "rocket";
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend Engineering",
    blurb:
      "Designing resilient APIs, data models, and service boundaries that stay fast under real production load.",
    skills: [
      "PHP",
      "Laravel",
      "REST API",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "Microservices",
      "Software Architecture",
    ],
    accent: "from-cyan-400/60 to-sky-500/40",
    icon: "server",
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    blurb:
      "Building fast, accessible interfaces with modern React tooling and a strong eye for interaction detail.",
    skills: [
      "React",
      "Next.js",
      "Inertia.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
    accent: "from-violet-400/60 to-fuchsia-500/40",
    icon: "layout",
  },
  {
    id: "wordpress",
    title: "CMS & WordPress",
    blurb:
      "Shipping marketplace-grade WordPress products — from custom themes to plugins published on official channels.",
    skills: [
      "Theme Development",
      "Plugin Development",
      "WordPress.org Publishing",
      "Envato Approval Experience",
      "Gutenberg Blocks",
      "WooCommerce",
    ],
    accent: "from-sky-400/60 to-indigo-500/40",
    icon: "puzzle",
  },
  {
    id: "ai",
    title: "AI & Automation",
    blurb:
      "Integrating LLMs and retrieval pipelines into real products — practical AI that solves business problems.",
    skills: [
      "Python",
      "LangChain",
      "Pinecone",
      "Vector Databases",
      "Claude AI Integrations",
      "MCP Servers",
    ],
    accent: "from-emerald-400/60 to-cyan-500/40",
    icon: "sparkles",
  },
  {
    id: "devops",
    title: "DevOps & Delivery",
    blurb:
      "Automating the path to production with pipelines, caching strategy, and server-level performance tuning.",
    skills: [
      "CI/CD",
      "Deployment Workflows",
      "Server Optimization",
      "Caching",
      "Performance Tuning",
      "Version Control Strategy",
    ],
    accent: "from-amber-400/60 to-orange-500/40",
    icon: "rocket",
  },
];
