export type Experience = {
  role: string;
  company: string;
  period: string;
  start: string;
  current?: boolean;
  summary: string;
  responsibilities: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Lead Software Engineer",
    company: "Notionhive Bangladesh",
    period: "May 2024 — Present",
    start: "2024",
    current: true,
    summary:
      "Owning software architecture across client platforms while growing a team of engineers.",
    responsibilities: [
      "Leading software architecture and development",
      "Managing and mentoring developers",
      "Conducting code reviews",
      "Implementing CI/CD pipelines",
      "Translating business requirements into technical plans",
      "Evaluating new technologies",
      "Ensuring performance, security, and code quality",
    ],
    stack: ["Laravel", "Next.js", "React", "CI/CD", "AI Integrations"],
  },
  {
    role: "Senior Software Engineer",
    company: "Notionhive Bangladesh",
    period: "Feb 2021 — Apr 2024",
    start: "2021",
    summary:
      "Delivered enterprise web platforms and led development squads on client engagements.",
    responsibilities: [
      "Managed development teams",
      "Built applications using WordPress, Laravel, and React",
      "Supervised junior developers",
      "Maintained and improved websites and software systems",
    ],
    stack: ["Laravel", "WordPress", "React", "MySQL"],
  },
  {
    role: "Software Engineer",
    company: "Bengal Foundation",
    period: "Aug 2016 — Feb 2021",
    start: "2016",
    summary:
      "Built and maintained the internal systems powering Bengal Boi's retail and library operations.",
    responsibilities: [
      "Developed internal systems using Laravel, WordPress, and React",
      "Worked on Bengal Boi operational systems",
      "Improved library, inventory, and POS workflows",
      "Maintained performance and usability across applications",
    ],
    stack: ["Laravel", "WordPress", "React", "POS Systems"],
  },
];
