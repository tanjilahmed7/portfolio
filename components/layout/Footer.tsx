import Link from "next/link";
import { navLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="glow-orb -bottom-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 bg-accent/10" />
      <div className="container-x relative py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-semibold tracking-tight">
              tanjil<span className="text-accent">.</span>ahmed
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Lead Software Engineer building scalable web systems, AI
              products, and digital platforms from {site.location}.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Connect</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li>
                {/* TODO: replace with final LinkedIn URL */}
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                {/* TODO: replace with final GitHub URL */}
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-accent"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Built with Next.js · GSAP · Three.js — {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
