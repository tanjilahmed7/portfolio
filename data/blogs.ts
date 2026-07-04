export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  /** Placeholder publish date — update when posts go live */
  date: string;
  content: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "scalable-laravel-architectures",
    title: "How I Design Scalable Laravel Architectures",
    excerpt:
      "The patterns I reach for when a Laravel codebase needs to survive years of growth: bounded contexts, thin controllers, and queues as a first-class citizen.",
    category: "Backend",
    readTime: "8 min read",
    date: "2026-05-18",
    content: [
      {
        type: "p",
        text: "Every Laravel project starts fast. The framework hands you routing, ORM, queues, and auth on day one — and that speed is exactly why so many Laravel codebases hit a wall at year two. The architecture that made the first ten features easy makes the hundredth feature dangerous. After nine years of building and rescuing Laravel systems, these are the decisions I now make before writing the first migration.",
      },
      { type: "h2", text: "Draw boundaries before you need them" },
      {
        type: "p",
        text: "The single biggest predictor of long-term maintainability is whether the codebase has boundaries. I organize applications into modules around business capabilities — Catalog, Orders, Inventory, Billing — each owning its models, actions, and events. Laravel doesn't force this structure, which is precisely why you have to.",
      },
      {
        type: "ul",
        items: [
          "Controllers stay thin: validate, delegate to an action class, return a response.",
          "Action classes hold business logic and are trivially testable in isolation.",
          "Modules communicate through events and contracts, never by reaching into each other's models.",
          "Shared concerns (auth, money, addresses) live in a small, deliberate core.",
        ],
      },
      { type: "h2", text: "Queues are architecture, not an afterthought" },
      {
        type: "p",
        text: "Anything that doesn't need to happen inside the request — emails, exports, index updates, webhooks, report generation — goes to a queue from day one. This isn't just a performance decision. Designing operations as jobs forces you to make them idempotent and retryable, which is the same discipline distributed systems demand. When traffic grows, you scale workers instead of rewriting flows.",
      },
      { type: "h2", text: "Let the database do its job" },
      {
        type: "p",
        text: "Eloquent is a wonderful tool for writing and an easy tool to misuse for reading. For dashboards, reports, and listing screens, I write deliberate queries: select only needed columns, index for actual access patterns, and reach for read-optimized query classes when a screen needs data from five modules. N+1 detection runs in CI, not in production incident reviews.",
      },
      {
        type: "quote",
        text: "Scalability is rarely about handling ten million users. It's about handling the two hundredth feature request without fear.",
      },
      {
        type: "p",
        text: "None of this is exotic. Boundaries, queues, deliberate queries, and tests around business logic — that's the whole recipe. The hard part is applying it consistently when deadlines whisper that this one controller could just talk to that one model directly. It never stops at one.",
      },
    ],
  },
  {
    slug: "fast-ecommerce-frontends-nextjs",
    title: "Building Fast E-commerce Frontends with Next.js",
    excerpt:
      "Commerce frontends live and die by perceived speed. How server components, smart caching, and disciplined hydration turn catalogs into conversion.",
    category: "Frontend",
    readTime: "7 min read",
    date: "2026-04-22",
    content: [
      {
        type: "p",
        text: "In e-commerce, speed is not a technical metric — it's a business one. Every additional second of load time measurably cuts conversion. When we rebuilt a multilingual fashion storefront on Next.js backed by a Laravel API, the frontend architecture was driven by one question: what does the customer see, and how fast?",
      },
      { type: "h2", text: "Server-first by default" },
      {
        type: "p",
        text: "Product listing and detail pages are server components. The catalog data is fetched close to the API, rendered to HTML, and streamed to the browser — no client-side data fetching waterfall, no skeleton screens for content we already know. Interactivity is added surgically: the cart button, the variant picker, the image gallery. Everything else ships as plain HTML.",
      },
      { type: "h2", text: "Cache like a merchandiser thinks" },
      {
        type: "ul",
        items: [
          "Product pages revalidate on a timer and instantly on demand when merchandising updates a product.",
          "Prices and stock are fetched per-request or streamed in, never baked into long-lived caches.",
          "The cart is fully dynamic — it belongs to the user, not the cache.",
          "Search results cache briefly per query; filters compose on the server.",
        ],
      },
      {
        type: "p",
        text: "This split — static shell, fresh commerce data — is the entire game. Customers get instant navigation between products while stock and pricing stay trustworthy.",
      },
      { type: "h2", text: "The hydration budget" },
      {
        type: "p",
        text: "Every client component is JavaScript the customer's phone must parse before the page feels alive. We kept a literal budget: the product page ships interactive islands for gallery, variants, and cart, and nothing else. Animations run on CSS and transforms. Third-party scripts load after interaction. The result was a storefront that feels native-app fast on mid-range Android devices — where most of the actual customers are.",
      },
      {
        type: "quote",
        text: "Your Lighthouse score in the office means nothing. Your Time-to-Interactive on a $150 phone on 4G is the real storefront.",
      },
    ],
  },
  {
    slug: "wordpress-laravel-or-headless",
    title: "When to Use WordPress, Laravel, or Headless CMS",
    excerpt:
      "A decision framework from someone who ships all three: match the tool to the team that will run the platform, not to developer preference.",
    category: "Architecture",
    readTime: "6 min read",
    date: "2026-03-15",
    content: [
      {
        type: "p",
        text: "I build with WordPress, Laravel, and headless stacks professionally, so I have no horse in this race — only scars. The platform debate is usually argued on developer preference, but the right question is different: who runs this system for the next five years, and what does the content actually do?",
      },
      { type: "h2", text: "Choose WordPress when content is the product" },
      {
        type: "p",
        text: "If the site is fundamentally about publishing — articles, pages, campaigns, a marketing presence — WordPress remains unbeatable for the people doing the publishing. The editorial experience, the ecosystem, and the hiring pool are unmatched. With disciplined engineering (custom themes, lean plugins, proper caching), WordPress is fast and secure. Most WordPress problems are engineering discipline problems wearing a CMS costume.",
      },
      { type: "h2", text: "Choose Laravel when behavior is the product" },
      {
        type: "p",
        text: "The moment the system's core value is workflow rather than content — orders, inventory, memberships, assessments, dashboards — you want a real application framework. Bending WordPress into an application platform works right up until it doesn't, and the failure is expensive. Laravel gives you migrations, queues, testing, and authorization as first-class citizens.",
      },
      { type: "h2", text: "Choose headless when experiences multiply" },
      {
        type: "p",
        text: "Headless earns its complexity when the same content feeds multiple experiences — web, mobile app, kiosk — or when frontend performance requirements outgrow what the monolith can render. Be honest about the cost: you now run two systems, and the editorial preview experience needs deliberate work to not get worse.",
      },
      {
        type: "ul",
        items: [
          "Marketing site with a strong editorial team → WordPress.",
          "Operational platform with business logic → Laravel.",
          "One content source, many surfaces, performance-critical frontend → headless.",
          "Application that also publishes content → Laravel core with a modular CMS layer.",
        ],
      },
      {
        type: "quote",
        text: "Pick the platform for the team that operates it, not the developer who starts it.",
      },
    ],
  },
  {
    slug: "practical-ai-langchain-vector-databases",
    title: "Practical AI Integrations with LangChain and Vector Databases",
    excerpt:
      "What actually matters when you connect an LLM to real business data: sync pipelines, retrieval quality, and permission-aware answers.",
    category: "AI Engineering",
    readTime: "9 min read",
    date: "2026-02-10",
    content: [
      {
        type: "p",
        text: "The demo takes an afternoon: load documents, embed them, ask questions, watch the magic. The production system takes months, and almost none of that time goes to the model. Having shipped retrieval-augmented systems connected to live Google Drive folders and member databases, here is where the real engineering lives.",
      },
      { type: "h2", text: "The sync pipeline is the product" },
      {
        type: "p",
        text: "Business documents change constantly. If the vector index drifts from reality, the assistant confidently answers from last quarter's policy — which is worse than not answering. Incremental synchronization, change detection, chunk-level re-indexing, and deletion handling are the unglamorous majority of the system. Get this right and everything downstream improves.",
      },
      { type: "h2", text: "Retrieval quality beats model choice" },
      {
        type: "ul",
        items: [
          "Chunking strategy matters more than embedding model choice — respect document structure, don't split mid-thought.",
          "Metadata filters (document type, department, date) often improve answers more than semantic similarity tuning.",
          "Hybrid retrieval — combining vector search with structured lookups — handles the questions pure similarity misses.",
          "Log retrievals, not just responses. Bad answers are usually bad retrievals.",
        ],
      },
      { type: "h2", text: "Permissions are not optional" },
      {
        type: "p",
        text: "The first question a security review asks: can user A retrieve content from user B's documents? Retrieval must be access-aware at query time — filtering the vector search by the requesting user's permissions — not cleaned up afterward in the prompt. Design this in from the start; retrofitting it is painful.",
      },
      {
        type: "quote",
        text: "In production AI, the model is 10% of the system. The other 90% is keeping the right data in front of it.",
      },
      {
        type: "p",
        text: "LangChain and Pinecone are excellent tools, but they are plumbing, not the product. The product is trust: answers that are current, grounded, and permitted. Engineer for that, and the AI part mostly takes care of itself.",
      },
    ],
  },
  {
    slug: "clean-code-good-handwriting",
    title: "Clean Code Is Like Good Handwriting",
    excerpt:
      "Nobody compliments legible handwriting — they just read it without friction. The same quiet quality is what clean code is actually for.",
    category: "Engineering Culture",
    readTime: "5 min read",
    date: "2026-01-20",
    content: [
      {
        type: "p",
        text: "Nobody ever stopped reading a letter to compliment the handwriting. Legibility works in silence: the reader simply understands, without noticing the effort that made understanding easy. That is exactly what clean code is for — and exactly why its value is invisible until it's missing.",
      },
      { type: "h2", text: "You write once, the team reads forever" },
      {
        type: "p",
        text: "Code is read an order of magnitude more often than it is written — by reviewers, by the teammate on call at 2 AM, by the junior who joins next year, by you in eighteen months with no memory of the context. Optimizing for the writer's speed today taxes every one of those future readers. Clean code is simply choosing where the cost lands.",
      },
      { type: "h2", text: "Legible, not calligraphic" },
      {
        type: "p",
        text: "The handwriting analogy has a second edge. Ornate calligraphy is harder to read than plain, regular script — and over-engineered code is the calligraphy of our field. Five abstractions guarding a single if-statement isn't cleanliness; it's decoration. The goal is regularity: consistent naming, small functions with honest names, one idea per unit, surprises kept to a minimum.",
      },
      {
        type: "ul",
        items: [
          "Names should make comments unnecessary; comments should explain only what code cannot say.",
          "A function that needs a paragraph to describe wants to be two functions.",
          "Consistency beats cleverness — a pattern everyone recognizes outperforms a trick only its author admires.",
          "Delete code fearlessly. The cleanest line is the one that no longer exists.",
        ],
      },
      {
        type: "quote",
        text: "Clean code, like good handwriting, is a courtesy to the reader — and in a team, the reader is everyone.",
      },
    ],
  },
  {
    slug: "devops-lessons-production-systems",
    title: "DevOps Lessons from Real Production Systems",
    excerpt:
      "Hard-won lessons from years of keeping client platforms alive: boring deploys, honest monitoring, and why your rollback plan is the real pipeline.",
    category: "DevOps",
    readTime: "7 min read",
    date: "2025-12-08",
    content: [
      {
        type: "p",
        text: "Everything I know about DevOps I learned from systems that were already in production, serving real users, making real money — where 'let's just try it' is not an experiment but an outage. These lessons cost incidents to learn. They're cheaper to read.",
      },
      { type: "h2", text: "Deploys should be boring" },
      {
        type: "p",
        text: "The goal of a CI/CD pipeline is not speed — it's the removal of adrenaline. A good deploy is indistinguishable from no deploy: tests gate the merge, the build is reproducible, migrations run safely, the release switches atomically, and nobody watches the graphs afterward because the graphs never move. If deploys are exciting, the pipeline is incomplete.",
      },
      { type: "h2", text: "The rollback is the pipeline" },
      {
        type: "ul",
        items: [
          "Every deploy needs a tested way back — not a theoretical one.",
          "Migrations must be backwards-compatible for at least one release; add columns before you depend on them, drop them a release after nothing does.",
          "Feature flags separate shipping code from launching features — deploy at 3 PM, launch when ready.",
          "If restoring last night's backup has never been rehearsed, you don't have backups. You have hope.",
        ],
      },
      { type: "h2", text: "Cache with a plan, not a prayer" },
      {
        type: "p",
        text: "Caching rescued more launches than any hardware upgrade — and caused more mysterious bugs than any other layer. The rule that survived: every cache needs an owner, a TTL, and a documented invalidation story. 'We cache it in Redis' is not a strategy; 'product pages cache for an hour and bust on update' is.",
      },
      {
        type: "quote",
        text: "Production doesn't care how elegant the architecture diagram is. It cares whether Tuesday's deploy can be undone by Tuesday's on-call.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
