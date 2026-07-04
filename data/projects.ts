export type Project = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  features: string[];
  role: string;
  /** Tailwind gradient classes for the card artwork */
  accent: string;
  /** Long-form paragraphs for the case study page */
  overview: string[];
  challenge: string;
  approach: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "robi-axentec",
    title: "Robi Axentec",
    category: "Enterprise CMS",
    tagline: "A modular Laravel CMS that publishes like Gutenberg.",
    description:
      "A modular Laravel CMS with reusable content components similar to WordPress Gutenberg. It allows non-technical users to build and publish pages using predefined components with role-based authorization.",
    tech: ["Laravel", "Tailwind CSS", "MySQL", "Alpine.js"],
    features: [
      "Modular page builder",
      "Reusable component management",
      "Role-based access control",
      "Secure content workflow",
    ],
    role: "Lead Engineer & Architect",
    accent: "from-rose-500/30 via-red-500/15 to-transparent",
    overview: [
      "Robi Axentec needed a content platform that gave marketing and communications teams full publishing freedom without exposing them to raw HTML or requiring a developer for every landing page. Off-the-shelf CMS options either locked the team into rigid templates or opened the door to inconsistent, brand-breaking layouts.",
      "The answer was a modular, component-driven CMS built on Laravel. Every page is assembled from a library of predefined, brand-approved components — heroes, feature grids, media blocks, statistics, forms — each with structured fields and validation. Editors compose pages the way they would in WordPress Gutenberg, while the rendering layer guarantees consistent markup, accessibility, and performance.",
    ],
    challenge:
      "Non-technical editors needed the flexibility of a page builder, while the engineering team needed strict control over markup quality, security, and brand consistency. Traditional monolithic CMS templates couldn't satisfy both.",
    approach:
      "I designed a component registry pattern in Laravel: each content component is a self-contained class defining its schema, validation, and Blade view. The builder UI reads the registry to offer drag-and-order composition, and a role-based authorization layer controls who can create, edit, approve, and publish. Content moves through a draft-review-publish workflow with full revision history.",
    outcome:
      "The platform lets non-technical users ship new pages in minutes instead of days, with zero developer involvement for routine publishing — while every page stays consistent, secure, and fast.",
  },
  {
    slug: "gentle-park",
    title: "Gentle Park",
    category: "E-commerce Platform",
    tagline: "Multilingual commerce with branch-level inventory intelligence.",
    description:
      "A multilingual e-commerce platform with product management, inventory tracking across branches, order processing, analytics, reporting, advanced search, and secure authentication.",
    tech: ["Laravel", "REST API", "Next.js", "MySQL", "Redis"],
    features: [
      "Advanced product management",
      "Comprehensive order processing",
      "Multi-language support",
      "Advanced search",
      "Analytics and reporting",
      "Secure authentication",
    ],
    role: "Lead Engineer & Architect",
    accent: "from-cyan-500/30 via-sky-500/15 to-transparent",
    overview: [
      "Gentle Park is one of Bangladesh's leading fashion retailers, operating physical branches alongside a growing online presence. The brand needed a commerce platform that treated the website as one more branch — sharing live inventory, orders, and reporting with the physical stores rather than running as a disconnected silo.",
      "The platform is built as a Laravel REST API consumed by a Next.js storefront. Product data, variants, pricing, and stock levels flow from a central catalog, with per-branch inventory tracking so the business always knows what is sellable where. The storefront delivers a fast, fully multilingual shopping experience with advanced search and filtering.",
    ],
    challenge:
      "Inventory lived in multiple physical branches with different stock levels, while customers expected a single accurate storefront. Add multilingual content, complex product variants, and high-traffic sale events, and data consistency became the core engineering problem.",
    approach:
      "I separated the platform into a Laravel API core and a Next.js storefront. Inventory is modeled per-branch with reservation logic at checkout to prevent overselling. Redis backs both the cache layer and the search index feeds, and the API exposes analytics endpoints that power dashboards for merchandising and operations teams.",
    outcome:
      "The business runs online and offline sales from a single source of truth, with real-time stock visibility across branches, faster page loads on the storefront, and reporting that finance and operations actually use.",
  },
  {
    slug: "skills-council-canada-ai",
    title: "Skills Council Canada AI",
    category: "AI Platform",
    tagline: "AI-guided career paths, matched to real opportunities.",
    description:
      "An AI-powered career development and job-matching platform that helps users discover career paths based on skills, experience, and goals while helping employers find qualified candidates.",
    tech: ["Laravel", "Tailwind CSS", "AI Workflow", "MySQL"],
    features: [
      "AI-powered career guidance",
      "Skills assessment",
      "Learning path recommendations",
      "AI-driven job matching",
      "Admin dashboard",
      "Candidate eligibility scoring",
    ],
    role: "Lead Engineer",
    accent: "from-violet-500/30 via-purple-500/15 to-transparent",
    overview: [
      "Skills Council Canada set out to close the gap between job seekers who don't know which careers fit their skills and employers who struggle to find qualified candidates. The platform uses AI to turn a user's skills, experience, and goals into concrete career paths, learning recommendations, and job matches.",
      "Users complete structured skills assessments, and the AI workflow maps their profile against career frameworks to suggest paths and the learning steps to get there. On the employer side, the same profile data powers candidate matching and eligibility scoring, so recruiters see ranked, explainable matches instead of raw resumes.",
    ],
    challenge:
      "Career guidance is only useful if it's specific. Generic AI output — 'consider a career in tech' — helps no one. The system needed to ground every recommendation in the user's actual assessment data and real job requirements, and to score candidates in a way employers could trust.",
    approach:
      "I built the platform on Laravel with an AI workflow layer that pipes assessment results, skill taxonomies, and job requirements through structured prompts, keeping every recommendation traceable to input data. Eligibility scoring combines rule-based requirements with AI-evaluated fit, surfaced through an admin dashboard where program managers monitor matches and outcomes.",
    outcome:
      "Job seekers get personalized, actionable career guidance instead of generic advice, and employers get a ranked shortlist of genuinely eligible candidates — with the reasoning behind every score visible to administrators.",
  },
  {
    slug: "bengal-boi-pos",
    title: "Bengal Boi POS",
    category: "Retail & Operations",
    tagline: "One system for the bookstore, library, café, and warehouse.",
    description:
      "A unified bookstore, library, inventory, and food service POS system for Bengal Boi. It manages book inventory, member activity, café sales, stock control, reporting, and role-based access.",
    tech: ["Laravel", "Tailwind CSS", "MySQL"],
    features: [
      "Book and library management",
      "Integrated POS",
      "Inventory and stock control",
      "Customer and membership management",
      "Sales and expense reporting",
      "Role-based access",
    ],
    role: "Software Engineer",
    accent: "from-amber-500/30 via-orange-500/15 to-transparent",
    overview: [
      "Bengal Boi is a landmark bookstore in Dhaka that is also a lending library and a café — three businesses sharing one floor, one customer base, and previously, three disconnected paper-based workflows. The operation needed a single system that understood a book could be sold, lent, or sitting in a warehouse, and that the same member buying coffee might also have two titles checked out.",
      "The POS platform unifies all of it: barcode-driven book inventory across store and warehouse, a lending workflow tied to memberships, café sales with its own menu and kitchen flow, and consolidated end-of-day reporting. Role-based access keeps cashiers, librarians, and managers inside the workflows relevant to them.",
    ],
    challenge:
      "Books behave differently as retail stock and as library assets, and café sales follow a completely different rhythm — yet management needed unified customers, unified reporting, and a single fast checkout counter that could handle all three.",
    approach:
      "I modeled a shared inventory core with type-specific behaviors layered on top: retail items track stock and pricing, library copies track circulation state and due dates, café items track recipes and daily counts. A unified member profile connects purchases, borrowing history, and café activity. The POS screen was optimized for keyboard-and-scanner speed during peak hours.",
    outcome:
      "Bengal Boi replaced fragmented manual processes with one operational system — faster checkouts, accurate stock across store and warehouse, a functioning membership and lending program, and daily reports that reconcile in minutes.",
  },
  {
    slug: "ai-personalized-gpt",
    title: "AI-Powered Personalized GPT",
    category: "AI & Knowledge Systems",
    tagline: "A private GPT that actually knows your organization.",
    description:
      "A personalized GPT system connected with member data and Google Drive documents. It provides context-aware responses based on stored information and user-specific data.",
    tech: ["Python", "LangChain", "Pinecone", "Claude AI", "Google Drive API"],
    features: [
      "Personalized AI responses",
      "Google Drive synchronization",
      "Member data integration",
      "Context-aware AI interaction",
      "Vector database-powered search",
    ],
    role: "AI Engineer & Architect",
    accent: "from-emerald-500/30 via-teal-500/15 to-transparent",
    overview: [
      "Generic chatbots fail the moment someone asks about their organization's own documents, policies, or member records. This project built a personalized GPT system that grounds every response in the organization's actual knowledge: files living in Google Drive and structured member data.",
      "A synchronization pipeline watches Google Drive, extracts and chunks document content, embeds it, and keeps a Pinecone vector index current. At query time, LangChain orchestrates retrieval: the user's question is matched against the vector index and their own member context, and Claude generates a response grounded in the retrieved material rather than in generic model knowledge.",
    ],
    challenge:
      "The knowledge base was alive — documents changed in Drive daily, and member data varied per user. The system had to stay in sync without manual re-indexing, respect which user could see which data, and answer from retrieved facts instead of hallucinating.",
    approach:
      "I built the pipeline in Python with LangChain handling chunking, embedding, and retrieval orchestration. Incremental Drive sync re-indexes only changed files. Retrieval filters combine semantic similarity with per-user access scoping, so responses are both relevant and permission-safe. Prompts constrain Claude to the retrieved context, with source references in responses.",
    outcome:
      "Members ask natural-language questions and get accurate, context-aware answers drawn from their organization's real documents and their own data — a knowledge assistant that stays current as the Drive changes.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
