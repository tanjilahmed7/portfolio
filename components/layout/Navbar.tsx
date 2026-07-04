"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // Deferred initial check so a mid-page refresh still gets the glass bar
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#")
      ? false
      : href === "/"
        ? pathname === "/"
        : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "glass-strong" : "border-b border-transparent"
      }`}
    >
      <nav
        className="container-x flex h-16 items-center justify-between md:h-[4.5rem]"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent/80 to-glow/80 font-mono text-sm font-bold text-void transition-transform duration-300 group-hover:rotate-6"
          >
            TA
          </span>
          <span>
            tanjil<span className="text-accent">.</span>ahmed
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition-colors duration-300 hover:text-accent ${
                  isActive(link.href) ? "text-accent" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-medium text-accent transition-all duration-300 hover:border-accent/60 hover:bg-accent/20"
            >
              Let&apos;s Talk
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-void/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="container-x flex flex-col gap-2 pt-10">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-4 font-display text-2xl font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="container-x pt-8 font-mono text-xs text-faint">
          {site.email}
        </p>
      </div>
    </header>
  );
}
