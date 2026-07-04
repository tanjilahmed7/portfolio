export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  bestFor: string;
  tech: string[];
  accent: string;
  icon: "cart" | "blocks" | "brain" | "register" | "plug";
  /** Long-form paragraphs for the product detail page */
  overview: string[];
  capabilities: { title: string; description: string }[];
};

export const products: Product[] = [
  {
    slug: "headless-commerce-platform",
    name: "Headless Commerce Platform",
    shortDescription:
      "A scalable Laravel and Next.js commerce foundation with product management, cart, checkout, inventory, and analytics.",
    bestFor: "Retail brands outgrowing template-based storefronts",
    tech: ["Laravel", "Next.js", "REST API", "Redis", "MySQL"],
    accent: "from-cyan-500/25 to-sky-500/5",
    icon: "cart",
    overview: [
      "Most commerce projects start from the same requirements: a product catalog with variants, a cart and checkout that never oversell, inventory that reflects reality, and reporting the business trusts. This platform packages those foundations — battle-tested on real retail deployments — so a new storefront starts at eighty percent done instead of zero.",
      "The architecture is deliberately headless: a Laravel API core owns catalog, inventory, orders, and customers, while a Next.js storefront owns the experience. That separation means the storefront can be redesigned, localized, or replaced without touching commerce logic, and the same API can later feed a mobile app or in-store kiosk.",
    ],
    capabilities: [
      {
        title: "Catalog & variants",
        description:
          "Structured product management with variants, pricing rules, collections, and media — built for merchandising teams, not just developers.",
      },
      {
        title: "Cart & checkout",
        description:
          "Reservation-aware cart and checkout flow that prevents overselling, with hooks for local and international payment gateways.",
      },
      {
        title: "Multi-branch inventory",
        description:
          "Track stock per warehouse or branch with movement history, low-stock alerts, and a single sellable-quantity source of truth.",
      },
      {
        title: "Analytics & reporting",
        description:
          "Sales, product, and customer reporting endpoints that power dashboards for operations and finance out of the box.",
      },
    ],
  },
  {
    slug: "modular-cms-builder",
    name: "Modular CMS Builder",
    shortDescription:
      "A Laravel-powered CMS with reusable page components, role-based access, and an editor-friendly publishing workflow.",
    bestFor: "Organizations that need brand-safe publishing without developers",
    tech: ["Laravel", "Tailwind CSS", "Alpine.js", "MySQL"],
    accent: "from-violet-500/25 to-fuchsia-500/5",
    icon: "blocks",
    overview: [
      "Marketing teams want the freedom of a page builder; engineering teams want control over markup, performance, and security. The Modular CMS Builder resolves that tension with a component registry: developers define brand-approved components once, and editors compose pages from them — Gutenberg-style — without ever breaking the design system.",
      "Every component is a self-contained Laravel class with a typed schema, validation, and its own view. Pages move through a draft, review, and publish workflow with revision history, and role-based access control decides who can compose, approve, and ship.",
    ],
    capabilities: [
      {
        title: "Component registry",
        description:
          "Define components in code with schemas and validation; the builder UI picks them up automatically — no duplicate configuration.",
      },
      {
        title: "Editor-first composition",
        description:
          "Drag-to-order page building with live structured fields, media management, and instant preview for non-technical users.",
      },
      {
        title: "Publishing workflow",
        description:
          "Draft, review, approve, and schedule content with full revision history and rollback.",
      },
      {
        title: "Role-based authorization",
        description:
          "Granular permissions across composing, approving, and publishing — mapped to how real content teams operate.",
      },
    ],
  },
  {
    slug: "ai-knowledge-assistant",
    name: "AI Knowledge Assistant",
    shortDescription:
      "A LangChain and vector database-powered assistant that connects with documents, Google Drive, and business data.",
    bestFor: "Teams whose answers are buried in documents and internal data",
    tech: ["Python", "LangChain", "Pinecone", "Claude AI", "Google Drive API"],
    accent: "from-emerald-500/25 to-teal-500/5",
    icon: "brain",
    overview: [
      "Every organization has the same problem: the answer exists, but it's in a document nobody can find. The AI Knowledge Assistant connects an LLM to your actual knowledge — Google Drive files, internal documents, and structured business data — so people ask questions in plain language and get grounded, sourced answers.",
      "A sync pipeline keeps the vector index current as documents change, retrieval is scoped to what each user is allowed to see, and prompts constrain the model to retrieved context. The result is an assistant that answers from your data, not from imagination.",
    ],
    capabilities: [
      {
        title: "Live document sync",
        description:
          "Incremental Google Drive synchronization that re-indexes only changed files, keeping answers current without manual work.",
      },
      {
        title: "Grounded retrieval",
        description:
          "Vector search over Pinecone combined with structured data lookups, with responses constrained to retrieved context.",
      },
      {
        title: "Per-user scoping",
        description:
          "Access-aware retrieval so users only ever get answers from data they are permitted to see.",
      },
      {
        title: "Pluggable model layer",
        description:
          "Claude-first integration with a clean abstraction for swapping or combining models as needs evolve.",
      },
    ],
  },
  {
    slug: "business-pos-inventory",
    name: "Business POS & Inventory System",
    shortDescription:
      "A Laravel-based POS system for retail, library, café, and inventory operations.",
    bestFor: "Multi-format businesses running sales, stock, and memberships together",
    tech: ["Laravel", "Tailwind CSS", "MySQL"],
    accent: "from-amber-500/25 to-orange-500/5",
    icon: "register",
    overview: [
      "Built from a production system running a bookstore, lending library, and café under one roof, this POS platform handles businesses that don't fit the single-format mold. A shared inventory core supports retail stock, circulating library assets, and food service — with unified customers and consolidated reporting on top.",
      "The checkout screen is optimized for scanner-and-keyboard speed during rush hours, and role-based access keeps cashiers, stock managers, and administrators in their own lanes.",
    ],
    capabilities: [
      {
        title: "Unified checkout",
        description:
          "One fast POS counter for retail sales, membership transactions, and café orders — barcode-first and built for queues.",
      },
      {
        title: "Inventory & stock control",
        description:
          "Multi-location stock tracking with movement history, transfers, and automatic low-stock alerts.",
      },
      {
        title: "Members & circulation",
        description:
          "Customer and membership management, including lending workflows with due dates and circulation state.",
      },
      {
        title: "Reporting",
        description:
          "Daily sales, expense, and stock reports that reconcile in minutes, not evenings.",
      },
    ],
  },
  {
    slug: "wordpress-solutions",
    name: "WordPress Plugin & Theme Solutions",
    shortDescription:
      "Custom WordPress themes, plugins, and marketplace-ready products for WordPress.org and Envato.",
    bestFor: "Businesses and creators who need marketplace-grade WordPress work",
    tech: ["WordPress", "PHP", "JavaScript", "Gutenberg", "WooCommerce"],
    accent: "from-sky-500/25 to-indigo-500/5",
    icon: "plug",
    overview: [
      "There is a wide gap between a WordPress site that works and a WordPress product that passes WordPress.org review or Envato's quality gates. Having shipped through both channels, I build themes and plugins to marketplace standards from day one: coding standards, security hardening, i18n, backwards compatibility, and clean upgrade paths.",
      "The same discipline applies to custom client work — bespoke themes, Gutenberg block suites, and plugins that stay maintainable long after launch.",
    ],
    capabilities: [
      {
        title: "Custom theme development",
        description:
          "Performance-focused, editor-friendly themes built on modern WordPress — block themes or classic, matched to your workflow.",
      },
      {
        title: "Plugin engineering",
        description:
          "Plugins built to WordPress coding and security standards, from small utilities to full product suites.",
      },
      {
        title: "Marketplace preparation",
        description:
          "Review-ready packaging for WordPress.org and Envato — guidelines compliance, documentation, and submission experience included.",
      },
      {
        title: "Gutenberg & WooCommerce",
        description:
          "Custom block development and WooCommerce extensions that feel native to the editors who use them.",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
